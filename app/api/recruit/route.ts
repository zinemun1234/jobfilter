import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// 구인자(기업)가 직접 공고를 등록하는 엔드포인트 — 인증 불필요(공개)
// 등록 후 관리자 검토 → isActive: false로 시작, 관리자가 확인 후 true로 변경

type JobInput = {
  company: string;
  position: string;
  location?: string;
  career?: string;
  employType?: string;
  salary?: string;
  deadline?: string;
  url?: string;
  description?: string;
  contactEmail?: string;
  headcount?: string;
};

async function insertJobs(jobs: JobInput[]) {
  let inserted = 0;
  let skipped = 0;

  for (const job of jobs) {
    if (!job.company?.trim() || !job.position?.trim()) { skipped++; continue; }

    // 중복 감지: company + position 기준
    const exists = await prisma.jobListing.findFirst({
      where: { company: job.company.trim(), position: job.position.trim() },
    });
    if (exists) { skipped++; continue; }

    const deadline = job.deadline ? new Date(job.deadline) : null;
    const validDeadline = deadline && !isNaN(deadline.getTime()) ? deadline : null;

    // 마감일 지난 공고는 등록 제외
    if (validDeadline && validDeadline < new Date()) { skipped++; continue; }

    const tags: string[] = [];
    if (job.description) {
      const techKeywords = ['React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'Spring',
        'TypeScript', 'JavaScript', 'SQL', 'Docker', 'AWS', 'Git', 'Linux', 'Kotlin', 'Swift'];
      techKeywords.forEach(kw => {
        if (job.description!.toLowerCase().includes(kw.toLowerCase())) tags.push(kw);
      });
    }

    const description = [
      job.description,
      job.contactEmail ? `담당자: ${job.contactEmail}` : null,
      job.headcount ? `모집인원: ${job.headcount}명` : null,
    ].filter(Boolean).join('\n\n');

    await prisma.jobListing.create({
      data: {
        company: job.company.trim(),
        position: job.position.trim(),
        location: job.location?.trim() || null,
        career: job.career?.trim() || null,
        employType: job.employType?.trim() || null,
        salary: job.salary?.trim() || null,
        deadline: validDeadline,
        url: job.url?.trim() || null,
        description: description || null,
        tags: tags.length > 0 ? JSON.stringify(tags) : null,
        source: '구인자 직접등록',
        isActive: false, // 관리자 검토 후 활성화
      },
    });
    inserted++;
  }

  return { inserted, skipped };
}

// JSON 직접 입력
export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const body = await req.json();
    const jobs: JobInput[] = Array.isArray(body.jobs) ? body.jobs : [body];
    if (jobs.length === 0) return NextResponse.json({ error: '공고 데이터가 없습니다.' }, { status: 400 });
    if (jobs.length > 50) return NextResponse.json({ error: '한 번에 최대 50건까지 등록 가능합니다.' }, { status: 400 });

    const result = await insertJobs(jobs);
    return NextResponse.json(result);
  }

  // 파일 업로드
  if (contentType.includes('multipart/form-data')) {
    const form = await req.formData();
    const file = form.get('file') as File | null;
    if (!file) return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const xlsx = await import('xlsx');
    const wb = xlsx.read(buffer, { type: 'buffer', cellDates: true });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json<string[]>(ws, { header: 1 }) as string[][];

    const jobs: JobInput[] = rows.slice(1).map(r => ({
      company: String(r[0] ?? ''),
      position: String(r[1] ?? ''),
      location: String(r[2] ?? ''),
      career: String(r[3] ?? ''),
      employType: String(r[4] ?? ''),
      salary: String(r[5] ?? ''),
      deadline: r[6] ? String(r[6]) : '',
      url: String(r[7] ?? ''),
      description: String(r[8] ?? ''),
      contactEmail: String(r[9] ?? ''),
      headcount: String(r[10] ?? ''),
    })).filter(j => j.company && j.position);

    if (jobs.length === 0) return NextResponse.json({ error: '유효한 공고 데이터가 없습니다.' }, { status: 400 });

    const result = await insertJobs(jobs);
    return NextResponse.json(result);
  }

  return NextResponse.json({ error: '지원하지 않는 Content-Type' }, { status: 415 });
}
