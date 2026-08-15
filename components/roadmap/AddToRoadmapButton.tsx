'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Plus, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddToRoadmapButtonProps {
  skills: string[];
  jobCategory: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function AddToRoadmapButton({
  skills,
  jobCategory,
  className,
  onClick,
}: AddToRoadmapButtonProps) {
  const [isAdding, setIsAdding] = useState(false);

  if (!skills.length) return null;

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e);

    setIsAdding(true);
    try {
      const res = await fetch('/api/roadmap/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: skills.map((skill) => ({
            skill,
            jobCategory,
            status: 'NOT_STARTED',
          })),
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || '로드맵 추가에 실패했습니다');
      }

      toast.success('부족한 기술이 로드맵에 추가되었습니다');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '오류가 발생했습니다');
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isAdding}
      className={cn(
        'inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-50',
        className
      )}
    >
      {isAdding ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
      부족한 기술을 로드맵에 추가
    </button>
  );
}
