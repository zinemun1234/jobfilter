import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import type { Session } from 'next-auth';

function requireAdmin(session: Session | null) {
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  return null;
}

const questionSchema = z.object({
  category: z.enum(['TECHNICAL', 'PERSONALITY', 'SITUATIONAL']),
  jobType: z.string().optional().nullable(),
  question: z.string().min(1),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  const err = requireAdmin(session);
  if (err) return err;

  const questions = await prisma.interviewQuestion.findMany({
    where: { isDefault: true },
    orderBy: [{ category: 'asc' }, { jobType: 'asc' }],
    include: { _count: { select: { answers: true } } },
  });

  return NextResponse.json({ data: questions });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const err = requireAdmin(session);
  if (err) return err;

  const body = await req.json();
  const data = questionSchema.parse(body);

  const question = await prisma.interviewQuestion.create({
    data: { ...data, isDefault: true, userId: null },
  });

  return NextResponse.json({ data: question }, { status: 201 });
}
