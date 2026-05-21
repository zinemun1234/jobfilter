/**
 * GET /api/profile  — 내 프로필 조회 (비밀번호 제외)
 * PUT /api/profile  — 프로필 수정 (Zod profileSchema 검증)
 *   - skills 배열은 JSON 문자열로 직렬화해서 저장
 *   - lib/api.ts의 successResponse/badRequest/notFound 헬퍼 사용
 */
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, getAuthSession, notFound, badRequest } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
import { profileSchema } from '@/lib/validations/profile';

export async function GET() {
  try {
    const userId = await getAuthSession();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true, email: true, name: true, major: true,
        targetJob: true, skills: true, role: true,
        createdAt: true, updatedAt: true,
      },
    });

    if (!user) {
      return notFound('사용자를 찾을 수 없습니다.');
    }

    return successResponse(user);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = await getAuthSession();

    const body = await request.json();
    const parsed = profileSchema.safeParse(body);

    if (!parsed.success) {
      return badRequest(parsed.error.errors[0]?.message ?? '유효하지 않은 입력입니다.');
    }

    const existing = await prisma.user.findUnique({ where: { id: userId } });
    if (!existing) {
      return notFound('사용자를 찾을 수 없습니다.');
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: parsed.data.name,
        major: parsed.data.major,
        targetJob: parsed.data.targetJob,
        ...(parsed.data.skills !== undefined && {
          skills: JSON.stringify(parsed.data.skills),
        }),
      },
      select: {
        id: true, email: true, name: true, major: true,
        targetJob: true, skills: true, role: true,
        createdAt: true, updatedAt: true,
      },
    });

    return successResponse(updatedUser);
  } catch (error) {
    return handleApiError(error);
  }
}
