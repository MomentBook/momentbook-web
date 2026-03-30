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

export enum SupportedLocale {
  EnUS = "en-US",
  KoKR = "ko-KR",
  JaJP = "ja-JP",
  ZhCN = "zh-CN",
}

export enum OrphanClusterBasis {
  TIME_SPACE = "TIME_SPACE",
  TIME_ONLY = "TIME_ONLY",
}

export enum PlaceNameSource {
  GooglePlaces = "google_places",
  ReverseGeocode = "reverse_geocode",
  UserInput = "user_input",
  AiSuggestion = "ai_suggestion",
}

export enum ClusterEditType {
  REORDER = "REORDER",
  MERGE = "MERGE",
  SPLIT = "SPLIT",
}

export enum RecapMode {
  PHOTO_ONLY = "PHOTO_ONLY",
}

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
   * @example "web"
   */
  platform: "ios" | "android" | "web";
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

export interface LocalDateTimeContextDto {
  /**
   * Local wall-clock datetime without an offset suffix. Null when unknown.
   * @example "2026-03-30T18:20:00"
   */
  localDateTime?: object | null;
  /**
   * UTC offset minutes captured for this local datetime. Null when unknown or when the time is floating local time.
   * @example 540
   */
  utcOffsetMinutes?: object | null;
  /**
   * IANA time zone identifier captured for this local datetime. Null when unknown.
   * @example "Asia/Seoul"
   */
  timeZoneId?: object | null;
  /**
   * Whether this local datetime is offset-aware, floating local time, or completely unknown.
   * @example "offset_aware"
   */
  localDateTimeType: "offset_aware" | "floating_local" | "unknown";
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
  /** Journey-local display context for startedAt. Unknown values are explicit rather than guessed. */
  startedAtLocal: LocalDateTimeContextDto;
  /** Journey-local display context for endedAt. Null when endedAt itself is absent. */
  endedAtLocal?: LocalDateTimeContextDto | null;
  /**
   * Recap stage at publish time. FINALIZED means recap is completed for BI/analytics.
   * @example "FINALIZED"
   */
  recapStage: "NONE" | "FINALIZED";
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

export interface RecapInputSummaryDto {
  id: string;
  timeRange: object;
  photoCount: number;
  photoWithGpsCount: number;
  photoWithoutGpsCount: number;
  photoGpsRatio: number;
  photoTimeRange: object;
}

export interface RecapAlgorithmConfigDto {
  clustering: object;
  computedAt: number;
  processingTimeMs?: number;
}

export interface RecapComputedDto {
  clusters: object;
  quality: object;
  totalClusters: number;
  totalDurationMs: number;
}

export interface PhotoAssignment {
  photoId: string;
  targetClusterId: string;
  positionIndex?: number;
}

export interface ClusterEdit {
  clusterId: string;
  /** @example "REORDER" */
  editType: ClusterEditType;
  details: Record<string, any>;
}

export interface RecapOverrides {
  ops: (
    | ({
        type: "ASSIGN_PHOTO_TO_CLUSTER";
      } & AssignPhotoToClusterOp)
    | ({
        type: "HIDE_PHOTO";
      } & HidePhotoOp)
    | ({
        type: "UNHIDE_PHOTO";
      } & UnhidePhotoOp)
    | ({
        type: "REORDER_PHOTOS_IN_CLUSTER";
      } & ReorderPhotosInClusterOp)
    | ({
        type: "MOVE_BETWEEN_CLUSTERS";
      } & MoveBetweenClustersOp)
    | ({
        type: "REORDER_TIMELINE_BLOCKS";
      } & ReorderTimelineBlocksOp)
  )[];
  hiddenPhotoIds: string[];
  manualAssignments: PhotoAssignment[];
  manualClusterEdits: ClusterEdit[];
  blockOrder?: string[];
}

export interface ClusterTimeDto {
  startAt: number;
  endAt: number;
  durationMs: number;
}

export interface ClusterCenterDto {
  lat: number;
  lng: number;
}

export interface ClusterConfidenceDto {
  score: number;
  reasons: string[];
}

export interface PhotoClusterDto {
  clusterId: string;
  basis: "TIME_SPACE" | "TIME_ONLY";
  time: ClusterTimeDto;
  center?: ClusterCenterDto;
  radiusM?: number;
  locationName?: string;
  /** Optional user impression for this cluster */
  impression?: string;
  confidence: ClusterConfidenceDto;
  photoIds: string[];
}

export interface RecapDraftDto {
  /** @example 3 */
  schemaVersion: number;
  draftId: string;
  inputId: string;
  createdAt: number;
  updatedAt: number;
  inputSummary: RecapInputSummaryDto;
  mode: RecapMode;
  algorithm: RecapAlgorithmConfigDto;
  computed: RecapComputedDto;
  overrides: RecapOverrides;
  /** Legacy top-level alias of computed.clusters.photoClusters (v3 contract) */
  photoClusters?: PhotoClusterDto[];
}

export interface JourneyRecapExportMetaDto {
  journeyId: string;
  startedAt: number;
  endedAt?: number;
  /**
   * Legacy GPS sample count
   * @example 0
   */
  locationSampleCount?: number;
  /** @example 128 */
  photoCount: number;
  /** Journey-local display context for startedAt. Unknown values are returned explicitly when legacy data does not contain local-time metadata. */
  startedAtLocal: LocalDateTimeContextDto;
  /** Journey-local display context for endedAt. Null when endedAt itself is absent. */
  endedAtLocal?: LocalDateTimeContextDto | null;
}

export interface JourneyRecapExportTimeRangeDto {
  startAt: number;
  endAt: number;
  durationMs: number;
  /** Local display context for startAt. Unknown values are explicit rather than guessed. */
  startLocal: LocalDateTimeContextDto;
  /** Local display context for endAt. Unknown values are explicit rather than guessed. */
  endLocal: LocalDateTimeContextDto;
}

export interface LocalizedNames {
  /** @example "Seoul" */
  "en-US": string;
  /** @example "서울" */
  "ko-KR"?: string;
  /** @example "東京" */
  "ja-JP"?: string;
  /** @example "首尔" */
  "zh-CN"?: string;
}

export interface LatLng {
  /** @example 37.5665 */
  lat: number;
  /** @example 126.978 */
  lng: number;
}

export interface PlaceInfo {
  /** Localized place names keyed by SupportedLocale */
  names: LocalizedNames;
  /**
   * Legacy alias of names
   * @deprecated
   */
  localizedNames?: LocalizedNames;
  /**
   * Resolved display label for convenience
   * @deprecated
   * @example "Gyeongbokgung Palace"
   */
  displayName?: string;
  /** @example "google_places" */
  source: PlaceNameSource;
  /** @example "ChIJm7u-8H7raDURzR3JzA8pW4M" */
  placeId?: string;
  coordinates?: LatLng;
  /**
   * Unix timestamp in milliseconds
   * @example 1739412345678
   */
  resolvedAt: number;
}

export interface JourneyRecapExportLocationDto {
  /** @example "Gyeongbokgung Palace" */
  displayName?: string;
  /** @example 37.579617 */
  lat?: number;
  /** @example 126.977041 */
  lng?: number;
  /** @example 40 */
  radiusM?: number;
  place?: PlaceInfo;
}

export interface JourneyRecapExportTimelineItemDto {
  /**
   * External timeline item ID (internal cluster IDs are masked)
   * @format uuid
   */
  timelineId: string;
  type: "PHOTO_GROUP" | "ORPHAN_PHOTO";
  time: JourneyRecapExportTimeRangeDto;
  location?: JourneyRecapExportLocationDto;
  /** Optional user impression for this cluster */
  impression?: string;
  /** External photo IDs mapped from internal IDs */
  photoIds: string[];
}

export interface JourneyRecapExportPhotoLocationDto {
  /** @example 37.5665 */
  lat: number;
  /** @example 126.978 */
  lng: number;
}

export interface CaptureTimeContextDto {
  /**
   * Local wall-clock datetime without an offset suffix. Null when unknown.
   * @example "2026-03-30T18:20:00"
   */
  localDateTime?: object | null;
  /**
   * UTC offset minutes captured for this local datetime. Null when unknown or when the time is floating local time.
   * @example 540
   */
  utcOffsetMinutes?: object | null;
  /**
   * IANA time zone identifier captured for this local datetime. Null when unknown.
   * @example "Asia/Seoul"
   */
  timeZoneId?: object | null;
  /**
   * Whether this local datetime is offset-aware, floating local time, or completely unknown.
   * @example "offset_aware"
   */
  localDateTimeType: "offset_aware" | "floating_local" | "unknown";
  /**
   * Provenance of the time zone or offset information.
   * @example "exif_explicit_offset"
   */
  timeZoneSource:
    | "exif_explicit_offset"
    | "gps_derived"
    | "user_input"
    | "unknown";
}

export interface JourneyRecapExportPhotoDto {
  /**
   * External photo ID (internal identifier is masked)
   * @format uuid
   */
  photoId: string;
  takenAt: number;
  /** Portable archive path (client photo URI / archive key) */
  archivePath: string;
  hasGps: boolean;
  location?: JourneyRecapExportPhotoLocationDto;
  width?: number;
  height?: number;
  /** Original capture local-time context preserved from ingest. Unknown values are explicit. */
  captureTime: CaptureTimeContextDto;
}

export interface JourneyRecapExportDraftDto {
  schemaVersion: number;
  draftId: string;
  mode: RecapMode;
  createdAt: number;
  updatedAt: number;
  journey: JourneyRecapExportMetaDto;
  timeline: JourneyRecapExportTimelineItemDto[];
  photos: JourneyRecapExportPhotoDto[];
}

export interface PublishedJourneyTimeRangeDto {
  /** Absolute range start timestamp (ms) */
  startAt: number;
  /** Absolute range end timestamp (ms) */
  endAt: number;
  /** Absolute duration in milliseconds */
  durationMs: number;
  /** Journey-local display context for startAt. Unknown values are explicit rather than guessed. */
  startLocal: LocalDateTimeContextDto;
  /** Journey-local display context for endAt. Unknown values are explicit rather than guessed. */
  endLocal: LocalDateTimeContextDto;
}

export interface RecapTimeRange {
  startAt: number;
  endAt: number;
  durationMs: number;
}

export interface ClusterConfidence {
  /** @example 0.92 */
  score: number;
  /** @example ["density_high","time_stable"] */
  reasons: string[];
}

export interface RecapOperationFrom {
  clusterId?: string;
}

export interface RecapOperationTo {
  clusterId: string;
  positionIndex?: number;
}

export interface AssignPhotoToClusterOp {
  opId: string;
  /** @example "ASSIGN_PHOTO_TO_CLUSTER" */
  type: "ASSIGN_PHOTO_TO_CLUSTER";
  photoId: string;
  from: RecapOperationFrom;
  to: RecapOperationTo;
  atMs: number;
}

export interface HidePhotoOp {
  opId: string;
  /** @example "HIDE_PHOTO" */
  type: "HIDE_PHOTO";
  photoId: string;
  atMs: number;
  reason?: string;
}

export interface UnhidePhotoOp {
  opId: string;
  /** @example "UNHIDE_PHOTO" */
  type: "UNHIDE_PHOTO";
  photoId: string;
  atMs: number;
}

export interface ReorderPhotosInClusterOp {
  opId: string;
  /** @example "REORDER_PHOTOS_IN_CLUSTER" */
  type: "REORDER_PHOTOS_IN_CLUSTER";
  clusterId: string;
  photoOrder: string[];
  atMs: number;
}

export interface MoveBetweenClustersOp {
  opId: string;
  /** @example "MOVE_BETWEEN_CLUSTERS" */
  type: "MOVE_BETWEEN_CLUSTERS";
  photoId: string;
  fromClusterId: string;
  toClusterId: string;
  atMs: number;
}

export interface ReorderTimelineBlocksOp {
  opId: string;
  /** @example "REORDER_TIMELINE_BLOCKS" */
  type: "REORDER_TIMELINE_BLOCKS";
  blockOrder: string[];
  atMs: number;
}

export interface PhotoGroupBlock {
  blockId: string;
  /** @example "PHOTO_GROUP" */
  type: "PHOTO_GROUP";
  time: RecapTimeRange;
  location?: LatLng;
  place?: PlaceInfo;
  /**
   * Use place.names instead
   * @deprecated
   */
  placeName?: string;
  photos: string[];
  hiddenPhotos: string[];
  /** @example "TIME_ONLY" */
  basis: OrphanClusterBasis;
}

export interface OrphanCluster {
  clusterId: string;
  /** @example "TIME_SPACE" */
  basis: "TIME_SPACE" | "TIME_ONLY";
  time: RecapTimeRange;
  center?: LatLng;
  /** @example 42 */
  radiusM?: number;
  place?: PlaceInfo;
  /**
   * Use place.names instead
   * @deprecated
   * @example "Gyeongbokgung Palace"
   */
  locationName?: string;
  confidence: ClusterConfidence;
  photoIds: string[];
}

export interface OrphanPhoto {
  photoId: string;
  /** @example ["no_cluster_match"] */
  reasons: string[];
}

export interface RecapUnmappedLeftovers {
  clusters: OrphanCluster[];
  photos: OrphanPhoto[];
}

export interface UnassignedPhoto {
  photoId: string;
  takenAt: number;
  /** @example "no_gps" */
  reason: "no_gps";
  originalClusterId?: string;
}

export interface RecapFinalStats {
  totalBlocks: number;
  totalPhotos: number;
  hiddenPhotos: number;
  unassignedPhotos: number;
  startTime: number;
  endTime: number;
  durationMs: number;
}

export interface RecapFinal {
  timelineBlocks: PhotoGroupBlock[];
  leftoverPhotos: RecapUnmappedLeftovers;
  /**
   * Legacy alias. Use leftoverPhotos instead
   * @deprecated
   */
  unmappedLeftovers?: RecapUnmappedLeftovers;
  /**
   * Legacy alias. Use leftoverPhotos.photos instead
   * @deprecated
   */
  orphanPhotos?: OrphanPhoto[];
  unassignedPhotos: UnassignedPhoto[];
  stats: RecapFinalStats;
}

export interface SupportedLocaleValue {
  /** @example "ko-KR" */
  value: SupportedLocale;
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
  /** Photo captured time (ms) */
  takenAt?: number;
  /** Optional location coordinates */
  location?: JourneyImageLocationDto;
  /** Optional human-friendly location label */
  locationName?: string;
  /** Original capture local-time context preserved from ingest. Unknown values should be sent explicitly rather than guessed. */
  captureTime?: CaptureTimeContextDto;
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
   * Primary language of title/description/impressions. Used as the source language for server-side localization. Supported values: ko, en, ja, zh, es, pt, fr, th, vi.
   * @example "ko"
   */
  sourceLanguage?: string;
  /**
   * Thumbnail photo URL. Must match one of the published image URLs.
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
  /** Optional journey-local context for startedAt. Use unknown/null rather than guessing when the local context cannot be determined. */
  startedAtLocal?: LocalDateTimeContextDto;
  /** Optional journey-local context for endedAt. Use unknown/null rather than guessing when the local context cannot be determined. */
  endedAtLocal?: LocalDateTimeContextDto;
  /** RecapDraft payload. Supports computed format and export-safe format. */
  recapDraft: RecapDraftDto | JourneyRecapExportDraftDto;
  /**
   * Recap stage. Publish requires FINALIZED. BI/analytics should treat FINALIZED as "recap completed".
   * @example "FINALIZED"
   */
  recapStage: "FINALIZED";
  /**
   * Photo reference to published image URL mapping. For computed drafts, use the client photo identifier/local URI. For export-safe drafts, either photos[].archivePath or photos[].photoId may be used as the key.
   * @example {"file:///local/photo1.jpg":"https://yourthink.s3.ap-northeast-2.amazonaws.com/journeys/user123/img1.jpg","file:///local/photo2.jpg":"https://yourthink.s3.ap-northeast-2.amazonaws.com/journeys/user123/img2.jpg"}
   */
  photoUrlMapping: object;
  /** Array of journey images to publish (max 100). Client may send the full published photo set for the journey. */
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
    /** Whether the journey is currently published */
    published?: boolean;
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
    published?: boolean;
    isPublishing?: boolean;
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

export interface PublishedJourneyLocalizationEntryDto {
  /**
   * BCP 47 locale for the localized content
   * @example "pt-BR"
   */
  locale: string;
  /**
   * Primary language code
   * @example "pt"
   */
  languageCode: string;
  /**
   * Country code used for this localization
   * @example "BR"
   */
  countryCode: string;
  /**
   * Human-friendly language label
   * @example "Portuguese"
   */
  languageName: string;
  /**
   * Localized journey title
   * @example "서울에서 보낸 봄날"
   */
  title?: string;
  /**
   * Localized journey description
   * @example "도시의 공기와 강변의 저녁빛을 천천히 담아낸 산책 기록"
   */
  description?: string;
  /**
   * Localized hashtags derived from title, description, and impressions
   * @example ["#서울여행","#한강산책","#봄저녁"]
   */
  hashtags: string[];
}

export interface PublishedJourneyClusterLocalizationEntryDto {
  /**
   * BCP 47 locale for the localized impression
   * @example "ja-JP"
   */
  locale: string;
  /**
   * Primary language code
   * @example "ja"
   */
  languageCode: string;
  /**
   * Country code used for this localization
   * @example "JP"
   */
  countryCode: string;
  /**
   * Human-friendly language label
   * @example "Japanese"
   */
  languageName: string;
  /**
   * Localized cluster impression
   * @example "川沿いの空気が静かで心地よかった"
   */
  impression?: string;
}

export interface PublishedJourneyClusterLocalizedImpressionsDto {
  /**
   * Cluster ID from the published journey timeline
   * @example "timeline-1"
   */
  clusterId: string;
  /** Localized impressions for each supported locale */
  translations: PublishedJourneyClusterLocalizationEntryDto[];
}

export interface PublishedJourneyLocalizedContentDto {
  /**
   * Source language used for localization generation
   * @example "ko"
   */
  sourceLanguage: string;
  /**
   * ISO timestamp when localized content was generated
   * @example "2026-03-28T10:15:00.000Z"
   */
  generatedAt: string;
  /** Localized journey title, description, and hashtags for each supported locale: ko-KR, en-US, ja-JP, zh-CN, es-ES, pt-BR, fr-FR, th-TH, vi-VN */
  entries: PublishedJourneyLocalizationEntryDto[];
  /** Localized cluster impressions for each supported locale: ko-KR, en-US, ja-JP, zh-CN, es-ES, pt-BR, fr-FR, th-TH, vi-VN */
  clusterImpressions: PublishedJourneyClusterLocalizedImpressionsDto[];
}

export interface PublishedJourneyDetailDto {
  /**
   * Public ID for sharing
   * @example "abc123xyz789"
   */
  publicId: string;
  /** Author user ID */
  userId: string;
  /** Public author profile (minimal) */
  author: {
    userId?: string;
    name?: string | null;
    picture?: string | null;
  };
  /** Journey start timestamp (ms) */
  startedAt: number;
  /** Journey end timestamp (ms) */
  endedAt?: number;
  /** Journey-local display context for startedAt. Unknown values are explicit rather than guessed. */
  startedAtLocal: LocalDateTimeContextDto;
  /** Journey-local display context for endedAt. Null when endedAt itself is absent. */
  endedAtLocal?: LocalDateTimeContextDto | null;
  /** Journey title */
  title?: string;
  /** Journey description */
  description?: string;
  /** Thumbnail URL for preview */
  thumbnailUrl?: string;
  /** Share URL for web route */
  shareUrl?: string;
  /** Journey mode (photo-only) */
  mode: "PHOTO_ONLY";
  /** Total photo count */
  photoCount: number;
  /** Published images with S3 URLs */
  images: string[];
  /** Clusters for rendering (stops + orphan clusters) */
  clusters: string[];
  /** Timeline blocks for public viewer rendering */
  timeline: {
    clusterId?: string;
    type?: "STOP" | "MOVE" | "ORPHAN";
    time?: PublishedJourneyTimeRangeDto;
    center?: {
      lat?: number;
      lng?: number;
    };
    locationName?: string;
    impression?: string;
    photoIds?: string[];
  }[];
  /** Export-safe recap draft summary for public rendering */
  recapDraft: {
    timeline?: {
      clusterId?: string;
      type?: "STOP" | "MOVE" | "ORPHAN";
      time?: PublishedJourneyTimeRangeDto;
      center?: {
        lat?: number;
        lng?: number;
      };
      locationName?: string;
      impression?: string;
      photoIds?: string[];
    }[];
    photoCount?: number;
    imageCount?: number;
  };
  /** Server-generated localized title/description/hashtags and localized cluster impressions */
  localizedContent?: PublishedJourneyLocalizedContentDto;
  /** Published timestamp */
  publishedAt: string;
  /** Creation timestamp */
  createdAt: string;
  /**
   * Web SEO review status
   * @example "APPROVED"
   */
  webReviewStatus?: "PENDING" | "APPROVED" | "REJECTED";
  /**
   * Content availability status for rendering
   * @example "available"
   */
  contentStatus?:
    | "available"
    | "reported_hidden"
    | "web_review_pending"
    | "web_review_rejected";
  /**
   * Visibility stored in DB
   * @example "public"
   */
  visibility: "public" | "hidden";
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
  /** Optional local-time context for the journey start. Use unknown/null rather than guessing when the local context cannot be determined. */
  startedAtLocal?: LocalDateTimeContextDto;
  /** Optional local-time context for the journey end. Use unknown/null rather than guessing when the local context cannot be determined. */
  endedAtLocal?: LocalDateTimeContextDto;
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
  /** Optional original capture local-time context. Use this to preserve explicit offsets, IANA zones, or floating local wall-clock values from ingest. */
  captureTime?: CaptureTimeContextDto;
}

export interface CreateJourneyRecapDraftRequestDto {
  journey: JourneyRecapInputDto;
  photos: PhotoMetaInputDto[];
}

export interface JourneyRecapDraftResponseDataDto {
  /** Export-safe recap draft payload */
  recapDraft: JourneyRecapExportDraftDto;
}

export interface JourneyRecapDraftResponseDto {
  /** @example "success" */
  status: string;
  data: JourneyRecapDraftResponseDataDto;
}

export interface JourneyRecapDraftCorrectionOptionsDto {
  /**
   * Spatial outlier threshold multiplier on cluster radius (default: 2.0)
   * @example 2
   */
  spatialOutlierRadiusMultiplier?: number;
  /**
   * Absolute max distance (meters) for outlier detection (default: 500)
   * @example 500
   */
  spatialOutlierAbsoluteMaxM?: number;
  /**
   * Minimum temporal score improvement to reassign a photo (default: 0.3)
   * @example 0.3
   */
  minTemporalImprovement?: number;
  /**
   * Maximum temporal gap (ms) for temporal affinity matching (default: 45 minutes)
   * @example 2700000
   */
  maxTemporalGapMs?: number;
  /**
   * Cluster photo count threshold (<=) to treat as small cluster (default: 2)
   * @example 2
   */
  smallClusterThreshold?: number;
  /**
   * Minimum temporal score to mark small-cluster photo as outlier candidate (default: 0.7)
   * @example 0.7
   */
  smallClusterTemporalThreshold?: number;
  /**
   * Temporal window (ms) to count nearby photos in target cluster (default: 15 minutes)
   * @example 900000
   */
  densityWindowMs?: number;
  /**
   * Minimum nearby photos in target cluster to allow reassignment (default: 1)
   * @example 1
   */
  minNearbyPhotos?: number;
}

export interface CorrectJourneyRecapDraftRequestDto {
  /** Export-safe recap draft payload from /v2/journeys/recap/draft response */
  recapDraft: JourneyRecapExportDraftDto;
  /** Optional correction tuning parameters */
  options?: JourneyRecapDraftCorrectionOptionsDto;
}

export interface JourneyRecapDraftCorrectionStatsDto {
  /** @example 82 */
  totalPhotosAnalyzed: number;
  /** @example 4 */
  outlierCandidatesDetected: number;
  /**
   * Deprecated alias of outlierCandidatesDetected for backward compatibility
   * @deprecated
   * @example 4
   */
  spatialOutliersDetected?: number;
  /** @example 2 */
  photosReassigned: number;
  /** @example 3 */
  clustersAffected: number;
  /** @example 1 */
  emptyClustersPruned: number;
}

export interface JourneyRecapDraftCorrectionSummaryDto {
  /**
   * Whether at least one photo was reassigned
   * @example true
   */
  applied: boolean;
  stats: JourneyRecapDraftCorrectionStatsDto;
}

export interface JourneyRecapCorrectedDraftResponseDataDto {
  /** Export-safe recap draft payload after GPS outlier correction */
  recapDraft: JourneyRecapExportDraftDto;
  correction: JourneyRecapDraftCorrectionSummaryDto;
}

export interface JourneyRecapCorrectedDraftResponseDto {
  /** @example "success" */
  status: string;
  data: JourneyRecapCorrectedDraftResponseDataDto;
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
 * @version 2.1.18
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
        /**
         * Optional response language for localized title/description. Accepts language code or locale: ko, en, ja, zh, es, pt, fr, th, vi, ko-KR, pt-BR, etc.
         * @example "pt"
         */
        lang?: string;
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
     * @description Store published journey content with images. Client provides title, description, and thumbnail in metadata. If title is not provided, a default title will be generated based on journey date. The server generates localized title/description/hashtags and localized cluster impressions for supported locales as a required part of the publish transaction. **Photo Upload:** - Maximum 100 photos allowed per published journey - Client may send the full published photo set for the journey - recapDraft may reference only a subset of images[], but every recapDraft photo must exist in images[] **Publish Stage Contract:** - recapStage must be FINALIZED - Publish fails if localization generation cannot be completed
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
     * @description Returns publish booleans and server-side publish metadata for the given journeyId
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
        /**
         * Optional response language for localized title/description/impressions. Accepts language code or locale: ko, en, ja, zh, es, pt, fr, th, vi, ko-KR, pt-BR, etc.
         * @example "ja"
         */
        lang?: string;
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
     * @description Public endpoint to retrieve published journey data for rendering. Includes DB visibility and returns success for hidden journeys with contentStatus=reported_hidden.
     *
     * @tags journeys
     * @name PublishJourneyControllerGetPublishedJourney
     * @summary Get published journey by public ID
     * @request GET:/v2/journeys/public/{publicId}
     */
    publishJourneyControllerGetPublishedJourney: (
      publicId: string,
      query?: {
        /**
         * Optional response language for localized title/description/impressions. Accepts language code or locale: ko, en, ja, zh, es, pt, fr, th, vi, ko-KR, pt-BR, etc.
         * @example "ko"
         */
        lang?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PublishedJourneyDetailResponseDto, void>({
        path: `/v2/journeys/public/${publicId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Public endpoint to retrieve viewer payload with server-side policy branching by viewer=web|app. web returns full payload only when webReviewStatus is APPROVED; app can return immediately after publish while still respecting moderation visibility.
     *
     * @tags journeys
     * @name PublishJourneyControllerGetPublishedJourneyViewer
     * @summary Get public journey viewer payload with viewer policy
     * @request GET:/v2/journeys/public/{publicId}/viewer
     */
    publishJourneyControllerGetPublishedJourneyViewer: (
      publicId: string,
      query: {
        /** Viewer channel policy selector */
        viewer: "web" | "app";
        /**
         * Optional response language for localized title/description/impressions. Accepts language code or locale: ko, en, ja, zh, es, pt, fr, th, vi, ko-KR, pt-BR, etc.
         * @example "fr"
         */
        lang?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PublishedJourneyDetailResponseDto, void>({
        path: `/v2/journeys/public/${publicId}/viewer`,
        method: "GET",
        query: query,
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
      query?: {
        /**
         * Optional response language for localized title/description on the parent journey metadata. Accepts language code or locale: ko, en, ja, zh, es, pt, fr, th, vi, ko-KR, pt-BR, etc.
         * @example "es"
         */
        lang?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/v2/journeys/public/photos/${photoId}`,
        method: "GET",
        query: query,
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
     * @description Generate photo-only recap draft from recap input metadata and photo EXIF metadata. Returns export-safe payload only. Internal diagnostics are stored server-side.
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
     * @description Runs post-processing GPS outlier correction statelessly. Requires recapDraft payload from /v2/journeys/recap/draft response and returns export-safe payload.
     *
     * @tags journeys
     * @name JourneyRecapControllerCorrectGpsOutliers
     * @summary Correct GPS outlier photos in recap draft
     * @request POST:/v2/journeys/recap/draft/correct-gps-outliers
     */
    journeyRecapControllerCorrectGpsOutliers: (
      data: CorrectJourneyRecapDraftRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<JourneyRecapCorrectedDraftResponseDto, any>({
        path: `/v2/journeys/recap/draft/correct-gps-outliers`,
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
