/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface HealthzResponseDto {
  /** @example "success" */
  status: string;
  /**
   * 프로세스 레벨 헬스체크(서버 살아있음)
   * @example {"ok":true,"ts":1700000000000}
   */
  data: object;
}

export interface ReadyzResponseDto {
  /** @example "success" */
  status: string;
  /**
   * 서비스 준비 상태(DB 포함)
   * @example {"mongo":"up","ts":1700000000000}
   */
  data: object;
}

export interface ReadyzUnavailableResponseDto {
  /** @example "fail" */
  status: string;
  /**
   * 준비되지 않은 이유 메시지
   * @example "Service not ready (mongo down)"
   */
  message: string;
  /** @example {"mongo":"down","ts":1700000000000} */
  data?: object;
}

export interface GoogleTokenAuthDto {
  /**
   * Google Access Token
   * @example "ya29.a0AfH6SMBx..."
   */
  accessToken?: string;
  /**
   * Google ID Token (iOS/Web에서 사용)
   * @example "eyJhbGciOiJSUzI1NiIs..."
   */
  idToken?: string;
}

export interface GoogleUserResponseDto {
  /**
   * 사용자 고유 ID
   * @example "60f1b2b3c8e8a40015f4c8d1"
   */
  _id: string;
  /**
   * 사용자 이름
   * @example "홍길동"
   */
  name: string;
  /**
   * 사용자 이메일
   * @example "user@gmail.com"
   */
  email: string;
  /**
   * 프로필 사진 URL
   * @example "https://lh3.googleusercontent.com/a/ACg8ocIfvPgD_eecUmPaS9M4-w-2Kt7praV3OYyAMkASOUci0RQOIV8=s96-c"
   */
  picture?: object | null;
  /**
   * 게스트 여부
   * @example false
   */
  isGuest: boolean;
}

export interface ConsentStatusDto {
  /**
   * 모든 필수 동의를 완료했는지 여부
   * @example false
   */
  isAllRequiredConsented: boolean;
  /**
   * 누락된 필수 동의 항목 키 목록
   * @example ["terms_of_service","privacy_policy"]
   */
  missingRequiredConsents: string[];
  /**
   * 사용자 액션(동의 제공)이 필요한지 여부
   * @example true
   */
  requiresAction?: boolean;
}

export interface GoogleLoginResponseDataDto {
  user: GoogleUserResponseDto;
  /**
   * 인증 제공자 타입
   * @example "google"
   */
  provider: "google" | "apple" | "email" | "anonymous";
  /**
   * JWT 액세스 토큰 (하위 호환성)
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.accessToken"
   */
  token: string;
  /**
   * JWT 액세스 토큰 (짧은 만료시간, 2시간)
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.accessToken"
   */
  accessToken: string;
  /**
   * JWT 리프레시 토큰 (긴 만료시간, 30일)
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refreshToken"
   */
  refreshToken: string;
  /**
   * 액세스 토큰 만료시간 (초)
   * @example 7200
   */
  expiresIn: number;
  /** 필수 동의 상태 정보 */
  consents: ConsentStatusDto;
}

export interface GoogleLoginSuccessResponseDto {
  /** @example "success" */
  status: string;
  /** @example "Google 로그인이 성공적으로 완료되었습니다." */
  message: string;
  data: GoogleLoginResponseDataDto;
}

export interface AppleFullName {
  /** 이름 */
  givenName?: string;
  /** 성 */
  familyName?: string;
}

export interface AppleAuthDto {
  /**
   * Apple Identity Token (iOS)
   * @example "eyJraWQiOiJXNldjT0tCIiwiYWxn..."
   */
  identityToken?: string;
  /**
   * Apple Authorization Code (iOS)
   * @example "c1234567890abcdefghijk..."
   */
  authorizationCode?: string;
  /**
   * Apple User Identifier (iOS)
   * @example "000123.abc456def789ghi..."
   */
  user?: string;
  /** 사용자 이름 (iOS, 최초 로그인 시에만 제공) */
  fullName?: AppleFullName;
  /**
   * 이메일 (iOS, 최초 로그인 시에만 제공)
   * @example "user@privaterelay.appleid.com"
   */
  email?: string;
  /**
   * Apple ID Token (Android/Web)
   * @example "eyJraWQiOiJXNldjT0tCIiwiYWxn..."
   */
  id_token?: string;
  /**
   * Apple Authorization Code (Android/Web)
   * @example "c1234567890abcdefghijk..."
   */
  code?: string;
  /** Nonce for security (Android/Web) */
  nonce?: string;
  /** State parameter (Android/Web) */
  state?: string;
  /**
   * 클라이언트 플랫폼 (ios/android/web)
   * @example "web"
   */
  platform?: "ios" | "android" | "web";
}

export interface AppleUserResponseDto {
  /**
   * 사용자 고유 ID
   * @example "680657032be53a7892fe5aff"
   */
  _id: string;
  /**
   * 사용자 이름
   * @example "홍길동"
   */
  name: string;
  /**
   * 사용자 이메일
   * @example "user@example.com"
   */
  email?: object | null;
  /**
   * 프로필 사진 URL (Apple은 항상 null)
   * @example null
   */
  picture?: object | null;
  /**
   * 게스트 사용자 여부
   * @example false
   */
  isGuest: boolean;
}

export interface AppleLoginResponseDataDto {
  user: AppleUserResponseDto;
  /**
   * 인증 제공자 타입
   * @example "apple"
   */
  provider: "google" | "apple" | "email" | "anonymous";
  /**
   * JWT 액세스 토큰 (하위 호환성)
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.accessToken"
   */
  token: string;
  /**
   * JWT 액세스 토큰 (짧은 만료시간, 2시간)
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.accessToken"
   */
  accessToken: string;
  /**
   * JWT 리프레시 토큰 (긴 만료시간, 30일)
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refreshToken"
   */
  refreshToken: string;
  /**
   * 액세스 토큰 만료시간 (초)
   * @example 7200
   */
  expiresIn: number;
  /**
   * 로그인한 플랫폼 정보
   * @example "ios"
   */
  platform: "ios" | "android";
  /** 필수 동의 상태 정보 */
  consents: ConsentStatusDto;
}

export interface AppleLoginSuccessResponseDto {
  /** @example "success" */
  status: string;
  /** @example "Apple 로그인이 성공적으로 완료되었습니다." */
  message: string;
  data: AppleLoginResponseDataDto;
}

export interface GuestAuthDto {
  /**
   * 디바이스 고유 식별자 (UUID)
   * @example "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
   */
  deviceId: string;
}

export interface GuestUserResponseDto {
  /**
   * 사용자 ID (게스트 ID와 동일)
   * @example "836273c6-1311-40c2-a7e8-30400124f43c"
   */
  userId: string;
  /**
   * 게스트 고유 식별자
   * @example "836273c6-1311-40c2-a7e8-30400124f43c"
   */
  guestId: string;
  /**
   * 디바이스 고유 식별자
   * @example "test-device-12345"
   */
  deviceId: string;
  /**
   * 사용자 이름
   * @example "게스트"
   */
  name: string;
  /**
   * 이메일
   * @example null
   */
  email?: object | null;
  /**
   * 프로필 사진
   * @example null
   */
  picture?: object | null;
  /**
   * 게스트 여부
   * @example true
   */
  isGuest: boolean;
}

export interface GuestLoginResponseDataDto {
  user: GuestUserResponseDto;
  /**
   * 인증 제공자 타입
   * @example "anonymous"
   */
  provider: "google" | "apple" | "email" | "anonymous";
  /**
   * JWT 액세스 토큰 (하위 호환성)
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.accessToken"
   */
  token: string;
  /**
   * JWT 액세스 토큰 (짧은 만료시간, 2시간)
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.accessToken"
   */
  accessToken: string;
  /**
   * JWT 리프레시 토큰 (긴 만료시간, 30일)
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refreshToken"
   */
  refreshToken: string;
  /**
   * 액세스 토큰 만료시간 (초)
   * @example 7200
   */
  expiresIn: number;
  /** 필수 동의 상태 정보 (게스트는 항상 모든 동의 완료 상태) */
  consents: ConsentStatusDto;
}

export interface GuestLoginSuccessResponseDto {
  /** @example "success" */
  status: string;
  data: GuestLoginResponseDataDto;
}

export interface RefreshTokenDto {
  /**
   * Refresh Token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  refreshToken: string;
}

export interface TokenRefreshResponseDataDto {
  /**
   * 새로 발급된 AccessToken (하위 호환성)
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.newAccessToken"
   */
  token: string;
  /**
   * 새로 발급된 AccessToken
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.newAccessToken"
   */
  accessToken: string;
  /**
   * 새로 발급된 RefreshToken
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.newRefreshToken"
   */
  refreshToken: string;
  /**
   * AccessToken 만료시간 (초)
   * @example 7200
   */
  expiresIn: number;
}

export interface TokenRefreshResponseDto {
  /** @example "success" */
  status: string;
  data: TokenRefreshResponseDataDto;
  /** @example "토큰이 성공적으로 갱신되었습니다." */
  message: string;
}

export interface LogoutDto {
  /**
   * Refresh Token to invalidate
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  refreshToken: string;
}

export interface LogoutResponseDataDto {
  /** @example "로그아웃되었습니다." */
  message: string;
}

export interface LogoutResponseDto {
  /** @example "success" */
  status: string;
  data: LogoutResponseDataDto;
  /** @example "로그아웃이 성공적으로 완료되었습니다." */
  message: string;
}

export interface LogoutAllResponseDataDto {
  /** @example "모든 디바이스에서 로그아웃되었습니다." */
  message: string;
  /**
   * 무효화된 토큰 수
   * @example 3
   */
  invalidatedTokens: number;
}

export interface LogoutAllResponseDto {
  /** @example "success" */
  status: string;
  data: LogoutAllResponseDataDto;
  /** @example "3개의 디바이스에서 로그아웃이 완료되었습니다." */
  message: string;
}

export interface SendVerificationCodeDto {
  /**
   * Email address
   * @example "user@example.com"
   */
  email: string;
}

export interface SendVerificationCodeResponseDto {
  /** @example "success" */
  status: string;
  /** @example "인증 코드가 이메일로 발송되었습니다." */
  message: string;
}

export interface VerifyEmailCodeDto {
  /**
   * Email address
   * @example "user@example.com"
   */
  email: string;
  /**
   * 6-digit verification code
   * @example "123456"
   */
  code: string;
}

