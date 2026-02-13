# PRODUCT.md

## MomentBook Web Product Definition (Code-Aligned)

이 문서는 `momentbook-web`의 **현재 구현 상태**를 기준으로 작성된 제품/기술 정의다.
기획 의도 문서가 아니라, 실제 코드 동작의 기준 문서다.

## 1) Product Boundary

MomentBook Web은 다음 역할만 수행한다.

- MomentBook 앱의 철학/사용 맥락을 웹에서 설명
- 앱에서 게시된 공개 콘텐츠를 읽기 전용으로 노출
- 검색/공유 유입을 위한 SEO/AEO 구조 제공

다음을 수행하지 않는다.

- 앱 기능을 웹에서 재구현
- 공개 웹에서 생성/편집 중심 사용자 플로우 제공
- 피드/랭킹/추천 중심 소셜 소비 구조 제공

## 2) Core Principles

- 앱 경험을 재정의하지 않고 설명한다.
- 기본 톤은 차분하고 관찰적이다.
- 설득보다 인지(recognition)를 우선한다.
- 공개 콘텐츠는 읽기 전용이다.
- 게시(Publish)는 확산이 아니라 선택적 공개 링크다.

## 3) Supported Languages

- `en`, `ko`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi` (총 9개)
- 라우트 프리픽스: `/{lang}/...`
- 루트(`/`)는 클라이언트에서 선호 언어로 리다이렉트
- 언어 없는 경로는 `proxy.ts`에서 언어 프리픽스로 리다이렉트

## 4) Route Surface

### 4.1 Public Pages

- `/{lang}`
- `/{lang}/about`
- `/{lang}/how-it-works` (실제로 `/{lang}/about`으로 `permanentRedirect`)
- `/{lang}/download`
- `/{lang}/faq`
- `/{lang}/journeys`
- `/{lang}/journeys/[journeyId]`
- `/{lang}/journeys/[journeyId]/moments/[clusterId]`
- `/{lang}/users`
- `/{lang}/users/[userId]`
- `/{lang}/photos/[photoId]`

### 4.2 Legal Pages (Noindex)

- `/{lang}/privacy`
- `/{lang}/terms`
- `/{lang}/community-guidelines`
- `/{lang}/marketing-consent`
- `/{lang}/support`

### 4.3 Auth Pages (Noindex)

- `/{lang}/login`
- `/{lang}/login/signup`
- `/{lang}/login/forgot-password`

### 4.4 API Routes (Web Auth Proxy)

- `/api/auth/[...nextauth]`
- `/api/auth/email/send-verification`
- `/api/auth/email/verify-code`
- `/api/auth/email/signup`
- `/api/auth/email/request-password-reset`
- `/api/auth/email/reset-password`

### 4.5 SEO Infrastructure Routes

- `/robots.txt` (via `app/robots.ts`)
- `/sitemap.xml`
- `/sitemap-static.xml`
- `/sitemap-journeys.xml`
- `/sitemap-journey-moments.xml`
- `/sitemap-photos.xml`
- `/sitemap-users.xml`
- `/llms.txt` (static file in `public/`)

### 4.6 Static Archive Surface

- `/tutorials/*` (`public/tutorials/*` 정적 파일)
- `proxy.ts` matcher에서 제외되어 언어 리다이렉트 없이 직접 접근

## 5) Data Sources

## 5.1 Primary: Public API

주요 공개 데이터는 API 기반으로 로드한다.

- 사용자/프로필/사용자별 게시 여정: `lib/public-users.ts`
- 게시 여정/모먼트/사진: `lib/published-journey.ts`
- 공통 fetch fallback candidates: `lib/public-api.ts`

`lib/public-api.ts`는 다음 후보 base URL을 순차 시도한다.

1. `NEXT_PUBLIC_API_BASE_URL`
2. host 치환된 `127.0.0.1` 후보
3. `NEXT_PUBLIC_SITE_URL` 호스트 치환 후보

## 5.2 Legacy Data (Currently Unused In Runtime)

- `lib/public-content.ts`
- `lib/content.ts`
- `lib/published-photo.ts`

위 파일들은 현재 주요 페이지에서 사용되지 않는다(레거시/실험용 잔존).

## 5.3 Cache Policy (Current)

- Journey list/detail/moment: `revalidate = 60`
- Users list/detail, photo detail: `revalidate = 3600`
- Sitemap routes: `revalidate = 3600`
- API fetch helper 일부: `next.revalidate = 3600` 또는 60(상수)

## 6) Authentication Surface (Web)

## 6.1 Session/Auth Stack

- NextAuth (JWT strategy)
- Providers: Credentials(email/password), Google, Apple(환경변수 있을 때만 활성)
- Auth UI: `/{lang}/login`, `/{lang}/login/signup`에서 Google/Apple 진입 버튼 제공
- Backend token exchange: `lib/auth/backend.ts`
- Session token sync: `app/components/AuthSessionProvider.tsx`
- API client token store: `src/apis/instance.client.ts`

## 6.2 Email Flow

Web page -> `/api/auth/email/*` -> backend `/v2/auth/email/*` 프록시 구조.

- verification code 발송/검증
- signup
- password reset 요청/실행

## 6.3 Report Flow

여정 상세의 신고 버튼은 인증 상태를 검사한다.

- 미인증/게스트: 로그인 유도 (`returnUrl` + report intent query)
- 인증 사용자: 신고 모달 열고 `reportsControllerCreateReport` 호출
- 본인 게시물 신고 방지 로직 포함

## 7) i18n / Preference Behavior

- 라우팅 언어 유효성: `lib/i18n/config.ts`
- 언어 감지 순서(redirect): cookie -> `Accept-Language` -> default(`en`)
- 클라이언트 선호 언어 상태: Jotai `languageAtom`
- `LanguageSyncProvider`가 localStorage/cookie/path language 동기화

## 8) Metadata / SEO / AEO

## 8.1 Metadata Helpers

- `buildAlternates(lang, path)`
- `buildOpenGraphUrl(lang, path)`
- `buildPublicRobots()` / `buildNoIndexRobots()`
- `buildPublicKeywords()`

## 8.2 Robots Policy

- Public content/marketing pages: index/follow
- Legal + login pages: noindex/nofollow

## 8.3 Structured Data

페이지별 JSON-LD가 구현되어 있다.

- Home: Organization, WebSite
- About: BreadcrumbList
- Download: SoftwareApplication
- FAQ: FAQPage
- Journeys/Moments: Article
- Users: ProfilePage
- Photos: ImageObject

## 8.4 llms.txt

- `public/llms.txt` 제공
- AI 엔진 탐색을 위한 사이트 요약/핵심 링크/비목표 명시

## 9) Sitemap Strategy

- Index: `/sitemap.xml`
- 분할 sitemap: static / journeys / journey-moments / photos / users
- 모든 sitemap은 absolute URL + hreflang alternates 생성
- response header: `Cache-Control: public, max-age=3600, s-maxage=3600`

주의:
- static sitemap은 현재 marketing/content 일부 경로 중심이며 legal/login 경로는 포함하지 않는다.

## 10) UI / Theme

- 글로벌 디자인 토큰: `app/globals.scss`
- theme: `data-theme="light|dark"`
- 저장: Jotai `themeAtom` (`localStorage`)
- 헤더/푸터 공통 레이아웃: `app/[lang]/layout.tsx`

## 11) Environment Variables

## 11.1 Public Runtime

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_APP_ENV`
- `NEXT_PUBLIC_APP_IS_LOCAL`
- `NEXT_PUBLIC_SUPPORT_EMAIL`
- `NEXT_PUBLIC_SITEMAP_STATIC_LASTMOD` (optional)
- `NEXT_PUBLIC_FIREBASE_*` (firebase config set)

## 11.2 Auth / Server

- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `APPLE_ID`
- `APPLE_SECRET`

## 11.3 Script-only (Apple Secret Generator)

- `APPLE_TEAM_ID`
- `APPLE_KEY_ID`
- `APPLE_PRIVATE_KEY_PATH`

## 12) Build & Ops Commands

- Dev: `yarn dev`
- Build: `yarn build`
- Start: `yarn start`
- Typecheck: `npx tsc --noEmit`
- Lint: `yarn lint`
- Tutorials index generate: `yarn generate:tutorials`
- API client generate: `yarn generate:api`

## 13) Current Technical Risks / Debt

1. `src/apis/client.ts` 타입 계약이 백엔드 Swagger와 어긋나면 타입/런타임 편차가 생길 수 있다.
2. 일부 레거시 데이터/유틸 파일이 실제 라우트에서 사용되지 않는다.
3. `ThemeProvider`, `LanguageSwitcher` 등 미사용 컴포넌트가 남아 있다.
4. 일부 문서(외부/구버전)가 `middleware.ts`, `app/sitemap.ts` 등을 참조할 수 있다.

## 14) Out Of Scope (Explicit)

- 웹에서 앱 기능 확장
- 소셜 소비 구조(피드/랭킹/추천)
- 생산성/습관 앱 메시지 전환
- 법적 확정 약속(영구 보장 표현)

---

문서 변경 시 원칙:
"희망 상태"가 아니라 "코드로 검증된 현재 상태"를 기록한다.
