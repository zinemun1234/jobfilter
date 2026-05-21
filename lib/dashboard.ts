/**
 * 대시보드 유틸 함수
 *
 * 순수 함수로만 구성되어 있어 테스트가 쉽고 DB 의존성이 없다.
 * 대시보드 페이지와 관련 컴포넌트에서 공통으로 사용한다.
 */
import type { ApplicationStatus, JobPosting, SkillStatus } from '@/types';

// 지원 현황 집계 시 모든 상태가 결과에 포함되도록 초기값 설정
const ALL_STATUSES: ApplicationStatus[] = [
  'PREPARING',
  'APPLIED',
  'DOCUMENT_PASS',
  'INTERVIEW',
  'FINAL_PASS',
  'REJECTED',
];

/**
 * 지원 공고 목록을 ApplicationStatus별로 카운트한다.
 * 해당 상태의 공고가 없어도 0으로 포함된다.
 */
export function aggregateByStatus(
  postings: JobPosting[]
): Record<ApplicationStatus, number> {
  const counts = Object.fromEntries(
    ALL_STATUSES.map((s) => [s, 0])
  ) as Record<ApplicationStatus, number>;

  for (const posting of postings) {
    counts[posting.status] += 1;
  }

  return counts;
}

/**
 * 로드맵 항목 중 COMPLETED 비율을 0~100 정수로 반환한다.
 * 항목이 없으면 0을 반환한다.
 */
export function calculateRoadmapProgress(
  items: { status: SkillStatus }[]
): number {
  if (items.length === 0) return 0;
  const completed = items.filter((i) => i.status === 'COMPLETED').length;
  return Math.round((completed / items.length) * 100);
}

/**
 * 마감일이 [현재, 현재 + days일] 범위 안에 있는 공고만 반환한다.
 * 마감일이 없는 공고는 제외된다.
 */
export function filterUrgentDeadlines(
  postings: JobPosting[],
  days: number
): JobPosting[] {
  const now = new Date();
  const cutoff = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  return postings.filter((p) => {
    if (!p.deadline) return false;
    const deadline = new Date(p.deadline);
    return deadline >= now && deadline <= cutoff;
  });
}

/**
 * 마감일이 현재 시각보다 이전이면 true를 반환한다.
 * deadline이 null이면 false를 반환한다.
 */
export function isExpired(deadline: Date | null): boolean {
  if (!deadline) return false;
  return new Date(deadline) < new Date();
}
