'use client';

/**
 * 공고 상세 페이지
 *
 * - 공고 정보 (회사, 직무, 근무지, 경력, 학력, 고용형태, 급여, 마감일, 태그, 상세내용)
 * - 내 지원 목록에 추가 (409 중복 처리)
 * - 원본 공고 링크
 * - 이 공고로 자소서 작성 연결:
 *   goWriteCoverLetter()가 company, position, listingId, description(500자), tags를
 *   searchParams로 /cover-letter 페이지에 전달 → 자소서 폼 자동 채우기
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, MapPin, Briefcase, GraduationCap, Clock,
  ExternalLink, Plus, CheckCircle, Building2, Tag, FileEdit,
} from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

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
  source: string | null;
  createdAt: string;
};

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const qc = useQueryClient();
  const [added, setAdded] = useState(false);

  const { data: listing, isLoading, isError } = useQuery<Listing>({
    queryKey: ['listing', id],
    queryFn: async () => {
      const res = await fetch(`/api/listings/${id}`);
      if (!res.ok) throw new Error('Not found');
      return (await res.json()).data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: id }),
      });
      if (res.status === 409) throw new Error('이미 추가된 공고입니다');
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      setAdded(true);
      qc.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('내 지원 목록에 추가되었습니다');
    },
    onError: (e: Error) => toast.error(e.message),
  });

  // 이 공고로 자소서 작성 — 공고 전체 정보를 쿼리파라미터로 넘김
  function goWriteCoverLetter() {
    if (!listing) return;
    const params = new URLSearchParams({
      company: listing.company,
      position: listing.position,
      listingId: listing.id,
    });
    if (listing.description) params.set('description', listing.description.slice(0, 500));
    if (listing.tags?.length) params.set('tags', listing.tags.join(','));
    router.push(`/cover-letter?${params.toString()}`);
  }  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="h-8 w-32 bg-gray-100 rounded animate-pulse mb-6" />
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      </div>
    );
  }

  if (isError || !listing) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-8 text-center">
        <p className="text-sm text-gray-400 mb-4">공고를 찾을 수 없습니다</p>
        <Link href="/listings" className="text-sm text-blue-500 hover:underline">← 목록으로</Link>
      </div>
    );
  }

  const deadline = listing.deadline ? new Date(listing.deadline) : null;
  const daysLeft = deadline ? Math.ceil((deadline.getTime() - Date.now()) / 86400000) : null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
      {/* 뒤로가기 */}
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> 목록으로
      </button>

      {/* 헤더 */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 text-gray-400" />
              <p className="text-sm font-medium text-gray-500">{listing.company}</p>
              {listing.source && (
                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{listing.source}</span>
              )}
            </div>
            <h1 className="text-xl font-semibold text-gray-900">{listing.position}</h1>
          </div>
          <button
            type="button"
            onClick={() => !added && addMutation.mutate()}
            disabled={added || addMutation.isPending}
            className={`shrink-0 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              added
                ? 'bg-emerald-50 text-emerald-600 cursor-default'
                : 'bg-[#0f172a] text-white hover:bg-[#1e293b]'
            } disabled:opacity-60`}
          >
            {added ? <><CheckCircle className="w-4 h-4" /> 추가됨</> : <><Plus className="w-4 h-4" /> 내 목록에 추가</>}
          </button>
        </div>

        {/* 메타 정보 */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 pt-4 border-t border-gray-50">
          {listing.location && (
            <span className="flex items-center gap-1.5 text-sm text-gray-600">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />{listing.location}
            </span>
          )}
          {listing.career && (
            <span className="flex items-center gap-1.5 text-sm text-gray-600">
              <Briefcase className="w-3.5 h-3.5 text-gray-400" />{listing.career}
            </span>
          )}
          {listing.education && (
            <span className="flex items-center gap-1.5 text-sm text-gray-600">
              <GraduationCap className="w-3.5 h-3.5 text-gray-400" />{listing.education}
            </span>
          )}
          {listing.employType && (
            <span className="text-sm bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full">{listing.employType}</span>
          )}
        </div>

        {listing.salary && (
          <p className="text-sm text-emerald-600 font-semibold mt-3">{listing.salary}</p>
        )}

        {/* 마감일 */}
        <div className="flex items-center gap-1.5 mt-3 text-sm text-gray-500">
          <Clock className="w-3.5 h-3.5" />
          {deadline ? (
            <span className={daysLeft !== null && daysLeft <= 3 ? 'text-red-500 font-medium' : ''}>
              마감: {deadline.toLocaleDateString('ko-KR')}
              {daysLeft !== null && daysLeft >= 0 && ` (D-${daysLeft})`}
              {daysLeft !== null && daysLeft < 0 && ' (마감)'}
            </span>
          ) : '마감일 미정'}
        </div>
      </div>

      {/* 태그 */}
      {listing.tags.length > 0 && (
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-gray-400" />
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">기술 스택 / 태그</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {listing.tags.map(t => (
              <span key={t} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{t}</span>
            ))}
          </div>
        </div>
      )}

      {/* 공고 상세 */}
      {listing.description && (
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm p-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">공고 상세</p>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{listing.description}</p>
        </div>
      )}

      {/* 원본 링크 */}
      {listing.url && (
        <a
          href={listing.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full rounded-xl border border-gray-200 bg-white py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <ExternalLink className="w-4 h-4" /> 원본 공고 보기
        </a>
      )}

      {/* 핵심 연결: 이 공고로 자소서 작성 */}
      <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-amber-100 p-2 shrink-0">
            <FileEdit className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-900">이 공고로 자소서 작성하기</p>
            <p className="text-xs text-amber-600 mt-0.5">
              공고 정보가 자동으로 입력됩니다. 직군에 맞는 코칭 가이드도 함께 제공됩니다.
            </p>
          </div>
          <button
            type="button"
            onClick={goWriteCoverLetter}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors"
          >
            <FileEdit className="w-4 h-4" /> 자소서 작성
          </button>
        </div>
      </div>
    </div>
  );
}
