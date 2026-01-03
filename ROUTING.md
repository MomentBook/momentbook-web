# MomentBook Web — Routing Structure

This document defines the file and routing architecture for the MomentBook public web project.

## Proposed `/app` Directory Structure

```
app/
├── layout.tsx                    # Root layout (fonts, metadata, analytics)
├── page.tsx                      # Home page (/)
├── globals.css                   # Global styles
├── favicon.ico
│
├── (marketing)/                  # Route group: brand & introduction
│   ├── about/
│   │   └── page.tsx             # /about — What is MomentBook
│   ├── how-it-works/
│   │   └── page.tsx             # /how-it-works — Conceptual overview
│   └── download/
│       └── page.tsx             # /download — App store links
│
├── (legal)/                      # Route group: legal & policy
│   ├── privacy/
│   │   └── page.tsx             # /privacy — Privacy Policy
│   ├── terms/
│   │   └── page.tsx             # /terms — Terms of Service
│   └── support/
│       └── page.tsx             # /support — Help & contact
│
├── (content)/                    # Route group: SEO & educational content
│   ├── faq/
│   │   └── page.tsx             # /faq — Frequently asked questions
│   ├── concepts/
│   │   ├── page.tsx             # /concepts — Index of concepts
│   │   └── [slug]/
│   │       └── page.tsx         # /concepts/[slug] — Individual concept pages
│   └── explore/
│       ├── page.tsx             # /explore — Entry point for discovery
│       ├── journeys/
│       │   ├── page.tsx         # /explore/journeys — Index
│       │   └── [slug]/
│       │       └── page.tsx     # /explore/journeys/[slug] — e.g. "a-quiet-morning"
│       ├── days/
│       │   ├── page.tsx         # /explore/days — Index
│       │   └── [slug]/
│       │       └── page.tsx     # /explore/days/[slug] — e.g. "ordinary-tuesday"
│       ├── places/
│       │   ├── page.tsx         # /explore/places — Index
│       │   └── [slug]/
│       │       └── page.tsx     # /explore/places/[slug] — e.g. "familiar-spaces"
│       └── movements/
│           ├── page.tsx         # /explore/movements — Index
│           └── [slug]/
│               └── page.tsx     # /explore/movements/[slug] — e.g. "returning-home"
│
├── api/                          # API routes (if needed)
│   └── og/
│       └── route.ts             # Dynamic OG image generation
│
└── not-found.tsx                # 404 page

```

---

## Route Group Explanations

### `(marketing)` — Brand & Introduction
**Purpose**: Explain what MomentBook is, who it's for, and how to get it.

**Pages**:
- `/about` — Philosophical introduction to MomentBook
- `/how-it-works` — Conceptual explanation (not UX walkthrough)
- `/download` — App Store / Google Play links

**Philosophy alignment**: Calm, invitational. No hard sell.

---

### `(legal)` — Legal & Support
**Purpose**: Required legal pages and user support.

**Pages**:
- `/privacy` — Privacy Policy (also shown in-app)
- `/terms` — Terms of Service
- `/support` — Help, contact, or FAQ link

**Philosophy alignment**: Transparent, human, non-corporate tone where possible.

---

### `(content)` — SEO & Discovery
**Purpose**: SEO-driven content that helps users discover MomentBook via search.

#### Static Content
- `/faq` — Common questions
- `/concepts` — Index of abstract concepts
- `/concepts/[slug]` — Individual concepts (e.g. `/concepts/reflection`, `/concepts/presence`)

#### Dynamic SEO Pages: `/explore`
The `/explore` namespace contains **generated, template-based pages** that represent:
- Journeys — narrative arcs (e.g. "a quiet morning")
- Days — types of days (e.g. "ordinary tuesday")
- Places — spatial contexts (e.g. "familiar spaces")
- Movements — transitions (e.g. "returning home")

**How these work**:
1. Content is **generated from templates or static data files** (MDX, JSON, YAML)
2. Pages are **pre-rendered at build time** (SSG)
3. Slugs are **human-readable, descriptive, non-technical**
4. These are **NOT user-generated content** — they are editorial, conceptual representations

