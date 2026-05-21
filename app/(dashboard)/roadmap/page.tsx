'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, CheckCircle, Circle, Play } from 'lucide-react';
import { RoadmapTree } from '@/components/roadmap/RoadmapTree';
import { CustomSkillForm } from '@/components/roadmap/CustomSkillForm';
import { SlideOver } from '@/components/ui/slide-over';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';
import { toast } from 'sonner';
import { RoadmapItem } from '@prisma/client';
import { calculateProgress } from '@/lib/roadmap-templates';

type SkillStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

const jobCategories = [
  { value: 'frontend', label: '프론트엔드' },
  { value: 'backend', label: '백엔드' },
  { value: 'fullstack', label: '풀스택' },
  { value: 'data', label: '데이터 엔지니어링' },
  { value: 'ai', label: 'AI/ML' },
];

const statusConfig: Record<SkillStatus, { label: string; icon: React.ReactNode; color: string }> = {
  NOT_STARTED: { label: '학습 안 함', icon: <Circle className="w-4 h-4" />,      color: 'bg-gray-300'   },
  IN_PROGRESS: { label: '학습 중',   icon: <Play className="w-4 h-4" />,         color: 'bg-blue-500'   },
  COMPLETED:   { label: '학습 완료', icon: <CheckCircle className="w-4 h-4" />,  color: 'bg-emerald-500'},
};

async function fetchRoadmap(jobCategory: string): Promise<RoadmapItem[]> {
  const res = await fetch(`/api/roadmap?jobCategory=${jobCategory}`);
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

async function fetchAllRoadmap(): Promise<RoadmapItem[]> {
  const res = await fetch('/api/roadmap?all=true');
  if (!res.ok) return [];
  return (await res.json()).data ?? [];
}

export default function RoadmapPage() {
  const [selectedCategory, setSelectedCategory] = useState('frontend');
  const [slideOpen, setSlideOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: roadmapItems = [], isLoading } = useQuery({
    queryKey: ['roadmap', selectedCategory],
    queryFn: () => fetchRoadmap(selectedCategory),
  });

  // All categories for progress overview
  const { data: allItems = [] } = useQuery({
    queryKey: ['roadmap-all'],
    queryFn: fetchAllRoadmap,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<RoadmapItem> }) =>
      fetch(`/api/roadmap/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(r => { if (!r.ok) throw new Error('Failed'); return r.json(); }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['roadmap', selectedCategory] }),
    onError: () => toast.error('상태 업데이트에 실패했습니다'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/roadmap/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roadmap', selectedCategory] });
      queryClient.invalidateQueries({ queryKey: ['roadmap-all'] });
      toast.success('항목이 삭제되었습니다');
      setDeleteId(null);
    },
    onError: () => toast.error('삭제에 실패했습니다'),
  });

  const progress = calculateProgress(roadmapItems as unknown as { status: SkillStatus }[]);
  const completed = roadmapItems.filter(i => (i.status as string) === 'COMPLETED').length;
  const inProgress = roadmapItems.filter(i => (i.status as string) === 'IN_PROGRESS').length;

  // Per-category progress from allItems
  const categoryProgress = jobCategories.map(cat => {
    const items = allItems.filter(i => i.jobCategory === cat.value);
    if (items.length === 0) return null;
    const done = items.filter(i => (i.status as string) === 'COMPLETED').length;
    return { ...cat, total: items.length, completed: done, pct: Math.round((done / items.length) * 100) };
  }).filter(Boolean) as { value: string; label: string; total: number; completed: number; pct: number }[];

  return (
    <div className="min-h-full bg-gray-50/50">
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">

        {/* 헤더 */}
        <div className="flex items-end justify-between border-b border-gray-200 pb-5">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Roadmap</p>
            <h1 className="text-xl font-semibold text-gray-900">기술 스택 로드맵</h1>
            <p className="text-xs text-gray-400 mt-1">목표 직무에 필요한 기술을 체계적으로 학습하세요</p>
          </div>
          <button
            type="button"
            onClick={() => setSlideOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0f172a] px-3 py-2 text-sm font-medium text-white hover:bg-[#1e293b] transition-colors"
          >
            <Plus className="w-4 h-4" /> 기술 추가
          </button>
        </div>

        {/* 카테고리별 진행률 개요 */}
        {categoryProgress.length > 0 && (
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">카테고리별 진행률</p>
            <div className="space-y-3">
              {categoryProgress.map(cat => (
                <div key={cat.value} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-24 shrink-0">{cat.label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#0f172a] transition-all duration-500"
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-500 tabular-nums w-10 text-right">{cat.pct}%</span>
                  <span className="text-xs text-gray-400 tabular-nums w-12 text-right">{cat.completed}/{cat.total}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 필터 + 현재 카테고리 진행률 */}
        <div className="flex items-center gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-44 bg-white"><SelectValue /></SelectTrigger>
            <SelectContent>
              {jobCategories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>

          <div className="flex-1 flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
              <div className="h-full rounded-full bg-[#0f172a] transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs font-medium text-gray-500 tabular-nums shrink-0">
              {completed}/{roadmapItems.length} ({progress}%)
            </span>
          </div>
        </div>

        {/* 상태 요약 칩 */}
        {roadmapItems.length > 0 && (
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
              미시작 {roadmapItems.length - completed - inProgress}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              학습 중 {inProgress}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              완료 {completed}
            </span>
          </div>
        )}

        {/* 로드맵 */}
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
          {isLoading ? (
            <div className="p-6 space-y-4 animate-pulse">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-gray-100 shrink-0" />
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : roadmapItems.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm text-gray-400 mb-3">로드맵 데이터가 없습니다</p>
              <button
                type="button"
                onClick={() => setSlideOpen(true)}
                className="text-sm font-medium text-[#0f172a] hover:underline"
              >
                기술 추가하기 →
              </button>
            </div>
          ) : (
            <div className="p-6">
              <RoadmapTree
                items={roadmapItems}
                onStatusChange={(id, status) => updateMutation.mutate({ id, data: { status } })}
                onDelete={id => setDeleteId(id)}
                statusConfig={statusConfig}
              />
            </div>
          )}
        </div>
      </div>

      <SlideOver
        open={slideOpen}
        onClose={() => setSlideOpen(false)}
        title="커스텀 기술 추가"
        subtitle={`${jobCategories.find(c => c.value === selectedCategory)?.label} 로드맵`}
      >
        <CustomSkillForm
          jobCategory={selectedCategory}
          onSuccess={() => {
            setSlideOpen(false);
            queryClient.invalidateQueries({ queryKey: ['roadmap', selectedCategory] });
            queryClient.invalidateQueries({ queryKey: ['roadmap-all'] });
          }}
        />
      </SlideOver>

      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={open => !open && setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="기술 항목 삭제"
        description="이 기술 항목을 삭제하시겠습니까?"
      />
    </div>
  );
}
