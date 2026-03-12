# ADR 0010: Remove Web Authentication Surface

## Status
Accepted

## Date
2026-03-01 (updated: 2026-03-12)

## Context

MomentBook Web의 제품 경계는 공개 읽기 전용 웹이며, 앱 계정 기반 상호작용을 웹에서 확장하지 않는다.
기존 웹 인증/신고 플로우는 제품 경계와 운영 복잡도를 동시에 증가시켰다.

요구사항:

- 공개 웹을 읽기 전용 범위로 유지
- 웹 로그인/회원가입/비밀번호 재설정 표면 제거
- 인증 의존 컴포넌트 및 세션 동기화 로직 제거
- 라우팅/제품/ADR 문서를 코드와 동기화

## Decision

### 1) Web auth routes and UI removal

- `/{lang}/login*` 페이지 제거
- `/api/auth/*` 라우트 제거
- `next-auth` 의존 및 관련 타입/옵션 코드 제거

### 2) Client auth sync removal

- `AuthSessionProvider` 제거
- `src/apis/instance.client.ts`의 `/api/auth/session` 재시도 및 토큰 메모리 동기화 로직 제거

### 3) Report flow removal from journey detail

- 여정 상세의 신고 버튼/모달 컴포넌트 제거
- 인증 연계 `returnUrl`/intent 기반 복귀 로직 제거

### 4) Documentation synchronization

- `docs/PRODUCT.md`, `docs/adr/README.md`, `CLAUDE.md`, `AGENTS.md`를 현재 구현으로 갱신
- ADR 0009를 superseded 상태로 전환

## Rationale

웹 제품 정체성(공개 읽기 전용)과 구현 범위를 일치시키고, 인증 연동에서 발생하는 환경변수/세션/보안 운영 부담을 줄인다.

## Consequences

### Positive
- ✅ 웹 표면이 공개 읽기 전용 범위로 단순화됨
- ✅ 로그인/인증 관련 장애 지점 및 운영 변수 감소
- ✅ 라우팅/문서/ADR의 정합성 개선

### Negative
- ⚠️ 웹에서 계정 기반 행위(로그인, 신고)는 제공하지 않음
- ⚠️ 기존 로그인 URL 접근 시 404가 발생할 수 있음

### Neutral
- 📝 인증/신고는 네이티브 앱 경로에서 계속 처리 가능

## Alternatives Considered

### 1. 인증 UI만 유지하고 신고만 제거
Rejected: 웹 계정 표면이 남아 제품 경계(읽기 전용)와 불일치

### 2. 로그인 페이지를 안내용 정적 페이지로 전환
Rejected: 라우트 표면은 남지만 실질 기능이 없어 혼란 유발

## Related Decisions

- [ADR 0005: Public API Integration for Published Content](./0005-public-api-integration.md)
- [ADR 0009: Web Authentication and Reporting Flow](./0009-web-authentication-and-reporting-flow.md)
