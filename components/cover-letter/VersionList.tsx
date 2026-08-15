'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { History, RotateCcw, GitCompare } from 'lucide-react';
import { toast } from 'sonner';
import { SlideOver } from '@/components/ui/slide-over';
import SkeletonList from '@/components/ui/SkeletonList';
import { CLItem } from '@/lib/cover-letter-templates';
import { cn } from '@/lib/utils';

type CoverLetterVersion = {
  id: string;
  version: number;
  items: CLItem[];
  savedAt: string;
};

interface VersionListProps {
  letterId: string;
  currentVersion: number;
  currentItems: CLItem[];
  onClose: () => void;
}

function splitSentences(text: string): string[] {
  if (!text.trim()) return [];
  // 문장 구분: . ? ! 뒤의 공백을 기준으로 자르며 마침표는 문장에 포함
  return text.split(/(?<=[.!?])\s+/).filter(Boolean);
}

type DiffOperation<T> =
  | { type: 'same'; value: T }
  | { type: 'remove'; value: T }
  | { type: 'add'; value: T }
  | { type: 'change'; before: T; after: T };

function lcsDiff<T>(a: T[], b: T[], equal: (x: T, y: T) => boolean): { type: 'same' | 'remove' | 'add'; value: T }[] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = m - 1; i >= 0; i -= 1) {
    for (let j = n - 1; j >= 0; j -= 1) {
      if (equal(a[i], b[j])) {
        dp[i][j] = 1 + dp[i + 1][j + 1];
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  const result: { type: 'same' | 'remove' | 'add'; value: T }[] = [];
  let i = 0;
  let j = 0;
  while (i < m || j < n) {
    if (i < m && j < n && equal(a[i], b[j])) {
      result.push({ type: 'same', value: a[i] });
      i += 1;
      j += 1;
    } else if (j < n && (i >= m || dp[i][j + 1] >= dp[i + 1][j])) {
      result.push({ type: 'add', value: b[j] });
      j += 1;
    } else if (i < m) {
      result.push({ type: 'remove', value: a[i] });
      i += 1;
    }
  }

  return result;
}

function diffSentences(before: string, after: string): DiffOperation<string>[] {
  const raw = lcsDiff(splitSentences(before), splitSentences(after), (x, y) => x === y);
  const processed: DiffOperation<string>[] = [];
  for (let k = 0; k < raw.length; k += 1) {
    if (raw[k].type === 'remove' && raw[k + 1]?.type === 'add') {
      processed.push({ type: 'change', before: raw[k].value, after: raw[k + 1].value });
      k += 1;
    } else {
      processed.push(raw[k]);
    }
  }
  return processed;
}

function SentenceDiff({ before, after }: { before: string; after: string }) {
  const lines = diffSentences(before, after);

  if (lines.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground italic">
        <span>—</span>
        <span>—</span>
      </div>
    );
  }

  return (
    <div className="space-y-1 text-[11px]">
      {lines.map((line, idx) => (
        <div key={idx} className="grid grid-cols-2 gap-2">
          {line.type === 'same' && (
            <>
              <p className="text-foreground whitespace-pre-wrap rounded px-2 py-1">{line.value}</p>
              <p className="text-foreground whitespace-pre-wrap rounded px-2 py-1">{line.value}</p>
            </>
          )}
          {line.type === 'remove' && (
            <>
              <p className="text-red-700 bg-red-50 whitespace-pre-wrap rounded px-2 py-1">{line.value}</p>
              <p className="text-muted-foreground italic whitespace-pre-wrap rounded px-2 py-1">—</p>
            </>
          )}
          {line.type === 'add' && (
            <>
              <p className="text-muted-foreground italic whitespace-pre-wrap rounded px-2 py-1">—</p>
              <p className="text-emerald-700 bg-emerald-50 whitespace-pre-wrap rounded px-2 py-1">{line.value}</p>
            </>
          )}
          {line.type === 'change' && (
            <>
              <p className="text-red-700 bg-red-50 whitespace-pre-wrap rounded px-2 py-1">{line.before}</p>
              <p className="text-emerald-700 bg-emerald-50 whitespace-pre-wrap rounded px-2 py-1">{line.after}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function QuestionDiff({ before, after }: { before?: string; after?: string }) {
  if (!before && !after) return null;
  if (before === after) {
    return <p className="text-xs font-semibold text-foreground">{before || '(질문 없음)'}</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-2 text-xs font-semibold mb-2">
      <p className={cn('rounded px-2 py-1', before ? 'text-red-700 bg-red-50' : 'text-muted-foreground italic')}>
        {before || '—'}
      </p>
      <p className={cn('rounded px-2 py-1', after ? 'text-emerald-700 bg-emerald-50' : 'text-muted-foreground italic')}>
        {after || '—'}
      </p>
    </div>
  );
}

function VersionDiffPanel({
  currentVersion,
  currentItems,
  selectedVersion,
}: {
  currentVersion: number;
  currentItems: CLItem[];
  selectedVersion: CoverLetterVersion;
}) {
  const maxLen = Math.max(currentItems.length, selectedVersion.items.length);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-center border border-border rounded-lg overflow-hidden bg-background">
        <div className="px-3 py-2 border-r border-border bg-background text-foreground">현재 v{currentVersion}</div>
        <div className="px-3 py-2 bg-background text-foreground">v{selectedVersion.version}</div>
      </div>

      {Array.from({ length: maxLen }).map((_, i) => {
        const before = currentItems[i];
        const after = selectedVersion.items[i];
        const unchanged =
          before && after && before.question === after.question && before.answer === after.answer;

        return (
          <div key={i} className="rounded-lg border border-border bg-background p-3 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-muted-foreground">문항 {i + 1}</span>
              {unchanged && <span className="text-[11px] text-muted-foreground">(변경 없음)</span>}
            </div>
            <QuestionDiff before={before?.question} after={after?.question} />
            <SentenceDiff before={before?.answer ?? ''} after={after?.answer ?? ''} />
          </div>
        );
      })}
    </div>
  );
}

export function VersionList({ letterId, currentVersion, currentItems, onClose }: VersionListProps) {
  const qc = useQueryClient();
  const [selectedVersion, setSelectedVersion] = useState<CoverLetterVersion | null>(null);

  const { data: versions = [], isLoading } = useQuery<CoverLetterVersion[]>({
    queryKey: ['cover-letter-versions', letterId],
    queryFn: async () => {
      const res = await fetch(`/api/cover-letter/${letterId}/versions`);
      if (!res.ok) throw new Error('Failed');
      return (await res.json()).data;
    },
  });

  const restore = useMutation({
    mutationFn: async (versionId: string) => {
      const res = await fetch(`/api/cover-letter/${letterId}/versions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ versionId }),
      });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cover-letters'] });
      qc.invalidateQueries({ queryKey: ['cover-letter-versions', letterId] });
      toast.success('이전 버전으로 복원했습니다');
      onClose();
    },
    onError: () => toast.error('복원에 실패했습니다'),
  });

  return (
    <>
      <div className="border-t border-border bg-background/50 px-5 py-4 space-y-3">
        <div className="flex items-center gap-2">
          <History className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold text-foreground">버전 히스토리</span>
          <span className="text-xs text-muted-foreground bg-background border border-border px-2 py-0.5 rounded-full ml-auto">
            수정 시 자동 저장 (최대 10개)
          </span>
        </div>

        {isLoading ? (
          <SkeletonList count={3} cardClassName="h-10" />
        ) : versions.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">
            저장된 버전이 없습니다. 자소서를 수정하면 이전 버전이 여기에 쌓입니다.
          </p>
        ) : (
          <ul className="space-y-2">
            {versions.map(v => (
              <li
                key={v.id}
                className="flex items-center gap-3 bg-background rounded-lg border border-border px-4 py-2.5"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground">v{v.version}</span>
                    <span className="text-[11px] text-muted-foreground">
                      {new Date(v.savedAt).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}{' '}
                      {new Date(v.savedAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                    항목 {v.items.length}개 · 총 {v.items.reduce((s, it) => s + it.answer.length, 0).toLocaleString()}자
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedVersion(v)}
                  className="flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80 bg-primary/5 hover:bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg transition-colors"
                >
                  <GitCompare className="w-3 h-3" /> 비교
                </button>
                <button
                  type="button"
                  onClick={() => restore.mutate(v.id)}
                  disabled={restore.isPending}
                  className="flex items-center gap-1 text-[11px] font-medium text-foreground hover:text-foreground/80 bg-background hover:bg-muted border border-border px-2.5 py-1 rounded-lg transition-colors disabled:opacity-50"
                >
                  <RotateCcw className="w-3 h-3" /> 복원
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <SlideOver
        open={!!selectedVersion}
        onClose={() => setSelectedVersion(null)}
        title="버전 비교"
        subtitle={selectedVersion ? `현재 v${currentVersion} ↔ v${selectedVersion.version}` : undefined}
        width="max-w-2xl"
      >
        {selectedVersion && (
          <VersionDiffPanel
            currentVersion={currentVersion}
            currentItems={currentItems}
            selectedVersion={selectedVersion}
          />
        )}
      </SlideOver>
    </>
  );
}
