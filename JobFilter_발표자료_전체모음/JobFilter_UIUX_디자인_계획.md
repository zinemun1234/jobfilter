# JobFilter UI/UX 디자인 계획서

> 본 문서는 Next.js 14 App Router 기반 `JobFilter` 프로젝트의 **전체 `.tsx` 화면/컴포넌트**에 대한 통합 디자인 방향과 구체적인 적용 규칙을 담고 있습니다.  
> 대상: USER(학생), ADMIN, RECRUITER 역할을 가진 취업 공고 필터링 & 자소서 코칭 플랫폼입니다.

---

## 1. 문서 개요 및 프로젝트 맥락

### 1-1. 프로젝트 정보

| 항목 | 내용 |
|------|------|
| 프로젝트 루트 | `C:\Users\USER\Downloads\새 폴더 (48)\jobfilter` |
| 기술 스택 | Next.js 14 (App Router), React, TypeScript, Tailwind CSS, shadcn/ui |
| shadcn 설정 | style: `radix-nova`, baseColor: `neutral`, icon: `lucide` |
| 폰트 | `Inter` (Google Fonts, `app/layout.tsx` 16행) |
| 상태 관리 | TanStack Query, NextAuth, Sonner Toaster |
| 대상 사용자 | USER(학생), ADMIN(관리자), RECRUITER(기업/구인자) |

### 1-2. 현재 디자인 상태 분석

- **랜딩 페이지(`app/page.tsx`)**: `#0f172a` 기반 다크 블루/바이올렛 테마, `blue-500` 강조색, 그라데이션 히어로, 투명 카드.
- **대시보드/관리자 영역**: 라이트 테마, `bg-slate-100/80` 배경, `max-w-5xl` 중앙 정렬, `rounded-2xl` 카드, `gray-900` 텍스트.
- **공통 패턴**: `lucide` 아이콘, `rounded-xl/rounded-2xl` 보더, `shadow-sm/shadow-lg` 그림자, `animate-pulse` 스켈레톤, `sonner` 토스트.
- **문제점**: CSS 변수(`oklch`)와 Tailwind `hsl(var(--...))` 매핑이 일치하지 않는 구조적 이슈가 있으며, 랜딩/인증 페이지는 다크, 내부 앱은 라이트로 테마가 분리되어 있어 통합 디자인 언어가 필요합니다.

---

## 2. 통합 비주얼 아이덴티티

### 2-1. 디자인 철학

`JobFilter`는 "기술로 정리된 취업 준비"라는 메시지를 전달해야 합니다.  
따라서 모든 화면은 **전문적(professional)이면서도 따뜻하고(warm)**, **정보 밀도가 높으면서도 산만하지 않은(clarity)** 느낌을 목표로 합니다.

| 원칙 | 설명 |
|------|------|
| **Clarity(명료성)** | 마감일, 합격 상태, 매칭 점수 같은 핵심 정보가 즉시 구분됩니다. |
| **Consistency(일관성)** | 랜딩, 인증, 대시보드, 관리자 모두 동일한 색상/타이포/여백 체계를 따릅니다. |
| **Efficiency(효율성)** | 학생들이 빠르게 공고를 보고 지원 상태를 관리할 수 있도록 핵심 동선을 최소화합니다. |
| **Trust(신뢰감)** | 관리자/리크루터 페이지에서도 안정적인 그리드와 명확한 피드백 색상을 사용합니다. |

### 2-2. 컬러 팔레트

기존 `neutral` baseColor를 유지하면서, 브랜드 강조색을 `blue-violet` 계열로 통일하고, 상태/피드백 색상을 명확히 분리합니다.

#### 2-2-1. CSS 변수 기본값 (라이트 모드 권장)

`app/globals.css`에 현재 정의된 `--background` 등의 변수를 다음과 같이 정리합니다.  
참고: 현재 `oklch` 값이 `tailwind.config.ts`의 `hsl(var(--...))`과 호환되지 않으므로, **직접 `oklch()`를 사용하거나 `hsl()`로 변환**해야 합니다. (하단 "디자인 토큰 사용" 절 참조)

| 토큰 | 현재 값 (줄) | 통일 권장 값 | 용도 |
|------|------------|------------|------|
| `--background` | `oklch(1 0 0)` (`globals.css` 9행) | `#f8fafc` / `oklch(0.98 0 0)` | 대시보드 페이지 배경 |
| `--foreground` | `oklch(0.145 0 0)` | `#0f172a` | 본문 텍스트 |
| `--card` | `oklch(1 0 0)` | `#ffffff` | 카드 배경 |
| `--card-foreground` | `oklch(0.145 0 0)` | `#0f172a` | 카드 내 텍스트 |
| `--primary` | `oklch(0.205 0 0)` | `#2563eb` (`blue-600`) | 주 버튼, 활성 링크 |
| `--primary-foreground` | `oklch(0.985 0 0)` | `#ffffff` | Primary 위 텍스트 |
| `--secondary` | `oklch(0.97 0 0)` | `#f1f5f9` | 보조 버튼, 태그 배경 |
| `--muted` | `oklch(0.97 0 0)` | `#f1f5f9` | 구분선, 휴면 영역 |
| `--muted-foreground` | `oklch(0.556 0 0)` | `#64748b` | 설명/플레이스홀더 |
| `--accent` | `oklch(0.97 0 0)` | `#eff6ff` (`blue-50`) | 강조 배경, 호버 |
| `--border` | `oklch(0.922 0 0)` | `#e2e8f0` | 카드/입력 보더 |
| `--ring` | `oklch(0.708 0 0)` | `#3b82f6` | 포커스 링 |
| `--destructive` | `oklch(0.58 0.22 27)` | `#ef4444` | 삭제/오류 |

#### 2-2-2. 브랜드/강조색

| 색상명 | Hex | Tailwind | 사용처 |
|--------|-----|----------|--------|
| Brand Blue | `#2563eb` | `blue-600` | CTA 버튼, 랜딩/로그인 강조, 활성 네비게이션 |
| Brand Violet | `#7c3aed` | `violet-600` | 매칭/AI 코칭, 뱃지, 관리자 메뉴 강조 |
| Brand Cyan | `#06b6d4` | `cyan-500` | 그라데이션 포인트, NEW/최신 뱃지 |
| Success | `#10b981` | `emerald-500` | 합격, 저장 완료, 긍정 상태 |
| Warning | `#f59e0b` | `amber-500` | 마감 임박, 승인 대기, 주의 |
| Danger | `#ef4444` | `red-500` | 삭제, 거절, 필수 오류 |
| Neutral Dark | `#0f172a` | `slate-900` | 랜딩/사이드바/인증 브랜딩 다크 배경 |

#### 2-2-3. 상태 색상 매트릭스

현재 `app/(dashboard)/jobs/page.tsx` 16-23행의 `statusConfig`처럼, 모든 상태는 `dot + text + bg` 3가지 색상 조합으로 일관되게 적용합니다.

| 상태 | dot | text | bg | 사용 예 |
|------|-----|------|-----|--------|
| `PREPARING` | `bg-slate-400` | `text-slate-700` | `bg-slate-50` | 서류 준비 중 |
| `APPLIED` | `bg-blue-500` | `text-blue-700` | `bg-blue-50` | 지원 완료 |
| `DOCUMENT_PASS` | `bg-emerald-500` | `text-emerald-700` | `bg-emerald-50` | 서류 합격 |
| `INTERVIEW` | `bg-amber-500` | `text-amber-700` | `bg-amber-50` | 면접 예정 |
| `FINAL_PASS` | `bg-violet-500` | `text-violet-700` | `bg-violet-50` | 최종 합격 |
| `REJECTED` | `bg-red-400` | `text-red-700` | `bg-red-50` | 불합격 |

### 2-3. 라이트/다크 모드

- **기본**: 라이트 모드. 대시보드, 관리자, 리크루터 모두 라이트입니다.
- **랜딩/인증**: 다크 히어로를 유지하지만, 내부로 들어가면 라이트로 전환되는 경험을 자연스럽게 합니다.
- **다크 클래스(`dark`)**: `.dark` 변수(`globals.css` 44-76행)는 관리자나 일부 사용자(향후)를 위해 보존하되, 기본적으로는 `html`에 `dark` 클래스를 붙이지 않습니다.
- **모드 전환 필요 시**: `next-themes` 도입을 권장하며, `app/layout.tsx`의 `html`에 `className={inter.className}` 대신 `suppressHydrationWarning`과 함께 적용합니다.

