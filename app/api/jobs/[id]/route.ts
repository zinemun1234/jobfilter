/**
 * GET /api/jobs/[id]    — 단일 지원 공고 조회 (상태 이력 포함)
 * PUT /api/jobs/[id]    — 공고 전체 수정 (상태 변경 시 StatusHistory 자동 기록)
 * PATCH /api/jobs/[id]  — 상태만 변경 (ADMIN 전용)
 * DELETE /api/jobs/[id] — 공고 삭제
 *
 * 모든 엔드포인트는 본인 소유 공고만 접근 가능하다 (userId 체크).
 */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { jobPostingSchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const job = await prisma.jobPosting.findFirst({
      where: { 
        id: params.id,
        userId: session.user.id 
      },
      include: {
        statusHistory: {
          orderBy: { changedAt: 'desc' },
        },
      },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({ data: job } as ApiResponse<typeof job>);
  } catch (error) {
    console.error('Failed to fetch job:', error);
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = jobPostingSchema.parse(body);

    const existingJob = await prisma.jobPosting.findFirst({
      where: { 
        id: params.id,
        userId: session.user.id 
      },
    });

    if (!existingJob) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // 상태가 변경되면 이력 기록
    if (existingJob.status !== validatedData.status) {
      await prisma.statusHistory.create({
        data: {
          jobId: params.id,
          status: validatedData.status,
          note: body.statusNote || '',
        },
      });
    }

    const job = await prisma.jobPosting.update({
      where: { id: params.id },
      data: {
        company: validatedData.company,
        position: validatedData.position,
        url: validatedData.url || null,
        status: validatedData.status,
        deadline: validatedData.deadline ? new Date(validatedData.deadline) : null,
        interviewAt: validatedData.interviewAt ? new Date(validatedData.interviewAt) : null,
        followUpAt: validatedData.followUpAt ? new Date(validatedData.followUpAt) : null,
        contacts: validatedData.contacts ? JSON.stringify(validatedData.contacts) : null,
      },
      include: {
        statusHistory: {
          orderBy: { changedAt: 'desc' },
        },
      },
    });

    return NextResponse.json({ data: job } as ApiResponse<typeof job>);
  } catch (error) {
    console.error('Failed to update job:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // 상태 변경은 관리자만 가능
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { status } = body;

    const existingJob = await prisma.jobPosting.findFirst({
      where: { id: params.id, userId: session.user.id },
    });

    if (!existingJob) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    if (existingJob.status !== status) {
      await prisma.statusHistory.create({
        data: { jobId: params.id, status, note: '' },
      });
    }

    const job = await prisma.jobPosting.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json({ data: job } as ApiResponse<typeof job>);
  } catch (error) {
    console.error('Failed to patch job:', error);
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existingJob = await prisma.jobPosting.findFirst({
      where: { 
        id: params.id,
        userId: session.user.id 
      },
    });

    if (!existingJob) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    await prisma.jobPosting.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ data: { success: true } } as ApiResponse<{ success: boolean }>);
  } catch (error) {
    console.error('Failed to delete job:', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