export interface VerifyEmailCodeResponseDataDto {
  /**
   * 인증 완료 후 발급되는 토큰
   * @example "verification-token-here"
   */
  verificationToken: string;
}

export interface VerifyEmailCodeResponseDto {
  /** @example "success" */
  status: string;
  /** @example "이메일이 인증되었습니다." */
  message: string;
  data: VerifyEmailCodeResponseDataDto;
}

export interface EmailSignupDto {
  /**
   * Email address
   * @example "user@example.com"
   */
  email: string;
  /**
   * Password (8-20 characters)
   * @example "password123"
   */
  password: string;
  /**
   * User name
   * @example "John Doe"
   */
  name: string;
  /**
   * Verification token from email verification
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  verificationToken: string;
}

export interface EmailUserResponseDto {
  /**
   * 사용자 고유 ID
   * @example "60f1b2b3c8e8a40015f4c8d1"
   */
  userId: string;
  /**
   * 사용자 이름
   * @example "홍길동"
   */
  name: string;
  /**
   * 사용자 이메일
   * @example "user@example.com"
   */
  email: string;
  /**
   * 게스트 여부
   * @example false
   */
  isGuest: boolean;
}

export interface EmailSignupResponseDataDto {
  user: EmailUserResponseDto;
  /**
   * 인증 제공자 타입
   * @example "email"
   */
  provider: "google" | "apple" | "email" | "anonymous";
  /**
   * JWT 액세스 토큰 (하위 호환성)
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.accessToken"
   */
  token: string;
  /**
   * JWT 액세스 토큰
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.accessToken"
   */
  accessToken: string;
  /**
   * JWT 리프레시 토큰
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refreshToken"
   */
  refreshToken: string;
  /** 필수 동의 상태 정보 */
  consents: ConsentStatusDto;
}

export interface EmailSignupResponseDto {
  /** @example "success" */
  status: string;
  /** @example "회원가입이 완료되었습니다." */
  message: string;
  data: EmailSignupResponseDataDto;
}

export interface EmailLoginDto {
  /**
   * Email address
   * @example "user@example.com"
   */
  email: string;
  /**
   * Password
   * @example "password123"
   */
  password: string;
}

export interface EmailLoginResponseDataDto {
  user: EmailUserResponseDto;
  /**
   * 인증 제공자 타입
   * @example "email"
   */
  provider: "google" | "apple" | "email" | "anonymous";
  /**
   * JWT 액세스 토큰 (하위 호환성)
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.accessToken"
   */
  token: string;
  /**
   * JWT 액세스 토큰
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.accessToken"
   */
  accessToken: string;
  /**
   * JWT 리프레시 토큰
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refreshToken"
   */
  refreshToken: string;
  /** 필수 동의 상태 정보 */
  consents: ConsentStatusDto;
}

export interface EmailLoginResponseDto {
  /** @example "success" */
  status: string;
  /** @example "로그인이 완료되었습니다." */
  message: string;
  data: EmailLoginResponseDataDto;
}

export interface ChangePasswordDto {
  /**
   * Current password
   * @example "oldpassword123"
   */
  currentPassword: string;
  /**
   * New password (8-20 characters)
   * @example "newpassword123"
   */
  newPassword: string;
}

export interface PasswordChangeResponseDto {
  /** @example "success" */
  status: string;
  /** @example "비밀번호가 변경되었습니다." */
  message: string;
}

export interface RequestPasswordResetDto {
  /**
   * Email address
   * @example "user@example.com"
   */
  email: string;
}

export interface PasswordResetRequestResponseDto {
  /** @example "success" */
  status: string;
  /** @example "비밀번호 재설정 코드가 이메일로 발송되었습니다." */
  message: string;
}

export interface ResetPasswordDto {
  /**
   * Email address
   * @example "user@example.com"
   */
  email: string;
  /**
   * 6-digit verification code
   * @example "123456"
   */
  code: string;
  /**
   * New password (8-20 characters)
   * @example "newpassword123"
   */
  newPassword: string;
}

export interface PasswordResetResponseDto {
  /** @example "success" */
  status: string;
  /** @example "비밀번호가 재설정되었습니다." */
  message: string;
}

export interface EmailCheckResponseDataDto {
  /**
   * 이메일 존재 여부
   * @example false
   */
  exists: boolean;
}

export interface EmailCheckResponseDto {
  /** @example "success" */
  status: string;
  data: EmailCheckResponseDataDto;
}

export interface UserProfileDataDto {
  /**
   * 사용자 ID
   * @example "507f1f77bcf86cd799439011"
   */
  _id: string;
  /**
   * OAuth Provider ID
   * @example "107848228778116215867"
   */
  providerId: string;
  /**
   * 인증 제공자
   * @example "google"
   */
  provider: "google" | "apple" | "email" | "anonymous" | null;
  /**
   * 사용자 이름
   * @example "홍길동"
   */
  name: string | null;
  /**
   * 사용자 이메일
   * @example "user@example.com"
   */
  email: object | null;
  /**
   * 사용자 자기소개
   * @example "안녕하세요"
   */
  biography: object | null;
  /**
   * 프로필 사진 URL
   * @example "https://example.com/profile.jpg"
   */
  picture: object | null;
  /**
   * 게스트 사용자 여부
   * @example false
   */
  isGuest: boolean;
  /**
   * 디바이스 고유 식별자 (게스트 사용자인 경우에만)
   * @example "test-device-123"
   */
  deviceId: string | null;
  /**
   * 사용자 상태
   * @example "active"
   */
  status: "active" | "inactive" | "deleted";
  /**
   * 생성일시
   * @example "2024-01-01T00:00:00.000Z"
   */
  createdAt: string;
  /**
   * 수정일시
   * @example "2024-01-01T00:00:00.000Z"
   */
  updatedAt: string;
  /**
   * MongoDB 버전
   * @example 0
   */
  __v: number;
}

export interface ConsentStatusDataDto {
  /**
   * 모든 필수 동의 완료 여부
   * @example true
   */
  isAllRequiredConsented: boolean;
  /**
   * 미완료 필수 동의 항목 키 배열
   * @example []
   */
  missingRequiredConsents: string[];
  /**
   * 동의 화면 이동 필요 여부 (UI 편의 플래그)
   * @example false
   */
  requiresAction: boolean;
}

export interface UserProfileSuccessResponseDto {
  /**
   * 응답 상태
   * @example "success"
   */
  status: string;
  /**
   * 응답 메시지
   * @example "User profile retrieved successfully"
   */
  message: string;
  /** 사용자 프로필 데이터 */
  data: UserProfileDataDto;
  /** 동의 상태 정보 */
  consents: ConsentStatusDataDto;
}

export interface PictureUpdateDto {
  /**
   * 이미지 업데이트 액션
   * @example "upload"
   */
  action: "upload" | "remove" | "set_url";
  /**
   * 이미지 데이터. action이 "upload"이면 Base64 인코딩된 이미지, "set_url"이면 URL, "remove"이면 불필요
   * @example "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
   */
  value?: string;
}

export interface UpdateUserProfileDto {
  /**
   * 사용자 이름
   * @example "홍길동"
   */
  name?: string;
  /**
   * 사용자 이메일
   * @example "user@example.com"
   */
  email?: string;
  /**
   * 사용자 자기소개
   * @example "안녕하세요"
   */
  biography?: string;
  /** 프로필 이미지 업데이트. 필드를 생략하면 기존 이미지가 유지됩니다. */
  picture?: PictureUpdateDto;
}

export interface UserProfileUpdateSuccessResponseDto {
  /**
   * 응답 상태
   * @example "success"
   */
  status: string;
  /**
   * 응답 메시지
   * @example "User profile updated successfully"
   */
  message: string;
  /** 업데이트된 사용자 프로필 데이터 */
  data: UserProfileDataDto;
}

export interface UsersGetResponseDataDto {
  /** 사용자 목록 */
  users: UserProfileDataDto[];
}

export interface PaginationDataDto {
  /**
   * 전체 항목 수
   * @example 100
   */
  total: number;
  /**
   * 현재 페이지
   * @example 1
   */
  page: number;
  /**
   * 전체 페이지 수
   * @example 10
   */
  pages: number;
  /**
   * 페이지당 항목 수
   * @example 10
   */
  limit: number;
}

export interface UsersListSuccessResponseDto {
  /**
   * 응답 상태
   * @example "success"
   */
  status: string;
  /**
   * 응답 메시지
   * @example "Users retrieved successfully"
   */
  message: string;
  /** 사용자 목록 데이터 */
  data: UsersGetResponseDataDto;
  /** 페이지네이션 정보 */
  paginationData: PaginationDataDto;
}

export interface BasicSuccessResponseDto {
  /**
   * 응답 상태
   * @example "success"
   */
  status: string;
  /**
   * 응답 메시지
   * @example "User account deactivated successfully"
   */
  message: string;
}

export interface BlockResponseDataDto {
  /**
   * 차단을 실행한 사용자의 ID
   * @example "60f7b3c4e0b2c4a5d0e8f9a2"
   */
  blockerId: string;
  /**
   * 차단된 사용자의 ID
   * @example "60f7b3c4e0b2c4a5d0e8f9a3"
   */
  blockedId: string;
  /**
   * 차단 상태
   * @example true
   */
  isBlocked: boolean;
  /**
   * 차단된 시간
   * @example "2023-01-15T10:30:00.000Z"
   */
  createdAt: string;
}

export interface BlockUserResponseDto {
  /** @example "success" */
  status: string;
  /** @example "사용자가 차단되었습니다." */
  message: string;
  data: BlockResponseDataDto;
}

export interface UnblockUserResponseDto {
  /** @example "success" */
  status: string;
  /** @example "사용자 차단이 해제되었습니다." */
  message: string;
}

export interface BlockStatusResponseDataDto {
  /**
   * 해당 사용자가 차단되었는지 여부
   * @example true
   */
  isBlocked: boolean;
}

export interface BlockStatusResponseDto {
  /** @example "success" */
  status: string;
  data: BlockStatusResponseDataDto;
}

export interface BlockedUserDetailDto {
  /**
   * 사용자 ID
   * @example "60f7b3c4e0b2c4a5d0e8f9a3"
   */
  _id: string;
  /**
   * 사용자 이름
   * @example "차단된 사용자"
   */
  name: string;
  /**
   * 사용자 이메일
   * @example "blocked@example.com"
   */
  email?: string;
  /**
   * 프로필 이미지 URL
   * @example "https://example.com/profile.jpg"
   */
  picture?: string;
  /**
   * 사용자 상태
   * @example "active"
   */
  status: "active" | "inactive" | "deleted";
}

