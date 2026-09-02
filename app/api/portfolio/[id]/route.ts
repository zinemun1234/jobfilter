import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { portfolioSchema } from '@/lib/validations';
import { ApiResponse, sanitizePortfolio } from '@/lib/api';
import { createAuditLog } from '@/lib/audit-log';
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

    const parsed = sanitizePortfolio({
      ...portfolio,
      techStack: (() => { try { return JSON.parse(portfolio.techStack as string); } catch { return []; } })(),
      githubAnalysis: (() => { try { return portfolio.githubAnalysis ? JSON.parse(portfolio.githubAnalysis) : null; } catch { return null; } })(),
    });
    return NextResponse.json({ data: parsed } as ApiResponse<typeof parsed>);
  } catch (error) {
    logger.error({ err: error }, 'Failed to fetch portfolio');
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
        startDate: validatedData.startDate ? new Date(validatedData.startDate) : existingPortfolio.startDate,
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
      },
    });

    const result = sanitizePortfolio({
      ...portfolio,
      techStack: (() => { try { return JSON.parse(portfolio.techStack as string); } catch { return []; } })(),
      githubAnalysis: (() => { try { return portfolio.githubAnalysis ? JSON.parse(portfolio.githubAnalysis) : null; } catch { return null; } })(),
    });
    return NextResponse.json({ data: result } as ApiResponse<typeof result>);
  } catch (error) {
    logger.error({ err: error }, 'Failed to update portfolio');
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

    const result = sanitizePortfolio({
      ...updated,
      techStack: (() => { try { return JSON.parse(updated.techStack as string); } catch { return []; } })(),
      githubAnalysis: analysis,
    });
    return NextResponse.json({ data: result } as ApiResponse<typeof result>);
  } catch (error) {
    logger.error({ err: error }, 'Failed to analyze portfolio');
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

    await createAuditLog({
      userId: session.user.id,
      action: 'DELETE_PORTFOLIO',
      resource: 'Portfolio',
      resourceId: params.id,
      details: { id: params.id, title: existingPortfolio.title },
      request,
    });

    await prisma.portfolio.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ data: { success: true } } as ApiResponse<{ success: boolean }>);
  } catch (error) {
    logger.error({ err: error }, 'Failed to delete portfolio');
    return NextResponse.json({ error: 'Failed to delete portfolio' }, { status: 500 });
  }
}