**Example slugs**:
- `/explore/journeys/a-quiet-morning`
- `/explore/days/ordinary-tuesday`
- `/explore/places/familiar-spaces`
- `/explore/movements/returning-home`

Each page:
- Describes the experience conceptually
- Uses calm, observational language
- Helps users recognize themselves
- Links naturally to app download

**Future extensibility**:
- Easy to add new categories under `/explore`
- Can support locales: `/explore/journeys/[slug]` → `/(locale)/explore/journeys/[slug]`
- Can add filters/indices without breaking existing URLs

---

## Content Organization (Outside `/app`)

```
content/
├── concepts/                    # Concept pages (MDX or JSON)
│   ├── reflection.mdx
│   ├── presence.mdx
│   └── index.json              # Metadata for listing
│
└── explore/                    # SEO page templates & data
    ├── journeys/
    │   ├── a-quiet-morning.mdx
    │   ├── sunday-stillness.mdx
    │   └── index.json
    ├── days/
    │   ├── ordinary-tuesday.mdx
    │   └── index.json
    ├── places/
    │   ├── familiar-spaces.mdx
    │   └── index.json
    └── movements/
        ├── returning-home.mdx
        └── index.json
```

**Why separate content from routes**:
- Content is portable, versionable, editable by non-developers
- Pages are just renderers
- Easy to switch to CMS later if needed

---

## Component Organization

```
components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Navigation.tsx
│
├── marketing/                  # Marketing-specific components
│   ├── Hero.tsx
│   ├── FeatureExplainer.tsx
│   └── AppDownload.tsx
│
├── content/                    # Content rendering
│   ├── MDXContent.tsx
│   ├── ExploreCard.tsx
│   └── ConceptPreview.tsx
│
└── shared/                     # Shared UI primitives
    ├── Button.tsx
    ├── Card.tsx
    └── Link.tsx
```

---

## Why This Structure Fits MomentBook

### 1. Quiet Discovery
- `/explore` acts as a soft, curious entry point
- No aggressive CTAs or conversion funnels
- Users find pages via search, not via navigation pressure

### 2. Descriptive, Not Prescriptive
- Content describes experiences, not features
- No "how-to" tone, only "what it's like"
- SEO pages are reflections, not instructions

### 3. Non-Social, Non-Performative
- No user profiles, no sharing, no content feeds
- Pages are editorial and conceptual
- Generated content represents ideas, not real user data

### 4. Scalable Without Complexity
- Static-first (fast, simple, long-lived)
- Easy to add new SEO categories under `/explore`
- No database, no auth, no backend assumptions

### 5. Separation of Concerns
- Route groups keep marketing, legal, and content separate
- Content lives outside `/app` for portability
- Components are organized by responsibility

---

## Dynamic Route Generation Pattern

For `/explore/[category]/[slug]` pages:

1. **At build time**:
   - Read content files from `content/explore/[category]/`
   - Generate static params for each slug
   - Pre-render all pages (SSG)

2. **Metadata generation**:
   - Each page has unique title, description, OG image
   - Metadata sourced from content frontmatter
   - SEO-optimized but not keyword-stuffed

3. **Linking**:
   - Index pages (`/explore/journeys`) list all items
   - Cards link to individual pages
   - Natural, human-readable URLs

---

## Future Considerations

### Possible Additions
- `/blog` or `/guides` (if editorial content expands)
- `/stories` (curated, non-user narratives)
- `/(locale)` route group for internationalization

### What This Structure Does NOT Support
- User accounts or dashboards
- Real-time data or interactivity
- Social features or content feeds
- Native app functionality

This is intentional. The web remains descriptive, not prescriptive.

---

## Next Steps

1. Create the route structure (empty pages with metadata)
2. Define shared layouts for each route group
3. Create content schemas (MDX frontmatter or JSON structure)
4. Implement base components (Header, Footer, Card, etc.)
5. Build one example page per category as a template
6. Generate remaining pages from content files

The structure is ready. Implementation can proceed category by category.
