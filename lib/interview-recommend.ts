/**
 * 지원 공고, 포트폴리오, 자소서, 보유 기술을 기반으로
 * 규칙 기반 면접 질문을 추천한다.
 *
 * - AI 사용 안 함
 * - 키워드 매칭으로 jobType(frontend/backend/data/ai/보안/기획) 결정
 * - 포트폴리오/자소서에서 언급된 기술 스택별 질문 생성
 */

import { INTERVIEW_QUESTION_TEMPLATES } from './interview-questions';
import type { QuestionCategory } from '@/types';

export type RecommendInput = {
  position: string;
  tags?: string[];
  skills?: string[];
  portfolios?: { title: string; techStack: string[] }[];
  coverLetters?: { items: { answer: string }[] }[];
};

type QuestionGroup = {
  category: QuestionCategory;
  jobType?: string;
  question: string;
};

// 직무별 질문 후보군
const JOB_TYPE_PATTERNS: Record<string, string[]> = {
  frontend: ['프론트', 'front', 'react', 'vue', 'angular'],
  backend: ['백엔드', 'back', '서버', 'spring', 'node', 'django', 'api'],
  data: ['데이터', 'data', 'ai', 'ml', '머신러닝', '딥러닝', '분석'],
  security: ['보안', 'security', '해킹', '정보보안'],
  planning: ['기획', 'pm', 'product', 'ux'],
  mobile: ['모바일', 'mobile', 'ios', 'android', 'flutter', 'react native'],
  devops: ['devops', '인프라', '클라우드', 'aws', 'docker', 'kubernetes'],
  common: [],
};

// 기술별 질문 맵
const SKILL_QUESTIONS: Record<string, string[]> = {
  react: ['React의 Virtual DOM과 렌더링 최적화에 대해 설명해주세요.'],
  next: ['Next.js의 SSR/SSG/ISR 차이점과 사용 사례를 설명해주세요.'],
  typescript: ['TypeScript의 타입 시스템 장점과 사용 경험을 말씀해주세요.'],
  javascript: ['JavaScript의 이벤트 루프와 비동기 처리에 대해 설명해주세요.'],
  vue: ['Vue.js의 반응형 시스템에 대해 설명해주세요.'],
  tailwind: ['Tailwind CSS를 사용한 디자인 시스템 경험이 있다면 말씀해주세요.'],
  java: ['Java의 메모리 관리와 GC에 대해 설명해주세요.'],
  spring: ['Spring DI/AOP의 개념과 사용 경험을 설명해주세요.'],
  node: ['Node.js의 이벤트 루프와 non-blocking I/O에 대해 설명해주세요.'],
  python: ['Python의 GIL과 비동기 처리에 대해 설명해주세요.'],
  django: ['Django의 MTV 패턴과 ORM 사용 경험을 설명해주세요.'],
  sql: ['SQL 인덱스와 조인 최적화에 대해 설명해주세요.'],
  docker: ['Docker 컨테이너화 경험과 주의할 점을 설명해주세요.'],
  aws: ['AWS에서 실제 사용한 서비스와 아키텍처를 설명해주세요.'],
  kubernetes: ['Kubernetes를 사용한 배포/운영 경험이 있다면 말씀해주세요.'],
  git: ['Git 브랜칭 전략과 충돌 해결 경험을 설명해주세요.'],
  tensorflow: ['TensorFlow 모델 학습/배포 경험에 대해 설명해주세요.'],
  pytorch: ['PyTorch로 모델을 구현한 경험과 장점을 말씀해주세요.'],
  linux: ['Linux 환경에서 개발/배포한 경험을 설명해주세요.'],
  mongodb: ['MongoDB와 RDBMS의 차이점, 사용 사례를 설명해주세요.'],
  redis: ['Redis 캐싱 전략과 사용 경험을 설명해주세요.'],
};

