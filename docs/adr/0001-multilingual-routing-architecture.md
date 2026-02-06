# ADR 0001: Multilingual Routing Architecture

## Status
Accepted

## Date
2025-01-04 (updated: 2026-02-06)

## Context
MomentBook web project needs to support multiple languages to reach a global audience.

Current supported route languages:
- `en` (en-US)
- `ko` (ko-KR)
- `ja` (ja-JP)
- `zh` (zh-CN)
- `es` (es-ES)
- `pt` (pt-BR)
- `fr` (fr-FR)
- `th` (th-TH)
- `vi` (vi-VN)

The solution must:
- Support SEO-friendly URLs with language prefixes (e.g., `/en/about`, `/ko/about`)
- Generate static pages for all language variants
- Be maintainable and easy to extend with new languages
- Work within Next.js App Router constraints
- Avoid heavy i18n libraries to keep bundle size minimal

## Decision
We implemented a custom multilingual routing solution using Next.js dynamic segments.

### 1. URL Structure
- Language prefix in URL path: `/{lang}/{page}`
- All pages follow pattern: `/[lang]/...`

### 2. Root & Non-prefixed Path Handling (Middleware)
- Requests that do not include a language prefix are redirected to `/{lang}` using `middleware.ts`.
- Preference order:
  1) Cookie `preferredLanguage`
  2) `Accept-Language` header (best-effort)
  3) Default language (`en`)

Client-side preference is stored in localStorage (key: `language`) and synced to the `preferredLanguage` cookie on language-prefixed routes. If no stored preference exists on the client (and no prefix is present), the device language is used as a best-effort seed.

> Note: Header/device detection is used only for **redirect selection/initial seeding**. Pages remain statically generated per language; we do not rely on runtime language negotiation for rendering.

### 3. Implementation Components

#### Language Configuration (`/lib/i18n/config.ts`)
- Centralized language definitions
- Type-safe language codes using TypeScript
- Utility functions for language validation, path prefix stripping, locale/hreflang mapping
- Per-language locale metadata (`locale`, `openGraphLocale`) and store region mapping

#### Dictionary System (`/lib/i18n/dictionaries/`)
- Separate dictionary file for each language
- Async loading via `getDictionary(lang)` function
- TypeScript interface for type safety across all translations
- Flexible type system allowing localized content while maintaining structure
- English fallback for locales without dedicated copy yet

#### Route Structure
- Dynamic segment: `app/[lang]/...`
- Static generation via `generateStaticParams()` (where applicable)
- Language-aware metadata generation
- Sitemap generation for all language variants

#### Preference Sync
- `LanguageSyncProvider` syncs localStorage preference to the `preferredLanguage` cookie and seeds from device language when needed
- `LanguagePreferenceSync` keeps the current route language aligned with local preference

#### SEO Metadata Strategy
- `buildAlternates()` generates hreflang links for all 9 languages + x-default
- x-default points to English (`en`) as the primary/fallback language
- Canonical URL points to the current language variant
- `metadataBase` set in layout converts relative URLs to absolute
- All pages with `generateMetadata` must call `buildAlternates(lang, path)`

### 4. Type Safety Pattern
Used type assertion pattern to satisfy Next.js types while maintaining type safety:
```typescript
const { lang } = await params as { lang: Language };
```

## Consequences

### Positive
- ✅ SEO-friendly URLs with language codes
- ✅ No runtime i18n library overhead
- ✅ Type-safe translations
- ✅ Easy to add new languages (add dictionary file + update config)
- ✅ Clean separation of content from structure

### Negative
- ⚠️ Type assertion needed for Next.js params (minor TypeScript friction)
- ⚠️ Manual translation management (no automatic translation features)
- ⚠️ Adding/changing translations requires deployment

### Neutral
- 📝 Each page needs to handle language parameter
- 📝 Dictionary structure must be maintained across all languages

## Alternatives Considered

### 1. next-intl or react-i18next
**Rejected**: Too heavy for our use case, adds unnecessary bundle size and complexity

### 2. Query Parameter Approach (`?lang=ko`)
**Rejected**: Not SEO-friendly, harder for users to bookmark specific language versions

### 3. Subdomain Approach (`ko.momentbook.app`)
**Rejected**: Requires additional infrastructure and complicates deployment

### 4. Pure Accept-Language Rendering Negotiation
**Rejected**: Conflicts with our preference for static, cacheable pages and predictable canonical URLs.

## Implementation Files
- `/middleware.ts` - Redirects non-prefixed paths to `/{lang}`
- `/lib/i18n/config.ts` - Language configuration
- `/lib/i18n/dictionaries/` - Translation dictionaries
- `/app/[lang]/layout.tsx` - Language-aware layout
- `/app/page.tsx` - Root redirect (legacy/compat)
- `/app/sitemap.ts` - Sitemap index

## Related Decisions
- [ADR 0002: Legal Document Internationalization](./0002-legal-document-internationalization.md)
- [ADR 0003: Static Site Generation Strategy](./0003-static-site-generation-strategy.md)
