/**
 * 자소서 항목 간 중복/자기표절 검사
 *
 * - AI 없이 n-gram 코사인 유사도로 계산
 * - 동일 자소서 내 다른 항목끼리 비교 (자기표절)
 * - 다른 자소서 항목과도 비교 (중복)
 */

export interface DuplicateMatch {
  sourceItemIndex: number;
  sourceQuestion: string;
  targetLetterId: string;
  targetCompany: string;
  targetPosition: string;
  targetItemIndex: number;
  targetQuestion: string;
  similarity: number;
  snippet: string;
  matchedSnippet: string;
}

export interface DuplicateResult {
  letterId: string;
  company: string;
  position: string;
  matches: DuplicateMatch[];
}

function normalize(text: string): string {
  // 한글, 영문 소문자, 숫자만 남기고 나머지(공백/문장부호/기호) 제거
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]/g, '');
}

function ngrams(text: string, n: number): Map<string, number> {
  const map = new Map<string, number>();
  if (text.length < n) return map;
  for (let i = 0; i <= text.length - n; i++) {
    const gram = text.slice(i, i + n);
    map.set(gram, (map.get(gram) || 0) + 1);
  }
  return map;
}

function cosineSimilarity(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0;
  let normA = 0;
  Array.from(a.entries()).forEach(([gram, count]) => {
    normA += count * count;
    const cb = b.get(gram);
    if (cb) dot += count * cb;
  });
  let normB = 0;
  Array.from(b.values()).forEach((count) => { normB += count * count; });
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function similarity(textA: string, textB: string): number {
  const cleanA = normalize(textA);
  const cleanB = normalize(textB);
  const gramsA2 = ngrams(cleanA, 2);
  const gramsB2 = ngrams(cleanB, 2);
  const gramsA3 = ngrams(cleanA, 3);
  const gramsB3 = ngrams(cleanB, 3);

  const sim2 = cosineSimilarity(gramsA2, gramsB2);
  const sim3 = cosineSimilarity(gramsA3, gramsB3);

  // 2-gram과 3-gram 평균 (짧은 문장에서 단순 복사를 잡기 위해 3-gram 가중)
  return Math.round((sim2 * 0.4 + sim3 * 0.6) * 100) / 100;
}

interface Paragraph {
  letterId: string;
  company: string;
  position: string;
  itemIndex: number;
  question: string;
  answer: string;
}

export function findDuplicates(
  targetLetterId: string,
  allLetters: { id: string; company: string; position: string; items: { question: string; answer: string }[] }[],
  threshold = 0.6,
  topN = 3
): DuplicateResult {
  const paragraphs: Paragraph[] = [];
  for (const letter of allLetters) {
    for (let i = 0; i < letter.items.length; i++) {
      const item = letter.items[i];
      paragraphs.push({
        letterId: letter.id,
        company: letter.company,
        position: letter.position,
        itemIndex: i,
        question: item.question,
        answer: item.answer,
      });
    }
  }

  const targetParagraphs = paragraphs.filter(p => p.letterId === targetLetterId);
  const result: DuplicateMatch[] = [];

  for (const source of targetParagraphs) {
    if (source.answer.trim().length < 20) continue;

    const candidates = paragraphs
      .filter(p => !(p.letterId === source.letterId && p.itemIndex === source.itemIndex))
      .map(p => ({ p, sim: similarity(source.answer, p.answer) }))
      .filter(({ sim }) => sim >= threshold)
      .sort((a, b) => b.sim - a.sim)
      .slice(0, topN);

    for (const { p, sim } of candidates) {
      result.push({
        sourceItemIndex: source.itemIndex,
        sourceQuestion: source.question,
        targetLetterId: p.letterId,
        targetCompany: p.company,
        targetPosition: p.position,
        targetItemIndex: p.itemIndex,
        targetQuestion: p.question,
        similarity: sim,
        snippet: source.answer.slice(0, 120) + (source.answer.length > 120 ? '…' : ''),
        matchedSnippet: p.answer.slice(0, 120) + (p.answer.length > 120 ? '…' : ''),
      });
    }
  }

  const targetLetter = allLetters.find(l => l.id === targetLetterId);
  return {
    letterId: targetLetterId,
    company: targetLetter?.company ?? '',
    position: targetLetter?.position ?? '',
    matches: result.sort((a, b) => b.similarity - a.similarity),
  };
}
