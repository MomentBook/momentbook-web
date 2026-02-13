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
- Date: 2025-01-04 (updated: 2026-02-12)
- Status: Accepted
- Summary: `app/[lang]` + `proxy.ts` 기반 언어 prefix 라우팅, cookie/Accept-Language redirect, hreflang alternates

2. [ADR 0002: Legal Document Internationalization](./0002-legal-document-internationalization.md)
- Date: 2025-01-04 (updated: 2026-02-12)
- Status: Accepted
- Summary: 법적 문서 component 분기, core locale 원문 유지, extended locale 본문 영어 fallback, legal noindex

3. [ADR 0003: Static Generation + Revalidation Strategy](./0003-static-site-generation-strategy.md)
- Date: 2025-01-04 (updated: 2026-02-12)
- Status: Accepted
- Summary: 정적 중심 + route별 revalidate(60/3600) + null-safe fetch 실패 처리

4. [ADR 0004: Footer Navigation Structure](./0004-footer-navigation-structure.md)
- Date: 2025-01-04 (updated: 2026-02-12)
- Status: Accepted
- Summary: 브랜드 블록 + Product/Download/Support/Legal 컬럼 구조

5. [ADR 0005: Public API Integration for Published Content](./0005-public-api-integration.md)
- Date: 2026-01-29 (updated: 2026-02-12)
- Status: Accepted
- Summary: 공개 콘텐츠 API 우선, host 후보 fallback fetch, generated API 타입 계약

6. [ADR 0006: Segmented Sitemaps (Index + Sub-sitemaps)](./0006-segmented-sitemaps.md)
- Date: 2026-01-29 (updated: 2026-02-12)
- Status: Accepted
- Summary: `/sitemap.xml` index + 리소스 분할 sitemap route handlers + hreflang alternates

7. [ADR 0007: Web Analytics Integration (GA4 + Firebase-ready modules)](./0007-firebase-analytics-integration.md)
- Date: 2026-02-06 (updated: 2026-02-12)
- Status: Accepted
- Summary: production GA4 script + route page_view tracker, Firebase helper 모듈 준비 상태 유지

8. [ADR 0008: AEO/GEO Optimization](./0008-aeo-geo-optimization.md)
- Date: 2026-02-09 (updated: 2026-02-12)
- Status: Accepted
- Summary: answer-ready sections, JSON-LD 보강, 내부 링크 강화, `llms.txt` 제공

9. [ADR 0009: Web Authentication and Reporting Flow](./0009-web-authentication-and-reporting-flow.md)
- Date: 2026-02-12
- Status: Accepted
- Summary: NextAuth + backend token exchange + email auth proxy + report intent login return flow

## Status Definitions

| Status | Meaning |
|--------|---------|
| Proposed | 논의 중, 아직 채택 안 됨 |
| Accepted | 채택되어 현재 코드베이스에 적용 |
| Deprecated | 더 이상 권장되지 않음 |
| Superseded | 신규 ADR에 의해 대체됨 |

## Creating New ADRs

1. Number: 다음 순번 사용 (`0010`, `0011`, ...)
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
