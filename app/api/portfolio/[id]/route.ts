import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { portfolioSchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/api';

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

    return NextResponse.json({ data: portfolio } as ApiResponse<typeof portfolio>);
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
        techStack: JSON.stringify(validatedData.techStack),
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
      },
    });

    const result = { ...portfolio, techStack: (() => { try { return JSON.parse(portfolio.techStack as string); } catch { return []; } })() };
    return NextResponse.json({ data: result } as ApiResponse<typeof result>);
  } catch (error) {
    console.error('Failed to update portfolio:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 });
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
