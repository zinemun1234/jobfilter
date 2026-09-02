import { NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPersonalStats } from '@/lib/dashboard-stats';
import { successResponse, unauthorized, internalError } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return unauthorized();
    }

    const stats = await getPersonalStats(session.user.id);
    return successResponse(stats);
  } catch (error) {
    logger.error({ err: error }, 'Failed to fetch personal stats');
    return internalError('개인 통계를 불러오지 못했습니다.');
  }
}