export interface BlockedUserDto {
  /**
   * 차단 기록의 ID
   * @example "60f7b3c4e0b2c4a5d0e8f9a1"
   */
  _id: string;
  /**
   * 차단된 사용자의 ID
   * @example "60f7b3c4e0b2c4a5d0e8f9a3"
   */
  blockedUserId: string;
  /** 차단된 사용자의 상세 정보 */
  blockedUser?: BlockedUserDetailDto;
  /**
   * 차단된 시간
   * @example "2023-01-15T10:30:00.000Z"
   */
  createdAt: string;
}

export interface BlockedUsersResponseDataDto {
  /** 차단된 사용자 목록 */
  blockedUsers: BlockedUserDto[];
  /**
   * 전체 차단된 사용자 수
   * @example 5
   */
  total: number;
  /**
   * 현재 페이지 번호
   * @example 1
   */
  page: number;
  /**
   * 전체 페이지 수
   * @example 1
   */
  pages: number;
}

export interface BlockedUsersResponseDto {
  /** @example "success" */
  status: string;
  data: BlockedUsersResponseDataDto;
}

export interface PublicUserItemDto {
  /**
   * User ID
   * @example "507f1f77bcf86cd799439011"
   */
  userId: string;
  /**
   * User display name
   * @example "John Doe"
   */
  name: string;
  /**
   * User avatar URL
   * @example "https://cdn.momentbook.app/avatars/user123.jpg"
   */
  picture?: string;
  /**
   * Number of published journeys
   * @example 5
   */
  publishedJourneyCount: number;
}

export interface PublicUsersDataDto {
  /** List of public users */
  users: PublicUserItemDto[];
  /** Total number of users */
  total: number;
  /** Current page number */
  page: number;
  /** Total number of pages */
  pages: number;
  /** Items per page limit */
  limit: number;
}

export interface PublicUsersResponseDto {
  /** @example "success" */
  status: string;
  data: PublicUsersDataDto;
}

export interface PublicUserProfileDto {
  /**
   * User ID
   * @example "507f1f77bcf86cd799439011"
   */
  userId: string;
  /**
   * User display name
   * @example "John Doe"
   */
  name: string;
  /**
   * User avatar URL
   * @example "https://cdn.momentbook.app/avatars/user123.jpg"
   */
  picture?: string;
  /**
   * User biography
   * @example "Traveler and photographer"
   */
  biography?: string;
  /**
   * Number of published journeys
   * @example 5
   */
  publishedJourneyCount: number;
}

export interface PublicUserProfileResponseDto {
  /** @example "success" */
  status: string;
  data: PublicUserProfileDto;
}

export interface PublishedJourneyItemDto {
  /**
   * Public ID
   * @example "abc123xyz789"
   */
  publicId: string;
  /**
   * Journey ID
   * @example "journey_123"
   */
  journeyId: string;
  /** Author user ID */
  userId: string;
  /** Journey start timestamp (ms) */
  startedAt: number;
  /** Journey end timestamp (ms) */
  endedAt?: number;
  /** Recap stage */
  recapStage: string;
  /** Number of published photos */
  photoCount: number;
  /**
   * Number of images (deprecated, use photoCount)
   * @deprecated
   */
  imageCount: number;
  /** First image URL for preview */
  thumbnailUrl?: string;
  /** Journey metadata */
  metadata?: object;
  /** Published timestamp */
  publishedAt: string;
  /** Creation timestamp */
  createdAt: string;
}

export interface PublishedJourneysDataDto {
  /** List of published journeys */
  journeys: PublishedJourneyItemDto[];
  /** Total number of published journeys */
  total: number;
  /** Current page number */
  page: number;
  /** Total number of pages */
  pages: number;
  /** Items per page limit */
  limit: number;
}

export interface PublishedJourneysResponseDto {
  /** @example "success" */
  status: string;
  data: PublishedJourneysDataDto;
}

export interface SignupConsentItemDto {
  /**
   * 동의 항목의 고유 키
   * @example "terms"
   */
  key: string;
  /**
   * 동의 항목 제목
   * @example "Terms of Service"
   */
  label: string;
  /**
   * 웹 페이지 경로 (앱에서 호스트와 결합)
   * @example "/terms"
   */
  path: string;
  /**
   * 필수 동의 여부
   * @example true
   */
  required: boolean;
  /**
   * 표시 순서
   * @example 1
   */
  order: number;
}

export interface SignupConsentsDataDto {
  /** 동의 항목 목록 */
  consents: SignupConsentItemDto[];
  /**
   * 동의 템플릿 버전
   * @example "1.0.0"
   */
  version: string;
}

export interface SignupConsentsResponseDto {
  /** @example "success" */
  status: string;
  data: SignupConsentsDataDto;
}

export interface UserConsentItemUpdateDto {
  /**
   * 동의 여부
   * @example true
   */
  agreement: boolean;
  /**
   * 동의 항목 키 (예: terms, privacy, community-guidelines, marketing-consent)
   * @example "terms"
   */
  consentType: string;
  /**
   * 동의 내용 (선택)
   * @example "MomentBook 서비스 이용약관에 동의합니다."
   */
  content?: string;
  /**
   * 필수 동의 항목 여부 (선택)
   * @example true
   */
  isRequired?: boolean;
}

export interface UpdateUserConsentsDto {
  /**
   * 동의 항목 목록
   * @example [{"consentType":"terms","agreement":true,"content":"MomentBook 서비스 이용약관에 동의합니다.","isRequired":true},{"consentType":"privacy","agreement":true,"content":"MomentBook 개인정보 처리방침에 동의합니다.","isRequired":true}]
   */
  consents: UserConsentItemUpdateDto[];
  /**
   * 동의 템플릿 버전
   * @example "1.0.0"
   */
  version: string;
}

export interface ConsentValidationDto {
  /**
   * 모든 필수 동의 항목에 동의했는지 여부
   * @example true
   */
  isAllRequiredConsented: boolean;
  /**
   * 동의하지 않은 필수 항목 키 목록
   * @example []
   */
  missingRequiredConsents: string[];
}

export interface UpdateUserConsentsDataDto {
  /** 동의 검증 결과 */
  validation: ConsentValidationDto;
}

export interface UpdateUserConsentsResponseDto {
  /**
   * 응답 상태
   * @example "success"
   */
  status: string;
  /** 동의 검증 결과 */
  data: UpdateUserConsentsDataDto;
}

export interface ValidateUserConsentsResponseDto {
  /**
   * 응답 상태
   * @example "success"
   */
  status: string;
  /** 동의 검증 데이터 */
  data: ConsentValidationDto;
}

export interface GpsMetricsDto {
  sampleCount: number;
  timeRangeMs: number;
  coveragePercent: number;
  avgAccuracyM: number;
  p50AccuracyM: number;
  p95AccuracyM: number;
  avgSamplingIntervalMs: number;
  maxGapMs: number;
  samplingConsistency: number;
  avgSpeedMps: number;
  maxSpeedMps: number;
  totalDistanceM: number;
}

export interface RecapInputSummaryDto {
  journeyId: string;
  timeRange: object;
  gpsMetrics?: GpsMetricsDto;
  photoCount: number;
  photoWithGpsCount: number;
  photoWithoutGpsCount: number;
  photoGpsRatio: number;
  photoTimeRange?: object;
}

export interface RecapAlgorithmConfigDto {
  clustering: object;
  photoMapping: object;
  computedAt: number;
  processingTimeMs?: number;
}

export interface RecapComputedDto {
  route: object;
  unmapped: object;
  quality: object;
}

export interface RecapOperationDto {
  opId: string;
  type: string;
  atMs: number;
  photoId?: string;
  photoIds?: string[];
  fromClusterId?: string;
  toClusterId?: string;
  clusterId?: string;
  photoOrder?: string[];
}

export interface PhotoAssignmentDto {
  photoId: string;
  targetClusterId: string;
}

export interface ClusterEditDto {
  clusterId: string;
  edits: object;
}

export interface RecapOverridesDto {
  ops: RecapOperationDto[];
  hiddenPhotoIds: string[];
  manualAssignments: PhotoAssignmentDto[];
  manualClusterEdits: ClusterEditDto[];
}

export interface RecapDraftDto {
  /**
   * Schema version
   * @example 1
   */
  schemaVersion: number;
  /**
   * Draft ID (content-based hash)
   * @example "draft_000d77d4d4"
   */
  draftId: string;
  /** Journey ID (UUIDv4) */
  journeyId: string;
  /** Draft creation time (Unix ms) */
  createdAt: number;
  /** Draft last update time (Unix ms) */
  updatedAt: number;
  /** Input data summary */
  inputSummary: RecapInputSummaryDto;
  /** Journey mode classification (PHOTO_ONLY deprecated, use ROUTE_NONE) */
  mode: "ROUTE_STRONG" | "ROUTE_WEAK" | "ROUTE_NONE";
  /** Explanation of mode classification */
  modeReason: string;
  /** Algorithm configuration */
  algorithm: RecapAlgorithmConfigDto;
  /** Computed results (IMMUTABLE) */
  computed: RecapComputedDto;
  /** User overrides */
  overrides: RecapOverridesDto;
}

export interface JourneyImageLocationDto {
  /**
   * Latitude coordinate
   * @example 37.5665
   */
  latitude: number;
  /**
   * Longitude coordinate
   * @example 126.978
   */
  longitude: number;
}

export interface JourneyImageDto {
  /**
   * Public URL of the uploaded image
   * @example "https://cdn.momentbook.app/journeys/user123/1234567890-abc.jpg"
   */
  url: string;
  /** Public photo identifier (URL-safe) */
  photoId?: string;
  /**
   * Image width in pixels
   * @example 1080
   */
  width?: number;
  /**
   * Image height in pixels
   * @example 1920
   */
  height?: number;
  /** Optional caption provided by the user */
  caption?: string;
  /** Photo captured time (ms) */
  takenAt?: number;
  /** Optional location coordinates */
  location?: JourneyImageLocationDto;
  /** Optional human-friendly location label */
  locationName?: string;
}

