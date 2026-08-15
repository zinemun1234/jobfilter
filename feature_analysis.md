# JobFilter 기능 분석 보고서

기준: 2026-08-11 코드 + `JobFilter_UIUX_디자인_계획.md` 6-3~6-15

## 전체 구조

Next.js 14 App Router, Prisma/PostgreSQL, NextAuth, TanStack Query, Tailwind. 라우트: `(auth)/(dashboard)/(admin)/(recruiter)/open/embed`. 핵심 lib: `lib/matching.ts`, `lib/notifications.ts`, `lib/cover-letter-analysis.ts`, `lib/cover-letter-duplicate.ts`, `lib/github-analysis.ts`, `lib/status-config.ts`.

---

## A. 맞춤 공고 검색 & 필터

1. **파일/라우트/API**: `app/(dashboard)/listings/*`; `GET/POST /api/listings`, `GET /public`, `POST /bookmark`
2. **Prisma**: `JobListing`, `JobBookmark`, `JobPosting`
3. **핵심**: `lib/matching.ts:44` `calculateMatching`; 클라이언트 search/매칭정렬/마감·경력 필터; 북마크 낙관적 UI
4. **현재 이슈**: 데이터 증가 시 클라이언트 필터/정렬 한계
5. **개선**: 서버 페이지네이션, 멀티필터, URL query 동기화, 대소문자 구분 없는 검색. `listings/page.tsx`, `open/listings`, `api/listings/route.ts`
6. **노력**: medium
7. **리스크**: 페이지네이션/매칭정렬 일관성

## B. 내 지원 현황 칸반 보드

1. **파일/라우트/API**: `app/(dashboard)/jobs/*`, `components/jobs/KanbanBoard.tsx:149`; `GET /api/jobs`, `/api/jobs/[id]` CRUD, `PATCH`는 ADMIN
2. **Prisma**: `JobPosting`, `StatusHistory`
3. **핵심**: DnDKit 6단계 칸반. `jobs/page.tsx:138` `onStatusChange`가 `toast.error`로 막혀 드래그 변경 무의미
4. **현재 이슈**: 칸반 UI만 완성, 드래그 동작 차단됨
5. **개선**: 드래그를 `PUT`/`PATCH` 연결, optimistic update, 사용자 권한 부여. `KanbanBoard.tsx`, `jobs/page.tsx`, `api/jobs/[id]/route.ts`
6. **노력**: small
7. **리스크**: 상태 이력 중복, 권한 검증

## C. 자소서 코칭 & 템플릿

1. **파일/라우트/API**: `app/(dashboard)/cover-letter/*`, `components/cover-letter/*`, `app/api/cover-letter/*`; `GET/POST /cover-letter`, `POST /analyze`
2. **Prisma**: `CoverLetter`, `CoverLetterVersion`, `Experience`
3. **핵심**: `cover-letter/page.tsx:40` 직군 템플릿. `lib/cover-letter-analysis.ts:92` rule-based 11항목 분석. `lib/cover-letter-duplicate.ts` 유사도 검사
4. **현재 이슈**: rule 기반; 템플릿/버전 관리 UI 미흡
5. **개선**: 템플릿 선택기, 버전 관리 UI, PDF export 메인 연결, analysisHistory 가시화. `cover-letter/page.tsx`, `CoachingGuide.tsx`, `ExperienceLibrary.tsx`
6. **노력**: medium
7. **리스크**: rule-based 한계, analysisHistory 크기

## D. 매칭 점수 & 추천 사유

1. **파일/라우트/API**: `lib/matching.ts:44`, `app/api/dashboard/priority-jobs/route.ts`, `components/dashboard/PrioritySection.tsx`, `PriorityJobCard.tsx`; `/priority-jobs` → TOP 5 + `priorityScore`, `reasons`
2. **Prisma**: `User`, `JobListing`
3. **핵심**: `matching.ts` 4가지 점수 합산. `PrioritySection.tsx` 슬라이더. `PriorityJobCard`에 `reasons`/`matchedSkills` 표시
4. **현재 이슈**: `competitionScore`가 북마크 수 기반
5. **개선**: `reasons` 툴팁, `missingSkills`→로드맵 연결, 가중치 DB 저장. `PriorityJobCard.tsx`, `listings/page.tsx`
6. **노력**: small
7. **리스크**: 북마크 기반 경쟁률의 현실적 한계

## E. 관리자 통계 & 리포트

1. **파일/라우트/API**: `app/(admin)/admin/stats/page.tsx`, `app/api/admin/stats/route.ts:20`; `GET /admin/stats` → summary + charts
2. **Prisma**: `User`, `JobPosting`, `JobListing`, `EmploymentRecord`
3. **핵심**: `recharts` 시각화. 월별 추이/상태/직군/목표직무, 취업률
4. **현재 이슈**: export/리포트 기능 없음, 통계 쿼리 무거움
5. **개선**: CSV/XLSX/PDF export API `app/api/admin/reports/route.ts` 추가, 날짜 범위 필터, 쿼리 캐싱. `admin/stats/page.tsx`, `admin/stats/route.ts`
6. **노력**: medium
7. **리스크**: 통계 쿼리 부하, 인덱스 필요

