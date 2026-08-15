import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin, sanitizeInterviewQuestion } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
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
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  const body = await req.json();
  const data = questionSchema.parse(body);

  const question = await prisma.interviewQuestion.create({
    data: { ...data, isDefault: true, userId: null },
  });

  return NextResponse.json({ data: sanitizeInterviewQuestion(question) }, { status: 201 });
}
