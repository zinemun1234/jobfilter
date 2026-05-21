// Common API response types
export type ApiResponse<T> = {
  data: T;
  error?: string;
};

export type ApiError = {
  error: string;
  code: string;
};

// Application status (string union, SQLite에서 enum 대신 사용)
export type ApplicationStatus =
  | 'PREPARING'
  | 'APPLIED'
  | 'DOCUMENT_PASS'
  | 'INTERVIEW'
  | 'FINAL_PASS'
  | 'REJECTED';

// Skill status
export type SkillStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

// Question category
export type QuestionCategory = 'TECHNICAL' | 'PERSONALITY' | 'SITUATIONAL';

// Dashboard summary type
export type DashboardSummary = {
  applicationCounts: Record<ApplicationStatus, number>;
  upcomingInterviews: JobPosting[];
  roadmapProgress: number; // 0-100
  urgentDeadlines: JobPosting[]; // 7일 이내 마감
};

// Roadmap progress type
export type RoadmapProgress = {
  total: number;
  completed: number;
  percentage: number;
};

// ─── Core entity types ────────────────────────────────────────────────────────

export type User = {
  id: string;
  email: string;
  name: string | null;
  major: string | null;
  targetJob: string | null;
  skills: string[];
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Portfolio = {
  id: string;
  userId: string;
  title: string;
  description: string;
  techStack: string[];
  startDate: Date;
  endDate: Date | null;
  githubUrl: string | null;
  deployUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type JobPosting = {
  id: string;
  userId: string;
  company: string;
  position: string;
  url: string | null;
  deadline: Date | null;
  status: ApplicationStatus;
  contacts: string | null;
  followUpAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  statusHistory?: StatusHistory[];
};

export type StatusHistory = {
  id: string;
  jobId: string;
  status: ApplicationStatus;
  changedAt: Date;
  note: string | null;
};

export type RoadmapItem = {
  id: string;
  userId: string;
  jobCategory: string;
  skill: string;
  status: SkillStatus;
  referenceLinks: string[];
  isCustom: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type InterviewQuestion = {
  id: string;
  category: QuestionCategory;
  jobType: string | null;
  question: string;
  isDefault: boolean;
  userId: string | null;
  answers?: InterviewAnswer[];
};

export type InterviewAnswer = {
  id: string;
  userId: string;
  questionId: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CoverLetter = {
  id: string;
  userId: string;
  jobId: string | null;
  company: string;
  position: string;
  items: string; // JSON: [{question, answer}]
  version: number;
  createdAt: Date;
  updatedAt: Date;
};

export type JobListing = {
  id: string;
  company: string;
  position: string;
  location: string | null;
  career: string | null;
  education: string | null;
  employType: string | null;
  salary: string | null;
  deadline: Date | null;
  url: string | null;
  description: string | null;
  tags: string | null; // JSON: string[]
  source: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Notice = {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
};
