import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
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
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: '이메일을 입력해주세요.' }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    // 보안상 사용자 존재 여부 노출 방지
    if (!user) {
      return NextResponse.json({ message: '이메일이 전송되었습니다.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1시간

    // 기존 토큰 무효화 + 새 토큰 생성
    await prisma.passwordResetToken.updateMany({
      where: { email, used: false },
      data: { used: true },
    });
    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expiresAt,
        used: false,
      },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/reset-password?token=${token}`;
    // SMTP 연동 전까지는 서버 로그에만 남기고, 응답에는 토큰을 노출하지 않는다.
    logger.info('비밀번호 재설정 처리 완료 (링크는 이메일 발송에 사용)');

    return NextResponse.json({
      message: '비밀번호 재설정 요청이 접수되었습니다. 현재 이메일 발송 기능은 준비 중입니다.',
    });
  } catch (e) {
    logger.error({ err: e }, '비밀번호 재설정 처리 실패');
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
