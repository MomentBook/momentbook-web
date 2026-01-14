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

## Consequences

### Positive
- ✅ 법적 문서 + 다운로드 + 지원 동선이 한 화면에서 명확
- ✅ 모바일에서도 링크 그룹이 유지됨
- ✅ 브랜드 톤 유지 (과도한 마케팅 배제)

### Negative
- ⚠️ 링크 수가 많아질 수 있어 조정 필요
- ⚠️ 번역 유지 비용 증가
