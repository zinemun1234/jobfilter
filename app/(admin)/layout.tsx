import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== 'ADMIN') redirect('/dashboard');

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100/80">
      <Sidebar
        userName={session.user.name}
        userEmail={session.user.email}
        userRole={session.user.role}
      />
      <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_rgba(254,226,226,0.55),_transparent_30rem),linear-gradient(180deg,_#f8fafc_0%,_#f1f5f9_100%)]">
        {children}
      </main>
    </div>
  );
}
