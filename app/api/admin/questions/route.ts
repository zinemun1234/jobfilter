import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin, sanitizeInterviewQuestion } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
import { createAuditLog } from '@/lib/audit-log';
import { z } from 'zod';

export const dynamic = 'force-dynamic';


const questionSchema = z.object({
  category: z.enum(['TECHNICAL', 'PERSONALITY', 'SITUATIONAL']),
  jobType: z.string().optional().nullable(),
  question: z.string().min(1),
});

export async function GET() {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  const questions = await prisma.interviewQuestion.findMany({
    where: { isDefault: true },
    orderBy: [{ category: 'asc' }, { jobType: 'asc' }],
    include: { _count: { select: { answers: true } } },
  });

  return NextResponse.json({ data: questions.map((q) => sanitizeInterviewQuestion(q)) });
}

export async function POST(req: NextRequest) {
  let userId: string;
  try {
    ({ userId } = await requireAdmin());
  } catch (error) {
    return handleApiError(error);
  }

  const body = await req.json();
  const data = questionSchema.parse(body);

  const question = await prisma.interviewQuestion.create({
    data: { ...data, isDefault: true, userId: null },
  });

  await createAuditLog({
    userId,
    action: 'CREATE_QUESTION',
    resource: 'InterviewQuestion',
    resourceId: question.id,
    details: { id: question.id, category: question.category, jobType: question.jobType },
    request: req,
  });

  return NextResponse.json({ data: sanitizeInterviewQuestion(question) }, { status: 201 });
}
