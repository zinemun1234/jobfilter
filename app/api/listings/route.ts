/**
 * GET /api/listings
 * 활성 공고 목록 조회 (서버 사이드 필터링 + 페이지네이션)
 *
 * POST /api/listings
 * 공고를 내 지원 목록(JobPosting)에 추가
 * - 같은 회사+직무 공고가 이미 있으면 409 반환
 * - 초기 상태는 PREPARING
 */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { extractJobChecklist } from '@/lib/job-checklist';
import { getListings } from '@/lib/server/listings';
import { sanitizeJobPosting } from '@/lib/api';

// 유저용: 활성 공고 목록 조회
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const response = await getListings(searchParams, session.user.id);
  return NextResponse.json(response);
}

// 유저용: 공고를 내 지원 목록에 추가
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { listingId } = await req.json();
  if (!listingId) return NextResponse.json({ error: 'listingId required' }, { status: 400 });

  const listing = await prisma.jobListing.findUnique({ where: { id: listingId } });
  if (!listing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // 이미 같은 공고를 추가했는지 확인
  const existing = await prisma.jobPosting.findFirst({
    where: { userId: session.user.id, company: listing.company, position: listing.position },
  });
  if (existing) return NextResponse.json({ error: '이미 추가된 공고입니다' }, { status: 409 });

  const tags = (() => { try { return listing.tags ? JSON.parse(listing.tags) : []; } catch { return []; } })();
  const checklist = extractJobChecklist(listing.description, tags);

  const job = await prisma.jobPosting.create({
    data: {
      userId: session.user.id,
      company: listing.company,
      position: listing.position,
      url: listing.url,
      deadline: listing.deadline,
      status: 'PREPARING',
      checklist: checklist.length > 0 ? JSON.stringify(checklist) : null,
      listingId: listing.id,
    },
  });

  // 리크루터 공고에 지원하면 리크루터에게 알림
  if (listing.recruiterId) {
    try {
      const student = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { name: true, email: true },
      });
      const actionUrl = `/recruiter/listings/${listing.id}/applicants`;
      await prisma.userNotification.upsert({
        where: {
          userId_type_referenceId: {
            userId: listing.recruiterId,
            type: 'NEW_APPLICANT',
            referenceId: listing.id,
          },
        },
        update: {
          title: '새로운 지원자',
          body: `${student?.name ?? '학생'}님이 [${listing.company}] ${listing.position} 공고에 지원했습니다.`,
          actionUrl,
          isRead: false,
        },
        create: {
          userId: listing.recruiterId,
          type: 'NEW_APPLICANT',
          referenceId: listing.id,
          actionUrl,
          title: '새로운 지원자',
          body: `${student?.name ?? '학생'}님이 [${listing.company}] ${listing.position} 공고에 지원했습니다.`,
        },
      });
    } catch {
      // 알림 실패는 지원 등록에 영향을 주지 않음
    }
  }

  return NextResponse.json({ data: sanitizeJobPosting(job) }, { status: 201 });
}
