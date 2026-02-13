# ADR 0002: Legal Document Internationalization

## Status
Accepted

## Date
2025-01-04 (updated: 2026-02-12)

## Context

법적/정책 페이지는 정확성과 일관성이 우선이다.
MomentBook 웹은 아래 문서를 언어 라우트 하에 제공한다.

- Terms
- Privacy
- Community Guidelines
- Marketing Consent
- Support

요구사항:

- 다국어 라우트와 동일한 URL 체계 유지 (`/{lang}/...`)
- 원문 무결성 보장
- 검색 색인 대상에서 제외(noindex)
- 푸터를 통해 상시 접근 가능

## Decision

### 1) 페이지 단위 컴포넌트 내 언어 콘텐츠 분기

각 legal 페이지는 언어별 컴포넌트로 본문을 분기한다.

### 2) 언어 커버리지 정책

- 본문 authored locale: `en`, `ko`, `ja`, `zh`
- 기타 locale (`es`, `pt`, `fr`, `th`, `vi`)는 본문을 영어 fallback으로 노출
- 단, `generateMetadata` title/description은 locale별 문자열을 제공한다.

### 3) Indexing 정책

모든 legal/support 페이지는 `buildNoIndexRobots()`를 사용한다.

### 4) 접근성/내비게이션

푸터 legal/support 링크로 전 페이지 접근 가능하게 유지한다.

## Rationale

법적 문서는 자동 번역이나 동적 조립보다 수동 검증 가능한 정적 관리가 안전하다.
본문은 검수 완료 언어만 유지하고, 미완료 언어는 영어 fallback으로 리스크를 줄인다.

## Consequences

### Positive
- ✅ 법적 문구의 통제 가능성 확보
- ✅ 다국어 라우팅 일관성 유지
- ✅ noindex 정책으로 검색 노출 리스크 제어

### Negative
- ⚠️ 번역 업데이트 시 수동 동기화 비용 존재
- ⚠️ 일부 locale에서 본문/메타 언어 불일치 가능

### Neutral
- 📝 변경 시 버전/시행일 표기를 함께 갱신해야 함

## Alternatives Considered

### 1. External CMS legal management
Rejected: 복잡도 및 운영 비용 증가

### 2. Runtime translation
Rejected: 법적 문구 정확성/검수 통제 어려움

## Implementation Files

- `app/[lang]/(legal)/terms/page.tsx`
- `app/[lang]/(legal)/privacy/page.tsx`
- `app/[lang]/(legal)/community-guidelines/page.tsx`
- `app/[lang]/(legal)/marketing-consent/page.tsx`
- `app/[lang]/(legal)/support/page.tsx`

## Related Decisions

- [ADR 0001: Multilingual Routing Architecture](./0001-multilingual-routing-architecture.md)
- [ADR 0004: Footer Navigation Structure](./0004-footer-navigation-structure.md)
