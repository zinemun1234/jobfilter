import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { portfolioSchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/api';
import { analyzeGitHubRepo } from '@/lib/github-analysis';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const portfolio = await prisma.portfolio.findFirst({
      where: { 
        id: params.id,
        userId: session.user.id 
      },
    });

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    const parsed = {
      ...portfolio,
      techStack: (() => { try { return JSON.parse(portfolio.techStack as string); } catch { return []; } })(),
      githubAnalysis: (() => { try { return portfolio.githubAnalysis ? JSON.parse(portfolio.githubAnalysis) : null; } catch { return null; } })(),
    };
    return NextResponse.json({ data: parsed } as ApiResponse<typeof parsed>);
  } catch (error) {
    console.error('Failed to fetch portfolio:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = portfolioSchema.parse(body);

    const existingPortfolio = await prisma.portfolio.findFirst({
      where: { 
        id: params.id,
        userId: session.user.id 
      },
    });

    if (!existingPortfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    const portfolio = await prisma.portfolio.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        jobId: validatedData.jobId || null,
        techStack: JSON.stringify(validatedData.techStack),
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
      },
    });

    const result = {
      ...portfolio,
      techStack: (() => { try { return JSON.parse(portfolio.techStack as string); } catch { return []; } })(),
      githubAnalysis: (() => { try { return portfolio.githubAnalysis ? JSON.parse(portfolio.githubAnalysis) : null; } catch { return null; } })(),
    };
    return NextResponse.json({ data: result } as ApiResponse<typeof result>);
  } catch (error) {
    console.error('Failed to update portfolio:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const portfolio = await prisma.portfolio.findFirst({
      where: { id: params.id, userId: session.user.id },
    });
    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }
    if (!portfolio.githubUrl) {
      return NextResponse.json({ error: 'GitHub URL이 등록되지 않았습니다' }, { status: 400 });
    }

    const analysis = await analyzeGitHubRepo(portfolio.githubUrl);
    if (!analysis) {
      return NextResponse.json({ error: 'GitHub 분석에 실패했습니다. 공개 저장소인지 확인해주세요.' }, { status: 400 });
    }

    const updated = await prisma.portfolio.update({
      where: { id: params.id },
      data: {
        githubAnalysis: JSON.stringify(analysis),
        githubAnalysisFetchedAt: new Date(),
      },
    });

    const result = {
      ...updated,
      techStack: (() => { try { return JSON.parse(updated.techStack as string); } catch { return []; } })(),
      githubAnalysis: analysis,
    };
    return NextResponse.json({ data: result } as ApiResponse<typeof result>);
  } catch (error) {
    console.error('Failed to analyze portfolio:', error);
    return NextResponse.json({ error: 'Failed to analyze portfolio' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existingPortfolio = await prisma.portfolio.findFirst({
      where: { 
        id: params.id,
        userId: session.user.id 
      },
    });

    if (!existingPortfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    await prisma.portfolio.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ data: { success: true } } as ApiResponse<{ success: boolean }>);
  } catch (error) {
    console.error('Failed to delete portfolio:', error);
    return NextResponse.json({ error: 'Failed to delete portfolio' }, { status: 500 });
  }
}
