import { cn } from '@/lib/utils';
import SkeletonCard from './SkeletonCard';

interface SkeletonListProps {
  count: number;
  className?: string;
  cardClassName?: string;
  variant?: 'card' | 'row';
  children?: React.ReactNode;
}

export default function SkeletonList({
  count,
  className,
  cardClassName,
  variant = 'card',
  children,
}: SkeletonListProps) {
  return (
    <div className={cn(className ?? 'space-y-3')}>
      {[...Array(count)].map((_, i) => (
        <SkeletonCard key={i} className={cardClassName} variant={variant}>
          {children}
        </SkeletonCard>
      ))}
    </div>
  );
}
