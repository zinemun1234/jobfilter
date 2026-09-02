'use client';

import { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Bell, CheckCheck, Megaphone, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getNotificationLink } from '@/lib/notifications';
import EmptyState from '@/components/ui/EmptyState';
import SkeletonList from '@/components/ui/SkeletonList';

type Notification = {
  id: string;
  title: string;
  body: string;
  type: string;
  referenceId: string | null;
  actionUrl: string | null;
  isRead: boolean;
  createdAt: string;
};

type TabKey = 'all' | 'deadline' | 'interview' | 'followup' | 'notice' | 'recruiter' | 'listing';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'deadline', label: '마감' },
  { key: 'interview', label: '면접' },
  { key: 'followup', label: '팔로업' },
  { key: 'notice', label: '공지' },
  { key: 'recruiter', label: '리크루터' },
  { key: 'listing', label: '공고' },
];

const TAB_PREDICATES: Record<TabKey, (n: Notification) => boolean> = {
  all: () => true,
  deadline: (n) =>
    n.type === 'DEADLINE' || n.title.includes('마감') || n.body.includes('마감'),
  interview: (n) =>
    n.type === 'INTERVIEW' || n.title.includes('면접') || n.body.includes('면접'),
  followup: (n) =>
    n.type === 'FOLLOWUP' || n.title.includes('팔로업') || n.body.includes('팔로업'),
  notice: (n) =>
    n.type === 'NOTICE' ||
    n.title.includes('공지') ||
    n.body.includes('공지') ||
    n.title.includes('공지사항') ||
    n.body.includes('공지사항'),
  recruiter: (n) =>
    n.type.includes('RECRUITER') || n.body.includes('리크루터'),
  listing: (n) =>
    n.type.includes('LISTING') || n.type.includes('APPLICANT'),
};

async function fetchNotifications(): Promise<Notification[]> {
  const syncRes = await fetch('/api/notifications/sync', { method: 'POST' });
  if (!syncRes.ok) throw new Error('Failed to sync notifications');
  const res = await fetch('/api/notifications');
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

export default function NotificationsPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [unreadOnly, setUnreadOnly] = useState(false);

  const { data: notifications = [], isLoading, error, refetch } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
  });

  const markAllRead = useMutation({
    mutationFn: () => fetch('/api/notifications', { method: 'PATCH' }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications'] });
      qc.invalidateQueries({ queryKey: ['notifications-unread'] });
      toast.success('모두 읽음 처리했습니다');
    },
  });

  const markOneRead = useMutation({
    mutationFn: (id: string) =>
      fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications'] });
      qc.invalidateQueries({ queryKey: ['notifications-unread'] });
    },
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filtered = useMemo(
    () =>
      notifications
        .filter(TAB_PREDICATES[activeTab])
        .filter((n) => !unreadOnly || !n.isRead),
    [notifications, activeTab, unreadOnly]
  );

  const handleMarkAllRead = () => {
    if (confirm('모든 알림을 읽음 처리하시겠습니까?')) {
      markAllRead.mutate();
    }
  };

  const handleCardClick = (n: Notification) => {
    if (markOneRead.isPending) return;

    markOneRead.mutate(n.id);

    const link = getNotificationLink(n) ?? n.actionUrl;
    if (link) {
      router.push(link);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
      <div className="flex items-end justify-between border-b border-border pb-6">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Notifications
          </p>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">알림</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-primary mt-1.5">읽지 않은 알림 {unreadCount}개</p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleMarkAllRead}
            disabled={markAllRead.isPending}
          >
            <CheckCheck className="w-4 h-4 mr-1.5" />
            모두 읽음
          </Button>
        )}
      </div>

      {/* 탭 + 안읽음 필터 */}
      <div className="flex flex-wrap items-center gap-2">
        {TABS.map((tab) => {
          const count = notifications.filter(TAB_PREDICATES[tab.key]).length;
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {tab.label}
              {count > 0 && (
                <span
                  className={cn(
                    'min-w-[18px] h-[18px] inline-flex items-center justify-center rounded-full px-1 text-[10px] font-bold',
                    active ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-background text-foreground'
                  )}
                >
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setUnreadOnly((v) => !v)}
          aria-pressed={unreadOnly}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors border',
            unreadOnly
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-muted text-muted-foreground border-transparent hover:bg-muted/80'
          )}
        >
          <Bell className="w-3.5 h-3.5" />
          안 읽음
          {unreadCount > 0 && (
            <span
              className={cn(
                'min-w-[18px] h-[18px] inline-flex items-center justify-center rounded-full px-1 text-[10px] font-bold',
                unreadOnly ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-background text-foreground'
              )}
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      </div>

      {isLoading ? (
        <SkeletonList count={4} cardClassName="h-20" />
      ) : error ? (
        <EmptyState
          icon={AlertCircle}
          title="알림을 불러오지 못했습니다"
          description={error.message}
          action={{ label: '다시 시도', onClick: () => refetch() }}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={activeTab === 'notice' ? Megaphone : Bell}
          title={
            activeTab === 'all'
              ? '알림이 없습니다'
              : `${TABS.find((t) => t.key === activeTab)?.label} 알림이 없습니다`
          }
          description="새로운 알림이 여기에 표시됩니다"
        />
      ) : (
        <div className="space-y-2">
          {filtered.map((n) => (
            <div
              key={n.id}
              onClick={() => handleCardClick(n)}
              className={cn(
                'rounded-2xl border p-5 transition-colors cursor-pointer',
                n.isRead
                  ? 'border-border bg-card hover:bg-muted/50'
                  : 'border-primary/20 bg-primary/5 hover:bg-primary/10'
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'mt-1 w-2 h-2 rounded-full shrink-0',
                    n.isRead ? 'bg-muted' : 'bg-primary'
                  )}
                />
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm font-medium', n.isRead ? 'text-muted-foreground' : 'text-foreground')}>
                    {n.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {n.body}
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-2 tabular-nums">
                    {new Date(n.createdAt).toLocaleDateString('ko-KR', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
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
