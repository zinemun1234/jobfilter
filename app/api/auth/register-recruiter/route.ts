import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const { email, password, name, companyName, companyDesc } = await req.json();

  if (!email || !password || !name || !companyName) {
    return NextResponse.json({ error: '이메일, 비밀번호, 담당자명, 기업명은 필수입니다.' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: '이미 사용 중인 이메일입니다.' }, { status: 409 });

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
      isApproved: false, // 관리자 확인 후 활성화
    },
  });

  return NextResponse.json({
    data: { id: user.id, email: user.email, companyName: user.companyName },
  }, { status: 201 });
}
