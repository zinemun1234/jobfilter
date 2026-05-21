# Requirements Document

## Introduction

전공심화 학생들의 취업 준비를 체계적으로 지원하는 Next.js + TypeScript 기반 웹앱입니다.
포트폴리오 관리, 채용 공고 트래킹, 기술 스택 로드맵, 면접 준비 등의 기능을 통해
학생들이 취업 활동을 효율적으로 관리하고 역량을 강화할 수 있도록 돕습니다.

## Glossary

- **System**: 전공심화 취업 지원 웹앱 전체
- **User**: 전공심화 과정에 재학 중인 학생
- **Portfolio**: 사용자가 작성한 프로젝트, 기술, 경험 등의 취업용 포트폴리오
- **JobPosting**: 사용자가 등록한 채용 공고 정보
- **ApplicationTracker**: 채용 지원 현황을 추적하는 기능 모듈
- **RoadmapEngine**: 기술 스택 학습 로드맵을 생성하고 관리하는 모듈
- **InterviewPrep**: 면접 준비 자료 및 모의 면접 기능 모듈
- **Dashboard**: 사용자의 취업 활동 전반을 한눈에 보여주는 메인 화면

---

## Requirements

### Requirement 1: 사용자 인증 및 프로필 관리

**User Story:** As a 전공심화 학생, I want to 계정을 생성하고 나의 전공 및 목표 직무를 설정하고 싶다, so that 맞춤형 취업 지원 서비스를 받을 수 있다.

#### Acceptance Criteria

1. THE System SHALL 이메일과 비밀번호를 통한 회원가입 기능을 제공한다.
2. WHEN 사용자가 로그인에 성공하면, THE System SHALL 사용자의 Dashboard 페이지로 이동시킨다.
3. IF 존재하지 않는 이메일 또는 잘못된 비밀번호가 입력되면, THEN THE System SHALL 인증 실패 메시지를 표시한다.
4. THE System SHALL 사용자가 전공 계열, 목표 직무, 기술 스택을 프로필에 저장할 수 있도록 한다.
5. WHEN 사용자가 프로필을 저장하면, THE System SHALL 변경 사항을 즉시 반영하고 저장 완료 메시지를 표시한다.

---

### Requirement 2: 취업 활동 대시보드

**User Story:** As a 전공심화 학생, I want to 나의 취업 활동 현황을 한눈에 파악하고 싶다, so that 진행 상황을 빠르게 확인하고 다음 행동을 결정할 수 있다.

#### Acceptance Criteria

1. WHEN 사용자가 Dashboard에 접근하면, THE Dashboard SHALL 지원 현황 요약, 다가오는 면접 일정, 로드맵 진행률을 표시한다.
2. THE Dashboard SHALL 지원 상태별(서류 준비 중, 지원 완료, 면접 예정, 합격, 불합격) 채용 공고 수를 집계하여 표시한다.
3. WHILE 사용자가 Dashboard를 열람 중이면, THE Dashboard SHALL 최근 7일 이내에 마감되는 채용 공고를 강조 표시한다.
4. THE Dashboard SHALL 사용자의 기술 스택 로드맵 전체 진행률을 퍼센트(%)로 표시한다.

---

### Requirement 3: 포트폴리오 관리

**User Story:** As a 전공심화 학생, I want to 나의 프로젝트와 경험을 포트폴리오로 정리하고 싶다, so that 채용 담당자에게 역량을 효과적으로 전달할 수 있다.

#### Acceptance Criteria

1. THE System SHALL 사용자가 프로젝트 제목, 설명, 사용 기술, 기간, GitHub URL, 배포 URL을 포함한 포트폴리오 항목을 생성할 수 있도록 한다.
2. WHEN 사용자가 포트폴리오 항목을 저장하면, THE Portfolio SHALL 해당 항목을 목록에 즉시 반영한다.
3. THE Portfolio SHALL 사용자가 기존 포트폴리오 항목을 수정하고 삭제할 수 있도록 한다.
4. WHEN 사용자가 포트폴리오 항목을 삭제하면, THE Portfolio SHALL 삭제 확인 다이얼로그를 표시한 후 삭제를 진행한다.
5. THE Portfolio SHALL 사용자가 포트폴리오를 PDF 형식으로 내보낼 수 있도록 한다.
6. IF GitHub URL 형식이 유효하지 않으면, THEN THE Portfolio SHALL 유효하지 않은 URL 형식임을 알리는 오류 메시지를 표시한다.

---

### Requirement 4: 채용 공고 트래킹

**User Story:** As a 전공심화 학생, I want to 관심 있는 채용 공고를 등록하고 지원 상태를 관리하고 싶다, so that 여러 회사의 지원 현황을 체계적으로 추적할 수 있다.

#### Acceptance Criteria

