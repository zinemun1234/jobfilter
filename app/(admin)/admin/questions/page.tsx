'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, Edit2, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';

type Category = 'TECHNICAL' | 'PERSONALITY' | 'SITUATIONAL';
type JobType = 'frontend' | 'backend' | 'common';

interface Question {
  id: string;
  category: Category;
  jobType: string | null;
  question: string;
  isDefault: boolean;
  _count: { answers: number };
}

const CATEGORY_CONFIG: Record<Category, { label: string; dot: string; bg: string }> = {
  TECHNICAL:   { label: '기술',  dot: 'bg-blue-500',    bg: 'bg-blue-50 text-blue-700'    },
  PERSONALITY: { label: '인성',  dot: 'bg-emerald-500', bg: 'bg-emerald-50 text-emerald-700' },
  SITUATIONAL: { label: '상황',  dot: 'bg-amber-500',   bg: 'bg-amber-50 text-amber-700'  },
};

const JOB_TYPES: { value: JobType | ''; label: string }[] = [
  { value: '',         label: '공통' },
  { value: 'frontend', label: '프론트엔드' },
  { value: 'backend',  label: '백엔드' },
  { value: 'common',   label: '공통(명시)' },
];

async function fetchQuestions(): Promise<Question[]> {
  const res = await fetch('/api/admin/questions');
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

export default function AdminQuestionsPage() {
  const queryClient = useQueryClient();
  const [filterCategory, setFilterCategory] = useState<Category | 'all'>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [newCategory, setNewCategory] = useState<Category>('TECHNICAL');
  const [newJobType, setNewJobType] = useState<string>('');
  const [newQuestion, setNewQuestion] = useState('');
  const [addOpen, setAddOpen] = useState(false);

  const { data: questions = [], isLoading } = useQuery({
    queryKey: ['admin-questions'],
    queryFn: fetchQuestions,
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/admin/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: newCategory,
          jobType: newJobType || null,
          question: newQuestion.trim(),
        }),
      });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-questions'] });
      toast.success('질문이 추가되었습니다');
      setNewQuestion('');
      setAddOpen(false);
    },
    onError: () => toast.error('추가에 실패했습니다'),
  });

  const editMutation = useMutation({
    mutationFn: async ({ id, question }: { id: string; question: string }) => {
      const res = await fetch(`/api/admin/questions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-questions'] });
      toast.success('수정되었습니다');
      setEditId(null);
    },
    onError: () => toast.error('수정에 실패했습니다'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/questions/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-questions'] });
      toast.success('삭제되었습니다');
      setDeleteId(null);
    },
    onError: () => toast.error('삭제에 실패했습니다'),
  });

  const filtered = filterCategory === 'all'
    ? questions
    : questions.filter(q => q.category === filterCategory);

  const counts = {
    all: questions.length,
    TECHNICAL: questions.filter(q => q.category === 'TECHNICAL').length,
    PERSONALITY: questions.filter(q => q.category === 'PERSONALITY').length,
    SITUATIONAL: questions.filter(q => q.category === 'SITUATIONAL').length,
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <div className="border-b border-gray-200 pb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">관리자</p>
          <h1 className="text-xl font-semibold text-gray-900">면접 질문 관리</h1>
          <p className="text-xs text-gray-400 mt-1">학생들에게 제공되는 기본 면접 질문을 관리합니다</p>
        </div>
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#0f172a] text-white text-sm font-medium rounded-lg hover:bg-[#1e293b] transition-colors"
        >
          <Plus className="w-4 h-4" /> 질문 추가
        </button>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'TECHNICAL', 'PERSONALITY', 'SITUATIONAL'] as const).map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filterCategory === cat
                ? 'bg-[#0f172a] text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {cat === 'all' ? '전체' : CATEGORY_CONFIG[cat].label}
            <span className="ml-1.5 opacity-60">{counts[cat]}</span>
          </button>
        ))}
      </div>

      {/* 질문 추가 폼 */}
      {addOpen && (
        <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5 space-y-4">
          <p className="text-sm font-semibold text-gray-800">새 질문 추가</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">카테고리</label>
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value as Category)}
                aria-label="카테고리 선택"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
              >
                <option value="TECHNICAL">기술</option>
                <option value="PERSONALITY">인성</option>
                <option value="SITUATIONAL">상황</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">직군 (선택)</label>
              <select
                value={newJobType}
                onChange={e => setNewJobType(e.target.value)}
                aria-label="직군 선택"
                title="직군 선택"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
              >
                {JOB_TYPES.map(jt => (
                  <option key={jt.value} value={jt.value}>{jt.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">질문 내용</label>
            <textarea
              value={newQuestion}
              onChange={e => setNewQuestion(e.target.value)}
              rows={3}
              placeholder="면접 질문을 입력하세요"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 resize-none"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => { setAddOpen(false); setNewQuestion(''); }}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              취소
            </button>
            <button
              type="button"
              onClick={() => addMutation.mutate()}
              disabled={!newQuestion.trim() || addMutation.isPending}
              className="px-4 py-2 bg-[#0f172a] text-white text-sm font-medium rounded-lg hover:bg-[#1e293b] disabled:opacity-50 transition-colors"
            >
              {addMutation.isPending ? '추가 중...' : '추가'}
            </button>
          </div>
        </div>
      )}

      {/* 질문 목록 */}
      {isLoading ? (
        <div className="text-center py-12 text-sm text-gray-400">불러오는 중...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-sm text-gray-400">질문이 없습니다</div>
      ) : (
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm divide-y divide-gray-50">
          {filtered.map(q => {
            const cat = CATEGORY_CONFIG[q.category];
            return (
              <div key={q.id} className="px-5 py-4">
                {editId === q.id ? (
                  <div className="space-y-3">
                    <textarea
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      rows={3}
                      aria-label="질문 수정"
                      placeholder="질문 내용을 입력하세요"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 resize-none"
                    />
                    <div className="flex gap-2 justify-end">
                      <button type="button" onClick={() => setEditId(null)} className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700">취소</button>
                      <button
                        type="button"
                        onClick={() => editMutation.mutate({ id: q.id, question: editText })}
                        disabled={editMutation.isPending}
                        className="px-3 py-1.5 bg-[#0f172a] text-white text-xs font-medium rounded-lg hover:bg-[#1e293b] disabled:opacity-50"
                      >
                        저장
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cat.bg}`}>
                          {cat.label}
                        </span>
                        {q.jobType && (
                          <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                            {q.jobType}
                          </span>
                        )}
                        <span className="text-[10px] text-gray-300 flex items-center gap-0.5">
                          <MessageSquare className="w-3 h-3" /> {q._count.answers}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 leading-relaxed">{q.question}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => { setEditId(q.id); setEditText(q.question); }}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="수정"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteId(q.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={open => { if (!open) setDeleteId(null); }}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="질문 삭제"
        description="이 질문을 삭제하면 학생들의 답변 기록도 함께 삭제됩니다."
      />
    </div>
  );
}
