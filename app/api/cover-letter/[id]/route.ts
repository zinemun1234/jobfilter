/**
 * GET /api/cover-letter/[id]    — 단일 자소서 조회 (연결 공고 포함)
 * PUT /api/cover-letter/[id]    — 자소서 수정
 *   - 수정 전 현재 내용을 CoverLetterVersion으로 스냅샷 저장 (최대 10개 유지)
 *   - version 자동 증가
 * DELETE /api/cover-letter/[id] — 자소서 삭제
 */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const letter = await prisma.coverLetter.findFirst({
    where: { id: params.id, userId: session.user.id },
    include: { job: { select: { company: true, position: true } } },
  });
  if (!letter) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({
    data: { ...letter, items: (() => { try { return JSON.parse(letter.items); } catch { return []; } })() },
  });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { company, position, jobId, items } = body;

  // jobId 유효성 검증
  let resolvedJobId: string | null = null;
  if (jobId) {
    const job = await prisma.jobPosting.findFirst({
      where: { id: jobId, userId: session.user.id },
    });
    resolvedJobId = job ? job.id : null;
  }

  // 현재 버전 스냅샷 저장 후 덮어쓰기
  const current = await prisma.coverLetter.findFirst({
    where: { id: params.id, userId: session.user.id },
  });

  if (current) {
    // 최근 10개 버전만 유지
    const versionCount = await prisma.coverLetterVersion.count({
      where: { coverLetterId: current.id },
    });
    if (versionCount >= 10) {
      const oldest = await prisma.coverLetterVersion.findFirst({
        where: { coverLetterId: current.id },
        orderBy: { savedAt: 'asc' },
      });
      if (oldest) await prisma.coverLetterVersion.delete({ where: { id: oldest.id } });
    }
    await prisma.coverLetterVersion.create({
      data: {
        coverLetterId: current.id,
        version: current.version,
        items: current.items,
      },
    });
  }

  const letter = await prisma.coverLetter.updateMany({
    where: { id: params.id, userId: session.user.id },
    data: {
      company, position, jobId: resolvedJobId,
      items: JSON.stringify(items ?? []),
      version: { increment: 1 },
    },
  });

  return NextResponse.json({ data: letter });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await prisma.coverLetter.deleteMany({ where: { id: params.id, userId: session.user.id } });
  return NextResponse.json({ ok: true });
}
