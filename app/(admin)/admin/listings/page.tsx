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
import { Plus, Trash2, Search, ExternalLink, Edit2, ToggleLeft, ToggleRight, Upload, CheckCircle, X, Tag, AlertCircle, ClipboardList, FileSpreadsheet } from 'lucide-react';
import Link from 'next/link';
import { SlideOver } from '@/components/ui/slide-over';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';
import EmptyState from '@/components/ui/EmptyState';
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
  rejectionReason: string | null;
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

  const { data: listings = [], isLoading, error, refetch } = useQuery({
    queryKey: ['admin-listings', search],
    queryFn: () => fetchListings(search),
  });

  const isRecruiterSource = (source: string | null) => source === '구인자 직접등록' || source === 'RECRUITER';
  const pendingListings = listings.filter((l: Listing) => !l.isActive && isRecruiterSource(l.source));
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
      const res = editing
        ? await fetch(`/api/admin/listings/${editing.id}`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
          })
        : await fetch('/api/admin/listings', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
          });
      if (!res.ok) throw new Error('Failed');
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
      const tags = l.tags ? (() => { try { return JSON.parse(l.tags); } catch { return []; } })() : [];
      const res = await fetch(`/api/admin/listings/${l.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...l, tags, isActive: !l.isActive, rejectionReason: l.rejectionReason }),
      });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-listings'] });
      toast.success('상태가 변경되었습니다');
    },
    onError: () => toast.error('상태 변경에 실패했습니다'),
  });

  const rejectMutation = useMutation({
    mutationFn: async (l: Listing) => {
      const reason = window.prompt(`[${l.company}] ${l.position} 공고 반려 사유를 입력하세요.`)?.trim();
      if (!reason) return;
      const tags = l.tags ? (() => { try { return JSON.parse(l.tags); } catch { return []; } })() : [];
      const res = await fetch(`/api/admin/listings/${l.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...l, tags, isActive: false, rejectionReason: reason }),
      });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-listings'] });
      toast.success('공고가 반려되었습니다');
    },
    onError: () => toast.error('반려에 실패했습니다'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/listings/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-listings'] });
      toast.success('공고가 삭제되었습니다');
      setDeleteId(null);
    },
    onError: () => toast.error('삭제에 실패했습니다'),
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
            href="/admin/listings/keywords"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Tag className="w-4 h-4" /> 키워드 관리
          </Link>
          <Link
            href="/admin/listings/upload"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Upload className="w-4 h-4" /> 엑셀 업로드
          </Link>
          <a
            href="/api/admin/listings/export"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" /> 공고 목록 엑셀 다운로드
          </a>
          <button
            type="button"
            onClick={openNew}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
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
          className="w-full pl-9 pr-20 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-medium bg-primary text-white rounded-md">검색</button>
      </form>

      {/* 탭 — 전체 / 구인자 등록 대기 */}
      <div className="flex gap-1 border-b border-gray-100">
        <button type="button" onClick={() => setTab('all')}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${tab === 'all' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
          전체 ({listings.length})
        </button>
        <button type="button" onClick={() => setTab('pending')}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${tab === 'pending' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
          구인자 등록 대기
          {pendingListings.length > 0 && (
            <span className="text-xs font-bold bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full">{pendingListings.length}</span>
          )}
        </button>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3 animate-pulse">{[...Array(4)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded" />)}</div>
        ) : error ? (
          <EmptyState
            icon={AlertCircle}
            title="공고 목록을 불러오지 못했습니다"
            description={error.message}
            action={{ label: '다시 시도', onClick: () => refetch() }}
          />
        ) : listings.length === 0 ? (
          <EmptyState
            icon={ClipboardList}
            title={search ? '검색 결과가 없습니다' : '등록된 공고가 없습니다'}
            description={search ? '다른 키워드로 검색해 보세요' : '첫 공고를 등록하면 목록이 표시됩니다'}
            action={search ? { label: '검색 초기화', onClick: () => setSearch('') } : { label: '첫 공고 등록하기', onClick: openNew }}
          />
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
                        <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-1.5 py-0.5 rounded-full mt-1 inline-block">구인자 등록</span>
                      )}
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {tags.slice(0, 3).map(t => (
                            <span key={t} className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{t}</span>
                          ))}
                          {tags.length > 3 && <span className="text-xs text-gray-400">+{tags.length - 3}</span>}
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
                        disabled={toggleMutation.isPending}
                        className={`inline-flex items-center gap-1 text-xs font-medium rounded-full px-2.5 py-1 transition-colors disabled:opacity-50 ${l.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}
                      >
                        {l.isActive ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                        {l.isActive ? '활성' : '비활성'}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {/* 구인자 등록 공고 승인/반려 버튼 */}
                        {isRecruiterSource(l.source) && !l.isActive && (
                          <>
                            <button type="button" onClick={() => toggleMutation.mutate(l)} aria-label="승인" disabled={toggleMutation.isPending}
                              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200 disabled:opacity-50">
                              <CheckCircle className="w-3.5 h-3.5" /> 승인
                            </button>
                            <button type="button" onClick={() => rejectMutation.mutate(l)} aria-label="반려" disabled={rejectMutation.isPending}
                              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors border border-red-200 disabled:opacity-50">
                              <X className="w-3.5 h-3.5" /> 반려
                            </button>
                          </>
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
                        <button type="button" onClick={() => setDeleteId(l.id)} aria-label="삭제" disabled={deleteMutation.isPending}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50">
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
              <input value={form.company} onChange={f('company')} placeholder="예: 카카오" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">직무 *</label>
              <input value={form.position} onChange={f('position')} placeholder="예: 프론트엔드 개발자" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">근무지</label>
              <input value={form.location} onChange={f('location')} placeholder="예: 서울 강남구" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">경력</label>
              <select value={form.career} onChange={f('career')} aria-label="경력 선택" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
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
              <select value={form.employType} onChange={f('employType')} aria-label="고용형태 선택" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                <option value="">선택</option>
                <option value="정규직">정규직</option>
                <option value="계약직">계약직</option>
                <option value="인턴">인턴</option>
                <option value="프리랜서">프리랜서</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">학력</label>
              <select value={form.education} onChange={f('education')} aria-label="학력 선택" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
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
              <input value={form.salary} onChange={f('salary')} placeholder="예: 4,000만원 이상" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">마감일</label>
              <input type="date" value={form.deadline} onChange={f('deadline')} aria-label="마감일 선택" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">원본 공고 URL</label>
            <input value={form.url} onChange={f('url')} placeholder="https://..." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">기술 태그 (쉼표로 구분)</label>
            <input value={form.tags} onChange={f('tags')} placeholder="예: React, TypeScript, Node.js" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">공고 상세 내용</label>
            <textarea value={form.description} onChange={f('description')} rows={5} placeholder="주요 업무, 자격 요건, 우대 사항 등..." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
          </div>
          <button
            type="button"
            onClick={() => saveMutation.mutate()}
            disabled={!form.company || !form.position || saveMutation.isPending}
            className="w-full py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
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
        isPending={deleteMutation.isPending}
      />
    </div>
  );
}
