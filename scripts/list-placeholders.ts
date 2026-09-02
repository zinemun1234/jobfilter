import { prisma } from '@/lib/prisma';
import logger from '@/lib/logger';

async function main() {
  const coverLetters = await prisma.coverLetter.findMany({
    where: {
      OR: [
        { company: { in: ['1', '11', '1234'] } },
        { position: { in: ['1', '11', '1234'] } },
        { items: { contains: '"1"' } },
      ],
    },
    select: { id: true, company: true, position: true, items: true, createdAt: true },
    take: 10,
  });

  const notices = await prisma.notice.findMany({
    where: { OR: [{ title: { in: ['1', '11', '1234'] } }, { content: { in: ['1', '11', '1234'] } }] },
    select: { id: true, title: true, content: true },
    take: 10,
  });

  const questions = await prisma.interviewQuestion.findMany({
    where: { question: { in: ['1', '11', '1234'] } },
    select: { id: true, question: true, category: true, jobType: true, isDefault: true },
    take: 10,
  });

  const employments = await prisma.employmentRecord.findMany({
    where: {
      OR: [
        { company: { in: ['1', '11', '1234'] } },
        { position: { in: ['1', '11', '1234'] } },
      ],
    },
    select: { id: true, company: true, position: true, confirmedAt: true },
    take: 10,
  });

  const notifications = await prisma.userNotification.findMany({
    where: { OR: [{ title: { in: ['1', '11', '1234'] } }, { body: { contains: '11' } }] },
    select: { id: true, title: true, body: true, type: true },
    take: 10,
  });

  logger.info({ coverLetters, notices, questions, employments, notifications }, 'placeholder list');
}

main()
  .catch((e) => { logger.error({ err: e }, 'Placeholder 조회 실패'); process.exit(1); })
  .finally(() => prisma.$disconnect());
