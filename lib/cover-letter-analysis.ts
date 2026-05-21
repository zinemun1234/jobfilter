// 자소서 텍스트 분석 — 키워드 기반 피드백 (AI 없음, 서버 비용 0원)
//
// 분석 항목 (총 11가지):
//   가중치 있음 (점수에 반영): 분량(10), STAR기법(25), 직군키워드(20), 수치(15), 표현(15), 문장길이(10), 협업(5)
//   가중치 없음 (패널티 표시만): 첫문장, 접속사, 수동태, 추상적표현

export type FeedbackLevel = 'good' | 'warn' | 'bad';

export type FeedbackItem = {
  level: FeedbackLevel;
  category: string;
  message: string;
  suggestion?: string;
  weight?: number; // 점수 가중치
};

// 공허한 다짐 표현
const VAGUE_PHRASES = [
  '최선을 다하겠습니다', '열심히 하겠습니다', '노력하겠습니다',
  '성실하게', '책임감 있게', '열정적으로', '항상 최선',
  '발전하는 인재', '글로벌 인재', '핵심 인재',
];

// 접속사 남용 패턴
const CONJUNCTIONS = ['그리고', '또한', '그래서', '하지만', '그러나', '따라서', '그런데', '그러므로'];

// 수동태 표현
const PASSIVE_PATTERNS = ['되었습니다', '받았습니다', '되어', '받아', '지게 되었', '하게 되었'];

// 추상적 형용사
const ABSTRACT_ADJECTIVES = ['다양한', '여러', '많은', '수많은', '각종', '여러가지', '다수의'];

// 직군별 키워드
const CATEGORY_KEYWORDS: Record<string, { required: string[]; bonus: string[] }> = {
  '개발': {
    required: ['기술', '개발', '코드', '프로젝트', '구현'],
    bonus: ['GitHub', 'git', '테스트', '리뷰', '오픈소스', '알고리즘', '성능', '배포', 'CI/CD'],
  },
  '데이터': {
    required: ['데이터', '분석', 'SQL', 'Python'],
    bonus: ['시각화', '전처리', '모델', '인사이트', 'ETL', '파이프라인', 'Tableau', 'Spark'],
  },
  '사무': {
    required: ['문서', '관리', '업무', '지원'],
    bonus: ['엑셀', 'PPT', '보고서', '일정', '조율', '커뮤니케이션', '정확'],
  },
  'IT기획': {
    required: ['기획', '서비스', '사용자', '요구사항'],
    bonus: ['Figma', 'Notion', 'Jira', 'UX', '데이터', '지표', 'KPI', '로드맵'],
  },
  '보안': {
    required: ['보안', '취약점', '분석'],
    bonus: ['CTF', '침투', '모의해킹', '자격증', '정보보안', '로그', '모니터링'],
  },
  '': {
    required: ['경험', '역량', '직무'],
    bonus: ['성과', '결과', '팀', '프로젝트'],
  },
};

// STAR 기법 패턴
const STAR_PATTERNS = {
  situation: /상황|배경|당시|처음|시작/,
  task: /과제|목표|역할|담당|맡았/,
  action: /했습니다|했고|진행|구현|개발|작성|설계|분석/,
  result: /결과|성과|달성|완료|개선|향상|증가|감소/,
};

// 가중치 정의 (총합 100점)
export const SCORE_WEIGHTS: Record<string, number> = {
  '분량': 10,
  'STAR': 25,
  '직군 키워드': 20,
  '수치': 15,
  '표현': 15,       // 공허한 표현 없음
  '문장 길이': 10,
  '협업': 5,
  // 추가 항목 (보너스/패널티 — 기본 점수에 영향)
  '첫 문장': 0,     // 별도 패널티
  '접속사': 0,
  '수동태': 0,
  '추상적 표현': 0,
};

/**
 * 자소서 텍스트를 분석해 FeedbackItem 배열을 반환한다.
 *
 * @param text - 분석할 자소서 텍스트 (50자 미만이면 빈 배열 반환)
 * @param category - 직군 카테고리 ('개발' | '데이터' | '사무' | 'IT기획' | '보안' | '')
 * @returns FeedbackItem[] — level(good/warn/bad), category, message, suggestion, weight
 */
