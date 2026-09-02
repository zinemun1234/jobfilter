const MS_PER_DAY = 1000 * 60 * 60 * 24;

 type JobNotificationInput = {
  id: string;
  company: string;
  position: string;
  deadline: Date | null;
  interviewAt: Date | null;
  status: string;
  updatedAt: Date;
};

/**
 * 사용자의 지원 현황(JobPosting)을 기반으로 마감/면접/팔로업 알림을 생성합니다.
 * type + referenceId로 중복 생성을 방지합니다.
 */
export async function syncJobNotifications(userId: string) {
  const { prisma } = await import('@/lib/prisma');

  const jobs = await prisma.jobPosting.findMany({
    where: { userId },
    select: {
      id: true,
      company: true,
      position: true,
      deadline: true,
      interviewAt: true,
      status: true,
      updatedAt: true,
    },
  });

  const now = new Date();
  const deadlineLimit = new Date(now.getTime() + 3 * MS_PER_DAY);
  const interviewLimit = new Date(now.getTime() + 2 * MS_PER_DAY);
  const followUpLimit = new Date(now.getTime() - 14 * MS_PER_DAY);

  const candidates: { type: string; referenceId: string; title: string; body: string; actionUrl: string }[] = [];

  for (const job of jobs as JobNotificationInput[]) {
    if (job.deadline && job.deadline > now && job.deadline <= deadlineLimit && !['FINAL_PASS', 'REJECTED'].includes(job.status)) {
      const days = Math.ceil((job.deadline.getTime() - now.getTime()) / MS_PER_DAY);
      candidates.push({
        type: 'DEADLINE',
        referenceId: job.id,
        title: `마감 D-${days} | ${job.company} ${job.position}`,
        body: `지원 마감이 ${days}일 남았습니다.`,
        actionUrl: `/jobs/${job.id}`,
      });
    }

    if (job.interviewAt && job.interviewAt > now && job.interviewAt <= interviewLimit) {
      const days = Math.ceil((job.interviewAt.getTime() - now.getTime()) / MS_PER_DAY);
      candidates.push({
        type: 'INTERVIEW',
        referenceId: job.id,
        title: `면접 D-${days} | ${job.company} ${job.position}`,
        body: `면접이 ${days}일 후입니다. 준비를 확인하세요.`,
        actionUrl: `/jobs/${job.id}`,
      });
    }

    if (job.status === 'APPLIED' && job.updatedAt <= followUpLimit) {
      const days = Math.floor((now.getTime() - job.updatedAt.getTime()) / MS_PER_DAY);
      candidates.push({
        type: 'FOLLOWUP',
        referenceId: job.id,
        title: `팔로업 필요 | ${job.company} ${job.position}`,
        body: `지원한 지 ${days}일이 지났습니다. 결과를 확인해보세요.`,
        actionUrl: `/jobs/${job.id}`,
      });
    }
  }

  let created = 0;
  for (const candidate of candidates) {
    try {
      await prisma.userNotification.upsert({
        where: {
          userId_type_referenceId: {
            userId,
            type: candidate.type,
            referenceId: candidate.referenceId,
          },
        },
        update: {
          title: candidate.title,
          body: candidate.body,
          actionUrl: candidate.actionUrl,
          isRead: false,
        },
        create: {
          userId,
          type: candidate.type,
          referenceId: candidate.referenceId,
          actionUrl: candidate.actionUrl,
          title: candidate.title,
          body: candidate.body,
        },
      });
      created += 1;
    } catch {
      // unique conflict 또는 기타 오류는 무시
    }
  }

  return { created, checked: candidates.length };
}

/**
 * 새 공고가 등록되면 모든 사용자에게 알림을 생성합니다.
 */
export async function notifyUsersOfNewListing(listing: {
  id: string;
  company: string;
  position: string;
  deadline?: Date | null;
}) {
  const { prisma } = await import('@/lib/prisma');

  const users = await prisma.user.findMany({ select: { id: true } });
  const deadlineText = listing.deadline
    ? `마감일: ${listing.deadline.toLocaleDateString('ko-KR')}`
    : '상시 채용';

  const title = `새 공고: ${listing.company} ${listing.position}`;
  const body = `${listing.company}의 ${listing.position} 공고가 등록되었어요. ${deadlineText}`;

  await prisma.$transaction(
    users.map((u) =>
      prisma.userNotification.upsert({
        where: {
          userId_type_referenceId: {
            userId: u.id,
            type: 'NEW_LISTING',
            referenceId: listing.id,
          },
        },
        update: { title, body, isRead: false, actionUrl: `/listings/${listing.id}` },
        create: {
          userId: u.id,
          type: 'NEW_LISTING',
          referenceId: listing.id,
          actionUrl: `/listings/${listing.id}`,
          title,
          body,
        },
      })
    )
  );
}

/**
 * 일괄 등록된 공고 수를 알려주는 요약 알림을 모든 사용자에게 생성합니다.
 */
export async function notifyUsersOfNewListingsSummary(count: number) {
  if (count <= 0) return;

  const { prisma } = await import('@/lib/prisma');

  const users = await prisma.user.findMany({ select: { id: true } });
  const title = `${count}개의 새 공고가 등록되었어요`;
  const body = `관리자가 ${count}개의 새 채용 공고를 등록했습니다. 맞춤 공고 목록을 확인해보세요.`;
  const referenceId = `summary-${count}-${Date.now()}`;

  await prisma.$transaction(
    users.map((u) =>
      prisma.userNotification.create({
        data: {
          userId: u.id,
          type: 'NEW_LISTING_SUMMARY',
          referenceId,
          actionUrl: '/listings',
          title,
          body,
        },
      })
    )
  );
}

/**
 * 알림 유형과 참조 ID에 따라 이동할 경로를 반환합니다.
 * 클라이언트에서도 사용할 수 있도록 서버 전용 의존성을 갖지 않습니다.
 */
export function getNotificationLink(notification: {
  type: string;
  referenceId?: string | null;
}): string | null {
  const { type, referenceId } = notification;

  switch (type) {
    case 'LISTING_APPROVED':
    case 'LISTING_REJECTED':
    case 'NEW_RECRUITER_LISTING':
      return '/recruiter/listings';

    case 'NEW_APPLICANT': {
      if (!referenceId) return '/recruiter/listings';
      return `/recruiter/listings/${referenceId}/applicants`;
    }

    case 'APPLICATION_STATUS':
      return '/jobs';

    case 'NEW_RECRUITER':
      return '/admin/users';

    case 'DEADLINE':
    case 'FOLLOWUP':
      return '/jobs';

    case 'INTERVIEW':
      return '/interview';

    case 'NOTICE':
      return '/notices';

    case 'NEW_LISTING': {
      if (!referenceId) return '/listings';
      return `/listings/${referenceId}`;
    }

    case 'NEW_LISTING_SUMMARY':
      return '/listings';

    default:
      return null;
  }
}
