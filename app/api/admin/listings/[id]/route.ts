import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin, sanitizeJobListing } from '@/lib/api';
import { handleApiError } from '@/lib/errors';

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

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

  return NextResponse.json({ data: sanitizeJobListing(listing) });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  await prisma.jobListing.delete({ where: { id: params.id } });
  return NextResponse.json({ data: { success: true } });
}
