/**
 * GET /api/recruiter/listings/[id]/applicants/export
 * 리크루터 본인 공고의 지원자 목록을 엑셀(XLSX)로 내보냅니다.
 */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRecruiter } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
import * as XLSX from 'xlsx';

export const dynamic = 'force-dynamic';

const STATUS_LABELS: Record<string, string> = {
  PREPARING: '준비 중',
  APPLIED: '지원 완료',
  DOCUMENT_PASS: '서류 합격',
  INTERVIEW: '면접',
  FINAL_PASS: '최종 합격',
  REJECTED: '불합격',
};

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await requireRecruiter();

    const listing = await prisma.jobListing.findFirst({
      where: { id: params.id, recruiterId: userId },
      select: { id: true, company: true, position: true },
    });
    if (!listing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const applications = await prisma.jobPosting.findMany({
      where: { listingId: params.id },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            major: true,
            targetJob: true,
            skills: true,
          },
        },
        coverLetters: { select: { id: true, company: true, position: true, updatedAt: true }, orderBy: { updatedAt: 'desc' }, take: 3 },
        portfolios: { select: { id: true, title: true, updatedAt: true }, orderBy: { updatedAt: 'desc' }, take: 3 },
        experiences: { select: { id: true, title: true }, take: 3 },
        interviewAnswers: { select: { id: true, questionId: true, answer: true }, take: 3 },
        statusHistory: { orderBy: { changedAt: 'desc' }, take: 5 },
      },
    });

    const headers = [
      '이름',
      '이메일',
      '전공',
      '희망직무',
      '기술스택',
      '지원상태',
      '메모',
      '면접일',
      '지원일',
      '자소서',
      '포트폴리오',
      '경험',
      '면접답변',
    ];

    const rows = applications.map((app) => {
      const { user } = app;

      let skills = '';
      if (user.skills) {
        try {
          const parsed = JSON.parse(user.skills);
          skills = Array.isArray(parsed) ? parsed.join(', ') : String(user.skills);
        } catch {
          skills = user.skills;
        }
      }

      const coverLetters = app.coverLetters
        .map((c) => `${c.company} ${c.position}`.trim())
        .join(', ');
      const portfolios = app.portfolios.map((p) => p.title).join(', ');
      const experiences = app.experiences.map((e) => e.title).join(', ');

      return [
        user.name ?? '',
        user.email,
        user.major ?? '',
        user.targetJob ?? '',
        skills,
        STATUS_LABELS[app.status] ?? app.status,
        app.recruiterNote ?? '',
        app.interviewAt ? app.interviewAt.toLocaleDateString('ko-KR') : '',
        app.createdAt.toLocaleDateString('ko-KR'),
        coverLetters,
        portfolios,
        experiences,
        app.interviewAnswers.length,
      ];
    });

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    worksheet['!cols'] = headers.map(() => ({ wch: 24 }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '지원자 목록');

    const xlsxBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' }) as Buffer;
    const body = new Uint8Array(xlsxBuffer).buffer as ArrayBuffer;

    const filename = `지원자목록_${listing.company}_${listing.position}.xlsx`;
    const encodedFilename = encodeURIComponent(filename);

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${encodedFilename}"; filename*=UTF-8''${encodedFilename}`,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
