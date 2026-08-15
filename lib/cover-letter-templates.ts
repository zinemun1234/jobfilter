export type CLItem = { question: string; answer: string };

export type CoverLetterTemplate = {
  label: string;
  items: CLItem[];
};

// 직군/기업유형별 자소서 템플릿
export const COVER_LETTER_TEMPLATES: Record<string, CoverLetterTemplate> = {
  // 개발 직군
  frontend: {
    label: '프론트엔드 개발자',
    items: [
      { question: '지원 동기 및 해당 직무에 관심을 갖게 된 계기를 작성해주세요.', answer: '' },
      { question: '본인이 보유한 프론트엔드 기술 스택과 주요 프로젝트 경험을 서술해주세요.', answer: '' },
      { question: '협업 과정에서 어려움을 극복한 경험을 구체적으로 작성해주세요.', answer: '' },
      { question: '입사 후 3년 내 이루고 싶은 목표를 작성해주세요.', answer: '' },
    ],
  },
  backend: {
    label: '백엔드 개발자',
    items: [
      { question: '지원 동기 및 해당 직무에 관심을 갖게 된 계기를 작성해주세요.', answer: '' },
      { question: '본인이 설계하거나 개발한 서버/API 경험을 구체적으로 서술해주세요.', answer: '' },
      { question: '성능 문제나 장애를 해결한 경험이 있다면 작성해주세요.', answer: '' },
      { question: '입사 후 기여하고 싶은 부분과 성장 계획을 작성해주세요.', answer: '' },
    ],
  },
  fullstack: {
    label: '풀스택 개발자',
    items: [
      { question: '지원 동기 및 풀스택 개발자를 목표로 하게 된 계기를 작성해주세요.', answer: '' },
      { question: '프론트엔드와 백엔드를 모두 담당한 프로젝트 경험을 서술해주세요.', answer: '' },
      { question: '기술적 의사결정을 직접 내린 경험과 그 결과를 작성해주세요.', answer: '' },
      { question: '입사 후 목표와 기여 방향을 작성해주세요.', answer: '' },
    ],
  },
  mobile: {
    label: '모바일 개발자',
    items: [
      { question: '모바일 개발 직무에 지원한 동기를 작성해주세요.', answer: '' },
      { question: 'iOS/Android/크로스플랫폼 개발 경험과 사용 기술을 서술해주세요.', answer: '' },
      { question: '앱 성능 개선이나 사용자 피드백 반영 경험을 작성해주세요.', answer: '' },
      { question: '입사 후 만들고 싶은 서비스나 기여 방향을 작성해주세요.', answer: '' },
    ],
  },
  devops: {
    label: 'DevOps/인프라 엔지니어',
    items: [
      { question: 'DevOps/인프라 직무에 지원한 동기를 작성해주세요.', answer: '' },
      { question: 'CI/CD, 클라우드, 컨테이너 등 실무 경험을 서술해주세요.', answer: '' },
      { question: '운영 중 장애를 예방하거나 해결한 경험을 작성해주세요.', answer: '' },
      { question: '입사 후 개선하고 싶은 개발/운영 프로세스를 작성해주세요.', answer: '' },
    ],
  },
  data: {
    label: '데이터 엔지니어/분석가',
    items: [
      { question: '데이터 직무에 지원하는 동기를 작성해주세요.', answer: '' },
      { question: '데이터 수집·처리·분석 경험을 구체적으로 서술해주세요.', answer: '' },
      { question: '데이터를 활용해 문제를 해결한 사례를 작성해주세요.', answer: '' },
      { question: '입사 후 데이터 관련 기여 계획을 작성해주세요.', answer: '' },
    ],
  },
  ai: {
    label: 'AI/ML 엔지니어',
    items: [
      { question: 'AI/ML 직무에 지원한 동기와 관심 분야를 작성해주세요.', answer: '' },
      { question: '학습/배포한 모델과 사용한 프레임워크/라이브러리를 서술해주세요.', answer: '' },
      { question: '데이터 가공, 실험, 평가 과정에서 어려움을 극복한 경험을 작성해주세요.', answer: '' },
      { question: '입사 후 AI/ML로 해결하고 싶은 문제를 작성해주세요.', answer: '' },
    ],
  },
  security: {
    label: '보안 엔지니어',
    items: [
      { question: '보안 직무에 지원한 동기와 관심 분야를 작성해주세요.', answer: '' },
      { question: '보안 관련 공부, 프로젝트, 대회(CCTF/CTF) 경험을 서술해주세요.', answer: '' },
      { question: '취약점 분석이나 대응 경험이 있다면 작성해주세요.', answer: '' },
      { question: '입사 후 보안 역량을 어떻게 기여할 계획인지 작성해주세요.', answer: '' },
    ],
  },
  pm: {
    label: 'IT 기획/PM',
    items: [
      { question: 'IT 기획 또는 PM 직무에 지원하는 동기를 작성해주세요.', answer: '' },
      { question: '서비스 기획 또는 프로젝트 관리 경험을 구체적으로 서술해주세요.', answer: '' },
      { question: '이해관계자와 소통하며 문제를 해결한 경험을 작성해주세요.', answer: '' },
      { question: '입사 후 기여하고 싶은 서비스나 방향을 작성해주세요.', answer: '' },
    ],
  },
  qa: {
    label: 'QA/테스트 엔지니어',
    items: [
      { question: 'QA 직무에 지원한 동기를 작성해주세요.', answer: '' },
      { question: '수동/자동 테스트 경험과 사용한 도구를 서술해주세요.', answer: '' },
      { question: '품질 향상을 위해 주도한 개선 사례를 작성해주세요.', answer: '' },
      { question: '입사 후 테스트 프로세스에서 기여하고 싶은 부분을 작성해주세요.', answer: '' },
    ],
  },

  // 기업 유형별
  startup: {
    label: '스타트업',
    items: [
      { question: '스타트업에 지원한 동기와 기대하는 역할을 작성해주세요.', answer: '' },
      { question: '빠른 실행과 다양한 업무를 동시에 처리할 수 있는 근거를 서술해주세요.', answer: '' },
      { question: '제한된 자원에서 문제를 해결한 경험을 작성해주세요.', answer: '' },
      { question: '입사 후 1년 내 기여할 수 있는 부분을 구체적으로 작성해주세요.', answer: '' },
    ],
  },
  enterprise: {
    label: '대기업/중견기업',
    items: [
      { question: '해당 기업에 지원한 동기와 매력 포인트를 작성해주세요.', answer: '' },
      { question: '대규모 프로젝트나 체계적인 프로세스 경험을 서술해주세요.', answer: '' },
      { question: '팀 내 역할과 협업 방식에 대한 본인의 강점을 작성해주세요.', answer: '' },
      { question: '입사 후 장기적으로 성장하고 싶은 방향을 작성해주세요.', answer: '' },
    ],
  },

  // 신입/공통
  intern: {
    label: '신입/인턴 공통',
    items: [
      { question: '지원 동기와 입사 후 기대하는 점을 작성해주세요.', answer: '' },
      { question: '학교 수업/프로젝트/대외활동에서 쌓은 역량을 서술해주세요.', answer: '' },
      { question: '배움의 기회가 많은 상황에서 성실함을 보인 경험을 작성해주세요.', answer: '' },
      { question: '입사 후 1~3년 성장 목표를 작성해주세요.', answer: '' },
    ],
  },
  general: {
    label: '공통 (직군 무관)',
    items: [
      { question: '지원 동기를 작성해주세요.', answer: '' },
      { question: '본인의 강점과 관련 경험을 서술해주세요.', answer: '' },
      { question: '어려운 상황을 극복한 경험을 작성해주세요.', answer: '' },
      { question: '입사 후 목표를 작성해주세요.', answer: '' },
    ],
  },
};

// 템플릿 검색/자동완성용 헬퍼
export function searchTemplates(keyword: string): [string, CoverLetterTemplate][] {
  const lower = keyword.toLowerCase();
  return Object.entries(COVER_LETTER_TEMPLATES).filter(([, tpl]) =>
    tpl.label.toLowerCase().includes(lower)
  );
}
