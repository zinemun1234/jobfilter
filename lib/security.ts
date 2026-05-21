/**
 * 보안 유틸 모음
 *
 * - requireAuth / authenticateAndGetUserId: 인증 검증
 * - validateUserAccess: 리소스 소유자 확인
 * - escapeHtml: XSS 방지용 HTML 이스케이프
 * - validateOrigin: CSRF 방지용 Origin 검증
 * - SimpleRateLimiter: 메모리 기반 Rate Limiter (프로덕션에서는 Redis 권장)
 * - rateLimiters: auth(15분 5회), default(15분 100회) 인스턴스
 * - checkRateLimit: Rate Limit 체크 헬퍼
 * - maskSensitiveData: 민감정보 마스킹
 * - validators: email/password/githubUrl/url 유효성 검사
 * - getSecurityHeaders: 보안 HTTP 헤더 생성
 */
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

/**
 * 인증된 사용자의 ID를 가져옵니다.
 * 인증되지 않은 경우 401 에러를 반환합니다.
 */
export async function requireAuth(): Promise<string> {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }
  
  return session.user.id;
}

/**
 * API Route 미들웨어: 인증 검증 및 사용자 ID 반환
 */
export async function authenticateAndGetUserId(): Promise<string> {
  try {
    return await requireAuth();
  } catch (error) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 }) as any;
  }
}

/**
 * 사용자 데이터 접근 권한 검증
 * @param resourceUserId 리소스 소유자의 userId
 * @param currentUserId 현재 로그인한 사용자의 userId
 */
export function validateUserAccess(resourceUserId: string, currentUserId: string): boolean {
  return resourceUserId === currentUserId;
}

/**
 * XSS 방지를 위한 HTML 이스케이프
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * CSRF 방지를 위한 Origin 검증
 */
export function validateOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  
  if (!origin || !host) return false;
  
  try {
    const originUrl = new URL(origin);
    return originUrl.hostname === host;
  } catch {
    return false;
  }
}

/**
 * Rate limiting을 위한 간단한 메모리 저장소
 * (실제 프로덕션에서는 Redis 등을 사용해야 합니다)
 */
class SimpleRateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  constructor(private maxRequests: number, private windowMs: number) {}
  
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    const requests = this.requests.get(identifier) || [];
    const validRequests = requests.filter(timestamp => timestamp > windowStart);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    
    return true;
  }
}

// API별 rate limiter 인스턴스
export const rateLimiters = {
  auth: new SimpleRateLimiter(5, 15 * 60 * 1000), // 15분에 5번
  default: new SimpleRateLimiter(100, 15 * 60 * 1000), // 15분에 100번
};

/**
 * Rate limiting 미들웨어
 */
export function checkRateLimit(
  identifier: string,
  limiter: SimpleRateLimiter = rateLimiters.default
): { allowed: boolean; resetTime?: number } {
  const allowed = limiter.isAllowed(identifier);
  
  return {
    allowed,
    resetTime: allowed ? undefined : Date.now() + 15 * 60 * 1000,
  };
}

/**
 * 민감정보 마스킹
 */
export function maskSensitiveData(data: string, visibleChars = 4): string {
  if (data.length <= visibleChars) {
    return '*'.repeat(data.length);
  }
  
  const visible = data.slice(0, visibleChars);
  const masked = '*'.repeat(data.length - visibleChars);
  
  return visible + masked;
}

/**
 * 입력값 검증 유틸리티
 */
export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  password: (password: string): boolean => {
    // 최소 8자, 영문+숫자 조합
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  },
  
  githubUrl: (url: string): boolean => {
    const githubRegex = /^https:\/\/github\.com\/[^\/]+\/[^\/]+$/;
    return githubRegex.test(url);
  },
  
  url: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
};

/**
 * 보안 헤더 생성
 */
export function getSecurityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };
}
