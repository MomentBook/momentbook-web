# ADR 0009: Web Authentication and Reporting Flow

## Status
Superseded by ADR 0010

## Date
2026-02-12 (superseded: 2026-03-01)

## Context

웹 공개 페이지에 신고 기능이 추가되면서, 앱과 동일한 계정 체계를 웹에서도 안전하게 연결해야 했다.

요구사항:

- OAuth(google/apple) + email/password 로그인 지원
- 백엔드 access/refresh 토큰 체계와 정합
- 미인증 사용자의 신고 시 login 후 복귀(returnUrl) 지원
- 브라우저 단 토큰 보안/재발급 처리

## Decision

### 1) 인증 프레임워크

- NextAuth를 웹 세션 레이어로 사용 (`JWT strategy`)
- provider 구성:
  - Credentials (email/password)
  - Google (env configured)
  - Apple (env configured)

### 2) 백엔드 토큰 교환

NextAuth callback에서 backend auth endpoint와 토큰을 교환/갱신한다.

- login exchange
- refresh exchange
- logout exchange

세션에는 최소 정보만 노출한다.

- `accessToken`
- `authError`
- `consents`
- `user.id`

### 3) Email auth proxy routes

브라우저 -> Next route -> backend로 프록시하는 이메일 인증 라우트를 둔다.

- send-verification
- verify-code
- signup
- request-password-reset
- reset-password

### 4) API client token sync

- `AuthSessionProvider`가 NextAuth 세션의 access token을 client token store에 동기화
- API 호출 401 시 `/api/auth/session` 조회 후 1회 재시도

### 5) 신고 플로우

- 여정 상세의 신고 버튼은 인증 상태 확인 후 동작
- 미인증/게스트 사용자는 `returnUrl`에 report intent를 담아 로그인 페이지로 이동
- 로그인 성공 후 원래 페이지 복귀 및 신고 모달 복원
- 본인 게시물 신고 방지 로직 적용

## Rationale

NextAuth를 세션 허브로 사용하면 OAuth/provider 처리와 콜백 제어를 단순화할 수 있고,
백엔드 토큰 체계를 유지하면서 웹 UI 보안 경계를 분리할 수 있다.

## Consequences

### Positive
- ✅ 웹 인증과 백엔드 권한 모델 정합성 확보
- ✅ 신고 시 인증 강제 및 복귀 UX 제공
- ✅ access token 재발급 흐름의 중앙화

### Negative
- ⚠️ env 설정 누락 시 provider별 동작 편차 발생
- ⚠️ API 타입 계약(`src/apis/client.ts`)이 백엔드와 어긋나면 신고/프로필 API 오류 가능

### Neutral
- 📝 이메일 인증 프록시는 백엔드 API 가용성에 의존

## Alternatives Considered

### 1. 순수 클라이언트 토큰 인증
Rejected: OAuth callback 처리/보안 제어가 불안정

### 2. 웹 전용 auth 백엔드 별도 구축
Rejected: 운영 복잡도 증가, 기존 API 중복

## Implementation Files

- `lib/auth/options.ts`
- `lib/auth/backend.ts`
- `types/next-auth.d.ts`
- `app/api/auth/[...nextauth]/route.ts`
- `app/api/auth/email/*/route.ts`
- `app/components/AuthSessionProvider.tsx`
- `src/apis/instance.client.ts`
- `app/[lang]/(content)/login/*`
- `app/[lang]/(content)/journeys/components/ReportJourneyButton.tsx`

## Related Decisions

- [ADR 0005: Public API Integration for Published Content](./0005-public-api-integration.md)
- [ADR 0007: Web Analytics Integration](./0007-firebase-analytics-integration.md)
