/**
 * 관리자 계정 생성 스크립트
 *
 * 사용법:
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/create-admin.ts
 *   또는
 *   npx tsx prisma/create-admin.ts
 *
 * 환경변수로 커스텀 가능:
 *   ADMIN_EMAIL=my@email.com ADMIN_PASSWORD=mypassword npx tsx prisma/create-admin.ts
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    ?? 'admin@admin.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin1234!';
const ADMIN_NAME     = process.env.ADMIN_NAME     ?? '관리자';

async function main() {
  console.log(`\n🔑 관리자 계정 설정: ${ADMIN_EMAIL}\n`);

  const existing = await prisma.user.findUnique({ where: { email: ADMIN_EMAIL } });
  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);

  if (existing) {
    if (existing.role === 'ADMIN') {
      // 비밀번호만 재설정
      await prisma.user.update({
        where: { email: ADMIN_EMAIL },
        data: { password: hashed, name: ADMIN_NAME },
      });
      console.log('✅ 기존 관리자 계정 비밀번호 재설정 완료');
    } else {
      // 일반 유저 → ADMIN 승격
      await prisma.user.update({
        where: { email: ADMIN_EMAIL },
        data: { password: hashed, name: ADMIN_NAME, role: 'ADMIN' },
      });
      console.log('✅ 기존 계정을 관리자로 승격 완료');
    }
  } else {
    await prisma.user.create({
      data: {
        email: ADMIN_EMAIL,
        password: hashed,
        name: ADMIN_NAME,
        role: 'ADMIN',
        skills: '[]',
      },
    });
    console.log('✅ 관리자 계정 신규 생성 완료');
  }

  console.log(`\n  이메일  : ${ADMIN_EMAIL}`);
  console.log(`  비밀번호: ${ADMIN_PASSWORD}`);
  console.log(`  권한    : ADMIN\n`);
}

main()
  .catch((e) => {
    console.error('❌ 실패:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
