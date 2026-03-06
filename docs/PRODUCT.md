# PRODUCT.md

## MomentBook Web Product Definition (Code-Aligned)

이 문서는 `momentbook-web`의 **현재 구현 상태**를 기준으로 작성된 제품/기술 정의다.
기획 의도 문서가 아니라, 실제 코드 동작의 기준 문서다.

## 1) Product Boundary

MomentBook Web은 다음 역할만 수행한다.

- MomentBook 앱의 철학/사용 맥락을 웹에서 설명
- 앱에서 게시된 공개 콘텐츠를 읽기 전용으로 노출
- 기본 검색/공유 접근성을 위한 SEO 인프라 제공

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

### 2.1 Core Intro Flow (Marketing Surface)

현재 홈(`/`)은 소개/다운로드를 하나의 연속 스크롤 표면으로 제공한다.

- Hero 섹션: 핵심 소개 문구 + CTA(튜토리얼 보기, intro video 카드로 smooth scroll) + 우측 DeviceMock 프리뷰
- Intro video 섹션: hero와 동일 폭 카드에서 landscape 인트로 영상 재생(자동재생 없이 중앙 재생 버튼, 재생 시 소리 on, 기본 볼륨 50%), 재생 중 하단 컨트롤 바에서 재생/일시정지·탐색(시크)·현재/전체 시간·음소거/볼륨·전체화면 전환 제공, 영상 종료 시 전체화면은 자동 해제되고 컨트롤은 숨김 처리되며 재생은 우측 안내 패널의 "인트로 다시 보기" 버튼으로만 가능, 종료 후 "앱에서 정리해보기" CTA 노출 및 약 2초 후 자동 전개(수동 클릭도 가능), 전개 시 영상 축소 + 우측 안내/다운로드 액션 노출, 다운로드 버튼 클릭 시 `#download`로 스크롤하며 모바일에서는 플랫폼별 앱 열기 또는 스토어 fallback을 시도
- Download 섹션: App Store / Google Play CTA와 가용성 안내 문구를 중심으로 노출
- 헤더/모바일 메뉴는 `Download`, `Journeys` 탭을 제공하며, `Download`는 홈의 `#download` 섹션으로 이동한다.
- FAQ는 `/{lang}/faq` 독립 페이지로 제공되며, 푸터와 support 페이지에서 진입할 수 있다.
`/{lang}/install`은 쇼츠/캠페인 유입을 위한 모바일 중심 install landing을 제공하며, 공통 헤더/푸터 대신 단순 브랜드 락업과 install CTA에 집중한다.
이 경로는 `app/[lang]/install/*`에서 독립적으로 렌더링되고, 나머지 공개 페이지의 공통 chrome은 `app/[lang]/(chrome)/layout.tsx`가 담당한다.

1. 여행 종료
2. 여행 사진 일괄 업로드
3. 날짜/시간 자동 정리
4. 잘못 정리된 사진 수동 보정
5. 타임라인 완성
6. 지도 핀 기반 회상

## 3) Supported Languages

- `en`, `ko`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi` (총 9개)
- 라우트 프리픽스: `/{lang}/...`
- 루트(`/`)는 클라이언트에서 `?lang=` -> 선호 언어 상태 -> 브라우저 언어 순서로 언어를 정한 뒤 리다이렉트
- 언어 없는 경로는 `proxy.ts`에서 `?lang=` -> cookie -> `Accept-Language` -> `en` 순서로 언어 프리픽스로 리다이렉트

## 4) Route Surface

### 4.1 Public Pages

- `/{lang}` (hero + intro video + download section)
- `/{lang}/how-it-works` (`/{lang}#overview`로 `permanentRedirect`)
- `/{lang}/download` (`/{lang}#download`로 `permanentRedirect`)
- `/{lang}/faq`
- `/{lang}/journeys`
- `/{lang}/journeys/[journeyId]`
- `/{lang}/journeys/[journeyId]/moments/[clusterId]`
- `/{lang}/users`
- `/{lang}/users/[userId]`
- `/{lang}/photos/[photoId]`

