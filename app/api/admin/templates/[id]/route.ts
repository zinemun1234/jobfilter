import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { z } from 'zod';
import { requireAdmin } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
import { createAuditLog } from '@/lib/audit-log';
import { getTemplateById, updateTemplate, deleteTemplate } from '@/lib/template-service';
import { stringifyJson } from '@/lib/json-utils';

export const dynamic = 'force-dynamic';

const updateSchema = z.object({
  type: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  label: z.string().optional().nullable(),
  data: z.unknown().optional(),
  jobType: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
});

function normalizeData(data: unknown): string {
  if (typeof data === 'string') return data;
  return stringifyJson(data) ?? '{}';
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  try {
    const template = await getTemplateById(params.id);
    if (!template) {
      return NextResponse.json({ error: '템플릿을 찾을 수 없습니다.', code: 'NOT_FOUND' }, { status: 404 });
    }
    return NextResponse.json({ data: template });
  } catch (error) {
    logger.error({ err: error }, 'Failed to get template');
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
    const template = await updateTemplate(params.id, {
      ...data,
      data: data.data === undefined ? undefined : normalizeData(data.data),
    });
    if (!template) {
      return NextResponse.json({ error: '템플릿을 찾을 수 없습니다.', code: 'NOT_FOUND' }, { status: 404 });
    }
    await createAuditLog({
      userId,
      action: 'UPDATE_TEMPLATE',
      resource: 'Template',
      resourceId: params.id,
      details: { id: params.id, type: template.type, name: template.name },
      request: req,
    });
    return NextResponse.json({ data: template });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: '입력값을 확인해주세요.' }, { status: 400 });
    }
    logger.error({ err: error }, 'Failed to update template');
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
    const deleted = await deleteTemplate(params.id);
    if (!deleted) {
      return NextResponse.json({ error: '템플릿을 찾을 수 없습니다.', code: 'NOT_FOUND' }, { status: 404 });
    }
    await createAuditLog({
      userId,
      action: 'DELETE_TEMPLATE',
      resource: 'Template',
      resourceId: params.id,
      request: req,
    });
    return NextResponse.json({ data: { ok: true } });
  } catch (error) {
    logger.error({ err: error }, 'Failed to delete template');
    return handleApiError(error);
  }
}
