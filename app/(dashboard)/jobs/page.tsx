'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Plus, Search, Trash2, ExternalLink, AlertCircle, ChevronRight, LayoutGrid, List } from 'lucide-react';
import { KanbanBoard } from '@/components/jobs/KanbanBoard';
import { Input } from '@/components/ui/input';
import { SlideOver } from '@/components/ui/slide-over';
import { JobForm } from '@/components/jobs/JobForm';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';
import { toast } from 'sonner';
import { JobPosting } from '@/lib/generated/prisma';
import type { ApplicationStatus } from '@/types';

const statusConfig: Record<ApplicationStatus, { label: string; dot: string; text: string; bg: string }> = {
  PREPARING:     { label: '서류 준비 중', dot: 'bg-slate-400',   text: 'text-slate-700',   bg: 'bg-slate-50'   },
  APPLIED:       { label: '지원 완료',   dot: 'bg-blue-500',    text: 'text-blue-700',    bg: 'bg-blue-50'    },
  DOCUMENT_PASS: { label: '서류 합격',   dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  INTERVIEW:     { label: '면접 예정',   dot: 'bg-amber-500',   text: 'text-amber-700',   bg: 'bg-amber-50'   },
  FINAL_PASS:    { label: '최종 합격',   dot: 'bg-violet-500',  text: 'text-violet-700',  bg: 'bg-violet-50'  },
  REJECTED:      { label: '불합격',     dot: 'bg-red-400',     text: 'text-red-700',     bg: 'bg-red-50'     },
};

async function fetchJobs(search?: string): Promise<JobPosting[]> {
  const url = search ? `/api/jobs?search=${encodeURIComponent(search)}` : '/api/jobs';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return (await res.json()).data;
}

export default function JobsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [slideOpen, setSlideOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [view, setView] = useState<'table' | 'kanban'>('table');

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['jobs', search],
    queryFn: () => fetchJobs(search),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('채용 공고가 삭제되었습니다');
      setDeleteId(null);
    },
    onError: () => toast.error('삭제에 실패했습니다'),
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: () => toast.error('상태 변경에 실패했습니다'),
  });

  const statusCounts = Object.keys(statusConfig).reduce((acc, key) => {
    acc[key as ApplicationStatus] = jobs.filter(j => j.status === key).length;
    return acc;
  }, {} as Record<ApplicationStatus, number>);

  return (
    <div className="min-h-full bg-gray-50/50">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* 헤더 */}
        <div className="flex items-end justify-between border-b border-gray-200 pb-5">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">My Applications</p>
            <h1 className="text-xl font-semibold text-gray-900">내 지원 현황</h1>
            <p className="text-xs text-gray-400 mt-1">맞춤 공고에서 추가한 공고의 지원 상태를 관리하세요</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-gray-200 bg-white p-0.5">
              <button
                type="button"
                onClick={() => setView('table')}
                aria-label="테이블 뷰"
                className={`p-1.5 rounded-md transition-colors ${view === 'table' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setView('kanban')}
                aria-label="칸반 뷰"
                className={`p-1.5 rounded-md transition-colors ${view === 'kanban' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setSlideOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0f172a] px-3 py-2 text-sm font-medium text-white hover:bg-[#1e293b] transition-colors"
            >
              <Plus className="w-4 h-4" /> 공고 추가
            </button>
          </div>
        </div>

        {/* 상태 요약 */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {(Object.entries(statusConfig) as [ApplicationStatus, typeof statusConfig[ApplicationStatus]][]).map(([key, cfg]) => (
            <div key={key} className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm text-center">
              <p className="text-lg font-semibold text-gray-900">{statusCounts[key]}</p>
              <p className={`text-[11px] font-medium mt-0.5 ${cfg.text}`}>{cfg.label}</p>
            </div>
          ))}
        </div>

        {/* 검색 */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="회사명 또는 직무명 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>

        {/* 칸반 뷰 */}
        {view === 'kanban' && (
          <KanbanBoard
            jobs={jobs}
            onStatusChange={() => toast.error('상태 변경은 관리자만 가능합니다')}
            onDelete={(id) => setDeleteId(id)}
          />
        )}

        {/* 테이블 뷰 */}
        {view === 'table' && (
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="divide-y divide-gray-50">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 animate-pulse">
                  <div className="h-4 w-32 bg-gray-100 rounded" />
                  <div className="h-4 w-24 bg-gray-100 rounded" />
                  <div className="ml-auto h-5 w-20 bg-gray-100 rounded-full" />
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-sm font-medium text-gray-600">
                {search ? '검색 결과가 없습니다' : '등록된 채용 공고가 없습니다'}
              </p>
              {!search && (
                <button
                  type="button"
                  onClick={() => setSlideOpen(true)}
                  className="mt-4 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  첫 공고 추가하기
                </button>
              )}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  <th scope="col" className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">회사</th>
                  <th scope="col" className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">직무</th>
                  <th scope="col" className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">상태</th>
                  <th scope="col" className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">마감일</th>
                  <th scope="col" className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider sr-only">액션</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {jobs.map((job) => {
                  const cfg = statusConfig[job.status as ApplicationStatus] ?? statusConfig.PREPARING;
                  const deadline = job.deadline ? new Date(job.deadline) : null;
                  const expired = deadline && deadline < new Date();
                  const daysLeft = deadline ? Math.ceil((deadline.getTime() - Date.now()) / 86400000) : null;
                  const near = daysLeft !== null && daysLeft <= 3 && daysLeft >= 0;

                  return (
                    <tr
                      key={job.id}
                      onClick={() => router.push(`/jobs/${job.id}`)}
                      className="group cursor-pointer hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900 group-hover:text-[#0f172a] transition-colors">
                          {job.company}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-600">{job.position}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${cfg.bg} ${cfg.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {deadline ? (
                          <div className="flex items-center gap-1.5">
                            <span className={`text-xs ${expired ? 'text-red-500' : near ? 'text-amber-600 font-medium' : 'text-gray-500'}`}>
                              {deadline.toLocaleDateString('ko-KR')}
                            </span>
                            {near && !expired && <AlertCircle className="w-3.5 h-3.5 text-amber-500" />}
                            {expired && <span className="text-[10px] text-red-400">만료</span>}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {job.url && (
                            <a
                              href={job.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              aria-label="채용 공고 링크 열기"
                              className="p-1.5 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setDeleteId(job.id); }}
                            aria-label="채용 공고 삭제"
                            className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <ChevronRight className="w-4 h-4 text-gray-300" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        )}
      </div>

      <SlideOver
        open={slideOpen}
        onClose={() => setSlideOpen(false)}
        title="새 채용 공고 추가"
        subtitle="지원할 채용 공고 정보를 입력하세요"
      >
        <JobForm
          onSuccess={() => {
            setSlideOpen(false);
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
          }}
        />
      </SlideOver>

      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="채용 공고 삭제"
        description="이 채용 공고를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      />
    </div>
  );
}
