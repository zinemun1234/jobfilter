/**
 * 관리자 계정 생성 스크립트
 *
 * 사용법:
 *   ADMIN_PASSWORD=your-secure-password npx tsx prisma/create-admin.ts
 *
 * 환경변수:
 *   ADMIN_EMAIL    (기본: admin@admin.com)
 *   ADMIN_PASSWORD (필수)
 *   ADMIN_NAME     (기본: 관리자)
 */

import bcrypt from 'bcryptjs';
import logger from '@/lib/logger';
import { prisma } from '../lib/prisma';

const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    ?? 'admin@admin.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_NAME     = process.env.ADMIN_NAME     ?? '관리자';

async function main() {
  logger.info('관리자 계정 설정 시작');

  if (!ADMIN_PASSWORD) {
    logger.error('ADMIN_PASSWORD 환경변수가 필요합니다.');
    process.exit(1);
  }

  const existing = await prisma.user.findUnique({ where: { email: ADMIN_EMAIL } });
  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);

  if (existing) {
    if (existing.role === 'ADMIN') {
      // 비밀번호만 재설정
      await prisma.user.update({
        where: { email: ADMIN_EMAIL },
        data: { password: hashed, name: ADMIN_NAME },
      });
      logger.info('기존 관리자 계정 비밀번호 재설정 완료');
    } else {
      // 일반 유저 → ADMIN 승격
      await prisma.user.update({
        where: { email: ADMIN_EMAIL },
        data: { password: hashed, name: ADMIN_NAME, role: 'ADMIN' },
      });
      logger.info('기존 계정을 관리자로 승격 완료');
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
    logger.info('관리자 계정 신규 생성 완료');
  }

  logger.info('관리자 계정 설정 완료 (이메일/비밀번호는 보안상 로깅하지 않음)');
}

main()
  .catch((e) => {
    logger.error({ err: e }, '관리자 계정 설정 실패');
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
