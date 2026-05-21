  # Implementation Plan

  ## Task List

  - [ ] 1. 프로젝트 초기 설정
    - [x] 1.1 Next.js 14 + TypeScript 프로젝트 생성 및 기본 의존성 설치 (Tailwind CSS, shadcn/ui, Prisma, NextAuth.js, React Query, Zustand, Zod, React Hook Form, fast-check)
    - [x] 1.2 PostgreSQL 연결 및 Prisma 스키마 정의 (User, Portfolio, JobPosting, StatusHistory, RoadmapItem, InterviewQuestion, InterviewAnswer 모델)
    - [x] 1.3 Prisma 마이그레이션 실행 및 시드 데이터 작성 (직무별 로드맵 템플릿, 기본 면접 질문)
    - [x] 1.4 NextAuth.js Credentials Provider 설정 및 세션 미들웨어 구성
    - [x] 1.5 공통 API 응답 타입 및 에러 핸들링 유틸리티 작성

  - [ ] 2. 사용자 인증 및 프로필 관리
    - [x] 2.1 회원가입 페이지 및 API Route 구현 (이메일/비밀번호 유효성 검사, bcrypt 해싱)
    - [x] 2.2 로그인 페이지 및 NextAuth.js 인증 흐름 구현 (성공 시 대시보드 리다이렉트)
    - [x] 2.3 프로필 설정 페이지 구현 (전공 계열, 목표 직무, 기술 스택 저장)
    - [x] 2.4 프로필 API Route 구현 (GET /api/profile, PUT /api/profile)
    - [x] 2.5 인증 관련 속성 테스트 작성 (Property 1: 유효하지 않은 자격증명 거부, Property 2: 프로필 데이터 round-trip)

  - [ ] 3. 취업 활동 대시보드
    - [x] 3.1 대시보드 페이지 레이아웃 및 사이드바 네비게이션 구현
    - [x] 3.2 지원 현황 요약 컴포넌트 구현 (상태별 집계, DashboardSummary 타입 활용)
    - [x] 3.3 마감 임박 채용 공고 강조 표시 로직 구현 (7일 이내 필터링)
    - [x] 3.4 로드맵 진행률 표시 컴포넌트 구현
    - [x] 3.5 대시보드 API Route 구현 (GET /api/dashboard)
    - [ ] 3.6 대시보드 속성 테스트 작성 (Property 3: 집계 불변성, Property 4: 마감 임박 필터링, Property 5: 진행률 계산)

  - [ ] 4. 포트폴리오 관리
    - [ ] 4.1 포트폴리오 목록 페이지 및 항목 카드 컴포넌트 구현
    - [ ] 4.2 포트폴리오 생성/수정 폼 구현 (PortfolioForm, Zod 스키마 유효성 검사, GitHub URL 검증)
    - [ ] 4.3 삭제 확인 다이얼로그 컴포넌트 구현
    - [ ] 4.4 포트폴리오 API Routes 구현 (GET/POST /api/portfolio, GET/PUT/DELETE /api/portfolio/[id])
    - [ ] 4.5 PDF 내보내기 기능 구현 (@react-pdf/renderer 활용)
    - [ ] 4.6 포트폴리오 속성 테스트 작성 (Property 6: round-trip, Property 7: GitHub URL 유효성)

  - [ ] 5. 채용 공고 트래킹
    - [ ] 5.1 채용 공고 목록 페이지 및 JobCard 컴포넌트 구현 (마감 임박 배지, 만료 상태 표시)
    - [ ] 5.2 채용 공고 등록/수정 폼 구현 (ApplicationStatus 선택, 마감일 입력)
    - [ ] 5.3 상태 변경 타임라인 컴포넌트 구현 (StatusHistory 표시)
    - [ ] 5.4 회사명/직무명 검색 기능 구현
    - [ ] 5.5 채용 공고 API Routes 구현 (GET/POST /api/jobs, GET/PUT/DELETE /api/jobs/[id])
    - [ ] 5.6 채용 공고 속성 테스트 작성 (Property 8: round-trip, Property 9: 이력 누적, Property 10: 검색 정확성, Property 4: 날짜 분류)

  - [ ] 6. 기술 스택 로드맵
    - [ ] 6.1 직무별 로드맵 템플릿 데이터 정의 (frontend, backend, fullstack, data, ai)
    - [ ] 6.2 RoadmapTree 컴포넌트 구현 (기술 항목 트리, 상태 토글, 진행률 바)
    - [ ] 6.3 커스텀 기술 항목 추가 및 참고 링크 첨부 기능 구현
    - [ ] 6.4 로드맵 API Routes 구현 (GET/POST /api/roadmap, PUT /api/roadmap/[id])
    - [ ] 6.5 로드맵 속성 테스트 작성 (Property 11: 상태 round-trip, Property 12: 템플릿 비어있지 않음, Property 5: 진행률 재계산)

  - [ ] 7. 면접 준비
    - [ ] 7.1 면접 질문 목록 페이지 구현 (카테고리/직무 필터, InterviewCard 컴포넌트)
    - [ ] 7.2 답변 작성 에디터 구현 (저장 후 완료 상태 표시)
    - [ ] 7.3 커스텀 질문 추가 기능 구현
    - [ ] 7.4 모의 면접 모드 구현 (MockInterviewModal, 무작위 질문 순서)
    - [ ] 7.5 면접 준비 API Routes 구현 (GET /api/interview/questions, POST/PUT /api/interview/answers, POST /api/interview/questions)
    - [ ] 7.6 면접 준비 속성 테스트 작성 (Property 13: 답변 round-trip, Property 14: 커스텀 질문 round-trip, Property 15: 필터링 정확성, Property 16: 모의 면접 질문 범위)

  - [ ] 8. 데이터 영속성 및 보안
    - [ ] 8.1 모든 API Route에 인증 미들웨어 적용 (세션 검증, userId 기반 데이터 필터링)
    - [ ] 8.2 React Query 에러 핸들링 설정 (저장 실패 토스트, 재시도 버튼)
    - [ ] 8.3 로딩 상태 UI 구현 (스켈레톤 컴포넌트, 로딩 인디케이터)
    - [ ] 8.4 사용자 데이터 격리 속성 테스트 작성 (Property 17: 다른 사용자 데이터 접근 불가)
