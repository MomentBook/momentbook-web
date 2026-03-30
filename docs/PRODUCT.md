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

- Hero 섹션: 여행 사진을 한 번 올리면 시간·장소 기준으로 정리되고 클라우드 드라이브 동기화까지 이어진다는 메시지를 단일 컬럼으로 중앙 정렬해 노출한다. 1차 CTA는 다운로드 액션(데스크톱 QR modal + 모바일 스토어 이동), 2차 CTA는 홈의 `#story` 섹션으로 이동한다.
- Story sequence 섹션: hero 아래에서 사진 적재, 일괄 가져오기, 타임라인 형성의 3개 장면을 각각 최적화된 로컬 루프 비디오(`public/videos/landing_00.mp4`~`landing_02.mp4`)와 제목/보조 설명으로 교차 배치한다. 비디오는 poster-first로 렌더링되고, 뷰포트 근접 시점에만 로드된다.
- Value reinforcement 섹션: story sequence 아래에서 정리 후 남는 가치(여행 순서, 장소 기준 묶음, 드라이브 연속성)를 bullet list와 최적화된 결과 비디오(`public/videos/landing_03.mp4`)로 다시 강조한다.
- Recent journeys 섹션: value reinforcement 아래에 현재 환경(API base URL 기준)에서 최근 공개된 여정 3개를 카드로 노출한다. 각 카드는 cover image, title, description, author, photo count, published date를 포함하며 해당 공개 상세로 이동한다.
- Download 섹션: warm sand 배경 안에서 짧은 설치 유도 카피와 App Store / Google Play CTA를 중앙 정렬로 노출한다.
- 헤더/모바일 메뉴는 `Download`, `Journeys` 탭을 제공하며, `Download`는 홈의 `#download` 섹션으로 이동하고 홈 섹션 이동은 대상 섹션이 뷰포트 중앙에 오도록 정렬한다.
- 홈의 story/value/recent journeys/download 섹션 텍스트·카드·미디어 블록은 뷰포트 진입 시 1회성의 미세한 reveal motion(opacity + small upward translate)으로 나타나며, `prefers-reduced-motion`에서는 해당 모션을 줄인다. 홈의 story/value 비디오는 `prefers-reduced-motion`에서 autoplay 대신 static poster를 유지한다.
- shared footer는 브랜드 요약, `Download`/`Support` CTA, 소셜 채널 아이콘, Product/Support/Legal 링크 컬럼으로 구성되며, footer의 `Download` CTA는 홈의 다른 다운로드 액션과 동일한 client-side download flow(데스크톱 QR modal + 모바일 공식 스토어 이동)를 사용한다.
- FAQ는 `/{lang}/faq` 독립 페이지로 제공되며, 푸터와 support 페이지에서 진입할 수 있다.
`/{lang}/install`은 쇼츠/캠페인 유입을 위한 모바일 중심 install landing을 제공하며, 공통 헤더/푸터 대신 단순 브랜드 락업과 install CTA에 집중한다. 데스크톱에서는 동일 landing 안에서 QR handoff 카드를 노출한다.
`/{lang}/install/redirect`는 QR 전용 redirect route로, 모바일에서는 감지된 플랫폼 스토어로 즉시 이동시키고 데스크톱에서는 `/{lang}/install` 랜딩으로 되돌린다.
이 경로는 `app/(localized)/[lang]/install/*`에서 독립적으로 렌더링되고, 나머지 공개 페이지의 공통 chrome은 `app/(localized)/[lang]/(chrome)/layout.tsx`가 담당한다.

1. 여행 종료
2. 여행 사진 일괄 업로드
3. 날짜/시간 자동 정리
4. 잘못 정리된 사진 수동 보정
5. 타임라인 완성
6. 지도 핀 기반 회상

## 3) Supported Languages

