import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export const revalidate = 300; // 5분 캐시

export default async function EmbedWidgetPage({
  searchParams,
}: {
  searchParams: { limit?: string; from?: string };
}) {
  const limit = Math.min(parseInt(searchParams.limit ?? '8', 10), 20);

  const listings = await prisma.jobListing.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
    select: {
      id: true,
      company: true,
      position: true,
      career: true,
      employType: true,
      deadline: true,
      tags: true,
      createdAt: true,
    },
  });

  const baseUrl = process.env.NEXTAUTH_URL ?? '';
  const from = searchParams.from ?? '';

  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Malgun Gothic', sans-serif; background: #fff; }
          .widget { padding: 12px; }
          .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #f1f5f9; }
          .header-title { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; }
          .header-count { font-size: 11px; color: #94a3b8; }
          .list { display: flex; flex-direction: column; gap: 1px; }
          .item { display: flex; align-items: center; justify-content: space-between; padding: 8px 6px; border-radius: 6px; text-decoration: none; color: inherit; transition: background 0.15s; }
          .item:hover { background: #f8fafc; }
          .item-left { flex: 1; min-width: 0; }
          .company { font-size: 12px; font-weight: 600; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .position { font-size: 11px; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 1px; }
          .item-right { display: flex; align-items: center; gap: 6px; flex-shrink: 0; margin-left: 8px; }
          .badge-new { font-size: 9px; font-weight: 700; background: #3b82f6; color: #fff; padding: 1px 5px; border-radius: 9999px; }
          .badge-d { font-size: 11px; font-weight: 700; color: #f59e0b; font-variant-numeric: tabular-nums; }
          .badge-d.urgent { color: #ef4444; }
          .footer { margin-top: 10px; padding-top: 8px; border-top: 1px solid #f1f5f9; text-align: center; }
          .footer a { font-size: 11px; color: #3b82f6; text-decoration: none; font-weight: 600; }
          .footer a:hover { text-decoration: underline; }
          .empty { text-align: center; padding: 24px 0; font-size: 12px; color: #94a3b8; }
        `}</style>
      </head>
      <body>
        <div className="widget">
          <div className="header">
            <span className="header-title">CS 맞춤 채용공고</span>
            <span className="header-count">{listings.length}건</span>
          </div>

          {listings.length === 0 ? (
            <div className="empty">등록된 공고가 없습니다</div>
          ) : (
            <div className="list">
              {listings.map(l => {
                const deadline = l.deadline ? new Date(l.deadline) : null;
                const daysLeft = deadline
                  ? Math.ceil((deadline.getTime() - Date.now()) / 86400000)
                  : null;
                const isNew = Date.now() - new Date(l.createdAt).getTime() < 7 * 86400000;
                const isUrgent = daysLeft !== null && daysLeft <= 3;
                const detailUrl = `${baseUrl}/listings/${l.id}${from ? `?from=${from}` : ''}`;

                return (
                  <a key={l.id} href={detailUrl} target="_blank" rel="noopener noreferrer" className="item">
                    <div className="item-left">
                      <div className="company">{l.company}</div>
                      <div className="position">
                        {l.position}
                        {l.career ? ` · ${l.career}` : ''}
                        {l.employType ? ` · ${l.employType}` : ''}
                      </div>
                    </div>
                    <div className="item-right">
                      {isNew && <span className="badge-new">NEW</span>}
                      {daysLeft !== null && daysLeft >= 0 && (
                        <span className={`badge-d${isUrgent ? ' urgent' : ''}`}>
                          {daysLeft === 0 ? 'D-Day' : `D-${daysLeft}`}
                        </span>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          <div className="footer">
            <a href={`${baseUrl}/listings${from ? `?from=${from}` : ''}`} target="_blank" rel="noopener noreferrer">
              전체 공고 보기 →
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
