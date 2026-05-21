import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight, FileSpreadsheet, FileEdit,
  Briefcase, Bell, UserCircle, Clock, ChevronRight, Zap,
} from 'lucide-react';
import ApplicationSummary from '@/components/dashboard/ApplicationSummary';
import RoadmapProgress from '@/components/dashboard/RoadmapProgress';
import UrgentDeadlines from '@/components/dashboard/UrgentDeadlines';
import { aggregateByStatus, calculateRoadmapProgress } from '@/lib/dashboard';

type NoticeRow = { id: string; title: string; content: string; isPinned: number | boolean; createdAt: string };

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

  const [jobPostings, listings, noticesRaw, user, roadmapItems] = await Promise.all([
    prisma.jobPosting.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.jobListing.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' }, take: 6 }),
    prisma.$queryRaw`SELECT id, title, content, "isPinned", "createdAt" FROM "Notice" ORDER BY "isPinned" DESC, "createdAt" DESC LIMIT 3`,
    prisma.user.findUnique({ where: { id: userId }, select: { targetJob: true, name: true, skills: true } }),
    prisma.roadmapItem.findMany({ where: { userId }, select: { status: true } }),
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

  const now = new Date();
  const greeting = now.getHours() < 12 ? '좋은 아침이에요' : now.getHours() < 18 ? '안녕하세요' : '수고하셨어요';

  return (
    <div className="min-h-full bg-gray-50/30">
      {/* 상단 히어로 배너 */}
      <div className="bg-[#0f172a] px-6 pt-8 pb-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-white/40 mb-1 tabular-nums">
            {now.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}
          </p>
          <h1 className="text-2xl font-semibold text-white">
            {greeting}{user?.name ? `, ${user.name}님` : ''}
          </h1>
          <p className="text-sm text-white/40 mt-1">
            {user?.targetJob
              ? `${user.targetJob} 준비 중 · 맞춤 공고와 자소서 코칭을 확인하세요`
              : '목표 직무를 설정하면 맞춤 서비스를 받을 수 있어요'}
          </p>

          {/* 프로필 미설정 유도 */}
          {!user?.targetJob && (
            <Link href="/profile"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-300 hover:bg-violet-500/20 transition-colors">
              <UserCircle className="w-3.5 h-3.5" />
              목표 직무 설정하기 <ArrowRight className="w-3 h-3" />
            </Link>
          )}

          {/* 맞춤 공고 알림 */}
          {matchedNewCount > 0 && (
            <Link href="/listings"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-xs font-medium text-blue-300 hover:bg-blue-500/20 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              내 직무 맞춤 신규 공고 {matchedNewCount}개 <ArrowRight className="w-3 h-3" />
            </Link>
          )}

          {/* 미읽은 알림 배너 */}
          {unreadCount > 0 && (
            <Link href="/notifications"
              className="mt-4 ml-2 inline-flex items-center gap-2 rounded-lg border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-300 hover:bg-violet-500/20 transition-colors">
              <Bell className="w-3.5 h-3.5" />
              읽지 않은 알림 {unreadCount}개 <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-4 pb-10 space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/listings"
            className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-blue-200 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="rounded-xl bg-blue-50 p-3 group-hover:bg-blue-100 transition-colors">
                <FileSpreadsheet className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-widest">
                핵심 ①
              </span>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">맞춤 공고 확인하기</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              취업지원처 엑셀에서 CS 직군만 자동 추출된 공고입니다
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-blue-600">{listings.length}개 공고</span>
              <span className="flex items-center gap-1 text-xs text-blue-500 font-medium group-hover:gap-2 transition-all">
                보러가기 <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          <Link href="/cover-letter"
            className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-amber-200 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="rounded-xl bg-amber-50 p-3 group-hover:bg-amber-100 transition-colors">
                <FileEdit className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-full uppercase tracking-widest">
                핵심 ②
              </span>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">자소서 코칭 받기</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              AI가 대신 써주지 않습니다. 방향만 짚어주고 직접 고치게 합니다
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-amber-600">
                {user?.targetJob ? user.targetJob : '직군 미설정'}
              </span>
              <span className="flex items-center gap-1 text-xs text-amber-500 font-medium group-hover:gap-2 transition-all">
                코칭 시작 <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        </div>

        {/* 준비 현황 카드 — 교수님 피드백: "이것을 준비하세요" */}
        {skillReq && (
          <div className="rounded-xl border border-violet-200 bg-white shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-violet-500" />
                <p className="text-xs font-semibold text-violet-700 uppercase tracking-widest">
                  {user?.targetJob} 준비 현황
                </p>
              </div>
              <span className="text-[10px] text-violet-400 bg-violet-50 px-2 py-0.5 rounded-full">
                필수 {hasMust.length}/{skillReq.must.length}
              </span>
            </div>
            {missingMust.length > 0 && (
              <div className="mb-3">
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-2">반드시 준비하세요</p>
                <div className="flex flex-wrap gap-1.5">
                  {missingMust.map(s => (
                    <span key={s} className="text-xs bg-red-50 text-red-600 border border-red-200 px-2.5 py-1 rounded-full font-medium">✗ {s}</span>
                  ))}
                </div>
              </div>
            )}
            {hasMust.length > 0 && (
              <div className="mb-3">
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">보유 중 (필수)</p>
                <div className="flex flex-wrap gap-1.5">
                  {hasMust.map(s => (
                    <span key={s} className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-medium">✓ {s}</span>
                  ))}
                </div>
              </div>
            )}
            {userSkills.length === 0 && (
              <Link href="/profile" className="text-xs text-violet-500 hover:underline flex items-center gap-1">
                프로필에서 기술 스택을 등록하면 현황이 표시됩니다 <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        )}

        {/* 지원 현황 요약 위젯 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">지원 현황 요약</p>
            <Link href="/jobs" className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-0.5">
              관리하기 <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <ApplicationSummary counts={applicationCounts} />
        </div>

        {/* 로드맵 진행률 + 마감 임박 2단 */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-100 bg-white shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">로드맵 진행률</p>
              <Link href="/roadmap" className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-0.5">
                보기 <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <RoadmapProgress
              progress={roadmapProgress}
              total={roadmapItems.length}
              completed={roadmapCompleted}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">마감 임박 (7일 이내)</p>
              <Link href="/jobs" className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-0.5">
                전체 <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <UrgentDeadlines postings={urgentPostings as Parameters<typeof UrgentDeadlines>[0]['postings']} />
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-400 uppercase tracking-wider">내 지원</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{jobPostings.length}</p>
            <Link href="/jobs" className="text-xs text-blue-500 hover:underline mt-2 inline-flex items-center gap-0.5">
              관리하기 <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileSpreadsheet className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-400 uppercase tracking-wider">등록 공고</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{listings.length}</p>
            <Link href="/listings" className="text-xs text-blue-500 hover:underline mt-2 inline-flex items-center gap-0.5">
              전체 보기 <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-400 uppercase tracking-wider">공지사항</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{notices.length}</p>
            <Link href="/notices" className="text-xs text-blue-500 hover:underline mt-2 inline-flex items-center gap-0.5">
              확인하기 <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* 최근 공고 + 공지사항 2단 */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* 최근 맞춤 공고 */}
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-widest">최근 맞춤 공고</p>
              <Link href="/listings" className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-0.5 transition-colors">
                전체 <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            {listings.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <p className="text-sm text-gray-400">등록된 공고가 없습니다</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {listings.slice(0, 5).map((l: {
                  id: string; company: string; position: string;
                  career: string | null; deadline: Date | null; createdAt: Date;
                }) => {
                  const deadline = l.deadline ? new Date(l.deadline) : null;
                  const daysLeft = deadline ? Math.ceil((deadline.getTime() - Date.now()) / 86400000) : null;
                  const isNew = (Date.now() - new Date(l.createdAt).getTime()) < 7 * 86400000;
                  return (
                    <Link key={l.id} href={`/listings/${l.id}`}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-medium text-gray-900 truncate">{l.company}</p>
                          {isNew && <span className="text-[9px] font-bold bg-blue-500 text-white px-1.5 py-0.5 rounded-full shrink-0">NEW</span>}
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
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-widest">공지사항</p>
              <Link href="/notices" className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-0.5 transition-colors">
                전체 <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            {notices.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <p className="text-sm text-gray-400">공지사항이 없습니다</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {notices.map((n: NoticeRow) => (
                  <div key={n.id} className="px-5 py-3.5 flex items-start gap-3">
                    {(n.isPinned === 1 || n.isPinned === true) && (
                      <span className="mt-0.5 shrink-0 text-[9px] font-bold bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded">고정</span>
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
