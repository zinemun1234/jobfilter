/**
 * GET /api/recruiter/listings  — 본인 기업 공고 목록
 * POST /api/recruiter/listings — 공고 등록 (관리자 승인 후 게재)
 */
import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { requireApprovedRecruiter } from '@/lib/api';
import { recruiterListingSchema } from '@/lib/validations/recruiter';
import { handleApiError } from '@/lib/errors';
import { extractJobTags } from '@/lib/job-tags';
import { classifyMajor } from '@/lib/majors';

export async function GET(req: NextRequest) {
  try {
    const { userId } = await requireApprovedRecruiter();
    const listings = await prisma.jobListing.findMany({
      where: { recruiterId: userId },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ data: listings });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await requireApprovedRecruiter();
    const body = await req.json();
    const data = recruiterListingSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { companyName: true },
    });

    const tags = await extractJobTags(`${data.position} ${data.description ?? ''}`);
    const { category } = await classifyMajor(`${data.position} ${data.description ?? ''}`);

    const listing = await prisma.jobListing.create({
      data: {
        company: data.company || user?.companyName || '미정',
        position: data.position,
        location: data.location || null,
        career: data.career || null,
        education: data.education || null,
        employType: data.employType || null,
        salary: data.salary || null,
        deadline: data.deadline ? new Date(data.deadline) : null,
        url: data.url || null,
        description: data.description || null,
        tags: tags.length > 0 ? JSON.stringify(tags) : null,
        category,
        source: 'RECRUITER',
        isActive: false, // 관리자 승인 후 게재
        recruiterId: userId,
      },
    });

    // 관리자 알림
    try {
      const admins = await prisma.user.findMany({
        where: { role: 'ADMIN' },
        select: { id: true },
      });

      if (admins.length > 0) {
        await prisma.userNotification.createMany({
          data: admins.map((admin) => ({
            userId: admin.id,
            type: 'NEW_RECRUITER_LISTING',
            referenceId: listing.id,
            title: '새로운 기업 공고 등록',
            body: `[${listing.company}] ${listing.position} 공고가 등록되어 승인 대기 중입니다.`,
          })),
          skipDuplicates: true,
        });
      }
    } catch (notificationError) {
      logger.error({ err: notificationError }, 'Recruiter listing notification error');
    }

    return NextResponse.json({ data: listing }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: '입력값을 확인해주세요.' }, { status: 400 });
    }
    logger.error({ err: error }, 'Recruiter listing create error');
    return handleApiError(error);
  }
}
