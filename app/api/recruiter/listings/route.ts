import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function requireRecruiter() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  if (session.user.role !== 'RECRUITER') return null;
  // ?�인??기업�??�용
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { isApproved: true } });
  if (!user?.isApproved) return null;
  return session;
}

// GET ????공고 목록
export async function GET() {
  const session = await requireRecruiter();
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const listings = await prisma.jobListing.findMany({
    where: { recruiterId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({
    data: listings.map(l => ({
      ...l,
      tags: (() => { try { return l.tags ? JSON.parse(l.tags) : []; } catch { return []; } })(),
    })),
  });
}

// POST ??공고 ?�록 (관리자 검?????�성??
export async function POST(req: NextRequest) {
  const session = await requireRecruiter();
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const { company, position, location, career, education, employType, salary, deadline, url, description, tags } = body;

  if (!company || !position) {
    return NextResponse.json({ error: '?�사명과 직무???�수?�니?? }, { status: 400 });
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
      tags: tags?.length ? JSON.stringify(tags) : null,
      source: '구인??직접?�록',
      isActive: false, // 관리자 ?�인 ???�성??
      recruiterId: session.user.id,
    },
  });

  return NextResponse.json({ data: listing }, { status: 201 });
}
