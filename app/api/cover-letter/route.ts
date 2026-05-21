/**
 * GET /api/cover-letter
 * 내 자소서 목록 조회 (연결된 지원 공고 정보 포함, items JSON 파싱)
 *
 * POST /api/cover-letter
 * 새 자소서 생성
 * - userId가 DB에 없으면 세션 정보로 자동 upsert (소셜 로그인 엣지케이스 대응)
 * - jobId가 있으면 본인 소유 공고인지 검증 후 연결
 */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const letters = await prisma.coverLetter.findMany({
    where: { userId: session.user.id },
    include: { job: { select: { company: true, position: true, status: true } } },
    orderBy: { updatedAt: 'desc' },
  });

  return NextResponse.json({
    data: letters.map((l) => ({
      ...l,
      items: (() => { try { return JSON.parse(l.items); } catch { return []; } })(),
    })),
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // userId가 실제 DB에 존재하는지 확인 — 없으면 세션 정보로 자동 생성 (소셜 로그인 등 엣지케이스 대응)
  const userExists = await prisma.user.findUnique({ where: { id: session.user.id }, select: { id: true } });
  if (!userExists) {
    // 세션에 email이 있으면 upsert, 없으면 404
    if (!session.user.email) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    await prisma.user.upsert({
      where: { email: session.user.email },
      update: { id: session.user.id },
      create: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name ?? null,
        password: '',
        skills: '[]',
        role: 'USER',
      },
    });
  }

  const body = await req.json();
  const { company, position, jobId, items } = body;

  // jobId가 있으면 실제 존재하는지 + 본인 소유인지 확인
  let resolvedJobId: string | null = null;
  if (jobId) {
    const job = await prisma.jobPosting.findFirst({
      where: { id: jobId, userId: session.user.id },
    });
    resolvedJobId = job ? job.id : null;
  }

  const letter = await prisma.coverLetter.create({
    data: {
      userId: session.user.id,
      company,
      position,
      jobId: resolvedJobId,
      items: JSON.stringify(items ?? []),
    },
  });

  return NextResponse.json({ data: { ...letter, items: items ?? [] } }, { status: 201 });
}
