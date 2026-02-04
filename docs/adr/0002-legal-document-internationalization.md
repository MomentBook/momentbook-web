# ADR 0002: Legal Document Internationalization

## Status
Accepted

## Date
2025-01-04 (updated: 2026-02-04)

## Context
MomentBook requires four legal documents to be published on the web:
1. Terms of Service (EULA)
2. Privacy Policy
3. Community Guidelines & Content Policy
4. Marketing Consent

These documents must:
- Be available in all supported route languages
- Maintain legal accuracy across translations
- Be easily readable and professionally formatted
- Be accessible via footer links on all pages
- Support future updates with version tracking

## Decision

### 1. Component-Based Architecture
Each legal document is implemented as a single page component with language-specific sub-components:

```typescript
export default async function LegalPage({ params }) {
  const { lang } = await params as { lang: Language };

  return (
    <div className={styles.container}>
      <article className={styles.content}>
        {lang === "en" && <EnglishContent />}
        {lang === "ko" && <KoreanContent />}
        {lang === "ja" && <JapaneseContent />}
        {lang === "zh" && <ChineseContent />}
      </article>
    </div>
  );
}
```

### 1.1 Language Coverage Policy (updated)
- Authored legal text is maintained for core locales: `en`, `ko`, `ja`, `zh`.
- Extended locales (`es`, `pt`, `fr`, `th`, `vi`) render English legal text until legal translations are reviewed and approved.
- Routes and SEO alternates are still published for all supported locales.

### 2. Content Organization
- **Inline JSX**: Legal content embedded directly in component functions
- **Semantic HTML**: Proper use of `<article>`, `<section>`, `<header>` elements
- **Metadata Header**: Version, effective date, operator information
- **Structured Sections**: Numbered sections with clear hierarchy

### 3. Styling Approach
- **Dedicated SCSS Modules**: Each legal document has its own stylesheet
- **Responsive Typography**: Scales from mobile (1.0625rem) to desktop (1.1875rem)
- **Wide Container**: 56rem → 64rem max-width for better readability
- **Clean Layout**: Generous spacing, clear visual hierarchy
- **Professional Appearance**: Border separators, consistent spacing

### 4. Version Management
Each document includes metadata:
```typescript
<p><strong>Version:</strong> 1.0.1</p>
<p><strong>Effective Date:</strong> January 4, 2025</p>
<p><strong>Last Updated:</strong> January 4, 2025</p>
```

### 5. Navigation Integration
Legal documents accessible via:
- Footer links on every page
- Direct URL:
  - `/{lang}/privacy`
  - `/{lang}/terms`
  - `/{lang}/community-guidelines`
  - `/{lang}/marketing-consent`
- Sitemap inclusion for SEO

## Consequences

### Positive
- ✅ Complete control over legal content presentation
- ✅ No external dependencies or CMS needed
- ✅ Type-safe content (TypeScript compilation catches errors)
- ✅ Fast loading (statically generated)
- ✅ Easy version tracking via git
- ✅ Professional, readable layout
- ✅ Consistent styling across all legal documents

### Negative
- ⚠️ Large file sizes (each document ~400 lines with 4 languages)
- ⚠️ Must manually update all language versions when content changes
- ⚠️ No translation memory or CAT tool integration

### Neutral
- 📝 Legal review must be done for each language separately
- 📝 Content updates require code deployment
- 📝 Version history tracked via git commits
- 📝 Extended locales may temporarily show English legal copy

## Translation Guidelines

### 1. Maintained Consistency
- Legal terminology preserved across languages
- Article/section numbering identical in all versions
- Structure and formatting consistent
- Contact information and dates standardized

### 2. Language-Specific Considerations
- **Korean**: Formal business Korean (격식체)
- **Japanese**: Polite form (です・ます体)
- **Chinese**: Simplified Chinese, formal business tone
- **English**: Clear, professional American English

### 3. Critical Elements
- Version numbers always match across languages
- Effective dates identical in all versions
- Operator name kept as "윤한솔" (Hansol Yoon) in all languages for legal consistency

## Implementation Files

### Pages
- `/app/[lang]/(legal)/terms/page.tsx` - Terms of Service
- `/app/[lang]/(legal)/privacy/page.tsx` - Privacy Policy
- `/app/[lang]/(legal)/community-guidelines/page.tsx` - Community Guidelines
- `/app/[lang]/(legal)/marketing-consent/page.tsx` - Marketing Consent

### Styles
- `/app/[lang]/(legal)/terms/terms.module.scss`
- `/app/[lang]/(legal)/privacy/privacy.module.scss`
- `/app/[lang]/(legal)/community-guidelines/community-guidelines.module.scss`
- `/app/[lang]/(legal)/marketing-consent/marketing-consent.module.scss`

### Versions
- **Terms of Service**: v1.0.1 (2025-01-04)
- **Privacy Policy**: v1.0.1 (2025-01-04)
- **Community Guidelines**: v1.0.0 (2025-08-25)
- **Marketing Consent**: v1.0.1 (2025-01-04)

## Alternatives Considered

### 1. Markdown Files + MDX
**Rejected**: Adds build complexity, harder to maintain structured metadata, less control over rendering

### 2. Headless CMS (Contentful, Sanity)
**Rejected**: External dependency, costs, overkill for static legal documents

### 3. JSON Data Files
**Rejected**: Harder to read/edit long legal text, no syntax highlighting, awkward for complex formatting

### 4. Single Component with Conditional Rendering
**Rejected**: Would create a massive single file, harder to navigate and maintain

## Related Decisions
- [ADR 0001: Multilingual Routing Architecture](#0001)
- [ADR 0004: Footer Navigation Structure](#0004)
