/**
 * GitHub 저장소 공개 정보를 분석하는 rule-based 유틸리티
 *
 * - AI 사용 안 함
 * - GitHub REST API (공개 repo) 호출
 * - 1시간 기준 rate limit 60회, 7일 캐싱 권장
 * - timeout, redirect, 응답 크기, rate limit, 7일 캐싱 보호
 */

export interface GitHubLanguage {
  name: string;
  bytes: number;
  percentage: number;
}

export interface GitHubAnalysisResult {
  owner: string;
  repo: string;
  fullName: string;
  url: string;
  languages: GitHubLanguage[];
  totalCommits: number | null;
  hasReadme: boolean;
  license: string | null;
  isActive: boolean;
  createdAt: string;
  pushedAt: string;
  updatedAt: string;
  fetchedAt: string;
}

const ACTIVE_MONTHS = 3;
const REQUEST_TIMEOUT_MS = 5000;
const MAX_BODY_SIZE = 5 * 1024 * 1024; // 5MB

// 메모리 기반 rate limit 상태 (프로덕션에서는 Redis 권장)
const rateLimitState: { remaining: number | null; resetAt: number | null } = { remaining: null, resetAt: null };

export function parseGitHubRepoUrl(url: string): { owner: string; repo: string } | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== 'github.com') return null;
    const parts = parsed.pathname.replace(/^\/+/, '').split('/').filter(Boolean);
    if (parts.length < 2) return null;
    const [owner, repo] = parts;
    if (!owner || !repo) return null;
    return { owner, repo: repo.replace(/\.git$/, '') };
  } catch {
    return null;
  }
}

function isRateLimited(): boolean {
  if (rateLimitState.remaining == null) return false;
  if (rateLimitState.remaining <= 0 && rateLimitState.resetAt && Date.now() < rateLimitState.resetAt) {
    return true;
  }
  return false;
}

function updateRateLimit(headers: Headers) {
  const remaining = headers.get('x-ratelimit-remaining');
  const reset = headers.get('x-ratelimit-reset');
  if (remaining != null) {
    rateLimitState.remaining = Number(remaining);
  }
  if (reset != null) {
    rateLimitState.resetAt = Number(reset) * 1000;
  }
}

async function safeFetch(url: string, options?: RequestInit): Promise<{ ok: boolean; headers: Headers; data: unknown | null }> {
  if (isRateLimited()) {
    return { ok: false, headers: new Headers(), data: null };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      ...options,
      redirect: 'manual',
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github.v3+json', ...options?.headers },
    });
    clearTimeout(timeout);

    const contentLength = res.headers.get('content-length');
    if (contentLength && Number(contentLength) > MAX_BODY_SIZE) {
      return { ok: false, headers: res.headers, data: null };
    }

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location');
      if (location) {
        const resolved = location.startsWith('http') ? location : new URL(location, url).toString();
        if (resolved !== url) {
          return safeFetch(resolved, options);
        }
      }
      return { ok: false, headers: res.headers, data: null };
    }

    updateRateLimit(res.headers);

    if (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0') {
      return { ok: false, headers: res.headers, data: null };
    }

    if (!res.ok) return { ok: false, headers: res.headers, data: null };

    const data = await res.json().catch(() => null);
    return { ok: true, headers: res.headers, data };
  } catch (e) {
    clearTimeout(timeout);
    return { ok: false, headers: new Headers(), data: null };
  }
}

async function fetchJson<T>(url: string, options?: RequestInit): Promise<{ data: T | null; headers: Headers }> {
  const { ok, headers, data } = await safeFetch(url, options);
  if (!ok) return { data: null, headers };
  return { data: data as T, headers };
}

async function fetchRepoInfo(owner: string, repo: string) {
  return fetchJson<Record<string, unknown>>(`https://api.github.com/repos/${owner}/${repo}`);
}

async function fetchLanguages(owner: string, repo: string): Promise<GitHubLanguage[]> {
  const { data, headers } = await fetchJson<Record<string, number>>(`https://api.github.com/repos/${owner}/${repo}/languages`);
  if (!data) return [];
  updateRateLimit(headers);
  const entries = Object.entries(data);
  const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0);
  if (total === 0) return [];
  return entries
    .map(([name, bytes]) => ({ name, bytes, percentage: Math.round((bytes / total) * 1000) / 10 }))
    .sort((a, b) => b.bytes - a.bytes);
}

function parseLastPage(linkHeader: string | null): number {
  if (!linkHeader) return 1;
  const match = linkHeader.match(/page=(\d+)[^>]*>;\s*rel="last"/);
  return match ? parseInt(match[1], 10) : 1;
}

async function fetchTotalCommits(owner: string, repo: string): Promise<number | null> {
  const { ok, headers, data } = await safeFetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`, {
    headers: { Accept: 'application/vnd.github.v3+json' },
  });
  if (!ok) return null;
  const link = headers.get('link');
  if (link) {
    return parseLastPage(link);
  }
  return Array.isArray(data) ? data.length : null;
}

async function fetchHasReadme(owner: string, repo: string): Promise<boolean> {
  const { ok } = await safeFetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
    headers: { Accept: 'application/vnd.github.v3+json' },
  });
  return ok;
}

export async function analyzeGitHubRepo(url: string): Promise<GitHubAnalysisResult | null> {
  const parsed = parseGitHubRepoUrl(url);
  if (!parsed) return null;

  const { owner, repo } = parsed;
  const [{ data: repoInfo }, languages, totalCommits, hasReadme] = await Promise.all([
    fetchRepoInfo(owner, repo),
    fetchLanguages(owner, repo),
    fetchTotalCommits(owner, repo),
    fetchHasReadme(owner, repo),
  ]);

  if (!repoInfo) return null;

  const createdAt = repoInfo.created_at as string;
  const pushedAt = repoInfo.pushed_at as string;
  const updatedAt = repoInfo.updated_at as string;
  const now = new Date();
  const pushedDate = pushedAt ? new Date(pushedAt) : null;
  const monthsSincePush = pushedDate
    ? (now.getTime() - pushedDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
    : Infinity;

  return {
    owner,
    repo,
    fullName: `${owner}/${repo}`,
    url: `https://github.com/${owner}/${repo}`,
    languages,
    totalCommits,
    hasReadme,
    license: ((repoInfo.license as { name?: string } | null)?.name) ?? ((repoInfo.license as string | null)) ?? null,
    isActive: monthsSincePush <= ACTIVE_MONTHS,
    createdAt,
    pushedAt,
    updatedAt,
    fetchedAt: new Date().toISOString(),
  };
}

export function shouldRefreshAnalysis(fetchedAt: string | Date | null): boolean {
  if (!fetchedAt) return true;
  const date = typeof fetchedAt === 'string' ? new Date(fetchedAt) : fetchedAt;
  const diffDays = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays >= 7;
}

export async function getCachedOrFreshGitHubAnalysis(
  url: string,
  fetchedAt?: string | Date | null,
  existing?: GitHubAnalysisResult | null
): Promise<GitHubAnalysisResult | null> {
  if (existing && !shouldRefreshAnalysis(fetchedAt ?? existing.fetchedAt)) {
    return existing;
  }
  return analyzeGitHubRepo(url);
}
