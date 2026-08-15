'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, CheckCircle2, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ApplyButtonProps {
  listingId: string;
  variant?: 'dark' | 'light';
  className?: string;
  initialAdded?: boolean;
}

export default function ApplyButton({ listingId, variant = 'dark', className, initialAdded = false }: ApplyButtonProps) {
  const { data: session, status } = useSession();
  const qc = useQueryClient();
  const [added, setAdded] = useState(initialAdded);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId }),
      });
      if (!res.ok) {
        const text = await res.text();
        if (res.status === 409) {
          setAdded(true);
          throw new Error('이미 추가된 공고입니다');
        }
        throw new Error(text || '추가에 실패했습니다');
      }
    },
    onSuccess: () => {
      setAdded(true);
      qc.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('내 지원 목록에 추가되었습니다');
    },
    onError: (e: Error) => {
      if (e.message === '이미 추가된 공고입니다') {
        toast(e.message);
        return;
      }
      toast.error(e.message);
    },
  });

  const isDark = variant === 'dark';
  const baseStyles = cn(
    'inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
    isDark
      ? added
        ? 'bg-emerald-500/20 text-emerald-300'
        : 'bg-white/10 text-white hover:bg-white/20'
      : added
        ? 'bg-emerald-50 text-emerald-600'
        : 'bg-slate-900 text-white hover:bg-slate-800',
    className
  );

  if (status === 'loading') {
    return <span className={cn(baseStyles, 'cursor-not-allowed opacity-60')} aria-disabled="true">불러오는 중...</span>;
  }

  if (!session?.user?.id) {
    return (
      <Link href="/login" className={cn(baseStyles, 'hover:opacity-90')}>
        <LogIn className="h-3.5 w-3.5" />
        로그인 후 지원
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => !added && !mutation.isPending && mutation.mutate()}
      disabled={added || mutation.isPending}
      className={cn(baseStyles, (added || mutation.isPending) && 'cursor-default')}
    >
      {added ? (
        <>
          <CheckCircle2 className="h-3.5 w-3.5" />
          추가됨
        </>
      ) : (
        <>
          <Plus className="h-3.5 w-3.5" />
          지원하기
        </>
      )}
    </button>
  );
}