- `en`, `ko`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi` (총 9개)
- 라우트 프리픽스: `/{lang}/...`
- 루트(`/`)는 클라이언트에서 `?lang=` -> 선호 언어 상태(Jotai/localStorage) -> cookie -> 브라우저 언어 순서로 언어를 정한 뒤 리다이렉트
- 언어 없는 경로는 `proxy.ts`에서 `?lang=` -> cookie -> `Accept-Language` -> `en` 순서로 언어 프리픽스로 리다이렉트

## 4) Route Surface

### 4.1 Public Pages

- `/{lang}` (hero + 3-scene story + value reinforcement + latest public journeys + download section)
- `/{lang}/how-it-works` (`/{lang}`로 `permanentRedirect`)
- `/{lang}/download` (`/{lang}#download`로 `permanentRedirect`)
- `/{lang}/faq`
- `/{lang}/journeys`
- `/{lang}/journeys` 지원 query: `page`
- `/{lang}/journeys/[journeyId]`
- `/{lang}/journeys/[journeyId]/moments/[clusterId]`
- `/{lang}/users`
- `/{lang}/users` 지원 query: `q`
- `/{lang}/users/[userId]`
- `/{lang}/users/[userId]` 지원 query: `page`
- `/{lang}/photos/[photoId]`

현재 query 동작:
- `/{lang}/journeys?page=`와 `/{lang}/users/[userId]?page=`는 잘못된/초과 페이지 요청 시 정규화된 페이지로 redirect한다.
- `/{lang}/users?q=`는 최근 공개 프로필 최대 100개를 불러온 뒤 이름/biography와 각 프로필의 최근 공개 여정 해시태그 기준으로 서버에서 필터링한다.

### 4.2 Acquisition Landing (Noindex)

- `/{lang}/install`
- `/{lang}/install/redirect`
- `/{lang}/install` 지원 query: `source`, `dest`, `lang`, `utm_*`, `variant`
- `/{lang}/install/redirect` 지원 query: `source`, `dest`, `lang`, `utm_*`, `variant`
- `dest`는 hero/sample copy와 sample section을 config 기반으로 전환한다.
- query 해석과 UA 기반 플랫폼 힌트는 서버에서 처리하고, client는 CTA 상호작용과 analytics만 담당한다.
- QR은 현재 query를 유지한 `/{lang}/install/redirect` URL을 사용한다.
- `/{lang}/install/redirect`의 모바일 요청은 감지된 플랫폼(iOS/Android)에 맞는 공식 스토어 URL로 즉시 redirect되고, 데스크톱 요청은 `/{lang}/install`로 redirect된다.
- non-prefixed `/install?...` 진입은 `proxy.ts`가 언어 prefix로 정규화한다.

### 4.3 Legal Pages (Noindex)

- `/{lang}/privacy`
- `/{lang}/terms`
- `/{lang}/community-guidelines`
- `/{lang}/marketing-consent`
- `/{lang}/support`

