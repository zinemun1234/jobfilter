'use client';

/**
 * 칸반 보드 컴포넌트 (@dnd-kit 기반)
 *
 * 지원 현황을 6개 상태 컬럼으로 시각화하고 드래그앤드롭으로 상태를 변경한다.
 *
 * 구성:
 * - KanbanBoard: DndContext 루트, 드래그 이벤트 처리
 * - KanbanColumn: 상태별 컬럼 (SortableContext + Droppable)
 * - JobCard: 드래그 가능한 공고 카드 (useSortable)
 *
 * 드래그 동작:
 * - dragEnd: 최종 위치 확정 후 onStatusChange 호출
 * - 낙관적 업데이트: 드롭 즉시 카드 컬럼 이동, API 호출, 실패 시 롤백
 * - DragOverlay: 드래그 중인 카드 고스트 UI
 *
 * PointerSensor에 distance: 5 설정 — 클릭과 드래그를 구분
 */
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { JobPosting } from '@/lib/generated/prisma';
import type { ApplicationStatus } from '@/types';
import { AlertCircle, ExternalLink, Trash2, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import { STATUS_CONFIG, STATUS_ORDER } from '@/lib/status-config';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

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
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          className="mt-0.5 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing shrink-0"
          aria-label="드래그 핸들"
        >
          <GripVertical className="w-3 h-3" />
        </Button>
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
          {typeof (job as any).checklistProgress === 'number' && (
            <div className="mt-2 w-full">
              <div className="flex items-center justify-between text-[10px] text-gray-500 mb-0.5">
                <span>준비율</span>
                <span className={`font-medium ${(job as any).checklistProgress === 100 ? 'text-emerald-600' : 'text-blue-600'}`}>
                  {(job as any).checklistProgress}%
                </span>
              </div>
              <Progress value={(job as any).checklistProgress} className="h-1" />
            </div>
          )}
        </div>
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          {job.url && (
            <Button
              variant="ghost"
              size="icon-xs"
              asChild
              className="text-gray-300 hover:text-blue-500"
            >
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="공고 링크"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={(e) => { e.stopPropagation(); onDelete(job.id); }}
            aria-label="삭제"
            className="text-gray-300 hover:text-red-500"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
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
  const cfg = STATUS_CONFIG[status];
  const { setNodeRef, isOver } = useDroppable({ id: status, data: { status } });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-xl border ${cfg.border} min-w-[220px] w-[220px] shrink-0 transition-all ${isOver ? 'ring-2 ring-primary/30' : ''}`}>
      <div className={`${cfg.header} rounded-t-xl px-3 py-2.5 flex items-center justify-between`}>
        <Badge className={`border-0 ${cfg.bg} ${cfg.text}`}>
          <span className={`w-2 h-2 rounded-full ${cfg.dot} mr-1.5`} />
          {cfg.label}
        </Badge>
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
  onStatusChangeAction,
  onDeleteAction,
}: {
  jobs: JobPosting[];
  onStatusChangeAction: (id: string, status: ApplicationStatus) => Promise<void>;
  onDeleteAction: (id: string) => void;
}) {
  const [items, setItems] = useState<JobPosting[]>(jobs);
  const [activeJob, setActiveJob] = useState<JobPosting | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const grouped = useMemo(() => STATUS_ORDER.reduce((acc, s) => {
    acc[s] = items.filter(j => j.status === s);
    return acc;
  }, {} as Record<ApplicationStatus, JobPosting[]>), [items]);

  useEffect(() => {
    if (!activeJob) {
      setItems(jobs);
    }
  }, [jobs, activeJob]);

  function findColumn(id: string): ApplicationStatus | null {
    if (STATUS_ORDER.includes(id as ApplicationStatus)) {
      return id as ApplicationStatus;
    }
    const job = items.find(j => j.id === id);
    return (job?.status as ApplicationStatus) ?? null;
  }

  function handleDragStart(e: DragStartEvent) {
    const job = items.find(j => j.id === e.active.id);
    setActiveJob(job ?? null);
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    setActiveJob(null);
    if (!over || !activeJob) return;

    const activeId = active.id as string;
    const originalStatus = activeJob.status as ApplicationStatus;
    const overCol = findColumn(over.id as string);

    if (!overCol || originalStatus === overCol) return;

    // 낙관적 업데이트: 드롭 즉시 컬럼 이동
    setItems(prev => prev.map(j => (j.id === activeId ? { ...j, status: overCol } : j)));

    onStatusChangeAction(activeId, overCol)
      .then(() => toast.success('상태가 변경되었습니다'))
      .catch(() => {
        // 실패 시 원래 상태로 롤백
        setItems(prev => prev.map(j => (j.id === activeId ? { ...j, status: originalStatus } : j)));
        toast.error('상태 변경에 실패했습니다');
      });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-3 overflow-x-auto pb-4">
        {STATUS_ORDER.map(status => (
          <KanbanColumn
            key={status}
            status={status}
            jobs={grouped[status]}
            onDelete={onDeleteAction}
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
