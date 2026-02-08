# PRODUCT.md

## MomentBook — Web Product Definition

이 프로젝트는 MomentBook 앱을 설명하고, **공개(게시)된 여정/사진/사용자**를 읽기 전용으로 보여주는 **공개 웹(SEO)** 이다.

핵심 원칙:

- 앱 경험을 **설명만** 한다 (재정의 금지)
- 과장/성과/습관/소셜 프레이밍 금지
- 정적/캐시 가능한 콘텐츠 우선
- 공개 콘텐츠는 **읽기 전용** (작성/편집/상호작용 최소화)

---

## Vision

사용자가 MomentBook을 검색으로 발견하고, 앱이 자신에게 맞는지 조용히 판단할 수 있도록 돕는다.
공개된 여정/사진/프로필을 통해 앱의 경험을 간접적으로 보여준다.

## Problem Statement

- 네이티브 앱만으로는 검색 엔진을 통한 자연 유입이 불가능하다.
- 공개 콘텐츠(여정, 사진, 사용자 프로필)를 웹에서 읽기 전용으로 제공해야 SEO와 공유가 가능해진다.
- 제품 설명이 과장되거나 설득적이면 MomentBook의 철학과 어긋난다.

## Target Users

- MomentBook을 검색으로 처음 접하는 잠재 사용자
- 공유된 여정/사진 링크를 통해 방문하는 외부 방문자
- 앱 설치 전 제품 철학과 기능을 확인하려는 사용자

---

## Core Features (What This Web Project Is)

- 제품 소개 (About / Download)
- 다국어 지원 (en/ko/ja/zh/es/pt/fr/th/vi — 9개 언어)
- 공개 여정 상세 페이지 (journeys/[journeyId])
- 공개 여정 모먼트 상세 (journeys/[journeyId]/moments/[clusterId])
- 공개 사용자/프로필 및 여정 리스트 (users)
- 공개 사진 상세 페이지 (photos/[photoId])
- FAQ
- 법적 문서 (Privacy / Terms / Community Guidelines / Marketing Consent / Support)

---

## Out of Scope (What This Web Project Is Not)

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
- 지원 언어: `en`, `ko`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi` (9개)

---

## Domain Model

```
User (public profile)
 └── Journey (published)
       ├── Moment (cluster of photos at a location)
       │     └── Photo
       └── Map (Leaflet — journey route visualization)

Photo (standalone public photo page)
```

주요 엔티티:
- **User**: 공개 프로필 + 공개 여정 목록
- **Journey**: 공개 여정 상세 (제목, 설명, 기간, 사진들, 지도)
- **Moment**: 여정 내 특정 위치/시간대의 사진 클러스터
- **Photo**: 개별 공개 사진 (메타데이터 포함)

---

## Content Sources (Current State)

이 프로젝트는 **혼합(hybrid)** 상태다.

### 1) Public API (Primary when configured)

- `NEXT_PUBLIC_API_BASE_URL`가 설정되면, 공개 사용자/여정/사진 데이터를 API로 가져온다.
- 페이지/라우트에서 `fetch(..., { next: { revalidate: 3600 } })` 형태로 캐시 가능한 ISR을 사용한다.
- API 타입은 `src/apis/client.ts` (swagger-typescript-api 생성) 기반으로 재사용한다.
- 데이터 fetch 실패 시 `null` 반환 → 상세 페이지는 `notFound()`, 목록은 빈 상태 처리.

### 2) Static sample content (Fallback / demo)

- `lib/public-content.ts`에 샘플 데이터가 남아 있으며, 일부 페이지에서 사용 중일 수 있다.
- 목적: 로컬 데모, API 미연결 환경에서의 기본 화면 유지
- **장기적으로는 공개 목록(예: /journeys)도 API 기반으로 통일**하는 것을 목표로 한다.

---

## Technical Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 18 |
| Language | TypeScript |
| Styling | SCSS Modules |
| Package Manager | Yarn Berry (v3, `yarn@3.6.4`) |
| State Management | Jotai |
| Analytics | Firebase (client-side, lazy-loaded) |
| Maps | Leaflet + react-leaflet |
| HTTP Client | Axios |
| Font | SUIT (self-hosted via `next/font/local`, `public/fonts/suit/`) |

### i18n Routing

- 모든 사용자 페이지는 `app/[lang]/...` 하위에 위치
- Middleware가 비-프리픽스 경로를 언어 프리픽스로 리다이렉트
  - Cookie `preferredLanguage` 우선
  - Fallback: `Accept-Language` 헤더
- 지원 언어: `en`, `ko`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi`
- 법적 문서: `en`, `ko`, `ja`, `zh` 4개 언어 원문 제공, 나머지는 영어 fallback

### Content Source Files

- `/lib/public-users.ts` — 공개 사용자/프로필/여정 fetch 헬퍼
- `/lib/published-journey.ts` — 공개 여정/사진 fetch 헬퍼
- `/lib/public-content.ts` — 샘플 데이터 (fallback)
- `/src/apis/client.ts` — 생성된 API DTO 타입

---

## SEO & Performance

- 마케팅/법적 페이지: SSG 중심
- 공개 콘텐츠 페이지: `revalidate = 3600` 기반 캐시
- OpenGraph/Twitter 메타데이터 생성
- `journeys/[journeyId]`는 JSON-LD 포함
- 공개 콘텐츠의 시간 표시는 클라이언트 hydration 후 뷰어 로컬 시간대 기준

### Sitemap Strategy

- `app/sitemap.ts`는 **sitemap index** 역할을 하며 하위 sitemap을 가리킨다.
    - `/sitemap-static.xml`
    - `/sitemap-journeys.xml`
    - `/sitemap-journey-moments.xml`
    - `/sitemap-photos.xml`
    - `/sitemap-users.xml`
- 각 하위 sitemap은 API 기반으로 URL을 생성하며, `hreflang` alternate를 포함한다.
- 캐시 헤더: `Cache-Control: public, max-age=3600, s-maxage=3600`

---

## Tone & Copy Rules

- 차분하고 관찰적인 톤
- "설명"이 목적이며 "설득"이 아님
- 절대적 약속(영구적 광고 없음 등) 금지
- 광고/데이터 사용 표현은 **현재 기준 + 완곡한 언어** 사용

---

## Environment Variables

| Variable | Description |
|----------|------------|
| `NEXT_PUBLIC_SITE_URL` | sitemap/metadata에서 절대 URL 생성에 사용 |
| `NEXT_PUBLIC_API_BASE_URL` | 공개 콘텐츠 API 엔드포인트 베이스 URL |
| `NEXT_PUBLIC_APP_ENV` | 앱 환경 구분 (production/development) |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | 지원 이메일 주소 |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase 설정 (API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID) |
