import { RoadmapItem } from '@prisma/client';

type SkillStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
import { ExternalLink, Trash2 } from 'lucide-react';

interface StatusConfig {
  label: string;
  icon: React.ReactNode;
  color: string; // tailwind bg class, e.g. 'bg-gray-300'
}

interface RoadmapTreeProps {
  items: RoadmapItem[];
  onStatusChange: (id: string, status: SkillStatus) => void;
  onDelete: (id: string) => void;
  statusConfig: Record<SkillStatus, StatusConfig>;
}

// Map bg color → lighter badge style (bg + text)
const statusBadgeStyle: Record<string, string> = {
  'bg-gray-300':   'bg-gray-100 text-gray-500 border-gray-200',
  'bg-blue-500':   'bg-blue-50 text-blue-600 border-blue-200',
  'bg-emerald-500':'bg-emerald-50 text-emerald-600 border-emerald-200',
};

export function RoadmapTree({ items, onStatusChange, onDelete, statusConfig }: RoadmapTreeProps) {
  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  return (
    <div className="divide-y divide-gray-100">
      {sortedItems.map((item, index) => {
        const status = (item.status as SkillStatus) || 'NOT_STARTED';
        const config = statusConfig[status] || statusConfig['NOT_STARTED'];
        const badgeClass = statusBadgeStyle[config.color] ?? 'bg-gray-100 text-gray-500 border-gray-200';

        const links: string[] = Array.isArray(item.referenceLinks)
          ? (item.referenceLinks as string[])
          : [];

        return (
          <div key={item.id} className="flex items-center gap-4 py-3.5">
            {/* Step number — colored by status */}
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${config.color}`}>
              {index + 1}
            </div>

            {/* Skill name + links */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">{item.skill}</span>
                {item.isCustom && (
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500 uppercase tracking-wide">
                    커스텀
                  </span>
                )}
              </div>
              {links.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {links.map((link, i) => {
                    let hostname = link;
                    try { hostname = new URL(link).hostname; } catch {}
                    return (
                      <a
                        key={i}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-500 hover:bg-gray-100 transition-colors"
                      >
                        <ExternalLink className="h-2.5 w-2.5" />
                        {hostname}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Status toggle button — colored badge */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  const next: SkillStatus =
                    status === 'NOT_STARTED' ? 'IN_PROGRESS' :
                    status === 'IN_PROGRESS' ? 'COMPLETED' : 'NOT_STARTED';
                  onStatusChange(item.id, next);
                }}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors hover:opacity-80 ${badgeClass}`}
              >
                {config.icon}
                {config.label}
              </button>

              {item.isCustom && (
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  className="rounded-lg p-1.5 text-gray-300 hover:text-red-400 transition-colors"
                  aria-label="삭제"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
