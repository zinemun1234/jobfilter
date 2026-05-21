'use client';

import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowRight, RotateCcw, CheckCircle, Timer } from 'lucide-react';
import { toast } from 'sonner';

type QuestionCategory = 'TECHNICAL' | 'PERSONALITY' | 'SITUATIONAL';

interface MockInterviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: QuestionCategory;
  jobType?: string;
}

interface Question {
  id: string;
  category: QuestionCategory;
  jobType?: string | null;
  question: string;
}

const categoryConfig: Record<string, { label: string; dot: string }> = {
  TECHNICAL: { label: '기술', dot: 'bg-blue-500' },
  PERSONALITY: { label: '인성', dot: 'bg-emerald-500' },
  SITUATIONAL: { label: '상황', dot: 'bg-amber-500' },
};

const SECONDS_PER_QUESTION = 300;

export function MockInterviewModal({ open, onOpenChange, category, jobType }: MockInterviewModalProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { answer: string; question: Question }>>({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [phase, setPhase] = useState<'intro' | 'interview' | 'result'>('intro');
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_QUESTION);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch questions from API so custom questions are included
  useEffect(() => {
    if (!open) return;
    const params = new URLSearchParams({ random: 'true', count: '10' });
    if (category) params.set('category', category);
    if (jobType) params.set('jobType', jobType);
    fetch(`/api/interview/questions?${params}`)
      .then(r => r.json())
      .then(data => setQuestions(data.data ?? []))
      .catch(() => toast.error('질문을 불러오지 못했습니다'));
  }, [open, category, jobType]);

  // Reset when modal closes
  useEffect(() => {
    if (!open) {
      setCurrentIndex(0);
      setAnswers({});
      setCurrentAnswer('');
      setPhase('intro');
      setTimeLeft(SECONDS_PER_QUESTION);
    }
  }, [open]);

  const goNext = useCallback(() => {
    const q = questions[currentIndex];
    if (!q) return;

    setAnswers(prev => ({
      ...prev,
      [q.id]: { answer: currentAnswer, question: q },
    }));

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setCurrentAnswer('');
      setTimeLeft(SECONDS_PER_QUESTION);
    } else {
      setPhase('result');
    }
  }, [currentAnswer, currentIndex, questions]);

  // Timer
  useEffect(() => {
    if (phase !== 'interview') return;
    if (timeLeft <= 0) { goNext(); return; }
    const id = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [phase, timeLeft, goNext]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const handleSaveAnswers = async () => {
    setIsSaving(true);
    try {
      const entries = Object.values(answers).filter(e => e.answer.trim());
      await Promise.all(
        entries.map(({ answer, question }) =>
          fetch('/api/interview/answers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              questionId: question.id,
              answer,
              questionText: question.question,
              questionCategory: question.category,
            }),
          })
        )
      );
      toast.success('답변이 저장되었습니다');
      onOpenChange(false);
    } catch {
      toast.error('저장에 실패했습니다');
    } finally {
      setIsSaving(false);
    }
  };

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.values(answers).filter(e => e.answer.trim()).length;

  // ── Intro ──────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-gray-900">모의 면접</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-6">
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-6 py-8 text-center space-y-3">
              <p className="text-2xl font-light text-gray-900">준비되셨나요?</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                총 <span className="font-semibold text-gray-900">{questions.length}개</span>의 질문이 준비되어 있습니다.<br />
                각 질문당 <span className="font-semibold text-gray-900">5분</span>의 시간이 주어집니다.
              </p>
              {(category || jobType) && (
                <div className="flex justify-center gap-2 pt-1">
                  {category && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600">
                      <span className={`h-1.5 w-1.5 rounded-full ${categoryConfig[category]?.dot}`} />
                      {categoryConfig[category]?.label}
                    </span>
                  )}
                  {jobType && (
                    <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600">{jobType}</span>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={() => setPhase('interview')}
              disabled={questions.length === 0}
              className="w-full rounded-lg bg-[#0f172a] py-2.5 text-sm font-medium text-white hover:bg-[#1e293b] disabled:opacity-50 transition-colors"
            >
              {questions.length === 0 ? '질문 로딩 중...' : '시작하기'}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // ── Result ─────────────────────────────────────────────────────────────────
  if (phase === 'result') {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-gray-900">면접 완료</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-6">
            {/* Summary */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-6 py-6 text-center space-y-2">
              <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto" />
              <p className="text-lg font-semibold text-gray-900">수고하셨습니다</p>
              <p className="text-sm text-gray-500">
                {questions.length}개 질문 중 <span className="font-semibold text-gray-900">{answeredCount}개</span> 답변 작성
              </p>
            </div>

            {/* Q&A list */}
            <div className="space-y-3">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">답변 요약</p>
              <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white shadow-sm">
                {questions.map((q, i) => {
                  const entry = answers[q.id];
                  const cat = categoryConfig[q.category];
                  return (
                    <div key={q.id} className="px-5 py-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-medium text-gray-400">Q{i + 1}</span>
                        <span className={`h-1.5 w-1.5 rounded-full ${cat?.dot}`} />
                        <span className="text-xs text-gray-400">{cat?.label}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 mb-2">{q.question}</p>
                      <div className="rounded-lg bg-gray-50 px-3 py-2.5 text-sm text-gray-600">
                        {entry?.answer?.trim() ? (
                          <p className="whitespace-pre-wrap">{entry.answer}</p>
                        ) : (
                          <p className="text-gray-400 italic text-xs">답변하지 않음</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleSaveAnswers}
                disabled={isSaving || answeredCount === 0}
                className="flex-1 rounded-lg bg-[#0f172a] py-2.5 text-sm font-medium text-white hover:bg-[#1e293b] disabled:opacity-50 transition-colors"
              >
                {isSaving ? '저장 중...' : '답변 저장하기'}
              </button>
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setAnswers({});
                  setCurrentAnswer('');
                  setPhase('intro');
                  setTimeLeft(SECONDS_PER_QUESTION);
                }}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                다시 시작
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // ── Interview ──────────────────────────────────────────────────────────────
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-100 rounded-t-lg overflow-hidden">
          <div
            className="h-full bg-[#0f172a] transition-all duration-1000"
            style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
          />
        </div>

        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-base font-semibold text-gray-900">
              질문 {currentIndex + 1} / {questions.length}
            </DialogTitle>
            <div className={`flex items-center gap-1.5 text-sm font-medium tabular-nums ${timeLeft < 60 ? 'text-red-500' : 'text-gray-500'}`}>
              <Timer className="h-3.5 w-3.5" />
              {formatTime(timeLeft)}
            </div>
          </div>
        </DialogHeader>

        {currentQuestion && (
          <div className="py-2 space-y-5">
            {/* Question */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${categoryConfig[currentQuestion.category]?.dot}`} />
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  {categoryConfig[currentQuestion.category]?.label}
                </span>
                {currentQuestion.jobType && (
                  <span className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] text-gray-500">
                    {currentQuestion.jobType}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-gray-900 leading-relaxed">{currentQuestion.question}</p>
            </div>

            {/* Answer */}
            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide mb-1.5">
                답변
              </label>
              <textarea
                value={currentAnswer}
                onChange={e => setCurrentAnswer(e.target.value)}
                placeholder="여기에 답변을 작성해주세요..."
                rows={6}
                className="block w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => onOpenChange(false)}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                면접 종료
              </button>
              <button
                onClick={goNext}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#0f172a] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1e293b] transition-colors"
              >
                {currentIndex < questions.length - 1 ? (
                  <>다음 질문 <ArrowRight className="h-3.5 w-3.5" /></>
                ) : (
                  <>완료 <CheckCircle className="h-3.5 w-3.5" /></>
                )}
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
