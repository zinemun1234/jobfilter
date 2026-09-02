import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin, sanitizeJobListing } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
import { createAuditLog } from '@/lib/audit-log';
import { classifyMajor } from '@/lib/majors';

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  const body = await req.json();
  const { company, position, location, career, education, employType, salary, deadline, url, description, tags, category: bodyCategory, isActive, rejectionReason } = body;

  const previous = await prisma.jobListing.findUnique({ where: { id: params.id }, include: { recruiter: { select: { id: true, companyName: true } } } });
  if (!previous) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const category =
    bodyCategory ??
    (await classifyMajor(`${position ?? previous.position} ${(description ?? previous.description) ?? ''}`)).category;

  const listing = await prisma.jobListing.update({
    where: { id: params.id },
    data: {
      company, position,
      location: location || null,
      career: career || null,
      education: education || null,
      employType: employType || null,
      salary: salary || null,
      deadline: deadline ? new Date(deadline) : null,
      url: url || null,
      description: description || null,
      tags: tags ? JSON.stringify(tags) : null,
      category,
      isActive: isActive ?? true,
      rejectionReason: isActive ? null : (rejectionReason || previous.rejectionReason || null),
    },
  });

  // 승인/반려 알림 (동일 공고 중복 방지를 위해 upsert)
  const hasActiveChanged = previous.isActive !== listing.isActive;
  const hasRejectionReason = !!rejectionReason;
  if (previous.recruiter && (hasActiveChanged || (hasRejectionReason && !listing.isActive))) {
    if (listing.isActive) {
      await prisma.userNotification.upsert({
        where: { userId_type_referenceId: { userId: previous.recruiter.id, type: 'LISTING_APPROVED', referenceId: listing.id } },
        update: { body: `[${listing.company}] ${listing.position} 공고가 승인되어 게시되었습니다.`, isRead: false },
        create: {
          userId: previous.recruiter.id,
          type: 'LISTING_APPROVED',
          referenceId: listing.id,
          title: '공고 승인 완료',
          body: `[${listing.company}] ${listing.position} 공고가 승인되어 게시되었습니다.`,
        },
      });
    } else {
      await prisma.userNotification.upsert({
        where: { userId_type_referenceId: { userId: previous.recruiter.id, type: 'LISTING_REJECTED', referenceId: listing.id } },
        update: { body: `[${listing.company}] ${listing.position} 공고가 반려되었습니다.${listing.rejectionReason ? ` 사유: ${listing.rejectionReason}` : ''}`, isRead: false },
        create: {
          userId: previous.recruiter.id,
          type: 'LISTING_REJECTED',
          referenceId: listing.id,
          title: '공고 반려',
          body: `[${listing.company}] ${listing.position} 공고가 반려되었습니다.${listing.rejectionReason ? ` 사유: ${listing.rejectionReason}` : ''}`,
        },
      });
    }
  }

  return NextResponse.json({ data: sanitizeJobListing(listing) });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  let userId: string;
  try {
    ({ userId } = await requireAdmin());
  } catch (error) {
    return handleApiError(error);
  }

  const listing = await prisma.jobListing.findUnique({
    where: { id: params.id },
    select: { id: true, company: true, position: true },
  });
  if (!listing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await createAuditLog({
    userId,
    action: 'DELETE_ADMIN_LISTING',
    resource: 'JobListing',
    resourceId: params.id,
    details: { id: listing.id, company: listing.company, position: listing.position },
    request: req,
  });

  await prisma.jobListing.delete({ where: { id: params.id } });
  return NextResponse.json({ data: { success: true } });
}
