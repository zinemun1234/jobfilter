/**
 * GET /api/notifications  — 내 알림 목록 (최신 20개)
 * PATCH /api/notifications — 읽음 처리
 *   - body: { id } → 개별 읽음
 *   - body 없음 → 전체 읽음
 */
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET — 내 알림 목록
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const notifications = await prisma.userNotification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  return NextResponse.json({ data: notifications });
}

// PATCH — 전체 읽음 처리 (body 없음) or 개별 읽음 처리 (body: { id })
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: { id?: string } = {};
  try { body = await req.json(); } catch { /* body 없으면 전체 처리 */ }

  if (body.id) {
    await prisma.userNotification.updateMany({
      where: { id: body.id, userId: session.user.id },
      data: { isRead: true },
    });
  } else {
    await prisma.userNotification.updateMany({
      where: { userId: session.user.id, isRead: false },
      data: { isRead: true },
    });
  }

  return NextResponse.json({ data: { ok: true } });
}
