# CS 취업지원 포털

Next.js + Prisma + PostgreSQL(Supabase) 기반 취업지원 웹 애플리케이션

## 기술 스택

- **Frontend**: Next.js 14, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Supabase)
- **Auth**: NextAuth.js
- **Deploy**: Vercel

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
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
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

### 환경변수 설정 (Vercel 대시보드)

| 변수명 | 값 |
|--------|-----|
| `DATABASE_URL` | Supabase connection pooling URL (포트 6543) |
| `DIRECT_URL` | Supabase direct URL (포트 5432) |
| `NEXTAUTH_SECRET` | 랜덤 시크릿 (openssl rand -base64 32) |
| `NEXTAUTH_URL` | 배포된 Vercel URL (예: https://your-app.vercel.app) |

### 배포

```bash
# Vercel CLI 사용 시
vercel --prod
```

또는 GitHub 연동 후 main 브랜치 push 시 자동 배포

## 주요 기능

- 채용공고 조회 및 북마크
- 지원 현황 관리 (칸반 보드)
- 자기소개서 작성 및 AI 분석
- 면접 질문 준비
- 기술 스택 로드맵
- 관리자: 공고 업로드, 사용자 관리, 통계
- 리크루터: 공고 직접 등록
