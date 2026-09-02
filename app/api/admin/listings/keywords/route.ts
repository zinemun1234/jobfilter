import { NextRequest } from 'next/server';
import logger from '@/lib/logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { successResponse, unauthorized, forbidden, internalError, badRequest } from '@/lib/api';
import { getKeywordStats, mergeKeywords } from '@/lib/keywords';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return unauthorized();
    if (session.user.role !== 'ADMIN') return forbidden('관리자 권한이 필요합니다.');

    const stats = await getKeywordStats();
    return successResponse(stats);
  } catch (error) {
    logger.error({ err: error }, 'Failed to fetch keyword stats');
    return internalError('키워드 통계를 불러오지 못했습니다.');
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return unauthorized();
    if (session.user.role !== 'ADMIN') return forbidden('관리자 권한이 필요합니다.');

    const { source, target } = await request.json();
    if (!source || !target || source === target) return badRequest('source와 target이 필요하며 서로 달라야 합니다.');

    const updated = await mergeKeywords(source, target);
    return successResponse({ updated });
  } catch (error) {
    logger.error({ err: error }, 'Failed to merge keywords');
    return internalError('키워드 병합에 실패했습니다.');
  }
}
