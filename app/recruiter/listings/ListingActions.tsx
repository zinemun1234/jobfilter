'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PauseCircle, Trash2 } from 'lucide-react';

export function ListingActions({ id, isActive }: { id: string; isActive: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const deactivate = async () => {
    if (!confirm('공고를 비활성화하면 학생들에게 더 이상 노출되지 않습니다. 계속하시겠습니까?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/recruiter/listings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: false }),
      });
      if (!res.ok) throw new Error('Failed');
      router.refresh();
    } catch {
      alert('공고 비활성화에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    if (!confirm('공고를 삭제하면 복구할 수 없습니다. 계속하시겠습니까?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/recruiter/listings/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
      router.refresh();
    } catch {
      alert('공고 삭제에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {isActive && (
        <button
          type="button"
          onClick={deactivate}
          disabled={loading}
          className="rounded-lg p-2 text-slate-400 hover:bg-amber-50 hover:text-amber-500 transition-colors"
          title="비활성화"
        >
          <PauseCircle className="h-4 w-4" />
        </button>
      )}
      <button
        type="button"
        onClick={remove}
        disabled={loading}
        className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
        title="삭제"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
