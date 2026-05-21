'use client';

/**
 * 자소서 코칭 가이드 컴포넌트
 *
 * 두 가지 탭으로 구성:
 * 1. 가이드 탭: 직군별 체크리스트, 작성 팁, 주의사항 (정적 데이터)
 * 2. 텍스트 분석 탭: analyzeText()로 실시간 키워드 분석
 *    - "작성 중인 자소서 분석하기" 버튼: 부모에서 넘긴 analysisTexts 합쳐서 분석
 *    - 직접 텍스트 입력해서 분석도 가능
 *
 * 직군 선택 시 가이드 내용과 분석 카테고리가 함께 변경된다.
 * 자소서 작성 SlideOver 내부에 임베드되어 사용된다.
 */
import { useState, useCallback } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, CheckCircle2, AlertCircle, XCircle, Zap } from 'lucide-react';
import { analyzeText, type FeedbackItem } from '@/lib/cover-letter-analysis';

type GuideItem = {
  title: string;
  checkpoints: string[];
  tips: string[];
  warnings: string[];
};

const GUIDES: Record<string, GuideItem> = {
  '': {
    title: '공통 가이드',
    checkpoints: [
      '지원 동기가 구체적인 경험이나 계기와 연결되어 있나요?',
      '본인의 강점이 직무와 연결되어 설명되어 있나요?',
      '추상적인 표현("열정", "노력") 대신 구체적인 사례가 있나요?',
      '문장이 간결하고 핵심이 명확한가요?',
      '맞춤법과 띄어쓰기를 확인했나요?',
    ],
    tips: [
      'STAR 기법 활용: 상황(Situation) → 과제(Task) → 행동(Action) → 결과(Result)',
      '숫자와 수치로 성과를 표현하면 설득력이 높아집니다',
      '회사 홈페이지와 채용공고를 읽고 회사의 언어를 사용하세요',
    ],
    warnings: [
      '"최선을 다하겠습니다" 같은 공허한 다짐은 피하세요',
      '다른 회사 자소서를 복붙하면 회사명이 틀릴 수 있습니다',
    ],
  },
  '개발': {
    title: '개발 직군 가이드',
    checkpoints: [
      '사용한 기술 스택이 구체적으로 명시되어 있나요?',
      '프로젝트 경험에서 본인의 역할이 명확한가요?',
      '기술적 문제를 해결한 경험이 포함되어 있나요?',
      '협업 경험(Git, 코드리뷰, 팀 프로젝트)이 언급되어 있나요?',
      '지원 회사의 기술 스택과 연관성이 있나요?',
    ],
    tips: [
      'GitHub 링크나 포트폴리오를 자소서에 포함하면 강점이 됩니다',
      '트러블슈팅 경험을 구체적으로 서술하면 기술력을 어필할 수 있습니다',
      '오픈소스 기여, 사이드 프로젝트도 좋은 소재입니다',
    ],
    warnings: [
      '기술 나열만 하고 실제 활용 경험이 없으면 역효과입니다',
      '"Java, Python, C++, React, Vue, Angular..." 식의 나열은 지양하세요',
    ],
  },
  '데이터': {
    title: '데이터 직군 가이드',
    checkpoints: [
      '데이터 분석/처리 경험이 구체적으로 서술되어 있나요?',
      '사용한 도구(Python, SQL, Tableau 등)가 명시되어 있나요?',
      '분석 결과가 어떤 의사결정에 활용되었는지 나와 있나요?',
      '데이터 규모나 처리 성능 개선 수치가 있나요?',
    ],
    tips: [
      '분석 프로젝트의 비즈니스 임팩트를 강조하세요',
      '데이터 수집 → 전처리 → 분석 → 시각화 → 인사이트 흐름으로 서술하면 좋습니다',
    ],
    warnings: ['분석 과정만 나열하고 결론이 없으면 설득력이 떨어집니다'],
  },
  '사무': {
    title: '사무/경영지원 직군 가이드',
    checkpoints: [
      '문서 작성, 데이터 관리 등 실무 역량이 드러나나요?',
      '커뮤니케이션 능력을 보여주는 사례가 있나요?',
      '꼼꼼함, 정확성을 보여주는 경험이 있나요?',
    ],
    tips: [
      '엑셀, PPT, 문서 작성 등 실무 툴 활용 능력을 구체적으로 서술하세요',
      '인턴, 아르바이트, 동아리 활동도 좋은 소재입니다',
    ],
    warnings: ['"성실하고 책임감 있습니다" 같은 추상적 표현은 모든 지원자가 씁니다'],
  },
  'IT기획': {
    title: 'IT 기획/PM 직군 가이드',
    checkpoints: [
      '서비스 기획이나 프로젝트 관리 경험이 있나요?',
      '사용자 관점에서 문제를 정의한 경험이 있나요?',
      '개발팀과 협업한 경험이 있나요?',
    ],
    tips: [
      '기획한 기능이 실제로 어떤 효과를 냈는지 수치로 표현하세요',
      'Figma, Notion, Jira 등 협업 툴 경험을 언급하세요',
    ],
    warnings: ['개발 지식 없이 IT 기획 직군에 지원하면 기술 이해도를 검증받을 수 있습니다'],
  },
  '보안': {
    title: '보안 직군 가이드',
    checkpoints: [
      '보안 관련 자격증(정보보안기사, CISSP 등)이 있나요?',
      '취약점 분석이나 침투 테스트 경험이 있나요?',
    ],
    tips: [
      'CTF 참여 경험이나 버그바운티 이력은 강력한 어필 포인트입니다',
    ],
    warnings: ['실제 시스템에 무단 침투한 경험은 절대 언급하지 마세요'],
  },
};

