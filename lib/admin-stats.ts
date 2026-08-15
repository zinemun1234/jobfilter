import { unstable_cache } from 'next/cache';
import {
  startOfDay,
  endOfDay,
  subDays,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachMonthOfInterval,
  parseISO,
  isValid,
  format,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { prisma } from '@/lib/prisma';
import { STATUS_CONFIG, STATUS_ORDER } from '@/lib/status-config';
import type { ApplicationStatus } from '@/types';

export type Summary = {
  totalUsers: number;
  newUsersThisWeek: number;
  totalApplied: number;
  newJobsThisWeek: number;
  finalPassCount: number;
  employmentRate: number;
  activeListings: number;
  confirmedEmployment: number;
  confirmedRate: number;
};

export type MonthlyApplication = {
  month: string;
  지원: number;
  합격: number;
};

export type StatusDistributionItem = {
  name: string;
  value: number;
  status: string;
};

export type DistributionItem = {
  name: string;
  value: number;
};

export type RecentUser = {
  id: string;
  name: string | null;
  email: string;
  targetJob: string | null;
  createdAt: string;
};

export type RecentListing = {
  id: string;
  company: string;
  position: string;
  deadline: string | null;
  createdAt: string;
};

export type AdminStatsData = {
  summary: Summary;
  monthlyApplications: MonthlyApplication[];
  statusDistribution: StatusDistributionItem[];
  jobTypeDistribution: DistributionItem[];
  goalDistribution: DistributionItem[];
  recentActivities: {
    recentUsers: RecentUser[];
    recentListings: RecentListing[];
  };
  employmentRate: number;
  // 기존 UI 와의 하위호환용 별칭
  monthlyData: MonthlyApplication[];
  statusData: StatusDistributionItem[];
  jobCategoryData: DistributionItem[];
  targetJobData: DistributionItem[];
  recentUsers: RecentUser[];
  recentListings: RecentListing[];
};

function safeDate(value: string): Date | null {
  const d = parseISO(value);
  return isValid(d) ? d : null;
}

function categorizeJobType(position: string): string {
  const pos = position.toLowerCase();
  if (pos.includes('프론트') || pos.includes('front') || pos.includes('react') || pos.includes('vue')) {
    return '프론트엔드';
  }
  if (pos.includes('백엔드') || pos.includes('back') || pos.includes('서버') || pos.includes('spring') || pos.includes('node')) {
    return '백엔드';
  }
  if (pos.includes('풀스택') || pos.includes('full')) {
    return '풀스택';
  }
  if (pos.includes('데이터') || pos.includes('data') || pos.includes('ai') || pos.includes('ml')) {
    return '데이터/AI';
  }
  if (pos.includes('devops') || pos.includes('클라우드') || pos.includes('인프라')) {
    return 'DevOps';
  }
  if (pos.includes('보안') || pos.includes('security')) {
    return '보안';
  }
  if (pos.includes('기획') || pos.includes('pm') || pos.includes('ux')) {
    return 'IT기획/PM';
  }
  if (pos.includes('개발') || pos.includes('engineer') || pos.includes('엔지니어')) {
    return '개발(기타)';
  }
  return '기타';
}

function escapeCsvCell(value: unknown): string {
  const str = String(value ?? '');
  if (str.includes(',') || str.includes('\n') || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function csvRow(cells: unknown[]): string {
  return cells.map(escapeCsvCell).join(',');
}

async function buildAdminStats(from: string, to: string): Promise<AdminStatsData> {
  const fromDate = from ? safeDate(from) : null;
  const toDate = to ? safeDate(to) : null;

  if ((from && !fromDate) || (to && !toDate)) {
    throw new Error('Invalid date range');
  }
  if (fromDate && toDate && fromDate > toDate) {
    throw new Error('from must be before or equal to to');
  }

  const now = new Date();
  const rangeStart = fromDate ? startOfDay(fromDate) : null;
  const rangeEnd = toDate ? endOfDay(toDate) : null;

  const createdAtWhere: { gte?: Date; lte?: Date } = {};
  if (rangeStart) createdAtWhere.gte = rangeStart;
  if (rangeEnd) createdAtWhere.lte = rangeEnd;
  const hasCreatedAtFilter = Boolean(rangeStart || rangeEnd);

  const toBoundary = rangeEnd ?? now;
  const rawWeekStart = subDays(toBoundary, 7);
  const weekStart = rangeStart && rangeStart > rawWeekStart ? rangeStart : rawWeekStart;

  // createdAt 필터를 필요한 where 절에만 조건부로 추가하는 헬퍼
  const withCreatedAt = <T extends Record<string, unknown>>(where: T): T => {
    if (hasCreatedAtFilter) {
      (where as Record<string, unknown>).createdAt = createdAtWhere;
    }
    return where;
  };

  const [
    totalUsers,
    newUsersThisWeek,
    totalApplied,
    newJobsThisWeek,
    activeListings,
    confirmedEmployment,
    statusGroups,
    finalPassJobs,
    targetJobUsers,
    recentUsers,
    recentListings,
  ] = await Promise.all([
    prisma.user.count({ where: withCreatedAt({ role: 'USER' }) }),
    prisma.user.count({
      where: { role: 'USER', createdAt: { gte: weekStart, lte: toBoundary } },
    }),
    prisma.jobPosting.count({ where: withCreatedAt({}) }),
    prisma.jobPosting.count({
      where: { createdAt: { gte: weekStart, lte: toBoundary } },
    }),
    prisma.jobListing.count({ where: { isActive: true } }),
    prisma.employmentRecord.count({ where: withCreatedAt({}) }),
    prisma.jobPosting.groupBy({
      by: ['status'],
      where: withCreatedAt({}),
      _count: { _all: true },
    }),
    prisma.jobPosting.findMany({
      where: withCreatedAt({ status: 'FINAL_PASS' }),
      select: { position: true },
    }),
    prisma.user.findMany({
      where: withCreatedAt({ role: 'USER' }),
      select: { targetJob: true },
    }),
    prisma.user.findMany({
      where: withCreatedAt({ role: 'USER' }),
      select: { id: true, name: true, email: true, targetJob: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.jobListing.findMany({
      where: withCreatedAt({ isActive: true }),
      select: { id: true, company: true, position: true, deadline: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ]);

  // 월별 추이
  const monthStart = rangeStart ? startOfMonth(rangeStart) : startOfMonth(subMonths(now, 5));
  const monthEnd = rangeEnd ? endOfMonth(rangeEnd) : endOfMonth(now);
  const queryStart = rangeStart ?? monthStart;
  const queryEnd = rangeEnd ?? monthEnd;

  const months = eachMonthOfInterval({ start: monthStart, end: monthEnd });
  const monthlyMap: Record<string, MonthlyApplication> = {};
  for (const d of months) {
    const key = format(d, 'yyyy-MM');
    const label = format(d, 'M월', { locale: ko });
    monthlyMap[key] = { month: label, 지원: 0, 합격: 0 };
  }

  const monthlyJobs = await prisma.jobPosting.findMany({
    where: { createdAt: { gte: queryStart, lte: queryEnd } },
    select: { createdAt: true, status: true },
  });

  for (const job of monthlyJobs) {
    const d = new Date(job.createdAt);
    const key = format(d, 'yyyy-MM');
    if (monthlyMap[key]) {
      monthlyMap[key]['지원'] += 1;
      if (job.status === 'FINAL_PASS') monthlyMap[key]['합격'] += 1;
    }
  }

  const monthlyApplications = Object.values(monthlyMap);

  // 지원 상태 분포
  const statusDistribution: StatusDistributionItem[] = statusGroups
    .map((group) => ({
      name: STATUS_CONFIG[group.status as ApplicationStatus]?.label ?? group.status,
      value: group._count._all,
      status: group.status,
    }))
    .sort(
      (a, b) =>
        STATUS_ORDER.indexOf(a.status as ApplicationStatus) -
        STATUS_ORDER.indexOf(b.status as ApplicationStatus),
    );

  // 직군별 최종합격
  const jobCategoryMap: Record<string, number> = {};
  for (const job of finalPassJobs) {
    const cat = categorizeJobType(job.position);
    jobCategoryMap[cat] = (jobCategoryMap[cat] ?? 0) + 1;
  }
  const jobTypeDistribution = Object.entries(jobCategoryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // 학생 목표 직무 분포
  const targetJobMap: Record<string, number> = {};
  for (const u of targetJobUsers) {
    const key = u.targetJob ?? '미설정';
    targetJobMap[key] = (targetJobMap[key] ?? 0) + 1;
  }
  const goalDistribution = Object.entries(targetJobMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  // 최근 활동
  const recentUsersOut: RecentUser[] = recentUsers.map((u) => ({
    ...u,
    createdAt: u.createdAt.toISOString(),
  }));

  const recentListingsOut: RecentListing[] = recentListings.map((l) => ({
    ...l,
    deadline: l.deadline ? l.deadline.toISOString() : null,
    createdAt: l.createdAt.toISOString(),
  }));

  const finalPassCount =
    statusGroups.find((g) => g.status === 'FINAL_PASS')?._count._all ?? 0;
  const employmentRate = totalApplied > 0 ? Math.round((finalPassCount / totalApplied) * 100) : 0;
  const confirmedRate = totalUsers > 0 ? Math.round((confirmedEmployment / totalUsers) * 100) : 0;

  const summary: Summary = {
    totalUsers,
    newUsersThisWeek,
    totalApplied,
    newJobsThisWeek,
    finalPassCount,
    employmentRate,
    activeListings,
    confirmedEmployment,
    confirmedRate,
  };

  return {
    summary,
    monthlyApplications,
    statusDistribution,
    jobTypeDistribution,
    goalDistribution,
    recentActivities: { recentUsers: recentUsersOut, recentListings: recentListingsOut },
    employmentRate,
    // 하위호환 별칭
    monthlyData: monthlyApplications,
    statusData: statusDistribution,
    jobCategoryData: jobTypeDistribution,
    targetJobData: goalDistribution,
    recentUsers: recentUsersOut,
    recentListings: recentListingsOut,
  };
}

export const getAdminStats = unstable_cache(buildAdminStats, ['admin-stats'], {
  revalidate: 60,
  tags: ['admin-stats'],
});

export function toStatsCsv(data: AdminStatsData): string {
  const { summary, monthlyApplications, statusDistribution, jobTypeDistribution, goalDistribution, recentActivities } = data;
  const rows: string[] = [];
  const today = new Date().toLocaleDateString('ko-KR');

  rows.push(csvRow(['JobFilter 관리자 리포트', `생성일: ${today}`]));
  rows.push(csvRow([]));

  rows.push(csvRow(['요약', '값']));
  rows.push(csvRow(['가입 학생', summary.totalUsers]));
  rows.push(csvRow(['최근 7일 신규 학생', summary.newUsersThisWeek]));
  rows.push(csvRow(['전체 지원', summary.totalApplied]));
  rows.push(csvRow(['최근 7일 지원', summary.newJobsThisWeek]));
  rows.push(csvRow(['최종 합격', summary.finalPassCount]));
  rows.push(csvRow(['취업률(%)', summary.employmentRate]));
  rows.push(csvRow(['활성 공고', summary.activeListings]));
  rows.push(csvRow(['취업 확정', summary.confirmedEmployment]));
  rows.push(csvRow(['취업 확정률(%)', summary.confirmedRate]));
  rows.push(csvRow([]));

  rows.push(csvRow(['월별 지원 · 합격']));
  rows.push(csvRow(['월', '지원', '합격']));
  for (const m of monthlyApplications) {
    rows.push(csvRow([m.month, m['지원'], m['합격']]));
  }
  rows.push(csvRow([]));

  rows.push(csvRow(['지원 상태 분포']));
  rows.push(csvRow(['상태', '건수']));
  for (const s of statusDistribution) {
    rows.push(csvRow([s.name, s.value]));
  }
  rows.push(csvRow([]));

  rows.push(csvRow(['직군별 최종 합격']));
  rows.push(csvRow(['직군', '합격자 수']));
  for (const j of jobTypeDistribution) {
    rows.push(csvRow([j.name, j.value]));
  }
  rows.push(csvRow([]));

  rows.push(csvRow(['학생 목표 직무 분포']));
  rows.push(csvRow(['목표 직무', '인원']));
  for (const g of goalDistribution) {
    rows.push(csvRow([g.name, g.value]));
  }
  rows.push(csvRow([]));

  rows.push(csvRow(['최근 가입 학생']));
  rows.push(csvRow(['이름', '이메일', '목표직무', '가입일']));
  for (const u of recentActivities.recentUsers) {
    rows.push(csvRow([
      u.name ?? '(이름 없음)',
      u.email,
      u.targetJob ?? '-',
      new Date(u.createdAt).toLocaleDateString('ko-KR'),
    ]));
  }
  rows.push(csvRow([]));

  rows.push(csvRow(['최근 등록 공고']));
  rows.push(csvRow(['회사', '직책', '마감일', '등록일']));
  for (const l of recentActivities.recentListings) {
    rows.push(csvRow([
      l.company,
      l.position,
      l.deadline ? new Date(l.deadline).toLocaleDateString('ko-KR') : '-',
      new Date(l.createdAt).toLocaleDateString('ko-KR'),
    ]));
  }

  return rows.join('\n');
}
