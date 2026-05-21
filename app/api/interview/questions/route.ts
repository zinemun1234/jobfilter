/**
 * GET /api/interview/questions
 * 면접 질문 목록 조회
 * - random=true: 모의 면접용 — 템플릿 질문 + 커스텀 질문 섞어서 count개 반환
 * - 일반 조회: 템플릿 기본 질문 + 내 커스텀 질문 합쳐서 반환
 * - category, jobType 파라미터로 필터링 가능
 * - 기본 질문은 임시 ID(default-CATEGORY-text) 형태로 반환
 *
 * POST /api/interview/questions
 * 커스텀 질문 생성 (Zod interviewQuestionSchema 검증)
 */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { interviewQuestionSchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/api';
import { getInterviewQuestions, getRandomQuestions } from '@/lib/interview-questions';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as any;
    const jobType = searchParams.get('jobType');
    const random = searchParams.get('random') === 'true';
    const count = parseInt(searchParams.get('count') || '10');

    // Custom questions from DB
    const customQuestions = await prisma.interviewQuestion.findMany({
      where: {
        userId: session.user.id,
        ...(category && { category }),
        ...(jobType && { jobType }),
      },
      include: {
        answers: {
          where: { userId: session.user.id },
        },
      },
    });

    if (random) {
      // For mock interview: mix template questions + user's custom questions
      const templateQuestions = getRandomQuestions(Math.max(count - customQuestions.length, 5), category, jobType ?? undefined);
      const templateMapped = templateQuestions.map(t => ({
        id: `default-${t.category}-${t.question.slice(0, 30)}`,
        category: t.category,
        jobType: t.jobType ?? null,
        question: t.question,
        isDefault: true,
        userId: null,
        answers: [],
      }));

      // Shuffle combined list
      const combined = [...customQuestions, ...templateMapped].sort(() => Math.random() - 0.5);
      return NextResponse.json({ data: combined.slice(0, count) } as ApiResponse<typeof combined>);
    }

    // Normal listing: default templates + custom questions
    const templates = getInterviewQuestions(category, jobType ?? undefined);
    const defaultQuestions = templates.map(t => ({
      id: `default-${t.category}-${t.question.slice(0, 30)}`,
      category: t.category,
      jobType: t.jobType ?? null,
      question: t.question,
      isDefault: true,
      userId: null,
      answers: [],
    }));

    const questions = [...defaultQuestions, ...customQuestions];
    return NextResponse.json({ data: questions } as ApiResponse<typeof questions>);
  } catch (error) {
    console.error('Failed to fetch interview questions:', error);
    return NextResponse.json({ error: 'Failed to fetch interview questions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = interviewQuestionSchema.parse(body);

    const question = await prisma.interviewQuestion.create({
      data: {
        ...validatedData,
        userId: session.user.id,
        isDefault: false,
      },
    });

    return NextResponse.json({ data: question } as ApiResponse<typeof question>, { status: 201 });
  } catch (error) {
    console.error('Failed to create interview question:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create interview question' }, { status: 500 });
  }
}
