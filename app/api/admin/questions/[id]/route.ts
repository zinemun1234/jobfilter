import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin, sanitizeInterviewQuestion } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
import { createAuditLog } from '@/lib/audit-log';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const updateSchema = z.object({
  question: z.string().min(1).optional(),
  category: z.enum(['TECHNICAL', 'PERSONALITY', 'SITUATIONAL']).optional(),
  jobType: z.string().optional().nullable(),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  let userId: string;
  try {
    ({ userId } = await requireAdmin());
  } catch (error) {
    return handleApiError(error);
  }

  const body = await req.json();
  const data = updateSchema.parse(body);

  const previous = await prisma.interviewQuestion.findUnique({
    where: { id: params.id },
    select: { id: true, category: true, jobType: true },
  });

  const updated = await prisma.interviewQuestion.update({
    where: { id: params.id },
    data,
  });

  await createAuditLog({
    userId,
    action: 'UPDATE_QUESTION',
    resource: 'InterviewQuestion',
    resourceId: params.id,
    details: {
      id: params.id,
      previousCategory: previous?.category,
      newCategory: updated.category,
      previousJobType: previous?.jobType,
      newJobType: updated.jobType,
    },
    request: req,
  });

  return NextResponse.json({ data: sanitizeInterviewQuestion(updated) });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  let userId: string;
  try {
    ({ userId } = await requireAdmin());
  } catch (error) {
    return handleApiError(error);
  }

  const question = await prisma.interviewQuestion.findUnique({
    where: { id: params.id },
    select: { id: true, category: true, jobType: true },
  });

  await prisma.interviewQuestion.delete({ where: { id: params.id } });

  await createAuditLog({
    userId,
    action: 'DELETE_QUESTION',
    resource: 'InterviewQuestion',
    resourceId: params.id,
    details: question ? { id: question.id, category: question.category, jobType: question.jobType } : { id: params.id },
    request: req,
  });

  return NextResponse.json({ data: { ok: true } });
}
