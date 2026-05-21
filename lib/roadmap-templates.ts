/**
 * 기술 스택 로드맵 템플릿
 *
 * ROADMAP_TEMPLATES: 5개 직군별 학습 로드맵 (frontend/backend/fullstack/data/ai)
 * 각 항목은 skill명, 참고 링크(MDN, 공식 문서 등), 순서(order)를 포함한다.
 *
 * getRoadmapTemplate(jobCategory): 직군에 맞는 템플릿 반환
 * calculateProgress(items): COMPLETED 항목 비율로 0~100% 진행률 계산
 */
import type { SkillStatus } from '@/types';

export interface RoadmapTemplate {
  jobCategory: string;
  skills: Array<{
    skill: string;
    referenceLinks: string[];
    order: number;
  }>;
}

export const ROADMAP_TEMPLATES: RoadmapTemplate[] = [
  {
    jobCategory: 'frontend',
    skills: [
      { skill: 'HTML/CSS', referenceLinks: ['https://developer.mozilla.org/ko/docs/Web/HTML'], order: 1 },
      { skill: 'JavaScript', referenceLinks: ['https://developer.mozilla.org/ko/docs/Web/JavaScript'], order: 2 },
      { skill: 'TypeScript', referenceLinks: ['https://www.typescriptlang.org/'], order: 3 },
      { skill: 'React', referenceLinks: ['https://react.dev/'], order: 4 },
      { skill: 'Next.js', referenceLinks: ['https://nextjs.org/'], order: 5 },
      { skill: 'State Management (Redux/Zustand)', referenceLinks: ['https://redux.js.org/', 'https://github.com/pmndrs/zustand'], order: 6 },
      { skill: 'CSS Framework (Tailwind CSS)', referenceLinks: ['https://tailwindcss.com/'], order: 7 },
      { skill: 'Testing (Jest/React Testing Library)', referenceLinks: ['https://jestjs.io/', 'https://testing-library.com/docs/react-testing-library/intro'], order: 8 },
      { skill: 'Build Tools (Vite/Webpack)', referenceLinks: ['https://vitejs.dev/', 'https://webpack.js.org/'], order: 9 },
      { skill: 'Git/GitHub', referenceLinks: ['https://git-scm.com/', 'https://github.com/'], order: 10 },
    ],
  },
  {
    jobCategory: 'backend',
    skills: [
      { skill: 'Node.js', referenceLinks: ['https://nodejs.org/'], order: 1 },
      { skill: 'Express.js', referenceLinks: ['https://expressjs.com/'], order: 2 },
      { skill: 'Database (PostgreSQL/MySQL)', referenceLinks: ['https://www.postgresql.org/', 'https://www.mysql.com/'], order: 3 },
      { skill: 'ORM (Prisma/TypeORM)', referenceLinks: ['https://www.prisma.io/', 'https://typeorm.io/'], order: 4 },
      { skill: 'REST API Design', referenceLinks: ['https://restfulapi.net/'], order: 5 },
      { skill: 'Authentication (JWT/OAuth)', referenceLinks: ['https://jwt.io/', 'https://oauth.net/'], order: 6 },
      { skill: 'Testing (Jest/Supertest)', referenceLinks: ['https://jestjs.io/', 'https://github.com/visionmedia/supertest'], order: 7 },
      { skill: 'Docker', referenceLinks: ['https://www.docker.com/'], order: 8 },
      { skill: 'AWS/Cloud Services', referenceLinks: ['https://aws.amazon.com/'], order: 9 },
      { skill: 'CI/CD', referenceLinks: ['https://github.com/features/actions'], order: 10 },
    ],
  },
  {
    jobCategory: 'fullstack',
    skills: [
      { skill: 'HTML/CSS', referenceLinks: ['https://developer.mozilla.org/ko/docs/Web/HTML'], order: 1 },
      { skill: 'JavaScript/TypeScript', referenceLinks: ['https://www.typescriptlang.org/'], order: 2 },
      { skill: 'React/Next.js', referenceLinks: ['https://react.dev/', 'https://nextjs.org/'], order: 3 },
      { skill: 'Node.js/Express', referenceLinks: ['https://nodejs.org/', 'https://expressjs.com/'], order: 4 },
      { skill: 'Database (PostgreSQL)', referenceLinks: ['https://www.postgresql.org/'], order: 5 },
      { skill: 'Prisma ORM', referenceLinks: ['https://www.prisma.io/'], order: 6 },
      { skill: 'Authentication', referenceLinks: ['https://next-auth.js.org/'], order: 7 },
      { skill: 'Docker', referenceLinks: ['https://www.docker.com/'], order: 8 },
      { skill: 'AWS/Deployment', referenceLinks: ['https://aws.amazon.com/'], order: 9 },
      { skill: 'Testing (Full Stack)', referenceLinks: ['https://jestjs.io/'], order: 10 },
    ],
  },
  {
    jobCategory: 'data',
    skills: [
      { skill: 'Python', referenceLinks: ['https://www.python.org/'], order: 1 },
      { skill: 'SQL', referenceLinks: ['https://www.postgresql.org/docs/'], order: 2 },
      { skill: 'Pandas', referenceLinks: ['https://pandas.pydata.org/'], order: 3 },
      { skill: 'NumPy', referenceLinks: ['https://numpy.org/'], order: 4 },
      { skill: 'Data Visualization (Matplotlib/Seaborn)', referenceLinks: ['https://matplotlib.org/', 'https://seaborn.pydata.org/'], order: 5 },
      { skill: 'Statistics', referenceLinks: ['https://www.khanacademy.org/math/statistics-probability'], order: 6 },
      { skill: 'Machine Learning (Scikit-learn)', referenceLinks: ['https://scikit-learn.org/'], order: 7 },
      { skill: 'Deep Learning (TensorFlow/PyTorch)', referenceLinks: ['https://www.tensorflow.org/', 'https://pytorch.org/'], order: 8 },
      { skill: 'Big Data (Spark)', referenceLinks: ['https://spark.apache.org/'], order: 9 },
      { skill: 'Cloud Platforms (AWS/GCP)', referenceLinks: ['https://aws.amazon.com/big-data/', 'https://cloud.google.com/big-data'], order: 10 },
    ],
  },
  {
    jobCategory: 'ai',
    skills: [
      { skill: 'Python', referenceLinks: ['https://www.python.org/'], order: 1 },
      { skill: 'Linear Algebra', referenceLinks: ['https://www.khanacademy.org/math/linear-algebra'], order: 2 },
      { skill: 'Calculus', referenceLinks: ['https://www.khanacademy.org/math/calculus-1'], order: 3 },
      { skill: 'Machine Learning Fundamentals', referenceLinks: ['https://www.coursera.org/learn/machine-learning'], order: 4 },
      { skill: 'Deep Learning', referenceLinks: ['https://www.deeplearning.ai/'], order: 5 },
      { skill: 'PyTorch/TensorFlow', referenceLinks: ['https://pytorch.org/', 'https://www.tensorflow.org/'], order: 6 },
      { skill: 'Natural Language Processing', referenceLinks: ['https://www.nltk.org/', 'https://huggingface.co/'], order: 7 },
      { skill: 'Computer Vision', referenceLinks: ['https://opencv.org/', 'https://pytorch.org/vision/'], order: 8 },
      { skill: 'MLOps', referenceLinks: ['https://mlops.org/'], order: 9 },
      { skill: 'Model Deployment', referenceLinks: ['https://www.tensorflow.org/tfx/guide/serving'], order: 10 },
    ],
  },
];

export function getRoadmapTemplate(jobCategory: string): RoadmapTemplate | undefined {
  return ROADMAP_TEMPLATES.find(template => template.jobCategory === jobCategory);
}

export function calculateProgress(items: Array<{ status: SkillStatus }>): number {
  if (items.length === 0) return 0;
  const completed = items.filter(item => item.status === 'COMPLETED').length;
  return Math.round((completed / items.length) * 100);
}
