# Routing README

코드 기준의 라우팅/리다이렉트/인덱싱 규칙을 정리한다.

## 1) Core Routing Rules

- 모든 사용자 페이지는 `/{lang}/...` 구조를 사용한다.
- 지원 언어: `en`, `ko`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi`
- 언어 prefix 없는 경로는 `proxy.ts`에서 언어 prefix 경로로 redirect
- 루트 `/`는 `app/page.tsx`에서 클라이언트 선호 언어로 `router.replace`

## 2) Redirect Rules

### 2.1 proxy.ts

다음 경로는 언어 redirect 대상에서 제외:

- `/_next/*`
- `/api/*`
- `/tutorials/*`
- 확장자 파일 경로 (`.*`)

그 외 non-prefixed 경로는 아래 우선순위로 redirect:

1. cookie `preferredLanguage`
2. `Accept-Language`
3. `en`

### 2.2 Marketing alias

- `/{lang}/how-it-works` -> `/{lang}/about` (`permanentRedirect`)

## 3) Route Inventory

## 3.1 Marketing

- `/{lang}`
- `/{lang}/about`
- `/{lang}/how-it-works` (redirect)
- `/{lang}/download`

## 3.2 Content

- `/{lang}/faq`
- `/{lang}/journeys`
- `/{lang}/journeys/[journeyId]`
- `/{lang}/journeys/[journeyId]/moments/[clusterId]`
- `/{lang}/users`
- `/{lang}/users/[userId]`
- `/{lang}/photos/[photoId]`

## 3.3 Legal

- `/{lang}/privacy`
- `/{lang}/terms`
- `/{lang}/community-guidelines`
- `/{lang}/marketing-consent`
- `/{lang}/support`

## 3.4 Auth UI (noindex)

- `/{lang}/login`
- `/{lang}/login/signup`
- `/{lang}/login/forgot-password`

## 3.5 API Routes

- `/api/auth/[...nextauth]`
- `/api/auth/email/send-verification`
- `/api/auth/email/verify-code`
- `/api/auth/email/signup`
- `/api/auth/email/request-password-reset`
- `/api/auth/email/reset-password`

## 3.6 SEO/System Routes

- `/robots.txt`
- `/sitemap.xml`
- `/sitemap-static.xml`
- `/sitemap-journeys.xml`
- `/sitemap-journey-moments.xml`
- `/sitemap-photos.xml`
- `/sitemap-users.xml`
- `/llms.txt`

## 3.7 Static Archive

- `/tutorials/*` (public 정적 파일)

## 4) Indexability Matrix

### 4.1 index/follow

- Home/Marketing/FAQ
- Journeys/Users/Photos public pages

### 4.2 noindex/nofollow

- Legal pages (`privacy`, `terms`, `community-guidelines`, `marketing-consent`, `support`)
- Login pages (`/login*`)

## 5) Revalidation Policy (Route Level)

- `/{lang}/journeys` + journey detail + moment detail: `revalidate = 60`
- `/{lang}/users`, `/{lang}/users/[userId]`, `/{lang}/photos/[photoId]`: `revalidate = 3600`
- sitemap routes: `revalidate = 3600`

## 6) Static Params Generation

- `app/[lang]/layout.tsx`: 언어별 static params 생성
- `app/[lang]/(content)/users/[userId]/page.tsx`: users API 기반 static params 생성
- journey/photo detail은 정적 params를 미리 모두 생성하지 않고 runtime ISR로 처리

## 7) Sitemap Inclusion Notes

- `sitemap-static.xml` 포함:
  - home
  - `about`, `download`
  - `faq`, `journeys`, `users`
- `how-it-works`, legal, login 경로는 static sitemap에 포함하지 않음

## 8) Ownership Files

- Redirect/locale gate: `proxy.ts`
- App root redirect: `app/page.tsx`
- i18n config: `lib/i18n/config.ts`
- alternates/canonical helper: `lib/i18n/metadata.ts`
- sitemap generators: `app/sitemap*.xml/route.ts`