## F. 캘린더 & iCal 내보내기

1. **파일/라우트/API**: `app/(dashboard)/calendar/page.tsx`; `GET /api/jobs`
2. **Prisma**: `JobPosting`
3. **핵심**: `date-fns` 월간 캘린더. 마감/면접 dot. `InterviewModal`에서 `PUT /api/jobs/:id`로 `interviewAt` 저장
4. **현재 이슈**: iCal/ICS export 미구현
5. **개선**: `app/api/calendar/ical/route.ts` + `lib/ical.ts` 신규, KST ICS 버튼
6. **노력**: small
7. **리스크**: 시간대/ICS 클라이언트 호환성

## G. Empty & Skeleton 상태

1. **파일/라우트/API**: 전역(목록/카드/차트)
2. **Prisma**: 해당 없음
3. **핵심**: 각 페이지마다 `animate-pulse` div/empty `<div>` 산재
4. **현재 이슈**: 공통 컴포넌트 부재로 중복/불일치
5. **개선**: `components/ui/empty-state.tsx`, `skeleton-list.tsx`, `skeleton-card.tsx` 신규 후 전역 적용
6. **노력**: small
7. **리스크**: UI 표준화

## H. 알림 / 공지 / 북마크 통합

1. **파일/라우트/API**: `notifications`, `/notices`, `/bookmarks`, `components/layout/Sidebar.tsx`, `/api/notifications`, `/api/notices`; `GET/PATCH /notifications`, `POST /sync`
2. **Prisma**: `UserNotification`, `Notice`, `JobBookmark`
3. **핵심**: `lib/notifications.ts:19` `syncJobNotifications`로 마감/면접/팔로업 알림. Sidebar 미읽음 뱃지
4. **현재 이슈**: 세 기능이 별도 페이지로 분리
5. **개선**: 알림/공지 드롭다운, dashboard 위젯, 북마크 뱃지. `Sidebar.tsx`, `dashboard/page.tsx`
6. **노력**: small
7. **리스크**: `sync` 과다 호출로 알림 중복

## I. Recruiter 기능 완전 제거

1. **파일/라우트/API**: `app/(recruiter)/*`, `app/(auth)/register-recruiter`, `/api/auth/register-recruiter`, `/api/recruit`, `/api/recruiter/listings/*`, `app/recruit/page.tsx`, `lib/validations/recruiter.ts`; `/recruit`, `/recruiter/listings` CRUD
2. **Prisma 영향**: `User`(role/companyName/companyDesc/isApproved), `JobListing`(recruiterId)
3. **핵심**: `next.config.js:11-13`에서 이미 `/register-recruiter`, `/recruit`, `/recruiter` 리다이렉트
4. **현재 이슈**: 실제 사용 제한, 코드/DB 잔존
5. **개선**: 파일 삭제, `auth.ts`/`Sidebar` RECRUITER 분기 제거, `admin/stats` `pendingRecruiters` 제거, Prisma 마이그레이션
6. **노력**: medium
7. **리스크**: DB 마이그레이션, `JobListing` 소유 관계

## J. GitHub / 포트폴리오 / 로드맵 / 면접 현황

1. **파일/라우트/API**: `lib/github-analysis.ts:99`, `app/(dashboard)/portfolio/*`, `app/(dashboard)/roadmap/*`, `app/(dashboard)/interview/*`, `components/**/*`; `/api/portfolio`, `/api/roadmap`, `/api/interview/*`
2. **Prisma**: `Portfolio`, `RoadmapItem`, `InterviewQuestion/Answer`
3. **핵심**: GitHub 공개 API 분석; 포트폴리오 PDF export; 로드맵 템플릿/상태 토글; 면접 질문/답변/모의 면접
4. **현재 이슈**: GitHub API rate limit; `lib/roadmapTemplates.ts` 중복
5. **개선**: GitHub 보존(PAT/rate limit), 포트폴리오 보존(PDF 폰트), 로드맵 보존(`lib/roadmapTemplates.ts` 제거), 면접 보존(답변 평가)
6. **노력**: small~medium
7. **리스크**: GitHub API rate limit, 중복 파일 정리

---

## 정리 대상 파일

- `lib/roadmapTemplates.ts` → `lib/roadmap-templates.ts` 중복, 미사용
- 브라우저 자동화 도구 로그, `page-*.yml` → 테스트 아티팩트
- `lib/generated/prisma/query_engine-*.node.tmp*` → Prisma 임시 파일
- `app/recruit`, `app/(recruiter)`, `app/(auth)/register-recruiter`

---

## 우선 추천 TOP 3

1. **칸반 드래그 상태 변경 + 공고 서버 필터/페이지네이션** (small~medium)
2. **iCal 캘린더 내보내기 + 알림/공지 대시보드 통합** (small)
3. **관리자 리포트 export + 공통 Empty/Skeleton 컴포넌트** (small~medium)