export function analyzeText(text: string, category: string): FeedbackItem[] {
  if (!text || text.trim().length < 50) return [];

  const feedback: FeedbackItem[] = [];
  const lower = text.toLowerCase();
  const trimmed = text.trim();

  // 1. 글자 수 (가중치 10)
  const len = text.length;
  if (len < 200) {
    feedback.push({
      level: 'warn', category: '분량', weight: 10,
      message: `현재 ${len}자 — 너무 짧습니다`,
      suggestion: '자소서 항목은 보통 500자 이상 작성합니다. 구체적인 경험을 추가하세요.',
    });
  } else if (len > 1500) {
    feedback.push({
      level: 'warn', category: '분량', weight: 10,
      message: `현재 ${len}자 — 너무 깁니다`,
      suggestion: '핵심만 남기고 1000~1200자로 줄이세요. 읽는 사람이 지칩니다.',
    });
  } else {
    feedback.push({ level: 'good', category: '분량', weight: 10, message: `적절한 분량입니다 (${len}자)` });
  }

  // 2. 공허한 표현 (가중치 15)
  const vagueFound = VAGUE_PHRASES.filter(p => text.includes(p));
  if (vagueFound.length > 0) {
    feedback.push({
      level: 'bad', category: '표현', weight: 15,
      message: `공허한 표현 발견: "${vagueFound[0]}"`,
      suggestion: '구체적인 사례로 대체하세요. 예: "최선을 다했습니다" → "3주간 매일 2시간씩 코드 리뷰를 진행했습니다"',
    });
  } else {
    feedback.push({ level: 'good', category: '표현', weight: 15, message: '공허한 다짐 표현 없음 — 구체적으로 잘 작성되었습니다' });
  }

  // 3. 수치/숫자 (가중치 15)
  const hasNumbers = /\d+/.test(text);
  if (hasNumbers) {
    feedback.push({ level: 'good', category: '수치', weight: 15, message: '수치/숫자가 포함되어 있습니다 — 설득력이 높아집니다' });
  } else {
    feedback.push({
      level: 'warn', category: '수치', weight: 15,
      message: '수치/숫자가 없습니다',
      suggestion: '"30% 성능 개선", "3명 팀 리더", "2개월 프로젝트" 등으로 구체화하세요.',
    });
  }

  // 4. STAR 기법 (가중치 25)
  const starScore = Object.values(STAR_PATTERNS).filter(p => p.test(text)).length;
  if (starScore >= 3) {
    feedback.push({ level: 'good', category: 'STAR', weight: 25, message: 'STAR 기법 구조가 잘 갖춰져 있습니다' });
  } else if (starScore >= 2) {
    feedback.push({
      level: 'warn', category: 'STAR', weight: 25,
      message: 'STAR 기법을 더 활용하세요',
      suggestion: '상황(Situation) → 과제(Task) → 행동(Action) → 결과(Result) 순서로 작성하면 좋습니다.',
    });
  } else {
    feedback.push({
      level: 'bad', category: 'STAR', weight: 25,
      message: 'STAR 기법 구조가 부족합니다',
      suggestion: '상황 → 과제 → 행동 → 결과 흐름으로 재구성하세요. 면접관이 가장 선호하는 구조입니다.',
    });
  }

  // 5. 직군별 키워드 (가중치 20)
  const kw = CATEGORY_KEYWORDS[category] ?? CATEGORY_KEYWORDS[''];
  const missingRequired = kw.required.filter(k => !lower.includes(k.toLowerCase()));
  const foundBonus = kw.bonus.filter(k => lower.includes(k.toLowerCase()));

  if (missingRequired.length > 0 && category) {
    feedback.push({
      level: 'warn', category: '직군 키워드', weight: 20,
      message: `${category} 직군 핵심 키워드 부족: ${missingRequired.slice(0, 3).join(', ')}`,
      suggestion: `${category} 직군 지원 시 이 키워드들을 자연스럽게 포함하세요.`,
    });
  } else {
    feedback.push({ level: 'good', category: '직군 키워드', weight: 20, message: '직군 핵심 키워드가 잘 포함되어 있습니다' });
  }
  if (foundBonus.length >= 2) {
    feedback.push({ level: 'good', category: '직군 키워드 심화', weight: 0, message: `직군 관련 키워드 잘 포함됨: ${foundBonus.slice(0, 3).join(', ')}` });
  }

  // 6. 문장 길이 (가중치 10)
  const sentences = text.split(/[.!?。\n]/).filter(s => s.trim().length > 0);
  const longSentences = sentences.filter(s => s.trim().length > 150);
  if (longSentences.length > 0) {
    feedback.push({
      level: 'warn', category: '문장 길이', weight: 10,
      message: `너무 긴 문장 ${longSentences.length}개 발견`,
      suggestion: '한 문장은 80자 이내로 끊어 쓰세요. 긴 문장은 읽기 어렵습니다.',
    });
  } else {
    feedback.push({ level: 'good', category: '문장 길이', weight: 10, message: '문장 길이가 적절합니다' });
  }

  // 7. 협업/팀 경험 (가중치 5)
  const hasTeam = /팀|협업|협력|소통|커뮤니케이션|함께|같이/.test(text);
  if (hasTeam) {
    feedback.push({ level: 'good', category: '협업', weight: 5, message: '협업/팀 경험이 언급되어 있습니다' });
  } else {
    feedback.push({
      level: 'warn', category: '협업', weight: 5,
      message: '협업/팀 경험이 없습니다',
      suggestion: '팀 프로젝트나 협업 경험을 한 문장이라도 추가하면 좋습니다.',
    });
  }

  // ── 추가 분석 항목 (패널티/보너스, weight 0 — 기본 점수에 영향 없음) ──

  // 8. 첫 문장 임팩트 체크
  const firstSentence = trimmed.split(/[.!?\n]/)[0] ?? '';
  if (firstSentence.trimStart().startsWith('저는')) {
    feedback.push({
      level: 'warn', category: '첫 문장', weight: 0,
      message: '"저는"으로 시작하는 첫 문장 — 면접관이 가장 싫어하는 패턴입니다',
      suggestion: '강렬한 경험이나 성과로 시작하세요. 예: "3개월간 혼자 서버를 구축하며..." 또는 "팀 내 유일한 프론트엔드로..."',
    });
  }

  // 9. 접속사 남용 감지
  const conjunctionCounts = CONJUNCTIONS.map(c => ({
    word: c,
    count: (text.match(new RegExp(c, 'g')) ?? []).length,
  })).filter(c => c.count >= 3);

  if (conjunctionCounts.length > 0) {
    const worst = conjunctionCounts.sort((a, b) => b.count - a.count)[0];
    feedback.push({
      level: 'warn', category: '접속사', weight: 0,
      message: `"${worst.word}" 접속사 ${worst.count}회 반복 사용`,
      suggestion: '접속사를 줄이고 문장을 나누거나 다른 연결 표현으로 바꾸세요. 단조로운 글이 됩니다.',
    });
  }

  // 10. 수동태 표현 감지
  const passiveFound = PASSIVE_PATTERNS.filter(p => text.includes(p));
  if (passiveFound.length >= 3) {
    feedback.push({
      level: 'warn', category: '수동태', weight: 0,
      message: `수동태 표현 ${passiveFound.length}개 발견 (${passiveFound.slice(0, 2).join(', ')} 등)`,
      suggestion: '"~되었습니다" → "~했습니다"로 능동적으로 바꾸면 주도성이 드러납니다.',
    });
  }

  // 11. 추상적 형용사 감지
  const abstractFound = ABSTRACT_ADJECTIVES.filter(a => text.includes(a));
  if (abstractFound.length >= 2) {
    feedback.push({
      level: 'warn', category: '추상적 표현', weight: 0,
      message: `추상적 표현 발견: "${abstractFound.slice(0, 2).join('", "')}"`,
      suggestion: '"다양한 경험" → "React, Node.js를 활용한 3개 프로젝트 경험"처럼 구체적으로 바꾸세요.',
    });
  }

  return feedback;
}

