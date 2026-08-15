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
import ApplyButton from '@/components/jobs/ApplyButton';
import EmptyState from '@/components/ui/EmptyState';
import SkeletonList from '@/components/ui/SkeletonList';

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

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <div className="flex items-end justify-between border-b border-gray-200 pb-6">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Bookmarks</p>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">찜한 공고</h1>
          {bookmarks.length > 0 && (
            <p className="text-sm text-violet-500 mt-1.5">{bookmarks.length}개 저장됨</p>
          )}
        </div>
        <Link href="/listings" className="text-sm text-blue-500 hover:text-blue-700 transition-colors">
          공고 더 보기 →
        </Link>
      </div>

      {isLoading ? (
        <SkeletonList count={4} cardClassName="h-28" />
      ) : bookmarks.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="찜한 공고가 없습니다"
          description="관심 있는 공고를 북마크하고 나중에 확인하세요"
          action={{ label: '공고 둘러보기', href: '/listings' }}
        />
      ) : (
        <div className="space-y-3">
          {bookmarks.map(l => {
            const deadline = l.deadline ? new Date(l.deadline) : null;
            const daysLeft = deadline ? Math.ceil((deadline.getTime() - Date.now()) / 86400000) : null;
            const isExpired = daysLeft !== null && daysLeft < 0;
            const isUrgent = daysLeft !== null && daysLeft >= 0 && daysLeft <= 3;

            return (
              <div key={l.id} className={`rounded-2xl border bg-white shadow-sm p-6 ${isUrgent ? 'border-red-200' : 'border-gray-200'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="text-xs font-medium text-gray-400">{l.company}</p>
                      {isUrgent && <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded-full">마감임박</span>}
                      {isExpired && <span className="text-xs font-bold bg-gray-400 text-white px-2 py-0.5 rounded-full">마감</span>}
                    </div>
                    <Link href={`/listings/${l.id}`} className="text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      {l.position}
                    </Link>
                    <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-2">
                      {l.location && (
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="w-3.5 h-3.5" />{l.location}
                        </span>
                      )}
                      {l.career && (
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Briefcase className="w-3.5 h-3.5" />{l.career}
                        </span>
                      )}
                      {l.employType && (
                        <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">{l.employType}</span>
                      )}
                    </div>
                    {l.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {l.tags.map(t => (
                          <span key={t} className="text-[11px] bg-gray-100 text-gray-500 px-2.5 py-1 rounded-lg">{t}</span>
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
                    {isExpired ? (
                      <span className="text-xs font-medium bg-muted text-muted-foreground px-3 py-1.5 rounded-lg">
                        지원 마감
                      </span>
                    ) : (
                      <ApplyButton
                        listingId={l.id}
                        initialAdded={false}
                        variant="light"
                        className="text-xs px-3 py-1.5"
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
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
                      className="flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-800 font-medium transition-colors"
                    >
                      <FileEdit className="w-3.5 h-3.5" /> 자소서 작성
                    </button>
                    {l.url && (
                      <a href={l.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-700 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" /> 원본 보기
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
