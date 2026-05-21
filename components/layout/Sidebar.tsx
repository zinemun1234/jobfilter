'use client';

/**
 * 사이드바 네비게이션 컴포넌트
 *
 * 역할별 메뉴 분기:
 * - USER: 대시보드, 맞춤공고, 찜한공고, 자소서코칭, 지원현황, 캘린더, 로드맵, 알림, 공지, 프로필
 * - ADMIN: 위 메뉴 + 관리자 메뉴 (통계, 공고관리, 사용자관리, 공지관리, 면접질문, 일괄작업)
 * - RECRUITER: 위 메뉴 + 공고 관리
 *
 * 반응형:
 * - 데스크탑(md 이상): 고정 사이드바
 * - 모바일: 상단 헤더 + 햄버거 버튼 → 드로어 오버레이
 *
 * 알림 배지: 60초마다 미읽은 알림 수 자동 갱신
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

async function fetchUnreadCount(): Promise<number> {
  try {
    const res = await fetch('/api/notifications');
    if (!res.ok) return 0;
    const data = await res.json();
    return (data.data as { isRead: boolean }[]).filter(n => !n.isRead).length;
  } catch { return 0; }
}
import {
  LayoutDashboard,
  Briefcase,
  User,
  LogOut,
  Shield,
  Users,
  Bell,
  ClipboardList,
  FileEdit,
  Upload,
  Map,
  Building2,
  Menu,
  X,
  BarChart2,
  MessageSquare,
  Bookmark,
  CalendarDays,
  Trophy,
} from 'lucide-react';

const userNavItems = [
  { href: '/dashboard',     label: '대시보드',    icon: LayoutDashboard },
  { href: '/listings',      label: '🔥 맞춤 공고', icon: ClipboardList, highlight: true },
  { href: '/bookmarks',     label: '찜한 공고',   icon: Bookmark },
  { href: '/cover-letter',  label: '✏️ 자소서 코칭', icon: FileEdit, highlight: true },
  { href: '/jobs',          label: '내 지원 현황', icon: Briefcase },
  { href: '/calendar',      label: '지원 캘린더',  icon: CalendarDays },
  { href: '/roadmap',       label: '기술 로드맵',  icon: Map },
  { href: '/notifications', label: '알림',         icon: Bell, badge: true },
  { href: '/notices',       label: '공지사항',     icon: Bell },
  { href: '/profile',       label: '프로필',       icon: User },
];

const adminNavItems = [
  { href: '/admin',                  label: '관리 대시보드',  icon: Shield,         exact: true },
  { href: '/admin/stats',            label: '취업 통계',      icon: BarChart2 },
  { href: '/admin/employment',       label: '취업 확정 관리', icon: Trophy },
  { href: '/admin/listings',         label: '공고 DB 관리',   icon: ClipboardList },
  { href: '/admin/listings/upload',  label: '엑셀 업로드',    icon: Upload },
  { href: '/admin/bulk-jobs',        label: '구인자 업로드',  icon: Building2 },
  { href: '/admin/users',            label: '사용자 관리',    icon: Users },
  { href: '/admin/notices',          label: '공지사항 관리',  icon: Bell },
  { href: '/admin/questions',        label: '면접 질문 관리', icon: MessageSquare },
];

const recruiterNavItems = [
  { href: '/recruiter', label: '공고 관리', icon: Building2, exact: true },
];

interface SidebarProps {
  userName?: string | null;
  userEmail?: string | null;
  userRole?: string | null;
}

function NavLink({
  href, label, icon: Icon, highlight, isActive, onClick, badge,
}: {
  href: string; label: string; icon: React.ElementType;
  highlight?: boolean; isActive: boolean; onClick?: () => void; badge?: number;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors ${
        isActive
          ? highlight
            ? 'bg-blue-500/20 text-blue-200 font-medium'
            : 'bg-white/10 text-white font-medium'
          : highlight
            ? 'text-blue-300/60 hover:bg-blue-500/10 hover:text-blue-200'
            : 'text-white/50 hover:bg-white/5 hover:text-white/80'
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1">{label}</span>
      {badge != null && badge > 0 && (
        <span className="shrink-0 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-violet-500 text-white text-[10px] font-bold px-1">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </Link>
  );
}

function SidebarContent({
  pathname, isAdmin, isRecruiter, userName, userEmail, onClose, unreadCount,
}: {
  pathname: string; isAdmin: boolean; isRecruiter: boolean;
  userName?: string | null; userEmail?: string | null;
  onClose?: () => void; unreadCount?: number;
}) {
  return (
    <aside className="flex h-full w-56 flex-col bg-[#0f172a] text-white">
      {/* 로고 */}
      <div className="flex h-14 items-center justify-between px-5 border-b border-white/10">
        <Link href="/" onClick={onClose} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-black text-white tracking-tight">JF</span>
          </div>
          <span className="text-sm font-bold text-white tracking-tight">Job Filter</span>
        </Link>
        {onClose && (
          <button onClick={onClose} aria-label="메뉴 닫기" className="text-white/40 hover:text-white md:hidden">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* 핵심 기능 안내 */}
        <div className="px-4 pt-4 pb-2">
          <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-2.5">
            <p className="text-[10px] font-semibold text-blue-300 uppercase tracking-widest mb-1">핵심 기능</p>
            <p className="text-[11px] text-blue-200/70 leading-relaxed">맞춤 공고 확인 & 자소서 코칭</p>
          </div>
        </div>

        {/* 일반 메뉴 */}
        <nav className="px-3 py-2 space-y-0.5">
          {userNavItems.map(({ href, label, icon, highlight }) => (
            <NavLink
              key={href} href={href} label={label} icon={icon}
              highlight={highlight} isActive={pathname === href}
              onClick={onClose}
              badge={href === '/notifications' ? unreadCount : undefined}
            />
          ))}
        </nav>

        {/* 어드민 메뉴 */}
        {isAdmin && (
          <div className="px-3 pb-4">
            <div className="border-t border-white/10 pt-4">
              <p className="px-3 mb-2 text-[10px] font-semibold text-white/30 uppercase tracking-widest">
                관리자 (연구원)
              </p>
              <div className="space-y-0.5">
                {adminNavItems.map(({ href, label, icon: Icon, exact }) => {
                  const isActive = exact
                    ? pathname === href
                    : pathname.startsWith(href) &&
                      !adminNavItems.some(
                        other => other.href !== href &&
                          other.href.startsWith(href) &&
                          pathname.startsWith(other.href)
                      );
                  return (
                    <Link
                      key={href} href={href} onClick={onClose}
                      className={`flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? 'bg-red-500/15 text-red-300 font-medium'
                          : 'text-red-400/50 hover:bg-red-500/10 hover:text-red-300'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* RECRUITER 메뉴 */}
        {isRecruiter && (
          <div className="px-3 pb-4">
            <div className="border-t border-white/10 pt-4">
              <p className="px-3 mb-2 text-[10px] font-semibold text-white/30 uppercase tracking-widest">
                기업 (RECRUITER)
              </p>
              <div className="space-y-0.5">
                {recruiterNavItems.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href} href={href} onClick={onClose}
                    className={`flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors ${
                      pathname === href
                        ? 'bg-blue-500/15 text-blue-300 font-medium'
                        : 'text-blue-400/50 hover:bg-blue-500/10 hover:text-blue-300'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 하단 유저 정보 */}
      <div className="border-t border-white/10 px-3 py-4 shrink-0">
        <div className="mb-3 px-3">
          {userName && (
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-medium text-white truncate">{userName}</p>
                {isAdmin && (
                  <span className="shrink-0 text-[9px] font-semibold bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                    Admin
                  </span>
                )}
                {isRecruiter && (
                  <span className="shrink-0 text-[9px] font-semibold bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                    Recruiter
                  </span>
                )}
              </div>
            )}
          {userEmail && <p className="text-[11px] text-white/40 truncate mt-0.5">{userEmail}</p>}
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex w-full items-center gap-3 rounded px-3 py-2 text-sm text-white/50 hover:bg-white/5 hover:text-white/80 transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          로그아웃
        </button>
      </div>
    </aside>
  );
}

export default function Sidebar({ userName, userEmail, userRole }: SidebarProps) {
  const pathname = usePathname();
  const isAdmin = userRole === 'ADMIN';
  const isRecruiter = userRole === 'RECRUITER';
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ['notifications-unread'],
    queryFn: fetchUnreadCount,
    refetchInterval: 60_000,
  });

  return (
    <>
      {/* ── 데스크탑: 고정 사이드바 ── */}
      <div className="hidden md:flex h-full">
        <SidebarContent
          pathname={pathname} isAdmin={isAdmin} isRecruiter={isRecruiter}
          userName={userName} userEmail={userEmail}
          unreadCount={unreadCount}
        />
      </div>

      {/* ── 모바일: 상단 헤더 ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between px-4 bg-[#0f172a] border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-black text-white tracking-tight">JF</span>
          </div>
          <span className="text-sm font-bold text-white tracking-tight">Job Filter</span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="text-white/60 hover:text-white p-1"
          aria-label="메뉴 열기"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* ── 모바일: 드로어 오버레이 ── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 h-full">
            <SidebarContent
              pathname={pathname} isAdmin={isAdmin} isRecruiter={isRecruiter}
              userName={userName} userEmail={userEmail}
              onClose={() => setMobileOpen(false)}
              unreadCount={unreadCount}
            />
          </div>
        </div>
      )}
    </>
  );
}
