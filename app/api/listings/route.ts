/**
 * GET /api/listings
 * 활성 공고 목록 조회 (search 파라미터로 회사명/직무/지역 검색)
 * tags 필드는 JSON 문자열 → 배열로 파싱해서 반환
 *
 * POST /api/listings
 * 공고를 내 지원 목록(JobPosting)에 추가
 * - 같은 회사+직무 공고가 이미 있으면 409 반환
 * - 초기 상태는 PREPARING
 */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// 유저용: 활성 공고 목록 조회
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') ?? '';

  const listings = await prisma.jobListing.findMany({
    where: {
      isActive: true,
      ...(search ? {
        OR: [
          { company: { contains: search } },
          { position: { contains: search } },
          { location: { contains: search } },
        ],
      } : {}),
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({
    data: listings.map(l => ({
      ...l,
      tags: (() => { try { return l.tags ? JSON.parse(l.tags) : []; } catch { return []; } })(),
    })),
  });
}

// 유저용: 공고를 내 지원 목록에 추가
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { listingId } = await req.json();
  if (!listingId) return NextResponse.json({ error: 'listingId required' }, { status: 400 });

  const listing = await prisma.jobListing.findUnique({ where: { id: listingId } });
  if (!listing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // 이미 같은 공고를 추가했는지 확인
  const existing = await prisma.jobPosting.findFirst({
    where: { userId: session.user.id, company: listing.company, position: listing.position },
  });
  if (existing) return NextResponse.json({ error: '이미 추가된 공고입니다' }, { status: 409 });

  const job = await prisma.jobPosting.create({
    data: {
      userId: session.user.id,
      company: listing.company,
      position: listing.position,
      url: listing.url,
      deadline: listing.deadline,
      status: 'PREPARING',
    },
  });

  return NextResponse.json({ data: job }, { status: 201 });
}
