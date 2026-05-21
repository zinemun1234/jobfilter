import Link from 'next/link';

interface RoadmapProgressProps {
  progress: number;
  total: number;
  completed: number;
}

export default function RoadmapProgress({ progress, total, completed }: RoadmapProgressProps) {
  if (total === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-gray-400 mb-2">로드맵이 설정되지 않았습니다</p>
        <Link href="/roadmap" className="text-sm font-medium text-[#0f172a] hover:underline">
          로드맵 설정하기 →
        </Link>
      </div>
    );
  }

  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">{completed} / {total} 항목 완료</span>
        <span className="font-semibold text-gray-900">{clamped}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-[#0f172a] transition-all duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
