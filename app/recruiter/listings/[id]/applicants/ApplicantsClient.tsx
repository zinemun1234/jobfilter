'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { FileText, FolderGit2, Lightbulb, MessageSquare, Calendar, Save, FileSpreadsheet } from 'lucide-react';

export type Application = {
  id: string;
  status: string;
  recruiterNote: string | null;
  interviewAt: string | null;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    major: string | null;
    targetJob: string | null;
    skills: string;
  };
  coverLetters: { id: string; company: string; position: string; updatedAt: string }[];
  portfolios: { id: string; title: string; updatedAt: string }[];
  experiences: { id: string; title: string }[];
  interviewAnswers: { id: string }[];
};

const STATUS_LABELS: Record<string, string> = {
  PREPARING: '준비 중',
  APPLIED: '지원 완료',
  DOCUMENT_PASS: '서류 합격',
  INTERVIEW: '면접',
  FINAL_PASS: '최종 합격',
  REJECTED: '불합격',
};

interface Props {
  listingId: string;
  applications: Application[];
}

export function ApplicantsClient({ listingId, applications }: Props) {
  const [items, setItems] = useState(applications);
  const [savingId, setSavingId] = useState<string | null>(null);

  const updateField = (id: string, field: keyof Application, value: string | null) => {
    setItems(prev => prev.map(app => {
      if (app.id !== id) return app;
      if (field === 'interviewAt' && value === '') value = null;
      return { ...app, [field]: value };
    }));
  };

  const save = async (app: Application) => {
    setSavingId(app.id);
    try {
      const res = await fetch(`/api/recruiter/applications/${app.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: app.status,
          recruiterNote: app.recruiterNote,
          interviewAt: app.interviewAt,
        }),
      });
      if (!res.ok) throw new Error('저장 실패');
      toast.success('지원자 정보가 저장되었습니다');
    } catch {
      toast.error('저장에 실패했습니다');
    } finally {
      setSavingId(null);
    }
  };

  const downloadExcel = () => {
    window.open(`/api/recruiter/listings/${listingId}/applicants/export`, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <p className="text-sm text-slate-400">아직 지원자가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={downloadExcel}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <FileSpreadsheet className="h-4 w-4" /> 엑셀 다운로드
        </button>
      </div>
      {items.map(app => (
        <div key={app.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-slate-900">{app.user.name ?? '익명'}</h3>
                <span className="text-xs text-slate-400">{app.user.email}</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {app.user.major ?? '전공 미기입'} · {app.user.targetJob ?? '희망 직무 미기입'} · 지원일 {new Date(app.createdAt).toLocaleDateString('ko-KR')}
              </p>
              {(() => {
                const skills = (() => { try { return app.user.skills ? JSON.parse(app.user.skills) : []; } catch { return []; } })();
                return skills.length > 0 ? <p className="mt-1 text-xs text-slate-500">기술: {skills.join(', ')}</p> : null;
              })()}

              <div className="mt-3 flex flex-wrap gap-2">
                {app.coverLetters.map(c => (
                  <Link key={c.id} href={`/cover-letter?id=${c.id}`} target="_blank" className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs text-blue-600 hover:bg-blue-100">
                    <FileText className="h-3 w-3" /> {c.company} {c.position}
                  </Link>
                ))}
                {app.portfolios.map(p => (
                  <Link key={p.id} href={`/portfolio?id=${p.id}`} target="_blank" className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs text-emerald-600 hover:bg-emerald-100">
                    <FolderGit2 className="h-3 w-3" /> {p.title}
                  </Link>
                ))}
                {app.experiences.map(e => (
                  <Link key={e.id} href={`/cover-letter`} target="_blank" className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs text-amber-600 hover:bg-amber-100">
                    <Lightbulb className="h-3 w-3" /> {e.title}
                  </Link>
                ))}
                {app.interviewAnswers.length > 0 && (
                  <Link href="/interview" target="_blank" className="inline-flex items-center gap-1 rounded-lg bg-violet-50 px-2.5 py-1.5 text-xs text-violet-600 hover:bg-violet-100">
                    <MessageSquare className="h-3 w-3" /> 면접 답변 {app.interviewAnswers.length}개
                  </Link>
                )}
              </div>
            </div>

            <div className="w-full md:w-72 space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">지원 상태</label>
                <select
                  value={app.status}
                  onChange={e => updateField(app.id, 'status', e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                >
                  {Object.entries(STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">면접 일정</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="datetime-local"
                    value={app.interviewAt ? new Date(new Date(app.interviewAt).getTime() - (new Date(app.interviewAt).getTimezoneOffset() * 60000)).toISOString().slice(0, 16) : ''}
                    onChange={e => updateField(app.id, 'interviewAt', e.target.value || null)}
                    className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">메모</label>
                <textarea
                  value={app.recruiterNote ?? ''}
                  onChange={e => updateField(app.id, 'recruiterNote', e.target.value)}
                  rows={2}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                  placeholder="리크루터용 메모"
                />
              </div>
              <button
                onClick={() => save(app)}
                disabled={savingId === app.id}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
              >
                <Save className="h-4 w-4" /> {savingId === app.id ? '저장 중...' : '저장'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
