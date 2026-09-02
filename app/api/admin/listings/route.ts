/**
 * GET /api/admin/listings  — 공고 목록 조회 (search 파라미터 지원, ADMIN 전용)
 * POST /api/admin/listings — 공고 직접 등록 (company, position 필수)
 */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin, sanitizeJobListing } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
import { notifyUsersOfNewListing } from '@/lib/notifications';
import { classifyMajor } from '@/lib/majors';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') ?? '';

  const listings = await prisma.jobListing.findMany({
    where: search ? {
      OR: [
        { company: { contains: search } },
        { position: { contains: search } },
      ],
    } : {},
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ data: listings.map((listing) => sanitizeJobListing(listing)) });
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  const body = await req.json();
  const { company, position, location, career, education, employType, salary, deadline, url, description, tags } = body;

  if (!company || !position) {
    return NextResponse.json({ error: '회사명과 직무는 필수입니다' }, { status: 400 });
  }

  const { category } = await classifyMajor(`${position} ${description ?? ''}`);

  const listing = await prisma.jobListing.create({
    data: {
      company,
      position,
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
    },
  });

  // 사용자 알림 생성
  try {
    await notifyUsersOfNewListing(listing);
  } catch {
    // 알림 생성 실패는 공고 등록 응답에 영향을 주지 않음
  }

  return NextResponse.json({ data: sanitizeJobListing(listing) }, { status: 201 });
}
