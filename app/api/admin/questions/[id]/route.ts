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

const updateSchema = z.object({
  question: z.string().min(1).optional(),
  category: z.enum(['TECHNICAL', 'PERSONALITY', 'SITUATIONAL']).optional(),
  jobType: z.string().optional().nullable(),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const err = requireAdmin(session);
  if (err) return err;

  const body = await req.json();
  const data = updateSchema.parse(body);

  const updated = await prisma.interviewQuestion.update({
    where: { id: params.id },
    data,
  });

  return NextResponse.json({ data: updated });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const err = requireAdmin(session);
  if (err) return err;

  await prisma.interviewQuestion.delete({ where: { id: params.id } });
  return NextResponse.json({ data: { ok: true } });
}
