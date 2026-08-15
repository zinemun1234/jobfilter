'use client';

import { useMemo, useState } from 'react';
import { CheckSquare, Square, ClipboardList } from 'lucide-react';
import type { ChecklistItem, ChecklistCategory } from '@/lib/job-checklist';

interface JobChecklistProps {
  items: ChecklistItem[];
  onChangeAction: (items: ChecklistItem[]) => void;
  disabled?: boolean;
}

const CATEGORY_LABELS: Record<ChecklistCategory, string> = {
  document: '서류 준비',
  interview: '면접 준비',
  final: '최종/입사',
};

const CATEGORY_ORDER: ChecklistCategory[] = ['document', 'interview', 'final'];

export default function JobChecklist({ items, onChangeAction, disabled }: JobChecklistProps) {
  const [localItems, setLocalItems] = useState<ChecklistItem[]>(items);

  // 부모로부터 items가 바뀌면 동기화
  const itemsSignature = JSON.stringify(items.map((i) => `${i.label}|${i.category}`));
  const localSignature = JSON.stringify(localItems.map((i) => `${i.label}|${i.category}`));

  if (itemsSignature !== localSignature) {
    setLocalItems(items);
  }

  const toggle = (index: number) => {
    if (disabled) return;
    const next = localItems.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item));
    setLocalItems(next);
    onChangeAction(next);
  };

  const completedCount = localItems.filter((i) => i.checked).length;
  const progress = localItems.length > 0 ? Math.round((completedCount / localItems.length) * 100) : 0;

  const grouped = useMemo(() => {
    const map: Record<ChecklistCategory, ChecklistItem[]> = {
      document: [],
      interview: [],
      final: [],
    };
    for (const item of localItems) {
      map[item.category ?? 'document'].push(item);
    }
    return map;
  }, [localItems]);

  if (localItems.length === 0) return null;

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-gray-500" />
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">준비 체크리스트</p>
        </div>
        <span className="text-xs font-medium text-blue-600">{completedCount}/{localItems.length} ({progress}%)</span>
      </div>

      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-4">
        <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="space-y-5">
        {CATEGORY_ORDER.map((category) => {
          const group = grouped[category];
          if (group.length === 0) return null;

          return (
            <div key={category}>
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                {CATEGORY_LABELS[category]}
              </p>
              <div className="space-y-2">
                {group.map((item, index) => {
                  const globalIndex = localItems.findIndex(
                    (i) => i.label === item.label && i.category === item.category
                  );
                  return (
                    <button
                      key={`${item.category}-${item.label}`}
                      type="button"
                      onClick={() => toggle(globalIndex)}
                      disabled={disabled}
                      className={`w-full flex items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                        item.checked
                          ? 'bg-gray-50 border-gray-200'
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {item.checked ? (
                        <CheckSquare className="w-4 h-4 text-blue-500 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-300 shrink-0" />
                      )}
                      <span className={`text-sm ${item.checked ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
