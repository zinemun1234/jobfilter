/**
 * 루트 레이아웃
 *
 * 모든 페이지를 감싸는 최상위 레이아웃.
 * - Inter 폰트 적용
 * - Providers로 전체 앱에 SessionProvider, QueryClientProvider, Toaster 제공
 * - suppressHydrationWarning: 서버/클라이언트 hydration 불일치 경고 억제
 */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";
import Providers from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JobFilter',
  description: '컴퓨터공학부 학생을 위한 맞춤 취업 공고 필터링 & 자소서 코칭 시스템',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.className}>
      <body suppressHydrationWarning><Providers>{children}</Providers></body>
    </html>
  );
}
