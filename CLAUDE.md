# MomentBook Web — AI Collaboration Guide

## 1) Project Identity

이 저장소는 **MomentBook 공개 웹(SEO + 읽기 전용 콘텐츠)** 이다.
핵심 역할은 다음 두 가지다.

- 제품 철학과 사용 맥락을 설명한다.
- 앱에서 게시된 공개 콘텐츠(여정/순간/사진/프로필)를 웹에서 읽기 전용으로 제공한다.

이 프로젝트는 네이티브 앱의 대체 구현이 아니다.

## 2) Source Of Truth

- 제품 철학의 최종 기준은 네이티브 앱이다.
- 웹은 앱을 설명하는 계층이며, 앱 동작을 재정의하면 안 된다.
- 불확실하면 기능을 추가 설명하지 말고 축약한다.

## 3) Non-Negotiables

### 3.1 Product / Copy
- 생산성/습관/성과/경쟁 프레이밍 금지
- 소셜 피드/좋아요/랭킹 중심 설명 금지
- 과장/확정 약속 문구 금지
- 설득보다 인지(recognition) 중심 톤 유지

### 3.2 Scope
- 공개 웹은 읽기 전용이다.
- 작성/편집/복잡한 상호작용 UX를 웹에서 확장하지 않는다.
- 앱 내부 상태 기계(예: recap 내부 단계)를 웹 UX로 재구성하지 않는다.

### 3.3 Architecture Discipline
- ADR은 바인딩 규칙이다. ADR 영향이 있는 변경은 ADR 업데이트를 우선한다.
- 라우팅/SEO/데이터소스 변경 시 문서 동시 수정 필수.

## 4) Current Implementation Snapshot (Code-Verified)

- Framework: Next.js 16 App Router
- Language: TypeScript
- UI: React 18 + SCSS Modules
- State: Jotai (`theme`, `language`)
- Auth (web): NextAuth + backend token exchange + email auth proxy routes
- Analytics: GA4 (`@next/third-parties/google`) + route page_view tracking
- i18n: 9개 언어 (`en/ko/ja/zh/es/pt/fr/th/vi`)
- Routing guard: `proxy.ts` (non-prefixed path -> language-prefixed redirect)
- Sitemap: route handlers (`/sitemap.xml` + segmented sub-sitemaps)

## 5) Working Rules For AI Agents

1. 세션 시작 시 아래 문서를 우선 읽는다.
- `CLAUDE.md`
- `AGENTS.md`
- `docs/PRODUCT.md`
- `docs/adr/README.md`
- `docs/routing/README.md`

2. 구현 전 확인한다.
- 요청이 기존 ADR 범위인지
- 제품 철학 위반 가능성이 있는지
- 라우팅/metadata/robots 영향이 있는지

3. 변경 후 반드시 실행한다.
- `npx tsc --noEmit`
- `yarn lint`

4. 작업 완료 보고에는 아래를 포함한다.
- 변경 사항 (10개 이하 bullet)
- 수정 파일 목록
- 실행한 명령 + 결과
- 수동 테스트 체크리스트
- 커밋 메시지 제안 (`type(scope): message`)

## 6) Known Caveat (Important)

현재 코드베이스는 `src/apis/client.ts` 타입 계약에 의존한다.
파일은 저장소에 포함되어 있지만, 백엔드 스키마와 불일치하면 런타임/타입 편차가 생길 수 있다.

- 생성 명령: `yarn generate:api`
- 전제: 백엔드 Swagger endpoint 접근 가능

따라서 `tsc` 실패 시, 우선 **타입 계약 불일치 여부**를 확인하고 결과를 명시해야 한다.

## 7) Language Policy

- 에이전트 응답: 한국어
- 코드/주석/커밋 메시지: 영어

## 8) Final Principle

MomentBook 웹은 사용자를 설득하는 페이지가 아니라,
사용자가 스스로 "이게 내 방식"인지 판단하도록 돕는 조용한 인터페이스다.

If it feels like marketing pressure, rewrite it.
