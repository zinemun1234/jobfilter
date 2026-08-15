'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, Edit, Trash2, Clock, UserPlus, Bell, Phone, Mail, X, Plus, FileText, ListChecks, AlertCircle, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SlideOver } from '@/components/ui/slide-over';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';
import EmptyState from '@/components/ui/EmptyState';
import { JobForm } from '@/components/jobs/JobForm';
import JobChecklist from '@/components/jobs/JobChecklist';
import type { ChecklistItem } from '@/lib/job-checklist';
import { toast } from 'sonner';
import { useState } from 'react';
import { JobPosting, StatusHistory } from '@/lib/generated/prisma';
import type { ApplicationStatus } from '@/types';
import { STATUS_CONFIG, STATUS_ORDER } from '@/lib/status-config';

type JobWithHistory = Omit<JobPosting, 'contacts' | 'followUpAt' | 'checklist'> & {
  statusHistory: StatusHistory[];
  contacts: Contact[];
  followUpAt: Date | null;
  checklist: ChecklistItem[] | null;
  coverLetters: { id: string; version: number; analysisScore: number | null; updatedAt: Date }[];
  portfolios: { id: string; title: string; githubUrl: string | null; techStack: string[]; updatedAt: Date }[];
  experiences: { id: string; title: string; situation: string; action: string; result: string; technologies: string[]; metrics: string | null; updatedAt: Date }[];
  interviewAnswers: { id: string; answer: string; updatedAt: Date; question: { id: string; question: string; category: string } }[];
};

