/**
 * Next.js 미들웨어 — 라우트 접근 제어
 *
 * 보호된 경로에 대해 두 가지 체크를 수행한다:
 * 1. 비로그인 → /login 리다이렉트
 * 2. /admin/* 경로 → ADMIN 역할이 아니면 /dashboard 리다이렉트
 *
 * matcher에 등록된 경로에만 실행된다 (공개 페이지 제외).
 */
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // 비로그인 → 로그인 페이지로
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 관리자 전용 경로 — ADMIN 역할이 아니면 대시보드로
  if (pathname.startsWith('/admin') && token.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// 미들웨어가 실행될 경로 목록 (공개 페이지 / API 경로는 제외)
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/portfolio/:path*',
    '/jobs/:path*',
    '/roadmap/:path*',
    '/interview/:path*',
    '/profile/:path*',
    '/calendar/:path*',
    '/admin/:path*',
  ],
};
