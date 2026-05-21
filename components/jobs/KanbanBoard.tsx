'use client';

/**
 * 칸반 보드 컴포넌트 (@dnd-kit 기반)
 *
 * 지원 현황을 6개 상태 컬럼으로 시각화하고 드래그앤드롭으로 상태를 변경한다.
 *
 * 구성:
 * - KanbanBoard: DndContext 루트, 드래그 이벤트 처리
 * - KanbanColumn: 상태별 컬럼 (SortableContext)
 * - JobCard: 드래그 가능한 공고 카드 (useSortable)
 *
 * 드래그 동작:
 * - dragOver: 다른 컬럼 위에 올라가면 낙관적으로 onStatusChange 호출
 * - dragEnd: 최종 위치 확정 후 onStatusChange 호출
 * - DragOverlay: 드래그 중인 카드의 고스트 UI (rotate-2 효과)
 *
 * PointerSensor에 distance: 5 설정 — 클릭과 드래그를 구분
 */
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { JobPosting } from '@prisma/client';
import type { ApplicationStatus } from '@/types';
import { AlertCircle, ExternalLink, Trash2, GripVertical } from 'lucide-react';
import { toast } from 'sonner';

const statusConfig: Record<ApplicationStatus, { label: string; dot: string; text: string; bg: string; border: string; header: string }> = {
  PREPARING:     { label: '서류 준비 중', dot: 'bg-slate-400',   text: 'text-slate-700',   bg: 'bg-slate-50',   border: 'border-slate-200', header: 'bg-slate-100' },
  APPLIED:       { label: '지원 완료',   dot: 'bg-blue-400',    text: 'text-blue-700',    bg: 'bg-blue-50',    border: 'border-blue-200',  header: 'bg-blue-100'  },
  DOCUMENT_PASS: { label: '서류 합격',   dot: 'bg-emerald-400', text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200',header: 'bg-emerald-100'},
  INTERVIEW:     { label: '면접 예정',   dot: 'bg-amber-400',   text: 'text-amber-700',   bg: 'bg-amber-50',   border: 'border-amber-200', header: 'bg-amber-100' },
  FINAL_PASS:    { label: '최종 합격',   dot: 'bg-violet-400',  text: 'text-violet-700',  bg: 'bg-violet-50',  border: 'border-violet-200',header: 'bg-violet-100'},
  REJECTED:      { label: '불합격',     dot: 'bg-red-400',     text: 'text-red-700',     bg: 'bg-red-50',     border: 'border-red-200',   header: 'bg-red-100'   },
};

const statusOrder: ApplicationStatus[] = [
  'PREPARING', 'APPLIED', 'DOCUMENT_PASS', 'INTERVIEW', 'FINAL_PASS', 'REJECTED',
];

function JobCard({
  job,
  onDelete,
}: {
  job: JobPosting;
  onDelete: (id: string) => void;
}) {
  const router = useRouter();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: job.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const deadline = job.deadline ? new Date(job.deadline) : null;
  const daysLeft = deadline ? Math.ceil((deadline.getTime() - Date.now()) / 86400000) : null;
  const near = daysLeft !== null && daysLeft <= 3 && daysLeft >= 0;
  const expired = deadline && deadline < new Date();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 group cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => router.push(`/jobs/${job.id}`)}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          className="mt-0.5 p-0.5 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing shrink-0"
          aria-label="드래그 핸들"
        >
          <GripVertical className="w-3.5 h-3.5" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{job.company}</p>
          <p className="text-xs text-gray-500 truncate mt-0.5">{job.position}</p>
          {deadline && (
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-[11px] ${expired ? 'text-red-500' : near ? 'text-amber-600 font-medium' : 'text-gray-400'}`}>
                {expired ? '마감' : daysLeft === 0 ? 'D-Day' : `D-${daysLeft}`}
              </span>
              {near && !expired && <AlertCircle className="w-3 h-3 text-amber-500" />}
            </div>
          )}
        </div>
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label="공고 링크"
              className="p-1 rounded text-gray-300 hover:text-blue-500 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onDelete(job.id); }}
            aria-label="삭제"
            className="p-1 rounded text-gray-300 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({
  status,
  jobs,
  onDelete,
}: {
  status: ApplicationStatus;
  jobs: JobPosting[];
  onDelete: (id: string) => void;
}) {
  const cfg = statusConfig[status];
  return (
    <div className={`flex flex-col rounded-xl border ${cfg.border} min-w-[220px] w-[220px] shrink-0`}>
      <div className={`${cfg.header} rounded-t-xl px-3 py-2.5 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
          <span className={`text-xs font-semibold ${cfg.text}`}>{cfg.label}</span>
        </div>
        <span className="text-xs text-gray-400 font-medium tabular-nums">{jobs.length}</span>
      </div>
      <SortableContext items={jobs.map(j => j.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2 p-2 min-h-[120px]">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} onDelete={onDelete} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export function KanbanBoard({
  jobs,
  onStatusChange,
  onDelete,
}: {
  jobs: JobPosting[];
  onStatusChange: (id: string, status: ApplicationStatus) => void;
  onDelete: (id: string) => void;
}) {
  const [activeJob, setActiveJob] = useState<JobPosting | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const grouped = statusOrder.reduce((acc, s) => {
    acc[s] = jobs.filter(j => j.status === s);
    return acc;
  }, {} as Record<ApplicationStatus, JobPosting[]>);

  function findColumn(jobId: string): ApplicationStatus | null {
    for (const s of statusOrder) {
      if (grouped[s].some(j => j.id === jobId)) return s;
    }
    return null;
  }

  function handleDragStart(e: DragStartEvent) {
    const job = jobs.find(j => j.id === e.active.id);
    setActiveJob(job ?? null);
  }

  function handleDragOver(e: DragOverEvent) {
    const { active, over } = e;
    if (!over) return;

    const activeCol = findColumn(active.id as string);
    // over could be a column id or a job id
    const overCol = statusOrder.includes(over.id as ApplicationStatus)
      ? (over.id as ApplicationStatus)
      : findColumn(over.id as string);

    if (!activeCol || !overCol || activeCol === overCol) return;
    onStatusChange(active.id as string, overCol);
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveJob(null);
    const { active, over } = e;
    if (!over) return;

    const activeCol = findColumn(active.id as string);
    const overCol = statusOrder.includes(over.id as ApplicationStatus)
      ? (over.id as ApplicationStatus)
      : findColumn(over.id as string);

    if (!activeCol || !overCol || activeCol === overCol) return;
    onStatusChange(active.id as string, overCol);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-3 overflow-x-auto pb-4">
        {statusOrder.map(status => (
          <KanbanColumn
            key={status}
            status={status}
            jobs={grouped[status]}
            onDelete={onDelete}
          />
        ))}
      </div>
      <DragOverlay>
        {activeJob && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-3 w-[220px] rotate-2">
            <p className="text-sm font-medium text-gray-900">{activeJob.company}</p>
            <p className="text-xs text-gray-500 mt-0.5">{activeJob.position}</p>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
