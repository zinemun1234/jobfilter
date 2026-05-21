import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== 'ADMIN') return null;
  return session;
}

// GET ??ì·¨ì—…?•ì • ëª©ë¡
export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const records = await prisma.employmentRecord.findMany({
    orderBy: { confirmedAt: 'desc' },
  });

  // userIdë¡?? ì? ?•ë³´ ì¡°íšŒ
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

// POST ??ì·¨ì—…?•ì • ?±ë¡
export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const { userId, company, position, employType, startDate, salary, note } = body;

  if (!userId || !company || !position) {
    return NextResponse.json({ error: 'userId, company, position ?„ìˆ˜' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ error: '?¬ìš©?ë? ì°¾ì„ ???†ìŠµ?ˆë‹¤' }, { status: 404 });

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

  // ?´ë‹¹ ?™ìƒ??JobPosting ì¤?ê°™ì? ?Œì‚¬+ì§ë¬´ê°€ ?ˆìœ¼ë©?FINAL_PASSë¡??…ë°?´íŠ¸
  await prisma.jobPosting.updateMany({
    where: { userId, company, position },
    data: { status: 'FINAL_PASS' },
  });

  // ?™ìƒ?ê²Œ ?Œë¦¼ ë°œì†¡
  await prisma.userNotification.create({
    data: {
      userId,
      title: 'ì·¨ì—… ?•ì • ?±ë¡',
      body: `${company} ${position} ì·¨ì—…???•ì • ?±ë¡?˜ì—ˆ?µë‹ˆ?? ì¶•í•˜?©ë‹ˆ??`,
    },
  });

  return NextResponse.json({ data: record }, { status: 201 });
}
