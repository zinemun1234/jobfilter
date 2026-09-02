/**
 * 어드민 계정 생성 스크립트
 * 실행: ADMIN_PASSWORD=your-secure-password npx tsx scripts/create-admin.ts
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import logger from '@/lib/logger';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@admin.com';
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME ?? '관리자';

  if (!password) {
    logger.error('ADMIN_PASSWORD 환경변수가 필요합니다.');
    process.exit(1);
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // Already exists — just ensure role is ADMIN
    await prisma.user.update({ where: { email }, data: { role: 'ADMIN' } });
    logger.info('기존 계정 권한을 ADMIN으로 변경');
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

  logger.info('어드민 계정 생성 완료 (이메일/비밀번호는 보안상 로깅하지 않음)');
}

main()
  .catch(e => { logger.error({ err: e }, '어드민 계정 생성 실패'); process.exit(1); })
  .finally(() => prisma.$disconnect());
