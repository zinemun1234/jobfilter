/**
 * Next.js 미들웨어 — 라우트 접근 제어
 *
 * 1. 공개 API 제외한 모든 /api/* 요청 → 유효한 JWT 필요
 * 2. /api/admin/* → ADMIN
 * 3. /api/recruiter/* → RECRUITER
 * 4. 페이지 요청은 기존 redirect 로직 유지
 */
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

function isPublicApi(pathname: string): boolean {
  return (
    pathname.startsWith('/api/auth/') ||
    pathname === '/api/listings/public' ||
    pathname.startsWith('/api/uploads/')
  );
}

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // API 요청 기본 인증
  if (pathname.startsWith('/api/')) {
    if (isPublicApi(pathname)) {
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.json(
        { error: '인증이 필요합니다.', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // /api/admin/* → ADMIN
    if (pathname.startsWith('/api/admin/') && token.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '접근 권한이 없습니다.', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    // /api/recruiter/* → RECRUITER
    if (pathname.startsWith('/api/recruiter/') && token.role !== 'RECRUITER') {
      return NextResponse.json(
        { error: '접근 권한이 없습니다.', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    return NextResponse.next();
  }

  // 비로그인 → 로그인 페이지로
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 관리자 전용 경로 — ADMIN 역할이 아니면 대시보드로
  if (pathname.startsWith('/admin') && token.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 리크루터 전용 경로 — RECRUITER 역할이 아니면 대시보드로
  if (pathname.startsWith('/recruiter') && token.role !== 'RECRUITER') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// 미들웨어가 실행될 경로 목록 (공개 페이지는 제외)
export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
    '/portfolio/:path*',
    '/jobs/:path*',
    '/roadmap/:path*',
    '/interview/:path*',
    '/profile/:path*',
    '/calendar/:path*',
    '/admin/:path*',
    '/recruiter/:path*',
  ],
};
