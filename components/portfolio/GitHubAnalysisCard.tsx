'use client';

import { GitHubAnalysisResult } from '@/lib/github-analysis';
import { Github, Calendar, CheckCircle2, XCircle, Repeat } from 'lucide-react';

interface GitHubAnalysisCardProps {
  analysis: GitHubAnalysisResult;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function GitHubAnalysisCard({ analysis, onRefresh, isRefreshing }: GitHubAnalysisCardProps) {
  const topLanguages = analysis.languages.slice(0, 5);
  const activeText = analysis.isActive ? '최근 3개월 내 활동' : '최근 3개월 활동 없음';

  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 mt-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Github className="w-4 h-4 text-gray-700" />
          <a
            href={analysis.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
          >
            {analysis.fullName}
          </a>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${analysis.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-600'}`}>
            {activeText}
          </span>
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
              aria-label="GitHub 분석 새로고침"
            >
              <Repeat className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {topLanguages.length > 0 && (
        <div className="mt-3 space-y-2">
          <p className="text-xs font-medium text-gray-500">주요 사용 언어</p>
          <div className="space-y-1.5">
            {topLanguages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-2">
                <span className="text-xs text-gray-600 w-16 shrink-0 truncate">{lang.name}</span>
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${Math.min(lang.percentage, 100)}%` }}
                  />
                </div>
                <span className="text-[11px] text-gray-500 w-10 text-right">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="bg-white rounded-lg p-2.5 border border-gray-100">
          <p className="text-xs text-gray-400">총 커밋</p>
          <p className="text-sm font-semibold text-gray-800">{analysis.totalCommits ?? '-'}</p>
        </div>
        <div className="bg-white rounded-lg p-2.5 border border-gray-100">
          <p className="text-xs text-gray-400">README</p>
          <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
            {analysis.hasReadme ? <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 있음</> : <><XCircle className="w-3.5 h-3.5 text-gray-400" /> 없음</>}
          </div>
        </div>
        <div className="bg-white rounded-lg p-2.5 border border-gray-100">
          <p className="text-xs text-gray-400">라이선스</p>
          <p className="text-sm font-semibold text-gray-800 truncate">{analysis.license ?? '-'}</p>
        </div>
        <div className="bg-white rounded-lg p-2.5 border border-gray-100">
          <p className="text-xs text-gray-400">최근 푸시</p>
          <p className="text-xs text-gray-700 truncate">{new Date(analysis.pushedAt).toLocaleDateString('ko-KR')}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
        <Calendar className="w-3 h-3" />
        마지막 분석: {new Date(analysis.fetchedAt).toLocaleString('ko-KR')}
      </div>
    </div>
  );
}
