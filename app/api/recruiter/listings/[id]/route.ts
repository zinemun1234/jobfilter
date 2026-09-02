/**
 * GET /api/recruiter/listings/[id] — 본인 공고 상세
 * PUT /api/recruiter/listings/[id] — 공고 수정
 * PATCH /api/recruiter/listings/[id] — isActive 토글 (승인된 공고만)
 * DELETE /api/recruiter/listings/[id] — 공고 삭제
 */
import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { requireRecruiter } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
import { createAuditLog } from '@/lib/audit-log';
import { classifyMajor } from '@/lib/majors';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await requireRecruiter();
    const listing = await prisma.jobListing.findFirst({
      where: { id: params.id, recruiterId: userId },
    });
    if (!listing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ data: listing });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await requireRecruiter();
    const body = await request.json();

    const existing = await prisma.jobListing.findFirst({
      where: { id: params.id, recruiterId: userId },
    });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const updatedPosition = body.position ?? existing.position;
    const updatedDescription = body.description ?? existing.description;
    const { category } = await classifyMajor(`${updatedPosition} ${updatedDescription ?? ''}`);

    // 승인되지 않은 공고 수정 시에는 isActive를 false로 유지
    const listing = await prisma.jobListing.update({
      where: { id: params.id },
      data: {
        company: body.company ?? existing.company,
        position: updatedPosition,
        location: body.location ?? existing.location,
        career: body.career ?? existing.career,
        education: body.education ?? existing.education,
        employType: body.employType ?? existing.employType,
        salary: body.salary ?? existing.salary,
        deadline: body.deadline ? new Date(body.deadline) : existing.deadline,
        url: body.url ?? existing.url,
        description: updatedDescription,
        tags: body.tags ? JSON.stringify(body.tags) : existing.tags,
        category,
        isActive: existing.isActive, // 리크루터는 isActive를 직접 변경할 수 없음
      },
    });

    return NextResponse.json({ data: listing });
  } catch (error) {
    logger.error({ err: error }, 'Recruiter listing update error');
    return handleApiError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await requireRecruiter();
    const body = await request.json();

    const existing = await prisma.jobListing.findFirst({
      where: { id: params.id, recruiterId: userId },
    });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // 리크루터는 공고를 비활성화만 가능 (재활성화는 관리자 승인 필요)
    if (body.isActive === false) {
      const listing = await prisma.jobListing.update({
        where: { id: params.id },
        data: { isActive: false },
      });
      return NextResponse.json({ data: listing });
    }

    return NextResponse.json({ error: 'isActive 변경 권한이 없습니다.' }, { status: 403 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await requireRecruiter();
    const existing = await prisma.jobListing.findFirst({
      where: { id: params.id, recruiterId: userId },
    });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    await createAuditLog({
      userId,
      action: 'DELETE_RECRUITER_LISTING',
      resource: 'JobListing',
      resourceId: params.id,
      details: { id: params.id, company: existing.company, position: existing.position },
      request,
    });

    await prisma.jobListing.delete({ where: { id: params.id } });
    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    return handleApiError(error);
  }
}
