'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle, Copy, FileText, Loader2 } from 'lucide-react';
import type { DuplicateResult, DuplicateMatch } from '@/lib/cover-letter-duplicate';

interface DuplicateCheckPanelProps {
  letterId: string;
}

async function fetchDuplicateCheck(letterId: string, threshold: number): Promise<DuplicateResult> {
  const res = await fetch('/api/cover-letter/duplicate-check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ coverLetterId: letterId, threshold }),
  });
  if (!res.ok) throw new Error('중복 검사 실패');
  const json = await res.json();
  return json.data;
}

function SimilarityBar({ value }: { value: number }) {
  const color = value >= 0.8 ? 'bg-red-500' : value >= 0.6 ? 'bg-amber-500' : 'bg-emerald-500';
  const label = value >= 0.8 ? '높음' : value >= 0.6 ? '주의' : '낮음';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all`}
          style={{ width: `${Math.min(value * 100, 100)}%` }}
        />
      </div>
      <span className="text-xs font-medium text-gray-500 w-16 text-right">{Math.round(value * 100)}% {label}</span>
    </div>
  );
}

export default function DuplicateCheckPanel({ letterId }: DuplicateCheckPanelProps) {
  const [threshold, setThreshold] = useState(0.6);
  const { data, isLoading, error } = useQuery({
    queryKey: ['duplicate-check', letterId, threshold],
    queryFn: () => fetchDuplicateCheck(letterId, threshold),
  });

  if (isLoading) {
    return (
      <div className="px-5 py-8 flex items-center justify-center gap-2 text-gray-400">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm">중복/자기표절 검사 중...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-5 py-4 text-sm text-red-500">
        중복 검사 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
      </div>
    );
  }

  if (!data) return null;

  const grouped = data.matches.reduce<Record<number, DuplicateMatch[]>>((acc, m) => {
    (acc[m.sourceItemIndex] ??= []).push(m);
    return acc;
  }, {});

  return (
    <div className="px-5 py-4 bg-gray-50/50 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Copy className="w-4 h-4 text-violet-500" />
          <span className="text-sm font-semibold text-gray-900">중복/자기표절 검사</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>유사도 기준</span>
          <select
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="px-2 py-1 rounded border border-gray-200 bg-white text-xs"
          >
            <option value={0.5}>50%</option>
            <option value={0.6}>60%</option>
            <option value={0.7}>70%</option>
            <option value={0.8}>80%</option>
          </select>
        </div>
      </div>

      {data.matches.length === 0 ? (
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 text-sm text-emerald-700 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <p>자기표절이나 다른 자소서와의 중복 의심 구간이 발견되지 않았습니다.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-gray-500">
            <span className="font-semibold text-red-500">{data.matches.length}개</span>의 의심 구간이 발견되었습니다.
          </p>
          {Object.entries(grouped).map(([idxStr, matches]) => {
            const idx = Number(idxStr);
            const first = matches[0];
            return (
              <div key={idx} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm space-y-3">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                    Q{idx + 1}. 의심 항목
                  </p>
                  <p className="text-sm font-medium text-gray-900">{first.sourceQuestion || '(질문 없음)'}</p>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{first.snippet}</p>
                </div>
                <div className="divide-y divide-gray-50">
                  {matches.map((m, i) => (
                    <div key={i} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          m.targetLetterId === letterId ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {m.targetLetterId === letterId ? '자기표절' : '다른 자소서'}
                        </span>
                        {m.targetLetterId !== letterId && (
                          <span className="text-xs text-gray-500">
                            {m.targetCompany} · {m.targetPosition}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-1.5 line-clamp-1">{m.targetQuestion || '(질문 없음)'}</p>
                      <SimilarityBar value={m.similarity} />
                      <p className="text-xs text-gray-400 mt-1.5 line-clamp-2">{m.matchedSnippet}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
