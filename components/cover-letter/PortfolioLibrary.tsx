'use client';

import { useQuery } from '@tanstack/react-query';
import { FolderKanban, Check, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

type Portfolio = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string | null;
  deployUrl?: string | null;
};

type PortfolioLibraryProps = {
  onInsertAction: (portfolio: Portfolio) => void;
};

export default function PortfolioLibrary({ onInsertAction }: PortfolioLibraryProps) {
  const { data: portfolios = [], isLoading } = useQuery<Portfolio[]>({
    queryKey: ['portfolios'],
    queryFn: async () => {
      const response = await fetch('/api/portfolio');
      if (!response.ok) throw new Error('Failed to fetch portfolios');
      return (await response.json()).data;
    },
  });

  const insert = (portfolio: Portfolio) => {
    onInsertAction(portfolio);
    toast.success('포트폴리오 정보를 삽입했습니다');
  };

  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <FolderKanban className="w-4 h-4 text-blue-600" />
        <div>
          <p className="text-xs font-semibold text-blue-700">포트폴리오</p>
          <p className="text-xs text-blue-600">프로젝트 요약과 기술 스택을 자소서에 삽입하세요.</p>
        </div>
      </div>

      {isLoading ? (
        <p className="text-[11px] text-gray-400">포트폴리오를 불러오는 중...</p>
      ) : portfolios.length === 0 ? (
        <p className="text-[11px] text-gray-500">등록된 포트폴리오가 없습니다.</p>
      ) : (
        <div className="space-y-2 max-h-52 overflow-y-auto">
          {portfolios.map((portfolio) => (
            <div key={portfolio.id} className="rounded-lg border border-blue-100 bg-white px-3 py-2.5">
              <div className="flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-700 truncate">{portfolio.title}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{portfolio.description}</p>
                  {portfolio.techStack.length > 0 && (
                    <p className="text-xs text-blue-600 mt-1">{portfolio.techStack.join(', ')}</p>
                  )}
                  <div className="flex items-center gap-2 mt-1.5">
                    {portfolio.githubUrl && (
                      <a
                        href={portfolio.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[10px] text-gray-400 hover:text-blue-600"
                      >
                        <ExternalLink className="w-3 h-3" /> GitHub
                      </a>
                    )}
                    {portfolio.deployUrl && (
                      <a
                        href={portfolio.deployUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[10px] text-gray-400 hover:text-blue-600"
                      >
                        <ExternalLink className="w-3 h-3" /> 배포
                      </a>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => insert(portfolio)}
                  className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
                >
                  <Check className="w-3 h-3" /> 삽입
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