/**
 * 가중치 기반 점수를 계산한다 (0~100점).
 *
 * - weight > 0인 항목만 점수에 반영한다.
 * - 같은 카테고리에 여러 항목이 있으면 가장 나쁜 레벨만 반영한다 (중복 방지).
 * - good: 가중치 100% 획득 / warn: 40% 획득 / bad: 0점
 */
export function calculateWeightedScore(feedback: FeedbackItem[]): number {
  let earned = 0;
  let total = 0;

  // 가중치가 있는 항목만 점수 계산
  const weightedItems = feedback.filter(f => (f.weight ?? 0) > 0);

  // 카테고리별로 가장 나쁜 결과만 반영 (중복 방지)
  const byCategory: Record<string, FeedbackItem> = {};
  for (const item of weightedItems) {
    const existing = byCategory[item.category];
    if (!existing) {
      byCategory[item.category] = item;
    } else {
      // 더 나쁜 레벨 우선
      const levelOrder = { bad: 0, warn: 1, good: 2 };
      if (levelOrder[item.level] < levelOrder[existing.level]) {
        byCategory[item.category] = item;
      }
    }
  }

  for (const item of Object.values(byCategory)) {
    const w = item.weight ?? 0;
    total += w;
    if (item.level === 'good') earned += w;
    else if (item.level === 'warn') earned += w * 0.4; // 부분 점수
    // bad = 0점
  }

  return total > 0 ? Math.round((earned / total) * 100) : 0;
}
