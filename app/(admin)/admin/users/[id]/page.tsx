'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Briefcase, FolderOpen, Map } from 'lucide-react';

type UserDetail = {
  id: string; email: string; name: string | null; major: string | null;
  targetJob: string | null; role: string; createdAt: string;
  jobPostings: { id: string; company: string; position: string; status: string; createdAt: string }[];
  portfolios: { id: string; title: string; createdAt: string }[];
  roadmapItems: { id: string; jobCategory: string; skill: string; status: string }[];
};

const statusLabels: Record<string, string> = {
  PREPARING: '서류 준비 중', APPLIED: '지원 완료', DOCUMENT_PASS: '서류 합격',
  INTERVIEW: '면접 예정', FINAL_PASS: '최종 합격', REJECTED: '불합격',
};
const statusDots: Record<string, string> = {
  PREPARING: 'bg-slate-400', APPLIED: 'bg-blue-500', DOCUMENT_PASS: 'bg-emerald-500',
  INTERVIEW: 'bg-amber-500', FINAL_PASS: 'bg-violet-500', REJECTED: 'bg-red-400',
};
const skillStatusDots: Record<string, string> = {
  NOT_STARTED: 'bg-gray-300', IN_PROGRESS: 'bg-blue-500', COMPLETED: 'bg-emerald-500',
};
const skillStatusLabels: Record<string, string> = {
  NOT_STARTED: '미시작', IN_PROGRESS: '학습 중', COMPLETED: '완료',
};

export default function AdminUserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: user, isLoading } = useQuery<UserDetail>({
    queryKey: ['admin-user', id],
    queryFn: async () => {
      const res = await fetch(`/api/admin/users/${id}`);
      if (!res.ok) throw new Error('Not found');
      return (await res.json()).data;
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-4 animate-pulse">
        <div className="h-5 w-24 bg-gray-200 rounded" />
        <div className="h-8 w-48 bg-gray-200 rounded" />
        <div className="h-48 bg-gray-100 rounded-xl" />
      </div>
    );
  }
  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
      <button
        type="button"
        onClick={() => router.push('/admin/users')}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> 사용자 목록
      </button>

      {/* 기본 정보 */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">사용자 정보</p>
            <h1 className="text-xl font-semibold text-gray-900">{user.name ?? '(이름 없음)'}</h1>
            <p className="text-sm text-gray-500 mt-1">{user.email}</p>
          </div>
          <span className={`text-xs font-medium rounded-full px-3 py-1 ${
            user.role === 'ADMIN' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'
          }`}>
            {user.role}
          </span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
          <div><p className="text-xs text-gray-400 mb-0.5">전공</p><p className="text-gray-700">{user.major ?? '-'}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">목표 직무</p><p className="text-gray-700">{user.targetJob ?? '-'}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">가입일</p><p className="text-gray-700">{new Date(user.createdAt).toLocaleDateString('ko-KR')}</p></div>
        </div>
      </div>

      {/* 채용 공고 */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="w-4 h-4 text-gray-400" />
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">채용 공고 ({user.jobPostings.length})</p>
        </div>
        {user.jobPostings.length === 0 ? (
          <p className="text-sm text-gray-400">없음</p>
        ) : (
          <div className="space-y-2">
            {user.jobPostings.map(j => (
              <div key={j.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{j.company}</p>
                  <p className="text-xs text-gray-400">{j.position}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 text-xs text-gray-500`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${statusDots[j.status] ?? 'bg-gray-400'}`} />
                  {statusLabels[j.status] ?? j.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 포트폴리오 */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FolderOpen className="w-4 h-4 text-gray-400" />
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">포트폴리오 ({user.portfolios.length})</p>
        </div>
        {user.portfolios.length === 0 ? (
          <p className="text-sm text-gray-400">없음</p>
        ) : (
          <div className="space-y-2">
            {user.portfolios.map(p => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <p className="text-sm font-medium text-gray-900">{p.title}</p>
                <p className="text-xs text-gray-400">{new Date(p.createdAt).toLocaleDateString('ko-KR')}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 로드맵 */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Map className="w-4 h-4 text-gray-400" />
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">로드맵 ({user.roadmapItems.length})</p>
        </div>
        {user.roadmapItems.length === 0 ? (
          <p className="text-sm text-gray-400">없음</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {user.roadmapItems.map(r => (
              <span key={r.id} className="inline-flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1 text-gray-600">
                <span className={`h-1.5 w-1.5 rounded-full ${skillStatusDots[r.status] ?? 'bg-gray-300'}`} />
                {r.skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
