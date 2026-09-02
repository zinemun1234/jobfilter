/**
 * 채용 공고 목록 서버 사이드 필터링/페이지네이션 헬퍼
 *
 * - /api/listings (인증) 와 /api/listings/public (비인증) 에서 공유합니다.
 * - DB 에서는 isActive, search OR, location, deadline 범위만 필터링합니다.
 * - 경력/고용형태/태그 필터와 정렬은 JS 단에서 수행해 JSON/텍스트 칼럼에 대한
 *   복잡한 Prisma 쿼리를 피합니다.
 */
import { prisma } from '@/lib/prisma';
import { calculateMatching, parseJsonArray, type MatchingResult } from '@/lib/matching';
import type { JobListing, Prisma } from '@/lib/generated/prisma';

type JobListingWhereInput = Prisma.JobListingWhereInput;

type JobListingWithCount = JobListing & {
  _count: { bookmarks: number };
};

export type ListingSort = 'match' | 'deadline' | 'createdAt';

export type ListingQuery = {
  search: string;
  career: string;
  employType: string;
  category: string;
  location: string;
  tags: string[];
  deadlineFrom: Date | null;
  deadlineTo: Date | null;
  sort: ListingSort;
  page: number;
  pageSize: number;
};

export type ListingResult = {
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
  category: string | null;
  source: string | null;
  tags: string[];
  createdAt: string;
  matching: MatchingResult | null;
  matchedSkills: string[];
  missingSkills: string[];
  reasons: string[];
  priorityScore: number | null;
  popularityScore: number;
  freshnessScore: number;
  competitionScore: number;
  bookmarkCount: number;
  isBookmarked: boolean;
  isApplied: boolean;
};

