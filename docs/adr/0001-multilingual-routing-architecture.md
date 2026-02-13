# ADR 0001: Multilingual Routing Architecture

## Status
Accepted

## Date
2025-01-04 (updated: 2026-02-12)

## Context

MomentBook 웹은 9개 언어를 URL prefix 기반으로 제공한다.

- `en` `ko` `ja` `zh` `es` `pt` `fr` `th` `vi`

요구사항:

- 언어별 고정 URL (`/{lang}/...`)로 SEO 친화성 확보
- 언어 없는 경로 접근 시 안정적 redirect
- 사용자 선호 언어(cookie/localStorage)와 라우트 언어 동기화
- 번들 부하가 큰 i18n runtime 도입 없이 유지

## Decision

### 1) URL 전략

- 모든 사용자 페이지는 `app/[lang]/...` 하위에 배치한다.
- canonical/hreflang은 언어 prefix URL을 기준으로 생성한다.

### 2) Non-prefixed 경로 처리

- Next.js 16의 `proxy.ts`를 사용한다.
- 언어 prefix가 없는 요청은 다음 우선순위로 `/{lang}`로 리다이렉트한다.
  1. `preferredLanguage` cookie
  2. `Accept-Language`
  3. default language (`en`)

### 3) 클라이언트 선호 언어 동기화

- Jotai `languageAtom`에 선호 언어를 저장한다.
- `LanguageSyncProvider`가 경로 언어/저장값/cookie를 동기화한다.
- `LanguagePreferenceSync`가 현재 라우트 언어를 상태에 반영한다.

### 4) i18n metadata 정책

- `buildAlternates()`로 9개 언어 + `x-default(en)` 제공
- `toLocaleTag`, `toHreflang`, `toOpenGraphLocale`를 공통 유틸로 관리

## Rationale

URL prefix 기반 다국어는 crawl/공유/캐시 관점에서 가장 예측 가능하다.
`proxy.ts` redirect + 클라이언트 선호 언어 동기화 조합으로 UX와 SEO를 동시에 유지할 수 있다.

## Consequences

### Positive
- ✅ 언어별 독립 URL로 SEO 명확성 확보
- ✅ 런타임 i18n 라이브러리 의존 최소화
- ✅ cookie + 브라우저 언어 기반 초기 진입 UX 개선

### Negative
- ⚠️ 모든 페이지에서 `params.lang` 처리 필요
- ⚠️ 신규 언어 추가 시 config + 사전 + SEO metadata 동시 수정 필요

### Neutral
- 📝 언어 결정은 redirect 단계에서만 수행되고, 렌더링은 route language를 따른다.

## Alternatives Considered

### 1. Query parameter (`?lang=ko`)
Rejected: canonical/hreflang 품질 저하

### 2. Subdomain (`ko.example.com`)
Rejected: 인프라/운영 복잡도 증가

### 3. Heavy i18n runtime library
Rejected: 현재 요구 대비 과도한 복잡도

## Implementation Files

- `proxy.ts`
- `app/page.tsx`
- `app/[lang]/layout.tsx`
- `app/components/LanguageSyncProvider.tsx`
- `components/LanguagePreferenceSync.tsx`
- `lib/i18n/config.ts`
- `lib/i18n/metadata.ts`
- `lib/i18n/dictionaries/*`

## Related Decisions

- [ADR 0002: Legal Document Internationalization](./0002-legal-document-internationalization.md)
- [ADR 0003: Static Site Generation Strategy](./0003-static-site-generation-strategy.md)
- [ADR 0006: Segmented Sitemaps](./0006-segmented-sitemaps.md)