export interface JourneyMetadataDto {
  /**
   * User-defined journey title
   * @example "Trip to Seoul"
   */
  title?: string;
  /**
   * User reflection or notes about the journey
   * @example "A wonderful journey exploring the city"
   */
  description?: string;
  /**
   * Selected thumbnail photo URI (from images array)
   * @example "https://cdn.momentbook.app/journeys/user123/thumbnail.jpg"
   */
  thumbnailUri?: string;
}

export interface PublishJourneyRequestDto {
  /**
   * Journey ID (client-side)
   * @example "journey_abc123"
   */
  journeyId: string;
  /**
   * Journey start timestamp (ms)
   * @example 1704067200000
   */
  startedAt: number;
  /** Journey end timestamp (ms) */
  endedAt?: number;
  /** RecapDraft - 핵심 recap 데이터 (computed + overrides) */
  recapDraft: RecapDraftDto;
  /**
   * Recap stage
   * @example "USER_DONE"
   */
  recapStage: "NONE" | "SYSTEM_DONE" | "USER_DONE" | "FINALIZED";
  /**
   * Photo ID to S3 URL mapping (local uri → downloadUrl)
   * @example {"file:///local/photo1.jpg":"https://yourthink.s3.ap-northeast-2.amazonaws.com/journeys/user123/img1.jpg","file:///local/photo2.jpg":"https://yourthink.s3.ap-northeast-2.amazonaws.com/journeys/user123/img2.jpg"}
   */
  photoUrlMapping: object;
  /** Array of selected images to publish (max 30). Client should only upload and send photos that user wants to publish, not all journey photos. */
  images: JourneyImageDto[];
  /** Journey metadata (title, description, thumbnailUri, etc.) */
  metadata?: JourneyMetadataDto;
}

export interface PublishJourneyResponseDto {
  /**
   * Status of the request
   * @example "success"
   */
  status: string;
  /** Published journey data */
  data: {
    /** Unique public identifier for the journey */
    publicId?: string;
    /** ISO timestamp of creation */
    createdAt?: string;
    /** Publish status */
    publishStatus?: "PUBLISHING" | "PUBLISHED" | "FAILED";
  };
}

export interface PublishStatusResponseDto {
  /**
   * Status of the request
   * @example "success"
   */
  status: string;
  /** Publish status data */
  data: {
    publishStatus?: "NOT_PUBLISHED" | "PUBLISHING" | "PUBLISHED" | "FAILED";
    publicId?: string;
    publishedUrl?: string;
  };
}

export interface PublishJourneyInfoResponseDto {
  /**
   * Status of the request
   * @example "success"
   */
  status: string;
  /** Publish info for the journey */
  data: {
    publishStatus?: "NOT_PUBLISHED" | "PUBLISHING" | "PUBLISHED" | "FAILED";
    publicId?: string;
    publishedUrl?: string;
    publishedAt?: string;
    lastPublishError?: string;
    createdAt?: string;
    updatedAt?: string;
    /** Whether locations have been enriched with POI data */
    isLocationEnriched?: boolean;
  };
}

export interface PublishedJourneyDetailDto {
  /**
   * Public ID for sharing
   * @example "abc123xyz789"
   */
  publicId: string;
  /** Author user ID */
  userId: string;
  /** Journey start timestamp (ms) */
  startedAt: number;
  /** Journey end timestamp (ms) */
  endedAt?: number;
  /** Journey title */
  title?: string;
  /** Journey description */
  description?: string;
  /** Journey mode (PHOTO_ONLY deprecated) */
  mode: "ROUTE_STRONG" | "ROUTE_WEAK" | "ROUTE_NONE";
  /** Total photo count */
  photoCount: number;
  /** Published images with S3 URLs */
  images: string[];
  /** Clusters for rendering (stops + orphan clusters) */
  clusters: string[];
  /** Published timestamp */
  publishedAt: string;
  /** Creation timestamp */
  createdAt: string;
  /**
   * Content availability status for rendering
   * @example "available"
   */
  contentStatus?: "available" | "reported_hidden";
  /**
   * Notice for moderated/hidden content
   * @example "This journey has been reported and is currently hidden."
   */
  notice?: string;
}

export interface PublishedJourneyDetailResponseDto {
  /** @example "success" */
  status: string;
  data: PublishedJourneyDetailDto;
}

export interface UnpublishJourneyResponseDto {
  /** @example "success" */
  status: string;
  /** Unpublish result data */
  data: {
    /** The public ID of the unpublished journey */
    publicId?: string;
    /** Number of S3 images deleted */
    deletedImages?: number;
  };
}

export interface JourneyTitleSummaryDto {
  /**
   * 전체 사진 수
   * @example 86
   */
  photoCountTotal: number;
  /**
   * 총 소요 시간(분)
   * @example 360
   */
  durationMin?: number;
  /**
   * 총 이동 거리(km)
   * @example 8.4
   */
  distanceKm?: number;
  /**
   * STOP(스팟) 개수
   * @example 5
   */
  stopCount?: number;
}

export interface JourneyTopStopDto {
  /**
   * 상위 스팟 라벨 (공개면 동/구 정도로만)
   * @example "성수동"
   */
  label: string;
  /**
   * 체류 시간(분)
   * @example 45
   */
  dwellMin?: number;
}

export interface GenerateJourneyTitleRequest {
  /**
   * 정리 모드
   * @example "route_strong"
   */
  mode: "route_strong" | "route_weak" | "route_none";
  /**
   * 공개 범위
   * @example "unlisted"
   */
  privacyLevel: "public" | "unlisted" | "private";
  /**
   * 여정 날짜 (YYYY-MM-DD)
   * @example "2026-01-07"
   */
  date: string;
  /** 요약 정보 */
  summary: JourneyTitleSummaryDto;
  /**
   * 제목에 반영할 하이라이트 키워드(3~8개 추천). 장소/행동/분위기 키워드 위주.
   * @example ["산책","카페","노을","조용한 시간"]
   */
  highlights: string[];
  /** 상위 스팟(있으면 1~3개). public이면 개인 위치 특정 가능한 상세 라벨 금지. */
  topStops?: JourneyTopStopDto[];
  /**
   * ROUTE_WEAK일 때 신뢰도(0~1)
   * @example 0.62
   */
  confidence?: number;
  /**
   * 사진 캡션 배열 (있을 경우 AI가 이를 참고하여 더 상세한 제목/설명 생성). 최대 20개까지만 전달 권장.
   * @example ["카페에서 아메리카노","석양을 바라보며","친구와 함께"]
   */
  photoCaptions?: string[];
}

export interface GeneratedTitleData {
  /**
   * 추천 제목
   * @example "노을빛 성수 산책"
   */
  title: string;
  /**
   * 대안 제목 리스트 (더 이상 생성되지 않음, 레거시 호환용)
   * @deprecated
   * @example []
   */
  alternatives?: string[];
}

export interface GenerateJourneyTitleResponseData {
  suggestion: GeneratedTitleData;
}

export interface GenerateJourneyTitleResponse {
  /** @example "success" */
  status: string;
  data: GenerateJourneyTitleResponseData;
  /** @example "제목이 성공적으로 생성되었습니다." */
  message: string;
}

export interface LocationItemDto {
  /**
   * Latitude coordinate
   * @min -90
   * @max 90
   * @example 37.5665
   */
  lat: number;
  /**
   * Longitude coordinate
   * @min -180
   * @max 180
   * @example 126.978
   */
  lng: number;
  /**
   * Optional client-provided reverse geocoded location name for better translation context
   * @example "Seoul, South Korea"
   */
  reverseGeocodedName?: string;
}

export interface EnrichLocationsRequestDto {
  /**
   * Array of locations to enrich with POI data
   * @example [{"lat":37.5665,"lng":126.978,"reverseGeocodedName":"Seoul, South Korea"},{"lat":41.4036,"lng":2.1744,"reverseGeocodedName":"Barcelona, Spain"}]
   */
  locations: LocationItemDto[];
  /**
   * Search radius in meters for nearby POIs (default: 150m)
   * @min 10
   * @max 500
   * @example 150
   */
  radiusMeters?: number;
  /**
   * Language code for multilingual place names (e.g., "ko", "es", "ja", "zh"). If provided, returns both English and translated place names using OpenAI.
   * @example "ko"
   */
  language?: string;
  /**
   * Journey ID to track enrichment status and prevent duplicate enrichment. If provided, the server will mark this journey as enriched and skip re-enrichment on subsequent calls.
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  journeyId?: string;
}

export interface RegisterFcmTokenDto {
  /**
   * FCM device token
   * @example "dXNlckBleGFtcGxlLmNvbQ:APA91bH..."
   */
  fcmToken: string;
}

export interface UpdateNotificationSettingsDto {
  /**
   * Enable or disable push notifications
   * @example true
   */
  notificationEnabled: boolean;
}

export interface CreateReportDto {
  /**
   * 신고 대상 타입
   * @example "published_journey"
   */
  targetType: "user" | "published_journey";
  /**
   * 신고 대상 ID
   * @example "680657032be53a7892fe5abc"
   */
  targetId: string;
  /**
   * 신고 사유
   * @example "spam"
   */
  reason: "spam" | "abuse" | "hate" | "sexual" | "inappropriate" | "other";
  /**
   * 기타 사유 상세 설명 (reason이 other인 경우 필수)
   * @example "광고성 게시물입니다"
   */
  description?: string | null;
}

export interface ReportDataDto {
  /**
   * 신고 ID
   * @example "680657032be53a7892fe5abc"
   */
  _id: string;
  /**
   * 신고 대상 타입
   * @example "published_journey"
   */
  targetType: "user" | "published_journey";
  /**
   * 신고 대상 ID
   * @example "680657032be53a7892fe5def"
   */
  targetId: string;
  /**
   * 신고 사유
   * @example "spam"
   */
  reason: "spam" | "abuse" | "hate" | "sexual" | "inappropriate" | "other";
  /**
   * 신고 처리 상태
   * @example "pending"
   */
  status: "pending" | "reviewed" | "resolved" | "rejected";
  /**
   * 신고 생성 시간
   * @example "2023-01-01T00:00:00.000Z"
   */
  createdAt: string;
}

export interface CreateReportResponseDto {
  /**
   * 상태
   * @example "success"
   */
  status: string;
  /**
   * 메시지
   * @example "신고가 접수되었습니다. 감사합니다."
   */
  message: string;
  /** 생성된 신고 데이터 */
  data: ReportDataDto;
}

