/**
 * POST /api/cover-letter/duplicate-check
 * 자소서 항목 간 중복/자기표절 검사
 *
 * - 동일 자소서 내 다른 항목 (자기표절)
 * - 다른 자소서 항목 (중복)
 */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { findDuplicates } from '@/lib/cover-letter-duplicate';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { coverLetterId, threshold } = await req.json();
  if (!coverLetterId) return NextResponse.json({ error: 'coverLetterId required' }, { status: 400 });

  // 본인 소유 자소서인지 확인
  const target = await prisma.coverLetter.findFirst({
    where: { id: coverLetterId, userId: session.user.id },
  });
  if (!target) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // 같은 사용자의 모든 자소서 조회
  const letters = await prisma.coverLetter.findMany({
    where: { userId: session.user.id },
    select: { id: true, company: true, position: true, items: true },
    orderBy: { updatedAt: 'desc' },
  });

  const parsedLetters = letters.map((l) => ({
    ...l,
    items: (() => {
      try {
        const arr = JSON.parse(l.items);
        return Array.isArray(arr) ? arr : [];
      } catch {
        return [];
      }
    })(),
  }));

  const result = findDuplicates(coverLetterId, parsedLetters, typeof threshold === 'number' ? threshold : 0.6);

  return NextResponse.json({ data: result });
}
