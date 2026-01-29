# ADR 0005: Public API Integration for Published Content

## Status
Accepted

## Date
2026-01-29

## Context
The web project must render read-only public pages for published content (journeys, photos, users) without turning the web into a stateful “app”.

We need:
- A scalable source of truth for published data (not hardcoded sample arrays)
- Cacheable pages suitable for SEO (avoid per-request server load)
- Minimal dependencies and predictable failure behavior
- Type-safety aligned with the API contract

At the same time, local development and early marketing work benefit from a lightweight fallback dataset.

## Decision

### 1) Public content is fetched from the MomentBook API when configured
- Environment variable: `NEXT_PUBLIC_API_BASE_URL`
- The web calls v2 public endpoints (e.g. `/v2/users/public`, `/v2/journeys/public/...`).
- Requests use Next.js caching semantics:
  - `fetch(..., { next: { revalidate: 3600 } })`
  - Page-level `export const revalidate = 3600` where appropriate

### 2) Type contract is shared from generated API types
- `swagger-typescript-api` generates `src/apis/client.ts`
- Web code re-exports or references these DTO types to keep view models consistent.

### 3) Failure behavior is explicit and user-safe
- Data fetch helpers return `null` on any failure (missing env, network errors, non-2xx, unexpected payload)
- Pages must handle `null` with:
  - `notFound()` for detail pages when the resource cannot be resolved
  - Empty states for list/search pages
- Avoid throwing uncaught errors that would create unstable crawls.

### 4) Static sample data remains as a temporary fallback
- `lib/public-content.ts` stays as demo content for API-less environments.
- It may still be used by some pages during the migration period.
- The long-term goal is to unify public listings (e.g. `/journeys`) under API.

## Consequences

### Positive
- ✅ Scales with real published content
- ✅ Cacheable and SEO-friendly (ISR-style revalidation)
- ✅ Type-aligned with API contract
- ✅ Safe behavior under API outages or misconfiguration

### Negative
- ⚠️ Requires correct env configuration in production
- ⚠️ Public listings may diverge while hybrid migration is in progress

### Neutral
- 📝 Revalidation window (3600s) is a trade-off between freshness and stability

## Alternatives Considered

### 1) Hardcoded static content only
**Rejected**: Not scalable; cannot reflect real published content.

### 2) Client-side fetching only
**Rejected**: Poor SEO, inconsistent crawls, slower first contentful paint.

### 3) Add a CMS (headless)
**Rejected**: Overkill and introduces operational complexity.

## Implementation Files
- `/lib/public-users.ts` - Public users + profile + journeys fetch helpers
- `/lib/published-journey.ts` - Published journey & photo fetch helpers
- `/src/apis/client.ts` - Generated API DTO types

## Related Decisions
- [ADR 0003: Static Site Generation Strategy](./0003-static-site-generation-strategy.md)
- [ADR 0006: Segmented Sitemaps](./0006-segmented-sitemaps.md)
