import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Edit2, Users } from 'lucide-react';
import { ListingActions } from './ListingActions';

export default async function RecruiterListingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== 'RECRUITER') redirect('/dashboard');

  const [user, listings] = await Promise.all([
    prisma.user.findUnique({ where: { id: session.user.id }, select: { isApproved: true } }),
    prisma.jobListing.findMany({
      where: { recruiterId: session.user.id },
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { bookmarks: true, applications: true } } },
    }),
  ]);

  if (!user) redirect('/login');

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">공고 관리</h1>
          <p className="text-sm text-slate-500">등록한 공고를 확인하고 관리하세요.</p>
        </div>
        {user.isApproved ? (
          <Link href="/recruiter/listings/new" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90">
            <Plus className="h-4 w-4" /> 공고 등록
          </Link>
        ) : (
          <span className="inline-flex items-center rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-400">
            승인 대기 중
          </span>
        )}
      </div>

      {listings.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-sm text-slate-400">등록한 공고가 없습니다.</p>
          {user.isApproved && (
            <Link href="/recruiter/listings/new" className="mt-4 inline-block text-sm text-primary hover:underline">첫 공고 등록하기</Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {listings.map(l => (
            <div key={l.id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{l.position}</h3>
                <p className="text-xs text-slate-500">{l.company} · {l.deadline ? new Date(l.deadline).toLocaleDateString('ko-KR') : '상시'} · 찜 {l._count.bookmarks.toLocaleString('ko-KR')} · 지원 {l._count.applications.toLocaleString('ko-KR')} · 조회 {l.viewCount.toLocaleString('ko-KR')}</p>
                {!l.isActive && l.rejectionReason && (
                  <p className="text-xs text-red-500 mt-1">반려 사유: {l.rejectionReason}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${l.viewCount > 0 ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                  {l.viewCount > 0 ? `지원률 ${((l._count.applications / l.viewCount) * 100).toFixed(1)}%` : '조회 0'}
                </span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${l.isActive ? 'bg-emerald-50 text-emerald-600' : l.rejectionReason ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                  {l.isActive ? '게시 중' : l.rejectionReason ? '반려' : '대기/비공개'}
                </span>
                <Link href={`/recruiter/listings/${l.id}/applicants`} className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-primary" title="지원자">
                  <Users className="h-4 w-4" />
                </Link>
                <Link href={`/recruiter/listings/${l.id}/edit`} className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-primary">
                  <Edit2 className="h-4 w-4" />
                </Link>
                <ListingActions id={l.id} isActive={l.isActive} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
