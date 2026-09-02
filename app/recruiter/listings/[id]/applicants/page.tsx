import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ApplicantsClient } from './ApplicantsClient';

export default async function RecruiterApplicantsPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== 'RECRUITER') redirect('/dashboard');

  const listing = await prisma.jobListing.findFirst({
    where: { id: params.id, recruiterId: session.user.id },
    select: { id: true, company: true, position: true, isActive: true },
  });
  if (!listing) redirect('/recruiter/listings');

  const applications = await prisma.jobPosting.findMany({
    where: { listingId: params.id },
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          major: true,
          targetJob: true,
          skills: true,
        },
      },
      coverLetters: { select: { id: true, company: true, position: true, updatedAt: true }, orderBy: { updatedAt: 'desc' }, take: 3 },
      portfolios: { select: { id: true, title: true, updatedAt: true }, orderBy: { updatedAt: 'desc' }, take: 3 },
      experiences: { select: { id: true, title: true }, take: 3 },
      interviewAnswers: { select: { id: true }, take: 3 },
    },
  });

  const parsedApplications = applications.map(app => ({
    ...app,
    createdAt: app.createdAt.toISOString(),
    updatedAt: app.updatedAt.toISOString(),
    deadline: app.deadline ? app.deadline.toISOString() : null,
    interviewAt: app.interviewAt ? app.interviewAt.toISOString() : null,
    followUpAt: app.followUpAt ? app.followUpAt.toISOString() : null,
    coverLetters: app.coverLetters.map(c => ({ ...c, updatedAt: c.updatedAt.toISOString() })),
    portfolios: app.portfolios.map(p => ({ ...p, updatedAt: p.updatedAt.toISOString() })),
  })) as unknown as import('./ApplicantsClient').Application[];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Link href="/recruiter/listings" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> 공고 목록
      </Link>
      <div>
        <h1 className="text-xl font-semibold text-slate-900">지원자 관리</h1>
        <p className="text-sm text-slate-500">{listing.company} · {listing.position}</p>
      </div>
      <ApplicantsClient listingId={listing.id} applications={parsedApplications} />
    </div>
  );
}
