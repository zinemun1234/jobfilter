'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileInput } from '@/lib/validations/profile';
import { User } from '@/types';
import { X } from 'lucide-react';

const MAJOR_OPTIONS = [
  { value: '컴퓨터공학', label: '컴퓨터공학' },
  { value: '소프트웨어공학', label: '소프트웨어공학' },
  { value: '정보통신', label: '정보통신' },
  { value: '전자공학', label: '전자공학' },
  { value: '기타', label: '기타' },
];

const TARGET_JOB_OPTIONS = [
  { value: '프론트엔드 개발자', label: '프론트엔드 개발자' },
  { value: '백엔드 개발자', label: '백엔드 개발자' },
  { value: '풀스택 개발자', label: '풀스택 개발자' },
  { value: '모바일 개발자', label: '모바일 개발자 (iOS/Android)' },
  { value: '데이터 엔지니어', label: '데이터 엔지니어' },
  { value: 'AI/ML 엔지니어', label: 'AI/ML 엔지니어' },
  { value: 'DevOps/클라우드', label: 'DevOps/클라우드 엔지니어' },
  { value: '보안 엔지니어', label: '보안 엔지니어' },
  { value: 'IT 기획/PM', label: 'IT 기획/PM' },
  { value: 'QA 엔지니어', label: 'QA 엔지니어' },
  { value: '사무/경영지원', label: '사무/경영지원' },
];

interface ProfileFormProps {
  user: User;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [skills, setSkills] = useState<string[]>(Array.isArray(user.skills) ? user.skills : []);
  const [skillInput, setSkillInput] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const skillInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name ?? '',
      major: user.major ?? '',
      targetJob: user.targetJob ?? '',
      skills: Array.isArray(user.skills) ? user.skills : [],
    },
  });

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills(prev => [...prev, trimmed]);
      setSkillInput('');
      skillInputRef.current?.focus();
    }
  };

  const removeSkill = (skill: string) => setSkills(prev => prev.filter(s => s !== skill));

  const onSubmit = async (data: ProfileInput) => {
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, skills }),
      });
      const result = await res.json();
      if (!res.ok) { setErrorMessage(result.error || '저장에 실패했습니다.'); return; }
      setSuccessMessage('프로필이 저장되었습니다.');
    } catch {
      setErrorMessage('네트워크 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const fieldClass = "mt-1 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 transition-colors";
  const labelClass = "block text-xs font-medium text-gray-500 uppercase tracking-wide";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {successMessage && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600 flex items-center justify-between">
          {errorMessage}
          <button type="button" onClick={handleSubmit(onSubmit)} className="text-xs underline ml-3">재시도</button>
        </div>
      )}

      <div className="rounded-xl border border-gray-100 bg-white shadow-sm divide-y divide-gray-50">
        {/* 이름 */}
        <div className="px-5 py-4">
          <label htmlFor="name" className={labelClass}>이름</label>
          <input id="name" type="text" {...register('name')} className={fieldClass} placeholder="홍길동" />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        {/* 전공 */}
        <div className="px-5 py-4">
          <label htmlFor="major" className={labelClass}>전공 계열</label>
          <select id="major" {...register('major')} className={fieldClass}>
            <option value="">선택하세요</option>
            {MAJOR_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {errors.major && <p className="mt-1 text-xs text-red-500">{errors.major.message}</p>}
        </div>

        {/* 목표 직무 */}
        <div className="px-5 py-4">
          <label htmlFor="targetJob" className={labelClass}>목표 직무</label>
          <p className="text-xs text-gray-400 mb-1.5">설정하면 맞춤 공고 알림 + 자소서 코칭 직군이 자동으로 맞춰집니다</p>
          <select id="targetJob" {...register('targetJob')} className={fieldClass}>
            <option value="">선택하세요</option>
            {TARGET_JOB_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {errors.targetJob && <p className="mt-1 text-xs text-red-500">{errors.targetJob.message}</p>}
        </div>

        {/* 기술 스택 */}
        <div className="px-5 py-4">
          <label className={labelClass}>기술 스택</label>
          <div className="mt-1 flex gap-2">
            <input
              ref={skillInputRef}
              type="text"
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
              className={fieldClass}
              placeholder="기술을 입력하고 Enter"
            />
            <button
              type="button"
              onClick={addSkill}
              className="shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              추가
            </button>
          </div>
          {skills.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {skills.map(skill => (
                <span key={skill} className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    aria-label={`${skill} 제거`}
                    className="text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-[#0f172a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1e293b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? '저장 중...' : '저장'}
      </button>
    </form>
  );
}
