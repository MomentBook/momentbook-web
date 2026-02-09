import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Provider } from "next-auth/providers/index";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import {
  exchangeAppleLogin,
  exchangeEmailLogin,
  exchangeGoogleLogin,
  exchangeLogout,
  exchangeRefreshToken,
  type BackendAuthResult,
} from "./backend";

type AuthUserLike = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  mbAuth?: BackendAuthResult;
};

function applyBackendAuthToToken(
  token: JWT,
  backendAuth: BackendAuthResult,
) {
  token.accessToken = backendAuth.accessToken;
  if (backendAuth.refreshToken) {
    token.refreshToken = backendAuth.refreshToken;
  }
  token.accessTokenExpiresAt = backendAuth.accessTokenExpiresAt;
  if (backendAuth.user.userId) {
    token.userId = backendAuth.user.userId;
  }
  if (backendAuth.user.name) {
    token.userName = backendAuth.user.name;
  }
  if (backendAuth.user.email) {
    token.userEmail = backendAuth.user.email;
  }
  if (backendAuth.consents) {
    token.consents = backendAuth.consents;
  }
  if (backendAuth.provider) {
    token.authProvider = backendAuth.provider;
  }
  token.authError = null;
}

const providers: Provider[] = [
  CredentialsProvider({
    name: "Email",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email = credentials?.email?.trim();
      const password = credentials?.password;

      if (!email || !password) {
        return null;
      }

      const backendAuth = await exchangeEmailLogin(email, password);
      if (!backendAuth) {
        return null;
      }

      return {
        id: backendAuth.user.userId ?? backendAuth.user.email ?? "email-user",
        name: backendAuth.user.name,
        email: backendAuth.user.email,
        mbAuth: backendAuth,
      };
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  );
}

if (process.env.APPLE_ID && process.env.APPLE_SECRET) {
  providers.push(
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
  );
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers,
  callbacks: {
    async jwt({ token, user, account }) {
      const userLike = user as AuthUserLike | undefined;
      const userBackendAuth = userLike?.mbAuth;

      if (userBackendAuth) {
        applyBackendAuthToToken(token, userBackendAuth);
      }

      if (account?.provider === "google") {
        const backendAuth = await exchangeGoogleLogin(
          account.access_token,
          account.id_token,
        );

        if (backendAuth) {
          applyBackendAuthToToken(token, backendAuth);
        } else {
          token.authError = "GoogleOAuthExchangeFailed";
        }
      }

      if (account?.provider === "apple") {
        const accountLike = account as Record<string, unknown>;
        const state =
          typeof accountLike.state === "string" ? accountLike.state : undefined;
        const nonce =
          typeof accountLike.nonce === "string" ? accountLike.nonce : undefined;

        const backendAuth = await exchangeAppleLogin(
          account.id_token,
          typeof account.code === "string" ? account.code : undefined,
          { nonce, state },
        );

        if (backendAuth) {
          applyBackendAuthToToken(token, backendAuth);
        } else {
          token.authError = "AppleOAuthExchangeFailed";
        }
      }

      const accessToken = token.accessToken;
      const refreshToken = token.refreshToken;
      const expiresAt = token.accessTokenExpiresAt;

      const hasTokenExpiry =
        typeof expiresAt === "number" && Number.isFinite(expiresAt);
      const shouldRefresh =
        hasTokenExpiry &&
        Date.now() > (expiresAt as number) - 30 * 1000 &&
        typeof refreshToken === "string" &&
        refreshToken.length > 0;

      if (shouldRefresh) {
        const refreshed = await exchangeRefreshToken(refreshToken as string);

        if (refreshed) {
          applyBackendAuthToToken(token, refreshed);
        } else if (typeof accessToken === "string" && accessToken.length > 0) {
          token.authError = "RefreshAccessTokenError";
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: (token.userId as string | null | undefined) ?? null,
        name: (token.userName as string | null | undefined) ?? session.user?.name ?? null,
        email:
          (token.userEmail as string | null | undefined) ??
          session.user?.email ??
          null,
      };

      session.accessToken = (token.accessToken as string | undefined) ?? null;
      session.authError = (token.authError as string | undefined) ?? null;
      session.consents = (token.consents as typeof session.consents) ?? null;

      return session;
    },
  },
  events: {
    async signOut(message) {
      const refreshToken =
        typeof message.token?.refreshToken === "string"
          ? message.token.refreshToken
          : null;
      if (!refreshToken) {
        return;
      }

      await exchangeLogout(refreshToken);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
