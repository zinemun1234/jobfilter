import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// ─── 로드맵 템플릿 (정적 데이터) ──────────────────────────────────────────────
const roadmapTemplates = [
  // Frontend
  { jobCategory: 'frontend', skill: 'HTML/CSS', order: 1 },
  { jobCategory: 'frontend', skill: 'JavaScript', order: 2 },
  { jobCategory: 'frontend', skill: 'TypeScript', order: 3 },
  { jobCategory: 'frontend', skill: 'React', order: 4 },
  { jobCategory: 'frontend', skill: 'Next.js', order: 5 },
  { jobCategory: 'frontend', skill: 'Tailwind CSS', order: 6 },
  { jobCategory: 'frontend', skill: 'Git', order: 7 },
  { jobCategory: 'frontend', skill: 'REST API', order: 8 },
  { jobCategory: 'frontend', skill: 'Testing (Jest/Vitest)', order: 9 },
  // Backend
  { jobCategory: 'backend', skill: 'Node.js', order: 1 },
  { jobCategory: 'backend', skill: 'Express/NestJS', order: 2 },
  { jobCategory: 'backend', skill: 'TypeScript', order: 3 },
  { jobCategory: 'backend', skill: 'PostgreSQL', order: 4 },
  { jobCategory: 'backend', skill: 'Prisma/TypeORM', order: 5 },
  { jobCategory: 'backend', skill: 'REST API', order: 6 },
  { jobCategory: 'backend', skill: 'Authentication (JWT)', order: 7 },
  { jobCategory: 'backend', skill: 'Docker', order: 8 },
  { jobCategory: 'backend', skill: 'Testing', order: 9 },
  // Fullstack
  { jobCategory: 'fullstack', skill: 'HTML/CSS', order: 1 },
  { jobCategory: 'fullstack', skill: 'JavaScript', order: 2 },
  { jobCategory: 'fullstack', skill: 'TypeScript', order: 3 },
  { jobCategory: 'fullstack', skill: 'React', order: 4 },
  { jobCategory: 'fullstack', skill: 'Next.js', order: 5 },
  { jobCategory: 'fullstack', skill: 'Node.js', order: 6 },
  { jobCategory: 'fullstack', skill: 'Express/NestJS', order: 7 },
  { jobCategory: 'fullstack', skill: 'PostgreSQL', order: 8 },
  { jobCategory: 'fullstack', skill: 'Prisma/TypeORM', order: 9 },
  { jobCategory: 'fullstack', skill: 'REST API', order: 10 },
  { jobCategory: 'fullstack', skill: 'Authentication (JWT)', order: 11 },
  { jobCategory: 'fullstack', skill: 'Docker', order: 12 },
  { jobCategory: 'fullstack', skill: 'Git', order: 13 },
  // Data
  { jobCategory: 'data', skill: 'Python', order: 1 },
  { jobCategory: 'data', skill: 'SQL', order: 2 },
  { jobCategory: 'data', skill: 'PostgreSQL', order: 3 },
  { jobCategory: 'data', skill: 'Data Pipeline', order: 4 },
  { jobCategory: 'data', skill: 'Apache Spark', order: 5 },
  { jobCategory: 'data', skill: 'Airflow', order: 6 },
  { jobCategory: 'data', skill: 'Docker', order: 7 },
  { jobCategory: 'data', skill: 'Cloud (AWS/GCP)', order: 8 },
  // AI/ML
  { jobCategory: 'ai', skill: 'Python', order: 1 },
  { jobCategory: 'ai', skill: 'NumPy/Pandas', order: 2 },
  { jobCategory: 'ai', skill: 'Scikit-learn', order: 3 },
  { jobCategory: 'ai', skill: 'TensorFlow/PyTorch', order: 4 },
  { jobCategory: 'ai', skill: 'Data Preprocessing', order: 5 },
  { jobCategory: 'ai', skill: 'Model Evaluation', order: 6 },
  { jobCategory: 'ai', skill: 'MLOps', order: 7 },
];

