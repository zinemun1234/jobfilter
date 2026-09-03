/**
 * 학과/전공 분류 기준
 *
 * 각 전공 별로 공고 제목/내용/직무에서 매칭할 키워드를 정의.
 * 분류 로직은 대소문자 무시, 키워드 포함 여부로 점수를 계산해 가장 높은 점수의 전공을 선택.
 *
 * DB의 Keyword 테이블(category='major')을 우선 조회하고,
 * 비어 있으면 하드코딩 MAJOR_KEYWORDS를 fallback으로 사용합니다.
 */

import { listKeywords, countKeywords } from './keyword-service';

export type MajorCategory = string;

export const MAJOR_KEYWORDS = {
  '컴퓨터공학': [
    '개발', 'developer', 'programmer', 'software', '소프트웨어', '프로그램',
    '프로그래머', '웹', '앱', 'app', '모바일', 'mobile', 'ios', 'android',
    '백엔드', 'backend', '프론트엔드', 'frontend', '풀스택', 'fullstack',
    'devops', '데이터', 'data', 'ai', '인공지능', '머신러닝', '딥러닝',
    '클라우드', 'cloud', '보안', 'security', '네트워크', 'network', 'it',
    'db', '데이터베이스', 'database', '사무', 'qa', '테스터', 'tester',
    '기획', 'ui', 'ux', 'ui/ux', 'blockchain', '블록체인',
  ],
  '소프트웨어공학': [
    '소프트웨어', 'software', '개발', 'developer', 'swe',
    '프로그램', '프로그래머', '앱', 'app', '웹', 'web', '모바일', 'mobile',
    '백엔드', 'backend', '프론트엔드', 'frontend', 'devops', 'qa', '테스트',
  ],
  '정보통신': [
    '네트워크', '통신', '정보통신', '5g', 'lte', '통신망', 'it', '인프라',
    '서버', '보안', 'security', 'cs', '전산', '네트워크엔지니어',
  ],
  '전자공학': [
    '전자', '반도체', '회로', 'fpga', 'asic', '로봇', 'robot', 'iot',
    '하드웨어', 'hardware', '펌웨어', 'firmware', 'emc', 'pcb',
  ],
  '인공지능': [
    'ai', '인공지능', 'artificial intelligence', '머신러닝', 'machine learning',
    '딥러닝', 'deep learning', 'llm', '데이터사이언스', 'data science',
    'python', '모델', 'ai 엔지니어', '머신러닝 엔지니어',
  ],
  '데이터사이언스': [
    '데이터', 'data', '데이터분석', 'data analyst', '데이터사이언스', 'data science',
    '통계', 'statistics', 'python', 'sql', 'bi', 'analytics', '인사이트',
  ],
  '경영학/경영정보': [
    '경영', 'business', '사무', 'office', '회계', 'accounting', '인사', 'hr',
    '총무', '영업', 'sales', '기획', '마케팅', 'cs', '관리', '영업관리',
    '경영지원', '재무', '구매', 'scm', '물류',
  ],
  '마케팅/광고': [
    '마케팅', 'marketing', '광고', 'advertisement', '브랜드', 'brand',
    'sns', '콘텐츠', 'content', '디지털마케팅', 'performance marketing',
    'pr', '홍보', 'md', 'merchandising', '기획',
  ],
  '디자인/영상': [
    '디자인', 'design', '그래픽', 'graphic', 'ui', 'ux', 'ui/ux',
    '영상', 'video', 'motion', '브이로그', '편집', 'edit', '포토샵',
    'photoshop', '일러스트', 'illustrator', 'figma', '3d',
  ],
  '의료/보건': [
    '의료', '병원', 'hospital', '간호', '의료기기', '헬스케어', 'healthcare',
    '바이오', 'bio', '제약', 'pharma', '보건', '재활', '임상', 'clinical',
  ],
  '간호학': [
    '간호', '병원', 'hospital', '의료', '간호사', 'nurse', 'nursing',
  ],
  '생명공학/바이오': [
    '바이오', '생명', '제약', 'pharma', 'biotech', '유전', '세포', '분자',
    '연구', '실험', 'bio', '생명공학', 'biotechnology',
  ],
  '심리학': [
    '심리', 'psychology', '상담', 'counseling', '교육', 'hr', '인사',
    '조직', '강사', '코칭', 'coaching', '심리상담',
  ],
  '사회과학/인문': [
    '사무', '행정', 'administration', '법무', 'legal', '인사', 'hr', '총무',
    'cs', '고객지원', 'customer support', '리서치', 'research', '조사',
    '정책', 'policy', '번역', 'translate', '통역', 'interpret',
  ],
  '기계/자동차/항공': [
    '기계', 'mechanical', '자동차', 'automotive', '항공', 'aerospace',
    '로봇', 'robot', '설계', 'design', 'cad', 'catia', 'cfdf',
    '제조', 'manufacturing', '생산', 'production',
  ],
  '건축/토목/환경': [
    '건축', 'architecture', '토목', 'civil', '환경', 'environment',
    '건설', 'construction', '설계', 'design', 'cad', '구조', 'structure',
    '환경공학', '도시', 'city', '인테리어', 'interior',
  ],
  '기타': [],
} as const;

export const MAJOR_OPTIONS: { value: MajorCategory | '기타'; label: string }[] = [
  ...Object.keys(MAJOR_KEYWORDS).filter(k => k !== '기타').map(k => ({ value: k as MajorCategory, label: k })),
  { value: '기타', label: '기타' },
];

function cloneMajorKeywords(): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(MAJOR_KEYWORDS).map(([k, v]) => [k, [...v]])
  );
}

export async function getMajorKeywords(): Promise<Record<string, string[]>> {
  try {
    const count = await countKeywords('major');
    if (count === 0) return cloneMajorKeywords();

    const db = await listKeywords('major');
    const result = cloneMajorKeywords();
    for (const k of db) {
      if (!result[k.key]) result[k.key] = [];
      if (!result[k.key].includes(k.value)) result[k.key].push(k.value);
    }
    return result;
  } catch (error) {
    console.error('Failed to load major keywords from DB:', error);
    return cloneMajorKeywords();
  }
}

export function classifyMajorWithKeywords(
  text: string,
  majorKeywords: Record<string, string[]>
): { category: MajorCategory | '기타'; score: number } {
  const lowered = text.toLowerCase();
  let best: MajorCategory | '기타' = '기타';
  let bestScore = 0;

  for (const [category, keywords] of Object.entries(majorKeywords)) {
    if (category === '기타' || !keywords.length) continue;
    const score = keywords.reduce((acc, keyword) => {
      const lowerKeyword = keyword.toLowerCase();
      // 한글 키워드는 정확한 단어 경계 매칭, 영문은 포함 매칭
      if (/[\uac00-\ud7af]/i.test(lowerKeyword)) {
        const regex = new RegExp(lowerKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        const matches = lowered.match(new RegExp(`(?:^|[^a-z0-9가-힣])${regex.source}(?=$|[^a-z0-9가-힣])`, 'g'));
        return acc + (matches ? matches.length : 0);
      }
      return lowered.includes(lowerKeyword) ? acc + 1 : acc;
    }, 0);
    if (score > bestScore) {
      bestScore = score;
      best = category as MajorCategory;
    }
  }

  return { category: bestScore > 0 ? best : '기타', score: bestScore };
}

export async function classifyMajor(text: string): Promise<{ category: MajorCategory | '기타'; score: number }> {
  return classifyMajorWithKeywords(text, await getMajorKeywords());
}
