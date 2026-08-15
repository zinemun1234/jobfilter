'use client';

/**
 * 관리자 사용자 관리 페이지
 *
 * - 전체 사용자 목록 (이름/이메일 검색)
 * - 역할 변경 (USER / ADMIN) — select 드롭다운
 * - 개별 알림 전송 모달
 * - 사용자 삭제 (모든 데이터 cascade 삭제)
 * - 활동 통계 표시 (공고수, 포트폴리오수, 답변수)
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Trash2, ChevronRight, Search, Bell, AlertCircle, Users } from 'lucide-react';
import { toast } from 'sonner';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';
import EmptyState from '@/components/ui/EmptyState';
import Link from 'next/link';

type AdminUser = {
  id: string;
  email: string;
  name: string | null;
  major: string | null;
  targetJob: string | null;
  role: string;
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

  const { data: users = [], isLoading, error, refetch } = useQuery({ queryKey: ['admin-users'], queryFn: fetchUsers });

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

  const filtered = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.name ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <div className="flex items-end justify-between border-b border-gray-200 pb-5">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Admin</p>
          <h1 className="text-xl font-semibold text-gray-900">사용자 관리</h1>
        </div>
        <span className="text-sm text-gray-400">{users.length}명</span>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="이름, 이메일 검색"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3 animate-pulse">
            {[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-gray-100 rounded" />)}
          </div>
        ) : error ? (
          <EmptyState
            icon={AlertCircle}
            title="사용자 목록을 불러오지 못했습니다"
            description={error.message}
            action={{ label: '다시 시도', onClick: () => refetch() }}
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Users}
            title={search ? '검색 결과가 없습니다' : '사용자가 없습니다'}
            description={search ? '다른 키워드로 검색해 보세요' : '가입한 학생이 아직 없습니다'}
            action={search ? { label: '검색 초기화', onClick: () => setSearch('') } : undefined}
          />
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
                    <div>
                      <p className="font-medium text-gray-900">{u.name ?? '(이름 없음)'}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{u.email}</p>
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
                    <select
                      value={u.role}
                      onChange={e => roleMutation.mutate({ id: u.id, role: e.target.value })}
                      disabled={roleMutation.isPending}
                      aria-label="사용자 권한"
                      className={`text-xs font-medium rounded-full px-2.5 py-1 border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed ${
                        u.role === 'ADMIN'
                          ? 'bg-red-50 text-red-600 focus:ring-red-300'
                          : 'bg-gray-100 text-gray-600 focus:ring-gray-300'
                      }`}
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-400 hidden sm:table-cell tabular-nums">
                    {new Date(u.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 justify-end">
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
                        disabled={deleteMutation.isPending}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
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
        isPending={deleteMutation.isPending}
      />

      {notifyUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 space-y-4">
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">알림 전송</p>
              <p className="text-sm font-medium text-gray-900">{notifyUser.name ?? notifyUser.email}</p>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">제목</label>
              <input
                type="text"
                value={notifyForm.title}
                onChange={e => setNotifyForm(v => ({ ...v, title: e.target.value }))}
                placeholder="알림 제목"
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">내용</label>
              <textarea
                value={notifyForm.body}
                onChange={e => setNotifyForm(v => ({ ...v, body: e.target.value }))}
                rows={3}
                placeholder="알림 내용"
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
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