1. THE ApplicationTracker SHALL 사용자가 회사명, 직무명, 채용 공고 URL, 마감일, 지원 상태를 입력하여 채용 공고를 등록할 수 있도록 한다.
2. THE ApplicationTracker SHALL 지원 상태를 서류 준비 중, 지원 완료, 서류 합격, 면접 예정, 최종 합격, 불합격 중 하나로 설정할 수 있도록 한다.
3. WHEN 사용자가 지원 상태를 변경하면, THE ApplicationTracker SHALL 변경 이력을 타임라인 형태로 기록한다.
4. THE ApplicationTracker SHALL 사용자가 회사명 또는 직무명으로 등록된 채용 공고를 검색할 수 있도록 한다.
5. WHILE 마감일이 3일 이내로 남은 채용 공고가 존재하면, THE ApplicationTracker SHALL 해당 공고에 마감 임박 알림 배지를 표시한다.
6. IF 마감일이 현재 날짜보다 이전이면, THEN THE ApplicationTracker SHALL 해당 채용 공고를 만료됨 상태로 표시한다.

---

### Requirement 5: 기술 스택 로드맵

**User Story:** As a 전공심화 학생, I want to 목표 직무에 필요한 기술 스택 학습 로드맵을 확인하고 진행 상황을 기록하고 싶다, so that 체계적으로 역량을 개발할 수 있다.

#### Acceptance Criteria

1. THE RoadmapEngine SHALL 프론트엔드, 백엔드, 풀스택, 데이터 엔지니어링, AI/ML 등 직무별 기술 스택 로드맵 템플릿을 제공한다.
2. WHEN 사용자가 목표 직무를 선택하면, THE RoadmapEngine SHALL 해당 직무에 맞는 기술 스택 로드맵을 표시한다.
3. THE RoadmapEngine SHALL 각 기술 항목에 대해 학습 안 함, 학습 중, 학습 완료 상태를 설정할 수 있도록 한다.
4. WHEN 사용자가 기술 항목의 상태를 변경하면, THE RoadmapEngine SHALL 전체 로드맵 진행률을 즉시 재계산하여 표시한다.
5. THE RoadmapEngine SHALL 사용자가 기본 제공 로드맵에 커스텀 기술 항목을 추가할 수 있도록 한다.
6. THE RoadmapEngine SHALL 각 기술 항목에 학습 참고 링크(공식 문서, 강의 URL)를 첨부할 수 있도록 한다.

---

### Requirement 6: 면접 준비

**User Story:** As a 전공심화 학생, I want to 예상 면접 질문을 정리하고 답변을 작성하며 모의 면접을 연습하고 싶다, so that 실제 면접에서 자신감 있게 대응할 수 있다.

#### Acceptance Criteria

1. THE InterviewPrep SHALL 직무별(프론트엔드, 백엔드, 공통 CS) 예상 면접 질문 목록을 제공한다.
2. THE InterviewPrep SHALL 사용자가 각 면접 질문에 대한 나만의 답변을 작성하고 저장할 수 있도록 한다.
3. WHEN 사용자가 답변을 저장하면, THE InterviewPrep SHALL 해당 질문을 답변 완료 상태로 표시한다.
4. THE InterviewPrep SHALL 사용자가 커스텀 면접 질문을 직접 추가할 수 있도록 한다.
5. THE InterviewPrep SHALL 사용자가 질문 카테고리(기술, 인성, 상황) 및 직무별로 질문 목록을 필터링할 수 있도록 한다.
6. WHEN 사용자가 모의 면접 모드를 시작하면, THE InterviewPrep SHALL 저장된 질문 중 무작위로 질문을 하나씩 표시하고 답변 입력 후 다음 질문으로 넘어갈 수 있도록 한다.

---

### Requirement 7: 데이터 영속성 및 오류 처리

**User Story:** As a 전공심화 학생, I want to 내가 입력한 모든 데이터가 안전하게 저장되고 오류 없이 불러와지길 원한다, so that 데이터 손실 없이 서비스를 지속적으로 이용할 수 있다.

#### Acceptance Criteria

1. THE System SHALL 사용자의 모든 데이터를 서버 데이터베이스에 저장하여 기기 변경 시에도 동일한 데이터에 접근할 수 있도록 한다.
2. IF 네트워크 오류로 인해 데이터 저장에 실패하면, THEN THE System SHALL 저장 실패 메시지를 표시하고 사용자가 재시도할 수 있는 버튼을 제공한다.
3. IF 페이지 로딩 중 데이터 조회에 실패하면, THEN THE System SHALL 오류 메시지와 함께 새로고침 버튼을 표시한다.
4. WHILE 데이터를 불러오는 중이면, THE System SHALL 로딩 인디케이터를 표시한다.
5. THE System SHALL 사용자 데이터를 다른 사용자가 접근할 수 없도록 인증된 사용자의 데이터만 반환한다.
