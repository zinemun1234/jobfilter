/**
 * GET /api/interview/answers
 * 로그인 유저의 모든 면접 답변을 질문 정보와 함께 반환한다.
 *
 * POST /api/interview/answers
 * 면접 답변을 저장하거나 업데이트한다 (upsert).
 *
 * 임시 ID 처리:
 * 기본 질문(default-), 랜덤 질문(random-), 목업 질문(mock-) 접두사를 가진
 * 임시 ID는 실제 DB 레코드로 변환 후 저장한다.
 * questionText로 기존 레코드를 찾거나 없으면 새로 생성한다.
 */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ApiResponse } from '@/lib/api';
import { z } from 'zod';

const answerSchema = z.object({
  questionId: z.string(),
  answer: z.string().min(1),
  // Optional fields for resolving temp IDs (default-/random-/mock- prefixes)
  questionText: z.string().optional(),
  questionCategory: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const answers = await prisma.interviewAnswer.findMany({
      where: { userId: session.user.id },
      include: { question: true },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ data: answers } as ApiResponse<typeof answers>);
  } catch (error) {
    console.error('Failed to fetch interview answers:', error);
    return NextResponse.json({ error: 'Failed to fetch interview answers' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = answerSchema.parse(body);

    let questionId = validatedData.questionId;
    const isTempId = questionId.startsWith('default-') || questionId.startsWith('random-') || questionId.startsWith('mock-');

    if (isTempId) {
      // Resolve temp ID → real question record
      // Use provided questionText/category if available, otherwise parse from ID
      let category = validatedData.questionCategory || 'TECHNICAL';
      let questionText = validatedData.questionText || '';

      if (!questionText) {
        // Fallback: parse from ID format "default-CATEGORY-questiontext"
        const withoutPrefix = questionId.replace(/^(default|random|mock)-/, '');
        const dashIdx = withoutPrefix.indexOf('-');
        if (dashIdx > -1) {
          category = withoutPrefix.slice(0, dashIdx);
          questionText = withoutPrefix.slice(dashIdx + 1);
        }
      }

      if (!questionText) {
        return NextResponse.json({ error: 'Question text is required for default questions' }, { status: 400 });
      }

      // Find or create the question by exact text match for this user
      const existing = await prisma.interviewQuestion.findFirst({
        where: { userId: session.user.id, question: questionText },
      });

      if (existing) {
        questionId = existing.id;
      } else {
        const created = await prisma.interviewQuestion.create({
          data: {
            category,
            question: questionText,
            isDefault: false,
            userId: session.user.id,
          },
        });
        questionId = created.id;
      }
    }

    const answer = await prisma.interviewAnswer.upsert({
      where: {
        userId_questionId: {
          userId: session.user.id,
          questionId,
        },
      },
      update: { answer: validatedData.answer },
      create: {
        userId: session.user.id,
        questionId,
        answer: validatedData.answer,
      },
      include: { question: true },
    });

    return NextResponse.json({ data: answer } as ApiResponse<typeof answer>);
  } catch (error) {
    console.error('Failed to save interview answer:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to save interview answer' }, { status: 500 });
  }
}
