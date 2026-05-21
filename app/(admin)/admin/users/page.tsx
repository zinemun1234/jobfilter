'use client';

/**
 * 관리자 사용자 관리 페이지
 *
 * - 전체 사용자 목록 (이름/이메일/기업명 검색)
 * - 역할 변경 (USER / ADMIN / RECRUITER) — select 드롭다운
 * - RECRUITER 승인 대기 배너 — 승인/거절 처리
 * - 개별 알림 전송 모달
 * - 사용자 삭제 (모든 데이터 cascade 삭제)
 * - 활동 통계 표시 (공고수, 포트폴리오수, 답변수)
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Trash2, ChevronRight, Search, Bell, Building2, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';
import Link from 'next/link';

type AdminUser = {
  id: string;
  email: string;
  name: string | null;
  major: string | null;
  targetJob: string | null;
  role: string;
  companyName: string | null;
  companyDesc: string | null;
  isApproved: boolean;
  createdAt: string;
  _count: { jobPostings: number; portfolios: number; roadmapItems: number; interviewAnswers: number };
};

async function fetchUsers(): Promise<AdminUser[]> {
  const res = await fetch('/api/admin/users');
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

export default function AdminUsersPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [notifyUser, setNotifyUser] = useState<AdminUser | null>(null);
  const [notifyForm, setNotifyForm] = useState({ title: '', body: '' });

  const { data: users = [], isLoading } = useQuery({ queryKey: ['admin-users'], queryFn: fetchUsers });

  const roleMutation = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error ?? 'Failed'); }
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-users'] }); toast.success('권한이 변경되었습니다'); },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error ?? 'Failed'); }
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-users'] }); toast.success('사용자가 삭제되었습니다'); setDeleteId(null); },
    onError: (e: Error) => toast.error(e.message),
  });

  const notifyMutation = useMutation({
    mutationFn: async ({ id, title, body }: { id: string; title: string; body: string }) => {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body }),
      });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => { toast.success('알림을 전송했습니다'); setNotifyUser(null); setNotifyForm({ title: '', body: '' }); },
    onError: () => toast.error('알림 전송에 실패했습니다'),
  });

  const approveMutation = useMutation({
    mutationFn: async ({ id, isApproved }: { id: string; isApproved: boolean }) => {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved }),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error ?? 'Failed'); }
    },
    onSuccess: (_, { isApproved }) => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success(isApproved ? 'RECRUITER 승인 완료' : 'RECRUITER 승인 취소');
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const filtered = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
    (u.companyName ?? '').toLowerCase().includes(search.toLowerCase())
  );

  const pendingRecruiters = users.filter(u => u.role === 'RECRUITER' && !u.isApproved);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <div className="flex items-end justify-between border-b border-gray-200 pb-5">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Admin</p>
          <h1 className="text-xl font-semibold text-gray-900">사용자 관리</h1>
        </div>
        <span className="text-sm text-gray-400">{users.length}명</span>
      </div>

      {/* RECRUITER 승인 대기 배너 */}
      {pendingRecruiters.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-4 h-4 text-amber-600" />
            <p className="text-sm font-medium text-amber-800">RECRUITER 승인 대기 {pendingRecruiters.length}건</p>
          </div>
          <div className="space-y-2">
            {pendingRecruiters.map(u => (
              <div key={u.id} className="flex items-center justify-between bg-white rounded-lg px-4 py-2.5 border border-amber-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">{u.companyName ?? '(기업명 없음)'}</p>
                  <p className="text-xs text-gray-400">{u.email}</p>
                  {u.companyDesc && <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{u.companyDesc}</p>}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => approveMutation.mutate({ id: u.id, isApproved: true })}
                    disabled={approveMutation.isPending}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> 승인
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteId(u.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" /> 거절
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="이름, 이메일, 기업명 검색"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 focus:border-[#0f172a]"
        />
      </div>

      <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3 animate-pulse">
            {[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-gray-100 rounded" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">사용자가 없습니다</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">사용자</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">활동</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">권한</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">가입일</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {u.role === 'RECRUITER' && (
                        <Building2 className={`w-3.5 h-3.5 shrink-0 ${u.isApproved ? 'text-emerald-500' : 'text-amber-400'}`} />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{u.companyName ?? u.name ?? '(이름 없음)'}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="flex gap-3 text-xs text-gray-500">
                      <span>공고 {u._count.jobPostings}</span>
                      <span>포트폴리오 {u._count.portfolios}</span>
                      <span>답변 {u._count.interviewAnswers}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <select
                        value={u.role}
                        onChange={e => roleMutation.mutate({ id: u.id, role: e.target.value })}
                        aria-label="사용자 권한"
                        className={`text-xs font-medium rounded-full px-2.5 py-1 border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                          u.role === 'ADMIN' ? 'bg-red-50 text-red-600 focus:ring-red-300'
                          : u.role === 'RECRUITER' ? 'bg-blue-50 text-blue-600 focus:ring-blue-300'
                          : 'bg-gray-100 text-gray-600 focus:ring-gray-300'
                        }`}
                      >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="RECRUITER">RECRUITER</option>
                      </select>
                      {u.role === 'RECRUITER' && (
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full w-fit ${
                          u.isApproved ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {u.isApproved ? '승인됨' : '승인 대기'}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-400 hidden sm:table-cell tabular-nums">
                    {new Date(u.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 justify-end">
                      {u.role === 'RECRUITER' && !u.isApproved && (
                        <button
                          type="button"
                          aria-label="RECRUITER 승인"
                          onClick={() => approveMutation.mutate({ id: u.id, isApproved: true })}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        aria-label="알림 보내기"
                        onClick={() => setNotifyUser(u)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <Bell className="w-4 h-4" />
                      </button>
                      <Link
                        href={`/admin/users/${u.id}`}
                        aria-label="사용자 상세 보기"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        aria-label="사용자 삭제"
                        onClick={() => setDeleteId(u.id)}
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
        title="사용자 삭제"
        description="이 사용자와 모든 데이터를 삭제합니다. 되돌릴 수 없습니다."
      />

      {notifyUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 space-y-4">
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">알림 전송</p>
              <p className="text-sm font-medium text-gray-900">{notifyUser.companyName ?? notifyUser.name ?? notifyUser.email}</p>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">제목</label>
              <input
                type="text"
                value={notifyForm.title}
                onChange={e => setNotifyForm(v => ({ ...v, title: e.target.value }))}
                placeholder="알림 제목"
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">내용</label>
              <textarea
                value={notifyForm.body}
                onChange={e => setNotifyForm(v => ({ ...v, body: e.target.value }))}
                rows={3}
                placeholder="알림 내용"
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
              />
            </div>
            <div className="flex gap-2 justify-end pt-1">
              <button
                type="button"
                onClick={() => { setNotifyUser(null); setNotifyForm({ title: '', body: '' }); }}
                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
              >
                취소
              </button>
              <button
                type="button"
                disabled={!notifyForm.title.trim() || !notifyForm.body.trim() || notifyMutation.isPending}
                onClick={() => notifyMutation.mutate({ id: notifyUser.id, ...notifyForm })}
                className="px-4 py-2 text-sm font-medium bg-[#0f172a] text-white rounded-lg hover:bg-[#1e293b] disabled:opacity-50 transition-colors"
              >
                전송
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
