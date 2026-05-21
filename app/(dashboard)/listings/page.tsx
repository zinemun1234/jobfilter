'use client';

/**
 * 맞춤 채용 공고 목록 페이지
 *
 * 핵심 기능:
 * - calcMatchScore(): 공고 태그+직무명과 내 스킬 교집합 비율 계산 → MatchBadge로 표시
 * - 매칭순 정렬 토글 (내 스킬이 있을 때만 표시)
 * - 북마크 토글 (찜하기/해제, 낙관적 UI 업데이트)
 * - 지원 목록 추가 (409 중복 처리)
 * - 공고 상세 보기 / 자소서 작성 연결 (searchParams로 회사/직무 전달)
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Plus, ExternalLink, MapPin, Briefcase, GraduationCap, Clock, CheckCircle, FileEdit, Zap, Bookmark } from 'lucide-react';
import { toast } from 'sonner';

type Listing = {
  id: string;
  company: string;
  position: string;
  location: string | null;
  career: string | null;
  education: string | null;
  employType: string | null;
  salary: string | null;
  deadline: string | null;
  url: string | null;
  description: string | null;
  tags: string[];
  createdAt: string;
};

type Profile = { targetJob?: string | null; skills?: string[] };

async function fetchListings(search: string): Promise<Listing[]> {
  const res = await fetch(`/api/listings?search=${encodeURIComponent(search)}`);
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

async function fetchProfile(): Promise<Profile> {
  const res = await fetch('/api/profile');
  if (!res.ok) return {};
  const data = (await res.json()).data;
  return {
    targetJob: data.targetJob,
    skills: (() => { try { return JSON.parse(data.skills); } catch { return []; } })(),
  };
}

// 공고 태그 + 직무명과 내 스킬 교집합 비율 계산
function calcMatchScore(listing: Listing, skills: string[]): number {
  if (!skills || skills.length === 0) return 0;
  const keywords = [
    ...(listing.tags ?? []),
    ...listing.position.split(/[\s,/·]+/).filter(w => w.length > 1),
  ].map(k => k.toLowerCase());
  if (keywords.length === 0) return 0;
  const matched = keywords.filter(k => skills.some(s => s.toLowerCase().includes(k) || k.includes(s.toLowerCase())));
  return Math.round((matched.length / keywords.length) * 100);
}

function MatchBadge({ score }: { score: number }) {
  if (score === 0) return null;
  const color = score >= 60
    ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
    : score >= 30
    ? 'bg-amber-100 text-amber-700 border-amber-200'
    : 'bg-gray-100 text-gray-500 border-gray-200';
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${color}`}>
      <Zap className="w-2.5 h-2.5" />
      매칭 {score}%
    </span>
  );
}

export default function ListingsPage() {
  const qc = useQueryClient();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [added, setAdded] = useState<Set<string>>(new Set());
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>(null);
  const [sortByMatch, setSortByMatch] = useState(false);

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ['listings', search],
    queryFn: () => fetchListings(search),
  });

  const { data: profile } = useQuery({ queryKey: ['profile'], queryFn: fetchProfile });
  const skills = profile?.skills ?? [];

  // 초기 북마크 목록 로드
  useQuery({
    queryKey: ['bookmarks'],
    queryFn: async () => {
      const res = await fetch('/api/listings/bookmark');
      if (!res.ok) return [];
      const data = (await res.json()).data as { id: string }[];
      setBookmarked(new Set(data.map(b => b.id)));
      return data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async (listingId: string) => {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId }),
      });
      if (res.status === 409) throw new Error('이미 추가된 공고입니다');
      if (!res.ok) throw new Error('Failed');
      return listingId;
    },
    onSuccess: (listingId) => {
      setAdded(prev => new Set([...Array.from(prev), listingId]));
      qc.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('내 지원 목록에 추가되었습니다');
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const bookmarkMutation = useMutation({
    mutationFn: async (listingId: string) => {
      const res = await fetch('/api/listings/bookmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId }),
      });
      if (!res.ok) throw new Error('Failed');
      return (await res.json()).data as { bookmarked: boolean };
    },
    onSuccess: (data, listingId) => {
      setBookmarked(prev => {
        const next = new Set(prev);
        data.bookmarked ? next.add(listingId) : next.delete(listingId);
        return next;
      });
      qc.invalidateQueries({ queryKey: ['bookmarks'] });
      toast.success(data.bookmarked ? '찜 목록에 추가되었습니다' : '찜 목록에서 제거되었습니다');
    },
    onError: () => toast.error('오류가 발생했습니다'),
  });

  return (
    <div className="min-h-full bg-gray-50/50">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        <div className="border-b border-gray-200 pb-5 flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">핵심 기능</span>
              <span className="text-[10px] text-blue-400">CS 맞춤 필터링</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">맞춤 채용 공고</h1>
            <p className="text-xs text-gray-400 mt-1">컴퓨터공학부 학생에게 맞는 개발·IT·사무직 공고만 필터링되었습니다</p>
          </div>
          {listings.length > 0 && (
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
              {listings.length}개 공고
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <form onSubmit={e => { e.preventDefault(); setSearch(searchInput); }} className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="회사명, 직무, 지역 검색"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-20 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-medium bg-[#0f172a] text-white rounded-md">검색</button>
          </form>
          {skills.length > 0 && (
            <button
              type="button"
              onClick={() => setSortByMatch(v => !v)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                sortByMatch
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              {sortByMatch ? '매칭순 정렬 중' : '매칭순 정렬'}
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[...Array(6)].map((_, i) => <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse" />)}
          </div>
        ) : listings.length === 0 ? (
          <div className="rounded-xl border border-gray-100 bg-white py-20 text-center shadow-sm">
            <p className="text-sm text-gray-400">등록된 공고가 없습니다</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {[...listings]
              .map(l => ({ ...l, _matchScore: calcMatchScore(l, skills) }))
              .sort((a, b) => sortByMatch ? b._matchScore - a._matchScore : 0)
              .map(l => {
              const isAdded = added.has(l.id);
              const deadline = l.deadline ? new Date(l.deadline) : null;
              const daysLeft = deadline ? Math.ceil((deadline.getTime() - Date.now()) / 86400000) : null;
              const isExpanded = expanded === l.id;
              const isNew = (Date.now() - new Date(l.createdAt).getTime()) < 7 * 86400000;
              const isUrgent = daysLeft !== null && daysLeft >= 0 && daysLeft <= 3;

              return (
                <div key={l.id} className={`rounded-xl border bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow ${isUrgent ? 'border-red-200' : 'border-gray-100'}`}>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                          <p className="text-xs font-medium text-gray-400">{l.company}</p>
                          {isNew && <span className="text-[10px] font-bold bg-blue-500 text-white px-1.5 py-0.5 rounded-full">NEW</span>}
                          {isUrgent && <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full">마감임박</span>}
                          <MatchBadge score={l._matchScore} />
                        </div>
                        <Link href={`/listings/${l.id}`} className="text-base font-semibold text-gray-900 leading-snug hover:text-blue-600 transition-colors">
                          {l.position}
                        </Link>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => bookmarkMutation.mutate(l.id)}
                          aria-label={bookmarked.has(l.id) ? '찜 해제' : '찜하기'}
                          className={`p-1.5 rounded-lg transition-colors ${
                            bookmarked.has(l.id)
                              ? 'text-violet-500 bg-violet-50'
                              : 'text-gray-300 hover:text-violet-400 hover:bg-violet-50'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${bookmarked.has(l.id) ? 'fill-violet-500' : ''}`} />
                        </button>
                        <button
                          type="button"
                          onClick={() => !isAdded && addMutation.mutate(l.id)}
                          disabled={isAdded || addMutation.isPending}
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                            isAdded
                              ? 'bg-emerald-50 text-emerald-600 cursor-default'
                              : 'bg-[#0f172a] text-white hover:bg-[#1e293b]'
                          } disabled:opacity-60`}
                        >
                          {isAdded ? <><CheckCircle className="w-3.5 h-3.5" /> 추가됨</> : <><Plus className="w-3.5 h-3.5" /> 추가</>}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3">
                      {l.location && (
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />{l.location}
                        </span>
                      )}
                      {l.career && (
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Briefcase className="w-3 h-3" />{l.career}
                        </span>
                      )}
                      {l.education && (
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <GraduationCap className="w-3 h-3" />{l.education}
                        </span>
                      )}
                      {l.employType && (
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{l.employType}</span>
                      )}
                    </div>

                    {l.salary && (
                      <p className="text-xs text-emerald-600 font-medium mt-2">{l.salary}</p>
                    )}

                    {l.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {l.tags.map(t => (
                          <span key={t} className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>
                        ))}
                      </div>
                    )}

                    {l.description && (
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={() => setExpanded(isExpanded ? null : l.id)}
                          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {isExpanded ? '상세 접기 ▲' : '상세 보기 ▼'}
                        </button>
                        {isExpanded && (
                          <p className="mt-2 text-xs text-gray-600 leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-lg p-3">
                            {l.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between px-5 py-3 border-t border-gray-50 bg-gray-50/50">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {deadline ? (
                        <span className={daysLeft !== null && daysLeft <= 3 ? 'text-red-500 font-medium' : ''}>
                          {daysLeft !== null && daysLeft >= 0 ? `D-${daysLeft}` : '마감'} · {deadline.toLocaleDateString('ko-KR')}
                        </span>
                      ) : '마감일 미정'}
                    </div>
                    <div className="flex items-center gap-2">
                      {/* 자소서 작성 연결 버튼 */}
                      <button
                        type="button"
                        onClick={() => router.push(`/cover-letter?company=${encodeURIComponent(l.company)}&position=${encodeURIComponent(l.position)}`)}
                        className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-800 font-medium transition-colors"
                      >
                        <FileEdit className="w-3 h-3" /> 자소서 작성
                      </button>
                      {l.url && (
                        <a href={l.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 transition-colors">
                          <ExternalLink className="w-3 h-3" /> 원본 보기
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