// ─── 면접 기본 질문 ───────────────────────────────────────────────────────────
const interviewQuestions = [
  // TECHNICAL - common
  { category: 'TECHNICAL', jobType: 'common', question: 'OOP의 4가지 특징을 설명해주세요.' },
  { category: 'TECHNICAL', jobType: 'common', question: 'REST API란 무엇이며, RESTful하게 설계하려면 어떤 원칙을 따라야 하나요?' },
  { category: 'TECHNICAL', jobType: 'common', question: 'Git에서 merge와 rebase의 차이를 설명해주세요.' },
  { category: 'TECHNICAL', jobType: 'common', question: '데이터베이스 인덱스란 무엇이고, 왜 사용하나요?' },
  { category: 'TECHNICAL', jobType: 'common', question: 'HTTP와 HTTPS의 차이를 설명해주세요.' },
  { category: 'TECHNICAL', jobType: 'common', question: 'TCP와 UDP의 차이점은 무엇인가요?' },
  { category: 'TECHNICAL', jobType: 'common', question: '프로세스와 스레드의 차이를 설명해주세요.' },
  { category: 'TECHNICAL', jobType: 'common', question: '정규화(Normalization)란 무엇이며, 왜 필요한가요?' },
  // TECHNICAL - frontend
  { category: 'TECHNICAL', jobType: 'frontend', question: 'Virtual DOM이란 무엇이며, 왜 사용하나요?' },
  { category: 'TECHNICAL', jobType: 'frontend', question: 'React에서 useEffect와 useLayoutEffect의 차이는?' },
  { category: 'TECHNICAL', jobType: 'frontend', question: 'CSR, SSR, SSG의 차이를 설명해주세요.' },
  { category: 'TECHNICAL', jobType: 'frontend', question: '웹 접근성(a11y)이란 무엇이며, 왜 중요한가요?' },
  // TECHNICAL - backend
  { category: 'TECHNICAL', jobType: 'backend', question: 'N+1 문제란 무엇이며, 어떻게 해결하나요?' },
  { category: 'TECHNICAL', jobType: 'backend', question: 'JWT 인증 방식의 장단점을 설명해주세요.' },
  { category: 'TECHNICAL', jobType: 'backend', question: '트랜잭션의 ACID 속성을 설명해주세요.' },
  { category: 'TECHNICAL', jobType: 'backend', question: 'Redis를 어떤 상황에서 사용하나요?' },
  // PERSONALITY
  { category: 'PERSONALITY', jobType: null, question: '본인의 강점과 약점을 하나씩 말씀해주세요.' },
  { category: 'PERSONALITY', jobType: null, question: '팀 프로젝트에서 갈등이 생겼을 때 어떻게 해결하나요?' },
  { category: 'PERSONALITY', jobType: null, question: '왜 개발자가 되고 싶으신가요?' },
  { category: 'PERSONALITY', jobType: null, question: '5년 후 어떤 개발자가 되고 싶으신가요?' },
  { category: 'PERSONALITY', jobType: null, question: '최근에 자기계발을 위해 한 활동이 있나요?' },
  // SITUATIONAL
  { category: 'SITUATIONAL', jobType: null, question: '마감 기한이 촉박한 프로젝트에서 어떻게 우선순위를 정하나요?' },
  { category: 'SITUATIONAL', jobType: null, question: '팀원이 맡은 일을 제대로 하지 않을 때 어떻게 대처하나요?' },
  { category: 'SITUATIONAL', jobType: null, question: '본인이 모르는 기술을 사용해야 하는 프로젝트에 투입되면 어떻게 하나요?' },
  { category: 'SITUATIONAL', jobType: null, question: '코드 리뷰에서 의견 충돌이 생기면 어떻게 해결하나요?' },
  { category: 'SITUATIONAL', jobType: null, question: '프로젝트 중간에 요구사항이 크게 바뀌면 어떻게 대응하나요?' },
];

