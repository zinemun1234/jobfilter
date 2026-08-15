/**
 * 공고 키워드(tag) 관리용 유틸리티
 *
 * - 인기 키워드 집계
 * - 정규화/유사 키워드 병합
 * - 직무 카테고리별 그룹핑
 */

import { prisma } from '@/lib/prisma';
import { safeJsonParse, stringifyJson } from '@/lib/json-utils';

export type KeywordStat = {
  keyword: string;
  count: number;
  normalized: string;
  category: string;
};

const CATEGORY_PATTERNS: Record<string, string[]> = {
  '프론트엔드': ['react', 'vue', 'angular', 'html', 'css', 'javascript', 'typescript', 'next.js', 'tailwind'],
  '백엔드': ['java', 'spring', 'node', 'python', 'django', 'sql', 'mysql', 'postgresql', 'api', 'rest'],
  '데이터/AI': ['python', 'sql', 'pandas', 'tensorflow', 'pytorch', 'machine learning', 'ai', 'data', 'ml'],
  'DevOps/인프라': ['docker', 'kubernetes', 'aws', 'gcp', 'azure', 'linux', 'ci/cd', 'devops', 'terraform'],
  '모바일': ['ios', 'android', 'swift', 'kotlin', 'flutter', 'react native'],
  '보안': ['security', '보안', 'ethical hacking', 'penetration', 'linux'],
  '기획/PM': ['pm', '기획', 'product', 'figma', 'notion', 'jira'],
  '언어/기타': [],
};

function normalizeKeyword(keyword: string): string {
  return keyword.trim().toLowerCase().replace(/[\s\.]+/g, '');
}

function detectCategory(keyword: string): string {
  const lower = keyword.toLowerCase();
  for (const [category, patterns] of Object.entries(CATEGORY_PATTERNS)) {
    if (patterns.some((p) => lower.includes(p))) return category;
  }
  return '언어/기타';
}

export async function getKeywordStats(): Promise<KeywordStat[]> {
  const listings = await prisma.jobListing.findMany({
    where: { isActive: true },
    select: { tags: true },
  });

  const counter = new Map<string, { count: number; normalized: string }>();

  for (const listing of listings) {
    const tags = safeJsonParse<string[]>(listing.tags, []);
    for (const tag of tags) {
      const normalized = normalizeKeyword(tag);
      if (!normalized) continue;
      const existing = counter.get(tag);
      if (existing) {
        existing.count += 1;
      } else {
        counter.set(tag, { count: 1, normalized });
      }
    }
  }

  const stats = Array.from(counter.entries()).map(([keyword, { count, normalized }]) => ({
    keyword,
    count,
    normalized,
    category: detectCategory(keyword),
  }));

  return stats.sort((a, b) => b.count - a.count || a.keyword.localeCompare(b.keyword));
}

export function groupKeywordsByCategory(stats: KeywordStat[]): Record<string, KeywordStat[]> {
  const groups: Record<string, KeywordStat[]> = {};
  for (const stat of stats) {
    if (!groups[stat.category]) groups[stat.category] = [];
    groups[stat.category].push(stat);
  }
  return groups;
}

export function findSimilarKeywords(stats: KeywordStat[], keyword: string): string[] {
  const target = normalizeKeyword(keyword);
  return stats
    .filter((s) => s.keyword !== keyword && (s.normalized.includes(target) || target.includes(s.normalized)))
    .map((s) => s.keyword);
}

export async function mergeKeywords(source: string, target: string): Promise<number> {
  const listings = await prisma.jobListing.findMany({
    where: { isActive: true },
    select: { id: true, tags: true },
  });

  let updated = 0;
  for (const listing of listings) {
    const tags = safeJsonParse<string[]>(listing.tags, []);
    const newTags = tags.map((tag) => (tag.trim() === source.trim() ? target.trim() : tag));
    const hasSource = tags.some((tag) => tag.trim() === source.trim());
    if (hasSource) {
      await prisma.jobListing.update({
        where: { id: listing.id },
        data: { tags: stringifyJson(newTags) },
      });
      updated += 1;
    }
  }

  return updated;
}
