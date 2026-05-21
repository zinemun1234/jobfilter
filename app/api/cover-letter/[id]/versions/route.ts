/**
 * GET /api/cover-letter/[id]/versions
 * 자소서 버전 히스토리 목록 조회 (최신순, items JSON 파싱)
 *
 * POST /api/cover-letter/[id]/versions
 * 특정 버전으로 복원
 * - 복원 전 현재 상태도 스냅샷으로 저장 (복원 취소 가능하도록)
 * - version 자동 증가
 */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET — 버전 목록 조회
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const letter = await prisma.coverLetter.findFirst({
    where: { id: params.id, userId: session.user.id },
  });
  if (!letter) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const versions = await prisma.coverLetterVersion.findMany({
    where: { coverLetterId: params.id },
    orderBy: { savedAt: 'desc' },
  });

  return NextResponse.json({
    data: versions.map(v => ({
      ...v,
      items: (() => { try { return JSON.parse(v.items); } catch { return []; } })(),
    })),
  });
}

// POST — 특정 버전으로 복원
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { versionId } = await req.json();
  if (!versionId) return NextResponse.json({ error: 'versionId required' }, { status: 400 });

  const letter = await prisma.coverLetter.findFirst({
    where: { id: params.id, userId: session.user.id },
  });
  if (!letter) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const snapshot = await prisma.coverLetterVersion.findFirst({
    where: { id: versionId, coverLetterId: params.id },
  });
  if (!snapshot) return NextResponse.json({ error: 'Version not found' }, { status: 404 });

  // 복원 전 현재 상태도 스냅샷으로 저장
  await prisma.coverLetterVersion.create({
    data: {
      coverLetterId: letter.id,
      version: letter.version,
      items: letter.items,
    },
  });

  await prisma.coverLetter.update({
    where: { id: params.id },
    data: {
      items: snapshot.items,
      version: { increment: 1 },
    },
  });

  return NextResponse.json({ data: { ok: true } });
}
