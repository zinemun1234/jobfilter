import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { analyzeText, calculateWeightedScore, type FeedbackItem } from '@/lib/cover-letter-analysis';
import { prisma } from '@/lib/prisma';

// 재분석 비교
function compareWithPrevious(
  current: FeedbackItem[],
  previous: FeedbackItem[]
): { resolved: string[]; remaining: string[]; new: string[]; score: number } {
  const prevWarnings = previous.filter(f => f.level !== 'good').map(f => f.category);
  const currWarnings = current.filter(f => f.level !== 'good').map(f => f.category);
  const currGood = current.filter(f => f.level === 'good').map(f => f.category);

  const resolved = prevWarnings.filter(cat => currGood.includes(cat));
  const remaining = prevWarnings.filter(cat => currWarnings.includes(cat));
  const newIssues = currWarnings.filter(cat => !prevWarnings.includes(cat));

  const total = prevWarnings.length;
  const score = total > 0 ? Math.round((resolved.length / total) * 100) : 0;

  return { resolved, remaining, new: newIssues, score };
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const {
    text,
    category = '',
    targetJob,
    skills = [],
    previousFeedback,
    coverLetterId, // 점수 저장용 (선택)
  } = body;

  if (!text || text.trim().length < 30) {
    return NextResponse.json({ error: '30자 이상 입력하세요' }, { status: 400 });
  }

  // 1. 기본 키워드 분석 (11가지 항목)
  const feedback = analyzeText(text, category);

  // 2. 프로필 기반 개인화 피드백
  const personalizedFeedback: FeedbackItem[] = [];

  if (targetJob && skills.length > 0) {
    const textLower = text.toLowerCase();
    const mentionedSkills = skills.filter((s: string) => textLower.includes(s.toLowerCase()));
    const missingSkills = skills.filter((s: string) => !textLower.includes(s.toLowerCase()));

    if (mentionedSkills.length > 0) {
      personalizedFeedback.push({
        level: 'good',
        category: '기술 스택 어필',
        weight: 0,
        message: `보유 기술 ${mentionedSkills.slice(0, 3).join(', ')}이 자소서에 언급되어 있습니다`,
      });
    }

    if (missingSkills.length > 0) {
      personalizedFeedback.push({
        level: 'warn',
        category: '기술 스택 어필',
        weight: 0,
        message: `프로필 기술 스택 중 미언급: ${missingSkills.slice(0, 3).join(', ')}`,
        suggestion: `${targetJob} 지원 시 보유 기술인 ${missingSkills[0]}을 활용한 경험을 구체적으로 서술하면 강점이 됩니다`,
      });
    }
  }

  // 3. 심층 분석 — 반복 단어, 문단 구조, 부정적 표현
  const deepFeedback: FeedbackItem[] = [];

  // 반복 단어 감지
  const words = text.replace(/[^가-힣a-zA-Z\s]/g, '').split(/\s+/).filter((w: string) => w.length > 2);
  const wordCount: Record<string, number> = {};
  words.forEach((w: string) => { wordCount[w] = (wordCount[w] ?? 0) + 1; });
  const repeated = Object.entries(wordCount)
    .filter(([, cnt]) => cnt >= 4)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([w]) => w);

  if (repeated.length > 0) {
    deepFeedback.push({
      level: 'warn',
      category: '반복 표현',
      weight: 0,
      message: `"${repeated[0]}" 등 반복 단어 발견 (${wordCount[repeated[0]]}회)`,
      suggestion: '같은 단어를 반복하면 단조롭게 느껴집니다. 유사어나 다른 표현으로 바꿔보세요.',
    });
  }

  // 문단 수 체크
  const paragraphs = text.split(/\n\n+/).filter((p: string) => p.trim().length > 0);
  if (paragraphs.length === 1 && text.length > 400) {
    deepFeedback.push({
      level: 'warn',
      category: '문단 구조',
      weight: 0,
      message: '문단 구분이 없습니다',
      suggestion: '내용을 2~3개 문단으로 나누면 가독성이 높아집니다. 도입 → 경험 → 마무리 구조를 추천합니다.',
    });
  }

  const allFeedback = [...feedback, ...personalizedFeedback, ...deepFeedback];

  // 5. 재분석 비교
  let comparison = null;
  if (previousFeedback && Array.isArray(previousFeedback) && previousFeedback.length > 0) {
    comparison = compareWithPrevious(allFeedback, previousFeedback);
  }

  // 6. 가중치 기반 점수 계산
  const overallScore = calculateWeightedScore(allFeedback);

  // 7. 분석 점수 DB 저장 (coverLetterId가 있을 때만)
  if (coverLetterId) {
    try {
      const existing = await (prisma.coverLetter as unknown as {
        findUnique: (args: unknown) => Promise<{ version: number; analysisHistory?: string | null } | null>
      }).findUnique({
        where: { id: coverLetterId, userId: session.user.id },
        select: { version: true, analysisHistory: true },
      });

      if (existing) {
        const goodCount = allFeedback.filter(f => f.level === 'good').length;
        const warnCount = allFeedback.filter(f => f.level === 'warn').length;
        const badCount = allFeedback.filter(f => f.level === 'bad').length;

        // 기존 히스토리 파싱
        let history: Array<{ version: number; score: number; date: string; goodCount: number; warnCount: number; badCount: number }> = [];
        try {
          const raw = (existing as Record<string, unknown>).analysisHistory;
          history = raw ? JSON.parse(raw as string) : [];
        } catch { history = []; }

        // 새 항목 추가 (같은 버전이면 덮어쓰기)
        const newEntry = {
          version: existing.version,
          score: overallScore,
          date: new Date().toISOString(),
          goodCount,
          warnCount,
          badCount,
        };
        const filtered = history.filter(h => h.version !== existing.version);
        const updatedHistory = [...filtered, newEntry].sort((a, b) => a.version - b.version);

        await (prisma.coverLetter as unknown as { update: (args: unknown) => Promise<unknown> }).update({
          where: { id: coverLetterId },
          data: {
            analysisScore: overallScore,
            analysisHistory: JSON.stringify(updatedHistory),
          },
        });
      }
    } catch {
      // 저장 실패해도 분석 결과는 정상 반환
    }
  }

  return NextResponse.json({
    data: {
      feedback: allFeedback,
      overallScore,
      comparison,
      analyzedAt: new Date().toISOString(),
    },
  });
}
