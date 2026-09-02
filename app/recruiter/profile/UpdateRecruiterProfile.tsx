'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X, Paperclip, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Attachment { id: string; url: string; name: string; size?: number }

interface Props {
  user: {
    companyName: string | null;
    companyDesc: string | null;
    companyLogoUrl: string | null;
    companyAttachments: string | null;
    email: string;
    name: string | null;
    isApproved: boolean;
  };
}

interface UploadingFile { id: string; name: string; progress: number }

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_IMAGE_DIMENSION = 1200;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_ATTACHMENT_TYPES = [...ALLOWED_IMAGE_TYPES, 'application/pdf'];

function generateUploadId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function uploadFileWithProgress(
  file: File,
  id: string,
  onProgress: (id: string, progress: number) => void,
): Promise<Attachment> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        onProgress(id, Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const json = JSON.parse(xhr.responseText);
          if (json.error) {
            reject(new Error(json.error));
          } else {
            resolve(json.data as Attachment);
          }
        } catch {
          reject(new Error('업로드 응답 처리 실패'));
        }
      } else {
        let message = '업로드 실패';
        try {
          const json = JSON.parse(xhr.responseText);
          message = json.error || message;
        } catch {}
        reject(new Error(message));
      }
    });

    xhr.addEventListener('error', () => reject(new Error('네트워크 오류로 업로드 실패')));
    xhr.addEventListener('abort', () => reject(new Error('업로드가 취소되었습니다')));

    xhr.open('POST', '/api/recruiter/upload');
    const form = new FormData();
    form.append('file', file);
    xhr.send(form);
  });
}

function resizeImageFile(file: File): Promise<File> {
  if (!file.type.startsWith('image/')) {
    return Promise.resolve(file);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const maxSide = Math.max(img.width, img.height);
      let width = img.width;
      let height = img.height;

      if (maxSide > MAX_IMAGE_DIMENSION) {
        const scale = MAX_IMAGE_DIMENSION / maxSide;
        width = Math.round(img.width * scale);
        height = Math.round(img.height * scale);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('이미지 캔버스 생성 실패'));
        return;
      }

      const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';

      if (outputType === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('이미지 Blob 변환 실패'));
            return;
          }

          const newExt = outputType === 'image/png' ? '.png' : '.jpg';
          const baseName = file.name.replace(/\.[^.]+$/, '');
          const resizedName = `resized-${baseName}${newExt}`;

          resolve(new File([blob], resizedName, { type: outputType }));
        },
        outputType,
        0.92,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('이미지 파일을 읽을 수 없습니다'));
    };

    img.src = objectUrl;
  });
}

