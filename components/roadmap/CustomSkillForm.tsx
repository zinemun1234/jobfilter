'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { roadmapItemSchema } from '@/lib/validations';
import { toast } from 'sonner';

const customSkillSchema = roadmapItemSchema.pick({
  skill: true,
  referenceLinks: true,
}).extend({
  referenceLinks: z.array(z.string().url()).optional(),
});

type CustomSkillFormData = z.infer<typeof customSkillSchema>;

interface CustomSkillFormProps {
  jobCategory: string;
  onSuccess: () => void;
}

export function CustomSkillForm({ jobCategory, onSuccess }: CustomSkillFormProps) {
  const [referenceLinks, setReferenceLinks] = useState<string[]>([]);
  const [newLink, setNewLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<CustomSkillFormData>({
    resolver: zodResolver(customSkillSchema),
    defaultValues: { skill: '', referenceLinks: [] },
  });

  const addLink = () => {
    if (newLink && !referenceLinks.includes(newLink)) {
      const updated = [...referenceLinks, newLink];
      setReferenceLinks(updated);
      setValue('referenceLinks', updated);
      setNewLink('');
    }
  };

  const removeLink = (link: string) => {
    const updated = referenceLinks.filter(l => l !== link);
    setReferenceLinks(updated);
    setValue('referenceLinks', updated);
  };

  const onSubmit = async (data: CustomSkillFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, jobCategory, isCustom: true, status: 'NOT_STARTED' }),
      });
      if (!response.ok) throw new Error('Failed to add custom skill');
      toast.success('커스텀 기술 항목이 추가되었습니다');
      onSuccess();
      reset();
      setReferenceLinks([]);
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
        <label htmlFor="skill" className={labelClass}>기술명 <span className="text-red-400">*</span></label>
        <input id="skill" type="text" {...register('skill')} className={fieldClass} placeholder="학습할 기술을 입력하세요" />
        {errors.skill && <p className="mt-1 text-xs text-red-500">{errors.skill.message}</p>}
      </div>

      <div className="px-5 py-4">
        <label className={labelClass}>참고 링크</label>
        <div className="flex gap-2">
          <input
            type="url"
            value={newLink}
            onChange={e => setNewLink(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addLink(); } }}
            className={fieldClass}
            placeholder="https://example.com"
          />
          <button
            type="button"
            onClick={addLink}
            disabled={!newLink || referenceLinks.includes(newLink)}
            className="shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 transition-colors"
          >
            추가
          </button>
        </div>
        {referenceLinks.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {referenceLinks.map((link, i) => (
              <span key={i} className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600">
                <span className="max-w-[200px] truncate">{link}</span>
                <button
                  type="button"
                  onClick={() => removeLink(link)}
                  aria-label={`${link} 제거`}
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
        {errors.referenceLinks && <p className="mt-1 text-xs text-red-500">{errors.referenceLinks.message}</p>}
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
          onClick={() => { reset(); setReferenceLinks([]); }}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          초기화
        </button>
      </div>
    </form>
  );
}
