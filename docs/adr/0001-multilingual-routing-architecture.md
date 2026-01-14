# ADR 0001: Multilingual Routing Architecture

## Status
Accepted

## Date
2025-01-04

## Context
MomentBook web project needs to support multiple languages (English, Korean, Japanese, Chinese) to reach a global audience. The solution must:
- Support SEO-friendly URLs with language prefixes (e.g., `/en/about`, `/ko/about`)
- Generate static pages for all language variants
- Be maintainable and easy to extend with new languages
- Work within Next.js App Router constraints
- Avoid heavy i18n libraries to keep bundle size minimal

## Decision
We implemented a custom multilingual routing solution using Next.js dynamic segments:

### 1. URL Structure
- Language prefix in URL path: `/{lang}/{page}`
- Root redirects to default language (`/` → `/en`)
- All pages follow pattern: `/[lang]/...`

### 2. Implementation Components

#### Language Configuration (`/lib/i18n/config.ts`)
- Centralized language definitions
- Type-safe language codes using TypeScript
- Utility functions for language validation

#### Dictionary System (`/lib/i18n/dictionaries/`)
- Separate dictionary file for each language
- Async loading via `getDictionary(lang)` function
- TypeScript interface for type safety across all translations
- Flexible type system allowing localized content while maintaining structure

#### Route Structure
- Dynamic segment: `app/[lang]/...`
- Static generation via `generateStaticParams()`
- Language-aware metadata generation
- Sitemap generation for all language variants

### 3. Type Safety Pattern
Used type assertion pattern to satisfy Next.js types while maintaining type safety:
```typescript
const { lang } = await params as { lang: Language };
```

## Consequences

### Positive
- ✅ SEO-friendly URLs with language codes
- ✅ All pages pre-rendered as static HTML
- ✅ No runtime i18n overhead
- ✅ Type-safe translations
- ✅ Easy to add new languages (add dictionary file + update config)
- ✅ Clean separation of content from structure
- ✅ All key routes pre-rendered per language (marketing/legal/content/public pages)

### Negative
- ⚠️ Type assertion needed for Next.js params (minor TypeScript friction)
- ⚠️ Manual translation management (no automatic translation features)
- ⚠️ Need to rebuild entire site when adding/changing translations

### Neutral
- 📝 Each page needs to handle language parameter
- 📝 Dictionary structure must be maintained across all languages
- 📝 URL structure is fixed (cannot easily switch to query params later)

## Alternatives Considered

### 1. next-intl or react-i18next
**Rejected**: Too heavy for our simple use case, adds unnecessary bundle size and complexity

### 2. Query Parameter Approach (`?lang=ko`)
**Rejected**: Not SEO-friendly, harder for users to bookmark specific language versions

### 3. Subdomain Approach (`ko.momentbook.app`)
**Rejected**: Requires additional infrastructure, DNS configuration, and complicates deployment

### 4. Accept-Language Header Detection
**Rejected**: Not compatible with static generation, requires server-side rendering

## Implementation Files
- `/lib/i18n/config.ts` - Language configuration
- `/lib/i18n/dictionaries/` - Translation dictionaries
- `/app/[lang]/layout.tsx` - Language-aware layout
- `/app/page.tsx` - Root redirect
- `/app/sitemap.ts` - Multilingual sitemap generation

## Related Decisions
- [ADR 0002: Legal Document Internationalization](#0002)
- [ADR 0003: Static Site Generation Strategy](#0003)
