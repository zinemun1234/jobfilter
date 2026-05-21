import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import type { Session } from 'next-auth';

export const dynamic = 'force-dynamic';

function requireAdmin(session: Session | null) {
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  return null;
}

const noticeSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  isPinned: z.boolean().optional().default(false),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const notices = await prisma.notice.findMany({
    orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
  });
  return NextResponse.json({ data: notices });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const err = requireAdmin(session);
  if (err) return err;

  const body = await req.json();
  const data = noticeSchema.parse(body);

  const notice = await prisma.notice.create({
    data: {
      title: data.title,
      content: data.content,
      isPinned: data.isPinned,
    },
  });

  return NextResponse.json({ data: notice }, { status: 201 });
}
