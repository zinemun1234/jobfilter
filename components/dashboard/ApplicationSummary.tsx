import type { ApplicationStatus } from '@/types';
import { STATUS_CONFIG, STATUS_ORDER } from '@/lib/status-config';

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
