# ADR 0011: Internal admin moderation surface

## Status
Accepted

## Date
2026-04-02

## Context

MomentBook Web의 공개 표면은 여전히 앱을 설명하고 공개 콘텐츠를 읽기 전용으로 노출하는 역할에 한정된다.
하지만 앱에서 생성되는 UGC는 웹 SEO 품질에 직접 영향을 줄 수 있으므로, 새 공개 여정은 운영자 승인 전까지 웹에 노출되지 않아야 한다.

별도 백오피스 프로젝트를 만들면 운영 포인트가 늘고, 공개 웹과 심사 도구가 같은 도메인 모델을 공유하기 어려워진다.
반대로 공개 웹 라우트 안에 관리자 UX를 섞으면 ADR 0010이 의도한 public read-only boundary가 흐려진다.

## Decision

1. 관리자 심사 도구는 같은 Next.js 저장소 안에 두되, 공개 웹과 분리된 내부 표면으로 추가한다.
   - route group: `app/(admin)/admin/**`
   - public localized tree(`app/(localized)/[lang]/**`)와 chrome을 공유하지 않는다.

2. 관리자 표면은 `/admin` prefix를 사용하고 i18n redirect 대상에서 제외한다.
   - `proxy.ts`는 `/admin` 요청을 언어 prefix로 재작성하지 않는다.
   - 관리자 표면은 default language 기반 `html lang`만 사용하고, public language sync를 사용하지 않는다.

3. 관리자 표면은 색인 대상이 아니다.
   - route metadata: `noindex, nofollow`
   - `robots.txt`: `/admin` disallow
   - sitemap 미포함
   - public analytics/page animation sync 미적용

4. 관리자 인증은 공개 웹 auth 부활이 아니라 backend admin role을 사용하는 내부 로그인으로 제한한다.
   - sign-in: backend `POST /v2/auth/email/login`
   - authorization: backend access token의 `role=admin` claim으로 현재 세션을 검증한다.
   - web session: `ADMIN_SESSION_SECRET`로 암호화한 HttpOnly cookie
   - session payload는 최소한의 admin session state와 backend token pair만 저장한다.

5. 최초 관리자 기능은 공개 여정 심사 큐에만 한정한다.
   - `/admin`
   - `/admin/login`
   - `/admin/reviews`
   - 초기 단계에서는 mock queue/detail UI만 제공하고, approve / reject는 연결되지 않은 boilerplate control로 둔다.

## Rationale

같은 프로젝트 안에 내부 운영 표면을 두면 배포와 코드 공유가 단순해진다.
초기에는 mock UI로 화면 구조를 먼저 확정하고, route group, robots, metadata, auth boundary를 분리해 공개 웹의 read-only 정체성을 유지할 수 있다.

## Consequences

### Positive
- 운영 프로젝트 수를 늘리지 않고 관리자 도구를 추가할 수 있다.
- 공개 웹과 심사 도구가 같은 디자인 토큰, 타입, 도메인 모델을 공유한다.
- `/admin`이 public routing/i18n/SEO 표면과 분리되어 제품 경계가 명확하다.

### Negative
- web repo가 public-only static surface에서 internal operations surface까지 책임지게 된다.
- backend admin auth/token lifecycle과 web session 관리가 함께 맞물리므로 문서/계약 정합성이 중요해진다.
- 관리자 UI도 public site와 별도로 보안/robots 검토가 필요하다.

### Neutral
- 공개 웹은 계속 read-only이며, `/admin` 추가가 public UX 기능 확장을 의미하지는 않는다.

## Alternatives Considered

### 1. Separate admin project
Rejected: 운영 포인트와 배포 단위가 늘고, 동일한 journey/review contract를 두 프로젝트에서 중복 관리해야 한다.

### 2. Re-enable public web auth surface
Rejected: 일반 사용자용 auth/report flow를 다시 열면 ADR 0010의 public surface 단순화 결정과 충돌한다.

## Related Decisions
- [ADR 0010: Remove Web Authentication Surface](./0010-remove-web-authentication-surface.md)
- [ADR 0001: Multilingual Routing Architecture](./0001-multilingual-routing-architecture.md)
- [ADR 0005: Public API Integration for Published Content](./0005-public-api-integration.md)
