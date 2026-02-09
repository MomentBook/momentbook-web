import type { DefaultSession } from "next-auth";

type SessionConsentState = {
  isAllRequiredConsented: boolean;
  missingRequiredConsents: string[];
  requiresAction: boolean;
};

declare module "next-auth" {
  interface Session {
    accessToken: string | null;
    authError: string | null;
    consents: SessionConsentState | null;
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
    consents?: SessionConsentState | null;
    authProvider?: string | null;
    authError?: string | null;
  }
}
