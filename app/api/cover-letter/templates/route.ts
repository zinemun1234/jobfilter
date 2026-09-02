import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getCoverLetterTemplates } from '@/lib/cover-letter-templates';
import { internalError, unauthorized } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return unauthorized();

    const templates = await getCoverLetterTemplates();
    return NextResponse.json({ data: templates });
  } catch (error) {
    logger.error({ err: error }, 'Failed to fetch cover letter templates');
    return internalError('자소서 템플릿을 불러오지 못했습니다.');
  }
}
