/**
 * GET /api/admin/stats?from=YYYY-MM-DD&to=YYYY-MM-DD
 * 관리자 통계 대시보드 데이터 (ADMIN 전용)
 *
 * from/to 파라미터가 없으면 전체 기간(all-time)으로 조회한다.
 */
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
import { getAdminStats } from '@/lib/admin-stats';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
  } catch (error) {
    return handleApiError(error);
  }

  const { searchParams } = request.nextUrl;
  const from = searchParams.get('from') ?? '';
  const to = searchParams.get('to') ?? '';

  try {
    const data = await getAdminStats(from, to);
    return NextResponse.json({ data });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
