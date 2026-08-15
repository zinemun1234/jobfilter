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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Play, Lightbulb, BookOpen } from 'lucide-react';
import { InterviewCard } from '@/components/interview/InterviewCard';
import { AnswerSlideOver } from '@/components/interview/AnswerSlideOver';
import { CustomQuestionForm } from '@/components/interview/CustomQuestionForm';
import { MockInterviewModal } from '@/components/interview/MockInterviewModal';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';
import { toast } from 'sonner';
import type { InterviewQuestion, InterviewAnswer } from '@/lib/generated/prisma';
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

type JobOption = { id: string; company: string; position: string };
type RecommendedQuestion = { category: QuestionCategory; jobType?: string; question: string };

async function fetchJobs(): Promise<JobOption[]> {
  const res = await fetch('/api/jobs');
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

async function recommendQuestions(jobId: string): Promise<RecommendedQuestion[]> {
  const res = await fetch('/api/interview/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobId }),
  });
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
  const [recommendJobId, setRecommendJobId] = useState<string>('');
  const queryClient = useQueryClient();

  const { data: jobs = [] } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });

  const { data: recommended = [], isLoading: recommendLoading, refetch: refetchRecommend } = useQuery({
    queryKey: ['interview-recommend', recommendJobId],
    queryFn: () => recommendQuestions(recommendJobId),
    enabled: !!recommendJobId,
  });

  const addCustomMutation = useMutation({
    mutationFn: async (body: { category: QuestionCategory; jobType?: string; question: string }) => {
      const res = await fetch('/api/interview/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interview-questions'] });
      toast.success('추천 질문을 내 질문에 추가했습니다');
    },
    onError: () => toast.error('질문 추가에 실패했습니다'),
  });

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
    <div className="min-h-full">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* 헤더 */}
        <div className="flex items-end justify-between border-b border-gray-200 pb-6">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Interview</p>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">면접 준비</h1>
            <p className="text-sm text-gray-500 mt-1.5">예상 질문을 정리하고 모의 면접으로 연습하세요</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setMockOpen(true)} className="gap-2 rounded-xl">
              <Play className="w-4 h-4" /> 모의 면접
            </Button>
            <Dialog open={customOpen} onOpenChange={setCustomOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-slate-900/10">
                  <Plus className="w-4 h-4" /> 질문 추가
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>커스텀 질문 추가</DialogTitle><DialogDescription>면접 연습용 커스텀 질문을 추가합니다.</DialogDescription></DialogHeader>
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
            <SelectTrigger className="w-36 bg-white border-gray-200 rounded-xl"><SelectValue placeholder="카테고리" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 카테고리</SelectItem>
              {categories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={selectedJobType} onValueChange={setSelectedJobType}>
            <SelectTrigger className="w-36 bg-white border-gray-200 rounded-xl"><SelectValue placeholder="직무" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 직무</SelectItem>
              {jobTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* 추천 질문 */}
        <div className="rounded-2xl border border-violet-200 bg-violet-50/40 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-violet-600" />
            <p className="text-sm font-semibold text-violet-800">지원 공고 기반 면접 질문 추천</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Select value={recommendJobId} onValueChange={setRecommendJobId}>
              <SelectTrigger className="w-64 bg-white border-violet-200 rounded-xl text-sm">
                <SelectValue placeholder="지원 공고 선택" />
              </SelectTrigger>
              <SelectContent>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id} className="text-sm">
                    {job.company} · {job.position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size="sm"
              variant="outline"
              onClick={() => recommendJobId && refetchRecommend()}
              disabled={!recommendJobId || recommendLoading}
              className="rounded-xl border-violet-200 text-violet-700 hover:bg-violet-100"
            >
              {recommendLoading ? '추천 중...' : '추천 받기'}
            </Button>
          </div>

          {recommendJobId && !recommendLoading && recommended.length > 0 && (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {recommended.map((q, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-violet-100 bg-white p-4 shadow-sm flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-violet-500" />
                    <span className="text-[11px] font-medium text-violet-600 uppercase">
                      {q.category === 'TECHNICAL' ? '기술' : q.category === 'PERSONALITY' ? '인성' : '상황'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed flex-1">{q.question}</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => addCustomMutation.mutate(q)}
                    disabled={addCustomMutation.isPending}
                    className="w-full text-violet-700 hover:bg-violet-50 rounded-lg text-xs"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> 내 질문에 추가
                  </Button>
                </div>
              ))}
            </div>
          )}

          {recommendJobId && !recommendLoading && recommended.length === 0 && (
            <p className="text-sm text-violet-600/70">추천 질문이 없습니다. 포트폴리오나 기술 스택을 등록해보세요.</p>
          )}
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 animate-pulse space-y-3">
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
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">기본 제공 질문</p>
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
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">나의 질문</p>
                <span className="text-xs text-gray-400">({customQuestions.length})</span>
              </div>
              {customQuestions.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center shadow-sm">
                  <p className="text-sm text-gray-400 mb-1">커스텀 질문이 없습니다</p>
                  <p className="text-xs text-gray-300 mb-4">직무에 맞는 질문을 추가하고 답변을 준비하세요</p>
                  <Button size="sm" variant="outline" onClick={() => setCustomOpen(true)} className="rounded-xl">
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
