import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { Session } from 'next-auth';

function requireAdmin(session: Session | null) {
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  return null;
}

// GET /api/admin/users/[id] — user detail
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const err = requireAdmin(session);
  if (err) return err;

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
  return NextResponse.json({ data: user });
}

// PATCH /api/admin/users/[id] — change role or isApproved
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const err = requireAdmin(session);
  if (err) return err;

  const body = await req.json();

  // isApproved 승인/취소
  if (typeof body.isApproved === 'boolean') {
    const updated = await prisma.user.update({
      where: { id: params.id },
      data: { isApproved: body.isApproved },
      select: { id: true, email: true, role: true, isApproved: true },
    });
    return NextResponse.json({ data: updated });
  }

  // role 변경
  const { role } = body;
  if (!['USER', 'ADMIN', 'RECRUITER'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  if (params.id === session!.user.id && role !== 'ADMIN') {
    return NextResponse.json({ error: '자신의 권한은 변경할 수 없습니다' }, { status: 400 });
  }

  const updated = await prisma.user.update({
    where: { id: params.id },
    data: { role },
    select: { id: true, email: true, role: true },
  });

  return NextResponse.json({ data: updated });
}

// DELETE /api/admin/users/[id] — delete user
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const err = requireAdmin(session);
  if (err) return err;

  if (params.id === session!.user.id) {
    return NextResponse.json({ error: '자신의 계정은 삭제할 수 없습니다' }, { status: 400 });
  }

  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ data: { ok: true } });
}

// POST /api/admin/users/[id] — send individual notification
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const err = requireAdmin(session);
  if (err) return err;

  const { title, body } = await req.json();
  if (!title?.trim() || !body?.trim()) {
    return NextResponse.json({ error: '제목과 내용을 입력하세요' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: params.id }, select: { id: true } });
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const notification = await prisma.userNotification.create({
    data: { userId: params.id, title: title.trim(), body: body.trim() },
  });

  return NextResponse.json({ data: notification }, { status: 201 });
}
