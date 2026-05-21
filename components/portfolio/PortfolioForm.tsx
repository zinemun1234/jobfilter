'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { portfolioSchema } from '@/lib/validations';
import { Portfolio } from '@/lib/generated/prisma';
import { toast } from 'sonner';

type PortfolioFormData = z.infer<typeof portfolioSchema>;

interface PortfolioFormProps {
  portfolio?: Portfolio;
  onSuccess: () => void;
}

const TECH_STACK_OPTIONS = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Angular',
  'Node.js', 'Express', 'NestJS', 'Python', 'Django', 'FastAPI',
  'Java', 'Spring Boot', 'Kotlin', 'Go', 'Rust', 'PHP',
  'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch',
  'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Vercel',
  'Git', 'GitHub', 'GitLab', 'CI/CD', 'TDD', 'Agile',
];

export function PortfolioForm({ portfolio, onSuccess }: PortfolioFormProps) {
  const parsedTechStack: string[] = (() => {
    if (!portfolio?.techStack) return [];
    if (Array.isArray(portfolio.techStack)) return portfolio.techStack as string[];
    try { return JSON.parse(portfolio.techStack as string); } catch { return []; }
  })();

  const [techStack, setTechStack] = useState<string[]>(parsedTechStack);
  const [newTech, setNewTech] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      title: portfolio?.title || '',
      description: portfolio?.description || '',
      techStack: parsedTechStack,
      startDate: portfolio?.startDate ? new Date(portfolio.startDate).toISOString().split('T')[0] : '',
      endDate: portfolio?.endDate ? new Date(portfolio.endDate).toISOString().split('T')[0] : '',
      githubUrl: portfolio?.githubUrl || '',
      deployUrl: portfolio?.deployUrl || '',
    },
  });

  const addTech = (tech: string) => {
    if (tech && !techStack.includes(tech)) {
      const newStack = [...techStack, tech];
      setTechStack(newStack);
      setValue('techStack', newStack, { shouldValidate: true });
      setNewTech('');
    }
  };

  const removeTech = (tech: string) => {
    const newStack = techStack.filter(t => t !== tech);
    setTechStack(newStack);
    setValue('techStack', newStack, { shouldValidate: true });
  };

  const onSubmit = async (data: PortfolioFormData) => {
    // techStack은 register 없이 setValue로만 관리하므로 직접 주입
    const payload = { ...data, techStack };
    setIsSubmitting(true);
    try {
      const url = portfolio ? `/api/portfolio/${portfolio.id}` : '/api/portfolio';
      const method = portfolio ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save portfolio');
      }

      toast.success(portfolio ? '포트폴리오가 수정되었습니다' : '포트폴리오가 추가되었습니다');
      onSuccess();
      reset();
    } catch (error) {
      toast.error('저장에 실패했습니다');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={(e) => {
        setValue('techStack', techStack, { shouldValidate: true });
        handleSubmit(onSubmit)(e);
      }} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">제목 *</Label>
        <Input
          id="title"
          {...register('title')}
          placeholder="프로젝트 제목을 입력하세요"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">설명 *</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="프로젝트에 대해 상세히 설명해주세요"
          rows={4}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>기술 스택 *</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {techStack.map((tech) => (
            <Badge key={tech} variant="default" className="flex items-center gap-1">
              {tech}
              <button
                type="button"
                onClick={() => removeTech(tech)}
                aria-label={`${tech} 제거`}
                className="ml-1 hover:bg-red-500 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            placeholder="기술 스택 입력 또는 선택"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTech(newTech);
              }
            }}
          />
          <Button
            type="button"
            onClick={() => addTech(newTech)}
            disabled={!newTech || techStack.includes(newTech)}
          >
            추가
          </Button>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {TECH_STACK_OPTIONS.filter(tech => !techStack.includes(tech)).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => addTech(tech)}
            >
              {tech}
            </Badge>
          ))}
        </div>
        {errors.techStack && (
          <p className="text-sm text-red-500">{errors.techStack.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">시작일 *</Label>
          <Input
            id="startDate"
            type="date"
            {...register('startDate')}
          />
          {errors.startDate && (
            <p className="text-sm text-red-500">{errors.startDate.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">종료일</Label>
          <Input
            id="endDate"
            type="date"
            {...register('endDate')}
          />
          {errors.endDate && (
            <p className="text-sm text-red-500">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="githubUrl">GitHub URL</Label>
        <Input
          id="githubUrl"
          {...register('githubUrl')}
          placeholder="https://github.com/username/repository"
        />
        {errors.githubUrl && (
          <p className="text-sm text-red-500">{errors.githubUrl.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="deployUrl">배포 URL</Label>
        <Input
          id="deployUrl"
          {...register('deployUrl')}
          placeholder="https://your-app.vercel.app"
        />
        {errors.deployUrl && (
          <p className="text-sm text-red-500">{errors.deployUrl.message}</p>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '저장 중...' : portfolio ? '수정' : '추가'}
        </Button>
        <Button type="button" variant="outline" onClick={() => reset()}>
          초기화
        </Button>
      </div>
    </form>
  );
}
