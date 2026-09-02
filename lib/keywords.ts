/**
 * 공고 키워드(tag) 관리용 유틸리티
 *
 * - 인기 키워드 집계
 * - 정규화/유사 키워드 병합
 * - 직무 카테고리별 그룹핑
 */

import { prisma } from '@/lib/prisma';
import { safeJsonParse, stringifyJson } from '@/lib/json-utils';
import { listKeywords } from './keyword-service';

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

async function loadJobTagMap(): Promise<Map<string, { keyword: string; normalized: string }>> {
  try {
    const keywords = await listKeywords('job-tag');
    const map = new Map<string, { keyword: string; normalized: string }>();
    for (const k of keywords) {
      const valueNormalized = normalizeKeyword(k.value);
      const keyNormalized = normalizeKeyword(k.key);
      map.set(keyNormalized, { keyword: k.value, normalized: valueNormalized });
      map.set(valueNormalized, { keyword: k.value, normalized: valueNormalized });
      if (k.aliases) {
        for (const alias of k.aliases) {
          map.set(normalizeKeyword(alias), { keyword: k.value, normalized: valueNormalized });
        }
      }
    }
    return map;
  } catch (error) {
    console.error('Failed to load job-tag keyword map:', error);
    return new Map();
  }
}

export async function getKeywordStats(): Promise<KeywordStat[]> {
  const [listings, tagMap] = await Promise.all([
    prisma.jobListing.findMany({
      where: { isActive: true },
      select: { tags: true },
    }),
    loadJobTagMap(),
  ]);

  const counter = new Map<string, { count: number; normalized: string }>();

  for (const listing of listings) {
    const tags = safeJsonParse<string[]>(listing.tags, []);
    for (const tag of tags) {
      const tagNormalized = normalizeKeyword(tag);
      if (!tagNormalized) continue;
      const matched = tagMap.get(tagNormalized);
      const keyword = matched ? matched.keyword : tag;
      const normalized = matched ? matched.normalized : tagNormalized;
      const existing = counter.get(keyword);
      if (existing) {
        existing.count += 1;
      } else {
        counter.set(keyword, { count: 1, normalized });
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
