# Architecture Decision Records (ADR)

MomentBook Web 프로젝트의 핵심 아키텍처 의사결정을 관리한다.

## ADR Format

각 ADR은 아래 구조를 따른다.

- Title
- Status (`Proposed | Accepted | Deprecated | Superseded`)
- Date
- Context
- Decision
- Rationale
- Consequences
- Alternatives Considered

## Index

### Current ADRs

1. [ADR 0001: Multilingual Routing Architecture](./0001-multilingual-routing-architecture.md)
- Date: 2025-01-04 (updated: 2026-04-03)
- Status: Accepted
- Summary: route-group root layouts + `app/(localized)/[lang]` + root x-default gateway(`/`) bypassing `proxy.ts`, shared language matching for query/cookie/header/browser preferences, localized path visit persistence, SSR + client-synced `html lang`, hreflang alternates

2. [ADR 0002: Legal Document Internationalization](./0002-legal-document-internationalization.md)
- Date: 2025-01-04 (updated: 2026-03-28)
- Status: Accepted
- Summary: legal/support 전 경로 9개 언어 copy 유지 + legal noindex + 푸터 상시 접근

3. [ADR 0003: Static Generation + Revalidation Strategy](./0003-static-site-generation-strategy.md)
- Date: 2025-01-04 (updated: 2026-04-02)
- Status: Accepted
- Summary: 정적 중심 + route별 revalidate(300/14400) + additive local-time context 우선 렌더링/absolute timestamp fallback + direct published image fetch(no app-managed SW cache) + route-group root layouts와 root x-default gateway

4. [ADR 0004: Footer Navigation Structure](./0004-footer-navigation-structure.md)
- Date: 2025-01-04 (updated: 2026-03-12)
- Status: Accepted
- Summary: lead block(브랜드/CTA/소셜) + Product/Support/Legal link grid 구조

5. [ADR 0005: Public API Integration for Published Content](./0005-public-api-integration.md)
- Date: 2026-01-29 (updated: 2026-04-03)
- Status: Accepted
- Summary: 공개 콘텐츠 API 우선, discovery feed의 explicit `reviewStatus=APPROVED`, lang query 기반 localized public fetch, hidden detail notice와 non-public detail 404 분리, 운영 단일 origin + 로컬 fallback, generated API 타입 계약

6. [ADR 0006: Segmented Sitemaps (Index + Sub-sitemaps)](./0006-segmented-sitemaps.md)
- Date: 2026-01-29 (updated: 2026-04-02)
- Status: Accepted
- Summary: `/sitemap.xml` index + type-level sitemap indexes + part sitemap routes + image sitemap extension + no-truncation 분할 전략

7. [ADR 0007: Web Analytics Integration (GA4 + Firebase-ready modules)](./0007-firebase-analytics-integration.md)
- Date: 2026-02-06 (updated: 2026-03-12)
- Status: Accepted
- Summary: production GA4 script + route page_view tracker, Firebase helper 모듈 준비 상태 유지

8. [ADR 0008: AEO/GEO Optimization](./0008-aeo-geo-optimization.md)
- Date: 2026-02-09 (updated: 2026-03-12)
- Status: Accepted
- Summary: 홈 intro/download + 독립 FAQ answer-ready page + Home/FAQ JSON-LD + `llms.txt` 제공

9. [ADR 0009: Web Authentication and Reporting Flow](./0009-web-authentication-and-reporting-flow.md)
- Date: 2026-02-12
- Status: Superseded by ADR 0010
- Summary: NextAuth 기반 웹 인증/신고 플로우(현재는 superseded)

10. [ADR 0010: Remove Web Authentication Surface](./0010-remove-web-authentication-surface.md)
- Date: 2026-03-01 (updated: 2026-03-12)
- Status: Accepted
- Summary: 웹 로그인/API auth/report UI 제거, 공개 읽기 전용 표면으로 단순화

11. [ADR 0011: Internal Admin Moderation Surface](./0011-internal-admin-moderation-surface.md)
- Date: 2026-04-03
- Status: Accepted
- Summary: 공개 웹과 분리된 `/admin` 운영 표면, browser-reachable API origin을 전제로 한 browser-direct backend login + encrypted HttpOnly session bootstrap, fixed admin account, mock queue/detail preview + known `publicId` 기반 live review-status mutation

## Status Definitions

| Status | Meaning |
|--------|---------|
| Proposed | 논의 중, 아직 채택 안 됨 |
| Accepted | 채택되어 현재 코드베이스에 적용 |
| Deprecated | 더 이상 권장되지 않음 |
| Superseded | 신규 ADR에 의해 대체됨 |

## Creating New ADRs

1. Number: 다음 순번 사용 (`0011`, `0012`, ...)
2. Filename: `XXXX-descriptive-title.md`
3. Template: 기존 ADR 형식 준수
4. Index update: 이 README 인덱스 동시 갱신

## ADR Template

```markdown
# ADR XXXX: [Title]

## Status
[Proposed | Accepted | Deprecated | Superseded by ADR-YYYY]

## Date
YYYY-MM-DD

## Context
...

## Decision
...

## Rationale
...

## Consequences
### Positive
- ✅ ...

### Negative
- ⚠️ ...

### Neutral
- 📝 ...

## Alternatives Considered
### 1. ...
Rejected: ...

## Related Decisions
- [ADR YYYY: ...](./YYYY-...md)
```
