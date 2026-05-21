/**
 * API 에러 처리 유틸
 *
 * AppError: 에러 코드와 HTTP 상태코드를 함께 가지는 커스텀 에러 클래스
 * handleApiError: API Route의 catch 블록에서 사용하는 에러 핸들러
 *   - AppError면 코드에 맞는 상태코드로 응답
 *   - 그 외 예상치 못한 에러는 500으로 응답
 */
import { NextResponse } from 'next/server';

// Error code constants
export const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  BAD_REQUEST: 'BAD_REQUEST',
  CONFLICT: 'CONFLICT',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

const STATUS_MAP: Record<ErrorCode, number> = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
};

export class AppError extends Error {
  code: ErrorCode;
  statusCode: number;

  constructor(message: string, code: ErrorCode) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = STATUS_MAP[code];
  }
}

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.statusCode }
    );
  }

  console.error('Unhandled API error:', error);
  return NextResponse.json(
    { error: '서버 오류가 발생했습니다.', code: ERROR_CODES.INTERNAL_ERROR },
    { status: 500 }
  );
}
