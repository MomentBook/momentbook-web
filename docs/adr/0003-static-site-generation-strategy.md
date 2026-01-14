# ADR 0003: Static Site Generation Strategy

## Status
Accepted

## Date
2025-01-04

## Context
MomentBook web project is a content-focused website that needs to:
- Load extremely fast for first-time visitors
- Rank well in search engines (SEO)
- Support multiple languages
- Handle 70+ pages efficiently
- Minimize hosting costs
- Remain simple to deploy and maintain

## Decision

### 1. Static Site Generation (SSG) with Next.js
Use Next.js App Router with `generateStaticParams()` to pre-render all pages at build time.

### 2. Build-Time Page Generation
All pages are generated as static HTML during the build process:
- **Static Routes**: Home, About, How It Works, Download, FAQ, Support
- **Legal Routes**: Privacy, Terms, Community Guidelines (all languages)
- **Dynamic Routes**: Journeys, Places, Days (with pre-defined content)
- **Total**: 74 static HTML pages

### 3. Implementation Pattern

```typescript
// Generate static params for all language variants
export async function generateStaticParams() {
  return languageList.map((lang) => ({ lang }));
}

// Pre-render at build time
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params as { lang: Language };
  const dict = await getDictionary(lang);

  return <div>{/* Static content */}</div>;
}
```

### 4. Build Output Structure
```
.next/
├── static/
│   ├── css/
│   ├── chunks/
│   └── media/
└── server/
    └── app/
        ├── [lang]/
        │   ├── page.html (en, ko, ja, zh)
        │   ├── about/page.html (×4)
        │   ├── privacy/page.html (×4)
        │   └── ... (all routes × 4 languages)
        └── sitemap.xml
```

### 5. Revalidation Strategy
- **Static Routes**: No revalidation (build-time only)
- **Dynamic Content Routes**:
  - Revalidate: 1 day (86400 seconds)
  - Expire: 1 year (for CDN caching)

```typescript
export const revalidate = 86400; // 1 day
export const dynamic = 'force-static';
```

## Consequences

### Positive
- ✅ **Instant Page Loads**: HTML served directly from CDN
- ✅ **SEO Optimized**: Search engines crawl static HTML easily
- ✅ **Low Hosting Costs**: Can be deployed to any static host (Vercel, Netlify, S3)
- ✅ **High Reliability**: No server-side failures, no database dependencies
- ✅ **Simple Caching**: CDN caches all pages by default
- ✅ **Predictable Performance**: No runtime processing overhead
- ✅ **Offline Capable**: With service worker, can work offline
- ✅ **Easy Rollback**: Just redeploy previous build

### Negative
- ⚠️ **Build Time**: ~90 seconds for full build with 74 pages
- ⚠️ **Update Latency**: Content changes require rebuild and redeploy
- ⚠️ **No User-Generated Content**: Cannot support dynamic user content without API
- ⚠️ **No Personalization**: Same HTML served to all users (per language)

### Neutral
- 📝 **Content Updates**: Through code commits, not CMS
- 📝 **Preview**: Need preview deployment for content review
- 📝 **Build Automation**: CI/CD required for efficient workflows

## Build Performance Metrics

### Current Build Stats
- **Total Pages**: 74 static pages
- **Build Time**: ~90 seconds (Turbopack)
- **Bundle Size**: Optimized for production
- **Output Size**: ~12 MB (including all assets)

### Page Breakdown
- Root + 404: 2 pages
- Language roots: 4 pages (en, ko, ja, zh)
- Static pages: 6 routes × 4 languages = 24 pages
- Legal pages: 3 routes × 4 languages = 12 pages
- Dynamic pages: ~32 pages (journeys, places, days)

## Deployment Strategy

### 1. Vercel (Primary)
- Automatic deployment from git push
- Global CDN with edge caching
- Automatic HTTPS
- Preview deployments for PRs

### 2. Alternative Hosts
- **Netlify**: Similar to Vercel
- **Cloudflare Pages**: Fast global CDN
- **AWS S3 + CloudFront**: More control, higher complexity
- **GitHub Pages**: Free hosting option

### 3. Build Commands
```bash
# Production build
yarn build

# Output: .next/ directory with static pages
# Deploy: Upload .next/static and .next/server to host
```

## Sitemap Generation

Static sitemap generated at build time:
```typescript
// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [/* ... */];

  return languageList.flatMap((lang) =>
    staticPaths.map((route) => ({
      url: `${siteUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: route === '' ? 1 : 0.8,
    }))
  );
}
```

Output: `/sitemap.xml` with all 74 pages

## Cache Strategy

### 1. Build-Time Assets
- **Static CSS/JS**: Hashed filenames, cached forever
- **Images**: Optimized and hashed, long cache TTL
- **Fonts**: Self-hosted, long cache TTL

### 2. HTML Pages
- **Cache-Control**: `public, max-age=3600, s-maxage=86400`
- **CDN**: Edge caching for 24 hours
- **Revalidation**: Stale-while-revalidate pattern

### 3. API Routes (None)
- No API routes in current architecture
- Future: May add for contact forms, newsletter signup

## Alternatives Considered

### 1. Server-Side Rendering (SSR)
**Rejected**:
- Higher hosting costs (requires Node.js server)
- Slower TTFB (time to first byte)
- More complex deployment
- Not needed for static content

### 2. Incremental Static Regeneration (ISR)
**Rejected**:
- Adds complexity without clear benefit
- Content updates are infrequent
- Full rebuild acceptable for our scale
- Preview deployments handle content review

### 3. Client-Side Rendering (SPA)
**Rejected**:
- Poor SEO (requires JavaScript for content)
- Slower initial load
- More complex state management
- Not suitable for content-focused site

### 4. Hybrid Approach (SSG + SSR)
**Rejected**:
- Unnecessary complexity
- All content is known at build time
- No dynamic user-specific content yet

## Future Considerations

### When to Reconsider This Decision
1. **User-generated content**: If we add comments, reviews, etc.
2. **Real-time updates**: If content must update without deployment
3. **Personalization**: If we need user-specific content
4. **Scale**: If page count exceeds 500+ pages
5. **Dynamic pricing**: If we add e-commerce features

### Potential Enhancements
- **Incremental Builds**: Only rebuild changed pages
- **Edge Functions**: For form handling, analytics
- **Service Worker**: For offline support, faster navigation
- **Optimistic UI**: For better perceived performance

## Related Decisions
- [ADR 0001: Multilingual Routing Architecture](#0001)
- [ADR 0002: Legal Document Internationalization](#0002)

## References
- [Next.js Static Site Generation](https://nextjs.org/docs/app/building-your-application/rendering/server-components#static-rendering-default)
- [Vercel Edge Network](https://vercel.com/docs/edge-network/overview)
