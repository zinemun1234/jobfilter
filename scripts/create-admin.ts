/**
 * 어드민 계정 생성 스크립트
 * 실행: npx tsx scripts/create-admin.ts
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@admin.com';
  const password = process.env.ADMIN_PASSWORD ?? 'admin1234!';
  const name = process.env.ADMIN_NAME ?? '관리자';

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // Already exists — just ensure role is ADMIN
    await prisma.user.update({ where: { email }, data: { role: 'ADMIN' } });
    console.log(`✅ 기존 계정 권한을 ADMIN으로 변경: ${email}`);
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      email,
      password: hashed,
      name,
      role: 'ADMIN',
      skills: '[]',
    },
  });

  console.log(`✅ 어드민 계정 생성 완료`);
  console.log(`   이메일: ${email}`);
  console.log(`   비밀번호: ${password}`);
}

main()
  .catch(e => { console.error('❌ 실패:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