현재 언어 커버리지:
- `privacy`, `terms`, `community-guidelines`, `marketing-consent` 본문은 9개 지원 언어(`en`, `ko`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi`)에 대해 authored copy를 사용한다.
- `support` 페이지 copy는 9개 언어에 대해 별도 문자열을 제공한다.

### 4.4 SEO Infrastructure Routes

- `/robots.txt` (via `app/robots.ts`)
- `/sitemap.xml`
- `/sitemap-static.xml`
- `/sitemap-journeys.xml`
- `/sitemap-journey-moments.xml`
- `/sitemap-photos.xml`
- `/sitemap-users.xml`
- `/llms.txt` (static file in `public/`)

## 5) Data Sources

## 5.1 Primary: Public API

주요 공개 데이터는 API 기반으로 로드한다.

- 사용자/프로필/사용자별 게시 여정: `lib/public-users.ts`
- 게시 여정/모먼트/사진: `lib/published-journey.ts` (`GET /v2/journeys/public/:publicId/viewer?viewer=web` 기반 viewer payload + photo endpoint)
- `lang` query를 지원하는 public journeys/user journeys/photo endpoint에는 현재 route locale(`en-US`, `ko-KR`, `pt-BR` 등)을 함께 전달해 서버가 localized 응답을 치환하도록 한다.
- journey/moment detail은 viewer payload의 top-level localized title/description/cluster impression을 우선 사용하고, `localizedContent`는 localized hashtags 및 누락 필드 보강 용도로만 사용한다.
- 공개 리스트 카드(`/`, `/{lang}/journeys`, `/{lang}/users/[userId]`)의 cover thumbnail은 list response가 내려주는 preview field를 우선 사용하며 viewer `images[]`에서 다시 추론하지 않는다.
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
- localized root layout은 `app/(localized)/[lang]/layout.tsx`에서 정적 route param 기준으로 `html lang`와 locale metadata를 SSR한다.
- 단, `/{lang}/install`은 서버에서 UA 기반 플랫폼 힌트를 읽기 위해 `headers()`를 사용한다.

## 6) Interaction Constraints

- 웹 로그인/Auth UI 및 `/api/auth/*` 라우트는 제공하지 않는다.
- 여정 상세의 신고 버튼/신고 제출 플로우는 제거되어 있다.
- `/{lang}/journeys/[journeyId]`는 cover-led summary와 moment index를 기본으로 렌더링한다. 상단에는 단일 hero image, 제목, 선택적 설명, 작성자, compact meta row(여행 기간 또는 게시일, 사진 수)만 노출한다. 클러스터가 있는 여정은 그 아래에서 각 moment를 대표 이미지 1장, 위치명, 시간 범위, 사진 수를 담은 clickable card list로 제공하고, 전체 사진 나열은 `/{lang}/journeys/[journeyId]/moments/[clusterId]` 상세에서만 보여준다. 클러스터가 없는 여정은 촬영 시각 기준 photo archive grid로 대체한다. 지도/점프 navigation/장소 요약 패널은 이 상세 화면에서 노출하지 않는다.
- `/{lang}/journeys/[journeyId]`와 `/{lang}/journeys/[journeyId]/moments/[clusterId]`는 viewer request에 현재 route locale을 `lang` query로 전달한다. 서버가 치환한 localized title/description/cluster impression을 SEO metadata/structured data와 본문에 우선 반영하고, localized hashtags는 `localizedContent`에서 읽는다.
- 여정 상세와 moment 상세는 locale별 해시태그를 calm chip UI로 노출하며, 각 chip은 `/{lang}/users?q=` 검색으로 연결된다.
- 신고 누적 또는 웹 검수 상태 등으로 웹에서 비노출 처리된 공개 여정 상세는 안내 문구와 noindex metadata를 렌더링한다.
- 공개 웹은 읽기 전용 탐색과 콘텐츠 소비에 한정된다.
- `/{lang}/photos/[photoId]`의 hero photo는 클릭/탭 시 확대 viewer overlay를 연다. 데스크톱에서는 blurred backdrop 위 centered large view + explicit close + `Esc` 닫기를 제공하고, 모바일에서는 edge-to-edge immersive viewer로 전환되며 pinch/double-tap 확대를 지원한다.

## 7) i18n / Preference Behavior

- 라우팅 언어 유효성: `lib/i18n/config.ts`
- `proxy.ts` 언어 감지 순서(redirect): cookie -> `Accept-Language` -> default(`en`)
- 클라이언트 선호 언어 상태: Jotai `languageAtom`
- `LanguageSyncProvider`가 Jotai/localStorage/cookie/path language를 동기화하고, 현재 저장값이 비어 있으면 localStorage `language` -> legacy `preferredLanguage` -> cookie -> 브라우저 언어 순서로 복원한다.
- `app/(localized)/[lang]/layout.tsx`는 SSR 시점부터 route locale에 맞는 `html lang`를 출력하고, 클라이언트에서 추가 보정하지 않는다.
- `LocalizedDate`, `LocalizedDateRange`, `LocalizedDateTimeRange`는 SSR에서 UTC 스냅샷을 출력하고 hydration 후 viewer locale/timezone 기준으로 갱신한다.
- photo detail의 `LocalizedDateTime`은 SSR 출력을 만들지 않고 hydration 후 client locale/timezone 기준 문자열을 렌더링한다.

## 8) Metadata / SEO / AEO

## 8.1 Metadata Helpers

- `buildAlternates(lang, path)`
- `buildOpenGraphUrl(lang, path)`
- `buildPublicRobots()` / `buildNoIndexFollowRobots()` / `buildNoIndexRobots()`
- Public pages use lean metadata: title/description/canonical/alternates + basic OpenGraph/Twitter
- journey/moment/photo/user detail의 `generateMetadata()`는 현재 route locale 기준 localized title/description을 사용하고, content-derived OpenGraph tags를 함께 생성한다.
- Public metadata/JSON-LD emit only verified public values; placeholder author/location/journey fallback strings are omitted when source fields are missing.
- Home(`/`)과 `/{lang}/install`은 iOS Safari용 `apple-itunes-app` Smart App Banner metadata를 포함한다.
- `app/(localized)/[lang]/layout.tsx`는 기본 robots를 noindex/nofollow로 설정하고, 실제 공개 색인 페이지는 각 route의 `generateMetadata()`에서 public robots를 다시 선언한다.

## 8.2 Robots Policy

- Public content/marketing pages: index/follow
- `/{lang}/install`: noindex/nofollow
- Legal pages: noindex/nofollow
- `/{lang}/journeys?page=...`와 `/{lang}/users/[userId]?page=...`는 page-specific canonical/alternates를 유지한 index/follow 페이지다.
- `/users?q=...` 검색 파라미터 페이지: noindex/follow + canonical(`/{lang}/users`)
- hidden journey detail metadata: noindex/nofollow
- No aggressive googlebot `max-*` overrides

## 8.3 Structured Data

페이지별 JSON-LD가 구현되어 있다.

- Home: Organization, WebSite, SoftwareApplication
- FAQ: FAQPage
- Journeys/Moments: Article
- Users: ProfilePage
- Photos: ImageObject
- locale-specific public detail JSON-LD는 `inLanguage`를 포함하고, localized title/location/hashtags 기반의 절제된 keyword signal을 사용한다. `meta keywords` 태그는 사용하지 않는다.

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
- 언어별 root layout: `app/(localized)/[lang]/layout.tsx`
- 헤더/푸터 공통 레이아웃: `app/(localized)/[lang]/(chrome)/layout.tsx`
- shared footer exposes official external channel icons for YouTube, Instagram, and TikTok, plus shared download/support CTA and Product/Support/Legal link groups
- 홈/푸터/인트로 guide의 다운로드 CTA는 데스크톱에서 `/{lang}/install/redirect`를 인코딩한 QR modal을 열고, 모바일에서는 현재 플랫폼별 공식 스토어 링크로 이동한다. `/{lang}/install`은 데스크톱에서 QR 카드 + 공식 스토어 배지를 함께 유지한다.
- `/{lang}/install`은 shared chrome을 타지 않는 standalone route다.

## 11) Environment Variables

## 11.1 Public Runtime

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_APP_ENV`
- `NEXT_PUBLIC_APP_IS_LOCAL`
- `NEXT_PUBLIC_SUPPORT_EMAIL`
- `NEXT_PUBLIC_IOS_APP_ID` (`lib/mobile-app.ts`에서 required)
- `NEXT_PUBLIC_IOS_STORE_PATH` (`lib/mobile-app.ts`에서 required)
- `NEXT_PUBLIC_ANDROID_APP_ID` (`lib/mobile-app.ts`에서 required)
- `NEXT_PUBLIC_SITEMAP_STATIC_LASTMOD` (optional)
- `NEXT_PUBLIC_FIREBASE_*` (firebase config set)

## 12) Build & Ops Commands

- Dev: `yarn dev`
- Build: `yarn build`
- Start: `yarn start`
- Typecheck: `npx tsc --noEmit`
- Lint: `yarn lint`
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
