import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight, FileSpreadsheet, FileEdit,
  Briefcase, Bell, UserCircle, Clock, ChevronRight, Zap, ListTodo,
} from 'lucide-react';
import ApplicationSummary from '@/components/dashboard/ApplicationSummary';
import RoadmapProgress from '@/components/dashboard/RoadmapProgress';
import UrgentDeadlines from '@/components/dashboard/UrgentDeadlines';
import PrioritySection from '@/components/dashboard/PrioritySection';
import RecentAlerts from '@/components/dashboard/RecentAlerts';
import PersonalStats from '@/components/dashboard/PersonalStats';
import { aggregateByStatus, calculateRoadmapProgress } from '@/lib/dashboard';
import { syncJobNotifications } from '@/lib/notifications';

type NoticeRow = { id: string; title: string; content: string; isPinned: number | boolean; createdAt: string };
type TodayTask = { id: string; jobId: string; company: string; position: string; label: string; detail: string; priority: 'urgent' | 'normal' };


// 직군별 필수 기술 맵
const JOB_REQUIRED_SKILLS: Record<string, { must: string[]; good: string[] }> = {
  '프론트엔드 개발자': { must: ['HTML', 'CSS', 'JavaScript', 'React'], good: ['TypeScript', 'Next.js', 'Tailwind', 'Git'] },
  '백엔드 개발자': { must: ['Java', 'Python', 'Node.js', 'SQL'], good: ['Spring', 'Django', 'Docker', 'Git'] },
  '풀스택 개발자': { must: ['JavaScript', 'React', 'Node.js', 'SQL'], good: ['TypeScript', 'Next.js', 'Docker', 'Git'] },
  '모바일 개발자': { must: ['Swift', 'Kotlin', 'Java', 'Android'], good: ['Flutter', 'React Native', 'Git'] },
  '데이터 엔지니어': { must: ['Python', 'SQL', 'Pandas'], good: ['Spark', 'Airflow', 'Tableau', 'Git'] },
  'AI/ML 엔지니어': { must: ['Python', 'TensorFlow', 'PyTorch', 'SQL'], good: ['Scikit-learn', 'NumPy', 'Git'] },
  'DevOps/클라우드': { must: ['Linux', 'Docker', 'AWS', 'CI/CD'], good: ['Kubernetes', 'Terraform', 'Git'] },
  '보안 엔지니어': { must: ['Linux', 'Python', '네트워크'], good: ['CTF', '침투테스트', '정보보안기사'] },
  'IT 기획/PM': { must: ['기획', 'Figma', 'Notion'], good: ['Jira', 'SQL', 'Agile'] },
  'QA 엔지니어': { must: ['테스트', 'Python', 'Selenium'], good: ['Jest', 'Cypress', 'Git'] },
  '사무/경영지원': { must: ['Excel', 'PPT', 'Word'], good: ['ERP', '데이터분석'] },
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect('/login');

  const userId = session.user.id;

  // 마감 임박 / 면접 / 팔로업 알림 자동 생성
  try {
    await syncJobNotifications(userId);
  } catch {
    // 알림 생성 실패 시 대시보드 렌더링은 계속 진행
  }

  const [jobPostings, listings, noticesRaw, user, roadmapItems, todayPostings] = await Promise.all([
    prisma.jobPosting.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.jobListing.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' }, take: 6 }),
    prisma.$queryRaw`SELECT id, title, content, "isPinned", "createdAt" FROM "Notice" ORDER BY "isPinned" DESC, "createdAt" DESC LIMIT 3`,
    prisma.user.findUnique({ where: { id: userId }, select: { targetJob: true, name: true, skills: true } }),
    prisma.roadmapItem.findMany({ where: { userId }, select: { status: true } }),
    prisma.jobPosting.findMany({ where: { userId }, orderBy: { updatedAt: 'desc' }, take: 20 }),
  ]);

  const notices = noticesRaw as NoticeRow[];

  // 기술 스택 파싱
  let userSkills: string[] = [];
  try { userSkills = JSON.parse(user?.skills as string ?? '[]'); } catch { userSkills = []; }

  // 지원 현황 집계
  const applicationCounts = aggregateByStatus(jobPostings as Parameters<typeof aggregateByStatus>[0]);

  // 로드맵 진행률
  const roadmapProgress = calculateRoadmapProgress(roadmapItems as { status: import('@/types').SkillStatus }[]);
  const roadmapCompleted = roadmapItems.filter(i => i.status === 'COMPLETED').length;

  // 마감 임박 (7일 이내)
  const urgentPostings = jobPostings.filter(p => {
    if (!p.deadline) return false;
    const days = Math.ceil((new Date(p.deadline).getTime() - Date.now()) / 86400000);
    return days >= 0 && days <= 7;
  });

  const todayTasks: TodayTask[] = [];
  for (const posting of todayPostings) {
    const daysUntil = (value: Date) => Math.ceil((value.getTime() - Date.now()) / 86400000);
    if (posting.deadline) {
      const days = daysUntil(new Date(posting.deadline));
      if (days >= 0 && days <= 7) {
        todayTasks.push({ id: `deadline-${posting.id}`, jobId: posting.id, company: posting.company, position: posting.position, label: days <= 1 ? '마감 확인' : '마감 준비', detail: days === 0 ? '오늘 마감' : `D-${days}`, priority: days <= 1 ? 'urgent' : 'normal' });
      }
    }
    if (posting.interviewAt) {
      const days = daysUntil(new Date(posting.interviewAt));
      if (days >= 0 && days <= 7) {
        todayTasks.push({ id: `interview-${posting.id}`, jobId: posting.id, company: posting.company, position: posting.position, label: '면접 준비', detail: days === 0 ? '오늘 면접' : `D-${days}`, priority: days <= 1 ? 'urgent' : 'normal' });
      }
    }
    if (posting.followUpAt && new Date(posting.followUpAt) <= new Date()) {
      todayTasks.push({ id: `followup-${posting.id}`, jobId: posting.id, company: posting.company, position: posting.position, label: '팔로업 확인', detail: '예정일 지남', priority: 'urgent' });
    }
    if (posting.checklist) {
      try {
        const checklist = JSON.parse(posting.checklist) as { label?: string; checked?: boolean }[];
        const remaining = checklist.filter(item => !item.checked);
        if (remaining.length > 0) {
          todayTasks.push({ id: `checklist-${posting.id}`, jobId: posting.id, company: posting.company, position: posting.position, label: '준비물 확인', detail: `${remaining.length}개 미완료`, priority: 'normal' });
        }
      } catch {
        continue;
      }
    }
  }
  todayTasks.sort((a, b) => Number(b.priority === 'urgent') - Number(a.priority === 'urgent'));

  // 준비 현황 계산
  const skillReq = user?.targetJob ? JOB_REQUIRED_SKILLS[user.targetJob] : null;
  let missingMust: string[] = [];
  let hasMust: string[] = [];
  if (skillReq && userSkills.length > 0) {
    const lower = userSkills.map(s => s.toLowerCase());
    missingMust = skillReq.must.filter(s => !lower.some(u => u.includes(s.toLowerCase()) || s.toLowerCase().includes(u)));
    hasMust = skillReq.must.filter(s => lower.some(u => u.includes(s.toLowerCase()) || s.toLowerCase().includes(u)));
  } else if (skillReq) {
    missingMust = skillReq.must;
  }

  // 미읽은 알림 수
  const unreadCount = await prisma.userNotification.count({
    where: { userId, isRead: false },
  });

  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000);
  let matchedNewCount = 0;
  if (user?.targetJob) {
    const keyword = user.targetJob.toLowerCase();
    const recentListings = await prisma.jobListing.findMany({
      where: { isActive: true, createdAt: { gte: sevenDaysAgo } },
      select: { position: true, description: true },
    });
    matchedNewCount = recentListings.filter(l =>
      l.position.toLowerCase().includes(keyword) ||
      (l.description ?? '').toLowerCase().includes(keyword)
    ).length;
  }

  // 주간 활동 통계
  const weeklyJobPostings = await prisma.jobPosting.count({
    where: { userId, createdAt: { gte: sevenDaysAgo } },
  });
  const weeklyCoverLetters = await prisma.coverLetter.count({
    where: { userId, createdAt: { gte: sevenDaysAgo } },
  });
  const weeklyInterviews = await prisma.jobPosting.count({
    where: { 
      userId, 
      interviewAt: { gte: sevenDaysAgo },
      status: { in: ['INTERVIEW', 'FINAL_PASS'] }
    },
  });

  // 4주간 활동 추이 데이터
  const fourWeeksAgo = new Date(Date.now() - 28 * 86400000);
  const weeklyActivityData: { week: string; jobPostings: number; coverLetters: number }[] = [];
  for (let i = 3; i >= 0; i--) {
    const weekStart = new Date(Date.now() - (i + 1) * 7 * 86400000);
    const weekEnd = new Date(Date.now() - i * 7 * 86400000);
    
    const jobPostingsCount = await prisma.jobPosting.count({
      where: { userId, createdAt: { gte: weekStart, lt: weekEnd } },
    });
    const coverLettersCount = await prisma.coverLetter.count({
      where: { userId, createdAt: { gte: weekStart, lt: weekEnd } },
    });
    
    weeklyActivityData.push({
      week: `${i === 0 ? '이번 주' : `${i}주 전`}`,
      jobPostings: jobPostingsCount,
      coverLetters: coverLettersCount,
    });
  }

  const now = new Date();
  const greeting = now.getHours() < 12 ? '좋은 아침이에요' : now.getHours() < 18 ? '안녕하세요' : '수고하셨어요';

  return (
    <div className="min-h-full">
      {/* 상단 히어로 배너 */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 pt-10 pb-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-white/50 mb-2 tabular-nums">
            {now.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}
          </p>
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            {greeting}{user?.name ? `, ${user.name}님` : ''}
          </h1>
          <p className="text-sm text-white/60 mt-2 leading-relaxed">
            {user?.targetJob
              ? `${user.targetJob} 준비 중 · 맞춤 공고와 자소서 코칭을 확인하세요`
              : '목표 직무를 설정하면 맞춤 서비스를 받을 수 있어요'}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {/* 프로필 미설정 유도 */}
            {!user?.targetJob && (
              <Link href="/profile"
                className="inline-flex items-center gap-2 rounded-xl border border-violet-400/40 bg-violet-500/10 px-4 py-2.5 text-xs font-medium text-violet-200 hover:bg-violet-500/20 transition-colors">
                <UserCircle className="w-4 h-4" />
                목표 직무 설정하기 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

            {/* 맞춤 공고 알림 */}
            {matchedNewCount > 0 && (
              <Link href="/listings"
                className="inline-flex items-center gap-2 rounded-xl border border-blue-400/40 bg-blue-500/10 px-4 py-2.5 text-xs font-medium text-blue-200 hover:bg-blue-500/20 transition-colors">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                내 직무 맞춤 신규 공고 {matchedNewCount}개 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

            {/* 미읽은 알림 배너 */}
            {unreadCount > 0 && (
              <Link href="/notifications"
                className="inline-flex items-center gap-2 rounded-xl border border-violet-400/40 bg-violet-500/10 px-4 py-2.5 text-xs font-medium text-violet-200 hover:bg-violet-500/20 transition-colors">
                <Bell className="w-4 h-4" />
                읽지 않은 알림 {unreadCount}개 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-6 pb-10 space-y-8">
        <PrioritySection />

        <section className="rounded-3xl border border-gray-200 bg-white shadow-lg p-6">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                <ListTodo className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-violet-600 uppercase tracking-wider">Today</p>
                <h2 className="text-lg font-semibold text-gray-900">오늘의 할 일</h2>
              </div>
            </div>
            <Link href="/jobs" className="text-xs font-medium text-gray-500 hover:text-violet-600">지원 현황 보기</Link>
          </div>
          {todayTasks.length === 0 ? (
            <div className="rounded-2xl bg-gray-50 px-4 py-8 text-center">
              <p className="text-sm text-gray-500">오늘 처리할 일이 없습니다.</p>
              <p className="text-xs text-gray-400 mt-1">지원 건을 추가하면 마감·면접·체크리스트를 이곳에서 확인할 수 있습니다.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-2">
              {todayTasks.slice(0, 8).map(task => (
                <Link key={task.id} href={`/jobs/${task.jobId}`} className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 px-4 py-3 hover:border-violet-200 hover:bg-violet-50/40 transition-colors">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{task.label} · {task.company}</p>
                    <p className="text-[11px] text-gray-400 truncate mt-1">{task.position} · {task.detail}</p>
                  </div>
                  <span className={`shrink-0 text-xs font-semibold rounded-full px-2 py-1 ${task.priority === 'urgent' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'}`}>{task.priority === 'urgent' ? '긴급' : '준비'}</span>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* 최근 알림 / 공지 */}
        <RecentAlerts />

        <div className="grid md:grid-cols-2 gap-5">
          <Link href="/listings"
            className="rounded-3xl bg-white border border-gray-200 shadow-lg p-7 hover:shadow-xl hover:border-blue-400 transition-all group">
            <div className="flex items-start justify-between mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-3.5 group-hover:from-blue-100 group-hover:to-blue-200 transition-colors">
                <FileSpreadsheet className="w-7 h-7 text-blue-600" />
              </div>
              <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-widest">
                핵심 ①
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">맞춤 공고 확인하기</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              취업지원처 엑셀에서 CS 직군만 자동 추출된 공고입니다
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-blue-600">{listings.length}개 공고</span>
              <span className="flex items-center gap-1.5 text-sm text-blue-500 font-medium group-hover:gap-2.5 transition-all">
                보러가기 <ArrowRight className="w-[1.125rem] h-[1.125rem]" />
              </span>
            </div>
          </Link>

          <Link href="/cover-letter"
            className="rounded-3xl bg-white border border-gray-200 shadow-lg p-7 hover:shadow-xl hover:border-amber-400 transition-all group">
            <div className="flex items-start justify-between mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 p-3.5 group-hover:from-amber-100 group-hover:to-amber-200 transition-colors">
                <FileEdit className="w-7 h-7 text-amber-600" />
              </div>
              <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full uppercase tracking-widest">
                핵심 ②
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">자소서 코칭 받기</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              AI가 대신 써주지 않습니다. 방향만 짚어주고 직접 고치게 합니다
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-amber-600">
                {user?.targetJob ? user.targetJob : '직군 미설정'}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-amber-500 font-medium group-hover:gap-2.5 transition-all">
                코칭 시작 <ArrowRight className="w-[1.125rem] h-[1.125rem]" />
              </span>
            </div>
          </Link>
        </div>

        {/* 준비 현황 카드 — 교수님 피드백: "이것을 준비하세요" */}
        {skillReq && (
          <div className="rounded-3xl border border-violet-200/60 bg-gradient-to-br from-violet-50/80 to-indigo-50/60 shadow-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-violet-600" />
                </div>
                <p className="text-base font-semibold text-violet-900 uppercase tracking-wider">
                  {user?.targetJob} 준비 현황
                </p>
              </div>
              <span className="text-[11px] font-bold text-violet-600 bg-violet-100 px-3 py-1.5 rounded-full">
                필수 {hasMust.length}/{skillReq.must.length}
              </span>
            </div>
            {missingMust.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  반드시 준비하세요
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {missingMust.map(s => (
                    <span key={s} className="text-xs bg-white text-red-600 border border-red-200 px-3 py-1.5 rounded-lg font-medium shadow-sm">{s}</span>
                  ))}
                </div>
              </div>
            )}
            {hasMust.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  보유 중 (필수)
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {hasMust.map(s => (
                    <span key={s} className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg font-medium">{s}</span>
                  ))}
                </div>
              </div>
            )}
            {userSkills.length === 0 && (
              <Link href="/profile" className="text-xs text-violet-600 hover:underline flex items-center gap-1 font-medium">
                프로필에서 기술 스택을 등록하면 현황이 표시됩니다 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        )}

        {/* 지원 현황 요약 위젯 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">지원 현황 요약</p>
            <Link href="/jobs" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium">
              관리하기 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <ApplicationSummary counts={applicationCounts} />
        </div>

        {/* 로드맵 진행률 + 마감 임박 2단 */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-3xl border border-gray-200 bg-white shadow-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">로드맵 진행률</p>
              <Link href="/roadmap" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium">
                보기 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <RoadmapProgress
              progress={roadmapProgress}
              total={roadmapItems.length}
              completed={roadmapCompleted}
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">마감 임박 (7일 이내)</p>
              <Link href="/jobs" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium">
                전체 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <UrgentDeadlines postings={urgentPostings as Parameters<typeof UrgentDeadlines>[0]['postings']} />
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-4 gap-5">
          <div className="rounded-3xl bg-white border border-gray-200 shadow-lg p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs text-gray-400 uppercase tracking-wider">내 지원</span>
            </div>
            <p className="text-4xl font-bold text-gray-900">{jobPostings.length}</p>
            <Link href="/jobs" className="text-sm text-blue-600 hover:underline mt-3 inline-flex items-center gap-1 font-medium">
              관리하기 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="rounded-3xl bg-white border border-gray-200 shadow-lg p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-xs text-gray-400 uppercase tracking-wider">등록 공고</span>
            </div>
            <p className="text-4xl font-bold text-gray-900">{listings.length}</p>
            <Link href="/listings" className="text-sm text-blue-600 hover:underline mt-3 inline-flex items-center gap-1 font-medium">
              전체 보기 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="rounded-3xl bg-white border border-gray-200 shadow-lg p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <Bell className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-xs text-gray-400 uppercase tracking-wider">공지사항</span>
            </div>
            <p className="text-4xl font-bold text-gray-900">{notices.length}</p>
            <Link href="/notices" className="text-sm text-blue-600 hover:underline mt-3 inline-flex items-center gap-1 font-medium">
              확인하기 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 shadow-lg p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                <Zap className="w-5 h-5 text-violet-600" />
              </div>
              <span className="text-xs text-violet-400 uppercase tracking-wider">이번 주 활동</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">지원</span>
                <span className="font-bold text-gray-900">{weeklyJobPostings}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">자소서</span>
                <span className="font-bold text-gray-900">{weeklyCoverLetters}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">면접</span>
                <span className="font-bold text-gray-900">{weeklyInterviews}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 내 지원 통계 */}
        <PersonalStats />

        {/* 활동 추이 그래프 */}
        <div className="rounded-3xl border border-gray-200 bg-white shadow-lg p-6">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">4주간 활동 추이</p>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                지원
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                자소서
              </span>
            </div>
          </div>
          <div className="space-y-4">
            {weeklyActivityData.map((data, index) => {
              const maxCount = Math.max(...weeklyActivityData.map(d => Math.max(d.jobPostings, d.coverLetters)), 1);
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-gray-700">{data.week}</span>
                    <span className="text-gray-400">합계 {data.jobPostings + data.coverLetters}건</span>
                  </div>
                  <div className="flex items-center gap-2 h-8">
                    <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden flex items-end gap-1 h-full">
                      <div 
                        className="bg-blue-500 rounded-t-sm transition-all duration-500"
                        style={{ height: `${(data.jobPostings / maxCount) * 100}%`, width: '50%' }}
                      />
                      <div 
                        className="bg-amber-500 rounded-t-sm transition-all duration-500"
                        style={{ height: `${(data.coverLetters / maxCount) * 100}%`, width: '50%' }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>지원 {data.jobPostings}</span>
                    <span>자소서 {data.coverLetters}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 최근 공고 + 공지사항 2단 */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* 최근 맞춤 공고 */}
          <div className="rounded-3xl bg-white border border-gray-200 shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-700 uppercase tracking-wider">최근 맞춤 공고</p>
              <Link href="/listings" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors font-medium">
                전체 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            {listings.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <p className="text-sm text-gray-400">등록된 공고가 없습니다</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {listings.slice(0, 5).map((l: {
                  id: string; company: string; position: string;
                  career: string | null; deadline: Date | null; createdAt: Date;
                }) => {
                  const deadline = l.deadline ? new Date(l.deadline) : null;
                  const daysLeft = deadline ? Math.ceil((deadline.getTime() - Date.now()) / 86400000) : null;
                  const isNew = (Date.now() - new Date(l.createdAt).getTime()) < 7 * 86400000;
                  return (
                    <Link key={l.id} href={`/listings/${l.id}`}
                      className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900 truncate">{l.company}</p>
                          {isNew && <span className="text-[9px] font-bold bg-blue-500 text-white px-2 py-0.5 rounded-full shrink-0">NEW</span>}
                        </div>
                        <p className="text-xs text-gray-400 truncate mt-0.5">{l.position} {l.career && `· ${l.career}`}</p>
                      </div>
                      {daysLeft !== null && daysLeft >= 0 && (
                        <span className={`text-xs font-bold tabular-nums shrink-0 ${daysLeft <= 3 ? 'text-red-500' : 'text-gray-300'}`}>
                          D-{daysLeft}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* 공지사항 */}
          <div className="rounded-3xl bg-white border border-gray-200 shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-700 uppercase tracking-wider">공지사항</p>
              <Link href="/notices" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors font-medium">
                전체 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            {notices.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <p className="text-sm text-gray-400">공지사항이 없습니다</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notices.map((n: NoticeRow) => (
                  <div key={n.id} className="px-5 py-3.5 flex items-start gap-3">
                    {(n.isPinned === 1 || n.isPinned === true) && (
                      <span className="mt-0.5 shrink-0 text-[9px] font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded">고정</span>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{n.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{n.content}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 text-xs text-gray-300 tabular-nums">
                      <Clock className="w-3 h-3" />
                      {new Date(n.createdAt).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
