# Routing README

코드 기준의 라우팅/리다이렉트/인덱싱 규칙을 정리한다.

## 1) Core Routing Rules

- 모든 사용자 페이지는 `/{lang}/...` 구조를 사용한다.
- 지원 언어: `en`, `ko`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi`
- 언어 prefix 없는 경로는 `proxy.ts`에서 `?lang=` -> cookie -> `Accept-Language` -> `en` 순으로 언어 prefix 경로로 redirect
- 루트 `/`는 `app/page.tsx`에서 `?lang=` 또는 클라이언트 선호 언어를 반영해 `router.replace`

## 2) Redirect Rules

### 2.1 proxy.ts

다음 경로는 언어 redirect 대상에서 제외:

- `/_next/*`
- `/api/*`
- `/tutorials/*`
- 확장자 파일 경로 (`.*`)

그 외 non-prefixed 경로는 아래 우선순위로 redirect:

1. query `lang`
2. cookie `preferredLanguage`
3. `Accept-Language`
4. `en`

redirect 시 `lang` query는 제거되고 나머지 query는 유지된다.

### 2.2 Marketing alias

- `/{lang}/how-it-works` -> `/{lang}#overview` (`permanentRedirect`)
- `/{lang}/download` -> `/{lang}#download` (`permanentRedirect`)
- `/{lang}/install?handoff=qr...` -> 모바일에서 감지된 플랫폼 스토어 URL로 `redirect`, 데스크톱에서는 install landing 유지

## 3) Route Inventory

## 3.1 Marketing

- `/{lang}` (intro + download sections)
- `/{lang}/how-it-works` (redirect)
- `/{lang}/download` (redirect)
- `/{lang}/install` (`source`, `dest`, `lang`, `utm_*`, `variant`, `handoff` query 지원, noindex)

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

## 3.4 SEO/System Routes

- `/robots.txt`
- `/sitemap.xml`
- `/sitemap-static.xml`
- `/sitemap-journeys.xml`
- `/sitemap-journey-moments.xml`
- `/sitemap-photos.xml`
- `/sitemap-users.xml`
- `/llms.txt`

## 3.5 Static Archive

- `/tutorials/*` (public 정적 파일)

## 4) Indexability Matrix

### 4.1 index/follow

- Home
- FAQ
- Journeys/Users/Photos public pages

### 4.2 noindex/nofollow

- Legal pages (`privacy`, `terms`, `community-guidelines`, `marketing-consent`, `support`)
- Acquisition install landing (`/{lang}/install`)

### 4.3 noindex/follow (query variants)

- `/{lang}/users?q=...` (internal search results)
- canonical: `/{lang}/users`

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
  - `faq`
  - `journeys`, `users`
- `how-it-works`, `download`, legal 경로는 static sitemap에 포함하지 않음
- `install` 경로도 static sitemap에 포함하지 않음

## 8) Ownership Files

- Redirect/locale gate: `proxy.ts`
- App root redirect: `app/page.tsx`
- Home section anchors / redirects: `lib/marketing/home-sections.ts`
- Shared chrome layout: `app/[lang]/(chrome)/layout.tsx`
- Install landing route: `app/[lang]/install/*`
- i18n config: `lib/i18n/config.ts`
- install landing campaign/content/store config: `lib/install-campaign.ts`, `lib/install-landing.ts`, `lib/mobile-app.ts`
- alternates/canonical helper: `lib/i18n/metadata.ts`
- sitemap generators: `app/sitemap*.xml/route.ts`