export interface TargetReportCountDataDto {
  /**
   * 신고 대상 타입
   * @example "published_journey"
   */
  targetType: "user" | "published_journey";
  /**
   * 신고 대상 ID
   * @example "680657032be53a7892fe5abc"
   */
  targetId: string;
  /**
   * 신고 개수
   * @example 5
   */
  reportCount: number;
}

export interface GetTargetReportCountResponseDto {
  /**
   * 상태
   * @example "success"
   */
  status: string;
  /** 대상별 신고 개수 데이터 */
  data: TargetReportCountDataDto;
}

export interface ReportDetailDataDto {
  /**
   * 신고 ID
   * @example "680657032be53a7892fe5abc"
   */
  _id: string;
  /**
   * 신고한 사용자 ID
   * @example "680657032be53a7892fe5ghi"
   */
  reporterId: string;
  /**
   * 신고 대상 타입
   * @example "published_journey"
   */
  targetType: "user" | "published_journey";
  /**
   * 신고 대상 ID
   * @example "680657032be53a7892fe5def"
   */
  targetId: string;
  /**
   * 신고 사유
   * @example "spam"
   */
  reason: "spam" | "abuse" | "hate" | "sexual" | "inappropriate" | "other";
  /**
   * 신고 상세 설명
   * @example "광고성 게시물입니다"
   */
  description?: object | null;
  /**
   * 신고 처리 상태
   * @example "pending"
   */
  status: "pending" | "reviewed" | "resolved" | "rejected";
  /**
   * 관리자 메모
   * @example "검토 중입니다"
   */
  adminNote?: object | null;
  /**
   * 처리 완료 시간
   * @example "2023-01-01T00:00:00.000Z"
   */
  resolvedAt?: object | null;
  /**
   * 처리한 관리자 ID
   * @example "680657032be53a7892fe5jkl"
   */
  resolvedBy?: object | null;
  /**
   * 신고 생성 시간
   * @example "2023-01-01T00:00:00.000Z"
   */
  createdAt: string;
  /**
   * 신고 수정 시간
   * @example "2023-01-01T00:00:00.000Z"
   */
  updatedAt: string;
}

export interface ReportsListDataDto {
  /** 신고 목록 */
  reports: ReportDetailDataDto[];
}

export interface GetReportsResponseDto {
  /**
   * 상태
   * @example "success"
   */
  status: string;
  /** 응답 데이터 */
  data: ReportsListDataDto;
  /** 페이지네이션 데이터 */
  paginationData: PaginationDataDto;
}

export interface ReportStatsDataDto {
  /**
   * 전체 신고 수
   * @example 150
   */
  totalReports: number;
  /**
   * 대기 중인 신고 수
   * @example 20
   */
  pendingReports: number;
  /**
   * 해결된 신고 수
   * @example 120
   */
  resolvedReports: number;
  /**
   * 거부된 신고 수
   * @example 10
   */
  rejectedReports: number;
}

export interface GetReportStatsResponseDto {
  /**
   * 상태
   * @example "success"
   */
  status: string;
  /** 신고 통계 데이터 */
  data: ReportStatsDataDto;
}

export interface GetReportResponseDto {
  /**
   * 상태
   * @example "success"
   */
  status: string;
  /** 신고 상세 데이터 */
  data: ReportDetailDataDto;
}

export interface UpdateReportDto {
  /**
   * 신고 처리 상태
   * @example "resolved"
   */
  status?: "pending" | "reviewed" | "resolved" | "rejected";
  /**
   * 관리자 메모
   * @example "부적절한 내용으로 확인되어 처리 완료"
   */
  adminNote?: string | null;
}

export interface ReportUpdateDataDto {
  /**
   * 신고 ID
   * @example "680657032be53a7892fe5abc"
   */
  _id: string;
  /**
   * 업데이트된 처리 상태
   * @example "resolved"
   */
  status: "pending" | "reviewed" | "resolved" | "rejected";
  /**
   * 관리자 메모
   * @example "부적절한 내용으로 확인되어 처리 완료"
   */
  adminNote?: object | null;
  /**
   * 처리 완료 시간
   * @example "2023-01-01T00:00:00.000Z"
   */
  resolvedAt?: object | null;
  /**
   * 처리한 관리자 ID
   * @example "680657032be53a7892fe5jkl"
   */
  resolvedBy?: object | null;
  /**
   * 수정 시간
   * @example "2023-01-01T00:00:00.000Z"
   */
  updatedAt: string;
}

export interface UpdateReportResponseDto {
  /**
   * 상태
   * @example "success"
   */
  status: string;
  /**
   * 메시지
   * @example "신고가 성공적으로 업데이트되었습니다."
   */
  message: string;
  /** 업데이트된 신고 데이터 */
  data: ReportUpdateDataDto;
}

export interface DeleteReportResponseDto {
  /**
   * 상태
   * @example "success"
   */
  status: string;
  /**
   * 메시지
   * @example "신고가 성공적으로 삭제되었습니다."
   */
  message: string;
}

export interface CreateJourneyAiCommonRequestDto {
  /**
   * 입력 이미지 URL (presigned URL 권장)
   * @example "https://example.com/input.jpg"
   */
  inputUrl: string;
  /**
   * 옵션(모델 파라미터 등)
   * @example {"lang":"ko"}
   */
  options?: object;
}

export interface JourneyAiJobResponseDto {
  /**
   * 작업 ID(UUID)
   * @example "c2b4c3b4-1d6b-4b0b-9a9d-4d5fd0e4b2c1"
   */
  jobId: string;
  /**
   * 여정 ID
   * @example "journey_123"
   */
  journeyId: string;
  /** 작업 타입 */
  type: "pano" | "title";
  /** 상태 */
  status: "queued" | "running" | "done" | "failed";
  /** 입력 이미지 URL */
  inputUrl?: string;
  /** 결과(JSON) */
  result?: object;
  /** 워커가 제공한 결과 파일 경로(내부용) */
  resultPath?: string;
  /** 에러 메시지 */
  error?: string;
  /**
   * 마지막 폴링 시각
   * @format date-time
   */
  lastPolledAt?: string;
  /** 폴링 횟수 */
  pollCount?: number;
}

export interface JourneyLocationSampleDto {
  /**
   * @min -90
   * @max 90
   * @example 37.5665
   */
  latitude: number;
  /**
   * @min -180
   * @max 180
   * @example 126.978
   */
  longitude: number;
  /**
   * Unix ms timestamp
   * @example 1704067200000
   */
  timestamp: number;
  /**
   * GPS accuracy in meters
   * @example 14.5
   */
  accuracy?: number;
  /**
   * Speed in m/s
   * @example 3.2
   */
  speed?: number;
}

export interface JourneyRecapInputDto {
  /** @example "journey_abc123" */
  id: string;
  /**
   * Unix ms timestamp
   * @example 1704067200000
   */
  startedAt: number;
  /**
   * Unix ms timestamp
   * @example 1704070800000
   */
  endedAt?: number;
  locations: JourneyLocationSampleDto[];
}

export interface PhotoMetaInputDto {
  /**
   * Client-side photo identifier
   * @example "file:///photos/IMG_0001.jpg"
   */
  uri: string;
  /**
   * Unix ms timestamp
   * @example 1704067210000
   */
  takenAt: number;
  /**
   * @min -90
   * @max 90
   * @example 37.5665
   */
  lat?: number;
  /**
   * @min -180
   * @max 180
   * @example 126.978
   */
  lng?: number;
  /** @example true */
  hasGps: boolean;
  /** @example 4032 */
  width?: number;
  /** @example 3024 */
  height?: number;
}

export interface CreateJourneyRecapDraftRequestDto {
  journey: JourneyRecapInputDto;
  photos: PhotoMetaInputDto[];
}

export interface JourneyRecapDraftResponseDataDto {
  /** RecapDraft payload (contract-compatible object) */
  recapDraft: object;
}

export interface JourneyRecapDraftResponseDto {
  /** @example "success" */
  status: string;
  data: JourneyRecapDraftResponseDataDto;
}

export interface PresignUploadRequestDto {
  /**
   * Journey ID to associate the upload with (client-generated UUID)
   * @example "36a2d200-74d1-43ed-9265-8626b0eb2881"
   */
  journeyId: string;
  /**
   * Content type of the file
   * @example "image/jpeg"
   */
  contentType: "image/jpeg" | "image/png" | "image/webp";
  /**
   * File extension
   * @example "jpg"
   */
  fileExt?: string;
  /**
   * File size in bytes (max 5MB)
   * @example 1048576
   */
  sizeBytes?: number;
  /**
   * Purpose of the upload
   * @example "journey"
   */
  purpose: "journey";
}

export interface PresignUploadResponseDto {
  /**
   * Status of the request
   * @example "success"
   */
  status: string;
  /** Presigned URL data */
  data: {
    /** Presigned URL for uploading the file */
    uploadUrl?: string;
    /** Public URL to access the uploaded file */
    downloadUrl?: string;
    /** S3 object key */
    key?: string;
  };
}

export interface VersionPolicyResponseDto {
  /** @example "success" */
  status: string;
  data: object;
}

export interface VersionCheckDataDto {
  /** @example "ios" */
  platform: "ios" | "android";
  /** @example "1.8.4" */
  clientVersion: string;
  /** @example "2.0.0" */
  minSupportedVersion: string;
  /** @example "2.1.3" */
  latestVersion?: string;
  /** @example "force" */
  updateMode: "force" | "soft" | "none";
  /** @example "https://apps.apple.com/app/idXXXX" */
  storeUrl?: string;
  /** @example true */
  shouldUpdate: boolean;
  /** @example true */
  shouldForceUpdate: boolean;
  /** @example "BELOW_MIN_SUPPORTED" */
  reason: "BELOW_MIN_SUPPORTED" | "BELOW_LATEST" | "UP_TO_DATE" | "MODE_NONE";
  /** @example 1700000000000 */
  ts: number;
}

