import Link from 'next/link';
import { FileSpreadsheet, FileEdit, Briefcase, ArrowRight, ExternalLink, CheckCircle2, Clock } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import ApplyButton from '@/components/jobs/ApplyButton';

const DEPT_CONFIG: Record<string, { name: string; label: string; homeUrl: string; color: string }> = {
  info: { name: '컴퓨터정보과', label: '컴퓨터정보과 전용', homeUrl: 'https://info.ansan.ac.kr/info', color: 'blue' },
  aisw: { name: 'AI소프트웨어과', label: 'AI소프트웨어과 전용', homeUrl: 'https://aisw.ansan.ac.kr/aisw', color: 'violet' },
};

export default async function Home({ searchParams }: { searchParams: { from?: string } }) {
  const from = searchParams?.from ?? '';
  const dept = DEPT_CONFIG[from] ?? null;

  // 공고 통계 + 미리보기 (서버에서 직접 조회)
  const [totalListings, previewListings] = await Promise.all([
    prisma.jobListing.count({ where: { isActive: true } }),
    prisma.jobListing.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      take: 4,
      select: { id: true, company: true, position: true, employType: true, deadline: true, tags: true, createdAt: true },
    }),
  ]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-900 text-white">
      {/* 배경 블러 오브 */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-[10%] -left-[10%] h-[520px] w-[520px] rounded-full bg-primary/15 blur-[140px]" />
        <div className="absolute right-[-5%] top-[12%] h-[440px] w-[440px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-[8%] left-[8%] h-[380px] w-[380px] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      {/* 학과 연결 배너 */}
      {dept && (
        <div
          data-dept={dept.color}
          className="relative flex w-full items-center justify-center gap-2 px-6 py-2.5 text-center text-xs font-medium bg-primary data-[dept=violet]:bg-violet-600"
        >
          <span>{dept.name} 홈페이지에서 연결되었습니다</span>
          <span className="opacity-50">·</span>
          <a
            href={dept.homeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline underline-offset-2 opacity-80 hover:opacity-100"
          >
            돌아가기 <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      )}

      {/* 헤더 */}
      <header className="relative border-b border-white/10">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <span className="text-xs font-black text-white">JF</span>
            </div>
            <span className="text-sm font-semibold">{dept ? dept.name : '컴퓨터공학부'} 취업지원</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-white/60 transition-colors hover:text-white">
              로그인
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              시작하기
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 text-center">
        <div
          data-dept={dept?.color}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 data-[dept=violet]:border-violet-500/30 data-[dept=violet]:bg-violet-500/10"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400 data-[dept=violet]:bg-violet-400" />
          <span className="text-xs font-semibold text-blue-300 data-[dept=violet]:text-violet-300">
            {dept ? dept.label : '컴퓨터공학부 전용'} · 학과 맞춤형 취업 지원
          </span>
        </div>

        <h1 className="text-4xl font-light leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
          취업 공고는 자동으로,
          <br />
          <span className="font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            자소서는 내가 직접.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/50">
          학교 취업지원처 엑셀에서 CS 직군만 자동 추출.
          자소서는 대신 써주지 않고, 방향만 코칭합니다.
        </p>

        <div className="mx-auto mt-10 flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:items-center">
          <Link
            href="/register"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90 sm:w-auto"
          >
            지금 시작하기 <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/login"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white sm:w-auto"
          >
            로그인
          </Link>
          <Link
            href="/register-recruiter"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-7 py-3.5 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-400/15 sm:w-auto"
          >
            기업 회원 가입
          </Link>
        </div>
      </section>

      {/* 공고 미리보기 섹션 */}
      {totalListings > 0 && (
        <section className="relative mx-auto max-w-6xl px-6 pb-20">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-white/30">지금 올라온 공고</p>
              <p className="text-sm text-white/60">
                현재 <span className="font-bold text-blue-400">{totalListings}개</span> 공고가 등록되어 있습니다
              </p>
            </div>
            <Link
              href="/open/listings"
              className="flex items-center gap-1.5 text-xs font-medium text-blue-400 transition-colors hover:text-blue-300"
            >
              전체 보기 <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {previewListings.map((l) => {
              const tags: string[] = (() => {
                try {
                  return l.tags ? JSON.parse(l.tags) : [];
                } catch {
                  return [];
                }
              })();
              const deadline = l.deadline ? new Date(l.deadline) : null;
              const daysLeft = deadline ? Math.ceil((deadline.getTime() - Date.now()) / 86400000) : null;
              const isNew = Date.now() - new Date(l.createdAt).getTime() < 7 * 86400000;
              return (
                <div
                  key={l.id}
                  className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 flex items-center gap-1.5">
                        <p className="text-xs text-white/40">{l.company}</p>
                        {isNew && (
                          <span className="rounded-full bg-primary px-1.5 py-0.5 text-xs font-bold text-white">NEW</span>
                        )}
                      </div>
                      <p className="truncate text-sm font-medium leading-snug text-white/80">{l.position}</p>
                    </div>
                    {l.employType && (
                      <span className="shrink-0 rounded-full bg-primary/20 px-2 py-0.5 text-xs text-blue-300">
                        {l.employType}
                      </span>
                    )}
                  </div>
                  {tags.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-1">
                      {tags.slice(0, 3).map((t) => (
                        <span key={t} className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white/40">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-xs text-white/30">
                      <Clock className="h-3 w-3" />
                      {deadline
                        ? daysLeft !== null && daysLeft >= 0
                          ? `D-${daysLeft}`
                          : '마감'
                        : '마감일 미정'}
                    </div>
                    <ApplyButton listingId={l.id} variant="dark" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/open/listings"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              전체 공고 {totalListings}개 보기 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      {/* 핵심 기능 2개 */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <p className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-white/30">핵심 기능</p>
        <div className="grid gap-5 md:grid-cols-2">
          {/* 공고 필터링 */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-7 transition-colors hover:border-primary/40">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-primary/20 p-3">
                <FileSpreadsheet className="h-6 w-6 text-blue-300" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">핵심 기능 ①</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-white">맞춤 공고 자동 필터링</h3>
            <p className="mb-5 text-sm leading-relaxed text-white/50">
              취업지원처에서 매주 오는 엑셀 파일을 업로드하면,
              개발·IT·보안·데이터 직군 공고만 자동으로 추출해 보여줍니다.
            </p>
            <ul className="space-y-2">
              {['엑셀 업로드 → CS 직군 자동 분류', 'NEW 뱃지 · 마감임박 D-3 표시', '공고에서 바로 자소서 작성 연결'].map((t) => (
                <li key={t} className="flex items-center gap-2 text-xs text-blue-300/70">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* 자소서 코칭 */}
          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-7 transition-colors hover:border-violet-500/40">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-violet-500/20 p-3">
                <FileEdit className="h-6 w-6 text-violet-300" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-violet-300">핵심 기능 ②</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-white">자소서 빨간펜 코칭</h3>
            <p className="mb-5 text-sm leading-relaxed text-white/50">
              AI가 대신 써주지 않습니다. 직무에 맞는 수정 방향만 번호로 짚어주고,
              학생이 직접 고쳐서 실력을 키웁니다.
            </p>
            <ul className="space-y-2">
              {['직군별 체크리스트 + 작성 가이드', '글자수·STAR기법·공허한표현 분석', '목표 직무 기반 준비 현황 제공'].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2 text-xs text-violet-300/70">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-violet-500" />
                    {t}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* 사용 흐름 */}
      <section className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-widest text-white/30">사용 흐름</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { step: '01', label: '회원가입', sub: '학과 계정 생성' },
              { step: '02', label: '프로필 설정', sub: '목표 직무 + 기술 입력' },
              { step: '03', label: '맞춤 공고 확인', sub: 'CS 필터링 결과 열람' },
              { step: '04', label: '자소서 작성', sub: '공고에서 바로 연결' },
              { step: '05', label: '코칭 분석', sub: '번호별 피드백 확인' },
            ].map((item, i) => (
              <div key={item.step} className="flex items-center gap-3">
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
                    <span className="text-xs font-bold text-white/60">{item.step}</span>
                  </div>
                  <p className="text-xs font-semibold text-white/80">{item.label}</p>
                  <p className="mt-0.5 text-xs text-white/30">{item.sub}</p>
                </div>
                {i < 4 && <ArrowRight className="mb-4 h-4 w-4 shrink-0 text-white/20" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 학과 연동 */}
      {!dept && (
        <section className="relative border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-12 text-center">
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-white/30">연계 학과</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://info.ansan.ac.kr/info"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-5 py-3 text-sm font-medium text-blue-300 transition-colors hover:bg-primary/20"
              >
                컴퓨터정보학과 <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://aisw.ansan.ac.kr/aisw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-5 py-3 text-sm font-medium text-violet-300 transition-colors hover:bg-violet-500/20"
              >
                인공지능소프트웨어과 <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 부가 기능 */}
      <section className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <p className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-white/30">부가 기능</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Briefcase, title: '지원 현황 관리', desc: '채용 공고 지원 상태를 단계별로 추적' },
              { icon: FileSpreadsheet, title: '공고 북마크', desc: '관심 공고를 저장하고 내 지원 목록에 추가' },
              { icon: FileEdit, title: '자소서 버전 관리', desc: '회사별 자소서를 저장하고 이력 관리' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10">
                <Icon className="mb-3 h-5 w-5 text-white/30" />
                <h4 className="mb-1 text-sm font-semibold text-white/80">{title}</h4>
                <p className="text-xs leading-relaxed text-white/30">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl space-y-2 px-6 py-8 text-center">
          <p className="text-xs text-white/20">안산대학교 컴퓨터정보과 · AI소프트웨어과 맞춤 취업지원 포털</p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://info.ansan.ac.kr/info"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/20 transition-colors hover:text-white/50"
            >
              컴퓨터정보과
            </a>
            <span className="text-white/10">·</span>
            <a
              href="https://aisw.ansan.ac.kr/aisw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/20 transition-colors hover:text-white/50"
            >
              AI소프트웨어과
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
