'use client';

import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Briefcase, Award, Clock } from 'lucide-react';
import SkeletonCard from '@/components/ui/SkeletonCard';

export type PersonalStatsData = {
  totalApplications: number;
  finalPassCount: number;
  finalPassRate: number;
  interviewOrPassCount: number;
  interviewOrPassRate: number;
  averageProcessDays: number | null;
  monthlyStats: { month: string; 지원: number; 합격: number }[];
};

async function fetchPersonalStats(): Promise<PersonalStatsData> {
  const res = await fetch('/api/dashboard/personal-stats');
  if (!res.ok) throw new Error('Failed to fetch personal stats');
  return (await res.json()).data;
}

export default function PersonalStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['personal-stats'],
    queryFn: fetchPersonalStats,
  });

  if (isLoading || !stats) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white shadow-lg p-6">
        <SkeletonCard />
      </div>
    );
  }

  const hasData = stats.totalApplications > 0;

  return (
    <div className="rounded-3xl border border-gray-200 bg-white shadow-lg p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">내 지원 통계</p>
          <p className="text-xs text-gray-400 mt-0.5">최근 6개월 지원·합격 추이</p>
        </div>
      </div>

      {/* 핵심 지표 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-gray-500">총 지원</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-emerald-600" />
            <span className="text-xs text-gray-500">최종 합격</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.finalPassCount}</p>
          <p className="text-xs text-emerald-600 font-medium mt-0.5">{stats.finalPassRate}%</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-amber-600" />
            <span className="text-xs text-gray-500">면접 이상</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.interviewOrPassCount}</p>
          <p className="text-xs text-amber-600 font-medium mt-0.5">{stats.interviewOrPassRate}%</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-violet-600" />
            <span className="text-xs text-gray-500">평균 소요일</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.averageProcessDays ?? '-'}</p>
          <p className="text-xs text-violet-600 font-medium mt-0.5">일</p>
        </div>
      </div>

      {/* 차트 */}
      {hasData ? (
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.monthlyStats} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 12 }}
                labelStyle={{ color: '#111827', fontWeight: 700 }}
              />
              <Line
                type="monotone"
                dataKey="지원"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={{ fill: '#3b82f6', r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="합격"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={{ fill: '#10b981', r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-40 flex flex-col items-center justify-center gap-2 rounded-2xl bg-gray-50 text-center">
          <p className="text-sm text-gray-500">아직 지원 데이터가 없습니다</p>
          <p className="text-xs text-gray-400">공고를 추가하면 통계가 표시됩니다</p>
        </div>
      )}
    </div>
  );
}
