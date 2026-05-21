/**
 * GET /api/admin/users — 전체 사용자 목록 (ADMIN 전용)
 * 활동 통계(_count: jobPostings, portfolios, roadmapItems, interviewAnswers) 포함
 */
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { Session } from 'next-auth';

export const dynamic = 'force-dynamic';

function requireAdmin(session: Session | null) {
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  return null;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const err = requireAdmin(session);
  if (err) return err;

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

  return NextResponse.json({ data: users });
}
