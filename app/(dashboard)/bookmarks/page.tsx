'use client';

/**
 * 찜한 공고 목록 페이지
 *
 * - 북마크 해제 (POST /api/listings/bookmark로 토글)
 * - 지원 목록에 추가 (POST /api/listings)
 * - 자소서 작성 연결 (company, position을 searchParams로 전달)
 * - 마감임박(D-3 이내) 강조 표시
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Bookmark, ExternalLink, MapPin, Briefcase, Clock, FileEdit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

type BookmarkedListing = {
  id: string;
  company: string;
  position: string;
  location: string | null;
  career: string | null;
  employType: string | null;
  salary: string | null;
  deadline: string | null;
  url: string | null;
  tags: string[];
  bookmarkedAt: string;
};

async function fetchBookmarks(): Promise<BookmarkedListing[]> {
  const res = await fetch('/api/listings/bookmark');
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

export default function BookmarksPage() {
  const qc = useQueryClient();
  const router = useRouter();
  const { data: bookmarks = [], isLoading } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: fetchBookmarks,
  });

  const removeMutation = useMutation({
    mutationFn: (listingId: string) =>
      fetch('/api/listings/bookmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId }),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['bookmarks'] });
      qc.invalidateQueries({ queryKey: ['listings'] });
      toast.success('북마크가 해제되었습니다');
    },
  });

  const addToJobsMutation = useMutation({
    mutationFn: (listingId: string) =>
      fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId }),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('내 지원 목록에 추가되었습니다');
    },
    onError: () => toast.error('이미 추가된 공고입니다'),
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <div className="flex items-end justify-between border-b border-gray-200 pb-5">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Bookmarks</p>
          <h1 className="text-xl font-semibold text-gray-900">찜한 공고</h1>
          {bookmarks.length > 0 && (
            <p className="text-xs text-violet-500 mt-1">{bookmarks.length}개 저장됨</p>
          )}
        </div>
        <Link href="/listings" className="text-xs text-blue-500 hover:text-blue-700 transition-colors">
          공고 더 보기 →
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3 animate-pulse">
          {[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-gray-100 rounded-xl" />)}
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white py-20 text-center shadow-sm">
          <Bookmark className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">찜한 공고가 없습니다</p>
          <Link href="/listings" className="mt-3 inline-block text-sm text-blue-500 hover:underline">
            공고 둘러보기
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarks.map(l => {
            const deadline = l.deadline ? new Date(l.deadline) : null;
            const daysLeft = deadline ? Math.ceil((deadline.getTime() - Date.now()) / 86400000) : null;
            const isExpired = daysLeft !== null && daysLeft < 0;
            const isUrgent = daysLeft !== null && daysLeft >= 0 && daysLeft <= 3;

            return (
              <div key={l.id} className={`rounded-xl border bg-white shadow-sm p-5 ${isUrgent ? 'border-red-200' : 'border-gray-100'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                      <p className="text-xs font-medium text-gray-400">{l.company}</p>
                      {isUrgent && <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full">마감임박</span>}
                      {isExpired && <span className="text-[10px] font-bold bg-gray-400 text-white px-1.5 py-0.5 rounded-full">마감</span>}
                    </div>
                    <Link href={`/listings/${l.id}`} className="text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      {l.position}
                    </Link>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
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
                      {l.employType && (
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{l.employType}</span>
                      )}
                    </div>
                    {l.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {l.tags.map(t => (
                          <span key={t} className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => removeMutation.mutate(l.id)}
                      aria-label="북마크 해제"
                      className="p-1.5 rounded-lg text-violet-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => addToJobsMutation.mutate(l.id)}
                      disabled={isExpired || addToJobsMutation.isPending}
                      className="text-xs font-medium bg-[#0f172a] text-white px-3 py-1.5 rounded-lg hover:bg-[#1e293b] disabled:opacity-40 transition-colors"
                    >
                      지원 추가
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {deadline ? (
                      <span className={isUrgent ? 'text-red-500 font-medium' : ''}>
                        {daysLeft !== null && daysLeft >= 0 ? `D-${daysLeft}` : '마감'} · {deadline.toLocaleDateString('ko-KR')}
                      </span>
                    ) : '마감일 미정'}
                  </div>
                  <div className="flex items-center gap-2">
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
  );
}
