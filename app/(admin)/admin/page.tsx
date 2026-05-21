'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {
  Users, Briefcase, TrendingUp, ClipboardList,
  UserPlus, ChevronRight, BarChart2, MessageSquare,
  FileText, HelpCircle, Bell, ArrowUpRight,
} from 'lucide-react';

type StatsData = {
  summary: {
    totalUsers: number;
    newUsersThisWeek: number;
    totalApplied: number;
    newJobsThisWeek: number;
    finalPassCount: number;
    employmentRate: number;
    activeListings: number;
  };
  recentUsers: { id: string; name: string | null; email: string; targetJob: string | null; createdAt: string }[];
  recentListings: { id: string; company: string; position: string; deadline: string | null; createdAt: string }[];
};

async function fetchStats(): Promise<StatsData> {
  const res = await fetch('/api/admin/stats');
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

const NAV_ITEMS = [
  { href: '/admin/users', icon: Users, label: '사용자 관리', desc: '가입 학생 조회 및 권한 관리', color: 'blue' },
  { href: '/admin/listings', icon: ClipboardList, label: '채용공고 관리', desc: '공고 등록·수정·활성화', color: 'amber' },
  { href: '/admin/stats', icon: BarChart2, label: '취업 통계', desc: '지원 현황 및 합격률 분석', color: 'violet' },
  { href: '/admin/notices', icon: Bell, label: '공지사항', desc: '전체 공지 작성 및 관리', color: 'emerald' },
  { href: '/admin/questions', icon: HelpCircle, label: '면접 질문', desc: '면접 질문 풀 관리', color: 'rose' },
  { href: '/admin/bulk-jobs', icon: FileText, label: '일괄 작업', desc: '공고 일괄 처리', color: 'gray' },
];

const COLOR_MAP: Record<string, { bg: string; icon: string; badge: string }> = {
  blue:   { bg: 'bg-blue-50',   icon: 'text-blue-600',   badge: 'bg-blue-100' },
  amber:  { bg: 'bg-amber-50',  icon: 'text-amber-600',  badge: 'bg-amber-100' },
  violet: { bg: 'bg-violet-50', icon: 'text-violet-600', badge: 'bg-violet-100' },
  emerald:{ bg: 'bg-emerald-50',icon: 'text-emerald-600',badge: 'bg-emerald-100' },
  rose:   { bg: 'bg-rose-50',   icon: 'text-rose-600',   badge: 'bg-rose-100' },
  gray:   { bg: 'bg-gray-100',  icon: 'text-gray-600',   badge: 'bg-gray-200' },
};

export default function AdminHomePage() {
  const { data, isLoading } = useQuery({ queryKey: ['admin-stats-detail'], queryFn: fetchStats });

  const summary = data?.summary;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      {/* 헤더 */}
      <div className="border-b border-gray-200 pb-5">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Admin</p>
        <h1 className="text-xl font-semibold text-gray-900">관리자 홈</h1>
        <p className="text-xs text-gray-400 mt-1">플랫폼 현황을 한눈에 확인하고 관리 메뉴로 이동하세요</p>
      </div>

      {/* 핵심 지표 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          [...Array(4)].map((_, i) => <div key={i} className="h-28 bg-gray-100 rounded-2xl animate-pulse" />)
        ) : (
          <>
            <StatCard
              icon={<Users className="w-4 h-4 text-blue-600" />}
              iconBg="bg-blue-100"
              value={summary?.totalUsers ?? 0}
              label="가입 학생"
              badge={summary?.newUsersThisWeek ? `+${summary.newUsersThisWeek} 이번 주` : undefined}
              badgeColor="text-emerald-600 bg-emerald-50"
              border="border-blue-100"
              gradient="from-blue-50"
            />
            <StatCard
              icon={<Briefcase className="w-4 h-4 text-violet-600" />}
              iconBg="bg-violet-100"
              value={summary?.totalApplied ?? 0}
              label="전체 지원"
              badge={summary?.newJobsThisWeek ? `+${summary.newJobsThisWeek}건` : undefined}
              badgeColor="text-violet-600 bg-violet-50"
              border="border-violet-100"
              gradient="from-violet-50"
            />
            <StatCard
              icon={<TrendingUp className="w-4 h-4 text-emerald-600" />}
              iconBg="bg-emerald-100"
              value={summary?.finalPassCount ?? 0}
              label="최종 합격"
              badge={summary?.employmentRate !== undefined ? `취업률 ${summary.employmentRate}%` : undefined}
              badgeColor="text-emerald-700 bg-emerald-100"
              border="border-emerald-100"
              gradient="from-emerald-50"
            />
            <StatCard
              icon={<ClipboardList className="w-4 h-4 text-amber-600" />}
              iconBg="bg-amber-100"
              value={summary?.activeListings ?? 0}
              label="활성 공고"
              badge="현재 게시 중"
              badgeColor="text-amber-600 bg-amber-50"
              border="border-amber-100"
              gradient="from-amber-50"
            />
          </>
        )}
      </div>

      {/* 관리 메뉴 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {NAV_ITEMS.map(({ href, icon: Icon, label, desc, color }) => {
          const c = COLOR_MAP[color];
          return (
            <Link
              key={href}
              href={href}
              className="group flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md hover:border-gray-200 transition-all"
            >
              <div className={`rounded-xl p-2.5 ${c.bg} shrink-0`}>
                <Icon className={`w-4 h-4 ${c.icon}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-[#0f172a]">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 shrink-0 mt-0.5 transition-colors" />
            </Link>
          );
        })}
      </div>

      {/* 최근 가입 / 최근 공고 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* 최근 가입 학생 */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-blue-500" />
              <p className="text-sm font-semibold text-gray-800">최근 가입 학생</p>
            </div>
            <Link href="/admin/users" className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-0.5">
              전체 보기 <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          {isLoading ? (
            <div className="p-4 space-y-3 animate-pulse">
              {[...Array(4)].map((_, i) => <div key={i} className="h-10 bg-gray-100 rounded" />)}
            </div>
          ) : !data?.recentUsers?.length ? (
            <div className="py-10 text-center text-xs text-gray-400">가입 학생이 없습니다</div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {data.recentUsers.map(u => (
                <li key={u.id}>
                  <Link href={`/admin/users/${u.id}`} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50/50 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{u.name ?? '(이름 없음)'}</p>
                      <p className="text-xs text-gray-400">{u.email}</p>
                    </div>
                    <div className="text-right">
                      {u.targetJob && <p className="text-xs text-gray-500">{u.targetJob}</p>}
                      <p className="text-[11px] text-gray-300 tabular-nums">
                        {new Date(u.createdAt).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 최근 등록 공고 */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-amber-500" />
              <p className="text-sm font-semibold text-gray-800">최근 등록 공고</p>
            </div>
            <Link href="/admin/listings" className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-0.5">
              전체 보기 <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          {isLoading ? (
            <div className="p-4 space-y-3 animate-pulse">
              {[...Array(4)].map((_, i) => <div key={i} className="h-10 bg-gray-100 rounded" />)}
            </div>
          ) : !data?.recentListings?.length ? (
            <div className="py-10 text-center text-xs text-gray-400">등록된 공고가 없습니다</div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {data.recentListings.map(l => {
                const deadline = l.deadline ? new Date(l.deadline) : null;
                const daysLeft = deadline ? Math.ceil((deadline.getTime() - Date.now()) / 86400000) : null;
                return (
                  <li key={l.id} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50/50 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{l.company}</p>
                      <p className="text-xs text-gray-400">{l.position}</p>
                    </div>
                    <div className="text-right">
                      {deadline ? (
                        <p className={`text-xs tabular-nums ${daysLeft !== null && daysLeft <= 3 ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                          {deadline.toLocaleDateString('ko-KR')}
                          {daysLeft !== null && daysLeft >= 0 && <span className="ml-1 text-gray-400">D-{daysLeft}</span>}
                        </p>
                      ) : (
                        <p className="text-xs text-gray-300">마감일 없음</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon, iconBg, value, label, badge, badgeColor, border, gradient,
}: {
  icon: React.ReactNode;
  iconBg: string;
  value: number;
  label: string;
  badge?: string;
  badgeColor?: string;
  border: string;
  gradient: string;
}) {
  return (
    <div className={`rounded-2xl border ${border} bg-gradient-to-br ${gradient} to-white p-5 shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`rounded-xl ${iconBg} p-2.5`}>{icon}</div>
        {badge && (
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}>{badge}</span>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
      <p className="text-xs font-medium text-gray-500 mt-1">{label}</p>
    </div>
  );
}
