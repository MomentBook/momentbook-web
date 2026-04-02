# ADR 0006: Segmented Sitemaps (Index + Sub-sitemaps)

## Status
Accepted

## Date
2026-01-29 (updated: 2026-04-02)

## Context

공개 콘텐츠가 증가하면서 단일 sitemap으로는 유지보수와 캐시 효율이 떨어진다.

요구사항:

- 정적/동적 URL 분리
- 다국어 hreflang 제공
- 크롤러 부하 예측 가능성 확보

## Decision

### 1) Sitemap index + segmented route handlers

- Index: `/sitemap.xml`
- Top-level sitemap routes:
  - `/sitemap-static.xml` (`urlset`)
  - `/sitemap-journeys.xml`
  - `/sitemap-journey-moments.xml`
  - `/sitemap-photos.xml`
  - `/sitemap-users.xml`
- Part sitemaps:
  - `/sitemaps/journeys/[part].xml`
  - `/sitemaps/journey-moments/[publicId]/[part].xml`
  - `/sitemaps/photos/[publicId]/[part].xml`
  - `/sitemaps/users/[part].xml`

### 2) 라우트 핸들러 기반 XML 렌더링

각 sitemap은 `app/*/route.ts`에서 XML 문자열을 생성한다.

- 공통 XML 렌더러: `lib/sitemap/xml.ts`
- 공개 데이터 수집: `lib/sitemap/public-content.ts`
- root index는 part sitemap URL을 직접 나열해 nested sitemap index 의존을 피한다.

### 3) 캐시 정책

모든 sitemap route:

- `revalidate = 3600`
- `Cache-Control: public, max-age=3600, s-maxage=3600`

### 4) hreflang / alternates

모든 URL entry는 9개 언어 variant + `x-default(en)` alternates를 생성한다.

### 5) URL limit + image discovery

- sitemap route는 50,000 URL protocol limit을 초과하면 더 이상 조용히 truncate하지 않는다.
- journeys/users는 localized URL count 기준으로 chunk 분할한다.
- journey moments/photos는 journey 단위 part sitemap으로 분리하고, 필요 시 part index를 증가시킨다.
- image-bearing page URL은 image sitemap extension(`image:loc`)을 함께 제공한다.

### 6) Static sitemap 포함 범위

현재 static sitemap은 다음만 포함한다.

- 홈
- 정적 공개 라우트: `faq`
- content index: `journeys`, `users`

(redirect alias `how-it-works`/`download`, legal 경로는 static sitemap에 포함하지 않음)

## Rationale

리소스별 분리로 generation 비용과 장애 범위를 축소하고, 다국어 alternates를 일관되게 제공할 수 있다. 또한 URL limit 초과 시 누락 없이 sitemap을 유지하고, 이미지 중심 공개 콘텐츠의 discoverability를 높일 수 있다.

## Consequences

### Positive
- ✅ 규모 증가 시 sitemap 관리 용이
- ✅ 리소스별 갱신/장애 분리
- ✅ 다국어 SEO 신호 강화
- ✅ 50k limit 초과 시 조용한 URL 누락 방지
- ✅ Google Images용 이미지 발견 신호 강화

### Negative
- ⚠️ 다수 route handler 유지 필요
- ⚠️ API pagination/timeout 전략을 지속 점검해야 함
- ⚠️ root index와 type index 모두의 part 계산이 public API 가용성에 의존

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
- `app/sitemaps/journeys/[part].xml/route.ts`
- `app/sitemaps/journey-moments/[publicId]/[part].xml/route.ts`
- `app/sitemaps/photos/[publicId]/[part].xml/route.ts`
- `app/sitemaps/users/[part].xml/route.ts`
- `lib/sitemap/xml.ts`
- `lib/sitemap/public-content.ts`

## Related Decisions

- [ADR 0001: Multilingual Routing Architecture](./0001-multilingual-routing-architecture.md)
- [ADR 0003: Static Site Generation Strategy](./0003-static-site-generation-strategy.md)
- [ADR 0005: Public API Integration for Published Content](./0005-public-api-integration.md)
