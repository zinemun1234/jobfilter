/**
 * Tailwind CSS 클래스 병합 유틸
 *
 * clsx로 조건부 클래스를 처리하고, tailwind-merge로 충돌하는 Tailwind 클래스를 제거한다.
 * 예: cn('px-2 px-4') → 'px-4' (마지막 값 우선)
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
