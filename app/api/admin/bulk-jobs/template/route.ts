/**
 * GET /api/admin/bulk-jobs/template
 * 관리자용 구인자 일괄 등록 엑셀 템플릿 다운로드
 */
import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx-js-style';
import { requireAdmin } from '@/lib/api';
import { handleApiError } from '@/lib/errors';

export const dynamic = 'force-dynamic';

const HEADERS = [
  '회사명',
  '직무',
  '근무지',
  '경력',
  '학력',
  '고용형태',
  '급여',
  '마감일',
  '공고링크',
  '상세내용',
  '담당자이메일',
  '모집인원',
];

const SAMPLE = [
  '(주)예시테크',
  '프론트엔드 개발자',
  '서울 강남구',
  '신입',
  '학사',
  '정규직',
  '면접 후 협의',
  '2026-12-31',
  'https://example.com/jobs/frontend',
  'React/Next.js 경험자',
  'hr@example.com',
  '2',
];

export async function GET() {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  try {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([HEADERS, SAMPLE]);

    // 1행 스타일: 굵은 글씨 + 회색 배경
    const range = XLSX.utils.decode_range(worksheet['!ref'] ?? 'A1:L2');
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: col });
      const cell = worksheet[cellRef];
      if (cell) {
        cell.s = {
          font: { bold: true },
          fill: { patternType: 'solid', fgColor: { rgb: 'E5E7EB' } },
        };
      }
    }

    worksheet['!cols'] = HEADERS.map(() => ({ wch: 24 }));

    XLSX.utils.book_append_sheet(workbook, worksheet, '구인자 일괄 등록 양식');

    const arrayBuffer = XLSX.write(workbook, {
      type: 'array',
      bookType: 'xlsx',
    }) as ArrayBuffer;

    const filename = 'jobfilter_bulk_jobs_template.xlsx';
    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
