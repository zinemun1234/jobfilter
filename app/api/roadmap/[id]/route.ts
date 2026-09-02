import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { roadmapItemSchema } from '@/lib/validations';
import { ApiResponse, sanitizeRoadmapItem } from '@/lib/api';
import { createAuditLog } from '@/lib/audit-log';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = roadmapItemSchema.partial().parse(body);

    const existingItem = await prisma.roadmapItem.findFirst({
      where: { 
        id: params.id,
        userId: session.user.id 
      },
    });

    if (!existingItem) {
      return NextResponse.json({ error: 'Roadmap item not found' }, { status: 404 });
    }

    const roadmapItem = await prisma.roadmapItem.update({
      where: { id: params.id },
      data: {
        ...(validatedData.status && { status: validatedData.status }),
        ...(validatedData.skill && { skill: validatedData.skill }),
        ...(validatedData.jobCategory && { jobCategory: validatedData.jobCategory }),
        ...(validatedData.order !== undefined && { order: validatedData.order }),
        ...(validatedData.isCustom !== undefined && { isCustom: validatedData.isCustom }),
        ...(validatedData.referenceLinks !== undefined && {
          referenceLinks: JSON.stringify(validatedData.referenceLinks),
        }),
      },
    });

    const sanitized = sanitizeRoadmapItem(roadmapItem);
    return NextResponse.json({ data: sanitized } as ApiResponse<typeof sanitized>);
  } catch (error) {
    logger.error({ err: error }, 'Failed to update roadmap item');
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update roadmap item' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existingItem = await prisma.roadmapItem.findFirst({
      where: { 
        id: params.id,
        userId: session.user.id 
      },
    });

    if (!existingItem) {
      return NextResponse.json({ error: 'Roadmap item not found' }, { status: 404 });
    }

    // 기본 템플릿 아이템은 삭제 불가
    if (!existingItem.isCustom) {
      return NextResponse.json({ error: 'Cannot delete template items' }, { status: 400 });
    }

    await createAuditLog({
      userId: session.user.id,
      action: 'DELETE_ROADMAP_ITEM',
      resource: 'RoadmapItem',
      resourceId: params.id,
      details: { id: params.id, skill: existingItem.skill, jobCategory: existingItem.jobCategory },
      request,
    });

    await prisma.roadmapItem.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ data: { success: true } } as ApiResponse<{ success: boolean }>);
  } catch (error) {
    logger.error({ err: error }, 'Failed to delete roadmap item');
    return NextResponse.json({ error: 'Failed to delete roadmap item' }, { status: 500 });
  }
}
