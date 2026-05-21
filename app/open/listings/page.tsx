'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {
  Search, MapPin, Briefcase, GraduationCap, Clock,
  LogIn, ArrowRight, Zap, Lock,
} from 'lucide-react';

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
  tags: string[];
  createdAt: string;
};

async function fetchPublicListings(search: string): Promise<{ data: Listing[]; total: number }> {
  const res = await fetch(`/api/listings/public?search=${encodeURIComponent(search)}&limit=50`);
  if (!res.ok) throw new Error('Failed');
  return res.json();
}

export default function OpenListingsPage() {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['public-listings', search],
    queryFn: () => fetchPublicListings(search),
  });

  const listings = data?.data ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 로그인 유도 배너 */}
      <div className="bg-[#0f172a] text-white">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-black text-white">JF</span>
            </div>
            <span className="text-sm font-semibold">Job Filter</span>
            <span className="text-white/30 text-xs hidden sm:block">· 컴퓨터공학부 맞춤 취업 공고</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login"
              className="flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors">
              <LogIn className="w-3.5 h-3.5" /> 로그인
            </Link>
            <Link href="/register"
              className="flex items-center gap-1.5 text-xs font-semibold bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg transition-colors">
              회원가입 <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* 헤더 */}
        <div className="flex items-end justify-between border-b border-gray-200 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">공개 공고</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">채용 공고 목록</h1>
            <p className="text-xs text-gray-400 mt-1">컴퓨터공학부 학생에게 맞는 개발·IT·사무직 공고</p>
          </div>
          {total > 0 && (
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
              총 {total}개 공고
            </span>
          )}
        </div>

        {/* 로그인 유도 CTA */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 flex items-center gap-4">
          <div className="rounded-lg bg-blue-100 p-2.5 shrink-0">
            <Lock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-blue-900">로그인하면 더 많은 기능을 사용할 수 있어요</p>
            <p className="text-xs text-blue-600 mt-0.5">지원 목록 추가 · 자소서 코칭 · 매칭률 분석 · 마감 알림</p>
          </div>
          <Link href="/register"
            className="shrink-0 flex items-center gap-1.5 text-xs font-semibold bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
            무료 시작 <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 검색 */}
        <form onSubmit={e => { e.preventDefault(); setSearch(searchInput); }} className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="회사명, 직무, 지역 검색"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            className="w-full pl-9 pr-20 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
          />
          <button type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-medium bg-[#0f172a] text-white rounded-md">
            검색
          </button>
        </form>

        {/* 공고 목록 */}
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
            {listings.map(l => {
              const deadline = l.deadline ? new Date(l.deadline) : null;
              const daysLeft = deadline ? Math.ceil((deadline.getTime() - Date.now()) / 86400000) : null;
              const isNew = (Date.now() - new Date(l.createdAt).getTime()) < 7 * 86400000;
              const isUrgent = daysLeft !== null && daysLeft >= 0 && daysLeft <= 3;

              return (
                <div key={l.id} className={`rounded-xl border bg-white shadow-sm overflow-hidden ${isUrgent ? 'border-red-200' : 'border-gray-100'}`}>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                          <p className="text-xs font-medium text-gray-400">{l.company}</p>
                          {isNew && <span className="text-[10px] font-bold bg-blue-500 text-white px-1.5 py-0.5 rounded-full">NEW</span>}
                          {isUrgent && <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full">마감임박</span>}
                        </div>
                        <p className="text-base font-semibold text-gray-900 leading-snug">{l.position}</p>
                      </div>
                      {/* 로그인 유도 버튼 */}
                      <Link
                        href={`/login?callbackUrl=/listings`}
                        className="shrink-0 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <LogIn className="w-3.5 h-3.5" /> 로그인 후 추가
                      </Link>
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
                        {l.tags.slice(0, 5).map(t => (
                          <span key={t} className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>
                        ))}
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
                    <Link
                      href={`/login?callbackUrl=/listings`}
                      className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-800 font-medium transition-colors"
                    >
                      <Zap className="w-3 h-3" /> 자소서 코칭 받기
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 하단 CTA */}
        {listings.length > 0 && (
          <div className="rounded-xl border-2 border-dashed border-gray-200 bg-white py-10 text-center">
            <p className="text-sm font-semibold text-gray-700 mb-1">마음에 드는 공고를 찾으셨나요?</p>
            <p className="text-xs text-gray-400 mb-4">로그인하면 지원 목록 추가, 자소서 코칭, 매칭률 분석을 이용할 수 있어요</p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0f172a] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1e293b] transition-colors">
                무료 회원가입 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/login"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                로그인
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