// ─── main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🌱 시드 데이터 생성 시작...');

  // 1. 관리자 계정
  const adminEmail = 'admin@admin.com';
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const hashed = await bcrypt.hash('admin1234!', 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashed,
        name: '관리자',
        role: 'ADMIN',
        skills: '[]',
      },
    });
    console.log('✅ 관리자 계정 생성: admin@admin.com / admin1234!');
  } else {
    console.log('ℹ️  관리자 계정 이미 존재');
  }

  // 2. 테스트 학생 계정
  const studentEmail = 'student@test.com';
  const existingStudent = await prisma.user.findUnique({ where: { email: studentEmail } });
  let studentId: string;
  if (!existingStudent) {
    const hashed = await bcrypt.hash('student1234!', 10);
    const student = await prisma.user.create({
      data: {
        email: studentEmail,
        password: hashed,
        name: '홍길동',
        major: '컴퓨터공학부',
        targetJob: '백엔드 개발자',
        role: 'USER',
        skills: JSON.stringify(['TypeScript', 'React', 'Node.js', 'PostgreSQL']),
      },
    });
    studentId = student.id;
    console.log('✅ 테스트 학생 계정 생성: student@test.com / student1234!');
  } else {
    studentId = existingStudent.id;
    console.log('ℹ️  테스트 학생 계정 이미 존재');
  }

  // 3. 면접 기본 질문
  const existingQ = await prisma.interviewQuestion.count({ where: { isDefault: true } });
  if (existingQ === 0) {
    await prisma.interviewQuestion.createMany({
      data: interviewQuestions.map((q) => ({
        ...q,
        isDefault: true,
        userId: null,
      })),
    });
    console.log(`✅ 면접 기본 질문 ${interviewQuestions.length}개 생성`);
  } else {
    console.log(`ℹ️  면접 기본 질문 이미 존재 (${existingQ}개)`);
  }

  // 4. 샘플 공지사항
  const existingNotice = await prisma.notice.count();
  if (existingNotice === 0) {
    await prisma.notice.createMany({
      data: [
        {
          title: 'CS 취업지원 포털 오픈 안내',
          content: '컴퓨터공학부 취업지원 포털이 오픈되었습니다. 채용공고 확인 및 자소서 코칭 기능을 활용해보세요.',
          isPinned: true,
        },
        {
          title: '2026년 상반기 채용 시즌 안내',
          content: '주요 IT 기업 상반기 공채가 시작됩니다. 채용공고 게시판을 수시로 확인해주세요.',
          isPinned: false,
        },
      ],
    });
    console.log('✅ 샘플 공지사항 2개 생성');
  } else {
    console.log('ℹ️  공지사항 이미 존재');
  }

  // 5. 샘플 채용공고 (엑셀 업로드 시뮬레이션)
  const existingListings = await prisma.jobListing.count();
  if (existingListings === 0) {
    await prisma.jobListing.createMany({
      data: [
        {
          company: '네이버',
          position: '백엔드 개발자',
          location: '성남시 분당구',
          career: '신입',
          education: '대졸',
          employType: '정규직',
          deadline: new Date('2026-04-30'),
          url: 'https://recruit.navercorp.com',
          tags: JSON.stringify(['Java', 'Spring', 'MySQL']),
          source: '학생성공처',
        },
        {
          company: '카카오',
          position: '프론트엔드 개발자',
          location: '성남시 판교',
          career: '신입/경력',
          education: '대졸',
          employType: '정규직',
          deadline: new Date('2026-05-15'),
          url: 'https://careers.kakao.com',
          tags: JSON.stringify(['React', 'TypeScript', 'Next.js']),
          source: '학생성공처',
        },
        {
          company: '삼성SDS',
          position: 'IT 컨설턴트',
          location: '서울 송파구',
          career: '신입',
          education: '대졸',
          employType: '정규직',
          deadline: new Date('2026-04-20'),
          tags: JSON.stringify(['클라우드', 'AI', 'ERP']),
          source: '학생성공처',
        },
        {
          company: '라인플러스',
          position: '서버 개발자',
          location: '성남시 분당구',
          career: '신입',
          education: '대졸',
          employType: '정규직',
          deadline: new Date('2026-05-01'),
          tags: JSON.stringify(['Kotlin', 'Spring Boot', 'Redis']),
          source: '사람인',
        },
        {
          company: '토스',
          position: '풀스택 개발자',
          location: '서울 강남구',
          career: '신입/경력',
          education: '무관',
          employType: '정규직',
          url: 'https://toss.im/career',
          tags: JSON.stringify(['React', 'Node.js', 'TypeScript']),
          source: '학생성공처',
        },
      ],
    });
    console.log('✅ 샘플 채용공고 5개 생성');
  } else {
    console.log('ℹ️  채용공고 이미 존재');
  }

  console.log('🎉 시드 완료!');
}

main()
  .catch((e) => {
    console.error('❌ 시드 실패:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
