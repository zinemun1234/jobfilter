import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const { email, password, name, companyName, companyDesc } = await req.json();

  if (!email || !password || !name || !companyName) {
    return NextResponse.json({ error: '?´ë©”?? ë¹„ë?ë²ˆí˜¸, ?´ë‹¹?ëª…, ê¸°ì—…ëª…ì? ?„ìˆ˜?…ë‹ˆ?? }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: '?´ë? ?¬ìš© ì¤‘ì¸ ?´ë©”?¼ì…?ˆë‹¤' }, { status: 409 });

  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      name,
      companyName,
      companyDesc: companyDesc || null,
      role: 'RECRUITER',
      skills: '[]',
      isApproved: false, // ê´€ë¦¬ì ?¹ì¸ ???œì„±??
    },
  });

  return NextResponse.json({
    data: { id: user.id, email: user.email, companyName: user.companyName },
  }, { status: 201 });
}
