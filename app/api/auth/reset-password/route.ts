import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { checkRequestSecurity, rateLimiters } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const security = await checkRequestSecurity(request, {
    rateLimit: true,
    requireOrigin: true,
    limiter: rateLimiters.auth,
  });
  if (security) return security;

  try {
    const { token, password } = await request.json();
    if (!token || !password) {
      return NextResponse.json({ error: '토큰과 비밀번호를 입력해주세요.' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: '비밀번호는 8자 이상이어야 합니다.' }, { status: 400 });
    }

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken || resetToken.used || new Date() > resetToken.expiresAt) {
      return NextResponse.json({ error: '유효하지 않거나 만료된 토큰입니다.' }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email: resetToken.email },
      data: { password: hashed },
    });

    await prisma.passwordResetToken.update({
      where: { token },
      data: { used: true },
    });

    return NextResponse.json({ message: '비밀번호가 변경되었습니다.' });
  } catch (e) {
    logger.error({ err: e }, '비밀번호 재설정 실패');
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