export interface VersionCheckResponseDto {
  /** @example "success" */
  status: string;
  /** @example "Version check completed" */
  message: string;
  data: VersionCheckDataDto;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title MomentBook API
 * @version 2.0.6
 * @contact
 *
 * MomentBook API 문서 - 생각을 공유하고 관리하는 플랫폼
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  v2 = {
    /**
     * No description
     *
     * @tags health
     * @name HealthControllerHealthz
     * @summary Health Check (process only)
     * @request GET:/v2/health/healthz
     */
    healthControllerHealthz: (params: RequestParams = {}) =>
      this.request<HealthzResponseDto, any>({
        path: `/v2/health/healthz`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags health
     * @name HealthControllerReadyz
     * @summary Ready Check (includes Mongo ping)
     * @request GET:/v2/health/readyz
     */
    healthControllerReadyz: (params: RequestParams = {}) =>
      this.request<ReadyzResponseDto, ReadyzUnavailableResponseDto>({
        path: `/v2/health/readyz`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerSignInWithGoogle
     * @summary Google OAuth 인증 시작 (웹 브라우저 리다이렉트)
     * @request GET:/v2/auth/google
     */
    authControllerSignInWithGoogle: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v2/auth/google`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerHandleGoogleCallback
     * @summary Google OAuth Callback
     * @request GET:/v2/auth/google/callback
     */
    authControllerHandleGoogleCallback: (
      query: {
        code: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/v2/auth/google/callback`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerSignInWithGoogleToken
     * @summary Google Token으로 인증 (모바일/웹)
     * @request POST:/v2/auth/google/token
     */
    authControllerSignInWithGoogleToken: (
      data: GoogleTokenAuthDto,
      params: RequestParams = {},
    ) =>
      this.request<GoogleLoginSuccessResponseDto, any>({
        path: `/v2/auth/google/token`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerSignInWithApple
     * @summary Apple Sign-In 인증
     * @request POST:/v2/auth/apple
     */
    authControllerSignInWithApple: (
      data: AppleAuthDto,
      params: RequestParams = {},
    ) =>
      this.request<AppleLoginSuccessResponseDto, any>({
        path: `/v2/auth/apple`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerContinueAsGuest
     * @summary 게스트로 계속하기
     * @request POST:/v2/auth/guest
     */
    authControllerContinueAsGuest: (
      data: GuestAuthDto,
      params: RequestParams = {},
    ) =>
      this.request<GuestLoginSuccessResponseDto, any>({
        path: `/v2/auth/guest`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerRefreshToken
     * @summary Access Token 갱신
     * @request POST:/v2/auth/refresh
     */
    authControllerRefreshToken: (
      data: RefreshTokenDto,
      params: RequestParams = {},
    ) =>
      this.request<TokenRefreshResponseDto, any>({
        path: `/v2/auth/refresh`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogout
     * @summary 로그아웃 (단일 디바이스)
     * @request POST:/v2/auth/logout
     */
    authControllerLogout: (data: LogoutDto, params: RequestParams = {}) =>
      this.request<LogoutResponseDto, any>({
        path: `/v2/auth/logout`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogoutAll
     * @summary 모든 디바이스에서 로그아웃
     * @request POST:/v2/auth/logout-all
     * @secure
     */
    authControllerLogoutAll: (params: RequestParams = {}) =>
      this.request<LogoutAllResponseDto, any>({
        path: `/v2/auth/logout-all`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerSendEmailVerificationCode
     * @summary 이메일 인증 코드 발송
     * @request POST:/v2/auth/email/send-verification
     */
    authControllerSendEmailVerificationCode: (
      data: SendVerificationCodeDto,
      params: RequestParams = {},
    ) =>
      this.request<SendVerificationCodeResponseDto, any>({
        path: `/v2/auth/email/send-verification`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerVerifyEmailCode
     * @summary 이메일 인증 코드 확인
     * @request POST:/v2/auth/email/verify-code
     */
    authControllerVerifyEmailCode: (
      data: VerifyEmailCodeDto,
      params: RequestParams = {},
    ) =>
      this.request<VerifyEmailCodeResponseDto, any>({
        path: `/v2/auth/email/verify-code`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerSignupWithEmail
     * @summary 이메일 회원가입
     * @request POST:/v2/auth/email/signup
     */
    authControllerSignupWithEmail: (
      data: EmailSignupDto,
      params: RequestParams = {},
    ) =>
      this.request<EmailSignupResponseDto, any>({
        path: `/v2/auth/email/signup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLoginWithEmail
     * @summary 이메일 로그인
     * @request POST:/v2/auth/email/login
     */
    authControllerLoginWithEmail: (
      data: EmailLoginDto,
      params: RequestParams = {},
    ) =>
      this.request<EmailLoginResponseDto, any>({
        path: `/v2/auth/email/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerChangePassword
     * @summary 비밀번호 변경
     * @request POST:/v2/auth/email/password
     * @secure
     */
    authControllerChangePassword: (
      data: ChangePasswordDto,
      params: RequestParams = {},
    ) =>
      this.request<PasswordChangeResponseDto, any>({
        path: `/v2/auth/email/password`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerRequestPasswordReset
     * @summary 비밀번호 재설정 코드 요청
     * @request POST:/v2/auth/email/request-password-reset
     */
    authControllerRequestPasswordReset: (
      data: RequestPasswordResetDto,
      params: RequestParams = {},
    ) =>
      this.request<PasswordResetRequestResponseDto, any>({
        path: `/v2/auth/email/request-password-reset`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerResetPassword
     * @summary 비밀번호 재설정
     * @request POST:/v2/auth/email/reset-password
     */
    authControllerResetPassword: (
      data: ResetPasswordDto,
      params: RequestParams = {},
    ) =>
      this.request<PasswordResetResponseDto, any>({
        path: `/v2/auth/email/reset-password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerCheckEmail
     * @summary 이메일 존재 여부 확인
     * @request GET:/v2/auth/email/check
     */
    authControllerCheckEmail: (
      query: {
        /**
         * Email address to check
         * @example "user@example.com"
         */
        email: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EmailCheckResponseDto, any>({
        path: `/v2/auth/email/check`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description 현재 인증된 사용자의 프로필 정보를 조회합니다. **주요 변경사항 (v1.0.14):** - 필수 동의 미완료 사용자도 프로필 조회 가능 (403 에러 제거) - 응답에 `consents` 필드 추가하여 동의 상태 정보 제공 - 클라이언트는 `consents.requiresAction`을 확인하여 동의 화면으로 네비게이션 **동의 상태 처리:** - `consents.requiresAction: true` → 동의 화면으로 이동 필요 - `consents.requiresAction: false` → 모든 필수 동의 완료
     *
     * @tags users
     * @name UsersControllerGetMyProfile
     * @summary 내 프로필 조회
     * @request GET:/v2/users/profile/me
     * @secure
     */
    usersControllerGetMyProfile: (params: RequestParams = {}) =>
      this.request<UserProfileSuccessResponseDto, void>({
        path: `/v2/users/profile/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 현재 인증된 사용자의 프로필 정보를 업데이트합니다
     *
     * @tags users
     * @name UsersControllerUpdateMyProfile
     * @summary 내 프로필 업데이트
     * @request PUT:/v2/users/profile/me
     * @secure
     */
    usersControllerUpdateMyProfile: (
      data: UpdateUserProfileDto,
      params: RequestParams = {},
    ) =>
      this.request<UserProfileUpdateSuccessResponseDto, void>({
        path: `/v2/users/profile/me`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 시스템에 가입한 모든 활성 사용자 목록을 조회합니다. activeUser 미들웨어를 통해 사용자 상태를 확인합니다.
     *
     * @tags users
     * @name UsersControllerGetAllUsers
     * @summary 모든 사용자 목록 조회
     * @request GET:/v2/users
     * @secure
     */
    usersControllerGetAllUsers: (
      query?: {
        /**
         * 페이지 번호
         * @example 1
         */
        page?: number;
        /**
         * 페이지당 항목 수
         * @example 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<UsersListSuccessResponseDto, void>({
        path: `/v2/users`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 특정 사용자의 프로필 정보를 조회합니다.
     *
     * @tags users
     * @name UsersControllerGetUserById
     * @summary 특정 사용자 정보 조회
     * @request GET:/v2/users/profile/{userId}
     */
    usersControllerGetUserById: (userId: string, params: RequestParams = {}) =>
      this.request<UserProfileSuccessResponseDto, void>({
        path: `/v2/users/profile/${userId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description 현재 인증된 사용자의 계정을 삭제합니다. **삭제 처리 내용:** - 사용자 상태를 'deleted'로 변경 (실제 데이터는 보관) - FCM 토큰 완전 삭제 및 푸시 알림 비활성화 - 사용자가 동의한 모든 이용약관 정보 완전 삭제 - 개인정보 보호를 위한 동의 기록 삭제 **푸시 알림 관련 처리:** - 등록된 FCM 토큰 삭제 - notificationEnabled 값을 false로 설정 - 향후 푸시 알림 수신 불가 탈퇴 후에는 해당 계정으로 로그인할 수 없으며, 동의 정보는 복구되지 않습니다.
     *
     * @tags users
     * @name UsersControllerDeleteMyAccount
     * @summary 회원 탈퇴
     * @request DELETE:/v2/users/me
     * @secure
     */
    usersControllerDeleteMyAccount: (params: RequestParams = {}) =>
      this.request<BasicSuccessResponseDto, void>({
        path: `/v2/users/me`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 특정 사용자를 차단합니다
     *
     * @tags users
     * @name UsersControllerBlockUser
     * @summary 사용자 차단
     * @request POST:/v2/users/blocks/{blockedUserId}
     * @secure
     */
    usersControllerBlockUser: (
      blockedUserId: string,
      params: RequestParams = {},
    ) =>
      this.request<BlockUserResponseDto, void>({
        path: `/v2/users/blocks/${blockedUserId}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 특정 사용자의 차단을 해제합니다
     *
     * @tags users
     * @name UsersControllerUnblockUser
     * @summary 사용자 차단 해제
     * @request DELETE:/v2/users/blocks/{blockedUserId}
     * @secure
     */
    usersControllerUnblockUser: (
      blockedUserId: string,
      params: RequestParams = {},
    ) =>
      this.request<UnblockUserResponseDto, void>({
        path: `/v2/users/blocks/${blockedUserId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 특정 사용자의 차단 상태를 조회합니다
     *
     * @tags users
     * @name UsersControllerGetBlockStatus
     * @summary 사용자 차단 상태 조회
     * @request GET:/v2/users/blocks/{blockedUserId}/status
     * @secure
     */
    usersControllerGetBlockStatus: (
      blockedUserId: string,
      params: RequestParams = {},
    ) =>
      this.request<BlockStatusResponseDto, void>({
        path: `/v2/users/blocks/${blockedUserId}/status`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 현재 사용자가 차단한 모든 사용자의 목록을 조회합니다
     *
     * @tags users
     * @name UsersControllerGetBlockedUsers
     * @summary 차단된 사용자 목록 조회
     * @request GET:/v2/users/blocks
     * @secure
     */
    usersControllerGetBlockedUsers: (
      query?: {
        /**
         * 페이지 번호
         * @example 1
         */
        page?: number;
        /**
         * 페이지당 항목 수
         * @example 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<BlockedUsersResponseDto, void>({
        path: `/v2/users/blocks`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Public endpoint to retrieve a paginated list of users who have published journeys
     *
     * @tags users
     * @name PublicUsersControllerGetPublicUsers
     * @summary Get list of public users
     * @request GET:/v2/users/public
     */
    publicUsersControllerGetPublicUsers: (
      query?: {
        /**
         * Page number (default: 1)
         * @example 1
         */
        page?: number;
        /**
         * Number of items per page (default: 20, max: 100)
         * @example 20
         */
        limit?: number;
        /** Sort order (default: recent) */
        sort?: "recent" | "oldest" | "mostJourneys";
      },
      params: RequestParams = {},
    ) =>
      this.request<PublicUsersResponseDto, any>({
        path: `/v2/users/public`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Public endpoint to retrieve user profile data for users who have published journeys
     *
     * @tags users
     * @name PublicUsersControllerGetPublicUserProfile
     * @summary Get public user profile
     * @request GET:/v2/users/public/{userId}
     */
    publicUsersControllerGetPublicUserProfile: (
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<PublicUserProfileResponseDto, void>({
        path: `/v2/users/public/${userId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Public endpoint to retrieve a paginated list of published journeys by a specific user
     *
     * @tags users
     * @name PublicUsersControllerGetPublicUserJourneys
     * @summary Get published journeys for a specific user
     * @request GET:/v2/users/public/{userId}/journeys
     */
    publicUsersControllerGetPublicUserJourneys: (
      userId: string,
      query?: {
        /**
         * Page number (default: 1)
         * @example 1
         */
        page?: number;
        /**
         * Number of items per page (default: 20, max: 100)
         * @example 20
         */
        limit?: number;
        /** Sort order (default: recent) */
        sort?: "recent" | "oldest";
      },
      params: RequestParams = {},
    ) =>
      this.request<PublishedJourneysResponseDto, void>({
        path: `/v2/users/public/${userId}/journeys`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description 회원가입 시 필요한 동의 항목 목록을 조회합니다. 앱은 path를 웹 호스트와 결합하여 사용합니다.
     *
     * @tags consents
     * @name ConsentTemplatesControllerGetSignupConsents
     * @summary 회원가입용 동의 항목 목록 조회
     * @request GET:/v2/consent-templates/signup
     */
    consentTemplatesControllerGetSignupConsents: (params: RequestParams = {}) =>
      this.request<SignupConsentsResponseDto, void>({
        path: `/v2/consent-templates/signup`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description 회원가입 시 사용자가 동의한 항목들을 저장합니다. 필수 항목에 모두 동의하면 사용자가 활성화됩니다.
     *
     * @tags consents
     * @name UserConsentsControllerUpdateUserConsents
     * @summary 사용자 동의 업데이트
     * @request POST:/v2/users/consents
     * @secure
     */
    userConsentsControllerUpdateUserConsents: (
      data: UpdateUserConsentsDto,
      params: RequestParams = {},
    ) =>
      this.request<UpdateUserConsentsResponseDto, void>({
        path: `/v2/users/consents`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 사용자가 필수 동의 항목에 모두 동의했는지 검증합니다. 앱 실행 시 필수 동의 여부를 확인할 때 사용합니다.
     *
     * @tags consents
     * @name UserConsentsControllerValidateUserConsents
     * @summary 필수 동의 항목 검증
     * @request GET:/v2/users/consents/validate
     * @secure
     */
    userConsentsControllerValidateUserConsents: (params: RequestParams = {}) =>
      this.request<ValidateUserConsentsResponseDto, void>({
        path: `/v2/users/consents/validate`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Store published journey content with images. Client provides title, description, and thumbnail in metadata. If title is not provided, a default title will be generated based on journey date. **Photo Upload:** - Maximum 30 photos allowed per published journey - Client should only upload and send photos that user selected to publish - Do not upload all journey photos - only upload selected photos to save storage
     *
     * @tags journeys
     * @name PublishJourneyControllerPublishJourney
     * @summary Publish a journey
     * @request POST:/v2/journeys/publish
     * @secure
     */
    publishJourneyControllerPublishJourney: (
      data: PublishJourneyRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<PublishJourneyResponseDto, void>({
        path: `/v2/journeys/publish`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns NOT_PUBLISHED, PUBLISHING, PUBLISHED, or FAILED for the given journeyId
     *
     * @tags journeys
     * @name PublishJourneyControllerGetPublishStatus
     * @summary Get publish status for a journey
     * @request GET:/v2/journeys/publish/status/{journeyId}
     */
    publishJourneyControllerGetPublishStatus: (
      journeyId: string,
      params: RequestParams = {},
    ) =>
      this.request<PublishStatusResponseDto, any>({
        path: `/v2/journeys/publish/status/${journeyId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns publish status and server-side publish metadata for the given journeyId
     *
     * @tags journeys
     * @name PublishJourneyControllerGetPublishInfo
     * @summary Get publish info for a journey
     * @request GET:/v2/journeys/publish/info/{journeyId}
     */
    publishJourneyControllerGetPublishInfo: (
      journeyId: string,
      params: RequestParams = {},
    ) =>
      this.request<PublishJourneyInfoResponseDto, any>({
        path: `/v2/journeys/publish/info/${journeyId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Public endpoint to retrieve a paginated list of all published journeys. Optionally filter by userId to get a specific user's published journeys.
     *
     * @tags journeys
     * @name PublishJourneyControllerGetPublishedJourneys
     * @summary Get list of published journeys (public feed)
     * @request GET:/v2/journeys/public
     */
    publishJourneyControllerGetPublishedJourneys: (
      query?: {
        /**
         * Page number (default: 1)
         * @example 1
         */
        page?: number;
        /**
         * Number of items per page (default: 20, max: 100)
         * @example 20
         */
        limit?: number;
        /** Sort order (default: recent) */
        sort?: "recent" | "oldest";
        /**
         * Filter by user ID (optional)
         * @example "507f1f77bcf86cd799439011"
         */
        userId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PublishedJourneysResponseDto, any>({
        path: `/v2/journeys/public`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Public endpoint to retrieve published journey data for rendering. Hidden-by-moderation journeys return success with contentStatus=reported_hidden.
     *
     * @tags journeys
     * @name PublishJourneyControllerGetPublishedJourney
     * @summary Get published journey by public ID
     * @request GET:/v2/journeys/public/{publicId}
     */
    publishJourneyControllerGetPublishedJourney: (
      publicId: string,
      params: RequestParams = {},
    ) =>
      this.request<PublishedJourneyDetailResponseDto, void>({
        path: `/v2/journeys/public/${publicId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Public endpoint to retrieve a published photo with its journey context
     *
     * @tags journeys
     * @name PublishJourneyControllerGetPublishedPhoto
     * @summary Get published photo by photo ID (for SEO)
     * @request GET:/v2/journeys/public/photos/{photoId}
     */
    publishJourneyControllerGetPublishedPhoto: (
      photoId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/v2/journeys/public/photos/${photoId}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Delete a published journey and its associated S3 images. Only the owner can unpublish.
     *
     * @tags journeys
     * @name PublishJourneyControllerUnpublishJourney
     * @summary Unpublish a journey
     * @request DELETE:/v2/journeys/publish/{publicId}
     * @secure
     */
    publishJourneyControllerUnpublishJourney: (
      publicId: string,
      params: RequestParams = {},
    ) =>
      this.request<UnpublishJourneyResponseDto, void>({
        path: `/v2/journeys/publish/${publicId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 게시 시 사용할 제목을 GPT 모델로 자동 생성합니다. Accept-Language 헤더로 언어를 지정할 수 있습니다.
     *
     * @tags journeys
     * @name JourneyTitleControllerGenerateTitle
     * @summary 게시 제목 자동 생성
     * @request POST:/v2/journeys/{journeyId}/title/auto
     * @secure
     */
    journeyTitleControllerGenerateTitle: (
      journeyId: string,
      data: GenerateJourneyTitleRequest,
      params: RequestParams = {},
    ) =>
      this.request<GenerateJourneyTitleResponse, void>({
        path: `/v2/journeys/${journeyId}/title/auto`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Client-side feature to load location names for photos before publishing. **Use case:** - User taps "Load Location Names" button in the app - App sends array of coordinates (lat, lng) from photos, optionally with reverse geocoded names - Optional: Specify journeyId to prevent duplicate enrichment (recommended) - Server calls Google Places Nearby API for each coordinate - AI (GPT-4o-mini) selects the most likely place the user photographed - Returns detailed POI data for each location **AI-Powered Place Selection:** - Google Places API returns nearby places sorted by distance - GPT-4o-mini intelligently selects the most likely photo subject considering: - Distance (closer is usually better) - Place type (landmarks/attractions > infrastructure like parking) - Context (museum 30m away > parking lot 5m away) - Fail-open: If GPT fails, falls back to simple distance-based selection - Complies with ADR 0011 (Fail-open policy for non-critical services) **Duplicate Enrichment Prevention:** - Provide journeyId parameter to track enrichment status - Once a journey is enriched, subsequent requests with the same journeyId will be skipped - Saves API costs and prevents unnecessary duplicate enrichment - Journey locations are final after system processing, so enrichment only needs to happen once - Check `GET /v2/journeys/publish/info/:journeyId` to see if locations are already enriched **Response includes:** - POI name, types, formatted address - Distance from query point (to the POI's actual location) - Rating and user ratings count - Confidence score - Display name (formatted as "POI name, address context") **Cache:** - POI results are cached for 30 days based on rounded coordinates (11m accuracy) - Multiple requests for the same location will use cached data **Rate limit (public):** - Per IP: 30 requests / minute, 300 requests / hour **Example:** User photographed at Sagrada Familia: - Response: "Sagrada Familia, Carrer de Mallorca, Barcelona" - Distance: 5.2m, Confidence: 0.95
     *
     * @tags journeys
     * @name LocationEnrichmentControllerEnrichLocations
     * @summary Enrich locations with POI data using AI-powered place selection
     * @request POST:/v2/journeys/locations/enrich
     */
    locationEnrichmentControllerEnrichLocations: (
      data: EnrichLocationsRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "success" */
          status?: string;
          data?: {
            locations?: {
              query?: {
                /** @example 37.5665 */
                lat?: number;
                /** @example 126.978 */
                lng?: number;
              };
              poi?: {
                /** @example "Gyeongbokgung Palace" */
                name?: string;
                /** @example ["tourist_attraction","point_of_interest"] */
                types?: string[];
                /** @example "Jongno-gu, Seoul, South Korea" */
                formattedAddress?: string;
                location?: {
                  lat?: number;
                  lng?: number;
                };
                /** @example 45.2 */
                distance?: number;
                /** @example 4.6 */
                rating?: number;
                /** @example 12345 */
                userRatingsTotal?: number;
                /** @example "Gyeongbokgung Palace, Jongno-gu, Seoul" */
                displayName?: string;
                /** @example 0.95 */
                confidence?: number;
              } | null;
              /** @example "poi" */
              source?: "poi" | "reverse_geocoding" | "none";
              /** @example true */
              hasSignificantPoi?: boolean;
            }[];
            /** @example 10 */
            totalQueried?: number;
            /** @example 8 */
            poisFound?: number;
          };
        },
        void
      >({
        path: `/v2/journeys/locations/enrich`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve persisted location names from a previous enrichment call. **Use case:** - User enriches locations but closes the app before the process completes - Client can call this endpoint to retrieve previously enriched location names - Returns coordinate → enriched location data mapping (same structure as POST response) **Response:** - isEnriched: boolean indicating if the journey has been enriched - locationNames: object mapping "lat,lng" → enriched location data
     *
     * @tags journeys
     * @name LocationEnrichmentControllerGetLocationNames
     * @summary Get enriched location names for a journey
     * @request GET:/v2/journeys/locations/{journeyId}/location-names
     */
    locationEnrichmentControllerGetLocationNames: (
      journeyId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "success" */
          status?: string;
          data?: {
            /** @example true */
            isEnriched?: boolean;
            /** @example {"41.4036,2.1744":{"name":"Sagrada Familia","displayName":"Sagrada Familia, Barcelona, Spain","types":["tourist_attraction","church","place_of_worship"],"formattedAddress":"Carrer de Mallorca, 401, Barcelona, Spain","distance":5.2,"rating":4.7,"userRatingsTotal":285432,"confidence":0.95}} */
            locationNames?: object;
          };
        },
        any
      >({
        path: `/v2/journeys/locations/${journeyId}/location-names`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Register or update FCM device token for push notifications. Call this after user login.
     *
     * @tags notifications
     * @name NotificationsControllerRegisterFcmToken
     * @summary Register FCM token
     * @request POST:/v2/notifications/fcm-token
     * @secure
     */
    notificationsControllerRegisterFcmToken: (
      data: RegisterFcmTokenDto,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/v2/notifications/fcm-token`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Delete FCM device token. Call this when user logs out or switches account.
     *
     * @tags notifications
     * @name NotificationsControllerDeleteFcmToken
     * @summary Delete FCM token
     * @request DELETE:/v2/notifications/fcm-token
     * @secure
     */
    notificationsControllerDeleteFcmToken: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/v2/notifications/fcm-token`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Enable or disable push notifications
     *
     * @tags notifications
     * @name NotificationsControllerUpdateNotificationSettings
     * @summary Update notification settings
     * @request PATCH:/v2/notifications/settings
     * @secure
     */
    notificationsControllerUpdateNotificationSettings: (
      data: UpdateNotificationSettingsDto,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/v2/notifications/settings`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 콘텐츠 또는 사용자를 신고합니다
     *
     * @tags reports
     * @name ReportsControllerCreateReport
     * @summary 신고 생성
     * @request POST:/v2/reports
     * @secure
     */
    reportsControllerCreateReport: (
      data: CreateReportDto,
      params: RequestParams = {},
    ) =>
      this.request<CreateReportResponseDto, void>({
        path: `/v2/reports`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 특정 대상에 대한 신고 개수를 조회합니다 (인증 필요)
     *
     * @tags reports
     * @name ReportsControllerGetTargetReportCount
     * @summary 특정 대상의 신고 개수 조회
     * @request GET:/v2/reports/target/{targetType}/{targetId}/count
     * @secure
     */
    reportsControllerGetTargetReportCount: (
      targetType: "user" | "published_journey",
      targetId: string,
      params: RequestParams = {},
    ) =>
      this.request<GetTargetReportCountResponseDto, void>({
        path: `/v2/reports/target/${targetType}/${targetId}/count`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reports
     * @name AdminReportsControllerGetReports
     * @summary 신고 목록 조회 (관리자용)
     * @request GET:/v2/admin/reports
     * @secure
     */
    adminReportsControllerGetReports: (
      query?: {
        /**
         * 페이지 번호
         * @example 1
         */
        page?: number;
        /**
         * 페이지당 항목 수
         * @example 20
         */
        limit?: number;
        /** 신고 처리 상태 필터 */
        status?: "pending" | "reviewed" | "resolved" | "rejected";
        /** 신고 대상 타입 필터 */
        targetType?: "user" | "published_journey";
        /** 신고 사유 필터 */
        reason?:
          | "spam"
          | "abuse"
          | "hate"
          | "sexual"
          | "inappropriate"
          | "other";
      },
      params: RequestParams = {},
    ) =>
      this.request<GetReportsResponseDto, any>({
        path: `/v2/admin/reports`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reports
     * @name AdminReportsControllerGetReportStats
     * @summary 신고 통계 조회 (관리자용)
     * @request GET:/v2/admin/reports/stats
     * @secure
     */
    adminReportsControllerGetReportStats: (params: RequestParams = {}) =>
      this.request<GetReportStatsResponseDto, any>({
        path: `/v2/admin/reports/stats`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reports
     * @name AdminReportsControllerGetReport
     * @summary 특정 신고 조회 (관리자용)
     * @request GET:/v2/admin/reports/{reportId}
     * @secure
     */
    adminReportsControllerGetReport: (
      reportId: string,
      params: RequestParams = {},
    ) =>
      this.request<GetReportResponseDto, void>({
        path: `/v2/admin/reports/${reportId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reports
     * @name AdminReportsControllerUpdateReport
     * @summary 신고 업데이트 (관리자용)
     * @request PUT:/v2/admin/reports/{reportId}
     * @secure
     */
    adminReportsControllerUpdateReport: (
      reportId: string,
      data: UpdateReportDto,
      params: RequestParams = {},
    ) =>
      this.request<UpdateReportResponseDto, void>({
        path: `/v2/admin/reports/${reportId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reports
     * @name AdminReportsControllerDeleteReport
     * @summary 신고 삭제 (관리자용)
     * @request DELETE:/v2/admin/reports/{reportId}
     * @secure
     */
    adminReportsControllerDeleteReport: (
      reportId: string,
      params: RequestParams = {},
    ) =>
      this.request<DeleteReportResponseDto, void>({
        path: `/v2/admin/reports/${reportId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description momentbook-worker로 비동기 작업을 요청하고 jobId를 반환합니다.
     *
     * @tags journeys
     * @name JourneyAiControllerCreatePanoramaJob
     * @summary 파노라마(360) 생성 작업 요청
     * @request POST:/v2/journeys/{journeyId}/ai/panorama
     * @secure
     */
    journeyAiControllerCreatePanoramaJob: (
      journeyId: string,
      data: CreateJourneyAiCommonRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<JourneyAiJobResponseDto, any>({
        path: `/v2/journeys/${journeyId}/ai/panorama`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description momentbook-worker로 비동기 작업을 요청하고 jobId를 반환합니다.
     *
     * @tags journeys
     * @name JourneyAiControllerCreateTitleJob
     * @summary 제목 생성 작업 요청
     * @request POST:/v2/journeys/{journeyId}/ai/title
     * @secure
     */
    journeyAiControllerCreateTitleJob: (
      journeyId: string,
      data: CreateJourneyAiCommonRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<JourneyAiJobResponseDto, any>({
        path: `/v2/journeys/${journeyId}/ai/title`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description refresh=1이면 worker에서 최신 상태를 가져와 DB에 반영합니다.
     *
     * @tags journeys
     * @name JourneyAiControllerGetJob
     * @summary AI 작업 상태 조회
     * @request GET:/v2/journeys/{journeyId}/ai/jobs/{jobId}
     * @secure
     */
    journeyAiControllerGetJob: (
      journeyId: string,
      jobId: string,
      query?: {
        /** 1이면 worker에서 상태 갱신 */
        refresh?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<JourneyAiJobResponseDto, any>({
        path: `/v2/journeys/${journeyId}/ai/jobs/${jobId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Generate recap draft from journey GPS samples and photo metadata. Stateless endpoint - does not persist the result.
     *
     * @tags journeys
     * @name JourneyRecapControllerCreateDraft
     * @summary Generate recap draft
     * @request POST:/v2/journeys/recap/draft
     */
    journeyRecapControllerCreateDraft: (
      data: CreateJourneyRecapDraftRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<JourneyRecapDraftResponseDto, any>({
        path: `/v2/journeys/recap/draft`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a presigned URL that allows the client to upload files directly to S3 without exposing AWS credentials
     *
     * @tags uploads
     * @name UploadsControllerGeneratePresignedUrl
     * @summary Generate presigned URL for client-side S3 upload
     * @request POST:/v2/uploads/presign
     * @secure
     */
    uploadsControllerGeneratePresignedUrl: (
      data: PresignUploadRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<PresignUploadResponseDto, void>({
        path: `/v2/uploads/presign`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags apps
     * @name AppsVersionControllerGetVersionPolicy
     * @summary Get app version policy (min supported / latest / store URL)
     * @request GET:/v2/apps/version-policy
     */
    appsVersionControllerGetVersionPolicy: (params: RequestParams = {}) =>
      this.request<VersionPolicyResponseDto, any>({
        path: `/v2/apps/version-policy`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags apps
     * @name AppsVersionControllerCheckVersion
     * @summary Check if app should update (force/soft)
     * @request GET:/v2/apps/check
     */
    appsVersionControllerCheckVersion: (
      query: {
        platform: "ios" | "android";
        /**
         * SemVer like 1.2.3
         * @example "1.8.4"
         */
        version: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<VersionCheckResponseDto, any>({
        path: `/v2/apps/check`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
