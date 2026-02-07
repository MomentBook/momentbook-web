"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import type { Language } from "@/lib/i18n/config";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import styles from "./HeaderProfileMenu.module.scss";

type MenuLabels = {
  journeys: string;
  login: string;
  signup: string;
  logout: string;
  unknownUser: string;
};

const labelsByLanguage: Record<string, MenuLabels> = {
  ko: {
    journeys: "여정 보기",
    login: "로그인",
    signup: "회원가입",
    logout: "로그아웃",
    unknownUser: "사용자",
  },
  en: {
    journeys: "My journeys",
    login: "Sign in",
    signup: "Create account",
    logout: "Sign out",
    unknownUser: "User",
  },
  ja: {
    journeys: "自分の旅",
    login: "ログイン",
    signup: "新規登録",
    logout: "ログアウト",
    unknownUser: "ユーザー",
  },
  zh: {
    journeys: "我的行程",
    login: "登录",
    signup: "注册",
    logout: "退出登录",
    unknownUser: "用户",
  },
  es: {
    journeys: "Mis viajes",
    login: "Iniciar sesion",
    signup: "Crear cuenta",
    logout: "Cerrar sesion",
    unknownUser: "Usuario",
  },
  pt: {
    journeys: "Minhas jornadas",
    login: "Entrar",
    signup: "Criar conta",
    logout: "Sair",
    unknownUser: "Usuario",
  },
  fr: {
    journeys: "Mes voyages",
    login: "Se connecter",
    signup: "Creer un compte",
    logout: "Se deconnecter",
    unknownUser: "Utilisateur",
  },
  th: {
    journeys: "ทริปของฉัน",
    login: "เข้าสู่ระบบ",
    signup: "สมัครสมาชิก",
    logout: "ออกจากระบบ",
    unknownUser: "ผู้ใช้",
  },
  vi: {
    journeys: "Hanh trinh cua toi",
    login: "Dang nhap",
    signup: "Tao tai khoan",
    logout: "Dang xuat",
    unknownUser: "Nguoi dung",
  },
};

function readText(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function HeaderProfileMenu({ lang }: { lang: Language }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [publicPicture, setPublicPicture] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const labels = labelsByLanguage[lang] ?? labelsByLanguage.en;
  const isAuthenticated = status === "authenticated";
  const userName = session?.user?.name?.trim() || labels.unknownUser;
  const userEmail = session?.user?.email?.trim() || "";
  const userId = session?.user?.id ?? null;
  const sessionPicture = readText(session?.user?.image);
  const resolvedPicture = sessionPicture ?? publicPicture;

  const returnUrl =
    pathname && pathname.startsWith("/")
      ? pathname
      : `/${lang}/journeys`;

  const loginHref = `/${lang}/login?returnUrl=${encodeURIComponent(returnUrl)}`;
  const signupHref = `/${lang}/login/signup?returnUrl=${encodeURIComponent(returnUrl)}`;
  const journeysHref = userId ? `/${lang}/users/${encodeURIComponent(userId)}` : null;

  useEffect(() => {
    if (!isAuthenticated || !userId) {
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");
    if (!baseUrl) {
      return;
    }

    const controller = new AbortController();

    const fetchPicture = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/v2/users/public/${encodeURIComponent(userId)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          return;
        }

        const payload = (await response.json().catch(() => null)) as
          | { data?: { picture?: string } }
          | null;
        const picture = readText(payload?.data?.picture);

        setPublicPicture(picture);
      } catch {
        // noop
      }
    };

    void fetchPicture();

    return () => {
      controller.abort();
    };
  }, [isAuthenticated, userId]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    if (isSigningOut) {
      return;
    }

    setIsSigningOut(true);
    try {
      setIsOpen(false);
      await signOut({ callbackUrl: `/${lang}` });
    } catch {
      setIsSigningOut(false);
    }
  };

  if (status === "loading") {
    return <span className={styles.placeholder} aria-hidden="true" />;
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={isAuthenticated ? labels.journeys : labels.login}
      >
        {isAuthenticated ? (
          <ProfileAvatar
            name={userName}
            picture={resolvedPicture}
            size="header"
          />
        ) : (
          <span className={styles.icon} aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21a8 8 0 1 0-16 0" />
              <circle cx="12" cy="8" r="4" />
            </svg>
          </span>
        )}
      </button>

      {isOpen ? (
        <div className={styles.menu} role="menu">
          {isAuthenticated ? (
            <>
              <div className={styles.identity}>
                <p className={styles.name}>{userName}</p>
                {userEmail ? <p className={styles.email}>{userEmail}</p> : null}
              </div>

              <div className={styles.divider} />

              {journeysHref ? (
                <Link
                  href={journeysHref}
                  className={styles.item}
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  {labels.journeys}
                </Link>
              ) : (
                <span className={`${styles.item} ${styles.disabled}`} aria-disabled="true">
                  {labels.journeys}
                </span>
              )}

              <button
                type="button"
                className={`${styles.item} ${styles.danger}`}
                role="menuitem"
                onClick={handleSignOut}
                disabled={isSigningOut}
              >
                {labels.logout}
              </button>
            </>
          ) : (
            <>
              <Link
                href={loginHref}
                className={styles.item}
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                {labels.login}
              </Link>
              <Link
                href={signupHref}
                className={styles.item}
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                {labels.signup}
              </Link>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
