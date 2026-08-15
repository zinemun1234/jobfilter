import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getAdminStats } from '@/lib/admin-stats';
import type { AdminStatsData } from '@/lib/admin-stats';

export default async function AdminStatsPrintPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== 'ADMIN') {
    redirect('/login');
  }

  const from = typeof searchParams.from === 'string' ? searchParams.from : '';
  const to = typeof searchParams.to === 'string' ? searchParams.to : '';

  let data: AdminStatsData;
  try {
    data = await getAdminStats(from, to);
  } catch {
    data = await getAdminStats('', '');
  }

  const rangeLabel = from && to ? `${from} ~ ${to}` : from ? `${from} ~` : to ? `~ ${to}` : '전체 기간';

  return (
    <div className="min-h-screen bg-background text-foreground p-8 print:p-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="border-b border-border pb-4 print:pb-2">
          <h1 className="text-2xl font-bold text-foreground">JobFilter 관리자 통계 리포트</h1>
          <p className="text-sm text-muted-foreground mt-1">
            조회 기간: {rangeLabel} | 생성일: {new Date().toLocaleDateString('ko-KR')}
          </p>
        </header>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">요약</h2>
          <table className="w-full text-sm border border-border">
            <tbody className="divide-y divide-border">
              <tr className="grid grid-cols-2 md:table-row">
                <td className="p-2 text-muted-foreground bg-muted/30">가입 학생</td>
                <td className="p-2 font-medium">{data.summary.totalUsers.toLocaleString()}명</td>
              </tr>
              <tr className="grid grid-cols-2 md:table-row">
                <td className="p-2 text-muted-foreground bg-muted/30">최근 7일 신규 학생</td>
                <td className="p-2 font-medium">{data.summary.newUsersThisWeek.toLocaleString()}명</td>
              </tr>
              <tr className="grid grid-cols-2 md:table-row">
                <td className="p-2 text-muted-foreground bg-muted/30">전체 지원</td>
                <td className="p-2 font-medium">{data.summary.totalApplied.toLocaleString()}건</td>
              </tr>
              <tr className="grid grid-cols-2 md:table-row">
                <td className="p-2 text-muted-foreground bg-muted/30">최근 7일 지원</td>
                <td className="p-2 font-medium">{data.summary.newJobsThisWeek.toLocaleString()}건</td>
              </tr>
              <tr className="grid grid-cols-2 md:table-row">
                <td className="p-2 text-muted-foreground bg-muted/30">최종 합격</td>
                <td className="p-2 font-medium">{data.summary.finalPassCount.toLocaleString()}명</td>
              </tr>
              <tr className="grid grid-cols-2 md:table-row">
                <td className="p-2 text-muted-foreground bg-muted/30">취업률</td>
                <td className="p-2 font-medium">{data.summary.employmentRate}%</td>
              </tr>
              <tr className="grid grid-cols-2 md:table-row">
                <td className="p-2 text-muted-foreground bg-muted/30">활성 공고</td>
                <td className="p-2 font-medium">{data.summary.activeListings.toLocaleString()}건</td>
              </tr>
              <tr className="grid grid-cols-2 md:table-row">
                <td className="p-2 text-muted-foreground bg-muted/30">취업 확정</td>
                <td className="p-2 font-medium">{data.summary.confirmedEmployment.toLocaleString()}명</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">월별 지원 · 합격 추이</h2>
          <table className="w-full text-sm border border-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-2 text-left text-muted-foreground font-medium border-b border-border">월</th>
                <th className="p-2 text-left text-muted-foreground font-medium border-b border-border">지원</th>
                <th className="p-2 text-left text-muted-foreground font-medium border-b border-border">합격</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.monthlyApplications.map((m) => (
                <tr key={m.month}>
                  <td className="p-2">{m.month}</td>
                  <td className="p-2">{m['지원']}</td>
                  <td className="p-2">{m['합격']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="grid md:grid-cols-2 gap-8 print:grid-cols-2">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">지원 상태 분포</h2>
            <table className="w-full text-sm border border-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-2 text-left text-muted-foreground font-medium border-b border-border">상태</th>
                  <th className="p-2 text-left text-muted-foreground font-medium border-b border-border">건수</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.statusDistribution.map((s) => (
                  <tr key={s.status}>
                    <td className="p-2">{s.name}</td>
                    <td className="p-2">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">직군별 최종 합격</h2>
            <table className="w-full text-sm border border-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-2 text-left text-muted-foreground font-medium border-b border-border">직군</th>
                  <th className="p-2 text-left text-muted-foreground font-medium border-b border-border">합격자 수</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.jobTypeDistribution.map((j) => (
                  <tr key={j.name}>
                    <td className="p-2">{j.name}</td>
                    <td className="p-2">{j.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">학생 목표 직무 분포</h2>
          <table className="w-full text-sm border border-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-2 text-left text-muted-foreground font-medium border-b border-border">목표 직무</th>
                <th className="p-2 text-left text-muted-foreground font-medium border-b border-border">인원</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.goalDistribution.map((g) => (
                <tr key={g.name}>
                  <td className="p-2">{g.name}</td>
                  <td className="p-2">{g.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="grid md:grid-cols-2 gap-8 print:grid-cols-2">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">최근 가입 학생</h2>
            <table className="w-full text-sm border border-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-2 text-left text-muted-foreground font-medium border-b border-border">이름</th>
                  <th className="p-2 text-left text-muted-foreground font-medium border-b border-border">이메일</th>
                  <th className="p-2 text-left text-muted-foreground font-medium border-b border-border">가입일</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.recentActivities.recentUsers.map((u) => (
                  <tr key={u.id}>
                    <td className="p-2">{u.name ?? '(이름 없음)'}</td>
                    <td className="p-2">{u.email}</td>
                    <td className="p-2">{new Date(u.createdAt).toLocaleDateString('ko-KR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">최근 등록 공고</h2>
            <table className="w-full text-sm border border-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-2 text-left text-muted-foreground font-medium border-b border-border">회사</th>
                  <th className="p-2 text-left text-muted-foreground font-medium border-b border-border">직책</th>
                  <th className="p-2 text-left text-muted-foreground font-medium border-b border-border">등록일</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.recentActivities.recentListings.map((l) => (
                  <tr key={l.id}>
                    <td className="p-2">{l.company}</td>
                    <td className="p-2">{l.position}</td>
                    <td className="p-2">{new Date(l.createdAt).toLocaleDateString('ko-KR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
}
