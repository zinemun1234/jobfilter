import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// êµ¬ì¸??ê¸°ì—…)ê°€ ì§ì ‘ ê³µê³ ë¥??±ë¡?˜ëŠ” ?¸ë? ?”ë“œ?¬ì¸?????¸ì¦ ë¶ˆí•„??(ê³µê°œ)
// ?±ë¡ ??ê´€ë¦¬ì ê²€????isActive: falseë¡??œì‘, ê´€ë¦¬ìê°€ ?¹ì¸ ??trueë¡?ë³€ê²?

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

    // ì¤‘ë³µ ê°ì?: company + position ê¸°ì?
    const exists = await prisma.jobListing.findFirst({
      where: { company: job.company.trim(), position: job.position.trim() },
    });
    if (exists) { skipped++; continue; }

    const deadline = job.deadline ? new Date(job.deadline) : null;
    const validDeadline = deadline && !isNaN(deadline.getTime()) ? deadline : null;

    // ë§ˆê°??ì§€??ê³µê³ ???±ë¡ ?œì™¸
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
      job.contactEmail ? `?´ë‹¹?? ${job.contactEmail}` : null,
      job.headcount ? `ëª¨ì§‘?¸ì›: ${job.headcount}ëª? : null,
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
        source: 'êµ¬ì¸??ì§ì ‘?±ë¡',
        isActive: false, // ê´€ë¦¬ì ê²€?????œì„±??
      },
    });
    inserted++;
  }

  return { inserted, skipped };
}

// JSON ì§ì ‘ ?…ë ¥
export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const body = await req.json();
    const jobs: JobInput[] = Array.isArray(body.jobs) ? body.jobs : [body];
    if (jobs.length === 0) return NextResponse.json({ error: 'ê³µê³  ?°ì´?°ê? ?†ìŠµ?ˆë‹¤' }, { status: 400 });
    if (jobs.length > 50) return NextResponse.json({ error: '??ë²ˆì— ìµœë? 50ê±´ê¹Œì§€ ?±ë¡ ê°€?¥í•©?ˆë‹¤' }, { status: 400 });

    const result = await insertJobs(jobs);
    return NextResponse.json(result);
  }

  // ?‘ì? ?…ë¡œ??
  if (contentType.includes('multipart/form-data')) {
    const form = await req.formData();
    const file = form.get('file') as File | null;
    if (!file) return NextResponse.json({ error: '?Œì¼???†ìŠµ?ˆë‹¤' }, { status: 400 });

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

    if (jobs.length === 0) return NextResponse.json({ error: '? íš¨??ê³µê³  ?°ì´?°ê? ?†ìŠµ?ˆë‹¤' }, { status: 400 });

    const result = await insertJobs(jobs);
    return NextResponse.json(result);
  }

  return NextResponse.json({ error: 'ì§€?í•˜ì§€ ?ŠëŠ” Content-Type' }, { status: 415 });
}
