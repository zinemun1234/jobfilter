/**
 * GET /api/listings/[id]
 * 단일 공고 상세 조회 (isActive=true인 공고만 반환)
 * tags 필드는 JSON 문자열 → 배열로 파싱
 */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sanitizeJobListing } from '@/lib/api';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const existing = await prisma.jobListing.findUnique({
    where: { id: params.id },
    include: { recruiter: { select: { companyName: true, companyDesc: true, companyLogoUrl: true, companyAttachments: true } } },
  });
  if (!existing || !existing.isActive) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const listing = await prisma.jobListing.update({
    where: { id: params.id },
    data: { viewCount: { increment: 1 } },
    include: { recruiter: { select: { companyName: true, companyDesc: true, companyLogoUrl: true, companyAttachments: true } } },
  });

  const sanitized = sanitizeJobListing({
    ...listing,
    tags: (() => { try { return listing.tags ? JSON.parse(listing.tags) : []; } catch { return []; } })(),
  });
  return NextResponse.json({ data: sanitized });
}
