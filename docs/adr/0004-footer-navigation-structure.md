# ADR 0004: Footer Navigation Structure

## Status
Accepted

## Date
2025-01-04 (updated to reflect current layout)

## Context
Footer는 모든 페이지에 노출되며 다음을 동시에 만족해야 한다:
- 법적 문서 접근성
- 다운로드/지원 등 핵심 행동 유도
- 브랜드 요약 제공
- 모바일에서도 유지되는 가독성

## Decision

### 1) Footer 구조
- **브랜드 블록**: 로고 + 요약 문장 + CTA(다운로드/지원)
- **그리드 컬럼**: Product / Download / Support / Legal

```text
[Brand summary + CTA]  [Product] [Download] [Support] [Legal]
```

### 2) 링크 구성
- Product: About / How it works / FAQ
- Download: Download / App Store / Google Play
- Support: Support / support email
- Legal: Privacy / Terms / Community Guidelines / Marketing Consent

### 3) Dictionary 구조
```ts
footer: {
  sections: {
    product: string;
    download: string;
    support: string;
    legal: string;
  };
  links: {
    privacy: string;
    terms: string;
    communityGuidelines: string;
    marketingConsent: string;
    support: string;
  };
  summary: string;
  ctaPrimary: string;
  ctaSecondary: string;
  email: string;
}
```

## Rationale

Footer는 모든 페이지 하단에 노출되어 법적 문서 접근성과 다운로드 동선을 동시에 제공할 수 있는 유일한 영역이다. 멀티-컬럼 구조는 링크를 논리적으로 그룹화하여 모바일에서도 스캔하기 쉽고, 브랜드 톤을 유지하면서 필수 링크를 빠짐없이 제공한다.

## Consequences

### Positive
- ✅ 법적 문서 + 다운로드 + 지원 동선이 한 화면에서 명확
- ✅ 모바일에서도 링크 그룹이 유지됨
- ✅ 브랜드 톤 유지 (과도한 마케팅 배제)

### Negative
- ⚠️ 링크 수가 많아질 수 있어 조정 필요
- ⚠️ 번역 유지 비용 증가

## Alternatives Considered

### 1. 단일 행 Footer (링크만 나열)
**Rejected**: 법적 문서와 다운로드/지원 링크의 구분이 불명확하고 모바일에서 가독성 저하.

### 2. Accordion / Collapsible Footer (모바일)
**Rejected**: 추가 인터랙션이 필요하여 법적 문서 접근성이 떨어지고, 정적 사이트 철학과 맞지 않음.

## Implementation Files
- `/app/[lang]/layout.tsx` — Footer가 레이아웃에 인라인으로 구현됨
- `/lib/i18n/dictionaries/` — Footer 번역 키 포함

## Related Decisions
- [ADR 0001: Multilingual Routing Architecture](./0001-multilingual-routing-architecture.md)
- [ADR 0002: Legal Document Internationalization](./0002-legal-document-internationalization.md)
