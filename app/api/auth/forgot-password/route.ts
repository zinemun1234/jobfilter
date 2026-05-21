import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: '?´ë©”?¼ì„ ?…ë ¥?´ì£¼?¸ìš”.' }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    // ë³´ì•ˆ???¬ìš©??ì¡´ì¬ ?¬ë? ?¸ì¶œ ????
    if (!user) {
      return NextResponse.json({ message: '?´ë©”?¼ì´ ?„ì†¡?˜ì—ˆ?µë‹ˆ??' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1?œê°„

    // ê¸°ì¡´ ? í° ë¬´íš¨??+ ??? í° ?ì„± (raw SQL ??Prisma ìºì‹œ ?´ìŠˆ ?°íšŒ)
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
    console.log(`[ë¹„ë?ë²ˆí˜¸ ?¬ì„¤??ë§í¬] ${resetUrl}`);

    return NextResponse.json({
      message: '?´ë©”?¼ì´ ?„ì†¡?˜ì—ˆ?µë‹ˆ??',
      devToken: process.env.NODE_ENV === 'development' ? token : undefined,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '?œë²„ ?¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤.' }, { status: 500 });
  }
}
