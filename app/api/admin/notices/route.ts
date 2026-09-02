import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
import { createAuditLog } from '@/lib/audit-log';
import { z } from 'zod';

export const dynamic = 'force-dynamic';


const noticeSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  isPinned: z.boolean().optional().default(false),
});

export async function GET() {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  const notices = await prisma.notice.findMany({
    orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
  });
  return NextResponse.json({ data: notices });
}

export async function POST(req: NextRequest) {
  let userId: string;
  try {
    ({ userId } = await requireAdmin());
  } catch (error) {
    return handleApiError(error);
  }

  const body = await req.json();
  const data = noticeSchema.parse(body);

  const notice = await prisma.notice.create({
    data: {
      title: data.title,
      content: data.content,
      isPinned: data.isPinned,
    },
  });

  await createAuditLog({
    userId,
    action: 'CREATE_NOTICE',
    resource: 'Notice',
    resourceId: notice.id,
    details: { id: notice.id, title: notice.title },
    request: req,
  });

  return NextResponse.json({ data: notice }, { status: 201 });
}
