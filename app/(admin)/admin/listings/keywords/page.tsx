'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { Tag, Merge, Search, ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import EmptyState from '@/components/ui/EmptyState';
import SkeletonList from '@/components/ui/SkeletonList';
import { toast } from 'sonner';

type KeywordStat = {
  keyword: string;
  count: number;
  normalized: string;
  category: string;
};

async function fetchKeywords(): Promise<KeywordStat[]> {
  const res = await fetch('/api/admin/listings/keywords');
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

export default function AdminKeywordsPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const { data: stats = [], isLoading, error, refetch } = useQuery({
    queryKey: ['admin-keywords'],
    queryFn: fetchKeywords,
  });

  const mergeMutation = useMutation({
    mutationFn: async ({ source, target }: { source: string; target: string }) => {
      const res = await fetch('/api/admin/listings/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source, target }),
      });
      if (!res.ok) throw new Error('Failed');
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-keywords'] });
      toast.success('키워드 병합이 완료되었습니다');
    },
    onError: () => toast.error('키워드 병합에 실패했습니다'),
  });

  const categories = Array.from(new Set(stats.map((s) => s.category))).sort();

  const filtered = stats.filter((s) => {
    const matchesSearch = s.keyword.toLowerCase().includes(search.toLowerCase()) ||
      s.normalized.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const grouped: Record<string, KeywordStat[]> = {};
  for (const s of filtered) {
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push(s);
  }

  return (
    <div className="min-h-full">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-end justify-between border-b border-gray-200 pb-6">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Admin</p>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">공고 키워드 관리</h1>
            <p className="text-sm text-gray-500 mt-1.5">활성 공고의 태그 키워드를 집계하고 유사 키워드를 병합합니다</p>
          </div>
          <Link href="/admin/listings" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> 공고 목록으로
          </Link>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="키워드 검색"
              className="pl-10 bg-white border-gray-200 rounded-xl"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-xl bg-white"
          >
            <option value="전체">전체 카테고리</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {isLoading ? (
          <SkeletonList count={6} cardClassName="h-24" />
        ) : error ? (
          <EmptyState
            icon={AlertCircle}
            title="키워드를 불러오지 못했습니다"
            description={error.message}
            action={{ label: '다시 시도', onClick: () => refetch() }}
          />
        ) : stats.length === 0 ? (
          <EmptyState
            icon={Tag}
            title="활성 공고의 태그가 없습니다"
            description="공고에 태그를 등록하면 키워드 집계가 표시됩니다"
            action={{ label: '공고 관리로', href: '/admin/listings' }}
          />
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0])).map(([category, items]) => (
              <div key={category} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-violet-500" /> {category} <span className="text-xs text-gray-400">({items.length}개)</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {items.slice(0, 24).map((s) => (
                    <KeywordCard
                      key={s.keyword}
                      stat={s}
                      allStats={stats}
                      onMerge={(source, target) => mergeMutation.mutate({ source, target })}
                      isMerging={mergeMutation.isPending}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function KeywordCard({
  stat,
  allStats,
  onMerge,
  isMerging,
}: {
  stat: KeywordStat;
  allStats: KeywordStat[];
  onMerge: (source: string, target: string) => void;
  isMerging: boolean;
}) {
  const [mergeOpen, setMergeOpen] = useState(false);

  const similar = allStats.filter(
    (s) =>
      s.keyword !== stat.keyword &&
      (s.normalized.includes(stat.normalized) || stat.normalized.includes(s.normalized))
  );

  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-800 truncate" title={stat.keyword}>{stat.keyword}</span>
        <span className="text-xs font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">{stat.count}</span>
      </div>
      {similar.length > 0 && !mergeOpen && (
        <button
          type="button"
          onClick={() => setMergeOpen(true)}
          disabled={isMerging}
          className="text-[11px] text-gray-500 hover:text-violet-600 flex items-center gap-1"
        >
          <Merge className="w-3 h-3" /> 유사 키워드 {similar.length}개
        </button>
      )}
      {mergeOpen && (
        <div className="space-y-1.5">
          <p className="text-[11px] text-gray-500">병합할 대상 선택</p>
          <div className="flex flex-wrap gap-1.5">
            {similar.map((s) => (
              <button
                key={s.keyword}
                type="button"
                onClick={() => { onMerge(stat.keyword, s.keyword); setMergeOpen(false); }}
                disabled={isMerging}
                className="text-[10px] px-2 py-1 rounded-md bg-white border border-violet-200 text-violet-700 hover:bg-violet-50 disabled:opacity-50"
              >
                {s.keyword}로 병합
              </button>
            ))}
            <button
              type="button"
              onClick={() => setMergeOpen(false)}
              className="text-[10px] px-2 py-1 rounded-md bg-white border border-gray-200 text-gray-500 hover:bg-gray-100"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