export function UpdateRecruiterProfile({ user }: Props) {
  const router = useRouter();
  const [companyName, setCompanyName] = useState(user.companyName || '');
  const [companyDesc, setCompanyDesc] = useState(user.companyDesc || '');
  const [companyLogoUrl, setCompanyLogoUrl] = useState(user.companyLogoUrl || '');
  const [attachments, setAttachments] = useState<Attachment[]>(() => {
    if (!user.companyAttachments) return [];
    try { return JSON.parse(user.companyAttachments); } catch { return []; }
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [logoUpload, setLogoUpload] = useState<UploadingFile | null>(null);
  const [attachmentUploads, setAttachmentUploads] = useState<UploadingFile[]>([]);

  const [isDraggingLogo, setIsDraggingLogo] = useState(false);
  const [isDraggingAttachment, setIsDraggingAttachment] = useState(false);

  const logoDragCounter = useRef(0);
  const attachmentDragCounter = useRef(0);

  const isUploading = useMemo(
    () => attachmentUploads.length > 0 || !!logoUpload,
    [attachmentUploads, logoUpload],
  );

  const attachmentOverallProgress = useMemo(() => {
    if (attachmentUploads.length === 0) return 0;
    return Math.round(
      attachmentUploads.reduce((sum, u) => sum + u.progress, 0) / attachmentUploads.length,
    );
  }, [attachmentUploads]);

  const updateAttachmentProgress = useCallback((id: string, progress: number) => {
    setAttachmentUploads((prev) =>
      prev.map((u) => (u.id === id ? { ...u, progress } : u)),
    );
  }, []);

  const updateLogoProgress = useCallback((_id: string, progress: number) => {
    setLogoUpload((prev) => (prev ? { ...prev, progress } : prev));
  }, []);

  async function uploadLogo(file: File) {
    if (logoUpload) return;
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error('로고는 JPG, PNG, WebP, GIF 이미지만 업로드할 수 있습니다');
      return;
    }

    const id = generateUploadId();
    setLogoUpload({ id, name: file.name, progress: 0 });

    try {
      const resized = await resizeImageFile(file);

      if (resized.size > MAX_FILE_SIZE) {
        throw new Error('파일 크기는 5MB 이하여야 합니다');
      }

      const data = await uploadFileWithProgress(resized, id, updateLogoProgress);

      setCompanyLogoUrl(data.url);
      setLogoUpload((prev) => (prev ? { ...prev, progress: 100 } : prev));
      toast.success('로고가 업로드되었습니다');

      setTimeout(() => {
        setLogoUpload(null);
      }, 800);
    } catch (err) {
      const message = err instanceof Error ? err.message : '로고 업로드 실패';
      toast.error(message);
      setLogoUpload(null);
    }
  }

  async function uploadAttachments(files: File[]) {
    const validFiles: File[] = [];
    for (const file of files) {
      if (!ALLOWED_ATTACHMENT_TYPES.includes(file.type)) {
        toast.error(`${file.name}: 허용되지 않는 파일 형식입니다`);
        continue;
      }
      if (file.type === 'application/pdf' && file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name}: 파일 크기는 5MB 이하여야 합니다`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    const tasks = validFiles.map((file) => ({
      id: generateUploadId(),
      file,
      name: file.name,
    }));

    setAttachmentUploads((prev) => [
      ...prev,
      ...tasks.map((t) => ({ id: t.id, name: t.name, progress: 0 })),
    ]);

    const results = await Promise.all(
      tasks.map(async (task) => {
        try {
          const processed =
            task.file.type === 'application/pdf'
              ? task.file
              : await resizeImageFile(task.file);

          if (processed.size > MAX_FILE_SIZE) {
            throw new Error('리사이즈 후에도 파일 크기가 5MB를 초과합니다');
          }

          const data = await uploadFileWithProgress(
            processed,
            task.id,
            updateAttachmentProgress,
          );

          setAttachmentUploads((prev) =>
            prev.map((u) => (u.id === task.id ? { ...u, progress: 100 } : u)),
          );

          setTimeout(() => {
            setAttachmentUploads((prev) => prev.filter((u) => u.id !== task.id));
            setAttachments((prev) => [...prev, data]);
          }, 800);

          return true;
        } catch (err) {
          const message = err instanceof Error ? err.message : '업로드 실패';
          toast.error(`${task.name}: ${message}`);

          setAttachmentUploads((prev) =>
            prev.map((u) => (u.id === task.id ? { ...u, progress: 0 } : u)),
          );
          setTimeout(() => {
            setAttachmentUploads((prev) => prev.filter((u) => u.id !== task.id));
          }, 800);

          return false;
        }
      }),
    );

    if (results.some(Boolean)) {
      toast.success('첨부파일이 업로드되었습니다');
    }
  }

  function handleLogoInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    uploadLogo(file);
  }

  function handleAttachmentInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    e.target.value = '';
    if (!files || files.length === 0) return;
    uploadAttachments(Array.from(files));
  }

  function removeAttachment(id: string) {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/recruiter/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          companyDesc,
          companyLogoUrl: companyLogoUrl || null,
          companyAttachments: attachments.length > 0 ? JSON.stringify(attachments) : null,
        }),
      });
      if (!res.ok) { setError('저장에 실패했습니다.'); return; }
      toast.success('기업 정보가 저장되었습니다');
      router.refresh();
    } catch {
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  function handleDragEnter(
    e: React.DragEvent,
    zone: 'logo' | 'attachment',
  ) {
    e.preventDefault();
    e.stopPropagation();
    if (zone === 'logo') {
      logoDragCounter.current += 1;
      setIsDraggingLogo(true);
    } else {
      attachmentDragCounter.current += 1;
      setIsDraggingAttachment(true);
    }
  }

  function handleDragLeave(
    e: React.DragEvent,
    zone: 'logo' | 'attachment',
  ) {
    e.preventDefault();
    e.stopPropagation();
    if (zone === 'logo') {
      logoDragCounter.current = Math.max(0, logoDragCounter.current - 1);
      if (logoDragCounter.current === 0) setIsDraggingLogo(false);
    } else {
      attachmentDragCounter.current = Math.max(0, attachmentDragCounter.current - 1);
      if (attachmentDragCounter.current === 0) setIsDraggingAttachment(false);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleLogoDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    logoDragCounter.current = 0;
    setIsDraggingLogo(false);
    if (isUploading || logoUpload) return;

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (e.dataTransfer.files.length > 1) {
      toast.info('로고는 한 번에 1개의 이미지만 업로드할 수 있습니다');
    }

    uploadLogo(file);
  }

  function handleAttachmentDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    attachmentDragCounter.current = 0;
    setIsDraggingAttachment(false);
    if (isUploading) return;

    const files = e.dataTransfer.files;
    if (files.length === 0) return;
    uploadAttachments(Array.from(files));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-700">이메일</label>
        <input disabled value={user.email} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-500" />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-700">담당자 이름</label>
        <input disabled value={user.name || ''} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-500" />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-700">기업명</label>
        <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-700">기업 소개</label>
        <textarea value={companyDesc} onChange={(e) => setCompanyDesc(e.target.value)} rows={4} className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" />
      </div>

      {/* 기업 로고 */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-700">기업 로고</label>
        <div
          className={cn(
            'flex items-center gap-3 rounded-xl border-2 border-dashed p-2 transition-colors',
            isDraggingLogo
              ? 'border-primary bg-primary/5'
              : 'border-slate-200 bg-white',
            (isUploading || !!logoUpload) && 'opacity-60',
          )}
          onDragEnter={(e) => handleDragEnter(e, 'logo')}
          onDragLeave={(e) => handleDragLeave(e, 'logo')}
          onDragOver={handleDragOver}
          onDrop={handleLogoDrop}
        >
          {logoUpload ? (
            <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-1">
              <ImageIcon className="mb-1 h-4 w-4 text-slate-400" />
              <span className="text-[10px] font-medium text-slate-600">{logoUpload.progress}%</span>
              <Progress value={logoUpload.progress} className="mt-1 h-1 w-12" />
            </div>
          ) : companyLogoUrl ? (
            <div className="relative h-16 w-16 rounded-lg border border-slate-200 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={companyLogoUrl} alt="기업 로고" className="h-full w-full object-contain" />
              <button
                type="button"
                onClick={() => setCompanyLogoUrl('')}
                disabled={isUploading}
                className="absolute -right-1 -top-1 rounded-full bg-red-500 p-0.5 text-white disabled:opacity-50"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50">
              <ImageIcon className="h-5 w-5 text-slate-400" />
            </div>
          )}

          <label
            className={cn(
              'inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50',
              (isUploading || !!logoUpload) && 'cursor-not-allowed opacity-50',
            )}
          >
            <Upload className="h-3.5 w-3.5" /> 로고 업로드
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleLogoInputChange}
              disabled={isUploading || !!logoUpload}
            />
          </label>

          {isDraggingLogo && (
            <span className="text-xs font-medium text-primary">이미지를 여기에 놓으세요</span>
          )}
        </div>
      </div>

      {/* 첨부파일 */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-700">첨부파일</label>
        <div
          className={cn(
            'flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 transition-colors',
            isDraggingAttachment
              ? 'border-primary bg-primary/5'
              : 'border-slate-200 bg-white',
            isUploading && 'opacity-60',
          )}
          onDragEnter={(e) => handleDragEnter(e, 'attachment')}
          onDragLeave={(e) => handleDragLeave(e, 'attachment')}
          onDragOver={handleDragOver}
          onDrop={handleAttachmentDrop}
        >
          <input
            id="attachment-input"
            type="file"
            accept=".pdf,image/jpeg,image/png,image/webp,image/gif"
            multiple
            className="hidden"
            onChange={handleAttachmentInputChange}
            disabled={isUploading}
          />
          <label
            htmlFor="attachment-input"
            className={cn(
              'flex cursor-pointer flex-col items-center gap-1 text-xs text-slate-600',
              isUploading && 'pointer-events-none opacity-50',
            )}
          >
            <Paperclip className="h-4 w-4" />
            <span className="font-medium">파일 추가 또는 드래그</span>
            <span className="text-[10px] text-slate-400">JPG, PNG, WebP, GIF, PDF (최대 5MB)</span>
          </label>

          {attachmentUploads.length > 0 && (
            <div className="mt-3 w-full max-w-xs">
              <Progress value={attachmentOverallProgress} className="h-1.5" />
              <p className="mt-1 text-center text-[10px] text-slate-500">
                전체 진행률 {attachmentOverallProgress}%
              </p>
            </div>
          )}
        </div>

        {(attachments.length > 0 || attachmentUploads.length > 0) && (
          <ul className="mt-2 space-y-1.5">
            {attachments.map((a) => (
              <li key={a.id} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs">
                <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">{a.name}</a>
                <button
                  type="button"
                  onClick={() => removeAttachment(a.id)}
                  disabled={isUploading}
                  className="text-slate-400 hover:text-red-500 disabled:opacity-50"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
            {attachmentUploads.map((u) => (
              <li key={u.id} className="flex flex-col rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-slate-600" title={u.name}>{u.name}</span>
                  <span className="shrink-0 text-[10px] text-slate-500">업로드 중... {u.progress}%</span>
                </div>
                <Progress value={u.progress} className="mt-1.5 h-1" />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-2">
        {user.isApproved ? (
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">승인 완료</span>
        ) : (
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600">승인 대기</span>
        )}
      </div>
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={isLoading || isUploading}
        className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
      >
        {isLoading ? '저장 중...' : '저장'}
      </button>
    </form>
  );
}
