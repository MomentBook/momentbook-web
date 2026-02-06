# PRODUCT.md

## MomentBook — Web Product Definition

이 프로젝트는 MomentBook 앱을 설명하고, **공개(게시)된 여정/사진/사용자**를 읽기 전용으로 보여주는 **공개 웹(SEO)** 이다.

핵심 원칙:

- 앱 경험을 **설명만** 한다 (재정의 금지)
- 과장/성과/습관/소셜 프레이밍 금지
- 정적/캐시 가능한 콘텐츠 우선
- 공개 콘텐츠는 **읽기 전용** (작성/편집/상호작용 최소화)

---

## What This Web Project Is

- 제품 소개 (About / How it works / Download)
- 다국어 지원 (en/ko/ja/zh)
- 공개 여정 상세 페이지 (journeys/[publicId])
- 공개 사용자/프로필 및 여정 리스트 (users)
- 공개 사진 상세 페이지 (photos/[photoId])
- FAQ
- 법적 문서 (Privacy / Terms / Community Guidelines / Marketing Consent / Support)

---

## What This Web Project Is Not

- 앱 기능 구현
- Recap 알고리즘/상태를 웹 UX로 재구성
- 소셜 피드/랭킹/추천
- 퍼널을 위한 추적/리타겟팅 중심 구조
- 로드맵/미래 기능 약속

---

## Route Structure (App Router)

```
/[lang]
  /(marketing)
    /about
    /how-it-works
    /download
  /(content)
    /journeys
    /journeys/[journeyId]
    /journeys/[journeyId]/moments/[clusterId]
    /users
    /users/[userId]
    /photos/[photoId]
    /faq
  /(legal)
    /privacy
    /terms
    /community-guidelines
    /marketing-consent
    /support
```

- `middleware.ts`가 언어 프리픽스가 없는 경로를 `/{lang}`로 리다이렉트한다.
- 지원 언어: `en`, `ko`, `ja`, `zh`

---

## Content Sources (Current)

이 프로젝트는 **혼합(hybrid)** 상태다.

### 1) Public API (Primary when configured)

- `NEXT_PUBLIC_API_BASE_URL`가 설정되면, 공개 사용자/여정/사진 데이터를 API로 가져온다.
- 페이지/라우트에서 `fetch(..., { next: { revalidate: 3600 } })` 형태로 캐시 가능한 ISR을 사용한다.
- API 타입은 `src/apis/client` (swagger-typescript-api 생성) 기반으로 재사용한다.

### 2) Static sample content (Fallback / demo)

- `lib/public-content.ts`에 샘플 데이터가 남아 있으며, 일부 페이지에서 사용 중일 수 있다.
- 목적: 로컬 데모, API 미연결 환경에서의 기본 화면 유지
- **장기적으로는 공개 목록(예: /journeys)도 API 기반으로 통일**하는 것을 목표로 한다.

---

## SEO & Performance

- 마케팅/법적 페이지: SSG 중심
- 공개 콘텐츠 페이지: `revalidate = 3600` 기반 캐시
- OpenGraph/Twitter 메타데이터 생성
- `journeys/[journeyId]`는 JSON-LD 포함

### Sitemap Strategy

- `app/sitemap.ts`는 **sitemap index** 역할을 하며 하위 sitemap을 가리킨다.
    - `/sitemap-static.xml`
    - `/sitemap-journeys.xml`
    - `/sitemap-photos.xml`
    - `/sitemap-users.xml`
- 각 하위 sitemap은 API 기반으로 URL을 생성하며, `hreflang` alternate를 포함한다.

---

## Tone & Copy Rules

- 차분하고 관찰적인 톤
- “설명”이 목적이며 “설득”이 아님
- 절대적 약속(영구적 광고 없음 등) 금지
- 광고/데이터 사용 표현은 **현재 기준 + 완곡한 언어** 사용

---

## Environment Variables

- `NEXT_PUBLIC_SITE_URL`
    - sitemap/metadata에서 절대 URL 생성에 사용
- `NEXT_PUBLIC_API_BASE_URL`
    - 공개 콘텐츠 API 엔드포인트 베이스 URL
