'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ClipboardList, FileEdit, Briefcase, User } from 'lucide-react';

const tabs = [
  { href: '/dashboard',    label: '홈',      icon: LayoutDashboard },
  { href: '/listings',     label: '공고',    icon: ClipboardList },
  { href: '/cover-letter', label: '자소서',  icon: FileEdit },
  { href: '/jobs',         label: '지원현황', icon: Briefcase },
  { href: '/profile',      label: '프로필',  icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0f172a] border-t border-white/10">
      <div className="flex items-stretch h-16">
        {tabs.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-1 flex-col items-center justify-center gap-1 text-[10px] transition-colors ${
                isActive
                  ? 'text-blue-400'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
