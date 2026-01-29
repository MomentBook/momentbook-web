# ADR 0006: Segmented Sitemaps (Index + Sub-sitemaps)

## Status
Accepted

## Date
2026-01-29

## Context
As public content grows (users → journeys → photos), a single sitemap becomes large and slow to generate. We also want:
- Clear separation between static (marketing/legal) and dynamic (published content) URLs
- Predictable caching for crawlers
- `hreflang` alternate links for multilingual SEO

Google's sitemap limits (50,000 URLs per sitemap, size limits) also suggest segmentation.

## Decision

### 1) Use a sitemap index at `/sitemap.xml`
- `app/sitemap.ts` returns a sitemap index (MetadataRoute.Sitemap) that points to sub-sitemaps.

### 2) Generate separate XML sitemaps per resource
Implemented as route handlers:
- `/sitemap-static.xml` — marketing + legal + fixed content routes
- `/sitemap-users.xml` — public user profile routes
- `/sitemap-journeys.xml` — public journey detail routes
- `/sitemap-photos.xml` — public photo detail routes

Each sub-sitemap:
- Builds absolute URLs using `NEXT_PUBLIC_SITE_URL`
- Uses API fetch helpers (see ADR 0005) to discover IDs
- Includes `xhtml:link rel="alternate" hreflang="..."` entries for each supported language
- Sets caching headers to keep crawler load stable:
  - `Cache-Control: public, max-age=3600, s-maxage=3600`

### 3) Safety and correctness
- If API data cannot be fetched, the sitemap still returns valid XML (possibly empty) instead of erroring.
- `lastmod` values are sanitized (fallback to `new Date().toISOString()` when missing/invalid).

## Consequences

### Positive
- ✅ Avoids sitemap size limits and keeps generation fast
- ✅ Separates static vs published content crawling concerns
- ✅ Better multilingual SEO via hreflang alternates
- ✅ Cache-friendly and predictable for crawlers

### Negative
- ⚠️ More moving parts (multiple routes to maintain)
- ⚠️ API pagination/limits must be considered as content scales

### Neutral
- 📝 Requires `NEXT_PUBLIC_SITE_URL` to be set correctly in production

## Alternatives Considered

### 1) Single sitemap via `app/sitemap.ts` only
**Rejected**: Becomes large/slow as published content grows.

### 2) External sitemap generation job
**Rejected**: Adds ops complexity and reduces the “static web” simplicity.

## Implementation Files
- `/app/sitemap.ts` - Sitemap index
- `/app/sitemap-static.xml/route.ts`
- `/app/sitemap-users.xml/route.ts`
- `/app/sitemap-journeys.xml/route.ts`
- `/app/sitemap-photos.xml/route.ts`

## Related Decisions
- [ADR 0001: Multilingual Routing Architecture](./0001-multilingual-routing-architecture.md)
- [ADR 0003: Static Site Generation Strategy](./0003-static-site-generation-strategy.md)
- [ADR 0005: Public API Integration for Published Content](./0005-public-api-integration.md)
