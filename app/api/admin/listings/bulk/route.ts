import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== 'ADMIN') return null;
  return session;
}

type BulkRow = {
  company: string; position: string; location?: string; career?: string;
  employType?: string; education?: string; salary?: string;
  deadline?: string; url?: string; description?: string;
};

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const rows: BulkRow[] = body.rows ?? [];
  if (!rows.length) return NextResponse.json({ error: '등록할 항목이 없습니다' }, { status: 400 });

  // 1. 마감일 지난 공고 자동 비활성화
  await prisma.jobListing.updateMany({
    where: { deadline: { lt: new Date() }, isActive: true },
    data: { isActive: false },
  });

  // 2. 기존 공고 (company + position) 중복 감지
  const existing = await prisma.jobListing.findMany({
    select: { company: true, position: true },
  });
  const existingSet = new Set(existing.map(e => `${e.company}__${e.position}`));

  const newRows = rows.filter(r => !existingSet.has(`${r.company}__${r.position}`));
  const duplicateCount = rows.length - newRows.length;

  if (!newRows.length) {
    return NextResponse.json({ data: { count: 0, duplicateCount, message: '모두 중복 공고입니다' } });
  }

  const created = await prisma.jobListing.createMany({
    data: newRows.map(r => ({
      company: r.company, position: r.position,
      location: r.location || null, career: r.career || null,
      employType: r.employType || null, education: r.education || null,
      salary: r.salary || null,
      deadline: r.deadline ? (isNaN(new Date(r.deadline).getTime()) ? null : new Date(r.deadline)) : null,
      url: r.url || null, description: r.description || null,
      tags: null, isActive: true,
    })),
  });

  return NextResponse.json({ data: { count: created.count, duplicateCount } }, { status: 201 });
}

// 마감일 지난 공고 일괄 비활성화 (GET으로 수동 트리거 가능)
export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const result = await prisma.jobListing.updateMany({
    where: { deadline: { lt: new Date() }, isActive: true },
    data: { isActive: false },
  });

  return NextResponse.json({ data: { deactivated: result.count } });
}
