import { NextRequest, NextResponse } from 'next/server';
import { getListings } from '@/lib/server/listings';

export const dynamic = 'force-dynamic';

// 비로그인 공개 공고 목록 — 인증 불필요, 랜딩 페이지 사용
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const { data, total, page, pageSize, totalPages } = await getListings(searchParams);

  const publicData = data.map((l) => {
    const { isBookmarked, isApplied, matching, matchedSkills, missingSkills, reasons, priorityScore, ...publicFields } = l;
    return publicFields;
  });

  return NextResponse.json({
    data: publicData,
    total,
    page,
    pageSize,
    totalPages,
  });
}
