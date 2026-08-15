'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Bell, Megaphone, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import EmptyState from '@/components/ui/EmptyState';
import SkeletonList from '@/components/ui/SkeletonList';

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

type Tab = 'notification' | 'notice';

async function fetchNotifications(): Promise<Notification[]> {
  const res = await fetch('/api/notifications');
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

async function fetchNotices(): Promise<Notice[]> {
  const res = await fetch('/api/notices');
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

export default function RecentAlerts() {
  const [tab, setTab] = useState<Tab>('notification');

  const { data: notifications = [], isLoading: loadingNotifications } = useQuery({
    queryKey: ['notifications', 'recent'],
    queryFn: fetchNotifications,
    refetchInterval: 60_000,
  });

  const { data: notices = [], isLoading: loadingNotices } = useQuery({
    queryKey: ['notices', 'recent'],
    queryFn: fetchNotices,
    refetchInterval: 60_000,
  });

  const isLoading = tab === 'notification' ? loadingNotifications : loadingNotices;
  const items = tab === 'notification'
    ? notifications.slice(0, 5)
    : notices.slice(0, 5);

  return (
    <section className="rounded-3xl border border-border bg-card shadow-lg p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            {tab === 'notification' ? (
              <Bell className="w-5 h-5 text-primary" />
            ) : (
              <Megaphone className="w-5 h-5 text-primary" />
            )}
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Updates</p>
            <h2 className="text-lg font-semibold text-foreground">최근 알림 / 공지</h2>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setTab('notification')}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
              tab === 'notification'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Bell className="w-3.5 h-3.5" /> 알림
          </button>
          <button
            type="button"
            onClick={() => setTab('notice')}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
              tab === 'notice'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Megaphone className="w-3.5 h-3.5" /> 공지
          </button>
        </div>
      </div>

      {isLoading ? (
        <SkeletonList count={3} cardClassName="h-16 rounded-xl" />
      ) : items.length === 0 ? (
        <EmptyState
          icon={tab === 'notification' ? Bell : Megaphone}
          title={tab === 'notification' ? '최근 알림이 없습니다' : '공지사항이 없습니다'}
          description="새로운 소식이 들어오면 여기에 표시됩니다"
          className="py-12"
        />
      ) : (
        <div className="space-y-2">
          {items.map((item) => {
            const isNotice = 'content' in item;
            const title = isNotice ? item.title : item.title;
            const body = isNotice
              ? item.content.slice(0, 80) + (item.content.length > 80 ? '...' : '')
              : item.body;
            const href = isNotice ? '/notices' : '/notifications';
            const unread = !isNotice && !item.isRead;

            return (
              <Link
                key={item.id}
                href={href}
                className="group flex items-start gap-3 rounded-xl border border-border bg-background p-4 hover:border-primary/30 hover:bg-primary/5 transition-colors"
              >
                <span
                  className={cn(
                    'mt-1 h-2 w-2 rounded-full shrink-0',
                    unread ? 'bg-primary' : 'bg-muted'
                  )}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{title}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">{body}</p>
                  <p className="text-[11px] text-muted-foreground/70 mt-1.5 tabular-nums">
                    {new Date(item.createdAt).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors shrink-0" />
              </Link>
            );
          })}
          <Link
            href={tab === 'notification' ? '/notifications' : '/notices'}
            className="flex items-center justify-center gap-1 text-xs font-medium text-primary hover:text-primary/80 py-2 transition-colors"
          >
            {tab === 'notification' ? '알림 전체 보기' : '공지 전체 보기'}
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </section>
  );
}
