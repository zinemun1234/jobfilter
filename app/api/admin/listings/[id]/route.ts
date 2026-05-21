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

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const { company, position, location, career, education, employType, salary, deadline, url, description, tags, isActive } = body;

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
      isActive: isActive ?? true,
    },
  });

  return NextResponse.json({ data: listing });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  await prisma.jobListing.delete({ where: { id: params.id } });
  return NextResponse.json({ data: { success: true } });
}
