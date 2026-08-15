'use client';

import { Check } from 'lucide-react';
import { COVER_LETTER_TEMPLATES, type CoverLetterTemplate, type CLItem } from '@/lib/cover-letter-templates';
import { cn } from '@/lib/utils';

export type TemplateSelection = {
  key: string;
  label: string;
  items: CLItem[];
};

interface TemplateSelectorProps {
  value?: string;
  onSelect: (selection: TemplateSelection) => void;
}

export function TemplateSelector({ value, onSelect }: TemplateSelectorProps) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5 space-y-3">
      <div>
        <p className="text-sm font-semibold text-foreground">직군별 템플릿으로 시작하기</p>
        <p className="text-xs text-muted-foreground mt-1">
          선택하면 질문 항목이 자동으로 채워집니다. 이후 자유롭게 수정하세요.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {Object.entries(COVER_LETTER_TEMPLATES).map(([key, tpl]) => {
          const selected = value === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect({ key, ...tpl })}
              className={cn(
                'text-left text-xs px-4 py-3 rounded-xl border transition-all font-medium',
                selected
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-blue-200 bg-background text-foreground hover:bg-blue-100 hover:border-blue-300'
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{tpl.label}</span>
                {selected && <Check className="w-3.5 h-3.5 text-primary" />}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{tpl.items.length}개 항목</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
