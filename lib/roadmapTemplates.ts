// Static roadmap templates per job category.
// These are applied to a user's RoadmapItem rows when they first select a job.

export type RoadmapTemplate = {
  jobCategory: string;
  skill: string;
  order: number;
};

export const ROADMAP_TEMPLATES: RoadmapTemplate[] = [
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

  // Data Engineering
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

/** Returns templates for a specific job category. */
export function getTemplatesByCategory(jobCategory: string): RoadmapTemplate[] {
  return ROADMAP_TEMPLATES.filter((t) => t.jobCategory === jobCategory);
}

export const JOB_CATEGORIES = ['frontend', 'backend', 'fullstack', 'data', 'ai'] as const;
export type JobCategory = (typeof JOB_CATEGORIES)[number];
