'use client';

/**
 * 관리자 공지사항 관리 페이지
 *
 * - 공지 작성 (제목, 내용, 상단 고정 여부)
 * - 인라인 수정 (editId 상태로 해당 공지만 편집 모드 전환)
 * - 상단 고정 토글 (Pin 버튼)
 * - 삭제 확인 다이얼로그
 * - 고정 공고는 amber 테두리로 강조
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Plus, Trash2, Pencil, Check, X, Pin } from 'lucide-react';
import { toast } from 'sonner';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';

type Notice = {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
};

async function fetchNotices(): Promise<Notice[]> {
  const res = await fetch('/api/admin/notices');
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

export default function AdminNoticesPage() {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ title: '', content: '' });
  const [showForm, setShowForm] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: '', content: '', isPinned: false });

  const { data: notices = [], isLoading } = useQuery({ queryKey: ['admin-notices'], queryFn: fetchNotices });

  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/admin/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNotice),
      });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-notices'] });
      toast.success('공지가 등록되었습니다');
      setShowForm(false);
      setNewNotice({ title: '', content: '', isPinned: false });
    },
    onError: () => toast.error('등록에 실패했습니다'),
  });

  const editMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Notice> }) => {
      const res = await fetch(`/api/admin/notices/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-notices'] });
      toast.success('수정되었습니다');
      setEditId(null);
    },
    onError: () => toast.error('수정에 실패했습니다'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/notices/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-notices'] });
      toast.success('삭제되었습니다');
      setDeleteId(null);
    },
    onError: () => toast.error('삭제에 실패했습니다'),
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
      {/* 헤더 */}
      <div className="flex items-end justify-between border-b border-gray-200 pb-5">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Admin</p>
          <h1 className="text-xl font-semibold text-gray-900">공지사항 관리</h1>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(v => !v)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#0f172a] px-3 py-2 text-sm font-medium text-white hover:bg-[#1e293b] transition-colors"
        >
          <Plus className="w-4 h-4" /> 공지 작성
        </button>
      </div>

      {/* 작성 폼 */}
      {showForm && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">새 공지</p>
          <div>
            <label className="block text-xs text-gray-500 mb-1">제목</label>
            <input
              type="text"
              value={newNotice.title}
              onChange={e => setNewNotice(v => ({ ...v, title: e.target.value }))}
              placeholder="공지 제목"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">내용</label>
            <textarea
              value={newNotice.content}
              onChange={e => setNewNotice(v => ({ ...v, content: e.target.value }))}
              rows={4}
              placeholder="공지 내용을 입력하세요"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPinned"
              checked={newNotice.isPinned}
              onChange={e => setNewNotice(v => ({ ...v, isPinned: e.target.checked }))}
              className="rounded"
            />
            <label htmlFor="isPinned" className="text-xs text-gray-500 cursor-pointer">상단 고정</label>
          </div>
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">취소</button>
            <button
              type="button"
              disabled={!newNotice.title.trim() || !newNotice.content.trim() || createMutation.isPending}
              onClick={() => createMutation.mutate()}
              className="px-4 py-2 text-sm font-medium bg-[#0f172a] text-white rounded-lg hover:bg-[#1e293b] disabled:opacity-50 transition-colors"
            >
              등록
            </button>
          </div>
        </div>
      )}

      {/* 공지 목록 */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="space-y-3 animate-pulse">
            {[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-gray-100 rounded-xl" />)}
          </div>
        ) : notices.length === 0 ? (
          <div className="rounded-xl border border-gray-100 bg-white py-16 text-center shadow-sm">
            <p className="text-sm text-gray-400">등록된 공지가 없습니다</p>
          </div>
        ) : (
          notices.map(n => (
            <div
              key={n.id}
              className={`rounded-xl border bg-white p-5 shadow-sm ${n.isPinned ? 'border-amber-200' : 'border-gray-100'}`}
            >
              {editId === n.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editData.title}
                    onChange={e => setEditData(v => ({ ...v, title: e.target.value }))}
                    aria-label="공지 제목 수정"
                    className="w-full text-sm font-medium border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
                  />
                  <textarea
                    value={editData.content}
                    onChange={e => setEditData(v => ({ ...v, content: e.target.value }))}
                    rows={3}
                    aria-label="공지 내용 수정"
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      aria-label="취소"
                      onClick={() => setEditId(null)}
                      className="p-1.5 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="저장"
                      onClick={() => editMutation.mutate({ id: n.id, data: editData })}
                      className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      {n.isPinned && <Pin className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                      <h3 className="text-sm font-semibold text-gray-900 truncate">{n.title}</h3>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button
                        type="button"
                        aria-label={n.isPinned ? '고정 해제' : '상단 고정'}
                        onClick={() => editMutation.mutate({ id: n.id, data: { isPinned: !n.isPinned } })}
                        className={`p-1.5 rounded-lg transition-colors ${n.isPinned ? 'text-amber-500 bg-amber-50 hover:bg-amber-100' : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50'}`}
                      >
                        <Pin className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label="공지 수정"
                        onClick={() => { setEditId(n.id); setEditData({ title: n.title, content: n.content }); }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label="공지 삭제"
                        onClick={() => setDeleteId(n.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{n.content}</p>
                  <p className="mt-3 text-xs text-gray-400">
                    {new Date(n.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </>
              )}
            </div>
          ))
        )}
      </div>

      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={open => !open && setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="공지 삭제"
        description="이 공지사항을 삭제하시겠습니까?"
      />
    </div>
  );
}
