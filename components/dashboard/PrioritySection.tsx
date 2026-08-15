'use client';

import { useEffect, useState } from 'react';
import { Rocket, RotateCcw } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import PriorityJobCard, { PriorityJob } from './PriorityJobCard';

const DEFAULT_WEIGHTS = { fit: 0.5, urgency: 0.25, competition: 0.15 };
const FRESHNESS_WEIGHT = 0.1;
const STORAGE_KEY = 'priority-weights';

function normalizeWeights(key: keyof typeof DEFAULT_WEIGHTS, value: number, prev: typeof DEFAULT_WEIGHTS) {
  const next = { ...prev, [key]: value };
  const sum = next.fit + next.urgency + next.competition;
  const target = 1 - FRESHNESS_WEIGHT;
  if (sum === 0) return prev;

  if (Math.abs(sum - target) > 0.001) {
    const remaining = target - value;
    const others = (Object.keys(next) as Array<keyof typeof DEFAULT_WEIGHTS>).filter((k) => k !== key);
    const othersSum = others.reduce((acc, k) => acc + next[k], 0);

    if (othersSum > 0) {
      others.forEach((k) => {
        next[k] = remaining * (next[k] / othersSum);
      });
    } else {
      others.forEach((k) => {
        next[k] = remaining / others.length;
      });
    }
  }

  return {
    fit: Math.max(0, Math.min(1, next.fit)),
    urgency: Math.max(0, Math.min(1, next.urgency)),
    competition: Math.max(0, Math.min(1, next.competition)),
  };
}

export default function PrioritySection() {
  const [jobs, setJobs] = useState<PriorityJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);

  // localStorage에서 저장된 가중치 불러오기
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          typeof parsed.fit === 'number' &&
          typeof parsed.urgency === 'number' &&
          typeof parsed.competition === 'number'
        ) {
          setWeights({
            fit: Math.max(0, Math.min(1, parsed.fit)),
            urgency: Math.max(0, Math.min(1, parsed.urgency)),
            competition: Math.max(0, Math.min(1, parsed.competition)),
          });
        }
      }
    } catch {
      // localStorage 파싱 실패 시 기본값 사용
    }
  }, []);

  // 가중치 변경 시 localStorage 저장 및 API 재호출
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(weights));

    const params = new URLSearchParams();
    params.set('fit', weights.fit.toFixed(2));
    params.set('urgency', weights.urgency.toFixed(2));
    params.set('competition', weights.competition.toFixed(2));
    params.set('freshness', FRESHNESS_WEIGHT.toFixed(2));

    setLoading(true);
    fetch(`/api/dashboard/priority-jobs?${params.toString()}`)
      .then((res) => res.json())
      .then((json) => {
        setJobs(json.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [weights]);

  function handleChange(key: keyof typeof DEFAULT_WEIGHTS, value: number[]) {
    setWeights((prev) => normalizeWeights(key, value[0] ?? prev[key], prev));
  }

  function resetWeights() {
    setWeights(DEFAULT_WEIGHTS);
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-white shadow-lg p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-100 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-blue-100 rounded animate-pulse" />
            <div className="h-3 w-48 bg-blue-50 rounded animate-pulse" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 bg-blue-50/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (jobs.length === 0) return null;

  return (
    <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-white shadow-lg p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
          <Rocket className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="text-base font-semibold text-gray-900">오늘의 추천 공고</p>
          <p className="text-xs text-gray-500">매칭 + 마감 임박 + 인기/신선 기반 TOP {jobs.length}</p>
        </div>
      </div>

      {/* 가중치 조절 슬라이더 */}
      <div className="mb-6 rounded-2xl border border-blue-100/60 bg-white/60 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-blue-900">우선순위 가중치 조절</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              합: {(weights.fit + weights.urgency + weights.competition + FRESHNESS_WEIGHT).toFixed(2)}
            </span>
            <button
              type="button"
              onClick={resetWeights}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              기본값
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">기술 매칭</span>
              <span className="font-medium text-blue-700">{Math.round(weights.fit * 100)}%</span>
            </div>
            <Slider
              value={[weights.fit]}
              min={0}
              max={1}
              step={0.05}
              onValueChange={(v) => handleChange('fit', v)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">마감 임박</span>
              <span className="font-medium text-emerald-700">{Math.round(weights.urgency * 100)}%</span>
            </div>
            <Slider
              value={[weights.urgency]}
              min={0}
              max={1}
              step={0.05}
              onValueChange={(v) => handleChange('urgency', v)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">인기/신선</span>
              <span className="font-medium text-violet-700">{Math.round(weights.competition * 100)}%</span>
            </div>
            <Slider
              value={[weights.competition]}
              min={0}
              max={1}
              step={0.05}
              onValueChange={(v) => handleChange('competition', v)}
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job, index) => (
          <PriorityJobCard key={job.id} job={job} rank={index + 1} weights={weights} />
        ))}
      </div>
    </div>
  );
}
