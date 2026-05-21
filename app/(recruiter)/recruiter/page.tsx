'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Plus, Pencil, Trash2, ExternalLink, Building2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';

type Listing = {
  id: string;
  company: string;
  position: string;
  location: string | null;
  career: string | null;
  employType: string | null;
  salary: string | null;
  deadline: string | null;
  url: string | null;
  isActive: boolean;
  createdAt: string;
};

type FormData = {
  company: string;
  position: string;
  location: string;
  career: string;
  education: string;
  employType: string;
  salary: string;
  deadline: string;
  url: string;
  description: string;
  tags: string;
};

const EMPTY_FORM: FormData = {
  company: '', position: '', location: '', career: '', education: '',
  employType: '', salary: '', deadline: '', url: '', description: '', tags: '',
};

export default function RecruiterPage() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);

  const { data: listings = [], isLoading } = useQuery<Listing[]>({
    queryKey: ['recruiter-listings'],
    queryFn: async () => {
      const res = await fetch('/api/recruiter/listings');
      if (!res.ok) throw new Error('Failed');
      return (await res.json()).data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const payload = {
        ...data,
        tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        deadline: data.deadline || null,
      };
      const res = editId
        ? await fetch(`/api/recruiter/listings/${editId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        : await fetch('/api/recruiter/listings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
      if (!res.ok) throw new Error('Failed');
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['recruiter-listings'] });
      toast.success(editId ? '공고가 수정되었습니다' : '공고가 등록되었습니다');
      setShowForm(false);
      setEditId(null);
      setForm(EMPTY_FORM);
    },
    onError: () => toast.error('오류가 발생했습니다'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/recruiter/listings/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['recruiter-listings'] });
      toast.success('공고가 삭제되었습니다');
      setDeleteId(null);
    },
    onError: () => toast.error('오류가 발생했습니다'),
  });

  function openEdit(l: Listing) {
    setEditId(l.id);
    setForm({
      company: l.company,
      position: l.position,
      location: l.location ?? '',
      career: l.career ?? '',
      education: '',
      employType: l.employType ?? '',
      salary: l.salary ?? '',
      deadline: l.deadline ? l.deadline.slice(0, 10) : '',
      url: l.url ?? '',
      description: '',
      tags: '',
    });
    setShowForm(true);
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <div className="flex items-end justify-between border-b border-gray-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-4 h-4 text-blue-500" />
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Recruiter</p>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">채용 공고 관리</h1>
          <p className="text-xs text-gray-400 mt-1">등록한 공고는 관리자 검토 후 학생들에게 노출됩니다</p>
        </div>
        <button
          type="button"
          onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY_FORM); }}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#0f172a] text-white rounded-lg hover:bg-[#1e293b] transition-colors"
        >
          <Plus className="w-4 h-4" /> 공고 등록
        </button>
      </div>

      {/* 공고 등록/수정 폼 */}
      {showForm && (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 space-y-4">
          <p className="text-sm font-semibold text-gray-900">{editId ? '공고 수정' : '새 공고 등록'}</p>
          <div className="grid grid-cols-2 gap-4">
            {([
              ['company', '기업명 *', 'text', '(주)예시기업'],
              ['position', '직무/포지션 *', 'text', '백엔드 개발자'],
              ['location', '근무지', 'text', '서울 강남구'],
              ['career', '경력', 'text', '신입/경력/무관'],
              ['education', '학력', 'text', '학력무관'],
              ['employType', '고용형태', 'text', '정규직'],
              ['salary', '급여', 'text', '협의'],
              ['deadline', '마감일', 'date', ''],
              ['url', '공고 URL', 'text', 'https://...'],
              ['tags', '태그 (쉼표 구분)', 'text', 'React, TypeScript, Node.js'],
            ] as [keyof FormData, string, string, string][]).map(([key, label, type, placeholder]) => (
              <div key={key} className={key === 'url' || key === 'tags' ? 'col-span-2' : ''}>
                <label htmlFor={`form-${key}`} className="block text-xs text-gray-500 mb-1">{label}</label>
                <input
                  id={`form-${key}`}
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={e => setForm(v => ({ ...v, [key]: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
                />
              </div>
            ))}
            <div className="col-span-2">
              <label htmlFor="form-description" className="block text-xs text-gray-500 mb-1">공고 상세 내용</label>
              <textarea
                id="form-description"
                value={form.description}
                onChange={e => setForm(v => ({ ...v, description: e.target.value }))}
                rows={4}
                placeholder="주요 업무, 자격 요건, 우대 사항 등을 입력하세요"
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={() => { setShowForm(false); setEditId(null); setForm(EMPTY_FORM); }}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
            >
              취소
            </button>
            <button
              type="button"
              disabled={!form.company.trim() || !form.position.trim() || saveMutation.isPending}
              onClick={() => saveMutation.mutate(form)}
              className="px-4 py-2 text-sm font-medium bg-[#0f172a] text-white rounded-lg hover:bg-[#1e293b] disabled:opacity-50 transition-colors"
            >
              {editId ? '수정 완료' : '등록'}
            </button>
          </div>
        </div>
      )}

      {/* 공고 목록 */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3 animate-pulse">
            {[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded" />)}
          </div>
        ) : listings.length === 0 ? (
          <div className="py-20 text-center">
            <Building2 className="w-8 h-8 text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400">등록된 공고가 없습니다</p>
            <p className="text-xs text-gray-300 mt-1">위 버튼으로 첫 공고를 등록해보세요</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">공고</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">고용형태</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">마감일</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">상태</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {listings.map(l => (
                <tr key={l.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">{l.position}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{l.company}</p>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-500 hidden md:table-cell">{l.employType ?? '-'}</td>
                  <td className="px-4 py-4 text-xs text-gray-500">
                    {l.deadline ? new Date(l.deadline).toLocaleDateString('ko-KR') : '미정'}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                      l.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {l.isActive ? <><CheckCircle className="w-3 h-3" /> 활성</> : '비활성'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      {l.url && (
                        <a href={l.url} target="_blank" rel="noopener noreferrer"
                          aria-label="공고 원본 보기"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        type="button"
                        aria-label="공고 수정"
                        onClick={() => openEdit(l)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="공고 삭제"
                        onClick={() => setDeleteId(l.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={open => !open && setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="공고 삭제"
        description="이 공고를 삭제합니다. 되돌릴 수 없습니다."
      />
    </div>
  );
}
