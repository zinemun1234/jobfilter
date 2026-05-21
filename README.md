# JobFilter

컴퓨터공학부 학생을 위한 맞춤 취업 공고 필터링 & 자소서 코칭 웹 애플리케이션

## 핵심 기능

**① 맞춤 공고 자동 필터링**
- 학교 취업지원처 엑셀 파일을 업로드하면 개발·IT·보안·데이터 직군 공고만 자동 추출
- 내 기술 스택 기반 매칭률 표시, 마감 D-day 카운트
- 공고에서 바로 자소서 작성 연결

**② 자소서 빨간펜 코칭**
- AI 없이 키워드 기반 분석 (서버 비용 0원)
- STAR 기법, 공허한 표현, 수치 포함 여부, 직군 키워드 등 11가지 항목 체크
- 재분석 시 이전 피드백 대비 개선/잔존/신규 이슈 비교
- 버전 히스토리 자동 저장 (최대 10개), 점수 변화 그래프

**부가 기능**
- 지원 현황 관리 (테이블 뷰 / 칸반 보드)
- 기술 스택 로드맵 (직군별 학습 경로)
- 면접 질문 준비 + 모의 면접
- 공고 북마크, 지원 캘린더
- 관리자: 사용자 관리, 통계, 공지사항

## 기술 스택

| 분류 | 기술 |
|------|------|
| Frontend | Next.js 14 (App Router), React, Tailwind CSS, shadcn/ui |
| Backend | Next.js API Routes, Prisma ORM |
| Database | PostgreSQL (Supabase) |
| Auth | NextAuth.js (Credentials) |
| Deploy | Vercel |

## 로컬 개발 환경 설정

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.example`을 복사해서 `.env.local` 생성 후 값 입력:

```bash
cp .env.example .env.local
```

```env
DATABASE_URL="postgresql://..."        # Supabase connection pooling URL (포트 6543)
DIRECT_URL="postgresql://..."          # Supabase direct URL (포트 5432)
NEXTAUTH_SECRET="랜덤 시크릿 키"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. DB 마이그레이션

```bash
npm run db:migrate
```

### 4. 개발 서버 실행

```bash
npm run dev
```

## Vercel 배포

### 환경변수 (Vercel 대시보드 → Settings → Environment Variables)

| 변수명 | 설명 |
|--------|------|
| `DATABASE_URL` | Supabase connection pooling URL (포트 6543) |
| `DIRECT_URL` | Supabase direct URL (포트 5432) |
| `NEXTAUTH_SECRET` | 랜덤 시크릿 (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | 배포된 Vercel URL (예: `https://jobfilter.vercel.app`) |

빌드 시 `prisma migrate deploy`가 자동 실행됩니다.

## 프로젝트 구조

```
app/
├── (auth)/          # 로그인, 회원가입
├── (dashboard)/     # 학생 대시보드 (공고, 자소서, 면접 등)
├── (admin)/         # 관리자 페이지
├── (recruiter)/     # 리크루터 페이지
└── api/             # API Routes

lib/
├── auth.ts                  # NextAuth 설정
├── prisma.ts                # Prisma 클라이언트 싱글톤
├── cover-letter-analysis.ts # 자소서 키워드 분석 엔진
├── dashboard.ts             # 대시보드 유틸 함수
└── ...

prisma/
└── schema.prisma    # DB 스키마
```

## 사용자 역할

| 역할 | 설명 |
|------|------|
| `USER` | 일반 학생 — 공고 조회, 자소서 작성, 면접 준비 |
| `ADMIN` | 관리자 — 공고 업로드, 사용자 관리, 통계 |
| `RECRUITER` | 기업 담당자 — 공고 직접 등록 (관리자 승인 필요) |
