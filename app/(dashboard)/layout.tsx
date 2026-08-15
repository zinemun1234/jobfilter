import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Sidebar from '@/components/layout/Sidebar';
import BottomNav from '@/components/layout/BottomNav';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100/80">
      <Sidebar
        userName={session.user.name}
        userEmail={session.user.email}
        userRole={session.user.role}
      />
      {/* 모바일: 상단 헤더 높이(56px) + 하단 탭바 높이(64px) 만큼 패딩 */}
      <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_rgba(219,234,254,0.7),_transparent_32rem),linear-gradient(180deg,_#f8fafc_0%,_#f1f5f9_100%)] pt-14 pb-16 md:pt-0 md:pb-0">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
