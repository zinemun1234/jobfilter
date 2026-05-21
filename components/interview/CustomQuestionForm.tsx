'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { interviewQuestionSchema } from '@/lib/validations';
import type { QuestionCategory } from '@/types';
import { toast } from 'sonner';

type QuestionFormData = z.infer<typeof interviewQuestionSchema>;

interface CustomQuestionFormProps {
  onSuccess: () => void;
}

const categories = [
  { value: 'TECHNICAL', label: '기술' },
  { value: 'PERSONALITY', label: '인성' },
  { value: 'SITUATIONAL', label: '상황' },
];

const jobTypes = [
  { value: 'frontend', label: '프론트엔드' },
  { value: 'backend', label: '백엔드' },
  { value: 'common', label: '공통' },
];

export function CustomQuestionForm({ onSuccess }: CustomQuestionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<QuestionFormData>({
    resolver: zodResolver(interviewQuestionSchema),
    defaultValues: {
      category: 'TECHNICAL',
      jobType: 'common',
      question: '',
    },
  });

  const onSubmit = async (data: QuestionFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/interview/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to add custom question');
      toast.success('커스텀 질문이 추가되었습니다');
      onSuccess();
      reset();
    } catch (error) {
      toast.error('추가에 실패했습니다');
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
        <label htmlFor="category" className={labelClass}>카테고리 <span className="text-red-400">*</span></label>
        <select
          id="category"
          value={watch('category')}
          onChange={(e) => setValue('category', e.target.value as QuestionCategory)}
          className={fieldClass}
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>}
      </div>

      <div className="px-5 py-4">
        <label htmlFor="jobType" className={labelClass}>직무 유형</label>
        <select
          id="jobType"
          value={watch('jobType') ?? 'common'}
          onChange={(e) => setValue('jobType', e.target.value as any)}
          className={fieldClass}
        >
          {jobTypes.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        {errors.jobType && <p className="mt-1 text-xs text-red-500">{errors.jobType.message}</p>}
      </div>

      <div className="px-5 py-4">
        <label htmlFor="question" className={labelClass}>질문 <span className="text-red-400">*</span></label>
        <textarea
          id="question"
          {...register('question')}
          placeholder="면접 질문을 입력하세요"
          rows={3}
          className={`${fieldClass} resize-none`}
        />
        {errors.question && <p className="mt-1 text-xs text-red-500">{errors.question.message}</p>}
      </div>

      <div className="px-5 py-4 flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-[#0f172a] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e293b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? '추가 중...' : '추가'}
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
