/**
 * API 공통 응답 헬퍼 및 인증 유틸
 *
 * 모든 API Route에서 일관된 응답 형식을 사용하기 위한 헬퍼 함수 모음.
 * - successResponse: { data } 형태의 성공 응답
 * - errorResponse: { error, code } 형태의 에러 응답
 * - unauthorized/forbidden/notFound/badRequest/conflict/internalError: 단축 헬퍼
 * - getAuthSession: 세션에서 userId 추출 (미인증 시 AppError throw)
 */
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AppError, ERROR_CODES } from '@/lib/errors';

// 공통 응답 타입
export type ApiResponse<T> = {
  data: T;
  error?: string;
};

// 공통 에러 응답
export type ApiError = {
  error: string;
  code: string;
};

// Success response
export function successResponse<T>(data: T, status = 200): NextResponse {
  return NextResponse.json({ data }, { status });
}

// Generic error response
export function errorResponse(
  message: string,
  code: string,
  status: number
): NextResponse {
  return NextResponse.json({ error: message, code }, { status });
}

// Helper shortcuts
export function unauthorized(message = '인증이 필요합니다.'): NextResponse {
  return errorResponse(message, ERROR_CODES.UNAUTHORIZED, 401);
}

export function forbidden(message = '접근 권한이 없습니다.'): NextResponse {
  return errorResponse(message, ERROR_CODES.FORBIDDEN, 403);
}

export function notFound(message = '리소스를 찾을 수 없습니다.'): NextResponse {
  return errorResponse(message, ERROR_CODES.NOT_FOUND, 404);
}

export function badRequest(message: string): NextResponse {
  return errorResponse(message, ERROR_CODES.BAD_REQUEST, 400);
}

export function conflict(message: string): NextResponse {
  return errorResponse(message, ERROR_CODES.CONFLICT, 409);
}

export function internalError(
  message = '서버 오류가 발생했습니다.'
): NextResponse {
  return errorResponse(message, ERROR_CODES.INTERNAL_ERROR, 500);
}

// Get authenticated session and return userId, or throw AppError
export async function getAuthSession(): Promise<string> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new AppError('인증이 필요합니다.', ERROR_CODES.UNAUTHORIZED);
  }

  return session.user.id;
}
