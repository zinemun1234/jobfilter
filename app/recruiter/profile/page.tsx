import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { UpdateRecruiterProfile } from './UpdateRecruiterProfile';

export default async function RecruiterProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== 'RECRUITER') redirect('/dashboard');

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { companyName: true, companyDesc: true, companyLogoUrl: true, companyAttachments: true, email: true, name: true, isApproved: true },
  });

  if (!user) redirect('/login');

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">기업 정보</h1>
        <p className="text-sm text-slate-500">기업명과 소개를 관리하세요.</p>
      </div>
      <UpdateRecruiterProfile user={user} />
    </div>
  );
}
