'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, ExternalLink, Github, RefreshCw, AlertCircle, FolderOpen } from 'lucide-react';
import { SlideOver } from '@/components/ui/slide-over';
import { PortfolioForm } from '@/components/portfolio/PortfolioForm';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';
import EmptyState from '@/components/ui/EmptyState';
import SkeletonList from '@/components/ui/SkeletonList';
import { toast } from 'sonner';
import { Portfolio, JobPosting } from '@/lib/generated/prisma';
import GitHubAnalysisCard from '@/components/portfolio/GitHubAnalysisCard';
import { GitHubAnalysisResult } from '@/lib/github-analysis';

type PortfolioWithAnalysis = Portfolio & { githubAnalysis?: GitHubAnalysisResult | null };

async function fetchPortfolios(): Promise<PortfolioWithAnalysis[]> {
  const res = await fetch('/api/portfolio');
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

async function fetchJobs(): Promise<JobPosting[]> {
  const res = await fetch('/api/jobs');
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return (await res.json()).data;
}

export default function PortfolioPage() {
  const [slideOpen, setSlideOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: portfolios = [], isLoading, error, refetch } = useQuery({
    queryKey: ['portfolios'],
    queryFn: fetchPortfolios,
  });

  const { data: jobs = [] } = useQuery<JobPosting[]>({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
      toast.success('포트폴리오가 삭제되었습니다');
      setDeleteId(null);
    },
    onError: () => toast.error('삭제에 실패했습니다'),
  });

  const analyzeMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/portfolio/${id}`, { method: 'POST' });
      if (!res.ok) {
        const result = await res.json().catch(() => ({}));
        throw new Error(result.error || 'Failed');
      }
      return (await res.json()).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
      toast.success('GitHub 분석이 완료되었습니다');
    },
    onError: (e: Error) => toast.error(e.message || 'GitHub 분석에 실패했습니다'),
  });

  const getTechStack = (p: Portfolio): string[] => {
    if (Array.isArray(p.techStack)) return p.techStack as string[];
    try { return JSON.parse(p.techStack as string); } catch { return []; }
  };

  const openCreate = () => { setEditingPortfolio(null); setSlideOpen(true); };
  const openEdit = (p: Portfolio) => { setEditingPortfolio(p); setSlideOpen(true); };
  const closeSlide = () => { setSlideOpen(false); setTimeout(() => setEditingPortfolio(null), 300); };

  return (
    <div className="min-h-full">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* 헤더 */}
        <div className="flex items-end justify-between border-b border-gray-200 pb-6">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Portfolio</p>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">포트폴리오</h1>
            <p className="text-sm text-gray-500 mt-1.5">프로젝트 경험을 정리하여 자소서와 면접에 활용하세요</p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors shadow-lg shadow-slate-900/10"
          >
            <Plus className="w-4 h-4" /> 추가
          </button>
        </div>

        {/* 목록 */}
        {isLoading ? (
          <SkeletonList count={3} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" cardClassName="h-40" />
        ) : error ? (
          <EmptyState
            icon={AlertCircle}
            title="포트폴리오를 불러오지 못했습니다"
            description={error.message}
            action={{ label: '다시 시도', onClick: () => refetch() }}
          />
        ) : portfolios.length === 0 ? (
          <EmptyState
            icon={FolderOpen}
            title="등록된 포트폴리오가 없습니다"
            description="프로젝트 경험을 추가하고 자소서와 면접에 활용하세요"
            action={{ label: '첫 포트폴리오 추가하기', onClick: openCreate }}
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {portfolios.map((p) => {
              const stack = getTechStack(p);
              const linkedJob = jobs.find(job => job.id === p.jobId);
              return (
                <div
                  key={p.id}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all flex flex-col cursor-pointer"
                  onClick={() => openEdit(p)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && openEdit(p)}
                  aria-label={`${p.title} 수정`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-base leading-snug">{p.title}</h3>
                    <div
                      className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2"
                      onClick={e => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        aria-label="수정"
                        onClick={() => openEdit(p)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label="삭제"
                        onClick={() => setDeleteId(p.id)}
                        disabled={deleteMutation.isPending}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {linkedJob && (
                    <p className="text-[11px] text-blue-600 mb-2 truncate">
                      {linkedJob.company} - {linkedJob.position}
                    </p>
                  )}

                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1 leading-relaxed">{p.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {stack.slice(0, 5).map((tech) => (
                      <span key={tech} className="text-[11px] font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">
                        {tech}
                      </span>
                    ))}
                    {stack.length > 5 && (
                      <span className="text-[11px] text-gray-400">+{stack.length - 5}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {new Date(p.startDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'short' })}
                      {' — '}
                      {p.endDate ? new Date(p.endDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'short' }) : '진행 중'}
                    </span>
                    <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-gray-700 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {p.deployUrl && (
                        <a href={p.deployUrl} target="_blank" rel="noopener noreferrer" aria-label="배포 링크" className="text-gray-400 hover:text-gray-700 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {p.githubUrl && (
                    <div className="mt-4" onClick={e => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => analyzeMutation.mutate(p.id)}
                        disabled={analyzeMutation.isPending}
                        className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 disabled:opacity-50 transition-colors"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${analyzeMutation.isPending ? 'animate-spin' : ''}`} />
                        {p.githubAnalysis ? 'GitHub 분석 새로고침' : 'GitHub 분석하기'}
                      </button>
                    </div>
                  )}

                  {p.githubAnalysis && (
                    <GitHubAnalysisCard
                      analysis={p.githubAnalysis}
                      onRefresh={() => analyzeMutation.mutate(p.id)}
                      isRefreshing={analyzeMutation.isPending}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <SlideOver
        open={slideOpen}
        onClose={closeSlide}
        title={editingPortfolio ? '포트폴리오 수정' : '새 포트폴리오 추가'}
        subtitle={editingPortfolio ? editingPortfolio.title : '프로젝트 정보를 입력하세요'}
        width="max-w-xl"
      >
        <PortfolioForm
          portfolio={editingPortfolio ?? undefined}
          onSuccessAction={() => {
            closeSlide();
            queryClient.invalidateQueries({ queryKey: ['portfolios'] });
            queryClient.invalidateQueries({ queryKey: ['job'] });
          }}
        />
      </SlideOver>

      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="포트폴리오 삭제"
        description="이 포트폴리오를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        isPending={deleteMutation.isPending}
      />
    </div>
  );
}
