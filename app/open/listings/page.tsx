'use client';

/**
 * 공개 채용 공고 목록 페이지
 *
 * - 비로그인 상태에서도 필터/페이지네이션 가능
 * - 로그인 유도 CTA 유지
 */
import { Suspense, useMemo, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  LogIn,
  ArrowRight,
  Lock,
  Zap,
  Search,
} from 'lucide-react';
import ApplyButton from '@/components/jobs/ApplyButton';
import EmptyState from '@/components/ui/EmptyState';
import SkeletonList from '@/components/ui/SkeletonList';
import FilterPanel, { type FilterState } from '@/components/listings/FilterPanel';
import Pagination from '@/components/listings/Pagination';
import { Badge } from '@/components/ui/badge';
import { isRecruiterSource } from '@/lib/utils';

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
  source: string | null;
  category: string | null;
  tags: string[];
  createdAt: string;
};

type PaginatedResponse = {
  data: Listing[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

const SORT_OPTIONS: FilterState['sort'][] = ['createdAt', 'deadline'];

function parseFilters(searchParams: URLSearchParams): FilterState {
  const rawSort = searchParams.get('sort') ?? 'createdAt';
  return {
    search: searchParams.get('search') ?? '',
    career: (searchParams.get('career') ?? 'all') as FilterState['career'],
    employType: (searchParams.get('employType') ?? 'all') as FilterState['employType'],
    category: (searchParams.get('category') ?? 'all') as FilterState['category'],
    location: searchParams.get('location') ?? '',
    tags: (searchParams.get('tags') ?? '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    deadlineFrom: searchParams.get('deadlineFrom') ?? '',
    deadlineTo: searchParams.get('deadlineTo') ?? '',
    sort: SORT_OPTIONS.includes(rawSort as FilterState['sort'])
      ? (rawSort as FilterState['sort'])
      : 'createdAt',
    pageSize: Number(searchParams.get('pageSize') ?? '20'),
  };
}

function buildParams(filters: FilterState & { page?: number }): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.career && filters.career !== 'all') params.set('career', filters.career);
  if (filters.employType && filters.employType !== 'all') params.set('employType', filters.employType);
  if (filters.category && filters.category !== 'all') params.set('category', filters.category);
  if (filters.location) params.set('location', filters.location);
  if (filters.tags.length > 0) params.set('tags', filters.tags.join(','));
  if (filters.deadlineFrom) params.set('deadlineFrom', filters.deadlineFrom);
  if (filters.deadlineTo) params.set('deadlineTo', filters.deadlineTo);
  if (filters.sort) params.set('sort', filters.sort);
  if (filters.pageSize !== 20) params.set('pageSize', String(filters.pageSize));
  if (filters.page && filters.page > 1) params.set('page', String(filters.page));
  return params;
}

async function fetchPublicListings(params: URLSearchParams): Promise<PaginatedResponse> {
  const res = await fetch(`/api/listings/public?${params.toString()}`);
  if (!res.ok) throw new Error('공고를 불러오지 못했습니다');
  return res.json();
}

function OpenListingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);

  const queryParams = useMemo(
    () => buildParams({ ...filters, page: Number(searchParams.get('page') ?? '1') }),
    [filters, searchParams]
  );

  const { data, isLoading } = useQuery({
    queryKey: ['public-listings', queryParams.toString()],
    queryFn: () => fetchPublicListings(queryParams),
  });

  const updateFilters = useCallback(
    (patch: Partial<FilterState & { page?: number }>) => {
      const next = { ...filters, ...patch } as FilterState & { page?: number };
      if (!('page' in patch)) next.page = 1;
      const params = buildParams(next);
      router.replace(`/open/listings?${params.toString()}`);
    },
    [filters, router]
  );

  const listings = data?.data ?? [];
  const total = data?.total ?? 0;
  const page = data?.page ?? 1;
  const pageSize = data?.pageSize ?? 20;
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="min-h-screen bg-background">
      {/* 상단 로그인 유도 배너 */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center shrink-0">
              <span className="text-xs font-black text-primary-foreground">JF</span>
            </div>
            <span className="text-sm font-semibold">Job Filter</span>
            <span className="text-white/30 text-xs hidden sm:block">· 컴퓨터공학부 맞춤 취업 공고</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" /> 로그인
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-1.5 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-lg transition-colors"
            >
              회원가입 <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* 헤더 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border pb-5 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent border border-border px-3 py-1 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">공개 공고</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground">채용 공고 목록</h1>
            <p className="text-xs text-muted-foreground mt-1">컴퓨터공학부 학생에게 맞는 개발·IT·사무직 공고</p>
          </div>
          {total > 0 && (
            <Badge variant="secondary" className="w-fit text-xs font-semibold">
              총 {total}개 공고
            </Badge>
          )}
        </div>

        {/* 로그인 유도 CTA */}
        <div className="rounded-xl border border-primary/20 bg-accent px-5 py-4 flex items-center gap-4">
          <div className="rounded-lg bg-primary/10 p-2.5 shrink-0">
            <Lock className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">로그인하면 더 많은 기능을 사용할 수 있어요</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              지원 목록 추가 · 자소서 코칭 · 매칭률 분석 · 마감 알림
            </p>
          </div>
          <Link
            href="/register"
            className="shrink-0 hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
          >
            무료 시작 <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <FilterPanel
          values={filters}
          onChangeAction={updateFilters}
          onResetAction={() => router.replace('/open/listings')}
          showMatchSort={false}
        />

        {/* 공고 목록 */}
        {isLoading ? (
          <SkeletonList
            count={pageSize}
            className="grid gap-4 md:grid-cols-2"
            cardClassName="h-40 rounded-xl"
          />
        ) : listings.length === 0 ? (
          <EmptyState
            icon={Search}
            title="조건에 맞는 공고가 없습니다"
            description="필터를 조정해 보세요"
            action={{
              label: '필터 초기화',
              onClick: () => router.replace('/open/listings'),
            }}
          />
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              {listings.map((l) => {
                const deadline = l.deadline ? new Date(l.deadline) : null;
                const daysLeft = deadline ? Math.ceil((deadline.getTime() - Date.now()) / 86400000) : null;
                const isNew = (Date.now() - new Date(l.createdAt).getTime()) < 7 * 86400000;
                const isUrgent = daysLeft !== null && daysLeft >= 0 && daysLeft <= 3;

                return (
                  <div
                    key={l.id}
                    className={`rounded-xl border bg-card shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
                      isUrgent ? 'border-destructive/30' : 'border-border'
                    }`}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                            <p className="text-xs font-medium text-muted-foreground">{l.company}</p>
                            {isRecruiterSource(l.source) && (
                              <Badge className="text-xs font-bold bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-50">
                                기업 직접 등록
                              </Badge>
                            )}
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
                            {l.category && (
                              <Badge className="text-xs font-bold bg-violet-50 text-violet-600 border-violet-200 hover:bg-violet-50">
                                {l.category}
                              </Badge>
                            )}
                          </div>
                          <p className="text-base font-semibold text-foreground leading-snug">{l.position}</p>
                        </div>
                        <ApplyButton listingId={l.id} variant="light" />
                      </div>

                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3">
                        {l.location && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {l.location}
                          </span>
                        )}
                        {l.career && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Briefcase className="w-3 h-3" />
                            {l.career}
                          </span>
                        )}
                        {l.education && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <GraduationCap className="w-3 h-3" />
                            {l.education}
                          </span>
                        )}
                        {l.employType && (
                          <Badge variant="secondary" className="text-xs font-normal">
                            {l.employType}
                          </Badge>
                        )}
                      </div>

                      {l.salary && <p className="text-xs text-emerald-600 font-medium mt-2">{l.salary}</p>}

                      {l.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {l.tags.slice(0, 5).map((t) => (
                            <span
                              key={t}
                              className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted/30">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
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
                      <Link
                        href="/login?callbackUrl=/listings"
                        className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-800 font-medium transition-colors"
                      >
                        <Zap className="w-3 h-3" /> 자소서 코칭 받기
                      </Link>
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

        {/* 하단 CTA */}
        {listings.length > 0 && (
          <div className="rounded-xl border-2 border-dashed border-border bg-card py-10 text-center">
            <p className="text-sm font-semibold text-foreground mb-1">마음에 드는 공고를 찾으셨나요?</p>
            <p className="text-xs text-muted-foreground mb-4">
              로그인하면 지원 목록 추가, 자소서 코칭, 매칭률 분석을 이용할 수 있어요
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                무료 회원가입 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                로그인
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OpenListingsPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <SkeletonList
              count={20}
              className="grid gap-4 md:grid-cols-2"
              cardClassName="h-40 rounded-xl"
            />
          </div>
        </div>
      }
    >
      <OpenListingsPage />
    </Suspense>
  );
}
