# ADR 0003: Static Site Generation Strategy

## Status
Accepted

## Date
2025-01-04 (updated to reflect current routes)

## Context
MomentBook web은 속도/SEO/안정성을 최우선으로 한다.
- 다국어 페이지를 빠르게 제공
- 공개 여정/사용자/사진 페이지를 캐싱 가능하게 유지
- 서버 의존도를 최소화

## Decision

### 1) SSG + ISR 혼합 전략
- **마케팅/법적 페이지**: 완전 정적(SSG)
- **공개 콘텐츠 페이지**: ISR (revalidate = 3600)

### 2) 다국어 정적 생성
- `app/[lang]/...` 구조
- `generateStaticParams()`로 언어/슬러그별 페이지 생성

### 3) 공개 콘텐츠 데이터 소스
- 현재는 `lib/public-content.ts`의 정적 데이터
- 향후 API/CMS로 대체 가능 (URL 구조 유지)

## Consequences

### Positive
- ✅ 빠른 첫 로드 + SEO 최적화
- ✅ 정적 캐시 가능 (CDN 친화적)
- ✅ 인프라 단순화

### Negative
- ⚠️ 콘텐츠 업데이트는 빌드/배포 필요
- ⚠️ 데이터 소스 변경 시 마이그레이션 필요

## Implementation Notes
- 정적 생성: `generateStaticParams()`
- 공개 페이지: `revalidate = 3600`
- 메타데이터/OG/JSON-LD 포함
