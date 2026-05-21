'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X, CheckCircle } from 'lucide-react';
import { InterviewQuestion, InterviewAnswer } from '@prisma/client';
import { toast } from 'sonner';

interface AnswerSlideOverProps {
  question: (InterviewQuestion & { answers?: InterviewAnswer[] }) | null;
  onClose: () => void;
}

const categoryConfig: Record<string, { label: string; dot: string }> = {
  TECHNICAL:   { label: '기술',  dot: 'bg-blue-500' },
  PERSONALITY: { label: '인성',  dot: 'bg-emerald-500' },
  SITUATIONAL: { label: '상황',  dot: 'bg-amber-500' },
};

async function saveAnswer(questionId: string, answer: string, questionText?: string, questionCategory?: string) {
  const res = await fetch('/api/interview/answers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionId, answer, questionText, questionCategory }),
  });
  if (!res.ok) throw new Error('Failed to save answer');
  return (await res.json()).data;
}

export function AnswerSlideOver({ question, onClose }: AnswerSlideOverProps) {
  const [answer, setAnswer] = useState('');
  const [visible, setVisible] = useState(false);
  const queryClient = useQueryClient();

  // Animate in when question changes
  useEffect(() => {
    if (question) {
      setAnswer(question.answers?.[0]?.answer || '');
      // Small delay so CSS transition fires
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [question]);

  const handleClose = () => {
    setVisible(false);
    // Wait for slide-out animation before clearing
    setTimeout(onClose, 300);
  };

  const saveMutation = useMutation({
    mutationFn: () => saveAnswer(
      question!.id,
      answer,
      question!.question,
      question!.category,
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interview-questions'] });
      toast.success('답변이 저장되었습니다');
      handleClose();
    },
    onError: () => toast.error('저장에 실패했습니다'),
  });

  if (!question) return null;

  const cat = categoryConfig[question.category] ?? { label: question.category, dot: 'bg-gray-400' };
  const hasExisting = !!question.answers?.[0]?.answer;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${cat.dot}`} />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{cat.label}</span>
            {question.jobType && (
              <span className="rounded-full border border-gray-200 px-2 py-0.5 text-[10px] text-gray-500">
                {question.jobType}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="닫기"
            className="rounded-lg p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Question */}
          <div className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-5">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">질문</p>
            <p className="text-sm font-medium text-gray-900 leading-relaxed">{question.question}</p>
          </div>

          {/* Answer */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                나의 답변
              </label>
              {hasExisting && (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                  <CheckCircle className="h-3 w-3" />
                  이전 답변 있음
                </span>
              )}
            </div>
            <textarea
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="답변을 작성해주세요. 구체적인 경험이나 예시를 포함하면 좋습니다."
              rows={12}
              className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none transition-colors resize-none leading-relaxed"
            />
            <p className="mt-1.5 text-right text-xs text-gray-400">{answer.length}자</p>
          </div>

          {/* Tips */}
          <div className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">답변 팁</p>
            <ul className="space-y-1.5 text-xs text-gray-500 leading-relaxed">
              <li>• STAR 기법 활용: 상황(Situation) → 과제(Task) → 행동(Action) → 결과(Result)</li>
              <li>• 구체적인 수치나 결과를 포함하면 설득력이 높아집니다</li>
              <li>• 1~2분 내로 말할 수 있는 분량으로 작성하세요</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-4 flex gap-2">
          <button
            type="button"
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending || !answer.trim()}
            className="flex-1 rounded-lg bg-[#0f172a] py-2.5 text-sm font-medium text-white hover:bg-[#1e293b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saveMutation.isPending ? '저장 중...' : '저장'}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
}
