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
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar
        userName={session.user.name}
        userEmail={session.user.email}
        userRole={session.user.role}
      />
      {/* 모바일: 상단 헤더 높이(56px) + 하단 탭바 높이(64px) 만큼 패딩 */}
      <main className="flex-1 overflow-y-auto bg-gray-50/50 pt-14 pb-16 md:pt-0 md:pb-0">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
