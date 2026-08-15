import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/api';
import { handleApiError } from '@/lib/errors';

export const dynamic = 'force-dynamic';

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  await prisma.employmentRecord.delete({ where: { id: params.id } });
  return NextResponse.json({ data: { ok: true } });
}
