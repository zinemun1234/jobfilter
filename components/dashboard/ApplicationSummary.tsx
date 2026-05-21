import type { ApplicationStatus } from '@/types';

const STATUS_CONFIG: Record<ApplicationStatus, { label: string; dot: string }> = {
  PREPARING:     { label: '서류 준비 중', dot: 'bg-slate-400'   },
  APPLIED:       { label: '지원 완료',   dot: 'bg-blue-500'    },
  DOCUMENT_PASS: { label: '서류 합격',   dot: 'bg-emerald-500' },
  INTERVIEW:     { label: '면접 예정',   dot: 'bg-amber-500'   },
  FINAL_PASS:    { label: '최종 합격',   dot: 'bg-violet-500'  },
  REJECTED:      { label: '불합격',     dot: 'bg-red-400'     },
};

const STATUS_ORDER: ApplicationStatus[] = [
  'PREPARING', 'APPLIED', 'DOCUMENT_PASS', 'INTERVIEW', 'FINAL_PASS', 'REJECTED',
];

interface ApplicationSummaryProps {
  counts: Record<ApplicationStatus, number>;
}

export default function ApplicationSummary({ counts }: ApplicationSummaryProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
      {STATUS_ORDER.map((status) => {
        const { label, dot } = STATUS_CONFIG[status];
        const count = counts[status] ?? 0;
        return (
          <div key={status} className="rounded-xl border border-gray-100 bg-white px-4 py-4 shadow-sm">
            <div className={`w-2 h-2 rounded-full ${dot} mb-3`} />
            <p className="text-2xl font-semibold text-gray-900">{count}</p>
            <p className="text-[11px] text-gray-400 mt-1 leading-tight">{label}</p>
          </div>
        );
      })}
    </div>
  );
}
