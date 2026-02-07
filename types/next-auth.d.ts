import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string | null;
    authError: string | null;
    user: DefaultSession["user"] & {
      id: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpiresAt?: number;
    userId?: string | null;
    userName?: string | null;
    userEmail?: string | null;
    authError?: string | null;
  }
}
