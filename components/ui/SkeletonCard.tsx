import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'card' | 'row';
}

export default function SkeletonCard({
  className,
  children,
  variant = 'card',
}: SkeletonCardProps) {
  if (variant === 'row') {
    return (
      <div
        className={cn(
          'flex animate-pulse items-center gap-4 bg-muted px-6 py-4',
          className
        )}
      >
        {children ?? (
          <>
            <div className="h-4 w-1/4 rounded bg-foreground/10" />
            <div className="h-4 w-1/5 rounded bg-foreground/10" />
            <div className="ml-auto h-5 w-16 rounded-full bg-foreground/10" />
          </>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'animate-pulse rounded-2xl bg-muted p-5 space-y-3',
        className
      )}
    >
      {children ?? (
        <>
          <div className="h-4 w-2/3 rounded bg-foreground/10" />
          <div className="h-3 w-full rounded bg-foreground/10" />
          <div className="h-3 w-5/6 rounded bg-foreground/10" />
        </>
      )}
    </div>
  );
}
