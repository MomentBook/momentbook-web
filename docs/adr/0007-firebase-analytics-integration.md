# ADR 0007: Firebase Analytics Integration

## Status
Accepted

## Date
2026-02-06

## Context

공개 웹의 방문 패턴과 사용자 행동을 이해하기 위해 분석 도구가 필요하다.
동시에 MomentBook의 데이터 가드레일(절대적 추적 없음 약속 금지, 최소 데이터 수집)을 준수해야 한다.

요구사항:
- 클라이언트 사이드 분석 (SSR 환경에서 안전)
- 번들 사이즈 영향 최소화
- 브라우저 호환성 (Safari, 프라이버시 브라우저 등) 대응
- Firebase 생태계와의 통합 (향후 Auth 등 확장 가능)

## Decision

### 1) Firebase를 클라이언트 분석 도구로 사용
- Firebase Analytics (Google Analytics 4 기반)를 채택한다.
- 환경변수 `NEXT_PUBLIC_FIREBASE_*` 7개로 설정한다.

### 2) Lazy-loading 싱글톤 패턴
- `getFirebaseAnalytics()`는 호출 시점에만 초기화한다 (앱 시작 시 즉시 로드하지 않음).
- `isSupported()` 체크 후 미지원 환경에서는 `null` 반환 (에러 없이 graceful degradation).
- 싱글톤 캐싱으로 중복 초기화 방지.

### 3) 클라이언트 전용 (`"use client"`)
- 모든 Firebase 모듈은 `"use client"` 디렉티브로 SSR 빌드에서 제외한다.
- SSG/ISR 캐시에 영향을 주지 않는다.

### 4) Auth 모듈은 준비 상태로 유지
- `lib/firebase/auth.ts`에 `getAuth()` 초기화가 되어 있으나, 현재 코드베이스에서 사용되지 않는다.
- 향후 공개 콘텐츠 인증 흐름이 필요할 때 활용 가능.

## Rationale

Firebase는 Google Analytics 4와 통합되어 별도 분석 서비스 없이 방문 패턴을 파악할 수 있다. Lazy-loading 패턴은 초기 로드 성능을 보호하고, `isSupported()` 가드는 Safari ITP 등 제한적 환경에서도 앱이 정상 동작하도록 한다. 자체 분석 시스템 구축 대비 운영 비용이 낮다.

## Consequences

### Positive
- ✅ 초기 번들에 분석 코드 미포함 (lazy-loading)
- ✅ SSR/SSG 캐시와 충돌 없음
- ✅ 미지원 브라우저에서도 앱 정상 동작
- ✅ Firebase 생태계 확장 가능 (Auth, Messaging 등)

### Negative
- ⚠️ Google 서비스 의존성 추가
- ⚠️ Firebase 환경변수 7개 관리 필요
- ⚠️ 프라이버시 정책 문서에 분석 도구 사용 명시 필요

### Neutral
- 📝 Auth 모듈은 현재 미사용 상태이나 제거하지 않음
- 📝 `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`가 있어야 GA4 데이터 수집 가능

## Alternatives Considered

### 1. Plausible / Fathom (프라이버시 중심 분석)
**Rejected**: 추가 비용 발생, Firebase 생태계와의 통합 이점을 활용할 수 없음.

### 2. 자체 분석 시스템 구축
**Rejected**: 운영/유지 비용이 높고, 이 프로젝트의 범위를 벗어남.

### 3. 분석 도구 미사용
**Rejected**: 공개 웹의 SEO 효과와 방문 패턴을 전혀 파악할 수 없음.

## Implementation Files
- `/lib/firebase/client.ts` — Firebase 앱 초기화 (싱글톤)
- `/lib/firebase/analytics.ts` — Analytics lazy-loading 싱글톤
- `/lib/firebase/auth.ts` — Auth 초기화 (현재 미사용)

## Related Decisions
- [ADR 0003: Static Site Generation Strategy](./0003-static-site-generation-strategy.md)
