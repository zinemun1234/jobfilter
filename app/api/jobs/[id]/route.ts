/**
 * GET /api/jobs/[id]    — 단일 지원 공고 조회 (상태 이력 포함)
 * PUT /api/jobs/[id]    — 공고 전체 수정 (상태 변경 시 StatusHistory 자동 기록)
 * PATCH /api/jobs/[id]  — 상태만 변경 (소유자 또는 ADMIN)
 * DELETE /api/jobs/[id] — 공고 삭제
 *
 * GET/POST/DELETE는 본인 소유 공고만 접근 가능하고,
 * PUT/PATCH는 본인 또는 ADMIN도 접근할 수 있다.
 */
import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { jobPostingSchema } from '@/lib/validations';
import {
  ApiResponse,
  notFound,
  requireAdminOrOwner,
  sanitizeJobPosting,
} from '@/lib/api';
import { AppError, handleApiError } from '@/lib/errors';
import { safeJsonParse, stringifyJson } from '@/lib/json-utils';
import { createAuditLog } from '@/lib/audit-log';

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
        coverLetters: {
          select: { id: true, version: true, analysisScore: true, updatedAt: true },
          orderBy: { updatedAt: 'desc' },
        },
        portfolios: {
          select: { id: true, title: true, githubUrl: true, techStack: true, updatedAt: true },
          orderBy: { updatedAt: 'desc' },
        },
        experiences: {
          select: { id: true, title: true, situation: true, action: true, result: true, technologies: true, metrics: true, updatedAt: true },
          orderBy: { updatedAt: 'desc' },
        },
        interviewAnswers: {
          select: { id: true, answer: true, updatedAt: true, question: { select: { id: true, question: true, category: true } } },
          orderBy: { updatedAt: 'desc' },
        },
      },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const parsed = {
      ...job,
      contacts: safeJsonParse(job.contacts, []),
      checklist: safeJsonParse(job.checklist, []),
      portfolios: job.portfolios?.map((p) => ({
        ...p,
        techStack: safeJsonParse(p.techStack, []),
      })) ?? [],
      experiences: job.experiences?.map((e) => ({
        ...e,
        technologies: safeJsonParse(e.technologies, []),
      })) ?? [],
      interviewAnswers: job.interviewAnswers ?? [],
    };
    const result = sanitizeJobPosting(parsed);
    return NextResponse.json({ data: result } as ApiResponse<typeof result>);
  } catch (error) {
    logger.error({ err: error }, 'Failed to fetch job');
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = jobPostingSchema.parse(body);

    const existingJob = await prisma.jobPosting.findFirst({
      where: { id: params.id },
    });

    if (!existingJob) {
      return notFound();
    }

    await requireAdminOrOwner(existingJob.userId);

    const job = await prisma.$transaction(async (tx) => {
      // 상태 이력과 상태 변경을 하나의 작업으로 처리
      if (existingJob.status !== validatedData.status) {
        await tx.statusHistory.create({
          data: {
            jobId: params.id,
            status: validatedData.status,
            changedAt: new Date(),
            note: body.statusNote ?? null,
          },
        });
      }

      return tx.jobPosting.update({
        where: { id: params.id },
        data: {
          company: validatedData.company,
          position: validatedData.position,
          url: validatedData.url || null,
          status: validatedData.status,
          deadline: validatedData.deadline ? new Date(validatedData.deadline) : null,
          interviewAt: validatedData.interviewAt ? new Date(validatedData.interviewAt) : null,
          followUpAt: validatedData.followUpAt ? new Date(validatedData.followUpAt) : null,
          contacts: stringifyJson(validatedData.contacts),
          checklist: Array.isArray(body.checklist) ? stringifyJson(body.checklist) : existingJob.checklist,
        },
        include: {
          statusHistory: {
            orderBy: { changedAt: 'desc' },
          },
        },
      });
    });

    const result = {
      ...job,
      contacts: safeJsonParse(job.contacts, []),
      checklist: safeJsonParse(job.checklist, []),
    };
    return NextResponse.json({ data: sanitizeJobPosting(result) } as ApiResponse<typeof result>);
  } catch (error) {
    if (error instanceof AppError) {
      return handleApiError(error);
    }
    logger.error({ err: error }, 'Failed to update job');
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
    const body = await request.json();
    const { status } = body;

    // 상태값 검증
    let validatedStatus: string;
    try {
      validatedStatus = jobPostingSchema.shape.status.parse(status);
    } catch {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const existingJob = await prisma.jobPosting.findFirst({
      where: { id: params.id },
    });

    if (!existingJob) {
      return notFound();
    }

    await requireAdminOrOwner(existingJob.userId);

    const job = await prisma.$transaction(async (tx) => {
      // 상태 이력과 상태 변경을 하나의 작업으로 처리
      if (existingJob.status !== validatedStatus) {
        await tx.statusHistory.create({
          data: {
            jobId: params.id,
            status: validatedStatus,
            changedAt: new Date(),
            note: null,
          },
        });
      }

      return tx.jobPosting.update({
        where: { id: params.id },
        data: { status: validatedStatus },
      });
    });

    const sanitized = sanitizeJobPosting(job);
    return NextResponse.json({ data: sanitized } as ApiResponse<typeof sanitized>);
  } catch (error) {
    if (error instanceof AppError) {
      return handleApiError(error);
    }
    logger.error({ err: error }, 'Failed to patch job');
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { checklist } = body as { checklist?: { label: string; checked: boolean }[] };
    if (!Array.isArray(checklist)) {
      return NextResponse.json({ error: 'Invalid checklist' }, { status: 400 });
    }

    const existingJob = await prisma.jobPosting.findFirst({
      where: { id: params.id, userId: session.user.id },
    });
    if (!existingJob) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const job = await prisma.jobPosting.update({
      where: { id: params.id },
      data: { checklist: stringifyJson(checklist) },
      include: { statusHistory: { orderBy: { changedAt: 'desc' } } },
    });

    const result = {
      ...job,
      contacts: safeJsonParse(job.contacts, []),
      checklist: safeJsonParse(job.checklist, []),
    };
    return NextResponse.json({ data: sanitizeJobPosting(result) } as ApiResponse<typeof result>);
  } catch (error) {
    logger.error({ err: error }, 'Failed to update checklist');
    return NextResponse.json({ error: 'Failed to update checklist' }, { status: 500 });
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

    await createAuditLog({
      userId: session.user.id,
      action: 'DELETE_JOB_POSTING',
      resource: 'JobPosting',
      resourceId: params.id,
      details: { id: params.id, company: existingJob.company, position: existingJob.position },
      request,
    });

    await prisma.jobPosting.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ data: { success: true } } as ApiResponse<{ success: boolean }>);
  } catch (error) {
    logger.error({ err: error }, 'Failed to delete job');
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
