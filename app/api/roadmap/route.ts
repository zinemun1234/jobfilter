import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { roadmapItemSchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/api';
import { getRoadmapTemplate } from '@/lib/roadmap-templates';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const jobCategory = searchParams.get('jobCategory');

    if (jobCategory) {
      // ?�정 직무 카테고리??로드�?조회
      let roadmapItems = await prisma.roadmapItem.findMany({
        where: { 
          userId: session.user.id,
          jobCategory,
        },
        orderBy: { order: 'asc' },
      });

      // ?�당 카테고리???�이?�이 ?�으�??�플릿에???�성
      if (roadmapItems.length === 0) {
        const template = getRoadmapTemplate(jobCategory);
        if (template) {
          await prisma.roadmapItem.createMany({
            data: template.skills.map(skill => ({
              userId: session.user.id,
              jobCategory,
              skill: skill.skill,
              referenceLinks: JSON.stringify(skill.referenceLinks),
              order: skill.order,
              isCustom: false,
              status: 'NOT_STARTED',
            })),
          });

          roadmapItems = await prisma.roadmapItem.findMany({
            where: { 
              userId: session.user.id,
              jobCategory,
            },
            orderBy: { order: 'asc' },
          });
        }
      }

      const parsed = roadmapItems.map(item => ({
        ...item,
        referenceLinks: (() => { try { return JSON.parse(item.referenceLinks as string); } catch { return []; } })(),
      }));
      return NextResponse.json({ data: parsed });
    } else {
      // ?�체 로드�?목록 조회
      const roadmapItems = await prisma.roadmapItem.findMany({
        where: { userId: session.user.id },
        orderBy: [
          { jobCategory: 'asc' },
          { order: 'asc' },
        ],
      });

      const parsed = roadmapItems.map(item => ({
        ...item,
        referenceLinks: (() => { try { return JSON.parse(item.referenceLinks as string); } catch { return []; } })(),
      }));
      return NextResponse.json({ data: parsed });
    }
  } catch (error) {
    console.error('Failed to fetch roadmap:', error);
    return NextResponse.json({ error: 'Failed to fetch roadmap' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = roadmapItemSchema.parse(body);

    // 커스?� ?�이?�인 경우 마�?�??�서�??�정
    if (validatedData.isCustom && !validatedData.order) {
      const lastItem = await prisma.roadmapItem.findFirst({
        where: { 
          userId: session.user.id,
          jobCategory: validatedData.jobCategory,
        },
        orderBy: { order: 'desc' },
      });
      validatedData.order = (lastItem?.order || 0) + 1;
    }

    const roadmapItem = await prisma.roadmapItem.create({
      data: {
        ...validatedData,
        userId: session.user.id,
        referenceLinks: JSON.stringify(validatedData.referenceLinks || []),
      },
    });

    return NextResponse.json({ data: roadmapItem } as ApiResponse<typeof roadmapItem>, { status: 201 });
  } catch (error) {
    console.error('Failed to create roadmap item:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create roadmap item' }, { status: 500 });
  }
}