### 2-4. 타이포그래피

| 요소 | 스펙 | 적용 클래스 |
|------|------|------------|
| 페이지 제목 | `text-2xl font-semibold tracking-tight text-gray-900` | `app/(dashboard)/jobs/page.tsx` 86행, `app/(dashboard)/listings/page.tsx` 171행 등 |
| 섹션 소제목 | `text-lg font-semibold text-gray-900` | 카드 헤더, 폼 그룹 |
| 카드/목록 제목 | `text-sm font-medium text-gray-900` | `components/interview/InterviewCard.tsx` 60행 |
| 본문 | `text-sm text-gray-600 leading-relaxed` | 설명, 본문 문단 |
| 캡션/라벨 | `text-xs font-medium text-gray-400 uppercase tracking-wider` | `app/(auth)/login/page.tsx` 141-154행, 표 헤더 |
| 뱃지/태그 | `text-[10px] font-bold` | `app/page.tsx` 127-138행, NEW/태그 |
| 히어로 타이틀 | `text-5xl md:text-6xl font-light tracking-tight` | `app/page.tsx` 76-81행 |

**권장 사항**
- `Inter`는 latin subset만 로드. 한국어는 브라우저 기본 폰트 폴백을 사용하게 됩니다.
- 향후 **Pretendard** 또는 **SUIT** 같은 한글 sans-serif 웹폰트를 `next/font`로 추가하여 가독성을 높이는 것을 권장합니다.

### 2-5. 스페이싱

| 단위 | 사용처 |
|------|--------|
| `p-4` / `px-4 py-3` | 버튼, 태그, 뱃지 |
| `p-5` / `p-6` | 카드, 폼 섹션 패딩 |
| `space-y-4` / `space-y-6` | 폼/카드 세로 간격 |
| `gap-3` / `gap-4` | 내부 그리드/목록 |
| `px-6 py-8` | 페이지 최상위 래퍼 상하좌우 여백 |
| `max-w-5xl mx-auto` | 대시보드/관리자 콘텐츠 최대 폭 |
| `max-w-2xl mx-auto` | 프로필/설정 콘텐츠 최대 폭 |

### 2-6. 보더 라디우스

- `--radius: 0.625rem` (`10px`)을 기준으로 합니다.
- **카드**: `rounded-2xl` (`1rem`)를 주로 사용.
- **버튼/입력**: `rounded-xl` 또는 `rounded-lg`.
- **뱃지/태그**: `rounded-full`.
- **모달/슬라이드오버**: `rounded-l-2xl` / `rounded-t-2xl` (모바일).

### 2-7. 그림자

| 클래스 | 사용처 |
|--------|--------|
| `shadow-sm` | 카드, 표, 내부 패널 |
| `shadow-lg` | 떠 있는 카드(`PrioritySection`), 드롭다운, 모달 |
| `shadow-blue-500/25` | 랜딩 CTA 버튼 글로우 |
| `shadow-slate-900/10` | 대시보드 primary 버튼 |

---

## 3. 디자인 토큰 사용법

### 3-1. CSS 변수 vs Tailwind 매핑

현재 `tailwind.config.ts` 21-55행은 다음과 같이 `hsl(var(--...))`를 사용합니다.

```ts
colors: {
  border: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
  // ...
}
```

그러나 `app/globals.css`의 변수 값은 `oklch(...)`입니다.  
예: `--primary: oklch(0.205 0 0);` → Tailwind에서 `hsl(oklch(0.205 0 0))`로 해석되어 **유효하지 않은 CSS**가 됩니다.

**권장 수정 방안 2가지**

#### 방안 A: CSS 변수를 HSL 문자열로 통일 (권장)

