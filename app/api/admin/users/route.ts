/**
 * GET /api/admin/users — 전체 사용자 목록 (ADMIN 전용)
 * 활동 통계(_count: jobPostings, portfolios, roadmapItems, interviewAnswers) 포함
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin, sanitizeUser } from '@/lib/api';
import { handleApiError } from '@/lib/errors';

export const dynamic = 'force-dynamic';


export async function GET() {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      major: true,
      targetJob: true,
      role: true,
      companyName: true,
      companyDesc: true,
      isApproved: true,
      createdAt: true,
      _count: {
        select: {
          jobPostings: true,
          portfolios: true,
          roadmapItems: true,
          interviewAnswers: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ data: users.map((user) => sanitizeUser(user)) });
}
