import { NextRequest } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const MIME_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.pdf': 'application/pdf',
};

/**
 * GET /api/uploads/:path*
 * uploads/ 디렉터리의 런타임 업로드 파일을 서빙합니다.
 * - public/은 next build 시점에 복사되므로 런타임 업로드 파일은 별도 서빙 필요
 * - directory traversal 방지
 */
export async function GET(_req: NextRequest, { params }: { params: { path: string[] } }) {
  const segments = params.path.map(s => s.replace(/[\/\\]/g, '').replace(/\0/g, '')).filter(Boolean);
  if (segments.length === 0) return new Response('Not found', { status: 404 });

  const relativePath = path.join(...segments);
  const fullPath = path.join(process.cwd(), 'uploads', relativePath);

  // directory traversal guard
  const resolvedRoot = path.resolve(path.join(process.cwd(), 'uploads'));
  const resolvedFile = path.resolve(fullPath);
  if (!resolvedFile.startsWith(resolvedRoot + path.sep) && resolvedFile !== resolvedRoot) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const file = await readFile(fullPath);
    const ext = path.extname(relativePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    return new Response(file, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
