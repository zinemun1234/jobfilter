/**
 * 공고 description에서 제출 서류/면접/최종 단계 키워드를 추출하여 마이크로 체크리스트 생성
 *
 * - AI 사용 안 함
 * - 키워드 사전 + 단순 문자열 포함 여부로 판단
 * - category: document(서류) | interview(면접) | final(최종/입사)
 */

export type ChecklistCategory = 'document' | 'interview' | 'final';

export interface ChecklistItem {
  label: string;
  checked: boolean;
  category: ChecklistCategory;
}

interface KeywordEntry {
  label: string;
  category: ChecklistCategory;
  keywords: string[];
}

const KEYWORD_ENTRIES: KeywordEntry[] = [
  // 서류 단계
  { label: '포트폴리오', category: 'document', keywords: ['포트폴리오', 'portfolio', '포폴'] },
  { label: '자기소개서', category: 'document', keywords: ['자기소개서', '자소서', 'cover letter'] },
  { label: '이력서', category: 'document', keywords: ['이력서', 'resume', 'cv'] },
  { label: '성적증명서', category: 'document', keywords: ['성적증명서', '성적 증명서', 'academic transcript', '학업성적증명서'] },
  { label: '재학증명서', category: 'document', keywords: ['재학증명서', '재학 증명서'] },
  { label: '졸업증명서', category: 'document', keywords: ['졸업증명서', '졸업 증명서', 'diploma'] },
  { label: '자격증', category: 'document', keywords: ['자격증', 'certificate', '자격증 사본'] },
  { label: '추천서', category: 'document', keywords: ['추천서', 'recommendation letter'] },
  { label: '경력증명서', category: 'document', keywords: ['경력증명서', '경력 증명서', '경력 확인서', 'experience certificate'] },
  { label: '영문 이력서', category: 'document', keywords: ['영문 이력서', '영문이력서', 'english resume'] },
  { label: '워드', category: 'document', keywords: ['워드', 'word', 'docx'] },
  { label: '엑셀', category: 'document', keywords: ['엑셀', 'excel', 'xlsx'] },
  { label: 'PPT', category: 'document', keywords: ['ppt', 'powerpoint', '프레젠테이션', 'pptx'] },
  { label: '사진', category: 'document', keywords: ['증명사진', '사진', 'passport photo'] },
  { label: '신분증', category: 'document', keywords: ['신분증', '주민등록증', 'id card'] },
  { label: '건강검진', category: 'document', keywords: ['건강검진', '건강 검진', 'medical checkup'] },
  { label: '공인어학성적', category: 'document', keywords: ['토익', '토플', 'opic', 'teps', '영어성적', '어학성적'] },
  { label: 'GPA', category: 'document', keywords: ['gpa', '학점', '학업성적'] },

  // 면접 단계
  { label: '면접 의사 확인', category: 'interview', keywords: ['면접참여의사서', '면접 의사', '면접 참여'] },
  { label: '기술 면접 준비', category: 'interview', keywords: ['기술면접', 'cs 면접', '코딩테스트', 'coding test', '코딩 테스트'] },
  { label: '인성 면접 준비', category: 'interview', keywords: ['인성면접', '인적성', 'pt 면접'] },
  { label: '면접 복장', category: 'interview', keywords: ['정장', '면접 복장', '드레스코드'] },

  // 최종/입사 단계
  { label: '입사 지원서', category: 'final', keywords: ['입사지원서', '입사 지원서', '입사원서'] },
  { label: '주민등록등본', category: 'final', keywords: ['주민등록등본', '주민 등록 등본'] },
  { label: '가족관계증명서', category: 'final', keywords: ['가족관계증명서', '가족 관계 증명서'] },
  { label: '병역사항', category: 'final', keywords: ['병역', '병적', '군필', '미필'] },
  { label: '채용 건강검진', category: 'final', keywords: ['채용검진', '채용 검진', '채용 건강검진', '입사 건강검진'] },
  { label: '연봉 협상', category: 'final', keywords: ['연봉', '급여', '연봉협상'] },
];

export function extractJobChecklist(description?: string | null, tags?: string[] | null): ChecklistItem[] {
  const text = (description ?? '').toLowerCase();
  const textTags = (tags ?? []).join(' ').toLowerCase();
  const combined = `${text} ${textTags}`;

  const seen = new Set<string>();
  const items: ChecklistItem[] = [];

  for (const { label, category, keywords } of KEYWORD_ENTRIES) {
    if (keywords.some((k) => combined.includes(k.toLowerCase()))) {
      if (!seen.has(label)) {
        items.push({ label, checked: false, category });
        seen.add(label);
      }
    }
  }

  return items;
}

export function withDefaultCategory(items: ChecklistItem[]): ChecklistItem[] {
  return items.map((item) => ({
    ...item,
    category: item.category ?? 'document',
  }));
}

export function serializeChecklist(items: ChecklistItem[]): string {
  return JSON.stringify(items);
}

export function parseChecklist(json?: string | null): ChecklistItem[] {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json) as ChecklistItem[];
    return withDefaultCategory(parsed);
  } catch {
    return [];
  }
}

export function getChecklistProgress(json?: string | null): number | null {
  const items = parseChecklist(json);
  if (items.length === 0) return null;
  const checked = items.filter((i) => i.checked).length;
  return Math.round((checked / items.length) * 100);
}
