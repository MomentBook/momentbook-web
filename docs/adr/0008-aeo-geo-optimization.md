# ADR 0008: AEO/GEO Optimization (Answer-Ready Content + Structured Data)

## Status
Accepted

## Date
2026-02-09 (updated: 2026-03-12)

## Context

전통 SEO 외에 생성형 검색/답변 엔진(LLM 기반)에서 추출 가능한 페이지 구조가 필요했다.

요구사항:

- 핵심 랜딩 페이지의 answer-ready 블록 강화
- 구조화 데이터(JSON-LD) 보강
- LLM 친화적 site manifest 제공

## Decision

### 1) Answer-ready sections 도입

핵심 랜딩 경험은 홈과 FAQ 페이지를 분리해 유지한다.

- Home: hero, process, recent journeys, download 섹션 중심 단일 스크롤 구조
- `/{lang}/how-it-works`는 홈 루트로, `/{lang}/download`는 홈 download anchor로 redirect
- `/{lang}/faq`는 독립 answer-ready FAQ 페이지로 제공
- FAQ answer는 FAQ 본문에, store CTA는 홈 본문에 실제로 노출된 상태를 유지

### 2) Structured data 강화

- Home: `Organization`, `WebSite`, `SoftwareApplication`
- FAQ: `FAQPage`
- Journey/Moment: `Article`
- User: `ProfilePage`
- Photo: `ImageObject`

### 3) Internal linking 보강

헤더/모바일 메뉴는 홈 내부 `#download` 섹션으로, 푸터와 support 페이지는 독립 FAQ 페이지로 연결한다.

### 4) `llms.txt` 제공

`public/llms.txt`를 추가해 사이트 요약/핵심 링크/비목표 정보를 제공한다.

## Rationale

답변형 블록 + 구조화 데이터 + 명확한 정보 구조는 LLM/AI 검색 엔진이 페이지를 해석할 때의 추출 비용을 줄이고, 사용자가 소개와 도움말을 다른 맥락에서 탐색할 수 있게 한다.

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

- `app/[lang]/(chrome)/page.tsx`
- `app/[lang]/(chrome)/layout.tsx`
- `app/[lang]/(chrome)/HomeHero.tsx`
- `app/[lang]/(chrome)/HomeDownloadSection.tsx`
- `lib/marketing/download-content.ts`
- `lib/marketing/faq-content.ts`
- `lib/marketing/home-sections.ts`
- `app/[lang]/(chrome)/(marketing)/download/page.tsx`
- `app/[lang]/(chrome)/(content)/faq/page.tsx`
- `app/[lang]/(chrome)/(legal)/support/page.tsx`
- `app/[lang]/(chrome)/(content)/faq/faq.module.scss`
- `public/llms.txt`

## Related Decisions

- [ADR 0001: Multilingual Routing Architecture](./0001-multilingual-routing-architecture.md)
- [ADR 0003: Static Site Generation Strategy](./0003-static-site-generation-strategy.md)
- [ADR 0007: Web Analytics Integration](./0007-firebase-analytics-integration.md)
