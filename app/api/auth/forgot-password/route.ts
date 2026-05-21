import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: '이메일을 입력해주세요.' }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    // 보안상 사용자 존재 여부 노출 안 함
    if (!user) {
      return NextResponse.json({ message: '이메일이 전송되었습니다.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1시간

    // 기존 토큰 무효화 + 새 토큰 생성 (raw SQL — Prisma 캐시 이슈 우회)
    await prisma.$executeRawUnsafe(
      `UPDATE PasswordResetToken SET used = 1 WHERE email = ? AND used = 0`,
      email
    );
    await prisma.$executeRawUnsafe(
      `INSERT INTO PasswordResetToken (id, email, token, expiresAt, used, createdAt) VALUES (?, ?, ?, ?, 0, ?)`,
      crypto.randomBytes(12).toString('hex'),
      email,
      token,
      expiresAt.toISOString(),
      new Date().toISOString()
    );

    const resetUrl = `${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/reset-password?token=${token}`;
    console.log(`[비밀번호 재설정 링크] ${resetUrl}`);

    return NextResponse.json({
      message: '이메일이 전송되었습니다.',
      devToken: process.env.NODE_ENV === 'development' ? token : undefined,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
