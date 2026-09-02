'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { loginSchema, LoginInput } from '@/lib/validations/auth';
import { Eye, EyeOff, ArrowRight, CheckCircle2, Sparkles, BarChart2, FileEdit } from 'lucide-react';

const FEATURES = [
  { icon: Sparkles, title: '맞춤 공고 필터링', desc: 'CS 직군 공고만 자동으로 골라드려요' },
  { icon: FileEdit, title: '자소서 AI 코칭', desc: '직무별 맞춤 피드백으로 합격률 UP' },
  { icon: BarChart2, title: '지원 현황 분석', desc: '내 취업 준비 상태를 한눈에 파악' },
];

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get('registered') === 'true';
  const isRecruiterRegistered = searchParams.get('registered') === 'recruiter';
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const result = await signIn('credentials', { email: data.email, password: data.password, redirect: false });
      if (!result?.ok) { setAuthError('이메일 또는 비밀번호가 올바르지 않습니다.'); return; }

      // 로그인 성공 후 role에 따라 분기
      const sessionRes = await fetch('/api/auth/session');
      const session = await sessionRes.json();
      const role = session?.user?.role;

      if (role === 'RECRUITER') router.push('/recruiter');
      else if (role === 'ADMIN') router.push('/admin');
      else router.push('/dashboard');
    } catch {
      setAuthError('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* ── 좌측 브랜딩 패널 ── */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between overflow-hidden bg-slate-950 px-14 py-14">
        {/* 배경 그라디언트 오브 */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-500/15 blur-[100px]" />
        {/* 그리드 패턴 */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* 로고 */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
            <span className="text-xs font-black text-white tracking-tight">JF</span>
          </div>
          <span className="text-sm font-bold text-white tracking-tight">Job Filter</span>
          <span className="ml-1 rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white/50">CS 취업지원 포털</span>
        </div>

        {/* 메인 카피 */}
        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs font-semibold text-blue-300 tracking-widest uppercase">컴퓨터공학부 전용</span>
            </div>
            <h2 className="text-[2.6rem] font-light text-white leading-[1.2] tracking-tight">
              취업 준비,<br />
              <span className="font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                더 스마트하게.
              </span>
            </h2>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              AI가 공고를 걸러주고, 자소서 코칭까지.<br />
              취업 준비의 모든 것을 한 곳에서.
            </p>
          </div>

          {/* 피처 카드 */}
          <div className="space-y-3">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.04] px-4 py-3.5 backdrop-blur-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/20">
                  <Icon className="h-4 w-4 text-blue-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-xs text-white/40 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 통계 */}
        <div className="relative z-10 flex gap-8 border-t border-white/[0.08] pt-6">
          {[['CS 맞춤 공고', '자동 필터링'], ['자소서 코칭', 'AI 피드백'], ['면접 준비', '예상 질문']].map(([t, d]) => (
            <div key={t}>
              <p className="text-xs font-semibold text-white/60">{t}</p>
              <p className="text-xs text-white/25 mt-0.5">{d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 우측 폼 패널 ── */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-[380px]">
          {/* 모바일 로고 */}
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
              <span className="text-xs font-black text-white">JF</span>
            </div>
            <span className="text-sm font-bold text-foreground">Job Filter</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">다시 오셨군요</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">계정에 로그인하세요</p>
          </div>

          {isRegistered && (
            <div className="mb-5 flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <p className="text-sm text-emerald-700">회원가입 완료! 로그인해주세요.</p>
            </div>
          )}
          {isRecruiterRegistered && (
            <div className="mb-5 flex items-center gap-3 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3">
              <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
              <p className="text-sm text-amber-700">기업 회원가입 완료! 관리자 승인 후 로그인 가능합니다.</p>
            </div>
          )}
          {authError && (
            <div className="mb-5 rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* 이메일 */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">이메일</label>
              <input
                id="email" type="email" autoComplete="email"
                {...register('email')}
                placeholder="example@email.com"
                className="block w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>

            {/* 비밀번호 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">비밀번호</label>
                <Link href="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  비밀번호 찾기
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  {...register('password')}
                  placeholder="비밀번호를 입력하세요"
                  className="block w-full rounded-xl border border-border bg-white px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              className="group mt-2 flex w-full h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  로그인 중...
                </span>
              ) : (
                <>
                  로그인
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          {/* 구분선 */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">또는</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* 회원가입 링크 */}
          <div className="space-y-2.5">
            <Link
              href="/register"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted"
            >
              학생 회원가입
            </Link>
            <Link
              href="/register-recruiter"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-100/50 bg-emerald-50/30 px-4 py-3 text-sm font-medium text-emerald-700 shadow-sm transition-all hover:bg-emerald-50/50"
            >
              기업 회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
