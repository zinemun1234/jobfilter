import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { z } from 'zod';
import { requireAdmin } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
import { createAuditLog } from '@/lib/audit-log';
import { listKeywords, createKeyword } from '@/lib/keyword-service';

export const dynamic = 'force-dynamic';

const keywordSchema = z.object({
  category: z.string().min(1),
  key: z.string().min(1),
  value: z.string().min(1),
  aliases: z.array(z.string()).optional().nullable(),
});

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') ?? undefined;
    const keywords = await listKeywords(category);
    return NextResponse.json({ data: keywords });
  } catch (error) {
    logger.error({ err: error }, 'Failed to list keywords');
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  let userId: string;
  try {
    ({ userId } = await requireAdmin());
  } catch (error) {
    return handleApiError(error);
  }

  try {
    const body = await req.json();
    const data = keywordSchema.parse(body);
    const keyword = await createKeyword({
      ...data,
      aliases: data.aliases ?? null,
    });
    await createAuditLog({
      userId,
      action: 'CREATE_KEYWORD',
      resource: 'Keyword',
      resourceId: keyword.id,
      details: { category: keyword.category, key: keyword.key, value: keyword.value },
      request: req,
    });
    return NextResponse.json({ data: keyword }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: '입력값을 확인해주세요.' }, { status: 400 });
    }
    logger.error({ err: error }, 'Failed to create keyword');
    return handleApiError(error);
  }
}
