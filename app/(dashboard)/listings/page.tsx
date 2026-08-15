'use client';

/**
 * 맞춤 채용 공고 목록 페이지
 *
 * - 서버 사이드 필터링/페이지네이션
 * - URL 쿼리와 필터 상태 동기화
 * - 매칭 점수, 추천 사유 툴팁, 북마크/지원 상태 연동
 */
import { useMemo, useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ExternalLink,
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  FileEdit,
  Zap,
  Bookmark,
} from 'lucide-react';
import { toast } from 'sonner';
import ApplyButton from '@/components/jobs/ApplyButton';
import AddToRoadmapButton from '@/components/roadmap/AddToRoadmapButton';
import { getJobCategory } from '@/lib/roadmap-templates';
import FilterPanel, { type FilterState } from '@/components/listings/FilterPanel';
import Pagination from '@/components/listings/Pagination';
import ReasonTooltip from '@/components/listings/ReasonTooltip';
import { Badge } from '@/components/ui/badge';
import EmptyState from '@/components/ui/EmptyState';
import SkeletonList from '@/components/ui/SkeletonList';
import { Search } from 'lucide-react';

export const dynamic = 'force-dynamic';

type Listing = {
  id: string;
  company: string;
  position: string;
  location: string | null;
  career: string | null;
  education: string | null;
  employType: string | null;
  salary: string | null;
  deadline: string | null;
  url: string | null;
  description: string | null;
  tags: string[];
  createdAt: string;
  matching: {
    score: number;
    urgencyScore: number;
    matchedSkills: string[];
    missingSkills: string[];
    reasons: string[];
  } | null;
  popularityScore: number;
  freshnessScore: number;
  competitionScore: number;
  bookmarkCount: number;
  isBookmarked: boolean;
  isApplied: boolean;
};

