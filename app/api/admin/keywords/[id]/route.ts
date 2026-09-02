import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { z } from 'zod';
import { requireAdmin } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
import { createAuditLog } from '@/lib/audit-log';
import { getKeywordById, updateKeyword, deleteKeyword } from '@/lib/keyword-service';

export const dynamic = 'force-dynamic';

const updateSchema = z.object({
  category: z.string().min(1).optional(),
  key: z.string().min(1).optional(),
  value: z.string().min(1).optional(),
  aliases: z.array(z.string()).optional().nullable(),
});

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  try {
    const keyword = await getKeywordById(params.id);
    if (!keyword) {
      return NextResponse.json({ error: '키워드를 찾을 수 없습니다.', code: 'NOT_FOUND' }, { status: 404 });
    }
    return NextResponse.json({ data: keyword });
  } catch (error) {
    logger.error({ err: error }, 'Failed to get keyword');
    return handleApiError(error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  let userId: string;
  try {
    ({ userId } = await requireAdmin());
  } catch (error) {
    return handleApiError(error);
  }

  try {
    const body = await req.json();
    const data = updateSchema.parse(body);
    const keyword = await updateKeyword(params.id, {
      ...data,
      aliases: data.aliases === undefined ? undefined : (data.aliases ?? null),
    });
    if (!keyword) {
      return NextResponse.json({ error: '키워드를 찾을 수 없습니다.', code: 'NOT_FOUND' }, { status: 404 });
    }
    await createAuditLog({
      userId,
      action: 'UPDATE_KEYWORD',
      resource: 'Keyword',
      resourceId: params.id,
      details: { id: params.id, category: keyword.category, key: keyword.key, value: keyword.value },
      request: req,
    });
    return NextResponse.json({ data: keyword });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: '입력값을 확인해주세요.' }, { status: 400 });
    }
    logger.error({ err: error }, 'Failed to update keyword');
    return handleApiError(error);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  let userId: string;
  try {
    ({ userId } = await requireAdmin());
  } catch (error) {
    return handleApiError(error);
  }

  try {
    const deleted = await deleteKeyword(params.id);
    if (!deleted) {
      return NextResponse.json({ error: '키워드를 찾을 수 없습니다.', code: 'NOT_FOUND' }, { status: 404 });
    }
    await createAuditLog({
      userId,
      action: 'DELETE_KEYWORD',
      resource: 'Keyword',
      resourceId: params.id,
      request: req,
    });
    return NextResponse.json({ data: { ok: true } });
  } catch (error) {
    logger.error({ err: error }, 'Failed to delete keyword');
    return handleApiError(error);
  }
}
