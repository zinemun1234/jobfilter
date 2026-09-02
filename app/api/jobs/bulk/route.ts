import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { jobPostingSchema } from '@/lib/validations';
import { successResponse, badRequest, unauthorized, internalError, ApiResponse } from '@/lib/api';

export const dynamic = 'force-dynamic';

type BulkAction = 'status' | 'delete' | 'deadline';

interface BulkRequest {
  ids: string[];
  action: BulkAction;
  value?: string;
}

/**
 * POST /api/jobs/bulk
 * 지원 공고 일괄 처리 (상태 변경, 삭제, 마감일 설정)
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return unauthorized();
    }

    const body: BulkRequest = await request.json();
    const { ids, action, value } = body;

    if (!Array.isArray(ids) || ids.length === 0 || !action) {
      return badRequest('ids 배열과 action은 필수입니다.');
    }

    const isAdmin = session.user.role === 'ADMIN';

    // 관리자가 아니면 본인 소유 공고만 대상으로 제한
    const where = isAdmin
      ? { id: { in: ids } }
      : { id: { in: ids }, userId: session.user.id };

    if (action === 'delete') {
      const { count } = await prisma.jobPosting.deleteMany({ where });
      return successResponse({ deleted: count });
    }

    if (action === 'status') {
      if (!value) return badRequest('상태 변경 시 value가 필요합니다.');

      let validatedStatus: string;
      try {
        validatedStatus = jobPostingSchema.shape.status.parse(value);
      } catch {
        return badRequest('유효하지 않은 상태값입니다.');
      }

      const jobs = await prisma.jobPosting.findMany({
        where,
        select: { id: true, status: true },
      });

      if (!isAdmin && jobs.length !== ids.length) {
        return NextResponse.json({ error: '일부 공고에 접근 권한이 없습니다.' }, { status: 403 });
      }

      await prisma.$transaction(async (tx) => {
        for (const job of jobs) {
          if (job.status !== validatedStatus) {
            await tx.statusHistory.create({
              data: {
                jobId: job.id,
                status: validatedStatus,
                changedAt: new Date(),
                note: null,
              },
            });
          }
        }

        await tx.jobPosting.updateMany({
          where,
          data: { status: validatedStatus },
        });
      });

      return successResponse({ updated: jobs.length });
    }

    if (action === 'deadline') {
      const deadlineDate = value ? new Date(value) : null;
      if (value && isNaN(deadlineDate?.getTime() ?? 0)) {
        return badRequest('유효하지 않은 마감일입니다.');
      }

      const { count } = await prisma.jobPosting.updateMany({
        where,
        data: { deadline: deadlineDate },
      });

      return successResponse({ updated: count });
    }

    return badRequest('지원하지 않는 action입니다.');
  } catch (error) {
    logger.error({ err: error }, 'Failed to bulk update jobs');
    return internalError('일괄 처리 중 오류가 발생했습니다.');
  }
}