const CATEGORIES = [
  { value: '', label: '공통' },
  { value: '개발', label: '개발' },
  { value: '데이터', label: '데이터/AI' },
  { value: '사무', label: '사무/경영지원' },
  { value: 'IT기획', label: 'IT 기획/PM' },
  { value: '보안', label: '보안' },
];

interface Props {
  defaultCategory?: string;
  // 외부에서 분석할 텍스트를 넘겨줄 수 있음 (자소서 항목 답변들)
  analysisTexts?: string[];
}

function FeedbackBadge({ item }: { item: FeedbackItem }) {
  const icon = item.level === 'good'
    ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
    : item.level === 'warn'
    ? <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
    : <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />;

  const textColor = item.level === 'good' ? 'text-emerald-700' : item.level === 'warn' ? 'text-amber-700' : 'text-red-600';
  const bgColor = item.level === 'good' ? 'bg-emerald-50' : item.level === 'warn' ? 'bg-amber-50' : 'bg-red-50';

  return (
    <li className={`rounded-lg px-3 py-2 ${bgColor}`}>
      <div className={`flex items-start gap-2 text-xs ${textColor}`}>
        {icon}
        <div className="flex-1">
          <span className="font-medium">[{item.category}]</span> {item.message}
          {item.suggestion && (
            <p className="mt-1 text-[11px] opacity-80">→ {item.suggestion}</p>
          )}
        </div>
      </div>
    </li>
  );
}

