import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function requireRecruiter(listingId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== 'RECRUITER') return null;
  const listing = await prisma.jobListing.findUnique({ where: { id: listingId } });
  if (!listing || listing.recruiterId !== session.user.id) return null;
  return session;
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireRecruiter(params.id);
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const { company, position, location, career, education, employType, salary, deadline, url, description, tags } = body;

  const updated = await prisma.jobListing.update({
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
      tags: tags?.length ? JSON.stringify(tags) : null,
      isActive: false, // 수정 시 재검토
    },
  });

  return NextResponse.json({ data: updated });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireRecruiter(params.id);
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  await prisma.jobListing.delete({ where: { id: params.id } });
  return NextResponse.json({ data: { ok: true } });
}
