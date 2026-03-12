# ADR 0007: Web Analytics Integration (GA4 + Firebase-ready modules)

## Status
Accepted

## Date
2026-02-06 (updated: 2026-03-12)

## Context

공개 웹의 유입/경로 데이터를 추적하되, 렌더링 안정성과 성능을 해치지 않아야 한다.

요구사항:

- App Router 환경에서 page_view 추적
- production 환경에서만 활성화
- 클라이언트 전용 동작

## Decision

### 1) GA4 script 주입

`app/layout.tsx`에서 `@next/third-parties/google`의 `GoogleAnalytics`를 사용한다.

- 측정 ID: `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
- `NODE_ENV === "production"`에서만 렌더링

### 2) Route change tracking

`app/components/GaRouteTracker.tsx`에서 pathname 변경 시 `gtag("event", "page_view")` 전송.

### 3) Firebase modules는 준비 상태로 유지

- `lib/firebase/client.ts`
- `lib/firebase/analytics.ts`

현재 주요 웹 트래킹은 GA4 컴포넌트 + route tracker 조합이 담당하고,
Firebase helper는 확장 대비용으로 남겨둔다.

## Rationale

Next.js 공식 third-party 통합을 사용하면 script 주입 책임을 단순화하고, route tracking을 별도 컴포넌트로 분리해 유지보수성을 높일 수 있다.

## Consequences

### Positive
- ✅ production-only analytics 활성화
- ✅ route 전환 단위 page_view 수집 가능
- ✅ 추적 로직의 책임 분리(layout vs tracker)

### Negative
- ⚠️ 측정 ID 누락 시 데이터 수집 불가
- ⚠️ privacy 정책 문서와 추적 범위 동기화 필요

### Neutral
- 📝 Firebase helper 모듈은 현재 핵심 경로에서 직접 사용되지 않음

## Alternatives Considered

### 1. Firebase analytics helper 직접 호출 중심
Rejected: 현재 구현 대비 이점이 제한적이고 라우트 추적 분리가 약함

### 2. 분석 미도입
Rejected: 운영 지표 관찰 불가

## Implementation Files

- `app/layout.tsx`
- `app/components/GaRouteTracker.tsx`
- `src/configs/env.client.ts`
- `src/configs/env.server.ts`
- `lib/firebase/client.ts`
- `lib/firebase/analytics.ts`

## Related Decisions

- [ADR 0003: Static Site Generation Strategy](./0003-static-site-generation-strategy.md)
- [ADR 0008: AEO/GEO Optimization](./0008-aeo-geo-optimization.md)
