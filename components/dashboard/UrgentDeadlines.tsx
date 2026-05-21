import type { JobPosting } from '@/types';
import { filterUrgentDeadlines } from '@/lib/dashboard';
import { getDaysUntil } from '@/lib/dateUtils';

interface UrgentDeadlinesProps {
  postings: JobPosting[];
}

export default function UrgentDeadlines({ postings }: UrgentDeadlinesProps) {
  const urgent = filterUrgentDeadlines(postings, 7);

  if (urgent.length === 0) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white px-6 py-8 text-center shadow-sm">
        <p className="text-sm text-gray-400">마감 임박 채용 공고가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm divide-y divide-gray-50">
      {urgent.map((posting) => {
        const days = posting.deadline ? getDaysUntil(posting.deadline) : null;
        const isVeryUrgent = days !== null && days <= 3;

        return (
          <div key={posting.id} className="flex items-center justify-between px-6 py-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{posting.company}</p>
              <p className="text-xs text-gray-400 mt-0.5 truncate">{posting.position}</p>
            </div>
            <div className="ml-4 shrink-0 flex items-center gap-3">
              {isVeryUrgent && (
                <span className="text-[10px] font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                  마감 임박
                </span>
              )}
              {days !== null && (
                <span className={`text-sm font-semibold tabular-nums ${isVeryUrgent ? 'text-red-500' : 'text-amber-600'}`}>
                  {days === 0 ? 'D-Day' : `D-${days}`}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
