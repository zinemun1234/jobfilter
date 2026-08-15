'use client';

import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReasonTooltipProps {
  reasons: string[];
  matchedSkills?: string[];
  missingSkills?: string[];
  fitScore?: number;
  urgencyScore?: number;
  competitionScore?: number;
  className?: string;
}

export default function ReasonTooltip({
  reasons,
  matchedSkills,
  missingSkills,
  fitScore,
  urgencyScore,
  competitionScore,
  className,
}: ReasonTooltipProps) {
  if (
    reasons.length === 0 &&
    !matchedSkills?.length &&
    !missingSkills?.length &&
    fitScore === undefined
  ) {
    return null;
  }

  const showBreakdown =
    fitScore !== undefined || urgencyScore !== undefined || competitionScore !== undefined;

  return (
    <span
      className={cn('group/tooltip relative inline-flex items-center', className)}
      tabIndex={0}
      aria-label="추천 사유 보기"
    >
      <Info className="w-3.5 h-3.5 text-muted-foreground transition-colors group-hover/tooltip:text-primary" />
      <span className="pointer-events-none absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 hidden w-64 rounded-xl border border-border bg-popover p-3 shadow-lg group-hover/tooltip:block group-focus/tooltip:block">
        <span className="block text-xs font-semibold text-popover-foreground mb-2">추천 사유</span>

        {showBreakdown && (
          <p className="text-xs text-muted-foreground mb-2 border-b border-border pb-2">
            {fitScore !== undefined && <>기술 매칭 {fitScore}% </>}
            {urgencyScore !== undefined && <>· 마감 임박 {urgencyScore} </>}
            {competitionScore !== undefined && <>· 인기/신선 {competitionScore}</>}
          </p>
        )}

        {reasons.length > 0 && (
          <span className="flex flex-wrap gap-1 mb-2">
            {reasons.map((reason) => (
              <span
                key={reason}
                className="inline-flex items-center rounded-md bg-primary/10 px-1.5 py-0.5 text-xs text-primary"
              >
                {reason}
              </span>
            ))}
          </span>
        )}
        {matchedSkills && matchedSkills.length > 0 && (
          <p className="text-xs text-emerald-600 truncate">
            일치 기술: {matchedSkills.join(', ')}
          </p>
        )}
        {missingSkills && missingSkills.length > 0 && (
          <p className="text-xs text-amber-600 truncate mt-1">
            부족 기술: {missingSkills.slice(0, 5).join(', ')}
          </p>
        )}
      </span>
    </span>
  );
}
