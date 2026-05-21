'use client';

/**
 * 관리자 채용공고 관리 페이지
 *
 * - 공고 목록 (검색, 활성/비활성 토글)
 * - 탭: 전체 / 구인자 등록 대기 (source='구인자 직접등록' && isActive=false)
 * - 공고 등록/수정 SlideOver (tags는 쉼표 구분 문자열 ↔ 배열 변환)
 * - 구인자 등록 공고 승인: isActive=true로 토글
 * - 엑셀 업로드 페이지 링크
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Plus, Trash2, Search, ExternalLink, Edit2, ToggleLeft, ToggleRight, Upload, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { SlideOver } from '@/components/ui/slide-over';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';
import { toast } from 'sonner';

type Listing = {
  id: string;
  company: string;
  position: string;
  location: string | null;
  career: string | null;
  education: string | null;
  employType: string | null;
  salary: string | null;
  deadline: string | null;
  url: string | null;
  description: string | null;
  tags: string | null;
  source: string | null;
  isActive: boolean;
  createdAt: string;
};

const emptyForm = {
  company: '', position: '', location: '', career: '',
  education: '', employType: '', salary: '', deadline: '',
  url: '', description: '', tags: '',
};

async function fetchListings(search: string): Promise<Listing[]> {
  const res = await fetch(`/api/admin/listings?search=${encodeURIComponent(search)}`);
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

export default function AdminListingsPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [slideOpen, setSlideOpen] = useState(false);
  const [editing, setEditing] = useState<Listing | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const [tab, setTab] = useState<'all' | 'pending'>('all');

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ['admin-listings', search],
    queryFn: () => fetchListings(search),
  });

  const pendingListings = listings.filter((l: Listing) => !l.isActive && l.source === '구인자 직접등록');
  const displayListings = tab === 'pending' ? pendingListings : listings;

  function openNew() {
    setEditing(null);
    setForm(emptyForm);
    setSlideOpen(true);
  }

  function openEdit(l: Listing) {
    setEditing(l);
    setForm({
      company: l.company,
      position: l.position,
      location: l.location ?? '',
      career: l.career ?? '',
      education: l.education ?? '',
      employType: l.employType ?? '',
      salary: l.salary ?? '',
      deadline: l.deadline ? new Date(l.deadline).toISOString().split('T')[0] : '',
      url: l.url ?? '',
      description: l.description ?? '',
      tags: (() => { try { return l.tags ? JSON.parse(l.tags).join(', ') : ''; } catch { return ''; } })(),
    });
    setSlideOpen(true);
  }

  const saveMutation = useMutation({
    mutationFn: async () => {
      const body = {
        ...form,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      };
      if (editing) {
        await fetch(`/api/admin/listings/${editing.id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
        });
      } else {
        await fetch('/api/admin/listings', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
        });
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-listings'] });
      toast.success(editing ? '공고가 수정되었습니다' : '공고가 등록되었습니다');
      setSlideOpen(false);
    },
    onError: () => toast.error('저장에 실패했습니다'),
  });

  const toggleMutation = useMutation({
    mutationFn: async (l: Listing) => {
      await fetch(`/api/admin/listings/${l.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...l, isActive: !l.isActive }),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-listings'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/admin/listings/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-listings'] });
      toast.success('공고가 삭제되었습니다');
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
          <h1 className="text-xl font-semibold text-gray-900">채용공고 관리</h1>
          <p className="text-xs text-gray-400 mt-1">등록된 공고는 유저들이 지원 목록에 추가할 수 있습니다</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/listings/upload"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Upload className="w-4 h-4" /> 엑셀 업로드
          </Link>
          <button
            type="button"
            onClick={openNew}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0f172a] px-3 py-2 text-sm font-medium text-white hover:bg-[#1e293b] transition-colors"
          >
            <Plus className="w-4 h-4" /> 공고 등록
          </button>
        </div>
      </div>

      <form onSubmit={e => { e.preventDefault(); setSearch(searchInput); }} className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="회사명 또는 직무 검색"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className="w-full pl-9 pr-20 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
        />
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-medium bg-[#0f172a] text-white rounded-md">검색</button>
      </form>

      {/* 탭 — 전체 / 구인자 등록 대기 */}
      <div className="flex gap-1 border-b border-gray-100">
        <button type="button" onClick={() => setTab('all')}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${tab === 'all' ? 'border-[#0f172a] text-[#0f172a]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
          전체 ({listings.length})
        </button>
        <button type="button" onClick={() => setTab('pending')}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${tab === 'pending' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
          구인자 등록 대기
          {pendingListings.length > 0 && (
            <span className="text-[10px] font-bold bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full">{pendingListings.length}</span>
          )}
        </button>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3 animate-pulse">{[...Array(4)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded" />)}</div>
        ) : listings.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-400 mb-3">등록된 공고가 없습니다</p>
            <button type="button" onClick={openNew} className="text-sm font-medium text-[#0f172a] hover:underline">첫 공고 등록하기</button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">회사 / 직무</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">조건</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">마감일</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">상태</th>
                <th className="px-4 py-3 sr-only">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {displayListings.map(l => {
                const tags: string[] = (() => { try { return l.tags ? (Array.isArray(JSON.parse(l.tags)) ? JSON.parse(l.tags) : []) : []; } catch { return []; } })();
                const deadline = l.deadline ? new Date(l.deadline) : null;
                const daysLeft = deadline ? Math.ceil((deadline.getTime() - Date.now()) / 86400000) : null;
                return (
                  <tr key={l.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-900">{l.company}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{l.position}</p>
                      {l.source === '구인자 직접등록' && (
                        <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-200 px-1.5 py-0.5 rounded-full mt-1 inline-block">구인자 등록</span>
                      )}
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {tags.slice(0, 3).map(t => (
                            <span key={t} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{t}</span>
                          ))}
                          {tags.length > 3 && <span className="text-[10px] text-gray-400">+{tags.length - 3}</span>}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <div className="space-y-0.5">
                        {l.career && <p className="text-xs text-gray-500">{l.career}</p>}
                        {l.employType && <p className="text-xs text-gray-400">{l.employType}</p>}
                        {l.location && <p className="text-xs text-gray-400">{l.location}</p>}
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      {deadline ? (
                        <span className={`text-xs tabular-nums ${daysLeft !== null && daysLeft <= 3 ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                          {deadline.toLocaleDateString('ko-KR')}
                          {daysLeft !== null && daysLeft >= 0 && <span className="ml-1 text-gray-400">D-{daysLeft}</span>}
                        </span>
                      ) : <span className="text-xs text-gray-300">-</span>}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => toggleMutation.mutate(l)}
                        className={`inline-flex items-center gap-1 text-xs font-medium rounded-full px-2.5 py-1 transition-colors ${l.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}
                      >
                        {l.isActive ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                        {l.isActive ? '활성' : '비활성'}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {/* 구인자 등록 공고 승인 버튼 */}
                        {l.source === '구인자 직접등록' && !l.isActive && (
                          <button type="button" onClick={() => toggleMutation.mutate(l)} aria-label="승인"
                            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200">
                            <CheckCircle className="w-3.5 h-3.5" /> 승인
                          </button>
                        )}
                        {l.url && (
                          <a href={l.url} target="_blank" rel="noopener noreferrer" aria-label="원본 링크"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button type="button" onClick={() => openEdit(l)} aria-label="수정"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button type="button" onClick={() => setDeleteId(l.id)} aria-label="삭제"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <SlideOver open={slideOpen} onClose={() => setSlideOpen(false)} title={editing ? '공고 수정' : '새 공고 등록'}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">회사명 *</label>
              <input value={form.company} onChange={f('company')} placeholder="예: 카카오" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">직무 *</label>
              <input value={form.position} onChange={f('position')} placeholder="예: 프론트엔드 개발자" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">근무지</label>
              <input value={form.location} onChange={f('location')} placeholder="예: 서울 강남구" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">경력</label>
              <select value={form.career} onChange={f('career')} aria-label="경력 선택" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 bg-white">
                <option value="">선택</option>
                <option value="신입">신입</option>
                <option value="경력">경력</option>
                <option value="신입/경력">신입/경력</option>
                <option value="무관">무관</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">고용형태</label>
              <select value={form.employType} onChange={f('employType')} aria-label="고용형태 선택" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 bg-white">
                <option value="">선택</option>
                <option value="정규직">정규직</option>
                <option value="계약직">계약직</option>
                <option value="인턴">인턴</option>
                <option value="프리랜서">프리랜서</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">학력</label>
              <select value={form.education} onChange={f('education')} aria-label="학력 선택" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 bg-white">
                <option value="">선택</option>
                <option value="학력무관">학력무관</option>
                <option value="고졸이상">고졸이상</option>
                <option value="대졸이상">대졸이상</option>
                <option value="석사이상">석사이상</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">급여</label>
              <input value={form.salary} onChange={f('salary')} placeholder="예: 4,000만원 이상" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">마감일</label>
              <input type="date" value={form.deadline} onChange={f('deadline')} aria-label="마감일 선택" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">원본 공고 URL</label>
            <input value={form.url} onChange={f('url')} placeholder="https://..." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">기술 태그 (쉼표로 구분)</label>
            <input value={form.tags} onChange={f('tags')} placeholder="예: React, TypeScript, Node.js" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">공고 상세 내용</label>
            <textarea value={form.description} onChange={f('description')} rows={5} placeholder="주요 업무, 자격 요건, 우대 사항 등..." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 resize-none" />
          </div>
          <button
            type="button"
            onClick={() => saveMutation.mutate()}
            disabled={!form.company || !form.position || saveMutation.isPending}
            className="w-full py-2.5 bg-[#0f172a] text-white text-sm font-medium rounded-lg hover:bg-[#1e293b] disabled:opacity-50 transition-colors"
          >
            {saveMutation.isPending ? '저장 중...' : editing ? '수정 완료' : '공고 등록'}
          </button>
        </div>
      </SlideOver>

      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={open => !open && setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="공고 삭제"
        description="이 공고를 삭제하시겠습니까?"
      />
    </div>
  );
}
