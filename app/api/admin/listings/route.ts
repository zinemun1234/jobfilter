/**
 * GET /api/admin/listings  — 공고 목록 조회 (search 파라미터 지원, ADMIN 전용)
 * POST /api/admin/listings — 공고 직접 등록 (company, position 필수)
 */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  if (session.user.role !== 'ADMIN') return null;
  return session;
}

export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

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

  return NextResponse.json({ data: listings });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const { company, position, location, career, education, employType, salary, deadline, url, description, tags } = body;

  if (!company || !position) {
    return NextResponse.json({ error: '회사명과 직무는 필수입니다' }, { status: 400 });
  }

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
    },
  });

  return NextResponse.json({ data: listing }, { status: 201 });
}
