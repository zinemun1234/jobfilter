/**
 * GET /api/admin/reports?from=YYYY-MM-DD&to=YYYY-MM-DD&format=csv|json
 * 관리자 통계 리포트 export (ADMIN 전용)
 */
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
import { getAdminStats, toStatsCsv } from '@/lib/admin-stats';

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
  const format = searchParams.get('format') ?? 'csv';

  if (format !== 'csv' && format !== 'json') {
    return NextResponse.json({ error: 'Invalid format' }, { status: 400 });
  }

  try {
    const data = await getAdminStats(from, to);

    if (format === 'json') {
      return NextResponse.json({ data });
    }

    const csv = toStatsCsv(data);
    const filename = `admin-report-${from || 'all'}-${to || 'all'}.csv`;

    return new NextResponse('\ufeff' + csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
