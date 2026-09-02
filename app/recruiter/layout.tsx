import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Building2, ClipboardList, Settings } from 'lucide-react';

const RECRUITER_NAV = [
  { href: '/recruiter', icon: Building2, label: '대시보드' },
  { href: '/recruiter/listings', icon: ClipboardList, label: '공고 관리' },
  { href: '/recruiter/profile', icon: Settings, label: '기업 정보' },
];

export default async function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }
  if (session.user.role !== 'RECRUITER') {
    redirect('/dashboard');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { isApproved: true, companyName: true },
  });

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100/80">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="flex h-14 items-center gap-2 border-b border-slate-100 px-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <span className="text-xs font-black text-white">JF</span>
          </div>
          <span className="text-sm font-semibold text-slate-800">JobFilter 기업회원</span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {RECRUITER_NAV.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-primary"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-slate-100 p-4">
          <p className="text-xs text-slate-500">{user?.companyName ?? session.user.name}</p>
          {user?.isApproved ? (
            <span className="mt-1 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">승인 완료</span>
          ) : (
            <span className="mt-1 inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600">승인 대기</span>
          )}
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
