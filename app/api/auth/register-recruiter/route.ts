/**
 * POST /api/auth/register-recruiter
 * 기업 회원 (RECRUITER) 가입
 * - isApproved는 기본 false, 관리자 승인 후 공고 등록 가능
 */
import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { recruiterRegisterSchema } from '@/lib/validations/recruiter';
import { successResponse, conflict, badRequest } from '@/lib/api';
import { checkRequestSecurity, rateLimiters } from '@/lib/security';

export async function POST(req: NextRequest) {
  const security = await checkRequestSecurity(req, {
    rateLimit: true,
    requireOrigin: true,
    limiter: rateLimiters.auth,
  });
  if (security) return security;

  try {
    const body = await req.json();
    const data = recruiterRegisterSchema.parse(body);

    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      return conflict('이미 가입된 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        role: 'RECRUITER',
        companyName: data.companyName,
        companyDesc: data.companyDesc ?? null,
        isApproved: false,
        skills: '[]',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        companyName: true,
        companyDesc: true,
        isApproved: true,
        createdAt: true,
      },
    });

    // 관리자 알림
    try {
      const admins = await prisma.user.findMany({
        where: { role: 'ADMIN' },
        select: { id: true },
      });

      if (admins.length > 0) {
        await prisma.userNotification.createMany({
          data: admins.map((admin) => ({
            userId: admin.id,
            type: 'NEW_RECRUITER',
            referenceId: user.id,
            title: '새로운 리크루터 가입',
            body: `[${user.companyName}] ${user.name}이 리크루터로 가입했습니다. 승인이 필요합니다.`,
          })),
          skipDuplicates: true,
        });
      }
    } catch (notificationError) {
      logger.error({ err: notificationError }, 'Recruiter register notification error');
    }

    return successResponse({ user }, 201);
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return badRequest('입력값을 확인해주세요.');
    }
    logger.error({ err: error }, 'Recruiter register error');
    return NextResponse.json({ error: '회원가입에 실패했습니다.' }, { status: 500 });
  }
}
