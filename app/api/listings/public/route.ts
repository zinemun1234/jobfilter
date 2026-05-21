import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 비로그인 공개 공고 목록 — 세션 불필요, 읽기 전용
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') ?? '';
  const limit = Math.min(Number(searchParams.get('limit') ?? '50'), 100);

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
    take: limit,
    select: {
      id: true, company: true, position: true, location: true,
      career: true, education: true, employType: true, salary: true,
      deadline: true, tags: true, createdAt: true, isActive: true,
    },
  });

  const total = await prisma.jobListing.count({ where: { isActive: true } });

  return NextResponse.json({
    data: listings.map(l => ({
      ...l,
      tags: (() => { try { return l.tags ? JSON.parse(l.tags) : []; } catch { return []; } })(),
    })),
    total,
  });
}
