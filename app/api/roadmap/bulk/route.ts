import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getJobCategory } from '@/lib/roadmap-templates';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const bulkRoadmapItemSchema = z.object({
  items: z.array(
    z.object({
      skill: z.string().min(1, '기술명은 필수입니다'),
      jobCategory: z.string().min(1, '직무 카테고리는 필수입니다').optional(),
      status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']).optional(),
    })
  ).min(1, '최소 1개 이상의 항목이 필요합니다'),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = bulkRoadmapItemSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input data', issues: parsed.error.issues }, { status: 400 });
    }

    const { items } = parsed.data;

    // 사용자 targetJob이 없으면 요청에서 jobCategory가 반드시 들어와야 함
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { targetJob: true },
    });
    const defaultCategory = getJobCategory(user?.targetJob);

    const categories = new Set<string>();
    const normalizedItems = items.map((item) => {
      const jobCategory = item.jobCategory || defaultCategory;
      categories.add(jobCategory);
      return {
        skill: item.skill,
        jobCategory,
        status: item.status || 'NOT_STARTED',
      };
    });

    // 기존 아이템 조회하여 중복 제거
    const existingItems = await prisma.roadmapItem.findMany({
      where: {
        userId: session.user.id,
        jobCategory: { in: Array.from(categories) },
      },
      select: { skill: true, jobCategory: true },
    });

    const existingSet = new Set(
      existingItems.map((item) => `${item.jobCategory}|${item.skill.toLowerCase()}`)
    );

    const newItems = normalizedItems.filter(
      (item) => !existingSet.has(`${item.jobCategory}|${item.skill.toLowerCase()}`)
    );

    if (newItems.length === 0) {
      return NextResponse.json({ data: { created: 0, items: [] } }, { status: 200 });
    }

    // 카테고리별 마지막 order 조회
    const lastOrders = await prisma.roadmapItem.groupBy({
      by: ['jobCategory'],
      where: {
        userId: session.user.id,
        jobCategory: { in: Array.from(categories) },
      },
      _max: { order: true },
    });

    const lastOrderMap = new Map(lastOrders.map((group) => [group.jobCategory, group._max.order ?? 0]));

    const categoryCounts = new Map<string, number>();
    const createData = newItems.map((item) => {
      const count = categoryCounts.get(item.jobCategory) ?? 0;
      categoryCounts.set(item.jobCategory, count + 1);

      const startOrder = lastOrderMap.get(item.jobCategory) ?? 0;
      const order = startOrder + count + 1;

      return {
        userId: session.user.id,
        jobCategory: item.jobCategory,
        skill: item.skill,
        status: item.status,
        referenceLinks: '[]',
        isCustom: true,
        order,
      };
    });

    await prisma.roadmapItem.createMany({
      data: createData,
      skipDuplicates: true,
    });

    return NextResponse.json({ data: { created: createData.length } }, { status: 201 });
  } catch (error) {
    logger.error({ err: error }, 'Failed to bulk create roadmap items');
    return NextResponse.json({ error: 'Failed to create roadmap items' }, { status: 500 });
  }
}
