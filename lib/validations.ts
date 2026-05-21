/**
 * Zod 입력값 검증 스키마 모음
 *
 * API Route에서 request body를 검증할 때 사용한다.
 * - portfolioSchema: 포트폴리오 생성/수정
 * - jobPostingSchema: 지원 공고 생성/수정 (상태, 날짜, 담당자 연락처 포함)
 * - roadmapItemSchema: 로드맵 항목
 * - interviewQuestionSchema: 면접 질문
 * - interviewAnswerSchema: 면접 답변
 * - profileSchema: 프로필 수정 (lib/validations/profile.ts에도 동일 스키마 존재)
 *
 * 타입 별칭도 함께 export (ApplicationStatus, SkillStatus, QuestionCategory)
 */
import { z } from 'zod';

export const portfolioSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다'),
  description: z.string().min(1, '설명은 필수입니다'),
  techStack: z.array(z.string()).min(1, '최소 1개 이상의 기술 스택을 선택해야 합니다'),
  startDate: z.string().min(1, '시작일은 필수입니다'),
  endDate: z.string().optional(),
  githubUrl: z.string().url('유효한 GitHub URL을 입력해주세요').optional().or(z.literal('')),
  deployUrl: z.string().url('유효한 배포 URL을 입력해주세요').optional().or(z.literal('')),
});

export const jobPostingSchema = z.object({
  company: z.string().min(1, '회사명은 필수입니다'),
  position: z.string().min(1, '직무명은 필수입니다'),
  url: z.string().url('유효한 URL을 입력해주세요').optional().or(z.literal('')),
  deadline: z.string().optional(),
  interviewAt: z.string().optional(),
  status: z.enum(['PREPARING', 'APPLIED', 'DOCUMENT_PASS', 'INTERVIEW', 'FINAL_PASS', 'REJECTED']),
  followUpAt: z.string().optional(),
  contacts: z.array(z.object({
    name: z.string(),
    role: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    memo: z.string().optional(),
  })).optional(),
});

export const roadmapItemSchema = z.object({
  jobCategory: z.enum(['frontend', 'backend', 'fullstack', 'data', 'ai']),
  skill: z.string().min(1, '기술명은 필수입니다'),
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']),
  referenceLinks: z.array(z.string().url()).optional(),
  isCustom: z.boolean().optional(),
  order: z.number().optional(),
});

export const interviewQuestionSchema = z.object({
  category: z.enum(['TECHNICAL', 'PERSONALITY', 'SITUATIONAL']),
  jobType: z.enum(['frontend', 'backend', 'common']).optional(),
  question: z.string().min(1, '질문은 필수입니다'),
  isDefault: z.boolean().optional(),
});

export const interviewAnswerSchema = z.object({
  questionId: z.string(),
  answer: z.string().min(1, '답변은 필수입니다'),
});

export const profileSchema = z.object({
  name: z.string().optional(),
  major: z.string().optional(),
  targetJob: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

// SQLite compatibility types
export type ApplicationStatus = 'PREPARING' | 'APPLIED' | 'DOCUMENT_PASS' | 'INTERVIEW' | 'FINAL_PASS' | 'REJECTED';
export type SkillStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
export type QuestionCategory = 'TECHNICAL' | 'PERSONALITY' | 'SITUATIONAL';
