/**
 * JSON 문자열 파싱 공통 유틸
 *
 * Prisma PostgreSQL에서 JSON 필드가 문자열로 저장되는 경우가 많아
 * 중복되던 JSON.parse/stringify를 통일한다.
 */

export function safeJsonParse<T>(value: string | null | undefined, fallback: T): T {
  if (value == null || value === '') return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function parseJsonArray(value: string | null | undefined): string[] {
  const parsed = safeJsonParse<unknown>(value, null);
  if (!Array.isArray(parsed)) return [];
  return parsed.filter((item): item is string => typeof item === 'string');
}

export function stringifyJson<T>(value: T | null | undefined): string | null {
  if (value == null) return null;
  return JSON.stringify(value);
}
