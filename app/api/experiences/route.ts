import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/api';
import { prisma } from '@/lib/prisma';

function parseTechnologies(value: string): string[] {
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

function serializeExperience(experience: {
  id: string;
  title: string;
  situation: string;
  action: string;
  result: string;
  technologies: string;
  metrics: string | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: experience.id,
    title: experience.title,
    situation: experience.situation,
    action: experience.action,
    result: experience.result,
    technologies: parseTechnologies(experience.technologies),
    metrics: experience.metrics,
    createdAt: experience.createdAt,
    updatedAt: experience.updatedAt,
  };
}

export async function GET() {
  try {
    const userId = await getAuthSession();
    const experiences = await prisma.experience.findMany({ where: { userId }, orderBy: { updatedAt: 'desc' } });
    return NextResponse.json({ data: experiences.map(serializeExperience) });
  } catch {
    return NextResponse.json({ error: '경험을 불러오지 못했습니다.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getAuthSession();
    const body = await request.json() as {
      title?: string;
      situation?: string;
      action?: string;
      result?: string;
      technologies?: string[];
      metrics?: string;
      jobId?: string;
    };
    const title = body.title?.trim() ?? '';
    const situation = body.situation?.trim() ?? '';
    const action = body.action?.trim() ?? '';
    const result = body.result?.trim() ?? '';
    if (!title || !situation || !action || !result) {
      return NextResponse.json({ error: '제목·상황·행동·결과는 필수입니다.' }, { status: 400 });
    }
    if (title.length > 100 || situation.length > 2000 || action.length > 2000 || result.length > 2000) {
      return NextResponse.json({ error: '입력 가능한 글자 수를 초과했습니다.' }, { status: 400 });
    }
    const technologies = Array.isArray(body.technologies)
      ? body.technologies.map(value => value.trim()).filter(Boolean).slice(0, 20)
      : [];
    const experience = await prisma.experience.create({
      data: {
        userId,
        title,
        situation,
        action,
        result,
        technologies: JSON.stringify(technologies),
        metrics: body.metrics?.trim() || null,
        jobId: body.jobId?.trim() || null,
      },
    });
    return NextResponse.json({ data: serializeExperience(experience) }, { status: 201 });
  } catch {
    return NextResponse.json({ error: '경험을 저장하지 못했습니다.' }, { status: 500 });
  }
}
