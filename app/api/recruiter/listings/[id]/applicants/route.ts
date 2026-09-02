/**
 * GET /api/recruiter/listings/[id]/applicants
 * 리크루터 본인 공고의 지원자 목록 조회
 */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRecruiter } from '@/lib/api';
import { handleApiError } from '@/lib/errors';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await requireRecruiter();

    const listing = await prisma.jobListing.findFirst({
      where: { id: params.id, recruiterId: userId },
      select: { id: true, company: true, position: true },
    });
    if (!listing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const applications = await prisma.jobPosting.findMany({
      where: { listingId: params.id },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            major: true,
            targetJob: true,
            skills: true,
          },
        },
        coverLetters: { select: { id: true, company: true, position: true, updatedAt: true }, orderBy: { updatedAt: 'desc' }, take: 3 },
        portfolios: { select: { id: true, title: true, updatedAt: true }, orderBy: { updatedAt: 'desc' }, take: 3 },
        experiences: { select: { id: true, title: true }, take: 3 },
        interviewAnswers: { select: { id: true, questionId: true, answer: true }, take: 3 },
        statusHistory: { orderBy: { changedAt: 'desc' }, take: 5 },
      },
    });

    return NextResponse.json({ data: applications });
  } catch (error) {
    return handleApiError(error);
  }
}
