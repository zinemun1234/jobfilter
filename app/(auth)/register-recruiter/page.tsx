'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recruiterRegisterSchema, RecruiterRegisterInput } from '@/lib/validations/recruiter';
import { Eye, EyeOff, ArrowRight, Building2, Briefcase, FileText } from 'lucide-react';

const FEATURES = [
  { icon: Building2, title: '기업 공고 직접 등록', desc: '관리자 승인 후 채용 공고를 직접 게재할 수 있습니다.' },
  { icon: Briefcase, title: '지원 현황 확인', desc: '등록한 공고에 대한 학생 관심도를 파악할 수 있습니다.' },
  { icon: FileText, title: '간편한 공고 관리', desc: '공고 등록, 수정, 비활성화를 한곳에서 관리합니다.' },
];

export default function RecruiterRegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RecruiterRegisterInput>({
    resolver: zodResolver(recruiterRegisterSchema),
  });

  const onSubmit = async (data: RecruiterRegisterInput) => {
    setIsLoading(true);
    setServerError(null);
    try {
      const response = await fetch('/api/auth/register-recruiter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) { setServerError(result.error || '회원가입에 실패했습니다.'); return; }
      router.push('/login?registered=recruiter');
    } catch {
      setServerError('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between overflow-hidden bg-slate-950 px-14 py-14">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-500/15 blur-[100px]" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
            <span className="text-xs font-black text-white tracking-tight">JF</span>
          </div>
          <span className="text-sm font-bold text-white tracking-tight">Job Filter</span>
        </div>
        <div className="relative z-10 space-y-6">
          <h2 className="text-[2.2rem] font-light text-white leading-[1.2] tracking-tight">
            기업 인재를<br />
            <span className="font-semibold">JobFilter</span>에서 만나보세요.
          </h2>
          <div className="space-y-4">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="rounded-xl bg-primary/20 p-2.5">
                  <Icon className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-xs text-white/50 mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="relative z-10 text-xs text-white/30">JobFilter 기업 회원 가입</p>
      </div>

      <div className="flex w-full lg:w-[48%] items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Recruiter</p>
            <h1 className="text-2xl font-semibold text-white">기업 회원 가입</h1>
            <p className="text-sm text-white/50">관리자 승인 후 공고 등록이 가능합니다.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/70">담당자 이름</label>
              <input {...register('name')} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-primary" placeholder="홍길동" />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/70">이메일</label>
              <input type="email" {...register('email')} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-primary" placeholder="company@example.com" />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/70">기업명</label>
              <input {...register('companyName')} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-primary" placeholder="(주) 예시 기업" />
              {errors.companyName && <p className="mt-1 text-xs text-red-400">{errors.companyName.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/70">기업 소개 (선택)</label>
              <textarea {...register('companyDesc')} rows={3} className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-primary" placeholder="기업 소개를 간단히 입력해주세요." />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/70">비밀번호</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} {...register('password')} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-primary" placeholder="8자 이상, 영문+숫자" />
                <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/70">비밀번호 확인</label>
              <div className="relative">
                <input type={showConfirm ? 'text' : 'password'} {...register('confirmPassword')} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-primary" placeholder="비밀번호를 다시 입력해주세요" />
                <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-400">{errors.confirmPassword.message}</p>}
            </div>

            {serverError && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">{serverError}</p>}

            <button type="submit" disabled={isLoading} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-50">
              {isLoading ? '가입 중...' : '기업 회원 가입'} <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="text-center text-xs text-white/40">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-primary hover:underline">로그인</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
