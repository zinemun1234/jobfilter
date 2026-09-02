import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { z } from 'zod';
import { requireAdmin } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
import { createAuditLog } from '@/lib/audit-log';
import { listTemplates, createTemplate } from '@/lib/template-service';
import { stringifyJson } from '@/lib/json-utils';

export const dynamic = 'force-dynamic';

const templateSchema = z.object({
  type: z.string().min(1),
  name: z.string().min(1),
  label: z.string().optional().nullable(),
  data: z.unknown(),
  jobType: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
});

function normalizeData(data: unknown): string {
  if (typeof data === 'string') return data;
  return stringifyJson(data) ?? '{}';
}

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') ?? undefined;
    const templates = await listTemplates(type);
    return NextResponse.json({ data: templates });
  } catch (error) {
    logger.error({ err: error }, 'Failed to list templates');
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
    const data = templateSchema.parse(body);
    const template = await createTemplate({
      type: data.type,
      name: data.name,
      label: data.label ?? null,
      data: normalizeData(data.data),
      jobType: data.jobType ?? null,
      category: data.category ?? null,
    });
    await createAuditLog({
      userId,
      action: 'CREATE_TEMPLATE',
      resource: 'Template',
      resourceId: template.id,
      details: { id: template.id, type: template.type, name: template.name },
      request: req,
    });
    return NextResponse.json({ data: template }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: '입력값을 확인해주세요.' }, { status: 400 });
    }
    logger.error({ err: error }, 'Failed to create template');
    return handleApiError(error);
  }
}
