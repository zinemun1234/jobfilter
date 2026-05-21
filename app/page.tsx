import Link from 'next/link';
import { FileSpreadsheet, FileEdit, Briefcase, ArrowRight, ExternalLink, CheckCircle2, Clock } from 'lucide-react';
import { prisma } from '@/lib/prisma';

const DEPT_CONFIG: Record<string, { name: string; label: string; homeUrl: string; color: string }> = {
  info: { name: '컴퓨터정보과', label: '컴퓨터정보과 전용', homeUrl: 'https://info.ansan.ac.kr/info', color: 'blue' },
  aisw: { name: 'AI소프트웨어과', label: 'AI소프트웨어과 전용', homeUrl: 'https://aisw.ansan.ac.kr/aisw', color: 'violet' },
};

export default async function Home({ searchParams }: { searchParams: { from?: string } }) {
  const from = searchParams?.from ?? '';
  const dept = DEPT_CONFIG[from] ?? null;
  const accentBlue = dept?.color === 'violet' ? 'violet' : 'blue';

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
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* 학과 연결 배너 */}
      {dept && (
        <div className={`w-full py-2 px-6 text-center text-xs font-medium flex items-center justify-center gap-2 ${
          accentBlue === 'violet' ? 'bg-violet-600' : 'bg-blue-600'
        }`}>
          <span>{dept.name} 홈페이지에서 연결되었습니다</span>
          <span className="opacity-50">·</span>
          <a href={dept.homeUrl} target="_blank" rel="noopener noreferrer"
            className="underline underline-offset-2 opacity-80 hover:opacity-100 inline-flex items-center gap-1">
            돌아가기 <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* 헤더 */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center">
              <span className="text-[10px] font-black text-white">CS</span>
            </div>
            <span className="text-sm font-semibold text-white">
              {dept ? dept.name : '컴퓨터공학부'} 취업지원
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
              로그인
            </Link>
            <Link href="/register"
              className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors">
              시작하기
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-20 text-center">
        <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-8 ${
          accentBlue === 'violet' ? 'bg-violet-500/10 border-violet-500/30' : 'bg-blue-500/10 border-blue-500/30'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${accentBlue === 'violet' ? 'bg-violet-400' : 'bg-blue-400'}`} />
          <span className={`text-xs font-semibold ${accentBlue === 'violet' ? 'text-violet-300' : 'text-blue-300'}`}>
            {dept ? dept.label : '컴퓨터공학부 전용'} · 학과 맞춤형 취업 지원
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-light text-white leading-tight tracking-tight">
          취업 공고는 자동으로,<br />
          <span className="font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            자소서는 내가 직접.
          </span>
        </h1>

        <p className="mt-6 text-base text-white/50 max-w-xl mx-auto leading-relaxed">
          학교 취업지원처 엑셀에서 CS 직군만 자동 추출.
          자소서는 대신 써주지 않고, 방향만 코칭합니다.
        </p>

        <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
          <Link href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-7 py-3.5 text-sm font-semibold text-white hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/25">
            지금 시작하기 <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            로그인
          </Link>
        </div>
      </section>

      {/* 공고 미리보기 섹션 */}
      {totalListings > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">지금 올라온 공고</p>
              <p className="text-white/60 text-sm">
                현재 <span className="text-blue-400 font-bold">{totalListings}개</span> 공고가 등록되어 있습니다
              </p>
            </div>
            <Link href="/open/listings"
              className="flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
              전체 보기 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {previewListings.map(l => {
              const tags: string[] = (() => { try { return l.tags ? JSON.parse(l.tags) : []; } catch { return []; } })();
              const deadline = l.deadline ? new Date(l.deadline) : null;
              const daysLeft = deadline ? Math.ceil((deadline.getTime() - Date.now()) / 86400000) : null;
              const isNew = (Date.now() - new Date(l.createdAt).getTime()) < 7 * 86400000;
              return (
                <div key={l.id} className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/8 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <p className="text-[11px] text-white/40">{l.company}</p>
                        {isNew && <span className="text-[9px] font-bold bg-blue-500 text-white px-1.5 py-0.5 rounded-full">NEW</span>}
                      </div>
                      <p className="text-sm font-medium text-white/80 leading-snug truncate">{l.position}</p>
                    </div>
                    {l.employType && (
                      <span className="shrink-0 text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">{l.employType}</span>
                    )}
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {tags.slice(0, 3).map(t => (
                        <span key={t} className="text-[10px] bg-white/10 text-white/40 px-1.5 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-[10px] text-white/30">
                    <Clock className="w-3 h-3" />
                    {deadline
                      ? (daysLeft !== null && daysLeft >= 0 ? `D-${daysLeft}` : '마감')
                      : '마감일 미정'}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-center">
            <Link href="/open/listings"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-2.5 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-colors">
              전체 공고 {totalListings}개 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* 핵심 기능 2개 */}      <section className="mx-auto max-w-6xl px-6 pb-20">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-6 text-center">핵심 기능</p>
        <div className="grid md:grid-cols-2 gap-5">
          {/* 공고 필터링 */}
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-7 hover:border-blue-500/40 transition-colors">
            <div className="flex items-center gap-3 mb-5">
              <div className="rounded-xl bg-blue-500/20 p-3">
                <FileSpreadsheet className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">핵심 기능 ①</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">맞춤 공고 자동 필터링</h3>
            <p className="text-sm text-white/50 leading-relaxed mb-5">
              취업지원처에서 매주 오는 엑셀 파일을 업로드하면,
              개발·IT·보안·데이터 직군 공고만 자동으로 추출해 보여줍니다.
            </p>
            <ul className="space-y-2">
              {['엑셀 업로드 → CS 직군 자동 분류', 'NEW 뱃지 · 마감임박 D-3 표시', '공고에서 바로 자소서 작성 연결'].map(t => (
                <li key={t} className="flex items-center gap-2 text-xs text-blue-300/70">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />{t}
                </li>
              ))}
            </ul>
          </div>

          {/* 자소서 코칭 */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-7 hover:border-amber-500/40 transition-colors">
            <div className="flex items-center gap-3 mb-5">
              <div className="rounded-xl bg-amber-500/20 p-3">
                <FileEdit className="w-6 h-6 text-amber-400" />
              </div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">핵심 기능 ②</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">자소서 빨간펜 코칭</h3>
            <p className="text-sm text-white/50 leading-relaxed mb-5">
              AI가 대신 써주지 않습니다. 직무에 맞는 수정 방향만 번호로 짚어주고,
              학생이 직접 고쳐서 실력을 키웁니다.
            </p>
            <ul className="space-y-2">
              {['직군별 체크리스트 + 작성 가이드', '글자수·STAR기법·공허한표현 분석', '목표 직무 기반 준비 현황 제공'].map(t => (
                <li key={t} className="flex items-center gap-2 text-xs text-amber-300/70">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 사용 흐름 */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-8 text-center">사용 흐름</p>
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
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xs font-bold text-white/60">{item.step}</span>
                  </div>
                  <p className="text-xs font-semibold text-white/80">{item.label}</p>
                  <p className="text-[10px] text-white/30 mt-0.5">{item.sub}</p>
                </div>
                {i < 4 && <ArrowRight className="w-4 h-4 text-white/20 shrink-0 mb-4" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 학과 연동 */}
      {!dept && (
        <section className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-12 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-5">연계 학과</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a href="https://info.ansan.ac.kr/info" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-sm font-medium text-blue-300 hover:bg-blue-500/20 transition-colors">
                컴퓨터정보학과 <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a href="https://aisw.ansan.ac.kr/aisw" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-5 py-3 text-sm font-medium text-violet-300 hover:bg-violet-500/20 transition-colors">
                인공지능소프트웨어과 <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 부가 기능 */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-6 text-center">부가 기능</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Briefcase, title: '지원 현황 관리', desc: '채용 공고 지원 상태를 단계별로 추적' },
              { icon: FileSpreadsheet, title: '공고 북마크', desc: '관심 공고를 저장하고 내 지원 목록에 추가' },
              { icon: FileEdit, title: '자소서 버전 관리', desc: '회사별 자소서를 저장하고 이력 관리' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <Icon className="w-5 h-5 text-white/30 mb-3" />
                <h4 className="text-sm font-semibold text-white/80 mb-1">{title}</h4>
                <p className="text-xs text-white/30 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center space-y-2">
          <p className="text-xs text-white/20">안산대학교 컴퓨터정보과 · AI소프트웨어과 맞춤 취업지원 포털</p>
          <div className="flex items-center justify-center gap-4">
            <a href="https://info.ansan.ac.kr/info" target="_blank" rel="noopener noreferrer"
              className="text-xs text-white/20 hover:text-white/50 transition-colors">컴퓨터정보과</a>
            <span className="text-white/10">·</span>
            <a href="https://aisw.ansan.ac.kr/aisw" target="_blank" rel="noopener noreferrer"
              className="text-xs text-white/20 hover:text-white/50 transition-colors">AI소프트웨어과</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
