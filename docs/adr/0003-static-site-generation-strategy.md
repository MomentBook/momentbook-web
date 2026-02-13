# ADR 0003: Static Generation + Revalidation Strategy

## Status
Accepted

## Date
2025-01-04 (updated: 2026-02-12)

## Context

MomentBook 웹은 SEO 우선 공개 웹이며, 서버 부하를 낮추면서도 공개 콘텐츠 최신성을 일정 수준 유지해야 한다.

핵심 요구:

- 마케팅/법적 페이지의 안정적 정적 렌더링
- 공개 콘텐츠의 캐시 가능한 주기적 갱신
- API 오류 시 안전한 실패 처리

## Decision

### 1) 페이지 성격별 캐시 정책

- 마케팅/법적 페이지: 정적 렌더링 중심
- 공개 콘텐츠 페이지: ISR 스타일 재검증

현재 TTL:

- Journeys list/detail/moment: `revalidate = 60`
- Users list/detail, Photo detail: `revalidate = 3600`

### 2) 데이터 fetch 실패 정책

- fetch helper는 실패 시 `null` 반환
- detail 페이지는 `notFound()`로 처리
- list 페이지는 empty state로 처리

### 3) 클라이언트 로컬 시간 표시

시간 표시는 viewer locale/timezone 기준으로 렌더링한다.

- `LocalizedDateTime`
- `LocalizedDate`, `LocalizedDateTimeRange`

### 4) 다국어 정적 라우팅

`app/[lang]` 기반으로 언어별 URL을 고정하고 metadata alternates를 생성한다.

## Rationale

정적 중심 구조는 성능/SEO 안정성을 확보하고, revalidate 주기를 리소스별로 분리해 비용과 최신성 균형을 맞춘다.

## Consequences

### Positive
- ✅ 빠른 응답 및 crawl 안정성
- ✅ 콘텐츠 유형별 TTL 조정 가능
- ✅ API 오류 시 페이지 붕괴 최소화

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

- `app/[lang]/(content)/journeys/page.tsx`
- `app/[lang]/(content)/journeys/[journeyId]/page.tsx`
- `app/[lang]/(content)/journeys/[journeyId]/moments/[clusterId]/page.tsx`
- `app/[lang]/(content)/users/page.tsx`
- `app/[lang]/(content)/users/[userId]/page.tsx`
- `app/[lang]/(content)/photos/[photoId]/page.tsx`
- `components/LocalizedTime.tsx`
- `app/[lang]/(content)/photos/[photoId]/LocalizedDateTime.tsx`

## Related Decisions

- [ADR 0001: Multilingual Routing Architecture](./0001-multilingual-routing-architecture.md)
- [ADR 0005: Public API Integration for Published Content](./0005-public-api-integration.md)
- [ADR 0006: Segmented Sitemaps](./0006-segmented-sitemaps.md)
