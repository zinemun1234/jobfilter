/**
 * 개인 대시보드 통계
 *
 * 사용자별 지원 통계를 계산하는 DB 의존성 함수.
 * lib/dashboard.ts의 순수 함수와 구분하기 위해 별도 파일로 분리.
 */
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  eachMonthOfInterval,
  format,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { prisma } from '@/lib/prisma';
import type { ApplicationStatus } from '@/types';

export type PersonalMonthlyStat = {
  month: string;
  지원: number;
  합격: number;
};

export type PersonalStats = {
  totalApplications: number;
  finalPassCount: number;
  finalPassRate: number;
  interviewOrPassCount: number;
  interviewOrPassRate: number;
  averageProcessDays: number | null;
  statusCounts: Record<ApplicationStatus, number>;
  monthlyStats: PersonalMonthlyStat[];
};

const ALL_STATUSES: ApplicationStatus[] = [
  'PREPARING',
  'APPLIED',
  'DOCUMENT_PASS',
  'INTERVIEW',
  'FINAL_PASS',
  'REJECTED',
];

export async function getPersonalStats(userId: string): Promise<PersonalStats> {
  const now = new Date();
  const monthStart = startOfMonth(subMonths(now, 5));
  const monthEnd = endOfMonth(now);

  const [jobs, monthlyJobs] = await Promise.all([
    prisma.jobPosting.findMany({
      where: { userId },
      select: {
        id: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.jobPosting.findMany({
      where: { userId, createdAt: { gte: monthStart, lte: monthEnd } },
      select: { createdAt: true, status: true },
    }),
  ]);

  // 상태별 카운트
  const statusCounts = Object.fromEntries(
    ALL_STATUSES.map((s) => [s, 0])
  ) as Record<ApplicationStatus, number>;
  for (const job of jobs) {
    if (statusCounts[job.status as ApplicationStatus] !== undefined) {
      statusCounts[job.status as ApplicationStatus] += 1;
    }
  }

  const totalApplications = jobs.length;
  const finalPassCount = statusCounts.FINAL_PASS;
  const finalPassRate = totalApplications > 0 ? Math.round((finalPassCount / totalApplications) * 100) : 0;

  const interviewOrPassCount = statusCounts.INTERVIEW + statusCounts.FINAL_PASS;
  const interviewOrPassRate = totalApplications > 0
    ? Math.round((interviewOrPassCount / totalApplications) * 100)
    : 0;

  // 평균 전형 소요일
  // FINAL_PASS 또는 REJECTED 상태인 공고의 (updatedAt - createdAt) 평균
  const processJobs = jobs.filter(
    (j) => j.status === 'FINAL_PASS' || j.status === 'REJECTED'
  );
  const averageProcessDays = processJobs.length > 0
    ? Math.round(
        processJobs.reduce((sum, j) => sum + (new Date(j.updatedAt).getTime() - new Date(j.createdAt).getTime()) / 86400000, 0) / processJobs.length
      )
    : null;

  // 월별 통계
  const months = eachMonthOfInterval({ start: monthStart, end: monthEnd });
  const monthlyMap: Record<string, PersonalMonthlyStat> = {};
  for (const d of months) {
    const key = format(d, 'yyyy-MM');
    const label = format(d, 'M월', { locale: ko });
    monthlyMap[key] = { month: label, 지원: 0, 합격: 0 };
  }

  for (const job of monthlyJobs) {
    const key = format(new Date(job.createdAt), 'yyyy-MM');
    if (monthlyMap[key]) {
      monthlyMap[key]['지원'] += 1;
      if (job.status === 'FINAL_PASS') {
        monthlyMap[key]['합격'] += 1;
      }
    }
  }

  return {
    totalApplications,
    finalPassCount,
    finalPassRate,
    interviewOrPassCount,
    interviewOrPassRate,
    averageProcessDays,
    statusCounts,
    monthlyStats: Object.values(monthlyMap),
  };
}
