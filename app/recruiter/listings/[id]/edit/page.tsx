'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recruiterListingSchema, RecruiterListingInput } from '@/lib/validations/recruiter';

export default function EditRecruiterListingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<RecruiterListingInput>({
    resolver: zodResolver(recruiterListingSchema),
  });

  useEffect(() => {
    fetch(`/api/recruiter/listings/${params.id}`)
      .then(res => res.json())
      .then(result => {
        if (result.data) {
          reset({
            ...result.data,
            deadline: result.data.deadline ? new Date(result.data.deadline).toISOString().split('T')[0] : '',
          });
        } else {
          setError('공고를 찾을 수 없습니다.');
        }
      })
      .catch(() => setError('공고를 불러오는 데 실패했습니다.'));
  }, [params.id, reset]);

  const onSubmit = async (data: RecruiterListingInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/recruiter/listings/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) { setError(result.error || '공고 수정에 실패했습니다.'); return; }
      router.push('/recruiter/listings');
    } catch {
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">공고 수정</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">기업명</label>
            <input {...register('company')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">직무</label>
            <input {...register('position')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">근무지</label>
            <input {...register('location')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">경력</label>
            <input {...register('career')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">학력</label>
            <input {...register('education')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">고용형태</label>
            <input {...register('employType')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">급여</label>
            <input {...register('salary')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">마감일</label>
            <input type="date" {...register('deadline')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-700">공고 URL</label>
          <input {...register('url')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-700">상세 내용</label>
          <textarea {...register('description')} rows={6} className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-primary" />
        </div>

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-500">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={isLoading} className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50">
            {isLoading ? '저장 중...' : '공고 수정'}
          </button>
        </div>
      </form>
    </div>
  );
}
