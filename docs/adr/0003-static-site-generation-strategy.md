# ADR 0003: Static Site Generation Strategy

## Status
Accepted

## Date
2025-01-04 (updated: 2026-02-04)

## Context
MomentBook web은 속도/SEO/안정성을 최우선으로 한다.
- 다국어 페이지를 빠르게 제공
- 공개 여정/사용자/사진 페이지를 캐시 가능한 형태로 유지
- 서버 의존도를 최소화하되, 공개 데이터가 증가했을 때도 운영 가능해야 한다

## Decision

### 1) SSG + ISR 혼합 전략
- **마케팅/법적 페이지**: 완전 정적(SSG)
- **공개 콘텐츠 페이지**: ISR 스타일 캐시
  - 페이지/데이터 요청에 `revalidate = 3600` 또는 `fetch(..., { next: { revalidate: 3600 } })` 적용

### 2) 다국어 정적 생성
- `app/[lang]/...` 구조
- 언어별 canonical URL 고정 (SEO-friendly)

### 3) 공개 콘텐츠 데이터 소스 (Hybrid)
- **Primary (when configured)**: Public API (`NEXT_PUBLIC_API_BASE_URL`)
  - 사용자 목록/프로필, 여정 상세, 사진 상세 등은 API 호출 기반
  - 실패 시 `null` 반환 및 안전한 empty/notFound 처리
- **Fallback (dev/demo)**: `lib/public-content.ts`
  - API 미연결 환경에서 기본 화면 유지용 샘플 데이터
  - 장기적으로는 목록 페이지도 API 기반으로 통일

### 4) Sitemap은 분리된 서브-sitemap으로 운영
- `/app/sitemap.ts`는 sitemap index 역할
- URL 수 증가에 대비하여 서브 sitemap을 분리:
  - `/sitemap-static.xml`
  - `/sitemap-journeys.xml`
  - `/sitemap-photos.xml`
  - `/sitemap-users.xml`

### 5) 공개 콘텐츠의 시간 표시는 뷰어 로컬 시간대 기준
- 공개 페이지의 시간 텍스트(예: 사진의 기록 시각)는 **페이지를 보는 사용자의 브라우저 locale/timezone** 기준으로 표시한다.
- ISR/SSG 캐시 안정성을 유지하기 위해, 시간 포맷팅은 서버 고정값으로 렌더링하지 않고 클라이언트에서 처리한다.
- ISO 원본 timestamp는 API 응답 값을 그대로 사용한다(데이터 변환 없음).

## Rationale

SSG는 정적 마케팅/법적 페이지에 최적이고, ISR은 공개 콘텐츠의 신선도와 캐시 효율성을 균형 있게 유지한다. 시간 표시를 클라이언트에서 처리하면 ISR 캐시를 깨뜨리지 않으면서 사용자별 로컬 시간대를 반영할 수 있다.

## Consequences

### Positive
- ✅ 빠른 첫 로드 + SEO 최적화
- ✅ CDN/캐시 친화적 (ISR)
- ✅ 목록/상세/사이트맵이 데이터 증가에도 확장 가능
- ✅ API 장애 시에도 페이지가 크래시하지 않도록 방어 가능
- ✅ 서버 시간대(예: UTC)와 사용자 현지 시간대 불일치로 인한 혼란 감소

### Negative
- ⚠️ 공개 콘텐츠는 API/데이터 상태에 따라 표시가 달라질 수 있음
- ⚠️ Hybrid 기간에는 코드/문서가 분기되어 유지 비용이 증가

### Neutral
- 📝 공개 콘텐츠 페이지는 운영 환경에서 API Base URL 설정이 필요
- 📝 재검증 주기(3600s)는 SEO/부하/신선도 trade-off
- 📝 시간 텍스트는 클라이언트 hydration 후 로컬 기준으로 확정됨

## Implementation Notes
- ISR: `revalidate = 3600` 또는 `fetch(..., { next: { revalidate: 3600 } })`
- Public API base URL: `NEXT_PUBLIC_API_BASE_URL`
- Sitemap index: `app/sitemap.ts`
- Photo timestamp localization: `app/[lang]/(content)/photos/[photoId]/LocalizedDateTime.tsx`
- Global web typography: self-hosted `SUIT` (`public/fonts/suit/*.woff2`, loaded via `next/font/local`)

## Related Decisions
- [ADR 0001: Multilingual Routing Architecture](./0001-multilingual-routing-architecture.md)
- [ADR 0006: Segmented Sitemaps](./0006-segmented-sitemaps.md)
