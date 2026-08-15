import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { recommendQuestions } from '@/lib/interview-recommend';
import { successResponse, unauthorized, notFound, internalError, badRequest } from '@/lib/api';
import { safeJsonParse } from '@/lib/json-utils';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return unauthorized();

    const { jobId } = await request.json();
    if (!jobId) return badRequest('jobId가 필요합니다.');

    const job = await prisma.jobPosting.findFirst({
      where: { id: jobId, userId: session.user.id },
      include: {
        coverLetters: { select: { items: true } },
        portfolios: { select: { title: true, techStack: true } },
        user: { select: { skills: true } },
      },
    });

    if (!job) return notFound('공고를 찾을 수 없습니다.');

    const skills = safeJsonParse(job.user.skills, []);

    const portfolios = job.portfolios.map((p) => ({
      title: p.title,
      techStack: safeJsonParse(p.techStack, []),
    }));

    const coverLetters = job.coverLetters.map((cl) => ({
      items: safeJsonParse(cl.items, []),
    }));

    const recommendations = recommendQuestions({
      position: job.position,
      skills,
      portfolios,
      coverLetters,
    });

    return successResponse(recommendations);
  } catch (error) {
    console.error('Failed to recommend interview questions:', error);
    return internalError('면접 질문 추천에 실패했습니다.');
  }
}
