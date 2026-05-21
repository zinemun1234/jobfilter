'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, ExternalLink, Github } from 'lucide-react';
import { SlideOver } from '@/components/ui/slide-over';
import { PortfolioForm } from '@/components/portfolio/PortfolioForm';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';
import { toast } from 'sonner';
import { Portfolio } from '@prisma/client';

async function fetchPortfolios(): Promise<Portfolio[]> {
  const res = await fetch('/api/portfolio');
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

export default function PortfolioPage() {
  const [slideOpen, setSlideOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: portfolios = [], isLoading } = useQuery({
    queryKey: ['portfolios'],
    queryFn: fetchPortfolios,
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

  const getTechStack = (p: Portfolio): string[] => {
    if (Array.isArray(p.techStack)) return p.techStack as string[];
    try { return JSON.parse(p.techStack as string); } catch { return []; }
  };

  const openCreate = () => { setEditingPortfolio(null); setSlideOpen(true); };
  const openEdit = (p: Portfolio) => { setEditingPortfolio(p); setSlideOpen(true); };
  const closeSlide = () => { setSlideOpen(false); setTimeout(() => setEditingPortfolio(null), 300); };

  return (
    <div className="min-h-full bg-gray-50/50">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* 헤더 */}
        <div className="flex items-end justify-between border-b border-gray-200 pb-5">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Portfolio</p>
            <h1 className="text-xl font-semibold text-gray-900">포트폴리오</h1>
            <p className="text-xs text-gray-400 mt-1">프로젝트 경험을 정리하여 자소서와 면접에 활용하세요</p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0f172a] px-3 py-2 text-sm font-medium text-white hover:bg-[#1e293b] transition-colors"
          >
            <Plus className="w-4 h-4" /> 추가
          </button>
        </div>

        {/* 목록 */}
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-xl border border-gray-100 bg-white p-5 animate-pulse space-y-3">
                <div className="h-4 bg-gray-100 rounded w-2/3" />
                <div className="h-3 bg-gray-100 rounded" />
                <div className="h-3 bg-gray-100 rounded w-4/5" />
              </div>
            ))}
          </div>
        ) : portfolios.length === 0 ? (
          <div className="rounded-xl border border-gray-100 bg-white py-20 text-center shadow-sm">
            <p className="text-sm text-gray-400 mb-3">등록된 포트폴리오가 없습니다</p>
            <button
              type="button"
              onClick={openCreate}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              첫 포트폴리오 추가하기
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {portfolios.map((p) => {
              const stack = getTechStack(p);
              return (
                <div
                  key={p.id}
                  className="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-gray-200 transition-all flex flex-col cursor-pointer"
                  onClick={() => openEdit(p)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && openEdit(p)}
                  aria-label={`${p.title} 수정`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium text-gray-900 text-sm leading-snug">{p.title}</h3>
                    <div
                      className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2"
                      onClick={e => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        aria-label="수정"
                        onClick={() => openEdit(p)}
                        className="p-1.5 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label="삭제"
                        onClick={() => setDeleteId(p.id)}
                        className="p-1.5 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-1">{p.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {stack.slice(0, 5).map((tech) => (
                      <span key={tech} className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                    {stack.length > 5 && (
                      <span className="text-[10px] text-gray-400">+{stack.length - 5}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">
                      {new Date(p.startDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'short' })}
                      {' — '}
                      {p.endDate ? new Date(p.endDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'short' }) : '진행 중'}
                    </span>
                    <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-gray-700 transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {p.deployUrl && (
                        <a href={p.deployUrl} target="_blank" rel="noopener noreferrer" aria-label="배포 링크" className="text-gray-400 hover:text-gray-700 transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
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
          onSuccess={() => {
            closeSlide();
            queryClient.invalidateQueries({ queryKey: ['portfolios'] });
          }}
        />
      </SlideOver>

      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="포트폴리오 삭제"
        description="이 포트폴리오를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      />
    </div>
  );
}
