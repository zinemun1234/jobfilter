import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/api';
import { handleApiError } from '@/lib/errors';

export const dynamic = 'force-dynamic';

// GET — 취업확정 목록
export async function GET() {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  const records = await prisma.employmentRecord.findMany({
    orderBy: { confirmedAt: 'desc' },
  });

  // userId로 사용자 정보 조회
  const userIds = Array.from(new Set(records.map(r => r.userId)));
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, name: true, email: true, major: true },
  });
  const userMap = Object.fromEntries(users.map(u => [u.id, u]));

  return NextResponse.json({
    data: records.map(r => ({ ...r, user: userMap[r.userId] ?? null })),
  });
}

// POST — 취업확정 등록
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  const body = await req.json();
  const { userId, company, position, employType, startDate, salary, note } = body;

  if (!userId || !company || !position) {
    return NextResponse.json({ error: 'userId, company, position 필수' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });

  const record = await prisma.employmentRecord.create({
    data: {
      userId,
      company,
      position,
      employType: employType || null,
      startDate: startDate ? new Date(startDate) : null,
      salary: salary || null,
      note: note || null,
    },
  });

  // 해당 학생의 JobPosting 중 같은 회사+직무가 있으면 FINAL_PASS로 업데이트
  await prisma.jobPosting.updateMany({
    where: { userId, company, position },
    data: { status: 'FINAL_PASS' },
  });

  // 학생에게 알림 발송
  await prisma.userNotification.create({
    data: {
      userId,
      title: '취업 확정 등록',
      body: `${company} ${position} 취업이 확정 등록되었습니다. 축하합니다!`,
    },
  });

  return NextResponse.json({ data: record }, { status: 201 });
}
