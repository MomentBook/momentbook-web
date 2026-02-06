# MomentBook Web (SEO / Public Site) — AI Collaboration Guide

## 1) Project Purpose

This repository is the public-facing web and SEO site for the MomentBook app.
It explains what MomentBook is, helps users discover it via search, and provides **read-only** pages for publicly published journeys/photos/users.
This project **does not implement or extend** product behavior — the real experience lives in the native app.

## 2) Relationship to the Native App (Source of Truth)

- The native app is the primary product; this web is descriptive, not prescriptive.
- If uncertain about wording or feature interpretation, defer to the app's philosophy.
- **The web must never redefine or reinterpret the product.**

## 3) What This Web Project SHOULD Do

- Explain the product's philosophy before its features
- Communicate who the app is for — and who it is not for
- Prioritize clarity, calmness, and trust over persuasion
- Be SEO-friendly without becoming marketing-heavy

> This site exists to help users recognize themselves, not to convince them.

## 4) What This Web Project MUST NOT Do

- Invent features not present in the app
- Describe internal app states as user-visible mechanics
- Promise future functionality or a roadmap
- Use productivity / habit / performance framing
- Encourage social interaction as a primary goal (feeds, likes, ranking)
- Turn the app into a "tool" rather than an experience

If something feels like a pitch, it is likely wrong.

## 5) Language & Tone Principles (Non-Negotiable)

Calm, quiet, observational, invitational, reflective.

- Allowed: "You might find this useful if…", "Nothing is required."
- Forbidden: "Track your life.", "Build a habit.", "Never forget again.", "Capture everything."
- When in doubt, say less.

## 6) Data & Monetization Guardrails (Critical)

- No absolute/permanent claims ("never tracking users", "ad-free forever")
- Prefer qualified language: "currently", "at this stage", "for core functionality only"

## 7) SEO Philosophy

SEO is a discovery mechanism, not a persuasion tool.
Pages must reflect reality, not aspiration. Avoid clickbait phrasing.

## 8) Technical Stack (Brief)

Next.js 16 (App Router) · React 18 · TypeScript · SCSS Modules · Yarn Berry (v3)
Jotai (state) · Firebase (analytics) · Leaflet (maps) · Axios (HTTP)

> Full technical details (routing, content sources, sitemaps, env vars) → [docs/PRODUCT.md](docs/PRODUCT.md)

## 9) AI Usage Rules

- Respect the native app's philosophy
- Avoid suggesting new product directions or translating app internals into web flows
- Prefer omission over elaboration; if uncertain, explain less
- 응답은 한국어, 코드/커밋 메시지는 영어

## 10) Workflow Rules

- `docs/adr/`의 ADR은 바인딩 규칙이다. ADR에 없는 결정은 먼저 확인 후 진행.
- 새 기능/대규모 리팩터링은 승인 없이 시작하지 않는다 (doc↔code 불일치 수정 제외).
- 코드 변경 후 반드시 검증: `npx tsc --noEmit && yarn lint`
- 새로운 설계 결정이 발생하면 기존 ADR 업데이트 우선, 필요 시 새 ADR 추가 + README.md 인덱스 갱신.

### Task 완료 시 포함할 항목

- 변경 사항 (≤10 bullets)
- 수정된 파일 목록
- 실행한 명령어 + 결과
- 수동 테스트 체크리스트
- 커밋 메시지 제안 (Conventional Commits: `type(scope): message`)

## 11) Final Principle

MomentBook is not something to be sold.
It is something a user either quietly recognizes — or does not.
The web should respect that choice.

## Related Docs

- [docs/PRODUCT.md](docs/PRODUCT.md) — Product definition & technical details
- [docs/adr/README.md](docs/adr/README.md) — Architecture Decision Records index
