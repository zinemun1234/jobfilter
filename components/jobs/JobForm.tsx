'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { jobPostingSchema } from '@/lib/validations';
import type { JobPosting as PrismaJobPosting } from '@/lib/generated/prisma';
import type { ApplicationStatus } from '@/types';
import { toast } from 'sonner';

type JobFormData = z.infer<typeof jobPostingSchema>;

interface JobFormProps {
  job?: PrismaJobPosting;
  onSuccess: () => void;
}

const statusOptions: { value: ApplicationStatus; label: string }[] = [
  { value: 'PREPARING', label: '서류 준비 중' },
  { value: 'APPLIED', label: '지원 완료' },
  { value: 'DOCUMENT_PASS', label: '서류 합격' },
  { value: 'INTERVIEW', label: '면접 예정' },
  { value: 'FINAL_PASS', label: '최종 합격' },
  { value: 'REJECTED', label: '불합격' },
];

export function JobForm({ job, onSuccess }: JobFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<JobFormData, unknown, JobFormData>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      company: job?.company || '',
      position: job?.position || '',
      url: job?.url || '',
      deadline: job?.deadline ? new Date(job.deadline).toISOString().split('T')[0] : '',
      status: (job?.status as ApplicationStatus) || 'PREPARING',
    },
  });

  const status = watch('status');

  const onSubmit = async (data: JobFormData) => {
    setIsSubmitting(true);
    try {
      const url = job ? `/api/jobs/${job.id}` : '/api/jobs';
      const method = job ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to save job');
      toast.success(job ? '채용 공고가 수정되었습니다' : '채용 공고가 추가되었습니다');
      onSuccess();
      reset();
    } catch (error) {
      toast.error('저장에 실패했습니다');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = "block w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none transition-colors";
  const labelClass = "block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-0 divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="px-5 py-4">
        <label htmlFor="company" className={labelClass}>회사명 <span className="text-red-400">*</span></label>
        <input id="company" type="text" {...register('company')} className={fieldClass} placeholder="회사명을 입력하세요" />
        {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company.message}</p>}
      </div>

      <div className="px-5 py-4">
        <label htmlFor="position" className={labelClass}>직무명 <span className="text-red-400">*</span></label>
        <input id="position" type="text" {...register('position')} className={fieldClass} placeholder="직무명을 입력하세요" />
        {errors.position && <p className="mt-1 text-xs text-red-500">{errors.position.message}</p>}
      </div>

      <div className="px-5 py-4">
        <label htmlFor="url" className={labelClass}>채용 공고 URL</label>
        <input id="url" type="url" {...register('url')} className={fieldClass} placeholder="https://example.com/job-posting" />
        {errors.url && <p className="mt-1 text-xs text-red-500">{errors.url.message}</p>}
      </div>

      <div className="px-5 py-4">
        <label htmlFor="deadline" className={labelClass}>마감일</label>
        <input id="deadline" type="date" {...register('deadline')} className={fieldClass} />
        {errors.deadline && <p className="mt-1 text-xs text-red-500">{errors.deadline.message}</p>}
      </div>

      <div className="px-5 py-4">
        <label htmlFor="status" className={labelClass}>지원 상태 <span className="text-red-400">*</span></label>
        <select
          id="status"
          value={status}
          onChange={(e) => setValue('status', e.target.value as ApplicationStatus)}
          className={fieldClass}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {errors.status && <p className="mt-1 text-xs text-red-500">{errors.status.message}</p>}
      </div>

      <div className="px-5 py-4 flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-[#0f172a] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e293b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? '저장 중...' : job ? '수정' : '추가'}
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          초기화
        </button>
      </div>
    </form>
  );
}
