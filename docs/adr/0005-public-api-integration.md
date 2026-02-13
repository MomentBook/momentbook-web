# ADR 0005: Public API Integration for Published Content

## Status
Accepted

## Date
2026-01-29 (updated: 2026-02-12)

## Context

공개 콘텐츠는 샘플 하드코딩이 아니라 실제 게시 데이터 기준으로 렌더링되어야 한다.
동시에 SEO/캐시 안정성을 유지해야 한다.

요구사항:

- API 기반 공개 데이터 조회
- 타입 계약의 일관성
- 실패 시 안전한 fallback 동작

## Decision

### 1) Public API 우선

공개 콘텐츠는 v2 public endpoint에서 조회한다.

- users/profile/user journeys: `lib/public-users.ts`
- journey/moment/photo: `lib/published-journey.ts`

### 2) fetch base candidate 전략

`lib/public-api.ts`는 `NEXT_PUBLIC_API_BASE_URL`을 기준으로 host 변형 후보를 시도해 네트워크 환경 편차를 완화한다.

### 3) 타입 계약

Swagger 생성 타입(`@/src/apis/client`)을 기준 계약으로 사용한다.

### 4) 실패 처리 규칙

- helper 함수는 실패 시 `null`
- detail 페이지는 `notFound()`
- list 페이지는 empty state

### 5) 레거시 샘플 데이터

`lib/public-content.ts`는 레거시로 남아 있으나 현재 주요 라우트에서 사용하지 않는다.

## Rationale

API 기반 구조는 콘텐츠 확장성과 운영 정확성을 제공한다.
null-safe 처리 정책은 크롤러/사용자에게 일관된 실패 경험을 제공한다.

## Consequences

### Positive
- ✅ 실제 게시 데이터 기반 렌더링
- ✅ route-level revalidate와 결합해 운영 안정성 확보
- ✅ 타입 계약 불일치의 조기 감지 가능

### Negative
- ⚠️ `src/apis/client.ts`와 백엔드 스키마가 어긋나면 타입/런타임 편차 발생
- ⚠️ API base URL/백엔드 상태에 따른 런타임 의존 존재

### Neutral
- 📝 타입 계약 파일은 주기적 재생성/검증 정책이 필요

## Alternatives Considered

### 1. 샘플 데이터 유지
Rejected: 운영 데이터 반영 불가

### 2. 클라이언트 전용 fetch
Rejected: SEO/초기 렌더링 품질 저하

## Implementation Files

- `lib/public-api.ts`
- `lib/public-users.ts`
- `lib/published-journey.ts`
- `src/apis/instance.client.ts`
- `src/apis/client.ts` (API contract layer)

## Related Decisions

- [ADR 0003: Static Site Generation Strategy](./0003-static-site-generation-strategy.md)
- [ADR 0006: Segmented Sitemaps](./0006-segmented-sitemaps.md)
- [ADR 0009: Web Authentication and Reporting Flow](./0009-web-authentication-and-reporting-flow.md)
