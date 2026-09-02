import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin, sanitizeNotification, sanitizeUser } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
import { createAuditLog } from '@/lib/audit-log';

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
      id: true, email: true, name: true, major: true, targetJob: true, role: true,
      companyName: true, companyDesc: true, companyLogoUrl: true, companyAttachments: true, isApproved: true, createdAt: true,
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
  const { role, isApproved } = body;
  const data: { role?: string; isApproved?: boolean } = {};

  if (role !== undefined) {
    if (!['USER', 'ADMIN', 'RECRUITER'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }
    if (params.id === userId && role !== 'ADMIN') {
      return NextResponse.json({ error: '자신의 권한은 변경할 수 없습니다' }, { status: 400 });
    }
    data.role = role;
  }

  if (isApproved !== undefined) {
    data.isApproved = isApproved === true || isApproved === 'true';
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: '변경할 내용이 없습니다' }, { status: 400 });
  }

  const previous = await prisma.user.findUnique({
    where: { id: params.id },
    select: { isApproved: true, role: true, companyName: true },
  });

  const updated = await prisma.user.update({
    where: { id: params.id },
    data,
    select: { id: true, email: true, role: true, isApproved: true, companyName: true, companyDesc: true },
  });

  // 리크루터 승인/반려 알림
  if (previous && previous.role === 'RECRUITER' && previous.isApproved !== updated.isApproved) {
    if (updated.isApproved) {
      await prisma.userNotification.create({
        data: {
          userId: params.id,
          type: 'RECRUITER_APPROVED',
          referenceId: params.id,
          title: '기업 회원 승인 완료',
          body: `${updated.companyName ?? '기업'} 회원 승인이 완료되었습니다. 이제 공고 등록이 가능합니다.`,
        },
      });
    } else {
      await prisma.userNotification.create({
        data: {
          userId: params.id,
          type: 'RECRUITER_SUSPENDED',
          referenceId: params.id,
          title: '기업 회원 승인 취소',
          body: `${updated.companyName ?? '기업'} 회원 승인이 취소되었습니다.`,
        },
      });
    }
  }

  await createAuditLog({
    userId,
    action: 'UPDATE_USER_ROLE',
    resource: 'User',
    resourceId: params.id,
    details: {
      previousRole: previous?.role,
      newRole: updated.role,
      previousApproved: previous?.isApproved,
      newApproved: updated.isApproved,
      company: previous?.companyName ?? updated.companyName,
    },
    request: req,
  });

  return NextResponse.json({ data: sanitizeUser(updated) });
}

// DELETE /api/admin/users/[id] — delete user
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  let userId: string;
  try {
    ({ userId } = await requireAdmin());
  } catch (error) {
    return handleApiError(error);
  }

  if (params.id === userId) {
    return NextResponse.json({ error: '자신의 계정은 삭제할 수 없습니다' }, { status: 400 });
  }

  const targetUser = await prisma.user.findUnique({
    where: { id: params.id },
    select: { id: true, email: true, name: true, companyName: true },
  });
  if (!targetUser) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await createAuditLog({
    userId,
    action: 'DELETE_USER',
    resource: 'User',
    resourceId: params.id,
    details: {
      id: targetUser.id,
      email: targetUser.email,
      name: targetUser.name,
      company: targetUser.companyName,
    },
    request: req,
  });

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
