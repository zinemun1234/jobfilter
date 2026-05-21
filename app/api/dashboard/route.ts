import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession, successResponse } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
import {
  aggregateByStatus,
  calculateRoadmapProgress,
  filterUrgentDeadlines,
} from '@/lib/dashboard';
import type { DashboardSummary, JobPosting, SkillStatus } from '@/types';

export async function GET(): Promise<NextResponse> {
  try {
    const userId = await getAuthSession();

    const [jobPostings, roadmapItems] = await Promise.all([
      prisma.jobPosting.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.roadmapItem.findMany({
        where: { userId },
      }),
    ]);

    // Prisma returns string for status fields; cast to our union types
    const typedPostings = jobPostings as unknown as JobPosting[];
    const typedRoadmap = roadmapItems as unknown as { status: SkillStatus }[];

    const applicationCounts = aggregateByStatus(typedPostings);
    const urgentDeadlines = filterUrgentDeadlines(typedPostings, 7);
    const roadmapProgress = calculateRoadmapProgress(typedRoadmap);
    const upcomingInterviews = typedPostings.filter(
      (p) => p.status === 'INTERVIEW'
    );

    const summary: DashboardSummary = {
      applicationCounts,
      upcomingInterviews,
      roadmapProgress,
      urgentDeadlines,
    };

    return successResponse(summary);
  } catch (error) {
    return handleApiError(error);
  }
}
