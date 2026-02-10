# MomentBook Web — Routing Structure

현재 구현된 `/app` 라우팅 구조를 기준으로 정리한다.

## Current `/app` Directory Structure

```
app/
├── layout.tsx
├── page.tsx                 # Root redirect
├── globals.scss
├── robots.ts
├── sitemap.ts
├── [lang]/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── (marketing)/
│   │   ├── about/page.tsx
│   │   ├── how-it-works/page.tsx
│   │   └── download/page.tsx
│   ├── (content)/
│   │   ├── faq/page.tsx
│   │   ├── journeys/page.tsx
│   │   ├── journeys/[journeyId]/page.tsx
│   │   ├── users/[userId]/page.tsx
│   │   └── photos/[photoId]/page.tsx
│   └── (legal)/
│       ├── privacy/page.tsx
│       ├── terms/page.tsx
│       ├── community-guidelines/page.tsx
│       ├── marketing-consent/page.tsx
│       └── support/page.tsx
```

## Routing Principles

- 모든 페이지는 언어 프리픽스를 사용한다: `/{lang}/...`
- 공개 콘텐츠 페이지는 ISR (`revalidate = 3600`)
- 마케팅/법적 페이지는 SSG
- `sitemap.ts`에서 언어별 경로를 생성

## Content Notes

- 공개 여정/사용자/사진 데이터는 `lib/public-content.ts`에 정적 정의
- 향후 API로 대체 가능하나 URL 구조는 유지
- 마케팅/FAQ 카피는 "시간+공간 기반 여정 정리, 회상, 파일 저장/외부 공유/드라이브 보관, 기본 비공개" 메시지를 우선한다
