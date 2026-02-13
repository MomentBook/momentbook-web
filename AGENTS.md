# AGENTS.md

## 0) Purpose

이 문서는 이 저장소에서 작업하는 AI 코딩 에이전트의 **실행 규칙**이다.
목표는 코드 품질보다 먼저 **제품 정체성 보존 + 문서 정합성 유지**다.

## 1) First-Run Checklist

작업 시작 전에 아래 파일을 반드시 읽는다.

1. `CLAUDE.md`
2. `docs/PRODUCT.md`
3. `docs/adr/README.md`
4. `docs/routing/README.md`

## 2) Hard Constraints

### 2.1 Product Guardrails
- 이 웹은 네이티브 앱을 설명하는 공개 웹이다.
- 읽기 전용(public read-only) 범위를 벗어나는 기능을 제안/구현하지 않는다.
- 앱 기능을 웹에서 새로 정의하거나 UX 상태를 재해석하지 않는다.
- 과장형 카피(생산성/습관/성과/랭킹/경쟁) 금지.

### 2.2 Architecture Guardrails
- ADR과 충돌하는 변경은 금지.
- ADR에 없는 새 설계 결정이 생기면 코드보다 ADR을 먼저 업데이트한다.
- 라우팅, SEO, 데이터소스, 인증 구조 변경 시 문서 동시 수정은 필수.

### 2.3 Safety Guardrails
- 불명확한 사실을 추정으로 문서화하지 않는다.
- 코드에서 확인된 사실만 문서에 기록한다.
- "미구현"과 "계획"을 혼합해서 쓰지 않는다.

## 3) Implementation Facts You Must Respect

- i18n routing entrypoint: `proxy.ts` (not `middleware.ts`)
- Root: `/` -> client-side language redirect (`app/page.tsx`)
- Auth:
  - NextAuth route: `app/api/auth/[...nextauth]/route.ts`
  - Email auth proxy routes: `app/api/auth/email/*`
  - Login pages: `/{lang}/login`, `/login/signup`, `/login/forgot-password`
- Public content cache TTL:
  - Journey list/detail/moment: 60s
  - Users/photos: 3600s
- Sitemap:
  - Index: `/sitemap.xml`
  - Sub-sitemaps: static, journeys, journey-moments, photos, users
- `src/apis/client.ts`는 API 타입 계약 파일이며 백엔드 스키마와 일치해야 함

## 4) When You Change What

### 4.1 Code only
- 스타일/문구 경미 수정
- ADR/라우팅/제품정의에 영향 없는 변경

### 4.2 Code + PRODUCT.md
- 사용자에게 보이는 라우트/기능/동작 변경
- 메타데이터/robots/indexing 정책 변경
- 환경변수 사용 추가/삭제

### 4.3 Code + ADR (+ ADR index)
- 캐싱/데이터소스/인증/SEO 구조 의사결정 변경
- 다국어 라우팅 규칙 변경
- 사이트맵 구조 변경

### 4.4 Code + Routing README
- 신규 route 추가/제거
- redirect/rewrites 변경
- indexing 대상(route-level) 변경

## 5) Validation Protocol

변경 후 아래를 순서대로 실행한다.

1. `npx tsc --noEmit`
2. `yarn lint`

결과 보고 규칙:
- 실패 시 에러 원인과 범위를 파일 단위로 명시
- 타입 계약/환경변수 문제는 "코드 결함"과 구분해서 보고

## 6) Definition Of Done (PR/Task)

완료 보고에 반드시 포함:

- 변경 사항 요약 (<= 10 bullets)
- 수정 파일 목록
- 실행 명령 + 결과
- 수동 테스트 체크리스트
- 커밋 메시지 제안 (`type(scope): message`)

## 7) Writing Policy

- 에이전트 대화 응답은 한국어
- 코드/주석/커밋 메시지는 영어
- 문서에 날짜/버전/경로를 쓸 때는 실제 파일 기준으로 검증 후 작성

## 8) Anti-Patterns

- 존재하지 않는 파일/경로를 기준으로 문서 작성
- 구현되지 않은 future plan을 현재 상태로 서술
- SSG/ISR/SSR을 추정으로 기록
- legal 문서/support 정책을 마케팅 카피처럼 변형

## 9) Escalation Rule

요청이 아래에 해당하면 바로 사용자 확인 후 진행:

- 새 기능 추가 또는 대규모 리팩터링
- ADR 변경이 2개 이상 연쇄로 필요한 구조 개편
- 인증/보안/개인정보/법적 문구 변경

---

이 문서의 목적은 "빠른 수정"이 아니라 "정확한 유지보수"다.
불확실하면 축약하고, 추정하지 말고, 코드 기준으로 기록한다.
