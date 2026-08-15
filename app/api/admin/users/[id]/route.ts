import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin, sanitizeNotification, sanitizeUser } from '@/lib/api';
import { handleApiError } from '@/lib/errors';

export const dynamic = 'force-dynamic';

// GET /api/admin/users/[id] — user detail
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      id: true, email: true, name: true, major: true, targetJob: true, role: true, createdAt: true,
      jobPostings: { select: { id: true, company: true, position: true, status: true, createdAt: true }, orderBy: { createdAt: 'desc' } },
      portfolios: { select: { id: true, title: true, createdAt: true } },
      roadmapItems: { select: { id: true, jobCategory: true, skill: true, status: true } },
    },
  });

  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ data: sanitizeUser(user) });
}

// PATCH /api/admin/users/[id] — change role
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  let userId: string;
  try {
    ({ userId } = await requireAdmin());
  } catch (error) {
    return handleApiError(error);
  }

  const body = await req.json();

  // role 변경
  const { role } = body;
  if (!['USER', 'ADMIN'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  if (params.id === userId && role !== 'ADMIN') {
    return NextResponse.json({ error: '자신의 권한은 변경할 수 없습니다' }, { status: 400 });
  }

  const updated = await prisma.user.update({
    where: { id: params.id },
    data: { role },
    select: { id: true, email: true, role: true },
  });

  return NextResponse.json({ data: sanitizeUser(updated) });
}

// DELETE /api/admin/users/[id] — delete user
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  let userId: string;
  try {
    ({ userId } = await requireAdmin());
  } catch (error) {
    return handleApiError(error);
  }

  if (params.id === userId) {
    return NextResponse.json({ error: '자신의 계정은 삭제할 수 없습니다' }, { status: 400 });
  }

  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ data: { ok: true } });
}

// POST /api/admin/users/[id] — send individual notification
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  const { title, body } = await req.json();
  if (!title?.trim() || !body?.trim()) {
    return NextResponse.json({ error: '제목과 내용을 입력하세요' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: params.id }, select: { id: true } });
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const notification = await prisma.userNotification.create({
    data: { userId: params.id, title: title.trim(), body: body.trim() },
  });

  return NextResponse.json({ data: sanitizeNotification(notification) }, { status: 201 });
}
