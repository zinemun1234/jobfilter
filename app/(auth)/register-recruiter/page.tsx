'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Eye, EyeOff, ArrowRight, Building2, Users, Megaphone, CheckCircle2 } from 'lucide-react';

const FEATURES = [
  { icon: Users, title: 'CS 인재 직접 접근', desc: '컴퓨터공학부 학생들에게 직접 공고 노출' },
  { icon: Megaphone, title: '공고 직접 등록', desc: '승인 후 채용 공고를 자유롭게 관리' },
  { icon: CheckCircle2, title: '검증된 지원자', desc: '전공 학생 대상 타겟 채용 가능' },
];

export default function RegisterRecruiterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', name: '', companyName: '', companyDesc: '' });
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const f = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register-recruiter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? '등록 실패');
      toast.success('기업 계정 신청이 완료되었습니다. 관리자 승인 후 이용 가능합니다.');
      router.push('/login');
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : '오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* 좌측 브랜딩 패널 */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between overflow-hidden bg-[#0a0f1e] px-14 py-14">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-cyan-600/15 blur-[100px]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }}
        />

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 shadow-lg shadow-indigo-500/30">
            <Building2 className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-bold text-white tracking-tight">Job Filter</span>
          <span className="ml-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/50">기업 파트너</span>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-[11px] font-semibold text-indigo-300 tracking-widest uppercase">기업 채용 파트너</span>
            </div>
            <h2 className="text-[2.6rem] font-light text-white leading-[1.2] tracking-tight">
              CS 인재를,<br />
              <span className="font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                직접 만나세요.
              </span>
            </h2>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              컴퓨터공학부 학생들에게 직접 공고를 노출하고<br />
              검증된 CS 인재를 채용하세요.
            </p>
          </div>

          <div className="space-y-3">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.04] px-4 py-3.5 backdrop-blur-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20">
                  <Icon className="h-4 w-4 text-indigo-400" />
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
          {[['공고 등록', '승인 후 자유롭게'], ['타겟 채용', 'CS 전공 학생'], ['관리자 검토', '신뢰할 수 있는 파트너']].map(([t, d]) => (
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
              <Building2 className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-900">Job Filter</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">기업 계정 신청</h1>
            <p className="mt-1.5 text-sm text-gray-400">관리자 승인 후 공고를 직접 등록할 수 있습니다</p>
          </div>

          <div className="mb-5 flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3">
            <span className="mt-0.5 text-amber-500 text-sm">⚠</span>
            <p className="text-xs text-amber-700 leading-relaxed">신청 후 관리자 검토를 거쳐 승인됩니다. 승인 전에는 로그인이 제한됩니다.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="companyName" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">기업명</label>
              <input
                id="companyName" type="text" value={form.companyName} onChange={f('companyName')} required
                placeholder="(주)카카오"
                className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-300 shadow-sm transition-all focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/10"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">담당자명</label>
              <input
                id="name" type="text" value={form.name} onChange={f('name')} required
                placeholder="홍길동"
                className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-300 shadow-sm transition-all focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/10"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">담당자 이메일</label>
              <input
                id="email" type="email" value={form.email} onChange={f('email')} required
                placeholder="recruit@company.com"
                className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-300 shadow-sm transition-all focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/10"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">비밀번호</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  value={form.password} onChange={f('password')} required
                  placeholder="8자 이상"
                  className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-300 shadow-sm transition-all focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/10"
                />
                <button type="button" onClick={() => setShowPw(v => !v)} aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="companyDesc" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">기업 소개 (선택)</label>
              <textarea
                id="companyDesc" value={form.companyDesc} onChange={f('companyDesc')} rows={3}
                placeholder="기업 소개를 간략히 작성해주세요"
                className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-300 shadow-sm transition-all focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/10 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f172a] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0f172a]/20 transition-all hover:bg-[#1e293b] hover:shadow-[#0f172a]/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  신청 중...
                </span>
              ) : (
                <>
                  기업 계정 신청
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-xs text-gray-300">또는</span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          <div className="space-y-2.5">
            <Link href="/login"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50">
              로그인으로 돌아가기
            </Link>
            <Link href="/register"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-500 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50">
              학생 계정으로 가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
