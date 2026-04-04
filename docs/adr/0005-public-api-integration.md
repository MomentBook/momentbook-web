# ADR 0005: Public API Integration for Published Content

## Status
Accepted

## Date
2026-01-29 (updated: 2026-04-04)

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
- public journey list seed: `GET /v2/journeys/public` with explicit `reviewStatus=APPROVED`
- `/{lang}/journeys` discovery route는 `sort=discovery` + offset pagination을 사용한다.
- recent-order cursor pagination은 short-feed style client가 `sort=recent`를 명시할 때만 사용하며, `sort=discovery`와 `cursor`는 함께 사용하지 않는다.
- journey/moment web detail: `lib/published-journey.ts`가 `GET /v2/journeys/public/:publicId/viewer?viewer=web` viewer payload를 기준으로 사용한다.
- list preview thumbnail은 list response의 server-provided preview field를 우선 사용하고 viewer `images[]`에서 재계산하지 않는다.
- `lang` query를 지원하는 public journeys/user journeys/photo endpoint에는 현재 route locale(`en-US`, `ko-KR`, `pt-BR` 등)을 전달해 서버가 localized title/description/impression 또는 metadata field를 치환한 응답을 받는다.
- journey/moment detail의 localized hashtags는 viewer payload의 `localizedContent`를 계속 사용하되, 서버가 치환한 top-level title/description/cluster impression보다 우선하지 않는다.

### 2) fetch base candidate 전략

`lib/public-api.ts`는 운영 환경에서는 `NEXT_PUBLIC_API_BASE_URL` 단일 origin만 사용한다.
host 변형 fallback은 로컬/비프로덕션 환경 또는 `NEXT_PUBLIC_APP_IS_LOCAL=true`에서만 허용한다.

- primary: `NEXT_PUBLIC_API_BASE_URL`
- local fallback candidates: `127.0.0.1` host 치환 후보, `NEXT_PUBLIC_SITE_URL` host 치환 후보
- 기본 재시도 횟수는 운영 1회, 로컬 fallback 모드 2회

### 3) 타입 계약

Swagger 생성 타입(`@/src/apis/client`)을 기준 계약으로 사용한다.

### 4) 실패 처리 규칙

- helper 함수는 실패 시 `null`
- detail 페이지는 `notFound()`
- list 페이지는 empty state
- public discovery feed 요청은 approved-only 계약을 명시하기 위해 `reviewStatus=APPROVED`를 항상 포함한다.
- viewer payload가 `reported_hidden` 상태를 반환하면 웹은 generic unavailable 안내 상태를 렌더링하고, 검토 대기/반려 등 비공개 상태는 detail route를 `notFound()`로 수렴시킨다.

### 5) 레거시 샘플 데이터

`lib/public-content.ts`는 레거시로 남아 있으나 현재 주요 라우트에서 사용하지 않는다.

## Rationale

API 기반 구조는 콘텐츠 확장성과 운영 정확성을 제공한다.
운영 환경에서 origin 후보와 재시도 횟수를 제한하면 장애 시 불필요한 중복 호출과 비용 증폭을 줄일 수 있다.
null-safe 처리 정책은 크롤러/사용자에게 일관된 실패 경험을 제공한다.

## Consequences

### Positive
- ✅ 실제 게시 데이터 기반 렌더링
- ✅ route-level revalidate와 결합해 운영 안정성 확보
- ✅ 타입 계약 불일치의 조기 감지 가능
- ✅ 운영 환경에서 API 장애 시 중복 origin 호출을 억제할 수 있다
- ✅ 로컬 개발에서는 host fallback 편의성을 유지한다

### Negative
- ⚠️ `src/apis/client.ts`와 백엔드 스키마가 어긋나면 타입/런타임 편차 발생
- ⚠️ API base URL/백엔드 상태에 따른 런타임 의존 존재
- ⚠️ 운영 환경에서 `NEXT_PUBLIC_API_BASE_URL` 설정 정확성이 더 중요해진다

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
