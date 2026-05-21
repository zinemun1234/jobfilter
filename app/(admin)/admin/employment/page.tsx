'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Plus, Trash2, Search, Trophy } from 'lucide-react';
import { SlideOver } from '@/components/ui/slide-over';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';
import { toast } from 'sonner';

type User = { id: string; name: string | null; email: string; major: string | null };
type EmploymentRecord = {
  id: string;
  userId: string;
  company: string;
  position: string;
  employType: string | null;
  startDate: string | null;
  salary: string | null;
  note: string | null;
  confirmedAt: string;
  user: User | null;
};

async function fetchRecords(): Promise<EmploymentRecord[]> {
  const res = await fetch('/api/admin/employment');
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

async function fetchUsers(): Promise<User[]> {
  const res = await fetch('/api/admin/users');
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

const emptyForm = {
  userId: '', company: '', position: '',
  employType: '', startDate: '', salary: '', note: '',
};

export default function AdminEmploymentPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [slideOpen, setSlideOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const { data: records = [], isLoading } = useQuery({ queryKey: ['admin-employment'], queryFn: fetchRecords });
  const { data: users = [] } = useQuery({ queryKey: ['admin-users'], queryFn: fetchUsers });

  const filtered = records.filter(r =>
    !search ||
    r.company.includes(search) ||
    r.position.includes(search) ||
    (r.user?.name ?? '').includes(search) ||
    (r.user?.email ?? '').includes(search)
  );

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/admin/employment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? 'Failed');
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-employment'] });
      qc.invalidateQueries({ queryKey: ['admin-stats-detail'] });
      toast.success('취업 확정이 등록되었습니다');
      setSlideOpen(false);
      setForm(emptyForm);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => fetch(`/api/admin/employment/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-employment'] });
      qc.invalidateQueries({ queryKey: ['admin-stats-detail'] });
      toast.success('삭제되었습니다');
      setDeleteId(null);
    },
  });

  const f = (key: keyof typeof emptyForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [key]: e.target.value }));

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <div className="flex items-end justify-between border-b border-gray-200 pb-5">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Admin</p>
          <h1 className="text-xl font-semibold text-gray-900">취업 확정 관리</h1>
          <p className="text-xs text-gray-400 mt-1">취업 확정 학생을 등록하면 통계에 자동 반영됩니다</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-2 text-center">
            <p className="text-lg font-bold text-emerald-700">{records.length}</p>
            <p className="text-[10px] text-emerald-500">확정 등록</p>
          </div>
          <button
            type="button"
            onClick={() => { setForm(emptyForm); setSlideOpen(true); }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0f172a] px-3 py-2 text-sm font-medium text-white hover:bg-[#1e293b] transition-colors"
          >
            <Plus className="w-4 h-4" /> 취업 확정 등록
          </button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="학생명, 이메일, 회사명 검색"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
        />
      </div>

      <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3 animate-pulse">{[...Array(4)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Trophy className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400">등록된 취업 확정이 없습니다</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">학생</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">취업처</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">고용형태</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">등록일</th>
                <th className="px-4 py-3 sr-only">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">{r.user?.name ?? '(이름 없음)'}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{r.user?.email}</p>
                    {r.user?.major && <p className="text-[11px] text-gray-300 mt-0.5">{r.user.major}</p>}
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-medium text-gray-900">{r.company}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{r.position}</p>
                    {r.salary && <p className="text-xs text-emerald-600 mt-0.5">{r.salary}</p>}
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    {r.employType ? (
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{r.employType}</span>
                    ) : <span className="text-xs text-gray-300">-</span>}
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <span className="text-xs text-gray-500 tabular-nums">
                      {new Date(r.confirmedAt).toLocaleDateString('ko-KR')}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end">
                      <button type="button" onClick={() => setDeleteId(r.id)} aria-label="삭제"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <SlideOver open={slideOpen} onClose={() => setSlideOpen(false)} title="취업 확정 등록">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">학생 선택 *</label>
            <select value={form.userId} onChange={f('userId')} aria-label="학생 선택"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 bg-white">
              <option value="">학생을 선택하세요</option>
              {users.map((u: User) => (
                <option key={u.id} value={u.id}>{u.name ?? u.email} ({u.email})</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">회사명 *</label>
              <input value={form.company} onChange={f('company')} placeholder="예: 카카오"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">직무 *</label>
              <input value={form.position} onChange={f('position')} placeholder="예: 백엔드 개발자"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">고용형태</label>
              <select value={form.employType} onChange={f('employType')} aria-label="고용형태 선택"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 bg-white">
                <option value="">선택</option>
                <option value="정규직">정규직</option>
                <option value="계약직">계약직</option>
                <option value="인턴">인턴</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">입사일</label>
              <input type="date" value={form.startDate} onChange={f('startDate')} aria-label="입사일 선택"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">급여</label>
            <input value={form.salary} onChange={f('salary')} placeholder="예: 4,000만원"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">메모</label>
            <textarea value={form.note} onChange={f('note')} rows={3} placeholder="특이사항 등..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 resize-none" />
          </div>
          <button
            type="button"
            onClick={() => saveMutation.mutate()}
            disabled={!form.userId || !form.company || !form.position || saveMutation.isPending}
            className="w-full py-2.5 bg-[#0f172a] text-white text-sm font-medium rounded-lg hover:bg-[#1e293b] disabled:opacity-50 transition-colors"
          >
            {saveMutation.isPending ? '등록 중...' : '취업 확정 등록'}
          </button>
        </div>
      </SlideOver>

      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={open => !open && setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="취업 확정 삭제"
        description="이 취업 확정 기록을 삭제하시겠습니까?"
      />
    </div>
  );
}
