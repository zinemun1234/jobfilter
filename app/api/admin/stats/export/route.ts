/**
 * GET /api/admin/stats/export
 * 관리자용 플랫폼 통계 엑셀 내보내기
 */
import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx-js-style';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/api';
import { handleApiError } from '@/lib/errors';

export const dynamic = 'force-dynamic';

const HEADERS = ['항목', '값'];

export async function GET() {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  try {
    const [
      totalListings,
      activeListings,
      inactiveListings,
      rejectedListings,
      totalUsers,
      userCount,
      recruiterCount,
      pendingRecruiterCount,
      adminCount,
      totalApplications,
      totalBookmarks,
    ] = await Promise.all([
      prisma.jobListing.count(),
      prisma.jobListing.count({ where: { isActive: true } }),
      prisma.jobListing.count({
        where: { isActive: false, rejectionReason: null },
      }),
      prisma.jobListing.count({
        where: { isActive: false, rejectionReason: { not: null } },
      }),
      prisma.user.count(),
      prisma.user.count({ where: { role: 'USER' } }),
      prisma.user.count({ where: { role: 'RECRUITER' } }),
      prisma.user.count({ where: { role: 'RECRUITER', isApproved: false } }),
      prisma.user.count({ where: { role: 'ADMIN' } }),
      prisma.jobPosting.count(),
      prisma.jobBookmark.count(),
    ]);

    const data = [
      ['전체 공고 수', totalListings],
      ['게시 중(active) 공고 수', activeListings],
      ['비공개/대기 수', inactiveListings],
      ['반려 수', rejectedListings],
      ['전체 사용자 수', totalUsers],
      ['학생(USER) 수', userCount],
      ['리크루터(RECRUITER) 수', recruiterCount],
      ['승인 대기 리크루터 수', pendingRecruiterCount],
      ['관리자(ADMIN) 수', adminCount],
      ['전체 지원자(JobPosting) 수', totalApplications],
      ['전체 북마크(JobBookmark) 수', totalBookmarks],
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([HEADERS, ...data]);

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

    worksheet['!cols'] = [{ wch: 32 }, { wch: 16 }];

    XLSX.utils.book_append_sheet(workbook, worksheet, '통계 요약');

    const arrayBuffer = XLSX.write(workbook, {
      type: 'array',
      bookType: 'xlsx',
    }) as ArrayBuffer;

    const dateStr = new Date().toISOString().slice(0, 10);
    const filename = `jobfilter_stats_${dateStr}.xlsx`;

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
