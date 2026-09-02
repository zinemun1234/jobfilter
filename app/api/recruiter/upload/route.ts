import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { requireRecruiter } from '@/lib/api';

export const dynamic = 'force-dynamic';

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
];

const MAX_SIZE = 5 * 1024 * 1024;

/**
 * POST /api/recruiter/upload
 * 기업 회원 전용 파일 업로드 (로고/첨부파일)
 * - public/uploads/recruiters/<userId>/<filename>에 저장
 * - 운영 환경에서는 Supabase Storage, S3, Vercel Blob 등 오브젝트 스토리지로 교체 권장
 */
export async function POST(req: NextRequest) {
  try {
    const { userId } = await requireRecruiter();
    const form = await req.formData();
    const file = form.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: '파일이 없습니다' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: '허용되지 않는 파일 형식입니다 (jpg, png, webp, gif, pdf)' },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: '파일 크기는 5MB 이하여야 합니다' },
        { status: 413 },
      );
    }

    const ext = path.extname(file.name) || '.bin';
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const userDir = path.join(process.cwd(), 'uploads', 'recruiters', userId);
    await mkdir(userDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(userDir, safeName);
    await writeFile(filePath, buffer);

    const url = `/api/uploads/recruiters/${userId}/${safeName}`;
    return NextResponse.json({ data: { id: safeName, url, name: file.name, size: file.size } });
  } catch (error) {
    logger.error({ err: error }, 'Recruiter upload error');
    return NextResponse.json({ error: '업로드에 실패했습니다' }, { status: 500 });
  }
}