export type PaginatedListingResponse = {
  data: ListingResult[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

function parseDate(value: string | null, endOfDay = false): Date | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  if (endOfDay) d.setHours(23, 59, 59, 999);
  else d.setHours(0, 0, 0, 0);
  return d;
}

function asSort(value: string | null): ListingSort | null {
  if (value === 'match' || value === 'deadline' || value === 'createdAt') return value;
  return null;
}

function calculatePopularityScore(bookmarkCount: number): number {
  return Math.min(30, bookmarkCount * 3);
}

function calculateFreshnessScore(createdAt: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const created = new Date(createdAt);
  created.setHours(0, 0, 0, 0);
  const ageDays = Math.max(0, Math.floor((today.getTime() - created.getTime()) / 86_400_000));
  return Math.max(0, Math.min(20, Math.round(20 - (ageDays * 20) / 30)));
}

export function parseListingQuery(
  searchParams: URLSearchParams,
  defaultSort: ListingSort = 'createdAt'
): ListingQuery {
  const rawPage = Number(searchParams.get('page') ?? '1');
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const rawPageSize = Number(searchParams.get('pageSize') ?? '20');
  const pageSize = Math.min(50, Math.max(1, Number.isFinite(rawPageSize) ? rawPageSize : 20));

  const tags = (searchParams.get('tags') ?? '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  return {
    search: (searchParams.get('search') ?? '').trim(),
    career: (searchParams.get('career') ?? 'all').trim().toLowerCase(),
    employType: (searchParams.get('employType') ?? 'all').trim().toLowerCase(),
    category: (searchParams.get('category') ?? 'all').trim(),
    location: (searchParams.get('location') ?? '').trim(),
    tags,
    deadlineFrom: parseDate(searchParams.get('deadlineFrom'), false),
    deadlineTo: parseDate(searchParams.get('deadlineTo'), true),
    sort: asSort(searchParams.get('sort')) ?? defaultSort,
    page,
    pageSize,
  };
}

export function buildListingWhere(query: Pick<ListingQuery, 'search' | 'location' | 'deadlineFrom' | 'deadlineTo'>): JobListingWhereInput {
  const conditions: JobListingWhereInput[] = [{ isActive: true }];

  if (query.search) {
    const s = query.search;
    conditions.push({
      OR: [
        { company: { contains: s, mode: 'insensitive' } },
        { position: { contains: s, mode: 'insensitive' } },
        { location: { contains: s, mode: 'insensitive' } },
      ],
    });
  }

  if (query.location) {
    conditions.push({ location: { contains: query.location, mode: 'insensitive' } });
  }

  if (query.deadlineFrom || query.deadlineTo) {
    const deadlineFilter: { gte?: Date; lte?: Date } = {};
    if (query.deadlineFrom) deadlineFilter.gte = query.deadlineFrom;
    if (query.deadlineTo) deadlineFilter.lte = query.deadlineTo;
    conditions.push({ deadline: deadlineFilter });
  }

  return conditions.length === 1 ? conditions[0] : { AND: conditions };
}

function matchesCareer(career: string | null, filter: string): boolean {
  const c = (career ?? '').toLowerCase().trim();
  switch (filter) {
    case 'all':
      return true;
    case 'new':
      return c === '' || /신입|new|무관|any|인턴|0년/.test(c);
    case 'experienced':
      return /경력|experienced/.test(c) && !/신입|new|무관|any|인턴|0년/.test(c);
    case 'any':
      return c === '' || /무관|any|상관|experienced|경력/.test(c);
    default:
      return c.includes(filter) || c === filter;
  }
}

function matchesEmployType(employType: string | null, filter: string): boolean {
  const e = (employType ?? '').toLowerCase().trim();
  switch (filter) {
    case 'all':
      return true;
    case 'fulltime':
      return /정규직|fulltime|full-time|정규/.test(e);
    case 'contract':
      return /계약직|contract|계약/.test(e);
    case 'intern':
      return /인턴|intern/.test(e);
    default:
      return e === filter || e.includes(filter);
  }
}

function matchesTags(listingTags: string[], queryTags: string[]): boolean {
  if (queryTags.length === 0) return true;
  const normalized = listingTags.map((t) => t.trim().toLowerCase());
  return queryTags.every((q) => normalized.includes(q.trim().toLowerCase()));
}

function matchesCategory(category: string | null, filter: string): boolean {
  if (filter === 'all') return true;
  const c = (category ?? '기타').trim();
  return c === filter;
}

function applyClientFilters(listings: JobListingWithCount[], query: ListingQuery): JobListingWithCount[] {
  return listings.filter((l) => {
    if (!matchesCareer(l.career, query.career)) return false;
    if (!matchesEmployType(l.employType, query.employType)) return false;
    if (!matchesCategory(l.category, query.category)) return false;
    if (!matchesTags(parseJsonArray(l.tags), query.tags)) return false;
    return true;
  });
}

function daysLeft(deadline: Date | null | string | undefined): number | null {
  if (!deadline) return null;
  const d = new Date(deadline);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((d.getTime() - today.getTime()) / 86400000);
}

function sortListings(
  listings: (JobListingWithCount & { matching?: MatchingResult | null })[]
  , sort: ListingSort
): void {
  if (sort === 'match') {
    listings.sort((a, b) => (b.matching?.score ?? 0) - (a.matching?.score ?? 0));
    return;
  }

  if (sort === 'deadline') {
    listings.sort((a, b) => {
      const da = a.deadline ? new Date(a.deadline).getTime() : Infinity;
      const db = b.deadline ? new Date(b.deadline).getTime() : Infinity;
      return da - db;
    });
    return;
  }

  // createdAt desc
  listings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getListings(
  searchParams: URLSearchParams,
  userId?: string
): Promise<PaginatedListingResponse> {
  const defaultSort: ListingSort = userId ? 'match' : 'createdAt';
  const query = parseListingQuery(searchParams, defaultSort);
  const where = buildListingWhere(query);

  const [listings, profile] = await Promise.all([
    prisma.jobListing.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { bookmarks: true } },
      },
    }) as Promise<JobListingWithCount[]>,
    userId
      ? prisma.user.findUnique({
          where: { id: userId },
          select: { skills: true, targetJob: true, major: true },
        })
      : null,
  ]);

  const userSkills = parseJsonArray(profile?.skills);
  const targetJob = profile?.targetJob ?? null;
  const userMajor = profile?.major ?? null;

  let filtered = applyClientFilters(listings, query);

  // 매칭 점수 계산 (인증 사용자만)
  const withMatching = filtered.map((l) => {
    const tags = parseJsonArray(l.tags);
    const matching = userId
      ? calculateMatching({
          skills: userSkills,
          tags,
          position: l.position,
          career: l.career,
          targetJob,
          deadline: l.deadline,
          major: userMajor,
          category: l.category,
        })
      : null;
    return { ...l, matching };
  });

  // match 정렬 요청이지만 인증되지 않은 경우 createdAt desc 로 폴백
  let sort: ListingSort = query.sort;
  if (sort === 'match' && !userId) sort = 'createdAt';

  sortListings(withMatching, sort);

  const total = withMatching.length;
  const totalPages = Math.max(1, Math.ceil(total / query.pageSize));
  const safePage = Math.min(query.page, totalPages);
  const start = (safePage - 1) * query.pageSize;
  const pageItems = withMatching.slice(start, start + query.pageSize);

  // 사용자 플래그 일괄 조회
  const [bookmarks, jobPostings] = userId
    ? await Promise.all([
        prisma.jobBookmark.findMany({
          where: { userId },
          select: { listingId: true },
        }),
        prisma.jobPosting.findMany({
          where: { userId },
          select: { company: true, position: true },
        }),
      ])
    : [[], []];

  const bookmarkSet = new Set(bookmarks.map((b) => b.listingId));
  const appliedSet = new Set(
    jobPostings.map((j) => `${j.company.trim().toLowerCase()}|${j.position.trim().toLowerCase()}`)
  );

  const appliedKey = (company: string, position: string) =>
    `${company.trim().toLowerCase()}|${position.trim().toLowerCase()}`;

  const data: ListingResult[] = pageItems.map((l) => {
    const tags = parseJsonArray(l.tags);
    const matching = l.matching;
    const bookmarkCount = l._count.bookmarks;
    const popularityScore = calculatePopularityScore(bookmarkCount);
    const freshnessScore = calculateFreshnessScore(l.createdAt);
    return {
      id: l.id,
      company: l.company,
      position: l.position,
      source: l.source,
      location: l.location,
      career: l.career,
      education: l.education,
      employType: l.employType,
      salary: l.salary,
      deadline: l.deadline ? l.deadline.toISOString() : null,
      url: l.url,
      description: l.description,
      category: l.category,
      tags,
      createdAt: l.createdAt.toISOString(),
      matching,
      matchedSkills: matching?.matchedSkills ?? [],
      missingSkills: matching?.missingSkills ?? [],
      reasons: matching?.reasons ?? [],
      priorityScore: matching?.score ?? null,
      popularityScore,
      freshnessScore,
      competitionScore: popularityScore + freshnessScore,
      bookmarkCount,
      isBookmarked: userId ? bookmarkSet.has(l.id) : false,
      isApplied: userId ? appliedSet.has(appliedKey(l.company, l.position)) : false,
    };
  });

  return {
    data,
    total,
    page: safePage,
    pageSize: query.pageSize,
    totalPages,
  };
}
