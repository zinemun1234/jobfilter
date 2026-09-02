import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import logger from '@/lib/logger';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@admin.com';
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    logger.error('ADMIN_PASSWORD 환경변수가 필요합니다.');
    process.exit(1);
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    logger.info('어드민 계정이 이미 존재합니다');
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      name: '관리자',
      role: 'ADMIN',
      skills: '[]',
    },
  });

  logger.info('어드민 계정 생성 완료 (이메일/비밀번호는 보안상 로깅하지 않음)');
}

main()
  .catch((e) => { logger.error({ err: e }, '어드민 계정 생성 실패'); process.exit(1); })
  .finally(() => prisma.$disconnect());
