import type { ApplicationStatus } from '@/types';

/**
 * 지원 상태(PREPARING ~ REJECTED)를 dot + text + bg 조합으로 통일.
 * dot: 상태 동그라미 색상, text: 라벨 글자색, bg: 라벨/카드 배경색
 * border/header: Kanban 컬럼 구분선/헤더용
 * hex: 차트 등 CSS-in-JS fill용
 */
export const STATUS_CONFIG: Record<
  ApplicationStatus,
  {
    label: string;
    dot: string;
    text: string;
    bg: string;
    border: string;
    header: string;
    hex: string;
  }
> = {
  PREPARING: {
    label: '서류 준비 중',
    dot: 'bg-slate-400',
    text: 'text-slate-700',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    header: 'bg-slate-100',
    hex: '#94a3b8',
  },
  APPLIED: {
    label: '지원 완료',
    dot: 'bg-blue-500',
    text: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    header: 'bg-blue-100',
    hex: '#3b82f6',
  },
  DOCUMENT_PASS: {
    label: '서류 합격',
    dot: 'bg-emerald-500',
    text: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    header: 'bg-emerald-100',
    hex: '#10b981',
  },
  INTERVIEW: {
    label: '면접 예정',
    dot: 'bg-amber-500',
    text: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    header: 'bg-amber-100',
    hex: '#f59e0b',
  },
  FINAL_PASS: {
    label: '최종 합격',
    dot: 'bg-violet-500',
    text: 'text-violet-700',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    header: 'bg-violet-100',
    hex: '#8b5cf6',
  },
  REJECTED: {
    label: '불합격',
    dot: 'bg-red-400',
    text: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
    header: 'bg-red-100',
    hex: '#f87171',
  },
};

export const STATUS_ORDER: ApplicationStatus[] = [
  'PREPARING',
  'APPLIED',
  'DOCUMENT_PASS',
  'INTERVIEW',
  'FINAL_PASS',
  'REJECTED',
];
