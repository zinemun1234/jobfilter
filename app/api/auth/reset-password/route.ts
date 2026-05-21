import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();
    if (!token || !password) {
      return NextResponse.json({ error: '토큰과 비밀번호를 입력해주세요.' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: '비밀번호는 8자 이상이어야 합니다.' }, { status: 400 });
    }

    // raw SQL — Prisma 캐시 이슈 우회
    const rows = await prisma.$queryRawUnsafe<{ id: string; email: string; expiresAt: string; used: number }[]>(
      `SELECT id, email, expiresAt, used FROM PasswordResetToken WHERE token = ? LIMIT 1`,
      token
    );

    const resetToken = rows[0];
    if (!resetToken || resetToken.used === 1 || new Date() > new Date(resetToken.expiresAt)) {
      return NextResponse.json({ error: '유효하지 않거나 만료된 토큰입니다.' }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email: resetToken.email },
      data: { password: hashed },
    });

    await prisma.$executeRawUnsafe(
      `UPDATE PasswordResetToken SET used = 1 WHERE token = ?`,
      token
    );

    return NextResponse.json({ message: '비밀번호가 변경되었습니다.' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
