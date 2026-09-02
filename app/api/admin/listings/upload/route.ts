/**
 * POST /api/admin/listings/upload
 * 엑셀(XLSX) 또는 CSV 파일을 파싱해서 CS 관련 공고만 필터링한다 (ADMIN 전용).
 *
 * 처리 흐름:
 * 1. CSV: UTF-8 BOM 제거 후 직접 파싱 (한글 인코딩 문제 방지)
 *    XLSX: xlsx 라이브러리로 파싱
 * 2. mapRow(): 다양한 컬럼명을 우리 필드로 매핑 (유연한 키 매칭)
 *    - 엑셀 날짜 시리얼 숫자도 처리
 * 3. isCSRelated(): CS_KEYWORDS 기반으로 CS 직군 공고만 필터링
 * 4. 직군별 분류 통계 반환 (개발/IT기술/기획분석/사무)
 *
 * 반환: { total, parsed, filtered, categoryStats, rows }
 * rows는 DB에 저장하지 않고 클라이언트에서 확인 후 별도 저장
 */
import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
import * as XLSX from 'xlsx';
import * as Papa from 'papaparse';
import { classifyMajor } from '@/lib/majors';

export const dynamic = 'force-dynamic';

// 컴퓨터공학부 관련 직군 키워드
const CS_KEYWORDS = [
  // 개발 직군
  '개발', '개발자', 'developer', 'engineer', '엔지니어',
  '프론트엔드', 'frontend', '백엔드', 'backend', '풀스택', 'fullstack',
  '소프트웨어', 'software', '웹', 'web', '앱', 'app', '모바일', 'mobile',
  'ios', 'android', '안드로이드',
  // IT/기술 직군
  'it', '정보기술', '시스템', 'system', '네트워크', 'network',
  '보안', 'security', '클라우드', 'cloud', 'devops', 'sre',
  '데이터', 'data', 'ai', '인공지능', '머신러닝', 'ml', 'dl',
  '데이터베이스', 'database', 'dba', '인프라', 'infra',
  // 기획/분석 (IT 관련)
  'qa', '품질', '테스트', 'test', 'ui/ux', 'ux', 'ui',
  '기술영업', '솔루션', 'solution', 'erp', 'scm',
  // 사무직 (컴공 지원 가능)
  '사무', '행정', '기획', '경영지원', '총무', '인사',
];

function isCSRelated(position: string, description?: string): boolean {
  const text = `${position} ${description ?? ''}`.toLowerCase();
  return CS_KEYWORDS.some(kw => text.includes(kw.toLowerCase()));
}

// 엑셀 컬럼명 → 우리 필드 매핑 (유연하게)
async function mapRow(row: Record<string, unknown>): Promise<{
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
  category: string;
} | null> {
  const get = (...keys: string[]) => {
    for (const k of keys) {
      const found = Object.entries(row).find(
        ([col]) => col.toLowerCase().replace(/\s/g, '') === k.toLowerCase().replace(/\s/g, '')
      );
      if (found && found[1] != null && String(found[1]).trim() !== '') {
        return String(found[1]).trim();
      }
    }
    return undefined;
  };

  const company = get('회사명', '기업명', '회사', 'company', '업체명');
  const position = get('직무', '직종', '모집직종', '채용직무', '포지션', 'position', '직위', '모집분야');

  if (!company || !position) return null;

  // 날짜 처리 (엑셀 시리얼 숫자 or 문자열)
  const rawDeadline = get('마감일', '접수마감', '마감', 'deadline', '채용마감일', '지원마감');
  let deadline: string | undefined;
  if (rawDeadline) {
    const num = Number(rawDeadline);
    if (!isNaN(num) && num > 40000) {
      // 엑셀 날짜 시리얼 → JS Date
      const date = XLSX.SSF.parse_date_code(num);
      deadline = `${date.y}-${String(date.m).padStart(2, '0')}-${String(date.d).padStart(2, '0')}`;
    } else {
      deadline = rawDeadline;
    }
  }

  const description = get('상세내용', '업무내용', '주요업무', '자격요건', 'description', '내용');
  const category = (await classifyMajor(`${position} ${description ?? ''}`)).category;

  return {
    company,
    position,
    location: get('근무지', '근무지역', '지역', 'location', '근무장소'),
    career: get('경력', '경력조건', 'career', '경력사항'),
    employType: get('고용형태', '근무형태', 'employtype', '채용형태'),
    education: get('학력', '학력조건', 'education'),
    salary: get('급여', '연봉', '임금', 'salary'),
    deadline,
    url: get('url', '링크', '공고링크', '지원링크', '채용공고url'),
    description,
    category,
  };
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) return NextResponse.json({ error: '파일이 없습니다' }, { status: 400 });
  if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: '파일은 10MB 이하만 업로드할 수 있습니다.' }, { status: 413 });

  const buffer = Buffer.from(await file.arrayBuffer());

  // CSV 파일은 raw 텍스트를 papaparse로 파싱 (한글 인코딩 문제 방지)
  const isCsv = file.name.toLowerCase().endsWith('.csv');
  let rows: Record<string, unknown>[];

  if (isCsv) {
    // UTF-8 BOM 제거 후 papaparse로 파싱 (따옴표/쉼표/개행 포함 셀 처리)
    const text = buffer.toString('utf-8').replace(/^\uFEFF/, '');
    const result = Papa.parse<Record<string, unknown>>(text, {
      header: true,
      skipEmptyLines: true,
    });
    if (result.errors.length > 0) {
      logger.warn({ errors: result.errors }, 'CSV 파싱 경고');
    }
    rows = result.data;
  } else {
    const workbook = XLSX.read(buffer, { type: 'buffer', cellDates: false, codepage: 65001 });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });
  }

  if (rows.length > 5000) {
    return NextResponse.json({ error: '한 번에 최대 5,000행까지 분석할 수 있습니다.' }, { status: 413 });
  }

  const total = rows.length;
  const parsed = (await Promise.all(rows.map(mapRow))).filter(Boolean) as NonNullable<
    Awaited<ReturnType<typeof mapRow>>
  >[];
  const filtered = parsed.filter(r => isCSRelated(r.position, r.description));
  const existing = await prisma.jobListing.findMany({ select: { company: true, position: true } });
  const existingKeys = new Set(existing.map(row => `${row.company.trim()}__${row.position.trim()}`));
  const duplicateCount = filtered.filter(row => existingKeys.has(`${row.company}__${row.position}`)).length;

  // 직군별 분류 통계
  const categoryStats = {
    개발: filtered.filter(r => /개발|developer|engineer|프론트|백엔드|풀스택|웹|앱|모바일|ios|android/i.test(r.position)).length,
    IT기술: filtered.filter(r => /it|시스템|네트워크|보안|클라우드|devops|데이터|ai|인공지능|머신|인프라/i.test(r.position)).length,
    기획분석: filtered.filter(r => /qa|테스트|ux|ui|기술영업|솔루션|erp/i.test(r.position)).length,
    사무: filtered.filter(r => /사무|행정|기획|경영지원|총무|인사/i.test(r.position)).length,
  };

  return NextResponse.json({
    data: {
      total,
      parsed: parsed.length,
      filtered: filtered.length,
      categoryStats,
      duplicateCount,
      invalidCount: total - parsed.length,
      excludedCount: parsed.length - filtered.length,
      rows: filtered,
    },
  });
}
