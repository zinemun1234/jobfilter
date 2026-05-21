'use client';

/**
 * 전역 Provider 래퍼
 *
 * 앱 전체에 필요한 Context Provider를 한 곳에서 관리한다.
 * - SessionProvider: NextAuth 세션 (useSession 훅 사용 가능)
 * - QueryClientProvider: TanStack Query (useQuery, useMutation 사용 가능)
 * - Toaster: sonner 토스트 알림 (toast.success/error 등 사용 가능)
 *
 * QueryClient를 useState로 생성해 리렌더링 시 재생성을 방지한다.
 */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster richColors />
      </QueryClientProvider>
    </SessionProvider>
  );
}