`app/globals.css`의 모든 변수를 HSL 형식으로 변환합니다.

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;
  --card: 0 0% 100%;
  --primary: 217.2 91.2% 59.8%;       /* blue-500 */
  --primary-foreground: 0 0% 100%;
  --secondary: 210 40% 96.1%;
  --muted: 210 40% 96.1%;
  --border: 214.3 31.8% 91.4%;
  --ring: 217.2 91.2% 59.8%;
  --radius: 0.625rem;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 100%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 47.4% 11.2%;
  /* ... */
}
```

#### 방안 B: Tailwind 색상을 CSS `var()` 원시값으로 사용

`tailwind.config.ts`의 `colors`를 `var()` 그대로 사용하고, `color-mix` 대신 `oklch` 직접 사용.

```ts
colors: {
  background: 'var(--background)',
  foreground: 'var(--foreground)',
  primary: { DEFAULT: 'var(--primary)', foreground: 'var(--primary-foreground)' },
  // ...
}
```

이 경우 배경색/글자색은 정상 동작하지만, Tailwind의 `bg-primary/10` 같은 opacity 문법은 `color-mix`가 필요합니다.  
따라서 **방안 A가 호환성과 유지보수에 가장 유리**합니다.

### 3-2. Tailwind 패턴

| 패턴 | 설명 | 예시 |
|------|------|------|
| `bg-X-50 text-X-700 border-X-200` | 상태/강조 카드 | `statusConfig` (`jobs/page.tsx` 16-23행) |
| `hover:bg-X-600 transition-colors` | 버튼/링크 호버 | `app/page.tsx` 58-94행 |
| `focus:border-[#0f172a] focus:ring-2 focus:ring-[#0f172a]/10` | 입력 포커스 | `app/(auth)/login/page.tsx` 146, 166행 |
| `rounded-2xl border border-gray-100 bg-white shadow-sm` | 기본 카드 | 대부분의 페이지 |
| `grid sm:grid-cols-2 lg:grid-cols-3 gap-4` | 카드 그리드 | `PrioritySection` (`components/dashboard/PrioritySection.tsx` 191행) |
| `animate-pulse` | 로딩/스켈레톤 | `app/(admin)/admin/page.tsx` 66, 150행 |

### 3-3. 색상 직접 지정(Hard-coded) 정리 대상

현재 많은 파일에서 `#0f172a`, `bg-blue-500`, `bg-violet-600` 등을 하드코딩하고 있습니다.  
아래 파일들은 디자인 토큰으로 치환하는 것을 권장합니다.

- `app/page.tsx` 27, 32, 46, 58, 68, 76, 90, 122, 161, 232, 252, 272, 282행 등
- `app/(auth)/login/page.tsx` 47, 57, 67, 87, 90, 112, 115, 121, 146, 166, 205, 216, 226행
- `app/(auth)/register/page.tsx` 77, 86, 95, 113, 146, 164, 172행
- `components/layout/Sidebar.tsx` 127-188행 (사이드바 전체)
- `components/layout/BottomNav.tsx` 19-33행
- `app/(dashboard)/layout.tsx` 19-27행

### 3-4. Z-index 체계

| z-index | 사용처 |
|---------|--------|
| `z-40` | 하단 네비게이션 `BottomNav.tsx` 19행 |
| `z-50` | 사이드바 모바일 드로어, 모달, 슬라이드오버 (향후 통일) |

---

## 4. 레이아웃 시스템

### 4-1. 앱 셸(App Shell)

`app/(dashboard)/layout.tsx` 18-31행의 구조를 기준으로, 데스크톱/모바일 공통 셸을 정립합니다.

```tsx
<div className="flex h-screen overflow-hidden bg-background">
  <Sidebar userName={...} userEmail={...} userRole={...} />
  <main className="flex-1 overflow-y-auto bg-[radial-gradient(...)] pt-14 pb-16 md:pt-0 md:pb-0">
    {children}
  </main>
  <BottomNav />
</div>
```

**권장 개선**
- `Sidebar` 배경색을 `--sidebar` 토큰으로 변경: `bg-[#0f172a]` → `bg-sidebar` 또는 `bg-slate-900`.
- `<main>` 상단/하단 패딩: `pt-14 pb-16`은 모바일 상단 헤더(56px) + 하단 탭바(64px) 대응. `md:` 이상에서는 `pt-0 pb-0`.
- 배경 그라디언트를 CSS 변수로 분리하여, `app/(dashboard)/layout.tsx` 26행의 복잡한 `bg-[radial-gradient(...)]`를 정리합니다.

### 4-2. 사이드바

`components/layout/Sidebar.tsx`가 USER/ADMIN/RECRUITER 메뉴를 분기합니다.

| 역할 | 메뉴 그룹 | 강조색 |
|------|----------|--------|
| USER | 대시보드, 맞춤공고, 찜한공고, 자소서 코칭, 지원현황, 캘린더, 로드맵, 알림, 공지, 프로필 | `blue-300/500` |
| ADMIN | 관리 대시보드, 취업 통계, 취업 확정 관리, 공고 DB 관리, 엑셀 업로드, 구인자 업로드, 사용자 관리, 공지사항 관리, 면접 질문 관리 | `red-300/500` |
| RECRUITER | 공고 관리 | `emerald-300/500` |

**디자인 규칙**
- 활성 메뉴: `bg-primary/10 text-primary` (라이트/다크 대응).
- 하이라이트 메뉴(맞춤공고, 자소서 코칭): `text-blue-300 hover:bg-blue-500/10`에서 `text-primary hover:bg-primary/10`으로 통일.
- 알림 배지: `bg-violet-500` → `bg-destructive`로, 미읽 메시지가 있음을 강조. 99+일 때 `99+` 텍스트 유지.
- 사용자 프로필 카드: 사이드바 하단에 `bg-white/5` 패널로 이름/이메일/로그아웃 배치.

### 4-3. 하단 네비게이션

`components/layout/BottomNav.tsx`는 모바일에서 5개 탭만 표시합니다.

```tsx
const tabs = [
  { href: '/dashboard',    label: '홈',      icon: LayoutDashboard },
  { href: '/listings',     label: '공고',    icon: ClipboardList },
  { href: '/cover-letter', label: '자소서',  icon: FileEdit },
  { href: '/jobs',         label: '지원현황', icon: Briefcase },
  { href: '/profile',      label: '프로필',  icon: User },
];
```

**디자인 규칙**
- 활성 탭: `text-primary` + 아이콘 `stroke-[2.5]`.
- 비활성 탭: `text-muted-foreground/60`.
- 배경: `bg-[#0f172a]` → `bg-slate-900` 또는 `bg-sidebar`.
- 상단 보더: `border-t border-white/10` → `border-t border-sidebar-border`.

### 4-4. 반응형 컨테이너

| 뷰포트 | 콘텐츠 최대 폭 | 좌우 패딩 |
|--------|--------------|----------|
| 모바일 (<640px) | 100% | `px-4` |
| 태블릿 (640-1024px) | 100% | `px-6` |
| 데스크톱 (>1024px) | `max-w-5xl` | `px-6` |
| 설정/폼 | `max-w-2xl` | `px-6` |

**현재 사용처**
- `app/(dashboard)/dashboard/page.tsx`, `jobs/page.tsx`, `listings/page.tsx`, `admin/page.tsx`, `admin/users/page.tsx`, `admin/listings/page.tsx` 등에서 `max-w-5xl mx-auto px-6 py-8` 사용.
- `app/(dashboard)/profile/page.tsx`는 `max-w-2xl`.

---

## 5. 컴포넌트 패턴

### 5-1. 카드

**기본 카드 형태**

```tsx
<div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
  <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
    <h2 className="text-sm font-semibold text-gray-900">카드 제목</h2>
    <Link className="text-xs text-muted-foreground hover:text-foreground">전체 보기</Link>
  </div>
  <div className="p-5">...</div>
</div>
```

**적용 파일**
- `app/(admin)/admin/page.tsx` 63-175행 (StatCard + 관리 메뉴 + 리스트 카드)
- `app/(dashboard)/jobs/page.tsx` 119-126행 (상태 요약 카드), 150-176행 (테이블 카드)
- `components/interview/InterviewCard.tsx` 전체
- `components/dashboard/PrioritySection.tsx` 96-196행

**권장 개선**
- 카드 헤더 보더를 `border-b border-border/50`으로 통일.
- `shadow-sm`만 사용하되, `hover:shadow-md transition-shadow`로 인터랙션 추가.

### 5-2. 버튼

**Button 컴포넌트(`components/ui/button.tsx`) 사용 가이드**

| variant | 용도 |
|---------|------|
| `default` | 주요 액션(저장, 추가, 검색, 로그인) |
| `outline` | 보조 액션(취소, 전체 보기, 토글 해제) |
| `secondary` | 필터/탭 비활성 |
| `ghost` | 아이콘 버튼, 삭제, 텍스트 링크 |
| `destructive` | 삭제, 거절, 회원 탈퇴 |
| `link` | 인라인 텍스트 링크 |

**주요 액션 버튼 색상 통일**
- 현재 `bg-[#0f172a]`로 하드코딩된 곳(`jobs/page.tsx` 111행, `admin/listings/page.tsx` 160행, `recruiter/page.tsx` 134행)을 `Button`의 `default`로 교체.
- `login/page.tsx`, `register/page.tsx`의 우측 폼 하단 제출 버튼도 `Button` 사용.

### 5-3. 표(Tables)

**기본 표 스타일**

```tsx
<table className="w-full text-sm">
  <thead>
    <tr className="border-b border-gray-100 bg-gray-50/70">
      <th className="text-left px-6 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wider">...</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-100">...</tbody>
</table>
```

**적용 파일**
- `app/(dashboard)/jobs/page.tsx` 177-284행
- `app/(admin)/admin/users/page.tsx` 175-335행
- `app/(admin)/admin/listings/page.tsx` 194-385행
- `app/(recruiter)/recruiter/page.tsx` 202-285행

**권장 개선**
- `bg-gray-50/70` 헤더 → `bg-muted/50`.
- `text-gray-400` → `text-muted-foreground`.
- `divide-gray-100` → `divide-border`.
- 행 호버: `hover:bg-muted/50 transition-colors`.
- 반응형: `hidden md:table-cell`, `hidden sm:table-cell`로 열 숨김.  
  - `app/(admin)/admin/users/page.tsx` 178-181행 참고.

### 5-4. 폼(Forms)

**입력 필드 기본**

```tsx
<div className="space-y-1.5">
  <Label htmlFor="email">이메일</Label>
  <Input
    id="email"
    type="email"
    placeholder="example@email.com"
    className="rounded-xl"
  />
  <p className="text-xs text-destructive">{errors.email?.message}</p>
</div>
```

**적용 파일**
- `app/(auth)/login/page.tsx` 138-226행
- `app/(auth)/register/page.tsx` 157-257행
- `components/portfolio/PortfolioForm.tsx` 108-251행
- `components/profile/ProfileForm.tsx` 100-242행
- `app/(recruiter)/recruiter/page.tsx` 141-198행

**권장 개선**
- `input`/`textarea` 하드코딩 클래스를 `Input`, `Textarea` 컴포넌트로 교체.
- 라벨 클래스 `text-xs font-semibold text-gray-500 uppercase tracking-wider`를 `Label` 컴포넌트와 `text-muted-foreground`로 통일.
- 포커스 링: `focus:ring-2 focus:ring-primary/20 focus:border-primary`.
- 에러 메시지: `text-destructive` 사용, `aria-invalid` 부여.

### 5-5. 모달 / 슬라이드오버

`components/ui/slide-over.tsx`와 `components/ui/dialog.tsx`, `components/ui/alert-dialog.tsx`를 사용합니다.

**슬라이드오버**
- 오른쪽에서 들어오는 `max-w-xl` 패널.
- 헤더: 제목 + 닫기 버튼.
- 바디: 스크롤 가능한 폼/콘텐츠.
- 적용: `jobs/page.tsx` 141-146행(`JobForm`), `admin/listings/page.tsx` (공고 등록/수정), `cover-letter/page.tsx`.

**삭제 확인 다이얼로그**
- `components/ui/delete-confirm-dialog.tsx`를 모든 삭제 플로우에 통일 사용.
- 적용: `jobs/page.tsx`, `admin/users/page.tsx`, `admin/listings/page.tsx`, `recruiter/page.tsx`.

### 5-6. 빈 상태(Empty States)

**패턴**

```tsx
<div className="flex flex-col items-center justify-center py-24 text-center">
  <Icon className="w-10 h-10 text-muted-foreground/30 mb-4" />
  <p className="text-sm font-medium text-foreground mb-1">등록된 채용 공고가 없습니다</p>
  <p className="text-xs text-muted-foreground mb-4">첫 공고를 추가해보세요</p>
  <Button onClick={...}>첫 공고 추가하기</Button>
</div>
```

**적용 파일**
- `app/(dashboard)/jobs/page.tsx` 161-175행
- `app/(admin)/admin/listings/page.tsx` 197-201행
- `app/(recruiter)/recruiter/page.tsx` 207-214행
- `app/(admin)/admin/users/page.tsx` 172-174행

**권장 개선**
- 아이콘 색상 `text-gray-200` → `text-muted-foreground/30`.
- 텍스트 `text-gray-400` → `text-muted-foreground`.
- CTA 버튼 추가하여 다음 동작 유도.

### 5-7. 로딩 / 스켈레톤

**패턴**

```tsx
<div className="p-6 space-y-3 animate-pulse">
  {[...Array(5)].map((_, i) => (
    <div key={i} className="h-12 bg-muted rounded" />
  ))}
</div>
```

**적용 파일**
- `app/(admin)/admin/page.tsx` 66, 150행
- `app/(dashboard)/jobs/page.tsx` 151-160행
- `app/(admin)/admin/listings/page.tsx` 195-196행
- `app/(recruiter)/recruiter/page.tsx` 203-206행

**권장 개선**
- `bg-gray-100` → `bg-muted`.
- 카드 형태의 스켈레톤은 `rounded-2xl`로 카드와 동일한 형태 유지.
- 데이터 fetching 중에는 `aria-busy="true"` 및 `role="status"` 추가.

### 5-8. 뱃지/태그

`components/ui/badge.tsx`를 기준으로 합니다.

| variant | 용도 |
|---------|------|
| `default` | 기술 스택, 태그, 역할 |
| `secondary` | 구분 태그 |
| `outline` | 추가 가능한 기술 스택 (클릭 가능) |
| `destructive` | 거절, 탈퇴, 삭제 |

**현재 사용처**
- `components/portfolio/PortfolioForm.tsx` 142-185행 (기술 스택 추가/제거)
- `components/profile/ProfileForm.tsx` 182-184행 (기술 스택 뱃지)
- `app/page.tsx` 127-139행 (NEW, 고용형태, 태그)
- `app/(dashboard)/listings/page.tsx` 72-85행 (매칭 뱃지)

---

## 6. 라우트별 페이지 디자인 가이드라인

### 6-1. 랜딩 페이지

**파일**: `app/page.tsx`

**현재 구조**
- 27행: `min-h-screen bg-[#0f172a] text-white`
- 42-63행: 헤더(로고, 로그인/시작하기)
- 65-98행: 히어로(뱃지, 타이틀, CTA)
- 100-159행: 공고 미리보기
- 161-292행: 핵심 기능 2개 + 추가 섹션

**디자인 방향**
1. **다크 브랜딩 유지**: `#0f172a` 배경, 블루→시안 그라데이션, 블러 오브는 살립니다.
2. **학과 연결 배너**: `info`(blue) / `aisw`(violet) 분기를 그대로 유지.  
   `bg-blue-600`/`bg-violet-600` 대신 `bg-primary` + `data-violet` 변형 클래스 사용.
3. **히어로 타이틀**: `text-5xl md:text-6xl font-light tracking-tight`, 강조 부분은 `bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent` 유지.
4. **공고 카드**: `rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/8` 유지.  
   다크 모드에서는 `bg-white/5`를 CSS 변수로 분리 (`--card-dim` 같은 토큰 신설 권장).
5. **CTA 버튼**: `bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 rounded-xl`.
6. **모바일**: 히어로 타이틀 `text-4xl`, CTA 버튼 전체 폭 사용, 미리보기 카드 1열.

**구체 적용**
- `app/page.tsx` 27, 46, 58, 68, 76, 90, 122, 161, 232, 252, 272, 282행의 하드코딩 색상을 CSS 변수로 교체.
- `bg-blue-500` → `bg-primary`
- `text-blue-300` → `text-primary-300`
- `border-white/10` → `border-white/10` (다크에서만 유효, 변수화)

### 6-2. 인증 페이지 (로그인/회원가입/비밀번호 찾기)

**파일**
- `app/(auth)/login/page.tsx`
- `app/(auth)/register/page.tsx`
- `app/(auth)/forgot-password/page.tsx`
- `app/(auth)/reset-password/page.tsx`
- `app/(auth)/register-recruiter/page.tsx`
- `app/(auth)/layout.tsx`

**현재 구조**
- 좌측 브랜딩 패널(다크, `bg-[#0a0f1e]`, 블러 오브, 그리드 패턴)
- 우측 폼 패널(라이트, `bg-gray-50/50`, `max-w-[380px]`)

**디자인 방향**
1. **좌측 브랜딩 패널**
   - `bg-[#0a0f1e]` → `bg-slate-950`.
   - 블러 오브 색상: `bg-blue-600/20`, `bg-violet-600/15` → `bg-primary/20`, `bg-violet-500/15`.
   - 그리드 패턴 투명도 0.03 유지.
   - 피처 카드: `rounded-2xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-sm`.
2. **우측 폼 패널**
   - `bg-gray-50/50` → `bg-background`.
   - 입력: `rounded-xl border-border bg-white focus:border-primary focus:ring-2 focus:ring-primary/20`.
   - 에러 알럿: `rounded-xl bg-destructive/10 border border-destructive/20 text-destructive`.
   - 성공 알럿: `rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700`.
3. **버튼**: `w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold`.
4. **모바일**: 좌측 브랜딩 제거, 상단 모바일 로고만 표시.

**적용 포인트**
- `app/(auth)/login/page.tsx` 47, 57, 67, 87, 90, 112, 115, 121, 146, 166, 205, 216, 226행
- `app/(auth)/register/page.tsx` 77, 86, 95, 113, 146, 164, 172, 205, 219, 248행

### 6-3. 대시보드 페이지

**파일**: `app/(dashboard)/dashboard/page.tsx`

**현재 구조**
- 172행 이후 JSX 영역: 인사말, 주요 통계 카드, 공지/알림, 추천 공고, 마감 임박, 준비 현황, 주간 활동 차트 등.

**디자인 방향**
1. **인사말 영역**
   - `text-2xl font-semibold text-gray-900` 유지.
   - 시간대별 인사말("좋은 아침이에요" 등)은 `text-muted-foreground`로 보조.
2. **통계 카드**
   - 4열 그리드(`grid-cols-2 lg:grid-cols-4 gap-4`).
   - 아이콘 + 값 + 라벨 구조.
   - 카드: `rounded-2xl border border-gray-100 bg-white shadow-sm p-5`.
3. **공지/알림 카드**
   - 상단 보더, `rounded-2xl`, `overflow-hidden`.
   - 고정 공지는 `bg-amber-50/50 border-amber-100` 강조.
4. **추천 공고 영역**: `components/dashboard/PrioritySection.tsx` 참고.
   - `rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-white shadow-lg`.
   - 슬라이더 카드: `bg-white/60`.
5. **마감 임박/준비 현황**: `UrgentDeadlines`, `RoadmapProgress` 컴포넌트 활용.

**적용 포인트**
- 페이지 전체 `max-w-6xl mx-auto px-6 py-8`로 확장 가능.
- 카드 사이 `space-y-6` 또는 `gap-6`.

### 6-4. 맞춤 공고 페이지

**파일**: `app/(dashboard)/listings/page.tsx`

**현재 구조**
- 160행 이후: 헤더, 검색, 정렬/필터, 공고 카드/아코디언 목록.

**디자인 방향**
1. **헤더**
   - `inline-flex` 뱃지: `bg-primary/10 border-primary/20 text-primary`.
   - 페이지 제목 + 공고 수 뱃지.
2. **검색/필터 영역**
   - 검색 인풋: 좌측 `Search` 아이콘, 우측 검색 버튼.
   - 매칭순 정렬 버튼: 활성 시 `bg-emerald-500 text-white`.
   - 마감일/경력 필터: 세그먼트 컨트롤(`rounded-xl bg-white border overflow-hidden`).
3. **공고 카드**
   - `rounded-2xl border border-gray-100 bg-white shadow-sm p-5`.
   - 상단: 기업명 + 매칭 뱃지 + 찜 버튼.
   - 본문: 직무, 태그, 마감일.
   - 하단: 지원 목록 추가 / 자소서 작성 / 상세 보기.
4. **매칭 점수 뱃지**
   - 60% 이상 `emerald`, 30-59% `amber`, 30% 미만 `gray`.
   - `components/dashboard/PriorityJobCard.tsx`와 동일 색상 규칙.

### 6-5. 내 지원 현황 페이지

**파일**: `app/(dashboard)/jobs/page.tsx`

**현재 구조**
- 78-284행: 상태 요약, 검색, 테이블/칸반 뷰, SlideOver, 삭제 다이얼로그.

**디자인 방향**
1. **상태 요약 카드**
   - 6개 상태를 `grid grid-cols-3 gap-3 sm:grid-cols-6`.
   - 카드: `rounded-2xl border border-gray-200 bg-white px-4 py-3.5 shadow-sm`.
   - 숫자 `text-xl font-bold`, 라벨 `text-[11px]`.
2. **뷰 토글**
   - `List`/`LayoutGrid` 아이콘으로 테이블/칸반 전환.
   - 활성 버튼: `bg-muted text-foreground`.
3. **테이블**
   - `thead` `bg-muted/50`, `tbody` `divide-y divide-border`.
   - 상태 셀: `rounded-full px-2.5 py-0.5 text-[10px] font-medium`.
4. **칸반 보드(`components/jobs/KanbanBoard.tsx`)**
   - 열 헤더: 상태 색상 dot + 라벨.
   - 카드: `rounded-xl border bg-white shadow-sm`.
   - 드래그 앤 드롭(가능 시) 시 `dragging:opacity-50 ring-2 ring-primary`.
5. **SlideOver**
   - `JobForm`을 슬라이드오버에 표시.
   - 헤더: 기업/직무 입력, 하단 저장/취소.

### 6-6. 자소서 코칭 페이지

**파일**
- `app/(dashboard)/cover-letter/page.tsx`
- `components/cover-letter/CoachingGuide.tsx`
- `components/cover-letter/KeywordHeatmap.tsx`
- `components/cover-letter/DuplicateCheckPanel.tsx`
- `components/cover-letter/ExperienceLibrary.tsx`

**현재 구조**
- 자소서 목록, 템플릿 선택, 작성/수정 SlideOver, 코칭 가이드, 히트맵, 중복 검사.

**디자인 방향**
1. **자소서 목록 카드**
   - 기업/직무/버전/마지막 수정일.
   - 상태: 작성 중, 완료, 분석 완료.
2. **작성 SlideOver**
   - 질문/답변 리스트, 접기/펼치기.
   - `textarea`는 `Textarea` 컴포넌트 사용, `rounded-xl`.
3. **코칭 가이드(`CoachingGuide.tsx`)**
   - 186-353행: `rounded-xl border border-amber-100 bg-amber-50/50`.
   - 탭: `guide`/`analyze`.
   - 피드백 뱃지: `good` emerald, `warn` amber, `bad` red.
4. **준비 현황(SkillReadiness)**
   - `rounded-2xl border border-violet-200/60 bg-gradient-to-br from-violet-50/80 to-indigo-50/60`.
   - Progress bar: `bg-violet-500`.

### 6-7. 면접 준비 페이지

**파일**
- `app/(dashboard)/interview/page.tsx`
- `components/interview/InterviewCard.tsx`
- `components/interview/AnswerSlideOver.tsx`
- `components/interview/CustomQuestionForm.tsx`
- `components/interview/MockInterviewModal.tsx`

**디자인 방향**
1. **질문 카드(`InterviewCard.tsx`)**
   - `rounded-xl border border-gray-100 bg-white shadow-sm`.
   - 헤더: 카테고리 dot + 라벨 + jobType 뱃지.
   - 하단: 답변 여부 뱃지 + 수정/작성 링크.
2. **카테고리 색상**
   - `TECHNICAL` blue, `PERSONALITY` emerald, `SITUATIONAL` amber.
3. **답변 슬라이드오버**
   - `textarea` + 저장 버튼.
   - `MockInterviewModal`은 중앙 모달, 타이머/문제 표시.

### 6-8. 기술 로드맵 페이지

**파일**
- `app/(dashboard)/roadmap/page.tsx`
- `components/roadmap/RoadmapTree.tsx`
- `components/roadmap/CustomSkillForm.tsx`

**현재 구조**
- `RoadmapTree.tsx` 26-111행: 단계 번호, 기술명, 참조 링크, 상태 토글, 삭제.

**디자인 방향**
1. **트리 항목**
   - 단계 번호 원: `h-7 w-7 rounded-full text-xs font-semibold text-white`.
   - 상태에 따른 색상: `NOT_STARTED` gray, `IN_PROGRESS` blue, `COMPLETED` emerald.
2. **상태 토글 버튼**
   - `rounded-full border px-3 py-1 text-xs font-medium`.
   - `hover:opacity-80 transition-opacity`.
3. **참조 링크**
   - `rounded-md border bg-muted px-2 py-0.5 text-xs`.
4. **커스텀 스킬 추가 폼**
   - `Input` + `Button` 조합, `rounded-xl`.

### 6-9. 포트폴리오 페이지

**파일**
- `app/(dashboard)/portfolio/page.tsx`
- `app/(dashboard)/portfolio/export/page.tsx`
- `components/portfolio/PortfolioForm.tsx`
- `components/portfolio/GitHubAnalysisCard.tsx`

**디자인 방향**
1. **포트폴리오 카드**
   - 제목, 설명, 기술 스택 태그, 기간, GitHub/배포 링크.
   - `rounded-2xl border bg-white shadow-sm`.
2. **포트폴리오 폼(`PortfolioForm.tsx`)**
   - `Label`, `Input`, `Textarea`, `Badge` 사용.
   - 기술 스택 추가: `Input` + `Button`, 추천 기술 `Badge variant="outline"`.
   - 삭제 버튼: 뱃지 내부 `X` 아이콘, `hover:bg-destructive hover:text-white`.
3. **GitHub 분석 카드**
   - 통계 숫자 강조, `rounded-2xl`.

### 6-10. 프로필 페이지

**파일**
- `app/(dashboard)/profile/page.tsx`
- `components/profile/ProfileForm.tsx`

**현재 구조**
- `max-w-2xl`, 폼, 리크루터 미리보기 토글.

**디자인 방향**
1. **리크루터 시점 토글**
   - `rounded-xl border border-blue-100 bg-blue-50/40 p-4`.
   - Toggle switch: `h-6 w-11 rounded-full bg-blue-600/gray-200`.
2. **폼 필드**
   - `Label` + `input`/`select`.
   - 리크루터 뷰에서는 필드 `disabled`, `bg-gray-50`, 마스킹(이름 `홍**`).
3. **기술 스택**
   - Owner: `Input` + 추가 버튼 + 삭제 뱃지.
   - Recruiter: `rounded-full bg-gray-100 px-2.5 py-1 text-xs` 뱃지로만 표시.

### 6-11. 캘린더 / 알림 / 공지 / 북마크

**파일**
- `app/(dashboard)/calendar/page.tsx`
- `app/(dashboard)/notifications/page.tsx`
- `app/(dashboard)/notices/page.tsx`
- `app/(dashboard)/bookmarks/page.tsx`

**디자인 방향**
1. **캘린더**: 월별 뷰, 마감일/면접일 dot.  
   - 일정 dot 색상: 마감일 `blue`, 면접 `amber`, 서류합격 `emerald`.
2. **알림**: 읽음/안읽음 구분, `bg-blue-50` 강조, 시간 `text-muted-foreground`.
3. **공지**: 고정 공지 `bg-amber-50/50`, 일반 공지 `bg-white` 카드.
4. **북마크**: 맞춤 공고 카드와 동일, 찜 해제 버튼 추가.

### 6-12. 관리자 영역

**파일**
- `app/(admin)/admin/page.tsx`
- `app/(admin)/admin/users/page.tsx`
- `app/(admin)/admin/listings/page.tsx`
- `app/(admin)/admin/listings/upload/page.tsx`
- `app/(admin)/admin/stats/page.tsx`
- `app/(admin)/admin/notices/page.tsx`
- `app/(admin)/admin/questions/page.tsx`
- `app/(admin)/admin/bulk-jobs/page.tsx`
- `app/(admin)/admin/employment/page.tsx`
- `app/(admin)/admin/users/[id]/page.tsx`
- `app/(admin)/layout.tsx`

**현재 구조**
- `app/(admin)/admin/page.tsx` 31-47행: NAV_ITEMS + COLOR_MAP.
- 통계 카드 4개 + 관리 메뉴 그리드 + 최근 가입/공고 리스트.

**디자인 방향**
1. **관리자 헤더**
   - `text-xs font-medium text-gray-400 uppercase tracking-widest` "Admin" 라벨.
   - 제목 `text-xl font-semibold text-gray-900`.
2. **통계 카드(StatCard)**
   - 아이콘 + 값 + 라벨 + 변동 뱃지.
   - 색상별 아이콘 배경: `bg-blue-100`, `bg-violet-100`, `bg-emerald-100`, `bg-amber-100`.
   - 보더: `border-blue-100` 등 연한 색상.
3. **관리 메뉴 그리드**
   - `grid-cols-2 md:grid-cols-3 gap-3`.
   - 아이콘 + 제목 + 설명 + ChevronRight.
   - `group hover:shadow-md transition-all`.
4. **사용자/공고 관리 표**
   - 표 형태, 검색, 승인/거절/삭제 버튼.
   - RECRUITER 승인 대기 배너: `rounded-xl border border-amber-200 bg-amber-50 p-4`.
5. **관리자 레이아웃**
   - `app/(admin)/layout.tsx` 확인 후 사이드바/탑바 통일.

### 6-13. 리크루터 영역

**파일**
- `app/(recruiter)/layout.tsx`
- `app/(recruiter)/recruiter/page.tsx`

**현재 구조**
- 공고 등록/수정 폼 + 공고 목록.

**디자인 방향**
1. **헤더**
   - `Building2` 아이콘 + "Recruiter" 라벨 + 제목.
2. **공고 폼**
   - `grid grid-cols-2 gap-4`, `url`, `tags`, `description`은 `col-span-2`.
   - 입력/textarea는 `Input`/`Textarea` 컴포넌트로 교체.
   - 등록/수정 버튼 `Button`.
3. **공고 목록**
   - `rounded-xl border border-gray-100 bg-white shadow-sm`.
   - 상태: `isActive` green dot / 대기 amber dot.
   - 빈 상태: `Building2` 아이콘 + "등록된 공고가 없습니다".

### 6-14. 공개 페이지

**파일**
- `app/open/listings/page.tsx`
- `app/recruit/page.tsx`
- `app/embed/page.tsx`
- `app/embed/widget/page.tsx`

**디자인 방향**
1. **공개 공고 목록**: 랜딩과 동일한 다크 테마 또는 별도 라이트 목록.
   - 외부 임베드용이므로 `embed`/`widget`은 Tailwind CDN/inline style 고려.
2. **구인자 등록 페이지(`app/recruit/page.tsx`)**: 기업 정보 입력, 승인 안내 메시지.

### 6-15. 컴포넌트 전역 가이드

**components/cover-letter/**
- `CoachingGuide.tsx`: amber 강조, 접기/펼치기, 피드백 뱃지.
- `DuplicateCheckPanel.tsx`: 유사도 게이지, 경고/통과 상태.
- `ExperienceLibrary.tsx`: 경험 카드, 태그, 검색.
- `KeywordHeatmap.tsx`: 키워드 밀도 시각화.

**components/dashboard/**
- `ApplicationSummary.tsx`: 지원 상태 요약, doughnut/ring 차트.
- `PrioritySection.tsx`: 추천 공고, 가중치 슬라이더.
- `PriorityJobCard.tsx`: 순위, 매칭 점수, 마감일.
- `RoadmapProgress.tsx`: 진행률 링/바.
- `UrgentDeadlines.tsx`: 마감 임박 공고.

**components/jobs/**
- `JobChecklist.tsx`: 체크리스트 + 프로그레스바.
- `JobForm.tsx`: 공고 추가/수정 폼.
- `KanbanBoard.tsx`: 드래그 칸반 열/카드.
- `StatusTimeline.tsx`: 지원 상태 타임라인.

**components/interview/**
- `InterviewCard.tsx`: 질문 카드, 카테고리 dot.
- `AnswerSlideOver.tsx`: 답변 작성.
- `CustomQuestionForm.tsx`: 커스텀 질문 추가.
- `MockInterviewModal.tsx`: 모의 면접 모달.

**components/portfolio/**
- `PortfolioForm.tsx`: 폼 + 기술 스택 태그.
- `GitHubAnalysisCard.tsx`: GitHub 통계 카드.

**components/profile/**
- `ProfileForm.tsx`: 프로필 폼 + 리크루터 시점.

**components/roadmap/**
- `RoadmapTree.tsx`: 기술 트리, 상태 토글.
- `CustomSkillForm.tsx`: 커스텀 스킬 입력.

**components/ui/**
- `button`, `card`, `input`, `badge`, `select`, `textarea`, `label`, `progress`, `slider`, `dialog`, `alert-dialog`, `slide-over`, `delete-confirm-dialog`.
- 이들은 shadcn `radix-nova` 스타일을 따르며, 전역 토큰과 함께 사용.

---

## 7. 접근성 및 반응형 규칙

### 7-1. 접근성(A11y)

1. **폼 레이블 연결**
   - 모든 `<input>`에 `id`와 `<label htmlFor="...">` 연결.
   - `app/(auth)/login/page.tsx`, `register/page.tsx`의 하드코딩된 `input` + `label`은 유지되나, 향후 `Label` 컴포넌트 사용 권장.

2. **버튼/링크 접근성**
   - 아이콘 단독 버튼은 `aria-label` 필수.
   - `components/interview/InterviewCard.tsx` 30행 `aria-label` 예시 참고.
   - `Sidebar.tsx` 137행 `aria-label="메뉴 닫기"` 예시.

3. **색상 대비**
   - `text-gray-400` 위주 설명은 4.5:1 이상 대비를 위해 `text-gray-500` 이상 권장.
   - `text-white/40`, `text-white/50`은 다크 배경에서 충분한 대비를 가지도록 `text-white/70` 이상 검토.

4. **포커스 표시**
   - `Input` 컴포넌트(`components/ui/input.tsx` 13행)에서 `focus-visible:ring-3 focus-visible:ring-ring/50` 이미 적용.
   - 직접 사용하는 `input`도 `focus:ring-2 focus:ring-primary/20` 추가.

5. **스크린 리더 대응**
   - 로딩 상태에 `aria-busy="true"`, `role="status"` 추가.
   - 토스트는 `sonner`의 `richColors` 사용, 시각적/보조기기 모두 피드백.

### 7-2. 반응형(Responsive)

1. **브레이크포인트**
   - Tailwind 기본 브레이크포인트(`sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`) 사용.
   - `tailwind.config.ts`의 `2xl:1400px` 컨테이너도 활용.

2. **모바일 우선**
   - 기본 클래스는 모바일, `md:` 이상에서 사이드바/하단 탭 전환.
   - `app/(dashboard)/layout.tsx` 25-26행: `pt-14 pb-16 md:pt-0 md:pb-0`.

3. **사이드바**
   - 데스크톱: 고정 `w-56`.
   - 모바일: `Sheet`/`Drawer`로 전환, 햄버거 버튼.
   - `components/layout/Sidebar.tsx` 주석 13행 참고.

4. **테이블**
   - 모바일에서 불필요한 열 `hidden sm:table-cell` / `hidden md:table-cell` 처리.
   - `app/(admin)/admin/users/page.tsx` 178-181행 예시.

5. **그리드**
   - `grid-cols-1` → `sm:grid-cols-2` → `lg:grid-cols-3` → `xl:grid-cols-4`.
   - `PrioritySection` (`components/dashboard/PrioritySection.tsx` 104-107행) 참고.

---

## 8. 애니메이션 및 마이크로 인터랙션

### 8-1. 현재 적용된 애니메이션

- `animate-pulse`: 스켈레톤/로딩 (`admin/page.tsx`, `jobs/page.tsx`).
- `transition-colors`, `transition-all`: 버튼/링크/카드 호버.
- `hover:shadow-md`, `hover:shadow-lg`: 카드/버튼.
- `bg-gradient-to-r ... bg-clip-text text-transparent`: 랜딩/인증 타이틀.
- `tailwindcss-animate` 플러그인: `accordion-down/up` (현재 아코디언에 미사용 중).

### 8-2. 권장 마이크로 인터랙션

1. **페이지 진입**
   - `fade-in`/`slide-up` 0.2-0.3s ease-out.
   - 전역 `layout`에 적용 가능하나, Next.js SSR 주의.

2. **카드 호버**
   - `hover:translate-y-[-2px] hover:shadow-md transition-all duration-200`.
   - 대시보드, 공고 목록, 면접 질문 카드에 적용.

3. **버튼/탭**
   - active scale: `active:scale-[0.98]`.
   - focus ring: `focus-visible:ring-2 focus-visible:ring-primary/30`.

4. **토스트**
   - `sonner` 기본 slide-in 사용.
   - 성공/오류/경고 색상 구분.

5. **로딩**
   - 단순 `animate-pulse`보다 `shimmer` 또는 `skeleton` 컴포넌트 도입 권장.
   - 예: `components/ui/skeleton.tsx` 추가.

6. **슬라이드오버/모달**
   - `enter:translate-x-full` → `enter:translate-x-0` 0.3s ease-out.
   - 배경 `backdrop-blur-sm bg-black/30`.

### 8-3. 성능 고려사항

- `will-change-transform`은 드래그/애니메이션 대상에만 부여.
- `prefers-reduced-motion` 미디어 쿼리를 존중:  
  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
  ```

---

## 9. 구현 우선순위

### 9-1. Phase 1: 디자인 토큰/기반 정리 (1-2주)

**목표**: 전역 색상/타이포/여백 토큰을 정리하고, 하드코딩된 값을 줄입니다.

| 우선순위 | 파일 | 작업 내용 |
|----------|------|----------|
| 1 | `app/globals.css` | CSS 변수 HSL 변환 또는 oklch/Tailwind 호환 구조 확립 |
| 2 | `tailwind.config.ts` | 색상 토큰 정리, `oklch`/`hsl` 매핑 문제 해결 |
| 3 | `components/ui/button.tsx` | 브랜드 색상 적용, 랜딩/인증 CTA 교체용 |
| 4 | `components/ui/card.tsx` | 보더/그림자 토큰화 |
| 5 | `components/ui/input.tsx`, `label.tsx`, `textarea.tsx` | 폼 기본 스타일 통일 |

### 9-2. Phase 2: 공통 셸/레이아웃/컴포넌트 통일 (2-3주)

| 우선순위 | 파일 | 작업 내용 |
|----------|------|----------|
| 1 | `components/layout/Sidebar.tsx` | 다크/라이트 토큰 적용, 활성/하이라이트 메뉴 색상 통일 |
| 2 | `components/layout/BottomNav.tsx` | 활성 탭 토큰화, 아이콘 굵기 통일 |
| 3 | `app/(dashboard)/layout.tsx` | 페이지 셸, 배경, 반응형 패딩 정리 |
| 4 | `app/(admin)/layout.tsx` | 관리자 셸 통일 |
| 5 | `components/ui/slide-over.tsx`, `dialog.tsx`, `delete-confirm-dialog.tsx` | 모달/슬라이드오버 애니메이션, 토큰 적용 |

### 9-3. Phase 3: 페이지/컴포넌트별 세련화 (3-4주)

| 우선순위 | 파일 | 작업 내용 |
|----------|------|----------|
| 1 | `app/page.tsx` | 랜딩 다크 테마 토큰화, 모바일 최적화 |
| 2 | `app/(auth)/login/page.tsx`, `register/page.tsx`, `forgot-password/page.tsx`, `reset-password/page.tsx`, `register-recruiter/page.tsx` | 인증 폼 `Input`/`Button` 교체, 알럿/오류 디자인 통일 |
| 3 | `app/(dashboard)/dashboard/page.tsx` | 대시보드 카드/차트/추천 공고 디자인 세련화 |
| 4 | `app/(dashboard)/listings/page.tsx` | 공고 카드, 매칭 뱃지, 필터/정렬 UI 통일 |
| 5 | `app/(dashboard)/jobs/page.tsx` | 상태 카드, 테이블, 칸반, SlideOver 통일 |
| 6 | `app/(dashboard)/cover-letter/page.tsx` + `components/cover-letter/*` | 자소서 작성/분석 UI 통일 |
| 7 | `app/(dashboard)/interview/page.tsx` + `components/interview/*` | 면접 카드/슬라이드오버/모달 통일 |
| 8 | `app/(dashboard)/profile/page.tsx` + `components/profile/ProfileForm.tsx` | 프로필 폼, 리크루터 뷰 토글 통일 |
| 9 | `app/(dashboard)/roadmap/page.tsx` + `components/roadmap/*` | 로드맵 트리, 상태 토글 통일 |
| 10 | `app/(dashboard)/portfolio/page.tsx` + `components/portfolio/*` | 포트폴리오 폼/카드 통일 |
| 11 | `app/(admin)/admin/page.tsx`, `users/page.tsx`, `listings/page.tsx` | 관리자 통계/표/승인 UI 통일 |
| 12 | `app/(recruiter)/recruiter/page.tsx` | 리크루터 공고 폼/목록 통일 |

### 9-4. Phase 4: 품질/접근성/애니메이션 마무리 (1-2주)

| 항목 | 내용 |
|------|------|
| 접근성 점검 | `aria-label`, 대비, 키보드 네비게이션, `aria-busy` |
| 반응형 점검 | 모바일/태블릿/데스크톱 주요 페이지 시뮬레이션 |
| 애니메이션 | 페이지 진입, 카드 hover, 슬라이드오버, 스켈레톤 |
| 성능 | `will-change` 최소화, `prefers-reduced-motion` |
| 다크 모드 | 필요 시 `next-themes` 도입, `.dark` 변수 검증 |

---

## 10. 전체 대상 `.tsx` 파일 목록

### 10-1. App Router Pages

#### 루트/공개
- `app/layout.tsx`
- `app/page.tsx`
- `app/open/listings/page.tsx`
- `app/recruit/page.tsx`
- `app/embed/page.tsx`
- `app/embed/widget/page.tsx`

#### 인증
- `app/(auth)/layout.tsx`
- `app/(auth)/login/page.tsx`
- `app/(auth)/register/page.tsx`
- `app/(auth)/forgot-password/page.tsx`
- `app/(auth)/reset-password/page.tsx`
- `app/(auth)/register-recruiter/page.tsx`

#### 대시보드
- `app/(dashboard)/layout.tsx`
- `app/(dashboard)/dashboard/page.tsx`
- `app/(dashboard)/listings/page.tsx`
- `app/(dashboard)/listings/[id]/page.tsx`
- `app/(dashboard)/jobs/page.tsx`
- `app/(dashboard)/jobs/[id]/page.tsx`
- `app/(dashboard)/cover-letter/page.tsx`
- `app/(dashboard)/cover-letter/export/page.tsx`
- `app/(dashboard)/interview/page.tsx`
- `app/(dashboard)/calendar/page.tsx`
- `app/(dashboard)/roadmap/page.tsx`
- `app/(dashboard)/portfolio/page.tsx`
- `app/(dashboard)/portfolio/export/page.tsx`
- `app/(dashboard)/profile/page.tsx`
- `app/(dashboard)/bookmarks/page.tsx`
- `app/(dashboard)/notifications/page.tsx`
- `app/(dashboard)/notices/page.tsx`

#### 관리자
- `app/(admin)/layout.tsx`
- `app/(admin)/admin/page.tsx`
- `app/(admin)/admin/users/page.tsx`
- `app/(admin)/admin/users/[id]/page.tsx`
- `app/(admin)/admin/listings/page.tsx`
- `app/(admin)/admin/listings/upload/page.tsx`
- `app/(admin)/admin/stats/page.tsx`
- `app/(admin)/admin/notices/page.tsx`
- `app/(admin)/admin/questions/page.tsx`
- `app/(admin)/admin/bulk-jobs/page.tsx`
- `app/(admin)/admin/employment/page.tsx`

#### 리크루터
- `app/(recruiter)/layout.tsx`
- `app/(recruiter)/recruiter/page.tsx`

### 10-2. Components

#### Layout
- `components/layout/Sidebar.tsx`
- `components/layout/BottomNav.tsx`

#### Global Providers
- `components/providers.tsx`

#### Cover Letter
- `components/cover-letter/CoachingGuide.tsx`
- `components/cover-letter/DuplicateCheckPanel.tsx`
- `components/cover-letter/ExperienceLibrary.tsx`
- `components/cover-letter/KeywordHeatmap.tsx`

#### Dashboard
- `components/dashboard/ApplicationSummary.tsx`
- `components/dashboard/PriorityJobCard.tsx`
- `components/dashboard/PrioritySection.tsx`
- `components/dashboard/RoadmapProgress.tsx`
- `components/dashboard/UrgentDeadlines.tsx`

#### Jobs
- `components/jobs/JobChecklist.tsx`
- `components/jobs/JobForm.tsx`
- `components/jobs/KanbanBoard.tsx`
- `components/jobs/StatusTimeline.tsx`

#### Interview
- `components/interview/AnswerSlideOver.tsx`
- `components/interview/CustomQuestionForm.tsx`
- `components/interview/InterviewCard.tsx`
- `components/interview/MockInterviewModal.tsx`

#### Portfolio
- `components/portfolio/GitHubAnalysisCard.tsx`
- `components/portfolio/PortfolioForm.tsx`

#### Profile
- `components/profile/ProfileForm.tsx`

#### Roadmap
- `components/roadmap/CustomSkillForm.tsx`
- `components/roadmap/RoadmapTree.tsx`

#### UI (shadcn)
- `components/ui/alert-dialog.tsx`
- `components/ui/badge.tsx`
- `components/ui/button.tsx`
- `components/ui/card.tsx`
- `components/ui/delete-confirm-dialog.tsx`
- `components/ui/dialog.tsx`
- `components/ui/input.tsx`
- `components/ui/label.tsx`
- `components/ui/progress.tsx`
- `components/ui/select.tsx`
- `components/ui/slide-over.tsx`
- `components/ui/slider.tsx`
- `components/ui/textarea.tsx`

---

## 11. 핵심 파일별 세부 체크리스트

### 11-1. `app/globals.css` (1-118행)

- [ ] `--background`/`--foreground` HSL 또는 oklch 호환 구조 확립
- [ ] `--primary`를 브랜드 블루(`#2563eb`)로 설정
- [ ] `body` 배경 그라디언트를 CSS 변수로 분리
- [ ] `::selection` 색상 브랜드 팔레트로 통일
- [ ] 스크롤바 스타일 `rounded-full`, `bg-slate-300` 유지
- [ ] 다크 모드 변수 검증

### 11-2. `tailwind.config.ts` (1-80행)

- [ ] `colors`의 `hsl(var(--...))`가 실제 CSS 변수 형식과 일치하는지 확인
- [ ] 브랜드 색상 추가(필요 시 `brand: { DEFAULT: '#2563eb', ... }`)
- [ ] `container` 2xl 1400px 유지
- [ ] `borderRadius` `--radius` 기반 유지
- [ ] `animation`에 accordion + 추가 마이크로 인터랙션

### 11-3. `components.json` (1-25행)

- [ ] `style: 'radix-nova'`, `baseColor: 'neutral'`, `iconLibrary: 'lucide'` 유지
- [ ] `aliases` 정리 확인

### 11-4. `app/layout.tsx` (1-33행)

- [ ] `Inter` 폰트 외에 한글 폰트(Pretendard 등) 추가 검토
- [ ] `suppressHydrationWarning` 유지
- [ ] `Providers` 래핑 확인

### 11-5. `app/page.tsx` (1-291행)

- [ ] 다크 테마 토큰화
- [ ] 모바일 반응형(히어로 타이틀, CTA, 공고 카드)
- [ ] 하드코딩 색상 변수화

### 11-6. `components/layout/Sidebar.tsx` (1-320행)

- [ ] 다크/라이트 토큰 적용
- [ ] 활성 메뉴 스타일 통일
- [ ] 관리자 메뉴 강조색(red) 브랜드 가이드 확인
- [ ] 모바일 드로어 Sheet 사용

### 11-7. `components/layout/BottomNav.tsx` (1-41행)

- [ ] 활성 탭 색상 `text-primary`
- [ ] 아이콘 굵기 `stroke-[2.5]` 통일
- [ ] 다크 배경 토큰화

### 11-8. `app/(dashboard)/jobs/page.tsx` (1-284행)

- [ ] 상태 카드 색상 통일
- [ ] 테이블/칸반 뷰 스타일
- [ ] SlideOver 연결
- [ ] 검색/빈 상태/로딩 스켈레톤

### 11-9. `app/(dashboard)/listings/page.tsx` (1-453행)

- [ ] 매칭 뱃지 색상 통일
- [ ] 필터/정렬 세그먼트 디자인
- [ ] 공고 카드 그리드/아코디언
- [ ] 찜/추가 버튼 피드백

### 11-10. `app/(admin)/admin/page.tsx` (1-250행)

- [ ] StatCard 디자인
- [ ] 관리 메뉴 그리드
- [ ] 최근 가입/공고 리스트
- [ ] 로딩/빈 상태

---

## 12. 요약 및 권장 사항

### 12-1. 핵심 디자인 결정

1. **라이트 모드를 기본**, 다크 모드는 랜딩/인증 브랜딩에만 제한적으로 사용.
2. **블루-바이올렛**을 브랜드 강조색으로, 상태/피드백은 emerald/amber/red로 명확히 분리.
3. **HSL 기반 CSS 변수**로 Tailwind/shadcn과 호환되는 디자인 토큰 정리.
4. **카드/표/폼/빈 상태/로딩**의 패턴을 5-6가지 템플릿으로 통일.
5. **접근성과 반응형**을 모든 페이지에서 일관되게 적용.

### 12-2. 주의 사항

- `tailwind.config.ts`의 `hsl(var(--...))`와 `globals.css`의 `oklch` 값이 현재 맞지 않습니다.  
  이를 먼저 해결하지 않으면 shadcn/ui 컴포넌트 색상이 의도와 다르게 렌더링될 수 있습니다.
- 인증/랜딩 페이지의 다크 테마와 대시보드 라이트 테마 간 전환이 너무 급격할 수 있습니다.  
  랜딩에서 "시작하기" 버튼을 누를 때 로그인/대시보드로 전환되는 플로우를 부드럽게 만들어야 합니다.
- 모바일 하단 탭은 5개만 노출되므로, 나머지 메뉴(캘린더, 로드맵, 공지 등)는 사이드바/햄버거 메뉴에서 접근해야 합니다.

### 12-3. 다음 단계

1. Phase 1을 먼저 수행하여 토큰/기반을 안정화합니다.
2. `Button`, `Card`, `Input`, `Badge`를 우선 리팩토링하여 다른 페이지에서 재사용합니다.
3. `Sidebar`, `BottomNav`, `DashboardLayout`을 통일한 후, 각 페이지를 순차적으로 적용합니다.
4. 마지막으로 접근성/반응형/애니메이션 점검을 진행합니다.

---

*본 문서는 JobFilter 프로젝트의 모든 `.tsx` 파일에 대한 UI/UX 디자인 계획을 담고 있으며, 실제 구현 시 Phase별로 참고하세요.*
