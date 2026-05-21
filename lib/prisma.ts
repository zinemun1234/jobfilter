/**
 * Prisma 클라이언트 싱글톤
 *
 * Next.js 개발 환경에서는 핫리로드 시마다 새 PrismaClient 인스턴스가 생성되어
 * DB 커넥션이 폭발적으로 늘어나는 문제가 있다.
 * globalThis에 인스턴스를 캐싱해서 개발/프로덕션 모두 단일 인스턴스를 유지한다.
 */
import { PrismaClient } from '@/lib/generated/prisma'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // 개발 환경에서만 쿼리 로그 출력 (프로덕션에서는 에러만)
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

// 프로덕션에서는 globalThis에 저장하지 않음 (매 요청마다 새 인스턴스 허용)
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
