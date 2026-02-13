# ADR 0006: Segmented Sitemaps (Index + Sub-sitemaps)

## Status
Accepted

## Date
2026-01-29 (updated: 2026-02-12)

## Context

공개 콘텐츠가 증가하면서 단일 sitemap으로는 유지보수와 캐시 효율이 떨어진다.

요구사항:

- 정적/동적 URL 분리
- 다국어 hreflang 제공
- 크롤러 부하 예측 가능성 확보

## Decision

### 1) Sitemap index + segmented route handlers

- Index: `/sitemap.xml`
- Sub-sitemaps:
  - `/sitemap-static.xml`
  - `/sitemap-journeys.xml`
  - `/sitemap-journey-moments.xml`
  - `/sitemap-photos.xml`
  - `/sitemap-users.xml`

### 2) 라우트 핸들러 기반 XML 렌더링

각 sitemap은 `app/*/route.ts`에서 XML 문자열을 생성한다.

- 공통 XML 렌더러: `lib/sitemap/xml.ts`
- 공개 데이터 수집: `lib/sitemap/public-content.ts`

### 3) 캐시 정책

모든 sitemap route:

- `revalidate = 3600`
- `Cache-Control: public, max-age=3600, s-maxage=3600`

### 4) hreflang / alternates

모든 URL entry는 9개 언어 variant + `x-default(en)` alternates를 생성한다.

### 5) Static sitemap 포함 범위

현재 static sitemap은 다음만 포함한다.

- 홈
- marketing: `about`, `download`
- content index: `faq`, `journeys`, `users`

(legal/login/how-it-works 경로는 static sitemap에 포함하지 않음)

## Rationale

리소스별 분리로 generation 비용과 장애 범위를 축소하고, 다국어 alternates를 일관되게 제공할 수 있다.

## Consequences

### Positive
- ✅ 규모 증가 시 sitemap 관리 용이
- ✅ 리소스별 갱신/장애 분리
- ✅ 다국어 SEO 신호 강화

### Negative
- ⚠️ 다수 route handler 유지 필요
- ⚠️ API pagination/timeout 전략을 지속 점검해야 함

### Neutral
- 📝 `NEXT_PUBLIC_SITE_URL` 설정 품질이 절대 URL 품질을 결정

## Alternatives Considered

### 1. 단일 sitemap
Rejected: 확장성/운영성 부족

### 2. 외부 배치 작업 생성
Rejected: 운영 복잡도 상승

## Implementation Files

- `app/sitemap.xml/route.ts`
- `app/sitemap-static.xml/route.ts`
- `app/sitemap-journeys.xml/route.ts`
- `app/sitemap-journey-moments.xml/route.ts`
- `app/sitemap-photos.xml/route.ts`
- `app/sitemap-users.xml/route.ts`
- `lib/sitemap/xml.ts`
- `lib/sitemap/public-content.ts`

## Related Decisions

- [ADR 0001: Multilingual Routing Architecture](./0001-multilingual-routing-architecture.md)
- [ADR 0003: Static Site Generation Strategy](./0003-static-site-generation-strategy.md)
- [ADR 0005: Public API Integration for Published Content](./0005-public-api-integration.md)
