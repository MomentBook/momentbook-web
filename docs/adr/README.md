# Architecture Decision Records (ADR)

This directory contains Architecture Decision Records for the MomentBook web project.

## What is an ADR?

An Architecture Decision Record (ADR) captures an important architectural decision, its context, and its consequences.

## Format

Each ADR follows this structure:
- **Title**
- **Status**: Proposed | Accepted | Deprecated | Superseded
- **Date**
- **Context**
- **Decision**
- **Consequences**
- **Alternatives Considered**

## Index

### Current ADRs

1. [ADR 0001: Multilingual Routing Architecture](./0001-multilingual-routing-architecture.md)
   - **Date**: 2025-01-04 (updated: 2026-01-29)
   - **Status**: Accepted
   - **Summary**: Custom multilingual routing using Next.js App Router + middleware-based language redirect

2. [ADR 0002: Legal Document Internationalization](./0002-legal-document-internationalization.md)
   - **Date**: 2025-01-04
   - **Status**: Accepted
   - **Summary**: Component-based architecture for multilingual legal documents (Terms, Privacy, Community Guidelines, Marketing Consent)

3. [ADR 0003: Static Site Generation Strategy](./0003-static-site-generation-strategy.md)
   - **Date**: 2025-01-04 (updated: 2026-01-29)
   - **Status**: Accepted
   - **Summary**: SSG + ISR-style caching, hybrid public data sources, and segmented sitemaps for scale

4. [ADR 0004: Footer Navigation Structure](./0004-footer-navigation-structure.md)
   - **Date**: 2025-01-04
   - **Status**: Accepted
   - **Summary**: Multi-column footer with brand CTA + Product/Download/Support/Legal links

5. [ADR 0005: Public API Integration for Published Content](./0005-public-api-integration.md)
   - **Date**: 2026-01-29
   - **Status**: Accepted
   - **Summary**: Use the MomentBook API (when configured) with ISR-style caching; keep sample data as a temporary fallback

6. [ADR 0006: Segmented Sitemaps (Index + Sub-sitemaps)](./0006-segmented-sitemaps.md)
   - **Date**: 2026-01-29
   - **Status**: Accepted
   - **Summary**: Sitemap index + resource-specific sitemaps (users, journeys, journey moments, photos, static) with hreflang alternates and cache headers

## Creating New ADRs

1. **Number**: Use the next sequential number (0007, 0008, ...)
2. **Filename**: `XXXX-descriptive-title.md` (lowercase, hyphenated)
3. **Template**: Follow the structure of existing ADRs
4. **Update Index**: Add entry to this README

### ADR Template

```markdown
# ADR XXXX: [Title]

## Status
[Proposed | Accepted | Deprecated | Superseded by ADR-YYYY]

## Date
YYYY-MM-DD

## Context
[What is the issue motivating this decision?]

## Decision
[What are we doing?]

## Consequences
### Positive
- ✅ ...

### Negative
- ⚠️ ...

### Neutral
- 📝 ...

## Alternatives Considered
### 1. ...
**Rejected**: ...

## Related Decisions
- [ADR YYYY: ...](./YYYY-...md)
```
