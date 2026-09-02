/**
 * PATCH /api/recruiter/applications/[id]
 * 리크루터가 지원자 상태/메모/면접 일정을 수정
 */
import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { requireRecruiter } from '@/lib/api';
import { handleApiError } from '@/lib/errors';

export const dynamic = 'force-dynamic';

const VALID_STATUSES = ['PREPARING', 'APPLIED', 'DOCUMENT_PASS', 'INTERVIEW', 'FINAL_PASS', 'REJECTED'];

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await requireRecruiter();
    const body = await req.json();

    const existing = await prisma.jobPosting.findFirst({
      where: { id: params.id },
      include: { listing: { select: { recruiterId: true, company: true, position: true } } },
    });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    if (existing.listing?.recruiterId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const status = body.status;
    const recruiterNote = body.recruiterNote;
    const interviewAt = body.interviewAt;

    if (status && !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const data: { status?: string; recruiterNote?: string; interviewAt?: Date | null } = {};
    if (status !== undefined) data.status = status;
    if (recruiterNote !== undefined) data.recruiterNote = recruiterNote;
    if (interviewAt !== undefined) {
      data.interviewAt = interviewAt ? new Date(interviewAt) : null;
    }

    const [updated] = await prisma.$transaction([
      prisma.jobPosting.update({
        where: { id: params.id },
        data,
      }),
      // 상태 변경 이력 남기기
      ...(status && status !== existing.status
        ? [prisma.statusHistory.create({
            data: {
              jobId: params.id,
              status,
              note: recruiterNote ?? undefined,
            },
          })]
        : []),
      // 학생에게 상태 변경 알림 (중복 방지용 upsert)
      ...(status && status !== existing.status
        ? [prisma.userNotification.upsert({
            where: { userId_type_referenceId: { userId: existing.userId, type: 'APPLICATION_STATUS', referenceId: params.id } },
            update: { body: `[${existing.listing?.company ?? existing.company}] ${existing.listing?.position ?? existing.position} 지원 상태가 ${status}로 변경되었습니다.`, isRead: false },
            create: {
              userId: existing.userId,
              type: 'APPLICATION_STATUS',
              referenceId: params.id,
              title: '지원 상태 변경',
              body: `[${existing.listing?.company ?? existing.company}] ${existing.listing?.position ?? existing.position} 지원 상태가 ${status}로 변경되었습니다.`,
            },
          })]
        : []),
    ]);

    return NextResponse.json({ data: updated });
  } catch (error) {
    logger.error({ err: error }, 'Recruiter application update error');
    return handleApiError(error);
  }
}
