import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractJobTags } from '@/lib/job-tags';
import { requireAdmin } from '@/lib/api';
import { notifyUsersOfNewListingsSummary } from '@/lib/notifications';
import type { Prisma } from '@/lib/generated/prisma';

export const dynamic = 'force-dynamic';

type BulkRow = {
  company: string; position: string; location?: string; career?: string;
  employType?: string; education?: string; salary?: string;
  deadline?: string; url?: string; description?: string;
};

export async function POST(req: NextRequest) {
  await requireAdmin();

  const body = await req.json();
  const rows: BulkRow[] = body.rows ?? [];
  if (!rows.length) return NextResponse.json({ error: '등록할 데이터가 없습니다.' }, { status: 400 });

  // 2. 기존 공고 (company + position) 중복 감지
  const existing = await prisma.jobListing.findMany({
    select: { company: true, position: true },
  });
  const existingSet = new Set(existing.map(e => `${e.company}__${e.position}`));

  const newRows = rows.filter(r => !existingSet.has(`${r.company}__${r.position}`));
  const duplicateCount = rows.length - newRows.length;

  if (!newRows.length) {
    return NextResponse.json({ data: { count: 0, duplicateCount, message: '모두 중복 공고입니다.' } });
  }

  // 행별로 변환 및 유효성 검사 (트랜잭션 전에 실패 행 분리)
  const validRows: Prisma.JobListingCreateManyInput[] = [];
  const failedRows: { row: number; company: string; position: string; reason: string }[] = [];

  newRows.forEach((r, idx) => {
    try {
      if (!r.company?.trim() || !r.position?.trim()) {
        throw new Error('회사명과 직무명은 필수입니다.');
      }
      const sourceText = `${r.position} ${r.company} ${r.description ?? ''}`;
      const tags = extractJobTags(sourceText);
      const deadlineDate = r.deadline ? new Date(r.deadline) : null;
      if (r.deadline && (!deadlineDate || isNaN(deadlineDate.getTime()))) {
        throw new Error('마감일 형식이 올바르지 않습니다.');
      }
      validRows.push({
        company: r.company.trim(),
        position: r.position.trim(),
        location: r.location?.trim() || null,
        career: r.career?.trim() || null,
        employType: r.employType?.trim() || null,
        education: r.education?.trim() || null,
        salary: r.salary?.trim() || null,
        deadline: deadlineDate,
        url: r.url?.trim() || null,
        description: r.description?.trim() || null,
        tags: tags.length > 0 ? JSON.stringify(tags) : null,
        isActive: true,
      });
    } catch (e) {
      failedRows.push({
        row: idx,
        company: r.company ?? '',
        position: r.position ?? '',
        reason: e instanceof Error ? e.message : '변환 오류',
      });
    }
  });

  if (!validRows.length) {
    return NextResponse.json({ data: { count: 0, duplicateCount, failed: failedRows } }, { status: 400 });
  }

  // 트랜잭션으로 마감일 지난 공고 비활성화 + 벌크 등록 원자화
  const [_, created] = await prisma.$transaction([
    prisma.jobListing.updateMany({
      where: { deadline: { lt: new Date() }, isActive: true },
      data: { isActive: false },
    }),
    prisma.jobListing.createMany({ data: validRows }),
  ]);

  // 사용자 알림 생성
  try {
    await notifyUsersOfNewListingsSummary(created.count);
  } catch {
    // 알림 생성 실패는 응답에 영향을 주지 않음
  }

  return NextResponse.json(
    { data: { count: created.count, duplicateCount, failed: failedRows.length > 0 ? failedRows : undefined } },
    { status: 201 }
  );
}

// 마감일 지난 공고 일괄 비활성화 (GET으로 수동 처리도 가능)
export async function GET() {
  await requireAdmin();

  const result = await prisma.jobListing.updateMany({
    where: { deadline: { lt: new Date() }, isActive: true },
    data: { isActive: false },
  });

  return NextResponse.json({ data: { deactivated: result.count } });
}
