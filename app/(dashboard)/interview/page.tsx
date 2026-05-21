'use client';

/**
 * 면접 준비 페이지
 *
 * - 기본 제공 질문: lib/interview-questions.ts 템플릿 (임시 ID)
 * - 나의 질문: DB에 저장된 커스텀 질문
 * - category(기술/인성/상황), jobType(프론트엔드/백엔드/공통) 필터
 * - 모의 면접 모드: MockInterviewModal에서 랜덤 질문 섞어서 진행
 * - 답변 작성: AnswerSlideOver에서 upsert 저장
 */
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Play } from 'lucide-react';
import { InterviewCard } from '@/components/interview/InterviewCard';
import { AnswerSlideOver } from '@/components/interview/AnswerSlideOver';
import { CustomQuestionForm } from '@/components/interview/CustomQuestionForm';
import { MockInterviewModal } from '@/components/interview/MockInterviewModal';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';
import { toast } from 'sonner';
import type { InterviewQuestion, InterviewAnswer } from '@prisma/client';
import type { QuestionCategory } from '@/types';

type QuestionWithAnswers = InterviewQuestion & { answers?: InterviewAnswer[] };

const categories = [
  { value: 'TECHNICAL', label: '기술' },
  { value: 'PERSONALITY', label: '인성' },
  { value: 'SITUATIONAL', label: '상황' },
];

const jobTypes = [
  { value: 'frontend', label: '프론트엔드' },
  { value: 'backend', label: '백엔드' },
  { value: 'common', label: '공통' },
];

async function fetchInterviewQuestions(category?: QuestionCategory, jobType?: string): Promise<QuestionWithAnswers[]> {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (jobType) params.append('jobType', jobType);
  const res = await fetch(`/api/interview/questions?${params.toString()}`);
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

export default function InterviewPage() {
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | 'all'>('all');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [customOpen, setCustomOpen] = useState(false);
  const [mockOpen, setMockOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<QuestionWithAnswers | null>(null);
  const queryClient = useQueryClient();

  const { data: questions = [], isLoading } = useQuery({
    queryKey: ['interview-questions', selectedCategory, selectedJobType],
    queryFn: () => fetchInterviewQuestions(
      selectedCategory === 'all' ? undefined : selectedCategory as QuestionCategory,
      selectedJobType === 'all' ? undefined : selectedJobType,
    ),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/interview/questions/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interview-questions'] });
      toast.success('질문이 삭제되었습니다');
      setDeleteId(null);
    },
    onError: () => toast.error('삭제에 실패했습니다'),
  });

  const defaultQuestions = questions.filter(q => q.isDefault);
  const customQuestions = questions.filter(q => !q.isDefault);

  return (
    <div className="min-h-full bg-gray-50/50">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* 헤더 */}
        <div className="flex items-end justify-between border-b border-gray-200 pb-5">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Interview</p>
            <h1 className="text-xl font-semibold text-gray-900">면접 준비</h1>
            <p className="text-xs text-gray-400 mt-1">예상 질문을 정리하고 모의 면접으로 연습하세요</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setMockOpen(true)} className="gap-1.5">
              <Play className="w-3.5 h-3.5" /> 모의 면접
            </Button>
            <Dialog open={customOpen} onOpenChange={setCustomOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1.5 bg-[#0f172a] hover:bg-[#1e293b] text-white">
                  <Plus className="w-4 h-4" /> 질문 추가
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>커스텀 질문 추가</DialogTitle></DialogHeader>
                <CustomQuestionForm onSuccess={() => {
                  setCustomOpen(false);
                  queryClient.invalidateQueries({ queryKey: ['interview-questions'] });
                }} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* 필터 */}
        <div className="flex gap-3">
          <Select value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as QuestionCategory | 'all')}>
            <SelectTrigger className="w-36 bg-white"><SelectValue placeholder="카테고리" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 카테고리</SelectItem>
              {categories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={selectedJobType} onValueChange={setSelectedJobType}>
            <SelectTrigger className="w-36 bg-white"><SelectValue placeholder="직무" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 직무</SelectItem>
              {jobTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl border border-gray-100 bg-white p-5 animate-pulse space-y-3">
                <div className="h-3 bg-gray-100 rounded w-1/4" />
                <div className="h-4 bg-gray-100 rounded" />
                <div className="h-4 bg-gray-100 rounded w-4/5" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {/* 기본 질문 */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">기본 제공 질문</p>
                <span className="text-xs text-gray-400">({defaultQuestions.length})</span>
              </div>
              {defaultQuestions.length === 0 ? (
                <p className="text-sm text-gray-400">해당하는 질문이 없습니다</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {defaultQuestions.map(q => (
                    <InterviewCard
                      key={q.id}
                      question={q}
                      onEdit={() => setActiveQuestion(q)}
                      canDelete={false}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* 나의 질문 */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">나의 질문</p>
                <span className="text-xs text-gray-400">({customQuestions.length})</span>
              </div>
              {customQuestions.length === 0 ? (
                <div className="rounded-xl border border-gray-100 bg-white py-12 text-center shadow-sm">
                  <p className="text-sm text-gray-400 mb-3">커스텀 질문이 없습니다</p>
                  <Button size="sm" variant="outline" onClick={() => setCustomOpen(true)}>
                    첫 질문 추가하기
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {customQuestions.map(q => (
                    <InterviewCard
                      key={q.id}
                      question={q}
                      onEdit={() => setActiveQuestion(q)}
                      onDelete={() => setDeleteId(q.id)}
                      canDelete
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>

      {/* Slide-over for answer writing */}
      <AnswerSlideOver
        question={activeQuestion}
        onClose={() => setActiveQuestion(null)}
      />

      <MockInterviewModal
        open={mockOpen}
        onOpenChange={setMockOpen}
        category={selectedCategory === 'all' ? undefined : selectedCategory as QuestionCategory}
        jobType={selectedJobType === 'all' ? undefined : selectedJobType}
      />

      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="질문 삭제"
        description="이 질문을 삭제하시겠습니까?"
      />
    </div>
  );
}
