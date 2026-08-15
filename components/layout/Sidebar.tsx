'use client';

/**
 * 사이드바 네비게이션 컴포넌트
 *
 * 역할별 메뉴 분기:
 * - USER: 대시보드, 맞춤공고, 찜한공고, 자소서코칭, 지원현황, 캘린더, 로드맵, 알림, 공지, 프로필
 * - ADMIN: 위 메뉴 + 관리자 메뉴
 *
 * 반응형:
 * - 데스크탑(md 이상): 고정 사이드바
 * - 모바일: 상단 헤더 + 햄버거 버튼 → 드로어 오버레이
 *
 * 알림 배지: 60초마다 미읽은 알림 수와 최근 알림, 공지, 북마크 수를 자동 갱신
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
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
  ChevronRight,
} from 'lucide-react';

type Notification = {
  id: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
};

type Notice = {
  id: string;
  title: string;
  content: string;
  isPinned: number | boolean;
  createdAt: string;
};

type BookmarkedListing = { id: string };

const NOTICE_READ_KEY = 'jobfilter:notices:lastReadAt';

async function fetchNotifications(): Promise<Notification[]> {
  try {
    const res = await fetch('/api/notifications');
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data as Notification[]) ?? [];
  } catch {
    return [];
  }
}

async function fetchNotices(): Promise<Notice[]> {
  try {
    const res = await fetch('/api/notices');
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data as Notice[]) ?? [];
  } catch {
    return [];
  }
}

async function fetchBookmarks(): Promise<BookmarkedListing[]> {
  try {
    const res = await fetch('/api/listings/bookmark');
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data as BookmarkedListing[]) ?? [];
  } catch {
    return [];
  }
}

const userNavItems = [
  { href: '/dashboard',     label: '대시보드',    icon: LayoutDashboard },
  { href: '/listings',      label: '맞춤 공고', icon: ClipboardList, highlight: true },
  { href: '/bookmarks',     label: '찜한 공고',   icon: Bookmark },
  { href: '/cover-letter',  label: '자소서 코칭', icon: FileEdit, highlight: true },
  { href: '/jobs',          label: '내 지원 현황', icon: Briefcase },
  { href: '/calendar',      label: '지원 캘린더',  icon: CalendarDays },
  { href: '/roadmap',       label: '기술 로드맵',  icon: Map },
  { href: '/notifications', label: '알림',         icon: Bell },
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
      className={cn(
        'flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors',
        isActive
          ? highlight
            ? 'bg-blue-500/20 text-blue-200 font-medium'
            : 'bg-white/10 text-white font-medium'
          : highlight
            ? 'text-blue-300/60 hover:bg-blue-500/10 hover:text-blue-200'
            : 'text-white/50 hover:bg-white/5 hover:text-white/80'
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1">{label}</span>
      {highlight && (
        <span className="shrink-0 h-1.5 w-1.5 rounded-full bg-sidebar-primary" aria-hidden="true" />
      )}
      {badge != null && badge > 0 && (
        <span className="shrink-0 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-violet-500 text-white text-xs font-bold px-1">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </Link>
  );
}

function NotificationNavItem({
  isActive,
  onClose,
  unreadCount,
  recent,
}: {
  isActive: boolean;
  onClose?: () => void;
  unreadCount: number;
  recent: Notification[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'w-full flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors',
          isActive
            ? 'bg-white/10 text-white font-medium'
            : 'text-white/50 hover:bg-white/5 hover:text-white/80'
        )}
      >
        <Bell className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left">알림</span>
        {unreadCount > 0 && (
          <span className="shrink-0 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-violet-500 text-white text-xs font-bold px-1">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
        <ChevronRight
          className={cn(
            'h-4 w-4 shrink-0 text-white/40 transition-transform',
            open && 'rotate-90'
          )}
        />
      </button>

      {open && (
        <div
          className="mt-1 rounded-lg border border-white/10 bg-white/5 px-2 py-2 space-y-1"
        >
          {recent.length === 0 ? (
            <p className="px-2 py-2 text-xs text-white/50 text-center">
              최근 알림이 없습니다
            </p>
          ) : (
            <>
              {recent.map((n) => (
                <Link
                  key={n.id}
                  href="/notifications"
                  onClick={() => { setOpen(false); onClose?.(); }}
                  className="block rounded px-2 py-1.5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <span
                      className={cn(
                        'mt-1.5 h-1.5 w-1.5 rounded-full shrink-0',
                        n.isRead ? 'bg-white/20' : 'bg-violet-400'
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">{n.title}</p>
                      <p className="text-[10px] text-white/50 truncate mt-0.5">{n.body}</p>
                      <p className="text-[10px] text-white/40 mt-0.5 tabular-nums">
                        {new Date(n.createdAt).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
              <Link
                href="/notifications"
                onClick={() => { setOpen(false); onClose?.(); }}
                className="block text-center text-xs text-white/70 hover:text-white py-1.5 transition-colors"
              >
                전체 보기 →
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function SidebarContent({
  pathname, isAdmin, userName, userEmail, onClose,
  unreadCount, recentNotifications, notices, bookmarkCount,
}: {
  pathname: string; isAdmin: boolean;
  userName?: string | null; userEmail?: string | null;
  onClose?: () => void;
  unreadCount: number;
  recentNotifications: Notification[];
  notices: Notice[];
  bookmarkCount: number;
}) {
  const [lastReadNoticeAt, setLastReadNoticeAt] = useState<number>(0);

  useEffect(() => {
    setLastReadNoticeAt(Number(localStorage.getItem(NOTICE_READ_KEY) || '0'));
  }, []);

  const noticeUnreadCount = notices.filter(
    (n) => new Date(n.createdAt).getTime() > lastReadNoticeAt
  ).length;

  const markNoticesRead = () => {
    const now = String(Date.now());
    localStorage.setItem(NOTICE_READ_KEY, now);
    setLastReadNoticeAt(Number(now));
  };

  return (
    <aside className="flex h-full w-56 flex-col bg-sidebar text-white">
      {/* 로고 */}
      <div className="flex h-14 items-center justify-between px-5 border-b border-white/10">
        <Link href="/" onClick={onClose} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
            <span className="text-xs font-black text-white tracking-tight">JF</span>
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
            <p className="text-xs font-semibold text-blue-300 uppercase tracking-widest mb-1">핵심 기능</p>
            <p className="text-[11px] text-blue-200/70 leading-relaxed">맞춤 공고 확인 & 자소서 코칭</p>
          </div>
        </div>

        {/* 일반 메뉴 */}
        <nav className="px-3 py-2 space-y-0.5">
          {userNavItems.map(({ href, label, icon, highlight }) => {
            const isActive = pathname === href;
            const isNotice = href === '/notices';

            if (href === '/notifications') {
              return (
                <NotificationNavItem
                  key={href}
                  isActive={isActive}
                  onClose={onClose}
                  unreadCount={unreadCount}
                  recent={recentNotifications.slice(0, 5)}
                />
              );
            }

            return (
              <NavLink
                key={href}
                href={href}
                label={label}
                icon={icon}
                highlight={highlight}
                isActive={isActive}
                onClick={() => {
                  if (isNotice) markNoticesRead();
                  onClose?.();
                }}
                badge={
                  href === '/bookmarks'
                    ? bookmarkCount > 0
                      ? bookmarkCount
                      : undefined
                    : isNotice
                      ? noticeUnreadCount > 0
                        ? noticeUnreadCount
                        : undefined
                      : undefined
                }
              />
            );
          })}
        </nav>

        {/* 어드민 메뉴 */}
        {isAdmin && (
          <div className="px-3 pb-4">
            <div className="border-t border-white/10 pt-4">
              <p className="px-3 mb-2 text-xs font-semibold text-white/30 uppercase tracking-widest">
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

      </div>

      {/* 하단 유저 정보 */}
      <div className="border-t border-white/10 px-3 py-4 shrink-0">
        <div className="mb-3 px-3">
          {userName && (
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-medium text-white truncate">{userName}</p>
                {isAdmin && (
                  <span className="shrink-0 text-xs font-semibold bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                    Admin
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications-unread'],
    queryFn: fetchNotifications,
    refetchInterval: 60_000,
  });

  const { data: notices = [] } = useQuery({
    queryKey: ['notices', 'sidebar'],
    queryFn: fetchNotices,
    refetchInterval: 60_000,
  });

  const { data: bookmarks = [] } = useQuery({
    queryKey: ['bookmarks', 'count'],
    queryFn: fetchBookmarks,
    refetchInterval: 60_000,
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const recentNotifications = notifications.slice(0, 5);
  const bookmarkCount = bookmarks.length;

  return (
    <>
      {/* ── 데스크탑: 고정 사이드바 ── */}
      <div className="hidden md:flex h-full">
        <SidebarContent
          pathname={pathname} isAdmin={isAdmin}
          userName={userName} userEmail={userEmail}
          unreadCount={unreadCount}
          recentNotifications={recentNotifications}
          notices={notices}
          bookmarkCount={bookmarkCount}
        />
      </div>

      {/* ── 모바일: 상단 헤더 ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between px-4 bg-sidebar border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
            <span className="text-xs font-black text-white tracking-tight">JF</span>
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
              pathname={pathname} isAdmin={isAdmin}
              userName={userName} userEmail={userEmail}
              onClose={() => setMobileOpen(false)}
              unreadCount={unreadCount}
              recentNotifications={recentNotifications}
              notices={notices}
              bookmarkCount={bookmarkCount}
            />
          </div>
        </div>
      )}
    </>
  );
}
