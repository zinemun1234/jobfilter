'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ExternalLink, Calendar, Edit, Trash2, Clock, UserPlus, Bell, Phone, Mail, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SlideOver } from '@/components/ui/slide-over';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';
import { JobForm } from '@/components/jobs/JobForm';
import { toast } from 'sonner';
import { useState } from 'react';
import { JobPosting, StatusHistory } from '@/lib/generated/prisma';
import type { ApplicationStatus } from '@/types';

type JobWithHistory = JobPosting & {
  statusHistory: StatusHistory[];
  contacts: string | null;
  followUpAt: Date | null;
};

type Contact = {
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  memo?: string;
};

const statusConfig: Record<ApplicationStatus, { label: string; dot: string; text: string; bg: string }> = {
  PREPARING:     { label: '서류 준비 중', dot: 'bg-slate-400',  text: 'text-slate-700',  bg: 'bg-slate-50'  },
  APPLIED:       { label: '지원 완료',   dot: 'bg-blue-500',   text: 'text-blue-700',   bg: 'bg-blue-50'   },
  DOCUMENT_PASS: { label: '서류 합격',   dot: 'bg-emerald-500',text: 'text-emerald-700',bg: 'bg-emerald-50'},
  INTERVIEW:     { label: '면접 예정',   dot: 'bg-amber-500',  text: 'text-amber-700',  bg: 'bg-amber-50'  },
  FINAL_PASS:    { label: '최종 합격',   dot: 'bg-violet-500', text: 'text-violet-700', bg: 'bg-violet-50' },
  REJECTED:      { label: '불합격',     dot: 'bg-red-400',    text: 'text-red-700',    bg: 'bg-red-50'    },
};

const statusOrder: ApplicationStatus[] = ['PREPARING','APPLIED','DOCUMENT_PASS','INTERVIEW','FINAL_PASS'];

