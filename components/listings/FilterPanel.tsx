'use client';

import { useEffect, useState } from 'react';
import { Search, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MAJOR_OPTIONS } from '@/lib/majors';

export type FilterState = {
  search: string;
  career: string;
  employType: string;
  category?: string;
  location: string;
  tags: string[];
  deadlineFrom: string;
  deadlineTo: string;
  sort: 'match' | 'deadline' | 'createdAt';
  pageSize: number;
};

interface FilterPanelProps {
  values: FilterState;
  onChangeAction: (patch: Partial<FilterState>) => void;
  onResetAction: () => void;
  showMatchSort?: boolean;
}

const defaultValues: FilterState = {
  search: '',
  career: 'all',
  employType: 'all',
  category: 'all',
  location: '',
  tags: [],
  deadlineFrom: '',
  deadlineTo: '',
  sort: 'createdAt',
  pageSize: 20,
};

function TagInput({ value, onChange }: { value: string[]; onChange: (tags: string[]) => void }) {
  const [input, setInput] = useState('');

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag) return;
    if (value.includes(tag)) {
      setInput('');
      return;
    }
    onChange([...value, tag]);
    setInput('');
  };

  const removeTag = (tag: string) => onChange(value.filter((t) => t !== tag));

  return (
    <div className="w-full space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {value.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="inline-flex items-center gap-1 text-xs font-normal"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="inline-flex items-center justify-center rounded-sm hover:bg-muted p-0.5"
              aria-label={`${tag} 제거`}
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag(input);
          }
        }}
        onBlur={() => addTag(input)}
        placeholder="태그 입력 후 Enter"
        className="text-xs"
      />
    </div>
  );
}

export default function FilterPanel({
  values,
  onChangeAction,
  onResetAction,
  showMatchSort = false,
}: FilterPanelProps) {
  const [searchInput, setSearchInput] = useState(values.search);

  useEffect(() => {
    setSearchInput(values.search);
  }, [values.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onChangeAction({ search: searchInput.trim() });
  };

  const hasFilter =
    values.search ||
    values.career !== 'all' ||
    values.employType !== 'all' ||
    (values.category && values.category !== 'all') ||
    values.location ||
    values.tags.length > 0 ||
    values.deadlineFrom ||
    values.deadlineTo;

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
      {/* 검색 */}
      <form onSubmit={handleSearch} className="relative flex w-full max-w-2xl items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="회사명, 직무, 지역 검색"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9 text-sm"
          />
        </div>
        <Button type="submit" size="sm" className="shrink-0">
          검색
        </Button>
        {hasFilter && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onResetAction}
            className="shrink-0 text-muted-foreground"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            초기화
          </Button>
        )}
      </form>

      {/* 필터 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">경력</label>
          <Select value={values.career} onValueChange={(v) => onChangeAction({ career: v })}>
            <SelectTrigger className="w-full text-xs h-9">
              <SelectValue placeholder="경력 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 경력</SelectItem>
              <SelectItem value="new">신입/인턴/무관</SelectItem>
              <SelectItem value="experienced">경력</SelectItem>
              <SelectItem value="any">경력 무관</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">고용 형태</label>
          <Select value={values.employType} onValueChange={(v) => onChangeAction({ employType: v })}>
            <SelectTrigger className="w-full text-xs h-9">
              <SelectValue placeholder="고용 형태 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="fulltime">정규직</SelectItem>
              <SelectItem value="contract">계약직</SelectItem>
              <SelectItem value="intern">인턴</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">학과/전공</label>
          <Select value={values.category ?? 'all'} onValueChange={(v) => onChangeAction({ category: v })}>
            <SelectTrigger className="w-full text-xs h-9">
              <SelectValue placeholder="학과/전공 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 학과/전공</SelectItem>
              {MAJOR_OPTIONS.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">근무지</label>
          <Input
            type="text"
            placeholder="지역 검색"
            value={values.location}
            onChange={(e) => onChangeAction({ location: e.target.value })}
            className="text-xs h-9"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">태그</label>
          <TagInput value={values.tags} onChange={(tags) => onChangeAction({ tags })} />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">마감일 시작</label>
          <Input
            type="date"
            value={values.deadlineFrom}
            onChange={(e) => onChangeAction({ deadlineFrom: e.target.value })}
            className="text-xs h-9"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">마감일 종료</label>
          <Input
            type="date"
            value={values.deadlineTo}
            onChange={(e) => onChangeAction({ deadlineTo: e.target.value })}
            className="text-xs h-9"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">정렬</label>
          <Select value={values.sort} onValueChange={(v) => onChangeAction({ sort: v as FilterState['sort'] })}>
            <SelectTrigger className="w-full text-xs h-9">
              <SelectValue placeholder="정렬 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">최신순</SelectItem>
              <SelectItem value="deadline">마감임박순</SelectItem>
              {showMatchSort && <SelectItem value="match">매칭순</SelectItem>}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">페이지 크기</label>
          <Select
            value={String(values.pageSize)}
            onValueChange={(v) => onChangeAction({ pageSize: Number(v) })}
          >
            <SelectTrigger className="w-full text-xs h-9">
              <SelectValue placeholder="페이지 크기" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10개</SelectItem>
              <SelectItem value="20">20개</SelectItem>
              <SelectItem value="50">50개</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export { defaultValues };
