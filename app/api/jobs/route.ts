/**
 * GET /api/jobs
 * 내 지원 공고 목록 조회
 *
 * POST /api/jobs
 * 새 지원 공고 등록 (Zod 스키마 검증)
 */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { jobPostingSchema } from '@/lib/validations';
import { ApiResponse, sanitizeJobPosting } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    const jobs = await prisma.jobPosting.findMany({
      where: {
        userId: session.user.id,
        ...(search && {
          OR: [
            { company: { contains: search } },
            { position: { contains: search } },
          ],
        }),
      },
      include: {
        statusHistory: { orderBy: { changedAt: 'desc' } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const sanitized = jobs.map(sanitizeJobPosting);
    return NextResponse.json({ data: sanitized } as ApiResponse<typeof sanitized>);
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = jobPostingSchema.parse(body);

    const job = await prisma.jobPosting.create({
      data: {
        company: validatedData.company,
        position: validatedData.position,
        url: validatedData.url || null,
        status: validatedData.status,
        deadline: validatedData.deadline ? new Date(validatedData.deadline) : null,
        interviewAt: validatedData.interviewAt ? new Date(validatedData.interviewAt) : null,
        followUpAt: validatedData.followUpAt ? new Date(validatedData.followUpAt) : null,
        contacts: validatedData.contacts ? JSON.stringify(validatedData.contacts) : null,
        userId: session.user.id,
      },
      include: { statusHistory: true },
    });

    const sanitized = sanitizeJobPosting(job);
    return NextResponse.json({ data: sanitized } as ApiResponse<typeof sanitized>, { status: 201 });
  } catch (error) {
    console.error('Failed to create job:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}