async function fetchJob(id: string): Promise<JobWithHistory> {
  const res = await fetch(`/api/jobs/${id}`);
  if (!res.ok) throw new Error('Not found');
  return (await res.json()).data;
}

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [followUpOpen, setFollowUpOpen] = useState(false);

  // 담당자 폼 상태
  const [newContact, setNewContact] = useState<Contact>({ name: '' });
  // 팔로업 날짜 상태
  const [followUpDate, setFollowUpDate] = useState('');

  const { data: job, isLoading } = useQuery({
    queryKey: ['job', id],
    queryFn: () => fetchJob(id),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('채용 공고가 삭제되었습니다');
      router.push('/jobs');
    },
    onError: () => toast.error('삭제에 실패했습니다'),
  });

  const contactMutation = useMutation({
    mutationFn: async (contacts: Contact[]) => {
      if (!job) return;
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: job.company,
          position: job.position,
          url: job.url ?? '',
          deadline: job.deadline ? new Date(job.deadline).toISOString().split('T')[0] : '',
          status: job.status,
          contacts,
        }),
      });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job', id] });
      toast.success('담당자 정보가 저장되었습니다');
      setContactOpen(false);
      setNewContact({ name: '' });
    },
    onError: () => toast.error('저장에 실패했습니다'),
  });

  const followUpMutation = useMutation({
    mutationFn: async (date: string) => {
      if (!job) return;
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: job.company,
          position: job.position,
          url: job.url ?? '',
          deadline: job.deadline ? new Date(job.deadline).toISOString().split('T')[0] : '',
          status: job.status,
          followUpAt: date || null,
        }),
      });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job', id] });
      toast.success('팔로업 날짜가 설정되었습니다');
      setFollowUpOpen(false);
    },
    onError: () => toast.error('저장에 실패했습니다'),
  });

  const statusChangeMutation = useMutation({
    mutationFn: async (newStatus: ApplicationStatus) => {
      if (!job) return;
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: job.company,
          position: job.position,
          url: job.url,
          deadline: job.deadline ? new Date(job.deadline).toISOString().split('T')[0] : '',
          status: newStatus,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job', id] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('상태가 변경되었습니다');
    },
    onError: () => toast.error('상태 변경에 실패했습니다'),
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6 animate-pulse">
        <div className="h-5 w-24 bg-gray-200 rounded" />
        <div className="h-8 w-64 bg-gray-200 rounded" />
        <div className="h-48 bg-gray-100 rounded-xl" />
      </div>
    );
  }

  if (!job) return null;

  const cfg = statusConfig[job.status as ApplicationStatus] ?? statusConfig.PREPARING;
  const isRejected = job.status === 'REJECTED';
  const isFinalPass = job.status === 'FINAL_PASS';
  const deadlineDate = job.deadline ? new Date(job.deadline) : null;
  const isExpired = deadlineDate && deadlineDate < new Date();
  const daysLeft = deadlineDate
    ? Math.ceil((deadlineDate.getTime() - Date.now()) / 86400000)
    : null;

  const timeline = [...(job.statusHistory ?? [])]
    .sort((a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime());

  const contacts: Contact[] = (() => {
    try { return job.contacts ? JSON.parse(job.contacts as string) : []; }
    catch { return []; }
  })();

  const followUpDate_parsed = job.followUpAt ? new Date(job.followUpAt as unknown as string) : null;
  const followUpDiff = followUpDate_parsed
    ? Math.ceil((followUpDate_parsed.getTime() - Date.now()) / 86400000)
    : null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
      {/* 뒤로가기 */}
      <button
        onClick={() => router.push('/jobs')}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        채용 공고 목록
      </button>

      {/* 헤더 */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">{job.position}</p>
          <h1 className="text-2xl font-semibold text-gray-900">{job.company}</h1>
          <div className="mt-2 flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${cfg.bg} ${cfg.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>
            {isFinalPass && <span className="text-xs text-violet-600 font-medium">🎉 축하합니다!</span>}
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
            <Edit className="w-3.5 h-3.5 mr-1" /> 수정
          </Button>
          <Button variant="outline" size="sm" onClick={() => setDeleteOpen(true)} className="text-red-500 hover:text-red-700 border-red-200 hover:border-red-300">
            <Trash2 className="w-3.5 h-3.5 mr-1" /> 삭제
          </Button>
        </div>
      </div>

      {/* 정보 카드 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-xs text-gray-400 mb-1">마감일</p>
          {deadlineDate ? (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className={`text-sm font-medium ${isExpired ? 'text-red-500' : daysLeft !== null && daysLeft <= 3 ? 'text-amber-600' : 'text-gray-800'}`}>
                {deadlineDate.toLocaleDateString('ko-KR')}
              </span>
              {!isExpired && daysLeft !== null && daysLeft >= 0 && (
                <span className="text-xs text-gray-400">({daysLeft}일 남음)</span>
              )}
              {isExpired && <span className="text-xs text-red-400">만료</span>}
            </div>
          ) : (
            <span className="text-sm text-gray-400">미설정</span>
          )}
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-xs text-gray-400 mb-1">등록일</p>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-800">
              {new Date(job.createdAt).toLocaleDateString('ko-KR')}
            </span>
          </div>
        </div>
      </div>

      {job.url && (
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          채용 공고 바로가기
        </a>
      )}

      {/* 진행 단계 */}
      {!isRejected && (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-5">진행 단계</p>
          <div className="flex items-center gap-0">
            {statusOrder.map((s, i) => {
              const currentIdx = statusOrder.indexOf(job.status as ApplicationStatus);
              const isDone = i <= currentIdx;
              const isCur = s === job.status;
              const sc = statusConfig[s];
              return (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all
                      ${isCur ? `${sc.dot} border-transparent text-white scale-110` :
                        isDone ? 'bg-gray-800 border-gray-800 text-white' :
                        'bg-white border-gray-200 text-gray-300'}`}>
                      {isDone && !isCur ? '✓' : i + 1}
                    </div>
                    <span className={`text-[10px] whitespace-nowrap ${isCur ? sc.text + ' font-semibold' : isDone ? 'text-gray-600' : 'text-gray-300'}`}>
                      {sc.label}
                    </span>
                  </div>
                  {i < statusOrder.length - 1 && (
                    <div className={`flex-1 h-0.5 mb-5 mx-1 ${i < currentIdx ? 'bg-gray-800' : 'bg-gray-100'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isRejected && (
        <div className="rounded-xl border border-red-100 bg-red-50 p-5 text-sm text-red-600">
          이 공고는 불합격 처리되었습니다.
        </div>
      )}

      {/* 상태 변경 — 관리자 전용, 학생은 표시 안 함 */}

      {/* 팔로업 + 담당자 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* 팔로업 */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">팔로업 날짜</p>
            <button
              type="button"
              onClick={() => { setFollowUpDate(followUpDate_parsed ? followUpDate_parsed.toISOString().split('T')[0] : ''); setFollowUpOpen(v => !v); }}
              className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors"
            >
              <Bell className="w-3.5 h-3.5" /> {followUpOpen ? '닫기' : '설정'}
            </button>
          </div>

          {followUpDate_parsed ? (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className={`text-sm font-medium ${followUpDiff !== null && followUpDiff <= 0 ? 'text-red-500' : followUpDiff !== null && followUpDiff <= 3 ? 'text-amber-600' : 'text-gray-800'}`}>
                {followUpDate_parsed.toLocaleDateString('ko-KR')}
              </span>
              {followUpDiff !== null && followUpDiff > 0 && (
                <span className="text-xs text-gray-400">({followUpDiff}일 후)</span>
              )}
              {followUpDiff !== null && followUpDiff <= 0 && (
                <span className="text-xs text-red-400 font-medium">오늘!</span>
              )}
              <button
                type="button"
                onClick={() => followUpMutation.mutate('')}
                className="ml-auto p-1 text-gray-300 hover:text-red-400 transition-colors"
                aria-label="팔로업 날짜 삭제"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-400">팔로업 날짜가 없습니다</p>
          )}

          {followUpOpen && (
            <div className="mt-4 flex gap-2">
              <input
                type="date"
                aria-label="팔로업 날짜 선택"
                value={followUpDate}
                onChange={e => setFollowUpDate(e.target.value)}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
              />
              <button
                type="button"
                onClick={() => followUpMutation.mutate(followUpDate)}
                disabled={!followUpDate || followUpMutation.isPending}
                className="px-3 py-1.5 bg-[#0f172a] text-white text-xs font-medium rounded-lg hover:bg-[#1e293b] disabled:opacity-50 transition-colors"
              >
                저장
              </button>
            </div>
          )}
        </div>

        {/* 담당자 */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">담당자</p>
            <button
              type="button"
              onClick={() => setContactOpen(v => !v)}
              className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors"
            >
              <UserPlus className="w-3.5 h-3.5" /> {contactOpen ? '닫기' : '추가'}
            </button>
          </div>

          {contacts.length === 0 && !contactOpen && (
            <p className="text-sm text-gray-400">등록된 담당자가 없습니다</p>
          )}

          {contacts.length > 0 && (
            <div className="space-y-3 mb-3">
              {contacts.map((c, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600 shrink-0">
                    {c.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{c.name}</p>
                    {c.role && <p className="text-xs text-gray-500">{c.role}</p>}
                    <div className="flex flex-wrap gap-2 mt-1">
                      {c.email && (
                        <a href={`mailto:${c.email}`} className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                          <Mail className="w-3 h-3" />{c.email}
                        </a>
                      )}
                      {c.phone && (
                        <a href={`tel:${c.phone}`} className="flex items-center gap-1 text-xs text-gray-500 hover:underline">
                          <Phone className="w-3 h-3" />{c.phone}
                        </a>
                      )}
                    </div>
                    {c.memo && <p className="text-xs text-gray-400 mt-1">{c.memo}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => contactMutation.mutate(contacts.filter((_, idx) => idx !== i))}
                    className="p-1 text-gray-300 hover:text-red-400 transition-colors shrink-0"
                    aria-label="담당자 삭제"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {contactOpen && (
            <div className="space-y-2 border-t border-gray-100 pt-3">
              <input
                value={newContact.name}
                onChange={e => setNewContact(p => ({ ...p, name: e.target.value }))}
                placeholder="이름 *"
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
              />
              <input
                value={newContact.role ?? ''}
                onChange={e => setNewContact(p => ({ ...p, role: e.target.value }))}
                placeholder="직책 (예: 채용 담당자)"
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
              />
              <input
                value={newContact.email ?? ''}
                onChange={e => setNewContact(p => ({ ...p, email: e.target.value }))}
                placeholder="이메일"
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
              />
              <input
                value={newContact.phone ?? ''}
                onChange={e => setNewContact(p => ({ ...p, phone: e.target.value }))}
                placeholder="전화번호"
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
              />
              <textarea
                value={newContact.memo ?? ''}
                onChange={e => setNewContact(p => ({ ...p, memo: e.target.value }))}
                placeholder="메모"
                rows={2}
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 resize-none"
              />
              <button
                type="button"
                onClick={() => {
                  if (!newContact.name.trim()) return;
                  contactMutation.mutate([...contacts, newContact]);
                }}
                disabled={!newContact.name.trim() || contactMutation.isPending}
                className="w-full py-1.5 bg-[#0f172a] text-white text-xs font-medium rounded-lg hover:bg-[#1e293b] disabled:opacity-50 transition-colors flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> 담당자 추가
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 상태 변경 이력 — 세로 타임라인 */}
      {timeline.length > 0 && (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-5">변경 이력</p>
          <div className="relative">
            {/* 세로 선 */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-100" />
            <div className="space-y-0">
              {timeline.map((h, i) => {
                const hcfg = statusConfig[h.status as ApplicationStatus] ?? statusConfig.PREPARING;
                const isFirst = i === 0;
                return (
                  <div key={h.id} className="relative flex items-start gap-4 pb-5 last:pb-0">
                    {/* 도트 */}
                    <div className={`relative z-10 mt-0.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm shrink-0 ${hcfg.dot} ${isFirst ? 'scale-125' : ''}`} />
                    <div className="flex-1 min-w-0 pt-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className={`text-sm font-medium ${hcfg.text}`}>{hcfg.label}</span>
                        <span className="text-xs text-gray-400 shrink-0">
                          {new Date(h.changedAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' })}
                          {' '}
                          {new Date(h.changedAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      {h.note && (
                        <p className="text-xs text-gray-500 mt-1 bg-gray-50 rounded px-2 py-1">{h.note}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 수정 슬라이드오버 */}
      <SlideOver
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="채용 공고 수정"
        subtitle={`${job.company} · ${job.position}`}
      >
        <JobForm
          job={job}
          onSuccess={() => {
            setEditOpen(false);
            queryClient.invalidateQueries({ queryKey: ['job', id] });
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
          }}
        />
      </SlideOver>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => deleteMutation.mutate()}
        title="채용 공고 삭제"
        description="이 채용 공고를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      />
    </div>
  );
}
