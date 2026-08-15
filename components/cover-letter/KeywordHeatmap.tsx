'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Target, X } from 'lucide-react';

export type CLItem = { question: string; answer: string };

type JobListing = {
  id: string;
  company: string;
  position: string;
};

interface KeywordHeatmapProps {
  coverLetterId: string;
  items: CLItem[];
  listings: JobListing[];
  onHighlight?: (itemIndex: number, keyword: string) => void;
  onClose?: () => void;
}

export default function KeywordHeatmap({
  coverLetterId,
  items,
  listings,
  onHighlight,
  onClose,
}: KeywordHeatmapProps) {
  const [jobListingId, setJobListingId] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [loading, setLoading] = useState(false);

  const selectedJob = useMemo(
    () => listings.find((l) => l.id === jobListingId),
    [jobListingId, listings]
  );

  useEffect(() => {
    if (!jobListingId || items.length === 0) {
      setKeywords([]);
      setMatrix([]);
      return;
    }
    setLoading(true);
    fetch('/api/cover-letter/keyword-heatmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ coverLetterId, jobListingId }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed');
        const json = await res.json();
        setKeywords(json.data.keywords || []);
        setMatrix(json.data.matrix || []);
      })
      .catch(() => toast.error('히트맵 데이터를 불러오지 못했습니다'))
      .finally(() => setLoading(false));
  }, [coverLetterId, jobListingId, items.length]);

  const maxCount = useMemo(() => {
    if (matrix.length === 0) return 1;
    const all = matrix.flat();
    return Math.max(1, ...all);
  }, [matrix]);

  function cellColor(count: number): string {
    if (count === 0) return 'bg-gray-50 text-gray-300 border-gray-100';
    if (count === 1) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-red-200 text-red-900 border-red-300';
  }

  function intensityClass(count: number): string {
    if (count === 0) return '';
    const ratio = count / maxCount;
    if (ratio >= 0.8) return 'bg-red-500 text-white';
    if (ratio >= 0.5) return 'bg-amber-400 text-white';
    return 'bg-amber-200 text-amber-900';
  }

  function handleCellClick(itemIndex: number, keyword: string) {
    onHighlight?.(itemIndex, keyword);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-amber-600" />
          <h3 className="text-sm font-semibold text-gray-900">JD ↔ 자소서 키워드 매칭 히트맵</h3>
        </div>
        {onClose && (
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1.5">비교할 공고 선택</label>
        <select
          value={jobListingId}
          onChange={(e) => setJobListingId(e.target.value)}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">공고를 선택하세요</option>
          {listings.map((l) => (
            <option key={l.id} value={l.id}>
              {l.company} · {l.position}
            </option>
          ))}
        </select>
      </div>

      {selectedJob && (
        <p className="text-xs text-gray-500 mb-3">
          {selectedJob.company} {selectedJob.position} 공고의 키워드와 자소서 문항을 비교합니다.
        </p>
      )}

      {loading && (
        <div className="space-y-3 py-6">
          <div className="h-6 bg-gray-100 rounded animate-pulse" />
          <div className="h-40 bg-gray-100 rounded animate-pulse" />
        </div>
      )}

      {!loading && keywords.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs border-collapse">
            <thead>
              <tr>
                <th className="sticky left-0 bg-white z-10 px-2 py-2 text-left text-gray-400 font-medium min-w-[120px]">
                  문항 \ 키워드
                </th>
                {keywords.map((k) => (
                  <th key={k} className="px-2 py-2 text-center font-medium text-gray-600 min-w-[64px]">
                    {k}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="sticky left-0 bg-white z-10 px-2 py-2 text-gray-700 font-medium max-w-[180px] truncate">
                    Q{rowIndex + 1}. {item.question || '(질문 없음)'}
                  </td>
                  {keywords.map((keyword, colIndex) => {
                    const count = matrix[rowIndex]?.[colIndex] ?? 0;
                    return (
                      <td key={`${rowIndex}-${colIndex}`} className="px-1 py-1">
                        <button
                          type="button"
                          onClick={() => handleCellClick(rowIndex, keyword)}
                          className={`w-full h-8 rounded-md border text-xs font-bold transition-colors ${
                            count > 0
                              ? intensityClass(count)
                              : 'bg-gray-50 text-gray-300 border-gray-100 hover:bg-gray-100'
                          }`}
                          title={`Q${rowIndex + 1}에서 "${keyword}" ${count}회 등장`}
                        >
                          {count}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && jobListingId && keywords.length === 0 && (
        <p className="text-xs text-gray-400 text-center py-6">추출된 키워드가 없습니다.</p>
      )}

      {!loading && !jobListingId && (
        <p className="text-xs text-gray-400 text-center py-6">비교할 공고를 선택하면 히트맵이 표시됩니다.</p>
      )}

      <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-50 border border-gray-100" /> 0회</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-200" /> 1회</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500" /> 2회 이상</span>
      </div>
    </div>
  );
}
