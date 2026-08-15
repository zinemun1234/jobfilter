'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  onPageChangeAction: (page: number) => void;
}

export default function Pagination({
  page,
  pageSize,
  total,
  totalPages,
  onPageChangeAction,
}: PaginationProps) {
  if (totalPages <= 1) {
    return (
      <div className="flex items-center justify-center text-xs text-muted-foreground py-2">
        총 {total}개 · 페이지 {page}/{totalPages}
      </div>
    );
  }

  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const pages: (number | 'ellipsis')[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (page <= 3) {
      pages.push(1, 2, 3, 4, 'ellipsis', totalPages);
    } else if (page >= totalPages - 2) {
      pages.push(1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, 'ellipsis', page - 1, page, page + 1, 'ellipsis', totalPages);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-border bg-card p-3 shadow-sm">
      <span className="text-xs text-muted-foreground">
        총 {total}개 · {start}-{end}번 표시
      </span>
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          onClick={() => onPageChangeAction(Math.max(1, page - 1))}
          disabled={page <= 1}
          aria-label="이전 페이지"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </Button>
        {pages.map((p, i) =>
          p === 'ellipsis' ? (
            <span key={`ellipsis-${i}`} className="px-1.5 text-xs text-muted-foreground">
              ...
            </span>
          ) : (
            <Button
              key={p}
              type="button"
              variant={p === page ? 'default' : 'outline'}
              size="icon-xs"
              onClick={() => onPageChangeAction(p)}
              aria-label={`${p}페이지`}
              className="text-xs"
            >
              {p}
            </Button>
          )
        )}
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          onClick={() => onPageChangeAction(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          aria-label="다음 페이지"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}
