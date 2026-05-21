/**
 * 면접 질문 템플릿 데이터
 *
 * INTERVIEW_QUESTION_TEMPLATES: 25개 기본 질문 (기술/인성/상황 × 프론트엔드/백엔드/공통)
 *
 * getInterviewQuestions(category?, jobType?): 필터링된 질문 목록 반환
 * getRandomQuestions(count, category?, jobType?): 랜덤 섞어서 count개 반환 (모의 면접용)
 */
import type { QuestionCategory } from '@/types';

export interface InterviewQuestionTemplate {
  category: QuestionCategory;
  jobType?: string;
  question: string;
}

export const INTERVIEW_QUESTION_TEMPLATES: InterviewQuestionTemplate[] = [
  // 기술 질문 - 프론트엔드
  {
    category: 'TECHNICAL',
    jobType: 'frontend',
    question: 'React의 Virtual DOM에 대해 설명해주세요.',
  },
  {
    category: 'TECHNICAL',
    jobType: 'frontend',
    question: '클로저(Closure)에 대해 설명하고 예시를 들어주세요.',
  },
  {
    category: 'TECHNICAL',
    jobType: 'frontend',
    question: '브라우저의 렌더링 과정에 대해 설명해주세요.',
  },
  {
    category: 'TECHNICAL',
    jobType: 'frontend',
    question: 'CSS의 Box Model에 대해 설명해주세요.',
  },
  {
    category: 'TECHNICAL',
    jobType: 'frontend',
    question: '웹 성능 최적화 경험이 있다면 말씀해주세요.',
  },
  
  // 기술 질문 - 백엔드
  {
    category: 'TECHNICAL',
    jobType: 'backend',
    question: 'RESTful API의 원칙에 대해 설명해주세요.',
  },
  {
    category: 'TECHNICAL',
    jobType: 'backend',
    question: '데이터베이스 인덱스에 대해 설명해주세요.',
  },
  {
    category: 'TECHNICAL',
    jobType: 'backend',
    question: '트랜잭션과 ACID 특성에 대해 설명해주세요.',
  },
  {
    category: 'TECHNICAL',
    jobType: 'backend',
    question: 'OAuth 2.0의 동작 방식에 대해 설명해주세요.',
  },
  {
    category: 'TECHNICAL',
    jobType: 'backend',
    question: '마이크로서비스 아키텍처의 장단점에 대해 설명해주세요.',
  },
  
  // 기술 질문 - 공통
  {
    category: 'TECHNICAL',
    jobType: 'common',
    question: '객체 지향 프로그래밍의 4가지 핵심 원칙에 대해 설명해주세요.',
  },
  {
    category: 'TECHNICAL',
    jobType: 'common',
    question: 'SQL과 NoSQL 데이터베이스의 차이점과 사용 사례를 설명해주세요.',
  },
  {
    category: 'TECHNICAL',
    jobType: 'common',
    question: 'Git의 브랜칭 전략에 대해 설명해주세요.',
  },
  {
    category: 'TECHNICAL',
    jobType: 'common',
    question: 'TDD(Test-Driven Development)에 대해 설명하고 장점을 말씀해주세요.',
  },
  {
    category: 'TECHNICAL',
    jobType: 'common',
    question: '코드 리뷰의 중요성과 좋은 코드 리뷰 방법에 대해 설명해주세요.',
  },
  
  // 인성 질문
  {
    category: 'PERSONALITY',
    jobType: 'common',
    question: '본인의 장점과 단점에 대해 설명해주세요.',
  },
  {
    category: 'PERSONALITY',
    jobType: 'common',
    question: '팀원들과 갈등이 생겼을 때 어떻게 해결하나요?',
  },
  {
    category: 'PERSONALITY',
    jobType: 'common',
    question: '5년 후의 자신을 어떻게 상상하나요?',
  },
  {
    category: 'PERSONALITY',
    jobType: 'common',
    question: '본인이 성장하기 위해 어떤 노력을 하고 있나요?',
  },
  {
    category: 'PERSONALITY',
    jobType: 'common',
    question: '스트레스를 받을 때 어떻게 해소하나요?',
  },
  
  // 상황 질문
  {
    category: 'SITUATIONAL',
    jobType: 'common',
    question: '기한이 촉박한 프로젝트에서 어떻게 우선순위를 정하나요?',
  },
  {
    category: 'SITUATIONAL',
    jobType: 'common',
    question: '기술적 부채를 발견했을 때 어떻게 대처하나요?',
  },
  {
    category: 'SITUATIONAL',
    jobType: 'common',
    question: '새로운 기술을 배워야 할 때 어떻게 접근하나요?',
  },
  {
    category: 'SITUATIONAL',
    jobType: 'common',
    question: '팀원이 어려움을 겪고 있을 때 어떻게 도와주나요?',
  },
  {
    category: 'SITUATIONAL',
    jobType: 'common',
    question: '프로젝트 실패 경험과 그로부터 배운 점에 대해 설명해주세요.',
  },
];

export function getInterviewQuestions(category?: QuestionCategory, jobType?: string): InterviewQuestionTemplate[] {
  return INTERVIEW_QUESTION_TEMPLATES.filter(question => {
    if (category && question.category !== category) return false;
    if (jobType && question.jobType && question.jobType !== jobType && question.jobType !== 'common') return false;
    return true;
  });
}

export function getRandomQuestions(count: number, category?: QuestionCategory, jobType?: string): InterviewQuestionTemplate[] {
  const questions = getInterviewQuestions(category, jobType);
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
