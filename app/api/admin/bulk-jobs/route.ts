// 구인자용 벌크 업로드 API
// 기업 담당자가 엑셀로 공고를 일괄 등록하는 엔드포인트
// 관리자 bulk route와 분리 — 구인자 전용

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

export const dynamic = 'force-dynamic';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== 'ADMIN') return null;
  return session;
}

type JobRow = {
  company: string;
  position: string;
  location?: string;
  career?: string;
  employType?: string;
  education?: string;
  salary?: string;
  deadline?: string;
  url?: string;
  description?: string;
  contactEmail?: string;
  headcount?: string;
};

function get(row: Record<string, unknown>, ...keys: string[]): string | undefined {
  for (const k of keys) {
    const found = Object.entries(row).find(
      ([col]) => col.toLowerCase().replace(/\s/g, '') === k.toLowerCase().replace(/\s/g, '')
    );
    if (found && found[1] != null && String(found[1]).trim() !== '') {
      return String(found[1]).trim();
    }
  }
  return undefined;
}

function parseRow(row: Record<string, unknown>): JobRow | null {
  const company = get(row, '회사명', '기업명', '회사', 'company', '업체명', '구인업체');
  const position = get(row, '직무', '직종', '모집직종', '채용직무', '포지션', 'position', '모집분야');
  if (!company || !position) return null;

  const rawDeadline = get(row, '마감일', '접수마감', '마감', 'deadline', '채용마감일');
  let deadline: string | undefined;
  if (rawDeadline) {
    const num = Number(rawDeadline);
    if (!isNaN(num) && num > 40000) {
      const date = XLSX.SSF.parse_date_code(num);
      deadline = `${date.y}-${String(date.m).padStart(2, '0')}-${String(date.d).padStart(2, '0')}`;
    } else {
      deadline = rawDeadline;
    }
  }

  return {
    company,
    position,
    location: get(row, '근무지', '근무지역', '지역', 'location'),
    career: get(row, '경력', '경력조건', 'career'),
    employType: get(row, '고용형태', '근무형태', 'employtype'),
    education: get(row, '학력', '학력조건', 'education'),
    salary: get(row, '급여', '연봉', '임금', 'salary'),
    deadline,
    url: get(row, 'url', '링크', '공고링크', '지원링크'),
    description: get(row, '상세내용', '업무내용', '주요업무', '자격요건', 'description'),
    contactEmail: get(row, '담당자이메일', '연락처이메일', '이메일', 'email', 'contactemail'),
    headcount: get(row, '모집인원', '채용인원', 'headcount'),
  };
}

// POST /api/admin/bulk-jobs — 엑셀 파일 업로드 (파싱 + 미리보기)
export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const contentType = req.headers.get('content-type') ?? '';

  // multipart: 엑셀 파일 파싱 → 미리보기 반환
  if (contentType.includes('multipart/form-data')) {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: 'buffer', cellDates: false });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });

    const parsed = rows.map(parseRow).filter(Boolean) as JobRow[];

    // 마감일 지난 공고 자동 필터링
    const now = new Date();
    const valid = parsed.filter(r => {
      if (!r.deadline) return true;
      const d = new Date(r.deadline);
      return isNaN(d.getTime()) || d >= now;
    });
    const expired = parsed.length - valid.length;

    return NextResponse.json({
      data: {
        total: rows.length,
        parsed: parsed.length,
        valid: valid.length,
        expired,
        rows: valid,
      },
    });
  }

  // JSON: 선택된 공고 실제 DB 등록
  const body = await req.json();
  const rows: JobRow[] = body.rows ?? [];
  if (!rows.length) return NextResponse.json({ error: '등록할 데이터가 없습니다.' }, { status: 400 });

  // 마감일 지난 기존 공고 자동 비활성화
  await prisma.jobListing.updateMany({
    where: { deadline: { lt: new Date() }, isActive: true },
    data: { isActive: false },
  });

  // 중복 감지 (company + position)
  const existing = await prisma.jobListing.findMany({
    select: { company: true, position: true },
  });
  const existingSet = new Set(existing.map(e => `${e.company}__${e.position}`));
  const newRows = rows.filter(r => !existingSet.has(`${r.company}__${r.position}`));
  const duplicateCount = rows.length - newRows.length;

  if (!newRows.length) {
    return NextResponse.json({ data: { count: 0, duplicateCount, message: '모두 중복 공고입니다.' } });
  }

  const created = await prisma.jobListing.createMany({
    data: newRows.map(r => ({
      company: r.company,
      position: r.position,
      location: r.location ?? null,
      career: r.career ?? null,
      employType: r.employType ?? null,
      education: r.education ?? null,
      salary: r.salary ?? null,
      deadline: r.deadline ? (isNaN(new Date(r.deadline).getTime()) ? null : new Date(r.deadline)) : null,
      url: r.url ?? null,
      description: [
        r.description,
        r.headcount ? `모집인원: ${r.headcount}` : null,
        r.contactEmail ? `담당자: ${r.contactEmail}` : null,
      ].filter(Boolean).join('\n') || null,
      tags: null,
      source: '구인자 직접등록',
      isActive: true,
    })),
  });

  return NextResponse.json({ data: { count: created.count, duplicateCount } }, { status: 201 });
}

// GET /api/admin/bulk-jobs — 구인자 직접등록 공고 목록
export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const listings = await prisma.jobListing.findMany({
    where: { source: '구인자 직접등록' },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ data: listings });
}
