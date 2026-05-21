/**
 * GET /api/admin/stats
 * 관리자 통계 대시보드 데이터 (ADMIN 전용)
 *
 * 반환 데이터:
 * - summary: 가입자수, 이번주 신규, 전체 지원수, 최종합격수, 취업률, 활성공고수
 * - monthlyData: 최근 6개월 월별 지원/합격 추이
 * - statusData: 지원 상태별 분포
 * - jobCategoryData: 최종합격 직군별 분포 (직무명 키워드 기반 분류)
 * - targetJobData: 학생 목표 직무 분포 (상위 8개)
 * - recentUsers: 최근 가입 학생 5명
 * - recentListings: 최근 등록 공고 5개
 */
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [totalUsers, newUsersThisWeek] = await Promise.all([
    prisma.user.count({ where: { role: 'USER' } }),
    prisma.user.count({ where: { role: 'USER', createdAt: { gte: weekAgo } } }),
  ]);

  const allJobs = await prisma.jobPosting.findMany({
    select: { status: true, createdAt: true, userId: true },
  });

  const newJobsThisWeek = allJobs.filter(j => new Date(j.createdAt) >= weekAgo).length;

  const statusCounts: Record<string, number> = {};
  for (const job of allJobs) {
    statusCounts[job.status] = (statusCounts[job.status] ?? 0) + 1;
  }

  const finalPassCount = statusCounts['FINAL_PASS'] ?? 0;
  const totalApplied = allJobs.length;
  const employmentRate = totalApplied > 0 ? Math.round((finalPassCount / totalApplied) * 100) : 0;

  const finalPassJobs = await prisma.jobPosting.findMany({
    where: { status: 'FINAL_PASS' },
    select: { position: true },
  });

  const jobCategoryMap: Record<string, number> = {};
  for (const job of finalPassJobs) {
    const pos = job.position.toLowerCase();
    let cat = '기타';
    if (pos.includes('프론트') || pos.includes('front') || pos.includes('react') || pos.includes('vue')) cat = '프론트엔드';
    else if (pos.includes('백엔드') || pos.includes('back') || pos.includes('서버') || pos.includes('spring') || pos.includes('node')) cat = '백엔드';
    else if (pos.includes('풀스택') || pos.includes('full')) cat = '풀스택';
    else if (pos.includes('데이터') || pos.includes('data') || pos.includes('ai') || pos.includes('ml')) cat = '데이터/AI';
    else if (pos.includes('devops') || pos.includes('클라우드') || pos.includes('인프라')) cat = 'DevOps';
    else if (pos.includes('보안') || pos.includes('security')) cat = '보안';
    else if (pos.includes('기획') || pos.includes('pm') || pos.includes('ux')) cat = 'IT기획/PM';
    else if (pos.includes('개발') || pos.includes('engineer') || pos.includes('엔지니어')) cat = '개발(기타)';
    jobCategoryMap[cat] = (jobCategoryMap[cat] ?? 0) + 1;
  }

  const jobCategoryData = Object.entries(jobCategoryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const recentJobs = await prisma.jobPosting.findMany({
    where: { createdAt: { gte: sixMonthsAgo } },
    select: { createdAt: true, status: true },
  });

  const monthlyMap: Record<string, { month: string; 지원: number; 합격: number }> = {};
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = `${d.getMonth() + 1}월`;
    monthlyMap[key] = { month: label, 지원: 0, 합격: 0 };
  }

  for (const job of recentJobs) {
    const d = new Date(job.createdAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (monthlyMap[key]) {
      monthlyMap[key]['지원']++;
      if (job.status === 'FINAL_PASS') monthlyMap[key]['합격']++;
    }
  }

  const monthlyData = Object.values(monthlyMap);

  const statusLabels: Record<string, string> = {
    PREPARING: '준비중',
    APPLIED: '지원완료',
    DOCUMENT_PASS: '서류합격',
    INTERVIEW: '면접',
    FINAL_PASS: '최종합격',
    REJECTED: '불합격',
  };

  const statusData = Object.entries(statusCounts)
    .map(([status, value]) => ({ name: statusLabels[status] ?? status, value, status }))
    .sort((a, b) => b.value - a.value);

  const users = await prisma.user.findMany({
    where: { role: 'USER' },
    select: { targetJob: true },
  });

  const targetJobMap: Record<string, number> = {};
  for (const u of users) {
    const job = u.targetJob ?? '미설정';
    targetJobMap[job] = (targetJobMap[job] ?? 0) + 1;
  }

  const targetJobData = Object.entries(targetJobMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  const [activeListings, recentUsers, recentListings, confirmedEmployment, pendingRecruiters] = await Promise.all([
    prisma.jobListing.count({ where: { isActive: true } }),
    prisma.user.findMany({
      where: { role: 'USER' },
      select: { id: true, name: true, email: true, targetJob: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.jobListing.findMany({
      where: { isActive: true },
      select: { id: true, company: true, position: true, deadline: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.employmentRecord.count(),
    prisma.user.count({ where: { role: 'RECRUITER', isApproved: false } }),
  ]);

  // 취업확정 기준 실제 취업률 (확정 등록 수 / 전체 학생 수)
  const confirmedRate = totalUsers > 0 ? Math.round((confirmedEmployment / totalUsers) * 100) : 0;

  return NextResponse.json({
    data: {
      summary: {
        totalUsers,
        newUsersThisWeek,
        totalApplied,
        newJobsThisWeek,
        finalPassCount,
        employmentRate,
        activeListings,
        confirmedEmployment,
        confirmedRate,
        pendingRecruiters,
      },
      monthlyData,
      statusData,
      jobCategoryData,
      targetJobData,
      recentUsers,
      recentListings,
    },
  });
}
