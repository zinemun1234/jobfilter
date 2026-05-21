 'use client';

import { Edit, Trash2, CheckCircle } from 'lucide-react';
import { InterviewQuestion, InterviewAnswer } from '@/lib/generated/prisma';

interface InterviewCardProps {
  question: InterviewQuestion & { answers?: InterviewAnswer[] };
  onEdit: () => void;
  onDelete?: () => void;
  canDelete?: boolean;
}

const categoryConfig: Record<string, { label: string; dot: string }> = {
  TECHNICAL:   { label: '기술',  dot: 'bg-blue-500' },
  PERSONALITY: { label: '인성',  dot: 'bg-emerald-500' },
  SITUATIONAL: { label: '상황',  dot: 'bg-amber-500' },
};

export function InterviewCard({ question, onEdit, onDelete, canDelete = false }: InterviewCardProps) {
  const hasAnswer = !!question.answers?.[0]?.answer;
  const cat = categoryConfig[question.category] ?? { label: question.category, dot: 'bg-gray-400' };

  return (
    <div
      className="rounded-xl border border-gray-100 bg-white shadow-sm flex flex-col h-full cursor-pointer hover:border-gray-300 hover:shadow-md transition-all"
      onClick={onEdit}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onEdit()}
      aria-label={`${question.question} 답변 작성`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${cat.dot}`} />
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{cat.label}</span>
          {question.jobType && (
            <span className="rounded-full border border-gray-200 px-2 py-0.5 text-[10px] text-gray-500">
              {question.jobType}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
          {hasAnswer && <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />}
          {canDelete && onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="rounded p-1 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="삭제"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Question */}
      <div className="px-5 py-4 flex-1">
        <p className="text-sm font-medium text-gray-900 leading-relaxed">{question.question}</p>
      </div>

      {/* Answer preview */}
      <div className="px-5 pb-4 border-t border-gray-50 pt-3">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-medium uppercase tracking-wide ${hasAnswer ? 'text-emerald-500' : 'text-gray-400'}`}>
            {hasAnswer ? '답변 완료' : '답변 미작성'}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors">
            <Edit className="h-3 w-3" />
            {hasAnswer ? '수정' : '작성'}
          </span>
        </div>
        <div className="min-h-[40px] rounded-lg bg-gray-50 px-3 py-2.5 text-xs text-gray-500 line-clamp-2">
          {hasAnswer
            ? question.answers![0].answer
            : <span className="italic text-gray-400">클릭하여 답변을 작성하세요</span>
          }
        </div>
      </div>
    </div>
  );
}
