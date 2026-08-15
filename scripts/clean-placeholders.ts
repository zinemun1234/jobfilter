import { prisma } from '@/lib/prisma';

async function main() {
  // 1. 자소서: company/position이 '1'인 경우 데모 문구로 교체
  const badCoverLetters = await prisma.coverLetter.findMany({
    where: {
      OR: [
        { company: { in: ['1', '11', '1234'] } },
        { position: { in: ['1', '11', '1234'] } },
        { items: { contains: '"1"' } },
      ],
    },
  });

  for (const cl of badCoverLetters) {
    const isFrontend = cl.items.includes('프론트엔드');
    const position = isFrontend ? '프론트엔드 개발자' : '백엔드 개발자';
    const company = cl.company === '1' ? '샘플 IT 기업' : cl.company;

    let items: { question: string; answer: string }[] = [];
    try {
      items = JSON.parse(cl.items);
    } catch { /* ignore */ }

    const newItems = items.map((it, idx) => ({
      ...it,
      question: it.question === '1' ? '지원 동기 및 해당 직무에 관심을 갖게 된 계기를 작성해주세요.' : it.question,
      answer: it.answer === '1'
        ? (idx === 0
          ? '사용자 경험을 중시하는 서비스 개발에 열정을 갖고 있어 지원하게 되었습니다.'
          : '팀 프로젝트에서 코드 리뷰와 문서화를 통해 협업 효율을 높인 경험이 있습니다.')
        : it.answer,
    }));

    await prisma.coverLetter.update({
      where: { id: cl.id },
      data: { company, position, items: JSON.stringify(newItems) },
    });
  }
  console.log(`✅ CoverLetter placeholders cleaned: ${badCoverLetters.length}`);

  // 2. 공지사항
  const notices = await prisma.notice.findMany({
    where: { OR: [{ title: { in: ['1', '11', '1234'] } }, { content: { in: ['1', '11', '1234'] } }] },
  });
  for (const n of notices) {
    await prisma.notice.update({
      where: { id: n.id },
      data: {
        title: '취업지원 포털 이용 안내',
        content: 'JobFilter 취업지원 포털의 공고 확인, 자소서 코칭, 면접 연습 기능을 적극 활용해주세요.',
      },
    });
  }
  console.log(`✅ Notice placeholders cleaned: ${notices.length}`);

  // 3. 면접 질문
  const questions = await prisma.interviewQuestion.findMany({
    where: { question: { in: ['1', '11', '1234'] } },
  });
  const sampleQuestions = [
    'REST API 설계 경험이 있나요? 설계 시 고려한 원칙을 설명해주세요.',
    'CI/CD 파이프라인 구축 경험과 그 과정에서 해결한 문제를 말씀해주세요.',
  ];
  for (let i = 0; i < questions.length; i++) {
    await prisma.interviewQuestion.update({
      where: { id: questions[i].id },
      data: { question: sampleQuestions[i % sampleQuestions.length] },
    });
  }
  console.log(`✅ InterviewQuestion placeholders cleaned: ${questions.length}`);

  // 4. 취업 확정
  const employments = await prisma.employmentRecord.findMany({
    where: {
      OR: [
        { company: { in: ['1', '11', '1234'] } },
        { position: { in: ['1', '11', '1234'] } },
      ],
    },
  });
  for (const emp of employments) {
    await prisma.employmentRecord.update({
      where: { id: emp.id },
      data: { company: '네이버', position: '백엔드 개발자' },
    });
  }
  console.log(`✅ EmploymentRecord placeholders cleaned: ${employments.length}`);

  // 5. 취업 확정 알림 (body에 '1 1 취업' 또는 '취업이 확정'이 들어간 경우)
  const notifications = await prisma.userNotification.findMany({
    where: { OR: [{ title: { in: ['1', '11', '1234'] } }, { body: { contains: '취업' } }] },
  });
  for (const n of notifications) {
    if (n.body.includes('취업')) {
      await prisma.userNotification.update({
        where: { id: n.id },
        data: { body: '네이버 백엔드 개발자 취업이 확정 등록되었습니다. 축하합니다!' },
      });
    }
  }
  console.log(`✅ UserNotification placeholders cleaned: ${notifications.length}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
