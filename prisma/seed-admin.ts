import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@admin.com';
  const password = 'admin1234!';

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log('어드민 계정이 이미 존재합니다:', email);
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      name: '관리자',
      role: 'ADMIN',
      skills: '[]',
    },
  });

  console.log('어드민 계정 생성 완료!');
  console.log('이메일:', user.email);
  console.log('비밀번호:', password);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
