import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session.user?.role === 'RECRUITER') redirect('/recruiter');
    if (session.user?.role === 'ADMIN') redirect('/admin');
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen bg-slate-950">
      {children}
    </main>
  );
}
