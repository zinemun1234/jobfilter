'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BookOpen, Plus, Check, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { JobPosting } from '@/lib/generated/prisma';

type Experience = {
  id: string;
  title: string;
  situation: string;
  action: string;
  result: string;
  technologies: string[];
  metrics?: string | null;
};

type ExperienceLibraryProps = { onInsertAction: (experience: Experience) => void };

const emptyForm = { title: '', situation: '', action: '', result: '', technologies: '', metrics: '' };

export default function ExperienceLibrary({ onInsertAction }: ExperienceLibraryProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [jobId, setJobId] = useState('');

  const { data: jobs = [], isLoading: jobsLoading } = useQuery<JobPosting[]>({
    queryKey: ['jobs'],
    queryFn: async () => {
      const response = await fetch('/api/jobs');
      if (!response.ok) throw new Error('Failed to fetch jobs');
      return (await response.json()).data;
    },
  });

  const { data: experiences = [], isLoading } = useQuery<Experience[]>({
    queryKey: ['experiences'],
    queryFn: async () => {
      const response = await fetch('/api/experiences');
      if (!response.ok) throw new Error('Failed');
      return (await response.json()).data;
    },
  });
  const create = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/experiences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          technologies: form.technologies.split(',').map(value => value.trim()).filter(Boolean),
          jobId,
        }),
      });
      if (!response.ok) throw new Error((await response.json()).error ?? 'Failed');
      return (await response.json()).data as Experience;
    },
    onSuccess: experience => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      queryClient.invalidateQueries({ queryKey: ['job'] });
      setForm(emptyForm);
      setJobId('');
      setOpen(false);
      toast.success('경험을 저장했습니다');
      onInsertAction(experience);
    },
    onError: (error: Error) => toast.error(error.message),
  });
  const remove = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/experiences/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('삭제에 실패했습니다');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      queryClient.invalidateQueries({ queryKey: ['job'] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <div>
            <p className="text-xs font-semibold text-emerald-700">경험 저장소</p>
            <p className="text-xs text-emerald-600">STAR 경험을 저장하고 자소서에 재사용하세요.</p>
          </div>
        </div>
        <button type="button" onClick={() => setOpen(value => !value)} className="inline-flex items-center gap-1 rounded-lg bg-white border border-emerald-200 px-2.5 py-1.5 text-[11px] font-medium text-emerald-700 hover:bg-emerald-50">
          <Plus className="w-3 h-3" /> 새 경험
        </button>
      </div>
      {open && (
        <div className="space-y-2 rounded-lg bg-white border border-emerald-100 p-3">
          {([
            ['title', '경험 제목', '예: 팀 프로젝트 성능 개선'],
            ['situation', '상황', '어떤 상황·문제가 있었나요?'],
            ['action', '행동', '무엇을 했나요?'],
            ['result', '결과', '결과와 배운 점은 무엇인가요?'],
            ['technologies', '사용 기술', 'React, TypeScript, Git'],
            ['metrics', '수치·성과', '응답 시간 30% 개선'],
          ] as [keyof typeof form, string, string][]).map(([key, label, placeholder]) => (
            <div key={key}>
              <label className="block text-[11px] font-medium text-gray-500 mb-1">{label}</label>
              {['situation', 'action', 'result'].includes(key) ? (
                <textarea value={form[key]} onChange={event => setForm(current => ({ ...current, [key]: event.target.value }))} placeholder={placeholder} rows={2} className="w-full rounded-lg border border-gray-200 px-2.5 py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
              ) : (
                <input value={form[key]} onChange={event => setForm(current => ({ ...current, [key]: event.target.value }))} placeholder={placeholder} className="w-full rounded-lg border border-gray-200 px-2.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
              )}
            </div>
          ))}
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">연결된 공고 (선택)</label>
            <select
              value={jobId}
              onChange={event => setJobId(event.target.value)}
              disabled={jobsLoading}
              className="w-full rounded-lg border border-gray-200 px-2.5 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 bg-white"
            >
              <option value="">공고 연결 안 함</option>
              {jobs.map(job => (
                <option key={job.id} value={job.id}>
                  {job.company} - {job.position}
                </option>
              ))}
            </select>
          </div>
          <button type="button" onClick={() => create.mutate()} disabled={create.isPending || !form.title || !form.situation || !form.action || !form.result} className="w-full rounded-lg bg-emerald-600 py-2 text-xs font-medium text-white hover:bg-emerald-700 disabled:opacity-50">{create.isPending ? '저장 중...' : '경험 저장'}</button>
        </div>
      )}
      {isLoading ? <p className="text-[11px] text-gray-400">경험을 불러오는 중...</p> : experiences.length === 0 ? <p className="text-[11px] text-gray-500">저장된 경험이 없습니다.</p> : (
        <div className="space-y-2 max-h-52 overflow-y-auto">
          {experiences.map(experience => (
            <div key={experience.id} className="rounded-lg border border-emerald-100 bg-white px-3 py-2.5">
              <div className="flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-700 truncate">{experience.title}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{experience.result}</p>
                  {experience.technologies.length > 0 && <p className="text-xs text-emerald-600 mt-1">{experience.technologies.join(', ')}</p>}
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => onInsertAction(experience)} className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100"><Check className="w-3 h-3" /> 삽입</button>
                  <button type="button" onClick={() => remove.mutate(experience.id)} aria-label="경험 삭제" className="rounded-md p-1 text-gray-300 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
