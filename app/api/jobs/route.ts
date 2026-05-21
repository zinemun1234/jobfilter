/**
 * GET /api/jobs
 * 내 지원 공고 목록 조회 + 자동 알림 생성
 *
 * 조회 시 3가지 알림을 자동으로 생성한다 (중복 방지: body에 key 포함 여부로 체크):
 * 1. 마감 D-3 이내 알림 — FINAL_PASS/REJECTED 제외
 * 2. 면접 D-1 알림 — interviewAt 기준
 * 3. 팔로업 리마인더 — APPLIED 상태로 14일 이상 경과
 *
 * POST /api/jobs
 * 새 지원 공고 등록 (Zod 스키마 검증)
 */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { jobPostingSchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/api';

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

    const now = new Date();

    // 1) 마감 3일 이내 알림
    const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    for (const job of jobs.filter(j =>
      j.deadline && j.deadline > now && j.deadline <= threeDaysLater &&
      !['FINAL_PASS', 'REJECTED'].includes(j.status)
    )) {
      const key = `deadline:${job.id}`;
      const exists = await prisma.userNotification.findFirst({
        where: { userId: session.user.id, body: { contains: key } },
      });
      if (!exists) {
        const d = Math.ceil((job.deadline!.getTime() - now.getTime()) / 86400000);
        await prisma.userNotification.create({
          data: {
            userId: session.user.id,
            title: `마감 D-${d} | ${job.company} ${job.position}`,
            body: `지원 마감이 ${d}일 남았습니다. [${key}]`,
          },
        });
      }
    }

    // 2) 면접 D-1 알림
    const twoDaysLater = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
    for (const job of jobs.filter(j =>
      j.interviewAt && j.interviewAt > now && j.interviewAt <= twoDaysLater
    )) {
      const key = `interview:${job.id}`;
      const exists = await prisma.userNotification.findFirst({
        where: { userId: session.user.id, body: { contains: key } },
      });
      if (!exists) {
        const d = Math.ceil((job.interviewAt!.getTime() - now.getTime()) / 86400000);
        await prisma.userNotification.create({
          data: {
            userId: session.user.id,
            title: `면접 D-${d} | ${job.company} ${job.position}`,
            body: `면접이 ${d}일 후입니다. 준비 잘 하세요! [${key}]`,
          },
        });
      }
    }

    // 3) 팔로업 리마인더: APPLIED 상태로 14일 이상 경과
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    for (const job of jobs.filter(j =>
      j.status === 'APPLIED' && new Date(j.updatedAt) <= twoWeeksAgo
    )) {
      const key = `followup:${job.id}`;
      const exists = await prisma.userNotification.findFirst({
        where: { userId: session.user.id, body: { contains: key } },
      });
      if (!exists) {
        const days = Math.floor((now.getTime() - new Date(job.updatedAt).getTime()) / 86400000);
        await prisma.userNotification.create({
          data: {
            userId: session.user.id,
            title: `팔로업 필요 | ${job.company} ${job.position}`,
            body: `지원한 지 ${days}일이 지났습니다. 결과를 확인해보세요. [${key}]`,
          },
        });
      }
    }

    return NextResponse.json({ data: jobs } as ApiResponse<typeof jobs>);
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

    return NextResponse.json({ data: job } as ApiResponse<typeof job>, { status: 201 });
  } catch (error) {
    console.error('Failed to create job:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}
