'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Mail, KeyRound, ShieldCheck } from 'lucide-react';

const FEATURES = [
  { icon: Mail, title: '이메일로 재설정', desc: '가입한 이메일로 재설정 링크를 보내드려요' },
  { icon: KeyRound, title: '안전한 토큰', desc: '1회용 보안 링크로 계정을 보호합니다' },
  { icon: ShieldCheck, title: '즉시 적용', desc: '변경 즉시 새 비밀번호로 로그인 가능' },
];

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) { setStatus('error'); return; }
      if (data.devToken) {
        router.push(`/reset-password?token=${data.devToken}`);
        return;
      }
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

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
              비밀번호를<br />
              <span className="font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                재설정하세요.
              </span>
            </h2>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              가입한 이메일로 재설정 링크를 보내드립니다.<br />
              이메일이 없다면 관리자에게 문의하세요.
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
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">비밀번호 찾기</h1>
            <p className="mt-1.5 text-sm text-gray-400">가입한 이메일 주소를 입력하세요</p>
          </div>

          {status === 'done' ? (
            <div className="space-y-4">
              <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-4">
                <p className="text-sm font-semibold text-emerald-700">이메일이 전송되었습니다</p>
                <p className="text-xs text-emerald-600 mt-1">받은 편지함을 확인하고 링크를 클릭하세요.</p>
              </div>
              <Link href="/login"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50">
                로그인으로 돌아가기
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">이메일</label>
                <input
                  id="email" type="email" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-300 shadow-sm transition-all focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/10"
                />
              </div>

              {status === 'error' && (
                <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
                  오류가 발생했습니다. 다시 시도해주세요.
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
                    전송 중...
                  </span>
                ) : (
                  <>
                    재설정 링크 전송
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              <div className="my-2 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-100" />
                <span className="text-xs text-gray-300">또는</span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>

              <Link href="/login"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50">
                로그인으로 돌아가기
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
