'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Plus, Search, Trash2, ExternalLink, AlertCircle, ChevronRight, LayoutGrid, List, Briefcase, X } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import SkeletonList from '@/components/ui/SkeletonList';
import { KanbanBoard } from '@/components/jobs/KanbanBoard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SlideOver } from '@/components/ui/slide-over';
import { JobForm } from '@/components/jobs/JobForm';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { JobPosting } from '@/lib/generated/prisma';
import type { ApplicationStatus } from '@/types';
import { STATUS_CONFIG, STATUS_ORDER } from '@/lib/status-config';
import { Progress } from '@/components/ui/progress';

type JobWithProgress = JobPosting & { checklistProgress: number | null };

async function fetchJobs(search?: string): Promise<JobWithProgress[]> {
  const url = search ? `/api/jobs?search=${encodeURIComponent(search)}` : '/api/jobs';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return (await res.json()).data;
}

type BulkAction = 'status' | 'delete' | 'deadline';

export default function JobsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [slideOpen, setSlideOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [view, setView] = useState<'table' | 'kanban'>('table');

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState<ApplicationStatus | ''>('');
  const [bulkDeadline, setBulkDeadline] = useState('');
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  const { data: jobs = [], isLoading, error, refetch } = useQuery({
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
  });

  const bulkMutation = useMutation({
    mutationFn: async ({ action, value }: { action: BulkAction; value?: string }) => {
      const res = await fetch('/api/jobs/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds, action, value }),
      });
      if (!res.ok) throw new Error('Failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('선택한 공고를 일괄 처리했습니다');
      setSelectedIds([]);
      setBulkStatus('');
      setBulkDeadline('');
    },
    onError: () => toast.error('일괄 처리에 실패했습니다'),
  });

  const statusCounts = STATUS_ORDER.reduce((acc, key) => {
    acc[key as ApplicationStatus] = jobs.filter(j => j.status === key).length;
    return acc;
  }, {} as Record<ApplicationStatus, number>);

  const allSelected = jobs.length > 0 && selectedIds.length === jobs.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < jobs.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(jobs.map((j) => j.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleBulkStatus = () => {
    if (!bulkStatus) return;
    bulkMutation.mutate({ action: 'status', value: bulkStatus });
  };

  const handleBulkDeadline = () => {
    if (!bulkDeadline) return;
    bulkMutation.mutate({ action: 'deadline', value: bulkDeadline });
  };

  const handleBulkDelete = () => {
    setBulkDeleteOpen(true);
  };

  const confirmBulkDelete = () => {
    bulkMutation.mutate({ action: 'delete' });
    setBulkDeleteOpen(false);
  };

  return (
    <div className="min-h-full">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* 헤더 */}
        <div className="flex items-end justify-between border-b border-gray-200 pb-6">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">My Applications</p>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">내 지원 현황</h1>
            <p className="text-sm text-gray-500 mt-1.5">맞춤 공고에서 추가한 공고의 지원 상태를 관리하세요</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl border border-gray-200 bg-white p-0.5">
              <button
                type="button"
                onClick={() => setView('table')}
                aria-label="테이블 뷰"
                className={`p-2 rounded-lg transition-colors ${view === 'table' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List className="w-[1.125rem] h-[1.125rem]" />
              </button>
              <button
                type="button"
                onClick={() => setView('kanban')}
                aria-label="칸반 뷰"
                className={`p-2 rounded-lg transition-colors ${view === 'kanban' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <LayoutGrid className="w-[1.125rem] h-[1.125rem]" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setSlideOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors shadow-lg shadow-slate-900/10"
            >
              <Plus className="w-4 h-4" /> 공고 추가
            </button>
          </div>
        </div>

        {/* 상태 요약 */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {STATUS_ORDER.map((key) => {
            const cfg = STATUS_CONFIG[key];
            return (
              <div key={key} className="rounded-2xl border border-gray-200 bg-white px-4 py-3.5 shadow-sm text-center">
                <p className="text-xl font-bold text-gray-900">{statusCounts[key]}</p>
                <p className={`text-[11px] font-medium mt-0.5 ${cfg.text}`}>{cfg.label}</p>
              </div>
            );
          })}
        </div>

        {/* 검색 */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="회사명 또는 직무명 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white border-gray-200 focus:border-blue-400 rounded-xl"
          />
        </div>

        {/* 칸반 뷰 */}
        {view === 'kanban' && (
          <KanbanBoard
            jobs={jobs}
            onStatusChangeAction={(id, status) => statusMutation.mutateAsync({ id, status })}
            onDeleteAction={(id) => setDeleteId(id)}
          />
        )}

        {/* 일괄 작업 툴바 */}
        {view === 'table' && selectedIds.length > 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700">
              {selectedIds.length}개 선택
            </span>
            <div className="h-4 w-px bg-gray-200" />
            <Select
              value={bulkStatus}
              onValueChange={(v) => setBulkStatus(v as ApplicationStatus)}
            >
              <SelectTrigger className="h-8 text-xs w-36">
                <SelectValue placeholder="상태 변경" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_ORDER.map((status) => (
                  <SelectItem key={status} value={status} className="text-xs">
                    {STATUS_CONFIG[status].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs"
              onClick={handleBulkStatus}
              disabled={!bulkStatus || bulkMutation.isPending}
            >
              적용
            </Button>
            <div className="h-4 w-px bg-gray-200" />
            <Input
              type="date"
              value={bulkDeadline}
              onChange={(e) => setBulkDeadline(e.target.value)}
              className="h-8 text-xs w-36"
            />
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs"
              onClick={handleBulkDeadline}
              disabled={!bulkDeadline || bulkMutation.isPending}
            >
              마감일 적용
            </Button>
            <div className="h-4 w-px bg-gray-200" />
            <Button
              size="sm"
              variant="destructive"
              className="h-8 text-xs"
              onClick={handleBulkDelete}
              disabled={bulkMutation.isPending}
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" /> 삭제
            </Button>
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="ml-auto p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              aria-label="선택 취소"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 테이블 뷰 */}
        {view === 'table' && (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {isLoading ? (
            <SkeletonList
              count={5}
              variant="row"
              className="divide-y divide-border"
            />
          ) : error ? (
            <EmptyState
              icon={AlertCircle}
              title="공고 목록을 불러오지 못했습니다"
              description={error.message}
              action={{ label: '다시 시도', onClick: () => refetch() }}
              className="border-0 bg-transparent shadow-none"
            />
          ) : jobs.length === 0 ? (
            search ? (
              <EmptyState
                icon={Search}
                title="검색 결과가 없습니다"
                description="다른 키워드로 검색해 보세요"
                action={{ label: '검색 초기화', onClick: () => setSearch('') }}
                className="border-0 bg-transparent shadow-none"
              />
            ) : (
              <EmptyState
                icon={Briefcase}
                title="등록된 채용 공고가 없습니다"
                description="공고를 추가하고 지원 현황을 관리해 보세요"
                action={{ label: '첫 공고 추가하기', onClick: () => setSlideOpen(true) }}
                className="border-0 bg-transparent shadow-none"
              />
            )
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  <th scope="col" className="px-4 py-3.5 w-10">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = someSelected;
                      }}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                      aria-label="전체 선택"
                    />
                  </th>
                  <th scope="col" className="text-left px-6 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wider">회사</th>
                  <th scope="col" className="text-left px-4 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wider">직무</th>
                  <th scope="col" className="text-left px-4 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wider">상태</th>
                  <th scope="col" className="text-left px-4 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wider">마감일</th>
                  <th scope="col" className="text-left px-4 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wider w-32">준비율</th>
                  <th scope="col" className="px-4 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wider sr-only">액션</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {jobs.map((job) => {
                  const cfg = STATUS_CONFIG[job.status as ApplicationStatus] ?? STATUS_CONFIG.PREPARING;
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
                      <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(job.id)}
                          onChange={() => toggleSelect(job.id)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                          aria-label={`${job.company} 선택`}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900 group-hover:text-primary transition-colors">
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
                            {expired && <span className="text-xs text-red-400">만료</span>}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                        {typeof job.checklistProgress === 'number' ? (
                          <div className="w-28">
                            <div className="flex items-center justify-between text-[11px] mb-1">
                              <span className="text-gray-500">준비율</span>
                              <span className={`font-semibold ${job.checklistProgress === 100 ? 'text-emerald-600' : 'text-blue-600'}`}>
                                {job.checklistProgress}%
                              </span>
                            </div>
                            <Progress value={job.checklistProgress} className="h-1.5" />
                          </div>
                        ) : (
                          <span className="text-xs text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          {job.url && (
                            <a
                              href={job.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              aria-label="채용 공고 링크 열기"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setDeleteId(job.id); }}
                            aria-label="채용 공고 삭제"
                            disabled={deleteMutation.isPending}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
        isPending={deleteMutation.isPending}
      />

      <DeleteConfirmDialog
        open={bulkDeleteOpen}
        onOpenChange={setBulkDeleteOpen}
        onConfirm={confirmBulkDelete}
        title="선택한 공고 삭제"
        description={`${selectedIds.length}개의 채용 공고를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        isPending={bulkMutation.isPending}
      />
    </div>
  );
}
