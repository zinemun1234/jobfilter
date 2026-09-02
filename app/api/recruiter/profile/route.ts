import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRecruiter } from '@/lib/api';
import { handleApiError } from '@/lib/errors';

export async function GET() {
  try {
    const { userId } = await requireRecruiter();
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, companyName: true, companyDesc: true, companyLogoUrl: true, companyAttachments: true, isApproved: true, createdAt: true },
    });
    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ data: user });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = await requireRecruiter();
    const body = await req.json();
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        companyName: body.companyName ?? undefined,
        companyDesc: body.companyDesc ?? undefined,
        companyLogoUrl: body.companyLogoUrl ?? undefined,
        companyAttachments: body.companyAttachments ?? undefined,
      },
      select: { id: true, companyName: true, companyDesc: true, companyLogoUrl: true, companyAttachments: true },
    });
    return NextResponse.json({ data: user });
  } catch (error) {
    return handleApiError(error);
  }
}
