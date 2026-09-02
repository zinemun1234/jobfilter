import { NextRequest, NextResponse } from 'next/server';
import { getListings } from '@/lib/server/listings';
import { checkRequestSecurity, rateLimiters } from '@/lib/security';

export const dynamic = 'force-dynamic';

// 비로그인 공개 공고 목록 — 인증 불필요, 랜딩 페이지 사용
export async function GET(req: NextRequest) {
  const security = await checkRequestSecurity(req, {
    rateLimit: true,
    requireOrigin: false,
    limiter: rateLimiters.default,
  });
  if (security) return security;

  const { searchParams } = new URL(req.url);
  const { data, total, page, pageSize, totalPages } = await getListings(searchParams);

  const publicData = data.map((l) => {
    const { isBookmarked, isApplied, matching, matchedSkills, missingSkills, reasons, priorityScore, ...publicFields } = l;
    return { ...publicFields, source: l.source };
  });

  return NextResponse.json({
    data: publicData,
    total,
    page,
    pageSize,
    totalPages,
  });
}
