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
  return { ...experience, technologies: parseTechnologies(experience.technologies) };
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = await getAuthSession();
    const existing = await prisma.experience.findFirst({ where: { id: params.id, userId } });
    if (!existing) return NextResponse.json({ error: '경험을 찾을 수 없습니다.' }, { status: 404 });
    const body = await request.json();
    const textFields = ['title', 'situation', 'action', 'result'] as const;
    for (const field of textFields) {
      if (body[field] !== undefined && (typeof body[field] !== 'string' || !body[field].trim())) {
        return NextResponse.json({ error: `${field} 값이 올바르지 않습니다.` }, { status: 400 });
      }
    }
    if (typeof body.title === 'string' && body.title.trim().length > 100) return NextResponse.json({ error: '제목은 100자 이하로 입력해주세요.' }, { status: 400 });
    if (['situation', 'action', 'result'].some(field => typeof body[field] === 'string' && body[field].trim().length > 2000)) return NextResponse.json({ error: '경험 내용은 2,000자 이하로 입력해주세요.' }, { status: 400 });
    const experience = await prisma.experience.update({
      where: { id: params.id },
      data: {
        ...(typeof body.title === 'string' && { title: body.title.trim() }),
        ...(typeof body.situation === 'string' && { situation: body.situation.trim() }),
        ...(typeof body.action === 'string' && { action: body.action.trim() }),
        ...(typeof body.result === 'string' && { result: body.result.trim() }),
        ...(Array.isArray(body.technologies) && { technologies: JSON.stringify(body.technologies.map((value: unknown) => String(value).trim()).filter(Boolean).slice(0, 20)) }),
        ...(typeof body.metrics === 'string' && { metrics: body.metrics.trim().slice(0, 500) || null }),
        ...(typeof body.jobId === 'string' && { jobId: body.jobId.trim() || null }),
      },
    });
    return NextResponse.json({ data: serializeExperience(experience) });
  } catch {
    return NextResponse.json({ error: '경험을 수정하지 못했습니다.' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = await getAuthSession();
    const deleted = await prisma.experience.deleteMany({ where: { id: params.id, userId } });
    if (deleted.count === 0) return NextResponse.json({ error: '경험을 찾을 수 없습니다.' }, { status: 404 });
    return NextResponse.json({ data: { ok: true } });
  } catch {
    return NextResponse.json({ error: '경험을 삭제하지 못했습니다.' }, { status: 500 });
  }
}