export default function CoachingGuide({ defaultCategory = '', analysisTexts = [] }: Props) {
  const [category, setCategory] = useState(defaultCategory);
  const [open, setOpen] = useState(true);
  const [analyzeInput, setAnalyzeInput] = useState('');
  const [feedback, setFeedback] = useState<FeedbackItem[] | null>(null);
  const [analyzeTab, setAnalyzeTab] = useState<'guide' | 'analyze'>('guide');

  const guide = GUIDES[category] ?? GUIDES[''];

  const runAnalysis = useCallback((text: string) => {
    const result = analyzeText(text, category);
    setFeedback(result);
  }, [category]);

  // 외부에서 넘어온 텍스트가 있으면 합쳐서 분석
  const handleAnalyzeExternal = useCallback(() => {
    const combined = analysisTexts.join('\n\n');
    if (combined.trim()) {
      setAnalyzeInput(combined);
      runAnalysis(combined);
      setAnalyzeTab('analyze');
    }
  }, [analysisTexts, runAnalysis]);

  const goodCount = feedback?.filter(f => f.level === 'good').length ?? 0;
  const warnCount = feedback?.filter(f => f.level === 'warn').length ?? 0;
  const badCount = feedback?.filter(f => f.level === 'bad').length ?? 0;

  return (
    <div className="rounded-xl border border-amber-100 bg-amber-50/50 overflow-hidden">
      {/* 헤더 */}
      <button
        type="button"
        onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-amber-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="text-sm font-medium text-amber-800">코칭 가이드</span>
          <span className="text-xs text-amber-500 bg-amber-100 px-2 py-0.5 rounded-full">
            {guide.title}
          </span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-amber-400" />}
      </button>

      {open && (
        <div className="border-t border-amber-100">
          {/* 직군 선택 */}
          <div className="px-5 pt-4 pb-3">
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map(c => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => { setCategory(c.value); setFeedback(null); }}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    category === c.value
                      ? 'bg-amber-500 text-white'
                      : 'bg-white text-amber-600 border border-amber-200 hover:bg-amber-50'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* 탭 */}
          <div className="flex border-b border-amber-100 px-5">
            <button
              type="button"
              onClick={() => setAnalyzeTab('guide')}
              className={`pb-2 mr-4 text-xs font-medium border-b-2 transition-colors ${
                analyzeTab === 'guide'
                  ? 'border-amber-500 text-amber-700'
                  : 'border-transparent text-amber-400 hover:text-amber-600'
              }`}
            >
              가이드
            </button>
            <button
              type="button"
              onClick={() => setAnalyzeTab('analyze')}
              className={`pb-2 text-xs font-medium border-b-2 transition-colors flex items-center gap-1 ${
                analyzeTab === 'analyze'
                  ? 'border-amber-500 text-amber-700'
                  : 'border-transparent text-amber-400 hover:text-amber-600'
              }`}
            >
              <Zap className="w-3 h-3" /> 텍스트 분석
            </button>
          </div>

          {analyzeTab === 'guide' && (
            <div className="px-5 py-4 space-y-4">
              {/* 체크리스트 */}
              <div>
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-2">작성 전 체크리스트</p>
                <ul className="space-y-1.5">
                  {guide.checkpoints.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-amber-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-2">작성 팁</p>
                <ul className="space-y-1.5">
                  {guide.tips.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-amber-700">
                      <span className="text-amber-400 shrink-0 font-bold">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-2">주의사항</p>
                <ul className="space-y-1.5">
                  {guide.warnings.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-red-600">
                      <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-[10px] text-amber-400 pt-1 border-t border-amber-100">
                이 가이드는 참고용입니다. 자소서는 반드시 본인이 직접 작성하세요.
              </p>
            </div>
          )}

          {analyzeTab === 'analyze' && (
            <div className="px-5 py-4 space-y-3">
              {analysisTexts.length > 0 && (
                <button
                  type="button"
                  onClick={handleAnalyzeExternal}
                  className="w-full py-2 text-xs font-medium bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" /> 작성 중인 자소서 분석하기
                </button>
              )}
              <div>
                <label className="block text-xs font-medium text-amber-700 mb-1.5">
                  텍스트 직접 입력해서 분석
                </label>
                <textarea
                  value={analyzeInput}
                  onChange={e => { setAnalyzeInput(e.target.value); setFeedback(null); }}
                  rows={5}
                  placeholder="자소서 답변을 붙여넣으세요..."
                  className="w-full px-3 py-2 text-sm border border-amber-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none"
                />
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[10px] text-amber-400">{analyzeInput.length}자</span>
                  <button
                    type="button"
                    onClick={() => runAnalysis(analyzeInput)}
                    disabled={analyzeInput.trim().length < 50}
                    className="px-3 py-1 text-xs font-medium bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-40 transition-colors"
                  >
                    분석
                  </button>
                </div>
              </div>

              {feedback && feedback.length > 0 && (
                <div className="rounded-lg border border-amber-200 bg-white p-4 space-y-3">
                  {/* 요약 스코어 */}
                  <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">✓ {goodCount}</span>
                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">⚠ {warnCount}</span>
                    {badCount > 0 && <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">✗ {badCount}</span>}
                    <span className="text-[10px] text-gray-400 ml-auto">키워드 기반 분석</span>
                  </div>
                  <ul className="space-y-2">
                    {feedback.map((f, i) => <FeedbackBadge key={i} item={f} />)}
                  </ul>
                </div>
              )}

              {feedback && feedback.length === 0 && (
                <p className="text-xs text-amber-500 text-center py-2">50자 이상 입력하면 분석이 시작됩니다</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
