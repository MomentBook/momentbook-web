# MomentBook Web — Implementation Summary

## Overview

MomentBook 웹은 공개 소개 + 공개 여정/사진 페이지를 제공하는 Next.js App Router 프로젝트다.
다국어(i18n) 라우팅을 기본으로 하며, 정적 생성 + ISR로 SEO와 성능을 확보한다.

---

## Route Structure

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

- 다국어 라우팅: `app/[lang]/...`
- 공개 콘텐츠 페이지는 `revalidate = 3600`

---

## Content Sources

- `lib/i18n/dictionaries/` : 언어별 사전
- `lib/public-content.ts` : 공개 여정/사용자/사진 샘플 데이터

---

## SEO Infrastructure

- `app/robots.ts` / `app/sitemap.ts`
- 각 페이지별 Metadata + OpenGraph + Twitter
- `journeys/[journeyId]`는 JSON-LD 포함

---

## Styling

- SCSS modules 기반 (`*.module.scss`)
- `app/[lang]/layout.tsx`에서 헤더/푸터 공통 관리

---

## Running the Project

```bash
yarn dev
```

---

## Next Steps (Optional)

- `lib/public-content.ts` → API 연동으로 대체
- 공개 페이지에 서버 캐시/레이트리밋 추가
- 이미지 CDN/압축 설정 최적화
