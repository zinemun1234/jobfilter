import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ProfileForm from '@/components/profile/ProfileForm';
import { User } from '@/types';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect('/login');

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, email: true, name: true, major: true, targetJob: true, skills: true, role: true, createdAt: true, updatedAt: true },
  });

  if (!dbUser) redirect('/login');

  const user: User = {
    ...dbUser,
    name: dbUser.name ?? null,
    major: dbUser.major ?? null,
    targetJob: dbUser.targetJob ?? null,
    role: dbUser.role,
    skills: (() => { try { return JSON.parse(dbUser.skills as string); } catch { return []; } })(),
  };

  return (
    <div className="min-h-full bg-gray-50/50">
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        <div className="border-b border-gray-200 pb-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Settings</p>
          <h1 className="text-xl font-semibold text-gray-900">프로필 설정</h1>
          <p className="text-sm text-gray-400 mt-1">전공, 목표 직무, 기술 스택을 설정하면 맞춤 공고와 코칭에 활용됩니다</p>
        </div>
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
