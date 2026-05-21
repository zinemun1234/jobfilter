import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();
    if (!token || !password) {
      return NextResponse.json({ error: '? í°ê³?ë¹„ë?ë²ˆí˜¸ë¥??…ë ¥?´ì£¼?¸ìš”.' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'ë¹„ë?ë²ˆí˜¸??8???´ìƒ?´ì–´???©ë‹ˆ??' }, { status: 400 });
    }

    // raw SQL ??Prisma ìºì‹œ ?´ìŠˆ ?°íšŒ
    const rows = await prisma.$queryRawUnsafe<{ id: string; email: string; expiresAt: string; used: number }[]>(
      `SELECT id, email, expiresAt, used FROM PasswordResetToken WHERE token = ? LIMIT 1`,
      token
    );

    const resetToken = rows[0];
    if (!resetToken || resetToken.used === 1 || new Date() > new Date(resetToken.expiresAt)) {
      return NextResponse.json({ error: '? íš¨?˜ì? ?Šê±°??ë§Œë£Œ??? í°?…ë‹ˆ??' }, { status: 400 });
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

    return NextResponse.json({ message: 'ë¹„ë?ë²ˆí˜¸ê°€ ë³€ê²½ë˜?ˆìŠµ?ˆë‹¤.' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '?œë²„ ?¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤.' }, { status: 500 });
  }
}
