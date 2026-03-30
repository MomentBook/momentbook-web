# ADR 0003: Static Generation + Revalidation Strategy

## Status
Accepted

## Date
2025-01-04 (updated: 2026-03-30)

## Context

MomentBook 웹은 SEO 우선 공개 웹이며, 서버 부하를 낮추면서도 공개 콘텐츠 최신성을 일정 수준 유지해야 한다.

핵심 요구:

- 대부분의 마케팅/법적 페이지를 안정적으로 정적 렌더링
- 공개 콘텐츠의 캐시 가능한 주기적 갱신
- install landing의 플랫폼 힌트 처리와 공개 캐시 전략의 공존
- API 오류 시 안전한 실패 처리

## Decision

### 1) 페이지 성격별 캐시 정책

- 홈, FAQ, legal, redirect alias 등 대부분의 마케팅/법적 페이지: 정적 렌더링 중심
- 공개 콘텐츠 페이지: ISR 스타일 재검증
- `/{lang}/install`: noindex standalone landing이며, 서버에서 `headers()`로 UA를 읽어 플랫폼 힌트를 계산한다.

현재 TTL:

- Journeys list/detail/moment: `revalidate = 60`
- Users list/detail, Photo detail: `revalidate = 3600`

### 2) 데이터 fetch 실패 정책

- fetch helper는 실패 시 `null` 반환
- detail 페이지는 `notFound()`로 처리
- list 페이지는 empty state로 처리

### 3) 클라이언트 로컬 시간 표시

시간 표시는 public API가 제공하는 additive local-time context를 우선 사용한다.
- `offset_aware`, `floating_local`: local wall-clock date/time을 그대로 표시하고, 별도 timezone 변환 계산은 하지 않는다.
- explicit `unknown`: time-of-day를 추정하지 않고 date-only 또는 time-hidden fallback으로 내린다.
- local-time context가 없을 때만 기존 absolute timestamp 기반 viewer locale/timezone 렌더링을 사용한다.
`LocalizedDate` 계열은 absolute timestamp fallback 경로에서만 초기 SSR UTC 스냅샷을 출력해 비어 있는 마크업을 피한다.
photo detail의 `LocalizedDateTime`은 SSR 마크업을 비우고 hydration 이후에만 렌더링한다.

- `LocalizedDate`, `LocalizedDateRange`, `LocalizedDateTimeRange`
- `app/(localized)/[lang]/(chrome)/(content)/photos/[photoId]/LocalizedDateTime.tsx`

### 4) 다국어 정적 라우팅

`app/(localized)/[lang]` 기반으로 언어별 URL을 고정하고 metadata alternates를 생성한다.

### 5) Root Layout Strategy

- top-level `app/layout.tsx`는 두지 않고 route group root layouts를 사용한다.
- `app/(localized)/[lang]/layout.tsx`는 request-scoped Dynamic API 없이 static route param만으로 `<html lang>`와 locale metadata를 SSR한다.
- `/` redirect surface는 `app/(root)/layout.tsx`를 별도 root layout으로 가진다.
- 예외적으로 `app/(localized)/[lang]/install/page.tsx`는 개별 경로 수준에서 `headers()`를 사용하지만, localized root layout에는 전파하지 않는다.

## Rationale

정적 중심 구조는 성능/SEO 안정성을 확보하고, revalidate 주기를 리소스별로 분리해 비용과 최신성 균형을 맞춘다.

## Consequences

### Positive
- ✅ 빠른 응답 및 crawl 안정성
- ✅ 콘텐츠 유형별 TTL 조정 가능
- ✅ API 오류 시 페이지 붕괴 최소화
- ✅ localized root layout이 static param만 사용하므로 정적 캐시 적합성 유지
- ✅ localized 페이지가 SSR 단계부터 올바른 `html lang`를 제공
- ✅ install landing만 개별적으로 동적 UA 힌트를 사용하고 나머지 공개 표면은 정적 성격을 유지

### Negative
- ⚠️ 페이지별 TTL이 다르므로 운영 이해가 필요
- ⚠️ 콘텐츠 업데이트가 즉시 반영되지 않을 수 있음

### Neutral
- 📝 ISR/캐시 정책 변경 시 sitemap 및 문서 동기화 필요

## Alternatives Considered

### 1. 전 경로 SSR
Rejected: SEO/성능/비용 측면에서 비효율

### 2. 전 경로 완전 정적 + 빌드 시 데이터 고정
Rejected: 공개 콘텐츠 최신성 부족

## Implementation Files

- `app/(localized)/[lang]/(chrome)/(content)/journeys/page.tsx`
- `app/(localized)/[lang]/(chrome)/(content)/journeys/[journeyId]/page.tsx`
- `app/(localized)/[lang]/(chrome)/(content)/journeys/[journeyId]/moments/[clusterId]/page.tsx`
- `app/(localized)/[lang]/(chrome)/(content)/users/page.tsx`
- `app/(localized)/[lang]/(chrome)/(content)/users/[userId]/page.tsx`
- `app/(localized)/[lang]/(chrome)/(content)/photos/[photoId]/page.tsx`
- `app/(root)/layout.tsx`
- `app/(root)/page.tsx`
- `app/(localized)/[lang]/layout.tsx`
- `app/(localized)/[lang]/install/page.tsx`
- `app/RootDocument.tsx`
- `proxy.ts`
- `components/LocalizedTime.tsx`
- `app/(localized)/[lang]/(chrome)/(content)/photos/[photoId]/LocalizedDateTime.tsx`

## Related Decisions

- [ADR 0001: Multilingual Routing Architecture](./0001-multilingual-routing-architecture.md)
- [ADR 0005: Public API Integration for Published Content](./0005-public-api-integration.md)
- [ADR 0006: Segmented Sitemaps](./0006-segmented-sitemaps.md)
