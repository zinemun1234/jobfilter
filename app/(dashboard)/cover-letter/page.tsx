'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Plus, Trash2, ChevronDown, ChevronUp, Edit2, FileText, Download, Link2, Zap, RefreshCw, TrendingUp, BarChart2, History, Target, Copy, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { SlideOver } from '@/components/ui/slide-over';
import Link from 'next/link';
import { toast } from 'sonner';
import EmptyState from '@/components/ui/EmptyState';
import SkeletonList from '@/components/ui/SkeletonList';
import CoachingGuide from '@/components/cover-letter/CoachingGuide';
import KeywordHeatmap from '@/components/cover-letter/KeywordHeatmap';
import DuplicateCheckPanel from '@/components/cover-letter/DuplicateCheckPanel';
import ExperienceLibrary from '@/components/cover-letter/ExperienceLibrary';
import PortfolioLibrary from '@/components/cover-letter/PortfolioLibrary';
import { TemplateSelector } from '@/components/cover-letter/TemplateSelector';
import { VersionList } from '@/components/cover-letter/VersionList';
import type { FeedbackItem } from '@/lib/cover-letter-analysis';
import type { CLItem, CoverLetterTemplate } from '@/lib/cover-letter-templates';

type CoverLetter = {
  id: string;
  company: string;
  position: string;
  jobId?: string | null;
  version: number;
  items: CLItem[];
  updatedAt: string;
  analysisScore?: number | null;
  analysisHistory?: string | null; // JSON string
  job?: { company: string; position: string; status: string } | null;
};
type Job = { id: string; company: string; position: string };
type Listing = { id: string; company: string; position: string; tags?: string[] };

const empty = (): CLItem => ({ question: '', answer: '' });

