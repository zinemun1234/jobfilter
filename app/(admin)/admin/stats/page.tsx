'use client';

import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell,
} from 'recharts';
import { Users, Briefcase, TrendingUp, ClipboardList, UserPlus, ArrowUpRight, BarChart2, Download, Printer } from 'lucide-react';
import Link from 'next/link';
import { STATUS_CONFIG } from '@/lib/status-config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type StatsData = {
  summary: {
    totalUsers: number;
    newUsersThisWeek: number;
    totalApplied: number;
    newJobsThisWeek: number;
    finalPassCount: number;
    employmentRate: number;
    activeListings: number;
    confirmedEmployment: number;
    confirmedRate: number;
  };
  monthlyApplications: { month: string; 지원: number; 합격: number }[];
  statusDistribution: { name: string; value: number; status: string }[];
  jobTypeDistribution: { name: string; value: number }[];
  goalDistribution: { name: string; value: number }[];
};

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316'];
const statusHex = (s: string) => STATUS_CONFIG[s as keyof typeof STATUS_CONFIG]?.hex ?? '#94a3b8';
const STATUS_ORDER = ['PREPARING', 'APPLIED', 'DOCUMENT_PASS', 'INTERVIEW', 'FINAL_PASS', 'REJECTED'];

async function fetchStats(from: string, to: string): Promise<StatsData> {
  const params = new URLSearchParams();
  if (from) params.set('from', from);
  if (to) params.set('to', to);
  const res = await fetch(`/api/admin/stats?${params.toString()}`);
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

function EmptyChart({ message = '데이터가 없습니다' }: { message?: string }) {
  return (
    <div className="h-52 flex flex-col items-center justify-center gap-2">
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
        <BarChart2 className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-xs text-muted-foreground">{message}</p>
    </div>
  );
}

export default function AdminStatsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const from = searchParams.get('from') ?? '';
  const to = searchParams.get('to') ?? '';

  const setDate = useCallback(
    (key: 'from' | 'to', value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  const { data, isLoading } = useQuery({
    queryKey: ['admin-stats', from, to],
    queryFn: () => fetchStats(from, to),
    staleTime: 60000,
  });

  const handleCsvDownload = useCallback(() => {
    const params = new URLSearchParams();
    if (from) params.set('from', from);
    if (to) params.set('to', to);
    params.set('format', 'csv');
    window.open(`/api/admin/reports?${params.toString()}`, '_blank');
  }, [from, to]);

  const handlePrint = useCallback(() => {
    const params = new URLSearchParams();
    if (from) params.set('from', from);
    if (to) params.set('to', to);
    window.open(`/admin/stats/print?${params.toString()}`, '_blank');
  }, [from, to]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6 animate-pulse">
        <div className="h-8 bg-muted rounded w-48" />
        <div className="h-14 bg-muted rounded" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-muted rounded-2xl" />)}
        </div>
        <div className="h-72 bg-muted rounded-2xl" />
        <div className="grid lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <div key={i} className="h-72 bg-muted rounded-2xl" />)}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const {
    summary,
    monthlyApplications,
    statusDistribution,
    jobTypeDistribution,
    goalDistribution,
  } = data;

  const monthlyData = monthlyApplications;
  const statusData = statusDistribution;
  const jobCategoryData = jobTypeDistribution;
  const targetJobData = goalDistribution;

  // 상태 순서 정렬
  const sortedStatusData = [...statusData].sort(
    (a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status),
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      {/* 헤더 */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-border pb-5">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">Admin</p>
          <h1 className="text-xl font-semibold text-foreground">취업 통계 대시보드</h1>
          <p className="text-xs text-muted-foreground mt-1">플랫폼 전체 취업 현황 및 학생 활동 데이터</p>
        </div>
        <Link href="/admin" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
          관리 홈 <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>

      {/* 날짜 필터 & export */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-end justify-between rounded-2xl border border-border bg-background p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="space-y-1.5">
            <Label htmlFor="from" className="text-xs text-muted-foreground">시작일</Label>
            <Input
              id="from"
              type="date"
              value={from}
              onChange={(e) => setDate('from', e.target.value)}
              className="w-40"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="to" className="text-xs text-muted-foreground">종료일</Label>
            <Input
              id="to"
              type="date"
              value={to}
              onChange={(e) => setDate('to', e.target.value)}
              className="w-40"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="sm" onClick={handleCsvDownload} className="gap-1.5">
            <Download className="w-4 h-4" />
            CSV 다운로드
          </Button>
          <Button type="button" size="sm" onClick={handlePrint} className="gap-1.5 bg-primary text-primary-foreground">
            <Printer className="w-4 h-4" />
            인쇄
          </Button>
        </div>
      </div>

      {/* 핵심 지표 카드 4개 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 가입 학생 */}
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-xl bg-blue-100 p-2.5">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            {summary.newUsersThisWeek > 0 && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <UserPlus className="w-2.5 h-2.5" /> +{summary.newUsersThisWeek}
              </span>
            )}
          </div>
          <p className="text-3xl font-bold text-foreground">{summary.totalUsers.toLocaleString()}</p>
          <p className="text-xs font-medium text-muted-foreground mt-1">가입 학생</p>
          {summary.newUsersThisWeek > 0 && (
            <p className="text-[11px] text-blue-400 mt-0.5">이번 주 {summary.newUsersThisWeek}명 신규</p>
          )}
        </div>

        {/* 전체 지원 */}
        <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-xl bg-violet-100 p-2.5">
              <Briefcase className="w-4 h-4 text-violet-600" />
            </div>
            {summary.newJobsThisWeek > 0 && (
              <span className="text-xs font-bold text-violet-600 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full">
                +{summary.newJobsThisWeek}건
              </span>
            )}
          </div>
          <p className="text-3xl font-bold text-foreground">{summary.totalApplied.toLocaleString()}</p>
          <p className="text-xs font-medium text-muted-foreground mt-1">전체 지원</p>
          <p className="text-[11px] text-violet-400 mt-0.5">누적 지원 건수</p>
        </div>

        {/* 최종합격 + 취업률 */}
        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-xl bg-emerald-100 p-2.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              summary.employmentRate >= 30 ? 'bg-emerald-100 text-emerald-700' :
              summary.employmentRate >= 10 ? 'bg-amber-50 text-amber-600' :
              'bg-gray-100 text-gray-500'
            }`}>
              {summary.employmentRate}%
            </span>
          </div>
          <p className="text-3xl font-bold text-foreground">{summary.finalPassCount.toLocaleString()}</p>
          <p className="text-xs font-medium text-muted-foreground mt-1">최종 합격</p>
          <p className="text-[11px] text-emerald-500 mt-0.5">취업률 {summary.employmentRate}%</p>
        </div>

        {/* 활성 공고 */}
        <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-xl bg-amber-100 p-2.5">
              <ClipboardList className="w-4 h-4 text-amber-600" />
            </div>
            <Link href="/admin/listings" className="text-xs text-amber-500 hover:underline">관리 →</Link>
          </div>
          <p className="text-3xl font-bold text-foreground">{summary.activeListings.toLocaleString()}</p>
          <p className="text-xs font-medium text-muted-foreground mt-1">활성 공고</p>
          <p className="text-[11px] text-amber-400 mt-0.5">현재 게시 중</p>
        </div>
      </div>

      {/* 월별 추이 — 전체 너비 */}
      <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm font-semibold text-foreground">월별 지원 · 합격 추이</p>
            <p className="text-xs text-muted-foreground mt-0.5">{from && to ? `${from} ~ ${to}` : '최근 6개월'}</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-blue-500 inline-block rounded" /> 지원</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-emerald-500 inline-block rounded" /> 합격</span>
          </div>
        </div>
        {monthlyData.every(d => d['지원'] === 0) ? (
          <EmptyChart />
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyData} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
                cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
              />
              <Line type="monotone" dataKey="지원" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: '#3b82f6', r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="합격" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* 하단 3열 차트 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* 지원 상태 분포 — 도넛 + 범례 */}
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <p className="text-sm font-semibold text-foreground mb-1">지원 상태 분포</p>
          <p className="text-xs text-muted-foreground mb-4">전체 {summary.totalApplied}건</p>
          {sortedStatusData.length === 0 ? (
            <EmptyChart />
          ) : (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={sortedStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={78}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {sortedStatusData.map((entry, i) => (
                      <Cell key={entry.status} fill={statusHex(entry.status) ?? PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                    formatter={(val: unknown) => [`${val}건`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <ul className="space-y-1.5 mt-2">
                {sortedStatusData.map(entry => (
                  <li key={entry.status} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: statusHex(entry.status) ?? '#94a3b8' }} />
                      <span className="text-muted-foreground">{entry.name}</span>
                    </span>
                    <span className="font-semibold text-foreground">{entry.value}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* 직군별 최종합격 */}
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <p className="text-sm font-semibold text-foreground mb-1">직군별 최종합격</p>
          <p className="text-xs text-muted-foreground mb-4">총 {summary.finalPassCount}명</p>
          {jobCategoryData.length === 0 ? (
            <EmptyChart message="최종합격 데이터가 없습니다" />
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={jobCategoryData} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                  formatter={(val: unknown) => [`${val}명`, '합격자']}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={40}>
                  {jobCategoryData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* 학생 목표직무 분포 */}
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <p className="text-sm font-semibold text-foreground mb-1">학생 목표직무</p>
          <p className="text-xs text-muted-foreground mb-4">상위 8개 직무</p>
          {targetJobData.length === 0 ? (
            <EmptyChart />
          ) : (
            <ul className="space-y-2.5">
              {targetJobData.map((item, i) => {
                const max = targetJobData[0].value;
                const pct = Math.round((item.value / max) * 100);
                return (
                  <li key={item.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground truncate max-w-[140px]">{item.name}</span>
                      <span className="text-xs font-semibold text-foreground ml-2">{item.value}명</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                      />
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