### 4.2 Acquisition Landing (Noindex)

- `/{lang}/install`
- 지원 query: `source`, `dest`, `lang`, `utm_*`, `variant`
- `dest`는 hero/sample copy와 sample section을 config 기반으로 전환한다.
- query 해석과 UA 기반 플랫폼 힌트는 서버에서 처리하고, client는 CTA 상호작용과 analytics만 담당한다.
- non-prefixed `/install?...` 진입은 `proxy.ts`가 언어 prefix로 정규화한다.

### 4.3 Legal Pages (Noindex)

- `/{lang}/privacy`
- `/{lang}/terms`
- `/{lang}/community-guidelines`
- `/{lang}/marketing-consent`
- `/{lang}/support`

### 4.4 SEO Infrastructure Routes

- `/robots.txt` (via `app/robots.ts`)
- `/sitemap.xml`
- `/sitemap-static.xml`
- `/sitemap-journeys.xml`
- `/sitemap-journey-moments.xml`
- `/sitemap-photos.xml`
- `/sitemap-users.xml`
- `/llms.txt` (static file in `public/`)

### 4.5 Static Archive Surface

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
- `app/layout.tsx`는 request-scoped Dynamic API(`headers`, `cookies`)를 사용하지 않음

## 6) Interaction Constraints

- 웹 로그인/Auth UI 및 `/api/auth/*` 라우트는 제공하지 않는다.
- 여정 상세의 신고 버튼/신고 제출 플로우는 제거되어 있다.
- 공개 웹은 읽기 전용 탐색과 콘텐츠 소비에 한정된다.

## 7) i18n / Preference Behavior

- 라우팅 언어 유효성: `lib/i18n/config.ts`
- 언어 감지 순서(redirect): cookie -> `Accept-Language` -> default(`en`)
- 클라이언트 선호 언어 상태: Jotai `languageAtom`
- `LanguageSyncProvider`가 localStorage/cookie/path language 동기화
- `LocalizedTime` 계열은 SSR에서 UTC 스냅샷을 출력하고 hydration 후 viewer locale/timezone 기준으로 갱신

## 8) Metadata / SEO / AEO

## 8.1 Metadata Helpers

- `buildAlternates(lang, path)`
- `buildOpenGraphUrl(lang, path)`
- `buildPublicRobots()` / `buildNoIndexRobots()`
- Public pages use lean metadata: title/description/canonical/alternates + basic OpenGraph/Twitter

## 8.2 Robots Policy

- Public content/marketing pages: index/follow
- `/{lang}/install`: noindex/nofollow
- Legal pages: noindex/nofollow
- `/users?q=...` 검색 파라미터 페이지: noindex/follow + canonical(`/{lang}/users`)
- No aggressive googlebot `max-*` overrides

## 8.3 Structured Data

페이지별 JSON-LD가 구현되어 있다.

- Home: Organization, WebSite, SoftwareApplication
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
- static sitemap은 현재 홈과 정적 공개 라우트 일부(`faq`, `journeys`, `users`)를 포함하며 redirect alias(`how-it-works`, `download`)와 legal 경로는 포함하지 않는다.
- `/{lang}/install`은 acquisition 전용 noindex 경로라 sitemap에 포함하지 않는다.

## 10) UI / Theme

- 글로벌 디자인 토큰: `app/globals.scss`
- theme: `data-theme="light|dark"`
- 저장: Jotai `themeAtom` (`localStorage`)
- 언어 공통 래퍼: `app/[lang]/layout.tsx`
- 헤더/푸터 공통 레이아웃: `app/[lang]/(chrome)/layout.tsx`
- `/{lang}/install`은 shared chrome을 타지 않는 standalone route다.

## 11) Environment Variables

## 11.1 Public Runtime

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_APP_ENV`
- `NEXT_PUBLIC_APP_IS_LOCAL`
- `NEXT_PUBLIC_SUPPORT_EMAIL`
- `NEXT_PUBLIC_SITEMAP_STATIC_LASTMOD` (optional)
- `NEXT_PUBLIC_FIREBASE_*` (firebase config set)

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
