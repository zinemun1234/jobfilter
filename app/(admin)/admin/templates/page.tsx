'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, Edit2, FileText, AlertCircle, Search } from 'lucide-react';
import { toast } from 'sonner';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';
import EmptyState from '@/components/ui/EmptyState';
import SkeletonList from '@/components/ui/SkeletonList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { safeJsonParse } from '@/lib/json-utils';

type Template = {
  id: string;
  type: string;
  name: string;
  label: string | null;
  data: string;
  jobType: string | null;
  category: string | null;
  createdAt: string;
  updatedAt: string;
};

function prettyPrintJson(data: string): string {
  const parsed = safeJsonParse<unknown>(data, null);
  return parsed !== null ? JSON.stringify(parsed, null, 2) : data;
}

const TYPES = [
  { value: 'cover-letter', label: '자소서 템플릿' },
  { value: 'roadmap', label: '로드맵 템플릿' },
  { value: 'interview-question', label: '면접 질문' },
  { value: 'interview-recommend', label: '면접 추천 데이터' },
];

async function fetchTemplates(type?: string): Promise<Template[]> {
  const params = type ? `?type=${encodeURIComponent(type)}` : '';
  const res = await fetch(`/api/admin/templates${params}`);
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

export default function AdminTemplatesPage() {
  const qc = useQueryClient();
  const [type, setType] = useState('cover-letter');
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState({
    type: 'cover-letter',
    name: '',
    label: '',
    data: '',
    jobType: '',
    category: '',
  });

  const { data: templates = [], isLoading, error, refetch } = useQuery({
    queryKey: ['admin-templates', type],
    queryFn: () => fetchTemplates(type),
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/admin/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: form.type,
          name: form.name,
          label: form.label || null,
          data: safeJsonParse<unknown>(form.data, form.data),
          jobType: form.jobType || null,
          category: form.category || null,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-templates'] });
      toast.success('템플릿이 추가되었습니다');
      setForm({ type: 'cover-letter', name: '', label: '', data: '', jobType: '', category: '' });
      setAddOpen(false);
    },
    onError: (e: Error) => toast.error(e.message || '추가에 실패했습니다'),
  });

  const editMutation = useMutation({
    mutationFn: async (payload: Partial<Template> & { id: string }) => {
      const res = await fetch(`/api/admin/templates/${payload.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          data: payload.data !== undefined ? safeJsonParse<unknown>(payload.data, payload.data) : undefined,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-templates'] });
      toast.success('수정되었습니다');
      setEditId(null);
    },
    onError: () => toast.error('수정에 실패했습니다'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/templates/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-templates'] });
      toast.success('삭제되었습니다');
      setDeleteId(null);
    },
    onError: () => toast.error('삭제에 실패했습니다'),
  });

  const filtered = templates.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    (t.label ?? '').toLowerCase().includes(search.toLowerCase())
  );

  const isMutating = addMutation.isPending || editMutation.isPending || deleteMutation.isPending;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <div className="border-b border-gray-200 pb-5 flex items-end justify-between">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">관리자</p>
          <h1 className="text-xl font-semibold text-gray-900">템플릿 관리</h1>
          <p className="text-xs text-gray-400 mt-1">자소서, 로드맵, 면접 질문/추천 템플릿을 관리합니다</p>
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
            placeholder="템플릿 검색"
            className="pl-9"
          />
        </div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white"
        >
          {TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>

      {addOpen && (
        <TemplateForm
          title="새 템플릿 추가"
          form={form}
          setForm={setForm}
          onSubmit={() => addMutation.mutate()}
          onCancel={() => setAddOpen(false)}
          isLoading={addMutation.isPending}
          submitLabel="추가"
        />
      )}

      {isLoading ? (
        <SkeletonList count={5} cardClassName="h-24" />
      ) : error ? (
        <EmptyState
          icon={AlertCircle}
          title="템플릿을 불러오지 못했습니다"
          description={error.message}
          action={{ label: '다시 시도', onClick: () => refetch() }}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="등록된 템플릿이 없습니다"
          description="템플릿을 추가하면 consumer 함수에서 우선 사용됩니다"
        />
      ) : (
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm divide-y divide-gray-50">
          {filtered.map((t) => (
            <TemplateRow
              key={t.id}
              template={t}
              isEditing={editId === t.id}
              isMutating={isMutating}
              onEdit={(payload) => editMutation.mutate(payload)}
              onStartEdit={() => setEditId(t.id)}
              onCancelEdit={() => setEditId(null)}
              onDelete={() => setDeleteId(t.id)}
            />
          ))}
        </div>
      )}

      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="템플릿 삭제"
        description="이 템플릿을 삭제하면 관련 consumer 기능에 영향을 줄 수 있습니다."
        isPending={deleteMutation.isPending}
      />
    </div>
  );
}

function TemplateForm({
  title,
  form,
  setForm,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: {
  title: string;
  form: { type: string; name: string; label: string; data: string; jobType: string; category: string };
  setForm: (form: { type: string; name: string; label: string; data: string; jobType: string; category: string }) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
  submitLabel: string;
}) {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5 space-y-4">
      <p className="text-sm font-semibold text-gray-800">{title}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white"
        >
          {TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="name (식별자)" />
        <Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="label (표시 이름)" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Input value={form.jobType} onChange={(e) => setForm({ ...form, jobType: e.target.value })} placeholder="jobType (선택)" />
        <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="category (선택)" />
      </div>
      <textarea
        value={form.data}
        onChange={(e) => setForm({ ...form, data: e.target.value })}
        rows={6}
        placeholder='data (JSON). 예: { "items": [{"question":"...", "answer":""}] }'
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none font-mono"
      />
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" onClick={onCancel} disabled={isLoading}>취소</Button>
        <Button onClick={onSubmit} disabled={!form.type || !form.name || !form.data || isLoading}>
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}

function TemplateRow({
  template,
  isEditing,
  isMutating,
  onEdit,
  onStartEdit,
  onCancelEdit,
  onDelete,
}: {
  template: Template;
  isEditing: boolean;
  isMutating: boolean;
  onEdit: (payload: Partial<Template> & { id: string }) => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
}) {
  const prettyData = prettyPrintJson(template.data);
  const [draft, setDraft] = useState({
    name: template.name,
    label: template.label ?? '',
    data: prettyData,
    jobType: template.jobType ?? '',
    category: template.category ?? '',
  });

  if (isEditing) {
    return (
      <div className="px-5 py-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          <Input value={draft.label} onChange={(e) => setDraft({ ...draft, label: e.target.value })} />
          <Input value={draft.jobType} onChange={(e) => setDraft({ ...draft, jobType: e.target.value })} placeholder="jobType" />
        </div>
        <Input value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} placeholder="category" />
        <textarea
          value={draft.data}
          onChange={(e) => setDraft({ ...draft, data: e.target.value })}
          rows={6}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none font-mono"
        />
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" size="sm" onClick={onCancelEdit} disabled={isMutating}>취소</Button>
          <Button
            size="sm"
            onClick={() => onEdit({
              id: template.id,
              name: draft.name,
              label: draft.label || null,
              data: draft.data,
              jobType: draft.jobType || null,
              category: draft.category || null,
            })}
            disabled={!draft.name || !draft.data || isMutating}
          >
            저장
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-4 flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">{template.name}</span>
          {template.label && <span className="text-xs text-gray-500">({template.label})</span>}
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{template.type}</span>
        </div>
        {(template.jobType || template.category) && (
          <p className="text-xs text-gray-400 mt-0.5">
            {template.jobType && `jobType: ${template.jobType}`} {template.category && `· category: ${template.category}`}
          </p>
        )}
        <pre className="mt-2 text-[11px] text-gray-500 bg-gray-50 rounded-lg p-2 overflow-x-auto whitespace-pre-wrap">
          {prettyData}
        </pre>
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