async function fetchLetters(): Promise<CoverLetter[]> {
  const res = await fetch('/api/cover-letter');
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

async function fetchJobs(): Promise<Job[]> {
  const res = await fetch('/api/jobs');
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

async function fetchListings(): Promise<Listing[]> {
  const res = await fetch('/api/listings');
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

async function fetchProfile(): Promise<{ targetJob?: string | null; skills?: string[] }> {
  const res = await fetch('/api/profile');
  if (!res.ok) return {};
  const data = (await res.json()).data;
  return {
    targetJob: data.targetJob,
    skills: (() => { try { return JSON.parse(data.skills); } catch { return []; } })(),
  };
}

async function fetchCoverLetterTemplates(): Promise<Record<string, CoverLetterTemplate>> {
  const res = await fetch('/api/cover-letter/templates');
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

// 직군별 필요 기술 맵 — 교수님 피드백: "나는 어떤 기술이 있고 어떤 쪽으로 가고싶어 → 이것을 준비하세요"
const JOB_REQUIRED_SKILLS: Record<string, { must: string[]; good: string[] }> = {
  '프론트엔드 개발자': {
    must: ['HTML', 'CSS', 'JavaScript', 'React'],
    good: ['TypeScript', 'Next.js', 'Vue', 'Tailwind', 'Git'],
  },
  '백엔드 개발자': {
    must: ['Java', 'Python', 'Node.js', 'SQL'],
    good: ['Spring', 'Django', 'REST API', 'Docker', 'Git'],
  },
  '풀스택 개발자': {
    must: ['JavaScript', 'React', 'Node.js', 'SQL'],
    good: ['TypeScript', 'Next.js', 'Docker', 'Git'],
  },
  '모바일 개발자': {
    must: ['Swift', 'Kotlin', 'Java', 'Android'],
    good: ['Flutter', 'React Native', 'iOS', 'Git'],
  },
  '데이터 엔지니어': {
    must: ['Python', 'SQL', 'Pandas'],
    good: ['Spark', 'Airflow', 'ETL', 'Tableau', 'Git'],
  },
  'AI/ML 엔지니어': {
    must: ['Python', 'TensorFlow', 'PyTorch', 'SQL'],
    good: ['Scikit-learn', 'Keras', 'NumPy', 'Git'],
  },
  'DevOps/클라우드': {
    must: ['Linux', 'Docker', 'AWS', 'CI/CD'],
    good: ['Kubernetes', 'Terraform', 'Jenkins', 'Git'],
  },
  '보안 엔지니어': {
    must: ['Linux', 'Python', '네트워크'],
    good: ['CTF', '침투테스트', '정보보안기사', 'Wireshark'],
  },
  'IT 기획/PM': {
    must: ['기획', 'Figma', 'Notion'],
    good: ['Jira', 'SQL', 'UX', 'Agile'],
  },
  'QA 엔지니어': {
    must: ['테스트', 'Python', 'Selenium'],
    good: ['Jest', 'Cypress', 'Jira', 'Git'],
  },
  '사무/경영지원': {
    must: ['Excel', 'PPT', 'Word'],
    good: ['ERP', 'SAP', '문서작성', '데이터분석'],
  },
};

// 준비 현황 컴포넌트
function SkillReadiness({ targetJob, skills }: { targetJob?: string | null; skills?: string[] }) {
  if (!targetJob || !skills || skills.length === 0) return null;
  const req = JOB_REQUIRED_SKILLS[targetJob];
  if (!req) return null;

  const userSkillsLower = skills.map(s => s.toLowerCase());
  const hasMust = req.must.filter(s => userSkillsLower.some(u => u.includes(s.toLowerCase()) || s.toLowerCase().includes(u)));
  const missingMust = req.must.filter(s => !userSkillsLower.some(u => u.includes(s.toLowerCase()) || s.toLowerCase().includes(u)));
  const hasGood = req.good.filter(s => userSkillsLower.some(u => u.includes(s.toLowerCase()) || s.toLowerCase().includes(u)));
  const missingGood = req.good.filter(s => !userSkillsLower.some(u => u.includes(s.toLowerCase()) || s.toLowerCase().includes(u)));
  const readinessRate = Math.round((hasMust.length / req.must.length) * 100);

  return (
    <div className="rounded-2xl border border-violet-200/60 bg-gradient-to-br from-violet-50/80 to-indigo-50/60 p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-violet-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-violet-900">{targetJob} 준비 현황</p>
          <p className="text-xs text-violet-500 mt-0.5">현재 보유 기술 vs 직무 필수 스택</p>
        </div>
        <div className="text-right">
          <span className={`text-lg font-bold ${
            readinessRate >= 80 ? 'text-emerald-600' :
            readinessRate >= 50 ? 'text-amber-600' :
            'text-red-500'
          }`}>
            {readinessRate}%
          </span>
          <p className="text-xs text-violet-400">준비도</p>
        </div>
      </div>
      
      {missingMust.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            반드시 준비하세요
          </p>
          <div className="flex flex-wrap gap-1.5">
            {missingMust.map(s => (
              <span key={s} className="text-xs bg-white text-red-600 border border-red-200 px-3 py-1.5 rounded-lg font-medium shadow-sm">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {hasMust.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            보유 중 (필수)
          </p>
          <div className="flex flex-wrap gap-1.5">
            {hasMust.map(s => (
              <span key={s} className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {missingGood.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            추가로 준비하면 좋아요
          </p>
          <div className="flex flex-wrap gap-1.5">
            {missingGood.slice(0, 4).map(s => (
              <span key={s} className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-3 py-1.5 rounded-lg">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {hasGood.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {hasGood.map(s => (
            <span key={s} className="text-xs bg-white text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg">
              {s}
            </span>
          ))}
        </div>
      )}
      
      <div className="mt-4 pt-3 border-t border-violet-200/50 flex items-center gap-2">
        <span className="text-xs text-violet-400">프로필 → 기술 스택에서 보유 기술을 업데이트하면 현황이 바뀝니다</span>
      </div>
    </div>
  );
}

// 히트맵에서 선택한 키워드를 답변 텍스트에서 강조 표시 (대소문자 구분 없이)
function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function HighlightedAnswer({ answer, keyword }: { answer: string; keyword?: string }) {
  if (!keyword || !answer) return <>{answer || '(답변 없음)'}</>;

  const lowerKeyword = keyword.toLowerCase();
  const regex = new RegExp(`(${escapeRegExp(keyword)})`, 'gi');
  const parts = answer.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        if (part.toLowerCase() === lowerKeyword) {
          return <mark key={i} className="bg-amber-200 text-amber-900 rounded px-0.5">{part}</mark>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function findFeedbackKeyword(feedback: FeedbackItem, items: CLItem[]): { itemIndex: number; keyword?: string } {
  const message = feedback.message;
  const quoted = message.match(/["“”「」]([^"“”「」]+)["“”「」]/)?.[1];
  const candidates = quoted ? [quoted] : [];
  if (feedback.category === '첫 문장') candidates.push('저는');
  if (feedback.category === '수동태') candidates.push('되었습니다', '받았습니다', '되어');
  if (feedback.category === '접속사') candidates.push('그리고', '또한', '하지만', '그러나');
  if (feedback.category === '추상적 표현') candidates.push('다양한', '여러', '많은', '수많은');
  for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
    const keyword = candidates.find(candidate => items[itemIndex].answer.includes(candidate));
    if (keyword) return { itemIndex, keyword };
  }
  return { itemIndex: items.findIndex(item => item.answer.trim().length > 0) };
}

// targetJob 문자열 → 분석 카테고리 매핑
function detectCategory(position: string, targetJob?: string | null) {
  const text = (position + ' ' + (targetJob ?? '')).toLowerCase();
  if (text.includes('데이터') || text.includes('ai') || text.includes('머신')) return '데이터';
  if (text.includes('보안')) return '보안';
  if (text.includes('기획') || text.includes('pm')) return 'IT기획';
  if (text.includes('개발') || text.includes('엔지니어') || text.includes('engineer')) return '개발';
  if (text.includes('사무') || text.includes('경영')) return '사무';
  return '';
}

type AnalysisResult = {
  feedback: FeedbackItem[];
  overallScore: number;
  comparison: {
    resolved: string[];
    remaining: string[];
    new: string[];
    score: number;
  } | null;
  analyzedAt: string;
};

// 점수 히스토리 그래프
type HistoryEntry = { version: number; score: number; date: string; goodCount: number; warnCount: number; badCount: number };

function ScoreHistoryChart({ historyJson }: { historyJson?: string | null }) {
  if (!historyJson) return null;
  let history: HistoryEntry[] = [];
  try { history = JSON.parse(historyJson); } catch { return null; }
  if (history.length < 2) return null;

  const data = history.map(h => ({
    name: `v${h.version}`,
    score: h.score,
    date: new Date(h.date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
  }));

  const latest = history[history.length - 1];
  const prev = history[history.length - 2];
  const diff = latest.score - prev.score;

  return (
    <div className="border-t border-gray-50 px-5 py-4 bg-gray-50/50">
      <div className="flex items-center gap-2 mb-3">
        <BarChart2 className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-xs font-semibold text-gray-600">점수 변화</span>
        <span className={`ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full ${
          diff > 0 ? 'bg-emerald-100 text-emerald-700' :
          diff < 0 ? 'bg-red-50 text-red-600' :
          'bg-gray-100 text-gray-500'
        }`}>
          {diff > 0 ? `+${diff}` : diff}점 {diff > 0 ? '↑' : diff < 0 ? '↓' : '→'}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={80}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ fontSize: 11, padding: '4px 8px', borderRadius: 6, border: '1px solid #e5e7eb' }}
            formatter={(val: unknown) => [`${val}점`, '점수']}
            labelFormatter={(label, payload) => payload?.[0]?.payload?.date ?? label}
          />
          <ReferenceLine y={70} stroke="#d1fae5" strokeDasharray="3 3" />
          <Line
            type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={2}
            dot={{ fill: '#f59e0b', r: 3 }} activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// 인라인 분석 패널 — 재분석 비교 기능 포함
function InlineAnalysis({
  letter,
  targetJob,
  skills,
  onFocus,
}: {
  letter: CoverLetter;
  targetJob?: string | null;
  skills?: string[];
  onFocus: (focus: { letterId: string; itemIndex: number; keyword: string }) => void;
}) {
  const category = detectCategory(letter.position, targetJob);
  const combined = letter.items.map(it => it.answer).filter(Boolean).join('\n\n');

  const qc = useQueryClient();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [prevFeedback, setPrevFeedback] = useState<FeedbackItem[] | null>(null);

  // 최초 마운트 시 자동 분석
  useEffect(() => {
    if (combined.trim().length >= 30) runAnalysis(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function runAnalysis(previous: FeedbackItem[] | null) {
    if (combined.trim().length < 30) return;
    setLoading(true);
    try {
      const res = await fetch('/api/cover-letter/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: combined,
          category,
          targetJob,
          skills: skills ?? [],
          previousFeedback: previous,
          coverLetterId: letter.id,
        }),
      });
      if (!res.ok) throw new Error();
      const data = (await res.json()).data as AnalysisResult;
      setResult(data);
      // 점수 저장 후 목록 갱신 (히스토리 그래프 반영)
      qc.invalidateQueries({ queryKey: ['cover-letters'] });
    } finally {
      setLoading(false);
    }
  }

  function handleReanalyze() {
    // 현재 피드백을 이전 피드백으로 저장 후 재분석
    if (result) {
      setPrevFeedback(result.feedback);
      runAnalysis(result.feedback);
    }
  }

  if (combined.trim().length < 30) {
    return (
      <div className="px-5 py-4 bg-amber-50/50 border-t border-amber-100 text-center">
        <p className="text-xs text-amber-500">답변을 30자 이상 작성하면 분석이 시작됩니다</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="border-t border-amber-100 bg-amber-50/30 px-5 py-6 text-center">
        <div className="inline-flex items-center gap-2 text-xs text-amber-500">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" /> 분석 중...
        </div>
      </div>
    );
  }

  if (!result) return null;

  const { feedback, overallScore, comparison } = result;
  const good = feedback.filter(f => f.level === 'good');
  const warn = feedback.filter(f => f.level === 'warn');
  const bad = feedback.filter(f => f.level === 'bad');

  return (
    <div className="border-t border-amber-100 bg-amber-50/30 px-5 py-4 space-y-3">
      {/* 헤더 */}
      <div className="flex items-center gap-2 flex-wrap">
        <Zap className="w-3.5 h-3.5 text-amber-500" />
        <span className="text-xs font-semibold text-amber-700">코칭 분석 결과</span>
        <span className="text-xs text-amber-400 bg-amber-100 px-2 py-0.5 rounded-full">{category || '공통'}</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            {good.length > 0 && <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">✓ {good.length}</span>}
            {warn.length > 0 && <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">⚠ {warn.length}</span>}
            {bad.length > 0 && <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">✗ {bad.length}</span>}
          </div>
          {/* 종합 점수 */}
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            overallScore >= 70 ? 'bg-emerald-100 text-emerald-700' :
            overallScore >= 40 ? 'bg-amber-100 text-amber-700' :
            'bg-red-50 text-red-600'
          }`}>
            {overallScore}점
          </span>
        </div>
      </div>

      {/* 재분석 비교 결과 */}
      {comparison && (
        <div className="rounded-lg border border-blue-100 bg-blue-50/50 px-4 py-3 space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-xs font-semibold text-blue-700">피드백 반영도</span>
            <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${
              comparison.score >= 70 ? 'bg-emerald-100 text-emerald-700' :
              comparison.score >= 30 ? 'bg-blue-100 text-blue-700' :
              'bg-gray-100 text-gray-500'
            }`}>
              {comparison.score}% 반영
            </span>
          </div>
          {comparison.resolved.length > 0 && (
            <p className="text-[11px] text-emerald-700">
              ✓ 개선됨: {comparison.resolved.join(', ')}
            </p>
          )}
          {comparison.remaining.length > 0 && (
            <p className="text-[11px] text-amber-600">
              ⚠ 아직 미반영: {comparison.remaining.join(', ')}
            </p>
          )}
          {comparison.new.length > 0 && (
            <p className="text-[11px] text-red-500">
              + 새 이슈: {comparison.new.join(', ')}
            </p>
          )}
        </div>
      )}

      {/* 피드백 목록 — 교수님 피드백: "1번은 이렇게 고치면 좋겠네요" 지도형 형식 */}
      <ul className="space-y-2">
        {feedback.filter(f => f.level !== 'good').map((f, i) => (
          <li
            key={i}
            onClick={() => {
              const focus = findFeedbackKeyword(f, letter.items);
              if (focus.itemIndex >= 0 && focus.keyword) onFocus({ letterId: letter.id, itemIndex: focus.itemIndex, keyword: focus.keyword });
            }}
            className={`rounded-lg px-4 py-3 ${
              f.level === 'warn' ? 'bg-amber-50 border border-amber-100' : 'bg-red-50 border border-red-100'
            } ${findFeedbackKeyword(f, letter.items).keyword ? 'cursor-pointer hover:ring-2 hover:ring-amber-300' : ''}`}
            title={findFeedbackKeyword(f, letter.items).keyword ? '클릭하면 문제 문장으로 이동합니다' : undefined}
          >
            <div className="flex items-start gap-2.5">
              <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                f.level === 'warn' ? 'bg-amber-200 text-amber-800' : 'bg-red-200 text-red-800'
              }`}>{i + 1}</span>
              <div className="flex-1">
                <p className={`text-xs font-semibold ${f.level === 'warn' ? 'text-amber-800' : 'text-red-700'}`}>
                  {i + 1}번 — {f.category} 부분을 수정하세요
                </p>
                <p className={`text-xs mt-0.5 ${f.level === 'warn' ? 'text-amber-700' : 'text-red-600'}`}>
                  {f.message}
                </p>
                {f.suggestion && (
                  <p className="text-xs mt-1.5 text-gray-600 bg-white/70 rounded px-2.5 py-1.5 border border-gray-100">
                    💡 {f.suggestion}
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
        {feedback.filter(f => f.level === 'good').length > 0 && (
          <li className="rounded-lg px-4 py-2.5 bg-emerald-50 border border-emerald-100">
            <p className="text-xs font-semibold text-emerald-700 mb-1">잘 된 부분</p>
            <div className="flex flex-wrap gap-1.5">
              {feedback.filter(f => f.level === 'good').map((f, i) => (
                <span key={i} className="text-[11px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                  ✓ {f.category}
                </span>
              ))}
            </div>
          </li>
        )}
      </ul>

      <div className="flex items-center justify-between pt-1 border-t border-amber-100">
        <p className="text-xs text-amber-400">피드백을 참고해서 직접 수정하세요. AI가 대신 써주지 않습니다.</p>
        <button
          type="button"
          onClick={handleReanalyze}
          disabled={loading}
          className="flex items-center gap-1 text-[11px] font-medium text-amber-600 hover:text-amber-800 transition-colors"
        >
          <RefreshCw className="w-3 h-3" /> 수정 후 재분석
        </button>
      </div>
    </div>
  );
}

export default function CoverLetterPage() {
  const qc = useQueryClient();
  const searchParams = useSearchParams();
  const { data: letters = [], isLoading, error, refetch } = useQuery({ queryKey: ['cover-letters'], queryFn: fetchLetters });
  const { data: jobs = [] } = useQuery({ queryKey: ['jobs'], queryFn: fetchJobs });
  const { data: listings = [] } = useQuery({ queryKey: ['listings'], queryFn: fetchListings });
  const { data: profile } = useQuery({ queryKey: ['profile'], queryFn: fetchProfile });
  const { data: templates = {} } = useQuery({
    queryKey: ['cover-letter-templates'],
    queryFn: fetchCoverLetterTemplates,
    staleTime: 5 * 60 * 1000,
  });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CoverLetter | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [heatmapId, setHeatmapId] = useState<string | null>(null);
  const [duplicateId, setDuplicateId] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const [showVersions, setShowVersions] = useState<string | null>(null);
  const [highlighted, setHighlighted] = useState<{ letterId: string; itemIndex: number; keyword: string } | null>(null);

  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [jobId, setJobId] = useState('');
  const [items, setItems] = useState<CLItem[]>([empty()]);
  const [templateKey, setTemplateKey] = useState<string | null>(null);

  // 공고 상세에서 넘어온 경우 자동으로 폼 열기 + 공고 정보 자동 채우기
  useEffect(() => {
    const fromCompany = searchParams.get('company');
    const fromPosition = searchParams.get('position');
    const fromDescription = searchParams.get('description');
    const fromTags = searchParams.get('tags');
    const fromJobId = searchParams.get('jobId');
    if (fromCompany && fromPosition) {
      setEditing(null);
      setTemplateKey(null);
      setCompany(fromCompany);
      setPosition(fromPosition);
      setJobId(fromJobId ?? '');
      // 공고 설명/태그 기반으로 첫 항목 질문 자동 생성
      const autoQuestion = fromDescription
        ? `${fromPosition} 직무에 지원하는 이유와 본인의 역량을 서술해주세요.`
        : `${fromPosition} 직무 지원 동기를 작성해주세요.`;
      setItems([{ question: autoQuestion, answer: '' }]);
      // 태그 정보 토스트로 안내
      if (fromTags) {
        const tagList = fromTags.split(',').slice(0, 5).join(', ');
        setTimeout(() => toast.info(`이 공고 기술 스택: ${tagList} — 자소서에 언급하면 좋습니다`), 500);
      }
      setOpen(true);
    }
  }, [searchParams]);

  // 히트맵 셀 클릭 시 해당 문항으로 스크롤 이동
  useEffect(() => {
    if (!highlighted) return;
    const el = document.getElementById(`cl-item-${highlighted.letterId}-${highlighted.itemIndex}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlighted]);

  function openNew() {
    setEditing(null);
    setTemplateKey(null);
    setCompany(''); setPosition(''); setJobId(''); setItems([empty()]);
    setOpen(true);
  }
  function openEdit(l: CoverLetter) {
    setEditing(l);
    setTemplateKey(null);
    setCompany(l.company); setPosition(l.position);
    setJobId(l.jobId ?? '');
    setItems(l.items.length ? l.items : [empty()]);
    setOpen(true);
  }

  function handleJobSelect(id: string) {
    setJobId(id);
    if (id) {
      const job = jobs.find(j => j.id === id);
      if (job) { setCompany(job.company); setPosition(job.position); }
    }
  }

  const save = useMutation({
    mutationFn: async () => {
      const body = { company, position, jobId: jobId || null, items };
      const res = editing
        ? await fetch(`/api/cover-letter/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        : await fetch('/api/cover-letter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cover-letters'] });
      setOpen(false);
      toast.success(editing ? '자기소개서가 수정되었습니다' : '자기소개서가 추가되었습니다');
    },
    onError: () => toast.error('저장에 실패했습니다'),
  });

  const del = useMutation({
    mutationFn: (id: string) => fetch(`/api/cover-letter/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cover-letters'] });
      toast.success('자기소개서가 삭제되었습니다');
    },
    onError: () => toast.error('삭제에 실패했습니다'),
  });

  function updateItem(i: number, field: keyof CLItem, val: string) {
    setItems(prev => prev.map((it, idx) => idx === i ? { ...it, [field]: val } : it));
  }

  function insertExperience(experience: { situation: string; action: string; result: string; technologies: string[]; metrics?: string | null }) {
    const experienceText = [
      `상황: ${experience.situation}`,
      `행동: ${experience.action}`,
      `결과: ${experience.result}`,
      experience.technologies.length > 0 ? `사용 기술: ${experience.technologies.join(', ')}` : '',
      experience.metrics ? `성과: ${experience.metrics}` : '',
    ].filter(Boolean).join('\n');
    setItems(prev => prev.map((item, index) => index === 0 ? { ...item, answer: item.answer ? `${item.answer}\n\n${experienceText}` : experienceText } : item));
    toast.success('첫 번째 문항에 경험을 삽입했습니다');
  }

  function insertPortfolio(portfolio: { title: string; description: string; techStack: string[]; githubUrl?: string | null; deployUrl?: string | null }) {
    const portfolioText = [
      `프로젝트: ${portfolio.title}`,
      portfolio.description,
      portfolio.techStack.length > 0 ? `사용 기술: ${portfolio.techStack.join(', ')}` : '',
      portfolio.githubUrl ? `GitHub: ${portfolio.githubUrl}` : '',
      portfolio.deployUrl ? `배포 링크: ${portfolio.deployUrl}` : '',
    ].filter(Boolean).join('\n');
    setItems(prev => prev.map((item, index) => index === 0 ? { ...item, answer: item.answer ? `${item.answer}\n\n${portfolioText}` : portfolioText } : item));
    toast.success('첫 번째 문항에 포트폴리오를 삽입했습니다');
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 mb-3">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">핵심 기능</span>
            <span className="text-xs text-amber-500">빨간펜 코칭</span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">자기소개서 코칭</h1>
          <p className="text-sm text-muted-foreground mt-1.5">AI가 대신 써주지 않습니다. 직무에 맞는 수정 방향만 가이드합니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/cover-letter/export"
            className="flex items-center gap-2 px-4 py-2.5 border border-border bg-background text-foreground text-sm font-medium rounded-xl hover:bg-muted transition-colors"
          >
            <Download className="w-4 h-4" /> PDF 내보내기
          </Link>
          <button type="button" onClick={openNew}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-slate-900/10">
            <Plus className="w-4 h-4" /> 새 자기소개서
          </button>
        </div>
      </div>

      {/* 준비 현황 — 교수님 피드백: "나는 어떤 기술이 있고 어떤 쪽으로 가고싶어 → 이것을 준비하세요" */}
      {profile && <SkillReadiness targetJob={profile.targetJob} skills={profile.skills} />}

      {isLoading ? (
        <SkeletonList count={3} cardClassName="h-28" />
      ) : error ? (
        <EmptyState
          icon={AlertCircle}
          title="자기소개서를 불러오지 못했습니다"
          description={error.message}
          action={{ label: '다시 시도', onClick: () => refetch() }}
        />
      ) : letters.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="자기소개서가 없습니다"
          description="첫 자기소개서를 작성하고 AI 코칭을 받아보세요"
          action={{ label: '첫 자기소개서 작성하기', onClick: openNew }}
        />
      ) : (
        <div className="space-y-3">
          {letters.map(l => {
            const isOpen = expanded === l.id;
            const isAnalyzing = analyzing === l.id;
            const totalChars = l.items.reduce((s, it) => s + it.answer.length, 0);
            return (
              <div key={l.id} className="rounded-2xl border border-border bg-background shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 px-6 py-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <p className="font-semibold text-foreground">{l.company}</p>
                      <span className="text-xs text-muted-foreground/50">·</span>
                      <p className="text-sm text-muted-foreground">{l.position}</p>
                      {l.job && (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                          <Link2 className="w-2.5 h-2.5" /> 공고 연결됨
                        </span>
                      )}
                      {l.analysisScore != null && (
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          l.analysisScore >= 70 ? 'bg-emerald-100 text-emerald-700' :
                          l.analysisScore >= 40 ? 'bg-amber-100 text-amber-700' :
                          'bg-red-50 text-red-600'
                        }`}>
                          {l.analysisScore}점
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5">
                      항목 {l.items.length}개 · 총 {totalChars.toLocaleString()}자 ·{' '}
                      {new Date(l.updatedAt).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })} 수정
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {/* 코칭 분석 버튼 — 핵심 기능 */}
                    <button
                      type="button"
                      onClick={() => setAnalyzing(isAnalyzing ? null : l.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        isAnalyzing
                          ? 'bg-amber-500 text-white'
                          : 'bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      {isAnalyzing ? '분석 닫기' : '코칭 분석'}
                    </button>
                    {/* JD 키워드 매칭 히트맵 */}
                    <button
                      type="button"
                      onClick={() => setHeatmapId(heatmapId === l.id ? null : l.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        heatmapId === l.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200'
                      }`}
                    >
                      <Target className="w-3.5 h-3.5" />
                      {heatmapId === l.id ? '히트맵 닫기' : 'JD 매칭'}
                    </button>
                    {/* 중복/자기표절 검사 */}
                    <button
                      type="button"
                      onClick={() => setDuplicateId(duplicateId === l.id ? null : l.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        duplicateId === l.id
                          ? 'bg-violet-500 text-white'
                          : 'bg-violet-50 text-violet-600 hover:bg-violet-100 border border-violet-200'
                      }`}
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {duplicateId === l.id ? '중복 닫기' : '중복 검사'}
                    </button>
                    {/* 버전 히스토리 버튼 */}
                    <button
                      type="button"
                      onClick={() => setShowVersions(showVersions === l.id ? null : l.id)}
                      aria-label="버전 히스토리"
                      className={`p-1.5 rounded-lg transition-colors ${
                        showVersions === l.id
                          ? 'text-violet-600 bg-violet-100'
                          : 'text-gray-400 hover:text-violet-600 hover:bg-violet-50'
                      }`}
                    >
                      <History className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => openEdit(l)} aria-label="수정" className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => del.mutate(l.id)} aria-label="삭제" disabled={del.isPending} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => setExpanded(isOpen ? null : l.id)} aria-label={isOpen ? '접기' : '펼치기'} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* 코칭 분석 결과 — 카드 바로 아래 인라인 표시 */}
                {isAnalyzing && (
                  <InlineAnalysis
                    letter={l}
                    targetJob={profile?.targetJob}
                    skills={profile?.skills}
                    onFocus={focus => {
                      setExpanded(l.id);
                      setHighlighted(focus);
                    }}
                  />
                )}

                {/* 버전 히스토리 패널 */}
                {showVersions === l.id && (
                  <VersionList
                    letterId={l.id}
                    currentVersion={l.version}
                    currentItems={l.items}
                    onClose={() => setShowVersions(null)}
                  />
                )}

                {/* 점수 히스토리 그래프 — 분석 이력이 2개 이상일 때 표시 */}
                {!isAnalyzing && <ScoreHistoryChart historyJson={l.analysisHistory} />}

                {isOpen && (
                  <div className="border-t border-gray-50 divide-y divide-gray-50">
                    {heatmapId === l.id && (
                      <div className="px-5 py-4 bg-gray-50/50">
                        <KeywordHeatmap
                          coverLetterId={l.id}
                          items={l.items}
                          listings={listings.map((listing) => ({ id: listing.id, company: listing.company, position: listing.position }))}
                          onHighlight={(itemIndex, keyword) => setHighlighted({ letterId: l.id, itemIndex, keyword })}
                        />
                      </div>
                    )}
                    {duplicateId === l.id && (
                      <DuplicateCheckPanel letterId={l.id} />
                    )}
                    {l.items.map((it, i) => {
                      const isHighlighted = highlighted?.letterId === l.id && highlighted?.itemIndex === i;
                      return (
                        <div key={i} className="px-5 py-4" id={`cl-item-${l.id}-${i}`}>
                          <p className="text-xs font-medium text-gray-500 mb-1.5">Q{i + 1}. {it.question || '(질문 없음)'}</p>
                          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-lg px-4 py-3">
                            <HighlightedAnswer
                              answer={it.answer}
                              keyword={isHighlighted ? highlighted.keyword : undefined}
                            />
                          </p>
                          <p className="text-xs text-gray-400 mt-1.5 text-right">{it.answer.length}자</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* SlideOver — 작성/수정 폼 + 가이드 탭 */}
      <SlideOver open={open} onClose={() => setOpen(false)} title={editing ? '자기소개서 수정' : '새 자기소개서'}>
        <div className="space-y-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <ExperienceLibrary onInsertAction={insertExperience} />
            <PortfolioLibrary onInsertAction={insertPortfolio} />
          </div>
          <CoachingGuide
            defaultCategory={detectCategory(position, profile?.targetJob)}
            analysisTexts={items.map(it => it.answer).filter(Boolean)}
          />

          {/* 템플릿 선택 — 새 작성 시에만 표시 */}
          {!editing && (
            <TemplateSelector
              value={templateKey ?? undefined}
              templates={templates}
              onSelect={selection => {
                setTemplateKey(selection.key);
                setItems(selection.items.map(it => ({ ...it })));
                setPosition(selection.label);
              }}
            />
          )}

          {jobs.length > 0 && (
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">채용공고 연결 (선택)</label>
              <select value={jobId} onChange={e => handleJobSelect(e.target.value)}
                aria-label="채용공고 선택"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                <option value="">연결 안 함</option>
                {jobs.map(j => (
                  <option key={j.id} value={j.id}>{j.company} · {j.position}</option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">회사명</label>
              <input value={company} onChange={e => setCompany(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="회사명" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">지원 직무</label>
              <input value={position} onChange={e => setPosition(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="직무명 (예: 백엔드 개발자)" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">항목</p>
              <button type="button" onClick={() => setItems(p => [...p, empty()])}
                className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                <Plus className="w-3 h-3" /> 항목 추가
              </button>
            </div>
            {items.map((it, i) => (
              <div key={i} className="space-y-2 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-400">항목 {i + 1}</span>
                  {items.length > 1 && (
                    <button type="button" onClick={() => setItems(p => p.filter((_, idx) => idx !== i))}
                      className="text-xs text-red-400 hover:text-red-600">삭제</button>
                  )}
                </div>
                <input value={it.question} onChange={e => updateItem(i, 'question', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="질문 (예: 지원 동기를 작성해주세요)" />
                <div>
                  <textarea value={it.answer} onChange={e => updateItem(i, 'answer', e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="답변을 작성하세요..." />
                  <p className="text-xs text-gray-400 text-right mt-0.5">{it.answer.length}자</p>
                </div>
              </div>
            ))}
          </div>

          <button type="button" onClick={() => save.mutate()} disabled={!company || !position || save.isPending}
            className="w-full py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors">
            {save.isPending ? '저장 중...' : '저장'}
          </button>
        </div>
      </SlideOver>
    </div>
  );
}
