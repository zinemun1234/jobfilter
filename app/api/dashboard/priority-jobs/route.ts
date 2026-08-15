/**
 * GET /api/dashboard/priority-jobs
 * 지금 당장 지원해야 할 공고 점수 (Top 5)
 *
 * - fitScore: 사용자 skills와 공고 tags/직무/경력 교집합 (0~100)
 * - urgencyScore: 마감일까지 남은 일수 (0~100)
 * - popularityScore: 북마크 수 기반 인기 점수 (0~30)
 * - freshnessScore: 공고 게시일 기반 신선도 (0~20)
 * - competitionScore: popularityScore + freshnessScore (0~50, "인기/신선" 지표)
 * - priorityScore = fit*0.5 + urgency*0.25 + popularity(0~100노멀)*0.15 + freshness(0~100노멀)*0.1
 */
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession, successResponse } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
import { calculateMatching, parseJsonArray } from '@/lib/matching';
import { getJobCategory } from '@/lib/roadmap-templates';

export const dynamic = 'force-dynamic';

const DEFAULT_FIT = 0.5;
const DEFAULT_URGENCY = 0.25;
const DEFAULT_COMPETITION = 0.15;
const DEFAULT_FRESHNESS = 0.1;

function parseWeight(value: string | null, fallback: number): number {
  const parsed = parseFloat(value ?? '');
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function normalizeWeights(weights: number[]): number[] {
  const sum = weights.reduce((acc, w) => acc + w, 0);
  if (sum > 0 && Math.abs(sum - 1) > 0.001) {
    return weights.map((w) => w / sum);
  }
  return weights;
}

function calculateFreshness(createdAt: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const created = new Date(createdAt);
  created.setHours(0, 0, 0, 0);
  const ageDays = Math.max(0, Math.floor((today.getTime() - created.getTime()) / 86_400_000));
  return Math.max(0, Math.min(20, Math.round(20 - (ageDays * 20) / 30)));
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getAuthSession();

    const { searchParams } = new URL(request.url);
    const fitWeight = parseWeight(searchParams.get('fit'), DEFAULT_FIT);
    const urgencyWeight = parseWeight(searchParams.get('urgency'), DEFAULT_URGENCY);
    const competitionWeight = parseWeight(searchParams.get('competition'), DEFAULT_COMPETITION);
    const freshnessWeight = parseWeight(searchParams.get('freshness'), DEFAULT_FRESHNESS);

    const [wFit, wUrgency, wCompetition, wFreshness] = normalizeWeights([
      fitWeight,
      urgencyWeight,
      competitionWeight,
      freshnessWeight,
    ]);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { skills: true, targetJob: true },
    });

    const userSkills = parseJsonArray(user?.skills);
    const userJobCategory = getJobCategory(user?.targetJob);

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const listings = await prisma.jobListing.findMany({
      where: {
        isActive: true,
        deadline: { gte: today },
      },
      include: {
        _count: { select: { bookmarks: true } },
      },
      orderBy: { deadline: 'asc' },
    });

    const scored = listings.map((listing) => {
      const tags = parseJsonArray(listing.tags);
      const matching = calculateMatching({
        skills: userSkills,
        tags,
        position: listing.position,
        career: listing.career,
        targetJob: user?.targetJob,
        deadline: listing.deadline,
      });

      const bookmarkCount = listing._count.bookmarks;
      const popularityScore = Math.min(30, bookmarkCount * 3);
      const freshnessScore = calculateFreshness(listing.createdAt);
      const competitionScore = popularityScore + freshnessScore;

      // 0~100 우선순위 점수: fit + urgency + popularity(노멀) + freshness(노멀)
      const priorityScore = Math.round(
        matching.score * wFit +
          matching.urgencyScore * wUrgency +
          (popularityScore / 30) * 100 * wCompetition +
          (freshnessScore / 20) * 100 * wFreshness
      );

      return {
        id: listing.id,
        company: listing.company,
        position: listing.position,
        deadline: listing.deadline,
        createdAt: listing.createdAt.toISOString(),
        tags,
        fitScore: matching.score,
        urgencyScore: matching.urgencyScore,
        popularityScore,
        freshnessScore,
        competitionScore,
        priorityScore,
        matchedSkills: matching.matchedSkills,
        missingSkills: matching.missingSkills,
        reasons: matching.reasons,
        bookmarkCount,
        targetJob: user?.targetJob,
        jobCategory: userJobCategory,
      };
    });

    scored.sort((a, b) => b.priorityScore - a.priorityScore);

    return successResponse(scored.slice(0, 5));
  } catch (error) {
    return handleApiError(error);
  }
}
