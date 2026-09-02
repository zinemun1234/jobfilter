'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, Edit2, Tag, AlertCircle, Search } from 'lucide-react';
import { toast } from 'sonner';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';
import EmptyState from '@/components/ui/EmptyState';
import SkeletonList from '@/components/ui/SkeletonList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Keyword = {
  id: string;
  category: string;
  key: string;
  value: string;
  aliases: string[] | null;
  createdAt: string;
  updatedAt: string;
};

const CATEGORIES = [
  { value: 'job-tag', label: '공고 태그' },
  { value: 'major', label: '전공 키워드' },
  { value: 'job-type', label: '직무 분류' },
  { value: 'skill-question', label: '기술 면접 키워드' },
];

async function fetchKeywords(category?: string): Promise<Keyword[]> {
  const params = category ? `?category=${encodeURIComponent(category)}` : '';
  const res = await fetch(`/api/admin/keywords${params}`);
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

export default function AdminKeywordsPage() {
  const qc = useQueryClient();
  const [category, setCategory] = useState('job-tag');
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState({
    category: 'job-tag',
    key: '',
    value: '',
    aliases: '',
  });

  const { data: keywords = [], isLoading, error, refetch } = useQuery({
    queryKey: ['admin-keywords', category],
    queryFn: () => fetchKeywords(category),
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/admin/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          aliases: form.aliases.split(',').map(s => s.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error('Failed');
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-keywords'] });
      toast.success('키워드가 추가되었습니다');
      setForm({ category: 'job-tag', key: '', value: '', aliases: '' });
      setAddOpen(false);
    },
    onError: () => toast.error('추가에 실패했습니다'),
  });

  const editMutation = useMutation({
    mutationFn: async (payload: Partial<Keyword> & { id: string }) => {
      const res = await fetch(`/api/admin/keywords/${payload.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          aliases: Array.isArray(payload.aliases)
            ? payload.aliases
            : (payload.aliases ?? '').toString().split(',').map(s => s.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error('Failed');
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-keywords'] });
      toast.success('수정되었습니다');
      setEditId(null);
    },
    onError: () => toast.error('수정에 실패했습니다'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/keywords/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-keywords'] });
      toast.success('삭제되었습니다');
      setDeleteId(null);
    },
    onError: () => toast.error('삭제에 실패했습니다'),
  });

  const filtered = keywords.filter((k) =>
    k.key.toLowerCase().includes(search.toLowerCase()) ||
    k.value.toLowerCase().includes(search.toLowerCase())
  );

  const isMutating = addMutation.isPending || editMutation.isPending || deleteMutation.isPending;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <div className="border-b border-gray-200 pb-5 flex items-end justify-between">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">관리자</p>
          <h1 className="text-xl font-semibold text-gray-900">키워드 사전 관리</h1>
          <p className="text-xs text-gray-400 mt-1">공고 태그, 전공/직무 분류 키워드를 관리합니다</p>
        </div>
        <Button onClick={() => setAddOpen(true)} disabled={isMutating} className="gap-2">
          <Plus className="w-4 h-4" /> 추가
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="키워드 검색"
            className="pl-9"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white"
        >
          {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>

      {addOpen && (
        <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5 space-y-4">
          <p className="text-sm font-semibold text-gray-800">새 키워드 추가</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white"
            >
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            <Input
              value={form.key}
              onChange={(e) => setForm({ ...form, key: e.target.value })}
              placeholder="key (매칭용)"
            />
            <Input
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
              placeholder="value (표시/태그)"
            />
            <Input
              value={form.aliases}
              onChange={(e) => setForm({ ...form, aliases: e.target.value })}
              placeholder="aliases (쉼표 구분)"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={() => setAddOpen(false)}>취소</Button>
            <Button onClick={() => addMutation.mutate()} disabled={!form.key || !form.value || isMutating}>
              추가
            </Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <SkeletonList count={5} cardClassName="h-24" />
      ) : error ? (
        <EmptyState
          icon={AlertCircle}
          title="키워드를 불러오지 못했습니다"
          description={error.message}
          action={{ label: '다시 시도', onClick: () => refetch() }}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Tag}
          title="등록된 키워드가 없습니다"
          description="키워드를 추가하면 consumer 함수에서 우선 사용됩니다"
        />
      ) : (
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm divide-y divide-gray-50">
          {filtered.map((k) => (
            <KeywordRow
              key={k.id}
              keyword={k}
              isEditing={editId === k.id}
              isMutating={isMutating}
              onEdit={(payload) => editMutation.mutate(payload)}
              onStartEdit={() => setEditId(k.id)}
              onCancelEdit={() => setEditId(null)}
              onDelete={() => setDeleteId(k.id)}
            />
          ))}
        </div>
      )}

      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="키워드 삭제"
        description="이 키워드를 삭제하면 관련 consumer 기능에 영향을 줄 수 있습니다."
        isPending={deleteMutation.isPending}
      />
    </div>
  );
}

function KeywordRow({
  keyword,
  isEditing,
  isMutating,
  onEdit,
  onStartEdit,
  onCancelEdit,
  onDelete,
}: {
  keyword: Keyword;
  isEditing: boolean;
  isMutating: boolean;
  onEdit: (payload: Partial<Keyword> & { id: string }) => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
}) {
  const [draft, setDraft] = useState({
    key: keyword.key,
    value: keyword.value,
    aliases: (keyword.aliases ?? []).join(', '),
  });

  if (isEditing) {
    return (
      <div className="px-5 py-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input value={draft.key} onChange={(e) => setDraft({ ...draft, key: e.target.value })} />
          <Input value={draft.value} onChange={(e) => setDraft({ ...draft, value: e.target.value })} />
          <Input value={draft.aliases} onChange={(e) => setDraft({ ...draft, aliases: e.target.value })} placeholder="aliases (쉼표 구분)" />
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" size="sm" onClick={onCancelEdit} disabled={isMutating}>취소</Button>
          <Button
            size="sm"
            onClick={() => onEdit({
              id: keyword.id,
              key: draft.key,
              value: draft.value,
              aliases: draft.aliases.split(',').map(s => s.trim()).filter(Boolean),
            })}
            disabled={!draft.key || !draft.value || isMutating}
          >
            저장
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-4 flex items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">{keyword.key}</span>
          <span className="text-xs text-gray-500">→ {keyword.value}</span>
        </div>
        {keyword.aliases && keyword.aliases.length > 0 && (
          <p className="text-xs text-gray-400 mt-1">별칭: {keyword.aliases.join(', ')}</p>
        )}
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button onClick={onStartEdit} disabled={isMutating} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button onClick={onDelete} disabled={isMutating} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
