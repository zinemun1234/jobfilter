import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ClipboardList, AlertCircle, CheckCircle2 } from 'lucide-react';

export default async function RecruiterDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== 'RECRUITER') redirect('/dashboard');

  const [user, listings] = await Promise.all([
    prisma.user.findUnique({ where: { id: session.user.id }, select: { isApproved: true, companyName: true, companyDesc: true } }),
    prisma.jobListing.findMany({
      where: { recruiterId: session.user.id },
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { bookmarks: true, applications: true } } },
    }),
  ]);

  if (!user) redirect('/login');

  const activeCount = listings.filter(l => l.isActive).length;
  const inactiveCount = listings.filter(l => !l.isActive).length;
  const totalViews = listings.reduce((sum, l) => sum + l.viewCount, 0);
  const totalApplications = listings.reduce((sum, l) => sum + l._count.applications, 0);
  const avgConversionRate = totalViews > 0 ? ((totalApplications / totalViews) * 100).toFixed(1) : '-';
  const rejectedCount = listings.filter(l => !l.isActive && l.rejectionReason).length;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">{user.companyName ?? '기업'} 대시보드</h1>
          <p className="text-sm text-slate-500">등록한 공고와 승인 상태를 확인하세요.</p>
        </div>
        {user.isApproved ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5" /> 승인 완료</span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600"><AlertCircle className="h-3.5 w-3.5" /> 승인 대기</span>
        )}
      </div>

      {!user.isApproved && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
          <p className="text-sm font-medium text-amber-800">관리자 승인 후 공고 등록이 가능합니다.</p>
          <p className="mt-1 text-xs text-amber-600">승인 완료 시 자동으로 공고 등록 페이지가 활성화됩니다.</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-xs text-slate-400">전체 공고</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{listings.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-xs text-slate-400">게시 중</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{activeCount}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-xs text-slate-400">대기/비공개</p>
          <p className="mt-1 text-2xl font-bold text-slate-500">{inactiveCount}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-900">통계</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-xs text-slate-400">총 조회수</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{totalViews.toLocaleString('ko-KR')}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-xs text-slate-400">평균 지원 전환율</p>
            <p className={`mt-1 text-2xl font-bold ${avgConversionRate === '-' ? 'text-slate-400' : 'text-slate-900'}`}>{avgConversionRate === '-' ? '-' : `${avgConversionRate}%`}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-xs text-slate-400">승인된 공고</p>
            <p className="mt-1 text-2xl font-bold text-emerald-600">{activeCount}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-xs text-slate-400">반려된 공고</p>
            <p className="mt-1 text-2xl font-bold text-red-500">{rejectedCount}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">최근 공고</h2>
          <Link href="/recruiter/listings" className="text-xs text-primary hover:underline">전체 보기</Link>
        </div>
        {listings.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">등록한 공고가 없습니다.</p>
        ) : (
          <ul className="divide-y divide-slate-50">
            {listings.slice(0, 5).map(l => (
              <li key={l.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-slate-900">{l.position}</p>
                  <p className="text-xs text-slate-400">{l.deadline ? new Date(l.deadline).toLocaleDateString('ko-KR') : '상시'}</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-400">찜 {l._count.bookmarks}</span>
                  <span className="text-slate-400">지원 {l._count.applications}</span>
                  <span className={`rounded-full px-2 py-0.5 font-medium ${l.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>{l.isActive ? '게시 중' : '대기'}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex gap-3">
        <Link
          href="/recruiter/listings"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
        >
          <ClipboardList className="h-4 w-4" />
          공고 관리
        </Link>
      </div>
    </div>
  );
}