type Contact = {
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  memo?: string;
};



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

  const { data: job, isLoading, error, refetch } = useQuery({
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

  const checklistMutation = useMutation({
    mutationFn: async (items: ChecklistItem[]) => {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checklist: items }),
      });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job', id] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: () => toast.error('체크리스트 저장에 실패했습니다'),
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

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-8">
        <EmptyState
          icon={AlertCircle}
          title="공고 정보를 불러오지 못했습니다"
          description={error.message}
          action={{ label: '다시 시도', onClick: () => refetch() }}
        />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-8">
        <EmptyState
          icon={Briefcase}
          title="공고를 찾을 수 없습니다"
          description="존재하지 않거나 삭제된 공고입니다"
          action={{ label: '목록으로', href: '/jobs' }}
        />
      </div>
    );
  }

  const cfg = STATUS_CONFIG[job.status as ApplicationStatus] ?? STATUS_CONFIG.PREPARING;
  const isRejected = job.status === 'REJECTED';
  const isFinalPass = job.status === 'FINAL_PASS';
  const deadlineDate = job.deadline ? new Date(job.deadline) : null;
  const isExpired = deadlineDate && deadlineDate < new Date();
  const daysLeft = deadlineDate
    ? Math.ceil((deadlineDate.getTime() - Date.now()) / 86400000)
    : null;

  const timeline = [...(job.statusHistory ?? [])]
    .sort((a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime());

  const contacts: Contact[] = job.contacts ?? [];

  const followUpDate_parsed = job.followUpAt ?? null;
  const followUpDiff = followUpDate_parsed
    ? Math.ceil((followUpDate_parsed.getTime() - Date.now()) / 86400000)
    : null;
  const checklistDone = (job.checklist ?? []).filter(item => item.checked).length;
  const checklistTotal = job.checklist?.length ?? 0;
  const readinessItems = [
    { label: '자소서 연결', done: job.coverLetters.length > 0, href: `/cover-letter?company=${encodeURIComponent(job.company)}&position=${encodeURIComponent(job.position)}&jobId=${encodeURIComponent(job.id)}` },
    { label: '체크리스트 완료', done: checklistTotal > 0 && checklistDone === checklistTotal, href: '#checklist' },
    { label: '면접 일정 설정', done: Boolean(job.interviewAt), href: '#schedule' },
    { label: '팔로업 일정 설정', done: Boolean(job.followUpAt), href: '#schedule' },
  ];
  const readinessScore = Math.round((readinessItems.filter(item => item.done).length / readinessItems.length) * 100);

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
          <Button variant="outline" size="sm" onClick={() => setDeleteOpen(true)} disabled={deleteMutation.isPending} className="text-red-500 hover:text-red-700 border-red-200 hover:border-red-300 disabled:opacity-50">
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

      <section className="rounded-xl border border-blue-100 bg-blue-50/50 p-5">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest">지원 준비 워크스페이스</p>
            <p className="text-sm text-gray-600 mt-1">이 지원 건에 필요한 준비 화면으로 바로 이동하세요.</p>
          </div>
          <span className="text-xs font-medium text-blue-700 bg-white border border-blue-100 rounded-full px-2.5 py-1">Command Center</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Link href={`/cover-letter?company=${encodeURIComponent(job.company)}&position=${encodeURIComponent(job.position)}&jobId=${encodeURIComponent(job.id)}`} className="rounded-lg bg-white border border-blue-100 px-3 py-2.5 text-xs font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-colors">자소서 준비</Link>
          <Link href="/interview" className="rounded-lg bg-white border border-blue-100 px-3 py-2.5 text-xs font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-colors">면접 연습</Link>
          <Link href="/portfolio" className="rounded-lg bg-white border border-blue-100 px-3 py-2.5 text-xs font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-colors">포트폴리오</Link>
          <Link href="/calendar" className="rounded-lg bg-white border border-blue-100 px-3 py-2.5 text-xs font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-colors">일정 관리</Link>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-violet-600" />
            <div>
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Readiness Report</p>
              <h2 className="text-base font-semibold text-gray-900">지원 준비 현황</h2>
            </div>
          </div>
          <span className="text-lg font-bold text-violet-600">{readinessScore}%</span>
        </div>
        <div className="h-2 rounded-full bg-gray-100 overflow-hidden mb-4"><div className="h-full rounded-full bg-violet-500 transition-all" style={{ width: `${readinessScore}%` }} /></div>
        <div className="grid grid-cols-2 gap-2">
          {readinessItems.map(item => (
            <Link key={item.label} href={item.href} className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-xs transition-colors ${item.done ? 'border-emerald-100 bg-emerald-50 text-emerald-700' : 'border-amber-100 bg-amber-50 text-amber-700 hover:border-amber-300'}`}>
              <span className={`w-2 h-2 rounded-full ${item.done ? 'bg-emerald-500' : 'bg-amber-400'}`} />
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 text-[11px] text-gray-500">
          <FileText className="w-3.5 h-3.5" />
          {job.coverLetters[0]?.analysisScore != null ? `최근 자소서 분석 ${job.coverLetters[0].analysisScore}점` : '자소서 분석을 아직 실행하지 않았습니다.'}
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <ListChecks className="w-4 h-4 text-blue-600" />
          <h2 className="text-base font-semibold text-gray-900">연결된 준비 자료</h2>
        </div>
        <div className="space-y-3">
          {job.portfolios && job.portfolios.length > 0 && (
            <div className="text-sm">
              <span className="text-gray-500">포트폴리오</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {job.portfolios.map(p => (
                  <Link key={p.id} href="/portfolio" className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700">{p.title}</Link>
                ))}
              </div>
            </div>
          )}
          {job.experiences && job.experiences.length > 0 && (
            <div className="text-sm">
              <span className="text-gray-500">경험</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {job.experiences.map(e => (
                  <Link key={e.id} href="/cover-letter" className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700">{e.title}</Link>
                ))}
              </div>
            </div>
          )}
          {job.interviewAnswers && job.interviewAnswers.length > 0 && (
            <div className="text-sm">
              <span className="text-gray-500">면접 답변</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {job.interviewAnswers.map(a => (
                  <Link key={a.id} href="/interview" className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700">{a.question.question.slice(0, 20)}...</Link>
                ))}
              </div>
            </div>
          )}
          {!job.portfolios?.length && !job.experiences?.length && !job.interviewAnswers?.length && (
            <p className="text-sm text-gray-400">연결된 자료가 없습니다. 포트폴리오, 면접, 경험 페이지에서 지원 건을 연결해보세요.</p>
          )}
        </div>
      </section>

      {/* 진행 단계 */}
      {!isRejected && (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-5">진행 단계</p>
          <div className="flex items-center gap-0">
            {STATUS_ORDER.map((s, i) => {
              const currentIdx = STATUS_ORDER.indexOf(job.status as ApplicationStatus);
              const isDone = i <= currentIdx;
              const isCur = s === job.status;
              const sc = STATUS_CONFIG[s];
              return (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all
                      ${isCur ? `${sc.dot} border-transparent text-white scale-110` :
                        isDone ? 'bg-gray-800 border-gray-800 text-white' :
                        'bg-white border-gray-200 text-gray-300'}`}>
                      {isDone && !isCur ? '✓' : i + 1}
                    </div>
                    <span className={`text-xs whitespace-nowrap ${isCur ? sc.text + ' font-semibold' : isDone ? 'text-gray-600' : 'text-gray-300'}`}>
                      {sc.label}
                    </span>
                  </div>
                  {i < STATUS_ORDER.length - 1 && (
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
      <div id="schedule" className="grid grid-cols-1 md:grid-cols-2 gap-4">

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
                disabled={followUpMutation.isPending}
                className="ml-auto p-1 text-gray-300 hover:text-red-400 transition-colors disabled:opacity-50"
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
                className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="button"
                onClick={() => followUpMutation.mutate(followUpDate)}
                disabled={!followUpDate || followUpMutation.isPending}
                className="px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
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
                    disabled={contactMutation.isPending}
                    className="p-1 text-gray-300 hover:text-red-400 transition-colors shrink-0 disabled:opacity-50"
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
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <input
                value={newContact.role ?? ''}
                onChange={e => setNewContact(p => ({ ...p, role: e.target.value }))}
                placeholder="직책 (예: 채용 담당자)"
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <input
                value={newContact.email ?? ''}
                onChange={e => setNewContact(p => ({ ...p, email: e.target.value }))}
                placeholder="이메일"
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <input
                value={newContact.phone ?? ''}
                onChange={e => setNewContact(p => ({ ...p, phone: e.target.value }))}
                placeholder="전화번호"
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <textarea
                value={newContact.memo ?? ''}
                onChange={e => setNewContact(p => ({ ...p, memo: e.target.value }))}
                placeholder="메모"
                rows={2}
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
              <button
                type="button"
                onClick={() => {
                  if (!newContact.name.trim()) return;
                  contactMutation.mutate([...contacts, newContact]);
                }}
                disabled={!newContact.name.trim() || contactMutation.isPending}
                className="w-full py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> 담당자 추가
              </button>
            </div>
          )}
        </div>
      </div>

      <div id="checklist">
        {/* 제출 서류 체크리스트 */}
      <JobChecklist
        items={job.checklist ?? []}
        onChangeAction={(items) => checklistMutation.mutate(items)}
        disabled={checklistMutation.isPending}
      />
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
                const hcfg = STATUS_CONFIG[h.status as ApplicationStatus] ?? STATUS_CONFIG.PREPARING;
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
        isPending={deleteMutation.isPending}
      />
    </div>
  );
}
