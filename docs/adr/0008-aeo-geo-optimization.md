# ADR 0008: AEO/GEO Optimization (Answer-Ready Content + Structured Data)

## Status
Accepted

## Date
2026-02-09 (updated: 2026-03-06)

## Context

전통 SEO 외에 생성형 검색/답변 엔진(LLM 기반)에서 추출 가능한 페이지 구조가 필요했다.

요구사항:

- 핵심 랜딩 페이지의 answer-ready 블록 강화
- 구조화 데이터(JSON-LD) 보강
- LLM 친화적 site manifest 제공

## Decision

### 1) Answer-ready sections 도입

핵심 랜딩 경험을 홈 중심 단일 스크롤 구조로 유지하면서 answer-ready 블록을 통합한다.

- Home: intro, download, FAQ 섹션을 모두 포함
- `/{lang}/download`, `/{lang}/faq`, `/{lang}/how-it-works`는 홈 anchor로 redirect
- FAQ answer와 store CTA는 홈 본문에 실제로 노출된 상태를 유지

### 2) Structured data 강화

- Home: `Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`
- Journey/Moment: `Article`
- User: `ProfilePage`
- Photo: `ImageObject`

### 3) Internal linking 보강

헤더/모바일 메뉴/푸터에서 홈 내부 `#download`, `#faq` 섹션으로 이동하도록 하여 긴 페이지 내 탐색 비용을 줄인다.

### 4) `llms.txt` 제공

`public/llms.txt`를 추가해 사이트 요약/핵심 링크/비목표 정보를 제공한다.

## Rationale

답변형 블록 + 구조화 데이터 + 명확한 in-page 링크 구조는 LLM/AI 검색 엔진이 페이지를 해석할 때의 추출 비용을 줄이고, 사용자에게도 한 번의 스크롤 흐름을 제공한다.

## Consequences

### Positive
- ✅ 핵심 메시지 추출 용이성 향상
- ✅ 다국어 metadata/JSON-LD와 결합된 검색 가시성 강화
- ✅ 사이트 목적/비목표를 llms.txt로 명확히 노출

### Negative
- ⚠️ 다국어 콘텐츠 업데이트 비용 증가
- ⚠️ answer-ready 블록과 본문 불일치 리스크 관리 필요

### Neutral
- 📝 지속적인 문구/스키마 정합성 점검 필요

## Alternatives Considered

### 1. JSON-LD만 확장
Rejected: 사용자 가시 콘텐츠와 구조화 데이터의 정합성이 떨어질 수 있음

### 2. 별도 AI 전용 페이지 생성
Rejected: 정보 중복 및 유지보수 복잡도 증가

## Implementation Files

- `app/[lang]/page.tsx`
- `app/[lang]/(chrome)/page.tsx`
- `app/[lang]/(chrome)/HomeHero.tsx`
- `app/[lang]/(chrome)/HomeDownloadSection.tsx`
- `app/[lang]/(chrome)/HomeFaqSection.tsx`
- `lib/marketing/download-content.ts`
- `lib/marketing/faq-content.ts`
- `lib/marketing/home-sections.ts`
- `app/[lang]/(chrome)/(marketing)/download/page.tsx`
- `app/[lang]/(chrome)/(content)/faq/page.tsx`
- `public/llms.txt`

## Related Decisions

- [ADR 0001: Multilingual Routing Architecture](./0001-multilingual-routing-architecture.md)
- [ADR 0003: Static Site Generation Strategy](./0003-static-site-generation-strategy.md)
- [ADR 0007: Web Analytics Integration](./0007-firebase-analytics-integration.md)