// 직무 공통 질문
const COMMON_QUESTIONS: Record<string, string[]> = {
  frontend: [
    '브라우저 렌더링 과정과 성능 최적화 방법을 설명해주세요.',
    'CSS Box Model과 Flexbox/Grid 레이아웃 경험을 말씀해주세요.',
  ],
  backend: [
    'RESTful API 설계 원칙과 실제 적용 사례를 설명해주세요.',
    '데이터베이스 트랜잭션과 동시성 제어에 대해 설명해주세요.',
  ],
  data: [
    '데이터 전처리와 모델 평가 지표 선택 기준을 설명해주세요.',
    '대용량 데이터 처리 경험이 있다면 말씀해주세요.',
  ],
  security: [
    'OWASP Top 10 중 경험한 보안 취약점과 대응 방법을 설명해주세요.',
    '암호화와 인증/인가 구현 경험을 말씀해주세요.',
  ],
  planning: [
    '프로젝트 우선순위를 정하고 일정을 관리한 경험을 설명해주세요.',
    '기획안을 개발자와 효과적으로 소통한 사례를 말씀해주세요.',
  ],
  mobile: [
    '모바일 앱 성능 최적화와 상태 관리 경험을 설명해주세요.',
    '네이티브와 크로스 플랫폼 개발의 장단점을 비교해주세요.',
  ],
  devops: [
    'CI/CD 파이프라인 구축 경험과 효과를 설명해주세요.',
    'AWS/GCP/Kubernetes 중 실제 운영한 인프라 사례를 말씀해주세요.',
  ],
  common: [
    '객체 지향 프로그래밍의 4가지 원칙에 대해 설명해주세요.',
    '본인의 강점과 약점, 개선 노력에 대해 말씀해주세요.',
  ],
};

function detectJobType(position: string, tags?: string[]): string {
  const text = `${position} ${(tags ?? []).join(' ')}`.toLowerCase();
  for (const [type, patterns] of Object.entries(JOB_TYPE_PATTERNS)) {
    if (type === 'common') continue;
    if (patterns.some((p) => text.includes(p))) return type;
  }
  return 'common';
}

function extractTechKeywords(input: RecommendInput): string[] {
  const keywords = new Set<string>();

  const push = (value: string) => {
    const normalized = value.toLowerCase().replace(/[^a-z가-힣0-9]/g, '');
    if (SKILL_QUESTIONS[normalized]) keywords.add(normalized);
    // 원문 토큰도 확인
    if (SKILL_QUESTIONS[value.toLowerCase()]) keywords.add(value.toLowerCase());
  };

  input.skills?.forEach(push);

  for (const portfolio of input.portfolios ?? []) {
    for (const tech of portfolio.techStack) push(tech);
    // 프로젝트 제목에서 키워드 추출
    const titleTokens = portfolio.title.toLowerCase().split(/\s+|[,\/]+/);
    for (const token of titleTokens) if (SKILL_QUESTIONS[token]) keywords.add(token);
  }

  for (const cl of input.coverLetters ?? []) {
    for (const item of cl.items) {
      const tokens = item.answer.toLowerCase().split(/\s+|[,\/\(\)]+/);
      for (const token of tokens) if (SKILL_QUESTIONS[token]) keywords.add(token);
    }
  }

  return Array.from(keywords);
}

function dedupe(questions: QuestionGroup[]): QuestionGroup[] {
  const seen = new Set<string>();
  return questions.filter((q) => {
    if (seen.has(q.question)) return false;
    seen.add(q.question);
    return true;
  });
}

export function recommendQuestions(input: RecommendInput): QuestionGroup[] {
  const jobType = detectJobType(input.position, input.tags);
  const result: QuestionGroup[] = [];

  // 1. 템플릿에서 직무/공통 질문 선택
  const templates = INTERVIEW_QUESTION_TEMPLATES.filter((q) => {
    if (q.jobType && q.jobType !== jobType && q.jobType !== 'common') return false;
    if (!q.jobType || q.jobType === 'common') return true;
    return q.jobType === jobType;
  });
  result.push(...templates.map((t) => ({ ...t, jobType: t.jobType ?? jobType })));

  // 2. 직무 공통 질문
  result.push(
    ...(COMMON_QUESTIONS[jobType] ?? COMMON_QUESTIONS.common).map((q) => ({
      category: 'TECHNICAL' as QuestionCategory,
      jobType,
      question: q,
    }))
  );

  // 3. 기술 스택별 질문
  const techs = extractTechKeywords(input);
  for (const tech of techs) {
    const questions = SKILL_QUESTIONS[tech] ?? [`${tech}에 대해 설명하고 실제 사용 경험을 말씀해주세요.`];
    for (const q of questions) {
      result.push({ category: 'TECHNICAL', jobType, question: q });
    }
  }

  // 4. 지원 동기 질문
  result.push({
    category: 'PERSONALITY',
    jobType,
    question: `${input.position} 직무에 지원한 동기와 기여 가능한 부분을 설명해주세요.`,
  });

  return dedupe(result).slice(0, 20);
}
