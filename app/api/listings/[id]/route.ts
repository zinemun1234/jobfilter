/**
 * GET /api/listings/[id]
 * 단일 공고 상세 조회 (isActive=true인 공고만 반환)
 * tags 필드는 JSON 문자열 → 배열로 파싱
 */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const listing = await prisma.jobListing.findUnique({ where: { id: params.id } });
  if (!listing || !listing.isActive) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({
    data: {
      ...listing,
      tags: (() => { try { return listing.tags ? JSON.parse(listing.tags) : []; } catch { return []; } })(),
    },
  });
}
