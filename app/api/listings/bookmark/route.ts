import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET — 내 북마크 목록
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const bookmarks = await prisma.jobBookmark.findMany({
    where: { userId: session.user.id },
    include: { listing: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({
    data: bookmarks.map(b => ({
      ...b.listing,
      tags: (() => { try { return b.listing.tags ? JSON.parse(b.listing.tags) : []; } catch { return []; } })(),
      bookmarkedAt: b.createdAt,
    })),
  });
}

// POST — 북마크 토글 (있으면 삭제, 없으면 추가)
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { listingId } = await req.json();
  if (!listingId) return NextResponse.json({ error: 'listingId required' }, { status: 400 });

  const existing = await prisma.jobBookmark.findUnique({
    where: { userId_listingId: { userId: session.user.id, listingId } },
  });

  if (existing) {
    await prisma.jobBookmark.delete({ where: { id: existing.id } });
    return NextResponse.json({ data: { bookmarked: false } });
  } else {
    await prisma.jobBookmark.create({ data: { userId: session.user.id, listingId } });
    return NextResponse.json({ data: { bookmarked: true } });
  }
}
