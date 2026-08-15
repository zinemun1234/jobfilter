'use client';

import Link from 'next/link';
import ReasonTooltip from '@/components/listings/ReasonTooltip';
import AddToRoadmapButton from '@/components/roadmap/AddToRoadmapButton';
import { getJobCategory } from '@/lib/roadmap-templates';
import { cn } from '@/lib/utils';

export type PriorityJob = {
  id: string;
  company: string;
  position: string;
  deadline: Date | string | null;
  createdAt: string;
  tags: string[];
  fitScore: number;
  urgencyScore: number;
  popularityScore: number;
  freshnessScore: number;
  competitionScore: number;
  priorityScore: number;
  bookmarkCount: number;
  targetJob: string | null;
  jobCategory: string;
  matchedSkills?: string[];
  missingSkills?: string[];
  reasons?: string[];
};

type Weights = {
  fit: number;
  urgency: number;
  competition: number;
};

interface PriorityJobCardProps {
  job: PriorityJob;
  rank: number;
  weights?: Weights;
}

export default function PriorityJobCard({ job, rank, weights }: PriorityJobCardProps) {
  const daysLeft = job.deadline
    ? Math.ceil((new Date(job.deadline).getTime() - Date.now()) / 86_400_000)
    : null;

  const jobCategory = job.jobCategory || getJobCategory(job.targetJob || job.position);

  return (
    <Link
      href={`/listings/${job.id}`}
      className="group block rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-primary/50 transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold',
              rank === 1
                ? 'bg-amber-100 text-amber-700'
                : rank === 2
                  ? 'bg-slate-200 text-slate-700'
                  : rank === 3
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-muted text-muted-foreground'
            )}
          >
            {rank}
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              {job.company}
            </p>
            <p className="text-xs text-muted-foreground truncate max-w-[200px] sm:max-w-[280px]">
              {job.position}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <ReasonTooltip
            reasons={job.reasons ?? []}
            matchedSkills={job.matchedSkills}
            missingSkills={job.missingSkills}
            fitScore={job.fitScore}
            urgencyScore={job.urgencyScore}
            competitionScore={job.competitionScore}
          />
          <span className="text-lg font-bold text-primary">{job.priorityScore}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-muted px-2 py-2">
          <p className="text-xs font-bold text-foreground">{job.fitScore}</p>
          <p className="text-xs text-muted-foreground">매칭</p>
        </div>
        <div className="rounded-lg bg-muted px-2 py-2">
          <p className="text-xs font-bold text-foreground">{job.urgencyScore}</p>
          <p className="text-xs text-muted-foreground">마감</p>
        </div>
        <div className="rounded-lg bg-muted px-2 py-2">
          <p className="text-xs font-bold text-foreground">{job.competitionScore}</p>
          <p className="text-xs text-muted-foreground">인기·신선</p>
        </div>
      </div>

      {job.reasons && job.reasons.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {job.reasons.slice(0, 3).map((reason) => (
            <span
              key={reason}
              className="rounded-md bg-background border border-border px-2 py-1 text-xs text-muted-foreground"
            >
              {reason}
            </span>
          ))}
        </div>
      )}

      {job.matchedSkills && job.matchedSkills.length > 0 && (
        <p className="mt-2 text-xs text-emerald-600 truncate">
          일치 기술: {job.matchedSkills.join(', ')}
        </p>
      )}

      {job.missingSkills && job.missingSkills.length > 0 && (
        <div className="mt-2">
          <AddToRoadmapButton
            skills={job.missingSkills}
            jobCategory={jobCategory}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
        </div>
      )}

      <div className="mt-3 text-xs text-muted-foreground">
        기술 매칭 {job.fitScore}% · 마감 임박 {job.urgencyScore} · 인기/신선 {job.competitionScore}
      </div>

      {weights && (
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <span>가중치</span>
          <span className="text-primary">매칭 {Math.round(weights.fit * 100)}%</span>
          <span>·</span>
          <span className="text-primary">마감 {Math.round(weights.urgency * 100)}%</span>
          <span>·</span>
          <span className="text-primary">인기 {Math.round(weights.competition * 100)}%</span>
          <span>·</span>
          <span className="text-primary">신선 10%</span>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          {daysLeft !== null && daysLeft >= 0 ? (
            <span className={cn('font-medium', daysLeft <= 3 ? 'text-destructive' : 'text-muted-foreground')}>
              D-{daysLeft}
            </span>
          ) : (
            <span>마감일 미정</span>
          )}
          <span>·</span>
          <span>북마크 {job.bookmarkCount}</span>
        </div>
        {job.tags.length > 0 && (
          <span className="truncate max-w-[120px] text-muted-foreground">
            {job.tags.slice(0, 2).join(', ')}
            {job.tags.length > 2 && ` +${job.tags.length - 2}`}
          </span>
        )}
      </div>
    </Link>
  );
}
