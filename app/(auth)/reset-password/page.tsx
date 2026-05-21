'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, Lock, ShieldCheck, KeyRound } from 'lucide-react';

const FEATURES = [
  { icon: Lock, title: '강력한 비밀번호', desc: '영문+숫자 조합 8자 이상을 권장합니다' },
  { icon: ShieldCheck, title: '즉시 적용', desc: '변경 즉시 새 비밀번호로 로그인 가능' },
  { icon: KeyRound, title: '1회용 링크', desc: '보안을 위해 링크는 1회만 사용 가능합니다' },
];

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') ?? '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setErrorMsg('비밀번호가 일치하지 않습니다.'); return; }
    if (password.length < 8) { setErrorMsg('비밀번호는 8자 이상이어야 합니다.'); return; }
    setStatus('loading'); setErrorMsg('');
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error ?? '오류가 발생했습니다.'); setStatus('error'); return; }
      setStatus('done');
      setTimeout(() => router.push('/login'), 2000);
    } catch {
      setErrorMsg('네트워크 오류가 발생했습니다.'); setStatus('error');
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center space-y-3">
          <p className="text-sm text-red-500">유효하지 않은 링크입니다.</p>
          <Link href="/forgot-password" className="text-sm text-[#0f172a] font-medium hover:underline">
            비밀번호 찾기로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* 좌측 브랜딩 패널 */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between overflow-hidden bg-[#0a0f1e] px-14 py-14">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/15 blur-[100px]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }}
        />

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 shadow-lg shadow-blue-500/30">
            <span className="text-[11px] font-black text-white tracking-tight">JF</span>
          </div>
          <span className="text-sm font-bold text-white tracking-tight">Job Filter</span>
          <span className="ml-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/50">CS 취업지원 포털</span>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[11px] font-semibold text-blue-300 tracking-widest uppercase">계정 보안</span>
            </div>
            <h2 className="text-[2.6rem] font-light text-white leading-[1.2] tracking-tight">
              새 비밀번호를<br />
              <span className="font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                설정하세요.
              </span>
            </h2>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              안전한 비밀번호로 계정을 보호하세요.<br />
              영문+숫자 조합 8자 이상을 권장합니다.
            </p>
          </div>

          <div className="space-y-3">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.04] px-4 py-3.5 backdrop-blur-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/20">
                  <Icon className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-xs text-white/40 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex gap-8 border-t border-white/[0.08] pt-6">
          {[['CS 맞춤 공고', '자동 필터링'], ['자소서 코칭', 'AI 피드백'], ['면접 준비', '예상 질문']].map(([t, d]) => (
            <div key={t}>
              <p className="text-xs font-semibold text-white/60">{t}</p>
              <p className="text-[11px] text-white/25 mt-0.5">{d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 우측 폼 패널 */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-gray-50/50">
        <div className="w-full max-w-[380px]">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f172a]">
              <span className="text-[10px] font-black text-white">JF</span>
            </div>
            <span className="text-sm font-bold text-gray-900">Job Filter</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">비밀번호 재설정</h1>
            <p className="mt-1.5 text-sm text-gray-400">새 비밀번호를 입력하세요</p>
          </div>

          {status === 'done' ? (
            <div className="space-y-4">
              <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-4">
                <p className="text-sm font-semibold text-emerald-700">비밀번호가 변경되었습니다</p>
                <p className="text-xs text-emerald-600 mt-1">잠시 후 로그인 페이지로 이동합니다...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">새 비밀번호</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPw ? 'text' : 'password'}
                    required value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="8자 이상 입력"
                    className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-300 shadow-sm transition-all focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/10"
                  />
                  <button type="button" onClick={() => setShowPw(v => !v)} aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="confirm" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">비밀번호 확인</label>
                <div className="relative">
                  <input
                    id="confirm"
                    type={showConfirm ? 'text' : 'password'}
                    required value={confirm} onChange={e => setConfirm(e.target.value)}
                    placeholder="비밀번호를 다시 입력"
                    className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-300 shadow-sm transition-all focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/10"
                  />
                  <button type="button" onClick={() => setShowConfirm(v => !v)} aria-label={showConfirm ? '비밀번호 숨기기' : '비밀번호 보기'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f172a] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0f172a]/20 transition-all hover:bg-[#1e293b] hover:shadow-[#0f172a]/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    변경 중...
                  </span>
                ) : (
                  <>
                    비밀번호 변경
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
