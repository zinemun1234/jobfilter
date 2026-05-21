import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Bell, Pin } from 'lucide-react';

export default async function NoticesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect('/login');

  const notices = await prisma.notice.findMany({
    orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <Bell className="w-4 h-4 text-gray-400" />
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Notices</p>
        </div>
        <h1 className="text-xl font-semibold text-gray-900">공지사항</h1>
      </div>

      {notices.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white py-20 text-center shadow-sm">
          <p className="text-sm text-gray-400">등록된 공지사항이 없습니다</p>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm divide-y divide-gray-50">
          {notices.map((n) => (
            <div key={n.id} className="px-6 py-5">
              <div className="flex items-start gap-3">
                {n.isPinned && (
                  <Pin className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                    {n.isPinned && (
                      <span className="text-[10px] font-semibold bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded">고정</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{n.content}</p>
                  <p className="text-xs text-gray-400 mt-3">
                    {new Date(n.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
