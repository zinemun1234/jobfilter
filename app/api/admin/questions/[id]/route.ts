import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const updateSchema = z.object({
  question: z.string().min(1).optional(),
  category: z.enum(['TECHNICAL', 'PERSONALITY', 'SITUATIONAL']).optional(),
  jobType: z.string().optional().nullable(),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  const body = await req.json();
  const data = updateSchema.parse(body);

  const updated = await prisma.interviewQuestion.update({
    where: { id: params.id },
    data,
  });

  return NextResponse.json({ data: updated });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  await prisma.interviewQuestion.delete({ where: { id: params.id } });
  return NextResponse.json({ data: { ok: true } });
}
