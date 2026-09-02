/**
 * GET /api/admin/listings/export
 * 관리자용 전체 공고 목록 엑셀 내보내기
 */
import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx-js-style';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/api';
import { handleApiError } from '@/lib/errors';

export const dynamic = 'force-dynamic';

const HEADERS = [
  'ID',
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
  '태그',
  '출처',
  '상태',
  '조회수',
  '등록일',
];

export async function GET() {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  try {
    const listings = await prisma.jobListing.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const rows = listings.map((listing) => {
      let tags = '-';
      if (listing.tags) {
        try {
          const parsed = JSON.parse(listing.tags) as unknown;
          if (Array.isArray(parsed)) {
            tags = parsed.join(', ');
          }
        } catch {
          tags = listing.tags;
        }
      }

      const deadline = listing.deadline
        ? listing.deadline.toLocaleDateString('ko-KR')
        : '-';
      const createdAt = listing.createdAt.toLocaleDateString('ko-KR');
      const source = listing.source ?? '-';
      const status = listing.isActive ? '게시 중' : '비공개';

      return [
        listing.id,
        listing.company,
        listing.position,
        listing.location ?? '-',
        listing.career ?? '-',
        listing.education ?? '-',
        listing.employType ?? '-',
        listing.salary ?? '-',
        deadline,
        listing.url ?? '-',
        listing.description ?? '-',
        tags,
        source,
        status,
        listing.viewCount,
        createdAt,
      ];
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([HEADERS, ...rows]);

    // 헤더 스타일
    const range = XLSX.utils.decode_range(worksheet['!ref'] ?? 'A1');
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

    worksheet['!cols'] = HEADERS.map(() => ({ wch: 18 }));

    XLSX.utils.book_append_sheet(workbook, worksheet, '공고 목록');

    const arrayBuffer = XLSX.write(workbook, {
      type: 'array',
      bookType: 'xlsx',
    }) as ArrayBuffer;

    const dateStr = new Date().toISOString().slice(0, 10);
    const filename = `jobfilter_listings_${dateStr}.xlsx`;

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
