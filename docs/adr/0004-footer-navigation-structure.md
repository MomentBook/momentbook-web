# ADR 0004: Footer Navigation Structure

## Status
Accepted

## Date
2025-01-04 (updated: 2026-03-12)

## Context

Footer는 모든 페이지 하단의 공통 탐색 영역이다.
필수 요구:

- 브랜드 정체성 요약
- 다운로드/지원 CTA 노출
- 법적 문서 접근성 확보
- 모바일/데스크톱 모두에서 읽기 쉬운 그룹 구조

## Decision

### 1) Footer 레이아웃

상단 lead block + 하단 link grid 구조:

- Lead block: 로고 + 요약 + CTA 버튼 2개(`Download`, `Support`) + 소셜 채널 아이콘
- Link grid: Product / Support / Legal

### 2) 링크 구성 (Current)

- Product: `journeys`, `faq`
- Support: `support`, support email
- Legal: `privacy`, `terms`, `community-guidelines`, `marketing-consent`

다운로드는 별도 컬럼이 아니라 lead block의 primary CTA로 제공한다.

### 3) 다국어 번역 키 관리

footer 텍스트는 dictionary(`lib/i18n/dictionaries/*`)를 통해 locale별 렌더링한다.

## Rationale

푸터를 정보 그룹 단위로 분리하면 법적 링크 접근성과 전환 링크(다운로드/지원)를 동시에 확보할 수 있다.

## Consequences

### Positive
- ✅ 공통 링크 접근성 향상
- ✅ 법적 링크 누락 방지
- ✅ 모바일에서도 그룹 단위 스캔 가능

### Negative
- ⚠️ locale 증가에 따라 번역 키 유지 비용 증가

### Neutral
- 📝 푸터 링크 변경은 sitemap/static page 노출 정책과 함께 검토해야 함

## Alternatives Considered

### 1. 단일 라인 링크 나열
Rejected: 가독성/정보구조 모두 불리

### 2. 모바일 accordion footer
Rejected: 법적 링크 접근 단계 증가

## Implementation Files

- `app/[lang]/(chrome)/layout.tsx`
- `app/[lang]/(chrome)/layout.module.scss`
- `lib/i18n/dictionaries/*`

## Related Decisions

- [ADR 0001: Multilingual Routing Architecture](./0001-multilingual-routing-architecture.md)
- [ADR 0002: Legal Document Internationalization](./0002-legal-document-internationalization.md)
