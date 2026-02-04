# MomentBook Web (SEO / Public Site) — AI Collaboration Guide

## 1) Project Purpose

This repository is the public-facing web and SEO site for the MomentBook app.

It exists to:
- Explain what MomentBook is — calmly and accurately
- Help the right users discover the app via search
- Set expectations before app installation
- Guide users to the native app (App Store / Google Play)
- Provide **read-only** pages for *publicly published* journeys/photos/users

This project **does not implement or extend** product behavior.
The real product experience lives in the native app.

## 2) Relationship to the Native App (Source of Truth)

- The native MomentBook app is the primary product.
- This web project is descriptive, not prescriptive.
- If there is uncertainty about wording, feature interpretation, or user expectations:
  - Defer to the app’s philosophy and the app repo’s alignment docs.

**The web must never redefine or reinterpret the product.**

## 3) What This Web Project SHOULD Do

- Explain the product’s philosophy before its features
- Communicate who the app is for — and who it is not for
- Describe the experience at a conceptual level, not operational mechanics
- Prioritize clarity, calmness, and trust over persuasion
- Be SEO-friendly without becoming marketing-heavy

> This site exists to help users recognize themselves, not to convince them.

## 4) What This Web Project MUST NOT Do

The web must NOT:
- Invent features not present in the app
- Describe internal app states as user-visible mechanics
- Promise future functionality or a roadmap
- Use productivity / habit / performance framing
- Encourage social interaction as a primary goal (feeds, likes, ranking)
- Turn the app into a “tool” rather than an experience

If something feels like a pitch, it is likely wrong.

## 5) Language & Tone Principles (Non‑Negotiable)

All public copy must be:
- Calm, quiet, and human
- Observational, not directive
- Invitational, not persuasive
- Reflective, not energetic

Allowed:
- “You might find this useful if…”
- “This app quietly remembers your day.”
- “Nothing is required.”

Forbidden:
- “Track your life.”
- “Build a habit.”
- “Never forget again.”
- “Stay consistent.”
- “Capture everything.”

When in doubt, say less.

## 6) Data & Monetization Guardrails (Critical)

MomentBook processes user data for core functionality (photos, location, movement context).

Currently:
- No ads are displayed
- No advertising-based tracking is described

However:
- Monetization may be introduced in the future

**Do NOT make absolute/permanent claims**, such as:
- “never tracking users”
- “collecting no usage data”
- “guaranteed ad‑free forever”

Prefer qualified language:
- “currently”, “at this stage”, “for core functionality only”

## 7) SEO Philosophy

SEO is a discovery mechanism, not a persuasion tool.
- Pages should answer honest questions people may search for
- Keywords must not distort product meaning
- Titles/descriptions should be factual, not hype
- Avoid clickbait phrasing

SEO pages must reflect reality, not aspiration.

## 8) Technical Reality (Keep Documentation Honest)

### Stack
- Next.js (App Router)
- React 18
- TypeScript
- SCSS Modules
- Yarn Berry (v3)

### i18n routing
- All user-facing routes are under `app/[lang]/...`
- Middleware redirects `/` (and non-prefixed paths) to a language prefix
  - Cookie `preferredLanguage` is honored
  - Fallback: `Accept-Language` header
- Supported languages: `en`, `ko`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi`

### Content sources
This repo supports **two** sources:
1) **Public API** (primary when configured)
   - Controlled by `NEXT_PUBLIC_API_BASE_URL`
   - Uses `fetch(..., { next: { revalidate: 3600 } })` for ISR-style caching
2) **Static sample content** (dev/demo fallback)
   - `lib/public-content.ts` (currently used by the Journey list page)

When documenting “what the site shows”, describe the *current behavior*, and note when something is still a sample/fallback.

### Sitemaps
- Root `app/sitemap.ts` returns a **sitemap index** pointing to sub-sitemaps:
  - `/sitemap-static.xml`
  - `/sitemap-journeys.xml`
  - `/sitemap-photos.xml`
  - `/sitemap-users.xml`
- Sub-sitemaps are route handlers that return XML with cache headers.
- Public-content sitemaps may call the Public API to enumerate IDs.

### Environment variables
- `NEXT_PUBLIC_SITE_URL` (canonical site URL for metadata/sitemaps)
- `NEXT_PUBLIC_API_BASE_URL` (MomentBook API base URL, e.g. `https://api.example.com`)

## 9) AI Usage Rules

When assisting this project, AI must:
- Respect the native app’s philosophy
- Avoid suggesting new product directions
- Avoid translating app internals into web flows
- Prefer omission over elaboration
- If uncertain, default to explaining less, not more

## 10) Final Principle

MomentBook is not something to be sold.
It is something a user either quietly recognizes — or does not.

The web should respect that choice.
