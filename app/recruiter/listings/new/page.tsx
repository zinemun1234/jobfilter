'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recruiterListingSchema, RecruiterListingInput } from '@/lib/validations/recruiter';

export default function NewRecruiterListingPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RecruiterListingInput>({
    resolver: zodResolver(recruiterListingSchema),
  });

  const onSubmit = async (data: RecruiterListingInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/recruiter/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) { setError(result.error || '공고 등록에 실패했습니다.'); return; }
      router.push('/recruiter/listings');
    } catch {
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">새 공고 등록</h1>
      <p className="text-sm text-slate-500">관리자 승인 후 학생들에게 공고가 노출됩니다.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">기업명</label>
            <input {...register('company')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" placeholder="(주) 예시 기업" />
            {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">직무</label>
            <input {...register('position')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" placeholder="백엔드 개발자" />
            {errors.position && <p className="mt-1 text-xs text-red-500">{errors.position.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">근무지</label>
            <input {...register('location')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" placeholder="서울 강남" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">경력</label>
            <input {...register('career')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" placeholder="신입/경력" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">학력</label>
            <input {...register('education')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" placeholder="학사 이상" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">고용형태</label>
            <input {...register('employType')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" placeholder="정규직" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">급여</label>
            <input {...register('salary')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" placeholder="면접 후 결정" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">마감일</label>
            <input type="date" {...register('deadline')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-700">공고 URL</label>
          <input {...register('url')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" placeholder="https://..." />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-700">상세 내용</label>
          <textarea {...register('description')} rows={6} className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" placeholder="주요 업무, 자격 요건, 우대 사항 등" />
        </div>

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-500">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={isLoading} className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50">
            {isLoading ? '등록 중...' : '공고 등록'}
          </button>
        </div>
      </form>
    </div>
  );
}