type PaginatedResponse = {
  data: Listing[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

const SORT_OPTIONS: FilterState['sort'][] = ['match', 'deadline', 'createdAt'];

function parseFilters(searchParams: URLSearchParams): FilterState {
  const rawSort = searchParams.get('sort') ?? 'match';
  return {
    search: searchParams.get('search') ?? '',
    career: (searchParams.get('career') ?? 'all') as FilterState['career'],
    employType: (searchParams.get('employType') ?? 'all') as FilterState['employType'],
    location: searchParams.get('location') ?? '',
    tags: (searchParams.get('tags') ?? '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    deadlineFrom: searchParams.get('deadlineFrom') ?? '',
    deadlineTo: searchParams.get('deadlineTo') ?? '',
    sort: SORT_OPTIONS.includes(rawSort as FilterState['sort'])
      ? (rawSort as FilterState['sort'])
      : 'match',
    pageSize: Number(searchParams.get('pageSize') ?? '20'),
  };
}

function buildParams(filters: FilterState & { page?: number }): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.career && filters.career !== 'all') params.set('career', filters.career);
  if (filters.employType && filters.employType !== 'all') params.set('employType', filters.employType);
  if (filters.location) params.set('location', filters.location);
  if (filters.tags.length > 0) params.set('tags', filters.tags.join(','));
  if (filters.deadlineFrom) params.set('deadlineFrom', filters.deadlineFrom);
  if (filters.deadlineTo) params.set('deadlineTo', filters.deadlineTo);
  if (filters.sort) params.set('sort', filters.sort);
  if (filters.pageSize !== 20) params.set('pageSize', String(filters.pageSize));
  if (filters.page && filters.page > 1) params.set('page', String(filters.page));
  return params;
}

async function fetchListings(params: URLSearchParams): Promise<PaginatedResponse> {
  const res = await fetch(`/api/listings?${params.toString()}`);
  if (!res.ok) throw new Error('공고를 불러오지 못했습니다');
  return res.json();
}

function MatchBadge({ score }: { score: number }) {
  if (score === 0) return null;
  const color =
    score >= 60
      ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
      : score >= 30
        ? 'bg-amber-100 text-amber-700 border-amber-200'
        : 'bg-muted text-muted-foreground border-border';
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border ${color}`}
    >
      <Zap className="w-2.5 h-2.5" />
      매칭 {score}%
    </span>
  );
}

export default function ListingsPage() {
  const qc = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);
  const [expanded, setExpanded] = useState<string | null>(null);

  const queryParams = useMemo(() => buildParams({ ...filters, page: Number(searchParams.get('page') ?? '1') }), [filters, searchParams]);

  const { data, isLoading } = useQuery({
    queryKey: ['listings', queryParams.toString()],
    queryFn: () => fetchListings(queryParams),
  });

  const updateFilters = useCallback(
    (patch: Partial<FilterState & { page?: number }>) => {
      const next = { ...filters, ...patch } as FilterState & { page?: number };
      if (!('page' in patch)) next.page = 1;
      const params = buildParams(next);
      router.replace(`/listings?${params.toString()}`);
    },
    [filters, router]
  );

  const bookmarkMutation = useMutation({
    mutationFn: async (listingId: string) => {
      const res = await fetch('/api/listings/bookmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId }),
      });
      if (!res.ok) throw new Error('Failed');
      return (await res.json()).data as { bookmarked: boolean };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['listings'] });
      toast.success('북마크 상태가 변경되었습니다');
    },
    onError: () => toast.error('오류가 발생했습니다'),
  });

  const listings = data?.data ?? [];
  const total = data?.total ?? 0;
  const page = data?.page ?? 1;
  const pageSize = data?.pageSize ?? 20;
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="min-h-full">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div className="border-b border-border pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent border border-border px-3 py-1 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">핵심 기능</span>
              <span className="text-xs text-muted-foreground">CS 맞춤 필터링</span>
            </div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">맞춤 채용 공고</h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              컴퓨터공학부 학생에게 맞는 개발·IT·사무직 공고만 필터링되었습니다
            </p>
          </div>
          {total > 0 && (
            <Badge variant="secondary" className="w-fit text-xs font-semibold">
              총 {total}개 공고
            </Badge>
          )}
        </div>

        <FilterPanel
          values={filters}
          onChangeAction={updateFilters}
          onResetAction={() => {
            router.replace('/listings');
          }}
          showMatchSort
        />

        {isLoading ? (
          <SkeletonList
            count={pageSize}
            className="grid gap-4 md:grid-cols-2"
            cardClassName="h-44"
          />
        ) : listings.length === 0 ? (
          <EmptyState
            icon={Search}
            title="조건에 맞는 공고가 없습니다"
            description="필터를 조정해 보세요"
            action={{
              label: '필터 초기화',
              onClick: () => router.replace('/listings'),
            }}
          />
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              {listings.map((l) => {
                const isExpanded = expanded === l.id;
                const deadline = l.deadline ? new Date(l.deadline) : null;
                const daysLeft = deadline ? Math.ceil((deadline.getTime() - Date.now()) / 86400000) : null;
                const isNew = (Date.now() - new Date(l.createdAt).getTime()) < 7 * 86400000;
                const isUrgent = daysLeft !== null && daysLeft >= 0 && daysLeft <= 3;
                const score = l.matching?.score ?? 0;

                return (
                  <div
                    key={l.id}
                    className={`rounded-2xl border bg-card shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
                      isUrgent ? 'border-destructive/30' : 'border-border'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <p className="text-xs font-medium text-muted-foreground">{l.company}</p>
                            {isNew && (
                              <Badge className="text-xs font-bold bg-primary text-primary-foreground hover:bg-primary">
                                NEW
                              </Badge>
                            )}
                            {isUrgent && (
                              <Badge variant="destructive" className="text-xs font-bold">
                                마감임박
                              </Badge>
                            )}
                            <MatchBadge score={score} />
                            <ReasonTooltip
                              reasons={l.matching?.reasons ?? []}
                              matchedSkills={l.matching?.matchedSkills}
                              missingSkills={l.matching?.missingSkills}
                              fitScore={l.matching?.score}
                              urgencyScore={l.matching?.urgencyScore}
                              competitionScore={l.competitionScore}
                            />
                          </div>
                          <Link
                            href={`/listings/${l.id}`}
                            className="text-lg font-semibold text-foreground leading-snug hover:text-primary transition-colors"
                          >
                            {l.position}
                          </Link>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => bookmarkMutation.mutate(l.id)}
                            aria-label={l.isBookmarked ? '찜 해제' : '찜하기'}
                            className={`p-2 rounded-xl transition-colors ${
                              l.isBookmarked
                                ? 'text-violet-500 bg-violet-50'
                                : 'text-muted-foreground hover:text-violet-400 hover:bg-violet-50'
                            }`}
                          >
                            <Bookmark
                              className={`w-5 h-5 ${l.isBookmarked ? 'fill-violet-500' : ''}`}
                            />
                          </button>
                          <ApplyButton listingId={l.id} variant="light" initialAdded={l.isApplied} />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4">
                        {l.location && (
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5" />
                            {l.location}
                          </span>
                        )}
                        {l.career && (
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Briefcase className="w-3.5 h-3.5" />
                            {l.career}
                          </span>
                        )}
                        {l.education && (
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <GraduationCap className="w-3.5 h-3.5" />
                            {l.education}
                          </span>
                        )}
                        {l.employType && (
                          <Badge variant="secondary" className="text-xs font-normal">
                            {l.employType}
                          </Badge>
                        )}
                      </div>

                      {l.salary && <p className="text-sm text-emerald-600 font-medium mt-2.5">{l.salary}</p>}

                      {l.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {l.tags.map((t) => (
                            <span
                              key={t}
                              className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-lg"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {l.matching && l.matching.reasons.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5 items-center">
                          {l.matching.reasons.slice(0, 3).map((reason) => (
                            <span
                              key={reason}
                              className="text-xs text-muted-foreground bg-background border border-border px-2 py-1 rounded-md"
                            >
                              {reason}
                            </span>
                          ))}
                          {l.matching.matchedSkills.length > 0 && (
                            <span className="text-xs text-emerald-600">
                              일치 기술: {l.matching.matchedSkills.join(', ')}
                            </span>
                          )}
                        </div>
                      )}

                      {l.matching && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          기술 매칭 {l.matching.score}% · 마감 임박 {l.matching.urgencyScore} · 인기/신선 {l.competitionScore}
                        </p>
                      )}

                      {l.matching && l.matching.missingSkills.length > 0 && (
                        <div className="mt-2">
                          <AddToRoadmapButton
                            skills={l.matching.missingSkills}
                            jobCategory={getJobCategory(l.position)}
                          />
                        </div>
                      )}

                      {l.description && (
                        <div className="mt-3">
                          <button
                            type="button"
                            onClick={() => setExpanded(isExpanded ? null : l.id)}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {isExpanded ? '상세 접기 ▲' : '상세 보기 ▼'}
                          </button>
                          {isExpanded && (
                            <p className="mt-2 text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap bg-muted rounded-xl p-4">
                              {l.description}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between px-6 py-3.5 border-t border-border bg-muted/30">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        {deadline ? (
                          <span
                            className={
                              daysLeft !== null && daysLeft <= 3 ? 'text-destructive font-medium' : ''
                            }
                          >
                            {daysLeft !== null && daysLeft >= 0
                              ? `D-${daysLeft}`
                              : '마감'} · {deadline.toLocaleDateString('ko-KR')}
                          </span>
                        ) : (
                          '마감일 미정'
                        )}
                      </div>
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() =>
                            router.push(
                              `/cover-letter?company=${encodeURIComponent(l.company)}&position=${encodeURIComponent(l.position)}`
                            )
                          }
                          className="flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-800 font-medium transition-colors"
                        >
                          <FileEdit className="w-3.5 h-3.5" /> 자소서 작성
                        </button>
                        {l.url && (
                          <a
                            href={l.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> 원본 보기
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Pagination
              page={page}
              pageSize={pageSize}
              total={total}
              totalPages={totalPages}
              onPageChangeAction={(p) => updateFilters({ page: p })}
            />
          </>
        )}
      </div>
    </div>
  );
}
