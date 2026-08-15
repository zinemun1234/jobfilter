import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { portfolioSchema } from '@/lib/validations';
import { ApiResponse, sanitizePortfolio } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const portfolios = await prisma.portfolio.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    });

    const parsed = portfolios.map((p) =>
      sanitizePortfolio({
        ...p,
        techStack: (() => {
          try {
            return JSON.parse(p.techStack as string);
          } catch {
            return [];
          }
        })(),
        githubAnalysis: (() => {
          try {
            return p.githubAnalysis ? JSON.parse(p.githubAnalysis) : null;
          } catch {
            return null;
          }
        })(),
      })
    );

    return NextResponse.json({ data: parsed });
  } catch (error) {
    console.error('Failed to fetch portfolios:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolios' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = portfolioSchema.parse(body);

    const portfolio = await prisma.portfolio.create({
      data: {
        ...validatedData,
        jobId: validatedData.jobId || null,
        techStack: JSON.stringify(validatedData.techStack), // JSON string for SQLite compatibility
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        userId: session.user.id,
      },
    });

    const result = {
      ...portfolio,
      techStack: validatedData.techStack,
      githubAnalysis: null,
    };

    return NextResponse.json({ data: sanitizePortfolio(result) } as ApiResponse<typeof result>, { status: 201 });
  } catch (error) {
    console.error('Failed to create portfolio:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create portfolio' }, { status: 500 });
  }
}
