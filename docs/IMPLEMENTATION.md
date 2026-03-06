# MomentBook Web — Implementation Summary

## Overview

MomentBook 웹은 공개 소개 + 공개 여정/사진 페이지를 제공하는 Next.js App Router 프로젝트다.
다국어(i18n) 라우팅을 기본으로 하며, 정적 생성 + ISR로 SEO와 성능을 확보한다.

---

## Route Structure

```
/[lang]
  /(chrome)
    /(marketing)
      /how-it-works
      /download
    /(content)
      /faq
      /journeys
      /journeys/[journeyId]
      /users/[userId]
      /photos/[photoId]
    /(legal)
      /privacy
      /terms
      /community-guidelines
      /marketing-consent
      /support
  /install
```

- 다국어 라우팅: `app/[lang]/...`
- `/{lang}`는 intro, download 섹션을 하나의 스크롤 표면으로 렌더링
- `/{lang}/how-it-works`는 `/{lang}#overview`로 영구 리다이렉트
- `/{lang}/download`는 `/{lang}#download`로 영구 리다이렉트
- `/{lang}/faq`는 독립 FAQ 페이지로 렌더링
- 여정 리스트/상세/모먼트는 `revalidate = 60`, 사용자/사진/사이트맵은 `revalidate = 3600`

---

## Content Sources

- `lib/i18n/dictionaries/` : 언어별 사전
- `lib/marketing/download-content.ts`, `lib/marketing/faq-content.ts` : 마케팅/FAQ 정적 콘텐츠
- `lib/public-api.ts`, `lib/public-users.ts`, `lib/published-journey.ts` : 공개 API 기반 데이터 로딩

---

## SEO Infrastructure

- `app/robots.ts` / `app/sitemap*.xml/route.ts`
- 각 페이지별 Metadata + OpenGraph + Twitter
- Home, FAQ, journeys/[journeyId] 등 주요 공개 페이지는 JSON-LD 포함

---

## Styling

- SCSS modules 기반 (`*.module.scss`)
- `app/[lang]/(chrome)/layout.tsx`에서 헤더/푸터 공통 관리

---

## Running the Project

```bash
yarn dev
```
