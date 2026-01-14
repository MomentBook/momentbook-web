# PRODUCT.md

## MomentBook — Product Definition (Web)

이 웹 프로젝트는 MomentBook 앱을 설명하고, 공개 여정/사진을 보여주는 **공개 웹**이다.

핵심 원칙:
- 앱 경험을 **설명만** 한다 (재정의 금지)
- 과장/성과/습관/소셜 프레이밍 금지
- 정적/캐시 가능한 콘텐츠 우선

---

## What This Web Project Is

- 제품 소개 (About / How it works / Download)
- 다국어 지원 (en/ko/ja/zh)
- 공개 여정/사용자/사진 페이지
- 법적 문서 (Privacy / Terms / Community Guidelines / Marketing Consent)

---

## What This Web Project Is Not

- 앱 기능 구현
- Recap 알고리즘/상태 설명의 UI화
- 소셜 피드/랭킹/추천
- 사용자 데이터 수집/추적을 기반으로 한 퍼널

---

## Current Content Model

현재 공개 콘텐츠는 `lib/public-content.ts`의 정적 데이터로 구성된다.

- `PublicJourney`
- `PublicUser`
- `PublicPhoto`

향후에는 API/스토리지 연동으로 대체 가능하되, URL 구조는 유지한다.

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

---

## SEO & Performance

- 다국어 정적 생성 (`generateStaticParams`)
- 공개 페이지는 1시간 단위 재검증 (`revalidate = 3600`)
- OpenGraph/Twitter 메타데이터 생성
- JSON-LD 포함 (journey detail)

---

## Tone & Copy Rules

- 차분하고 관찰적인 톤
- “설명”이 목적이며 “설득”이 아님
- 절대적 약속(영구적 광고 없음 등) 금지
- 광고/데이터 사용에 대한 표현은 **현재 기준 + 완곡한 언어** 사용
