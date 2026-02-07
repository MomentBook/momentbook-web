"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import type { Language } from "@/lib/i18n/config";
import styles from "./HeaderProfileMenu.module.scss";

type MenuLabels = {
  profile: string;
  journeys: string;
  login: string;
  signup: string;
  logout: string;
  unknownUser: string;
};

const labelsByLanguage: Record<string, MenuLabels> = {
  ko: {
    profile: "회원정보",
    journeys: "여정 보기",
    login: "로그인",
    signup: "회원가입",
    logout: "로그아웃",
    unknownUser: "사용자",
  },
  en: {
    profile: "Profile",
    journeys: "Journeys",
    login: "Sign in",
    signup: "Create account",
    logout: "Sign out",
    unknownUser: "User",
  },
  ja: {
    profile: "プロフィール",
    journeys: "旅を見る",
    login: "ログイン",
    signup: "新規登録",
    logout: "ログアウト",
    unknownUser: "ユーザー",
  },
  zh: {
    profile: "个人资料",
    journeys: "查看行程",
    login: "登录",
    signup: "注册",
    logout: "退出登录",
    unknownUser: "用户",
  },
  es: {
    profile: "Perfil",
    journeys: "Ver viajes",
    login: "Iniciar sesion",
    signup: "Crear cuenta",
    logout: "Cerrar sesion",
    unknownUser: "Usuario",
  },
  pt: {
    profile: "Perfil",
    journeys: "Ver jornadas",
    login: "Entrar",
    signup: "Criar conta",
    logout: "Sair",
    unknownUser: "Usuario",
  },
  fr: {
    profile: "Profil",
    journeys: "Voir les voyages",
    login: "Se connecter",
    signup: "Creer un compte",
    logout: "Se deconnecter",
    unknownUser: "Utilisateur",
  },
  th: {
    profile: "ข้อมูลโปรไฟล์",
    journeys: "ดูทริป",
    login: "เข้าสู่ระบบ",
    signup: "สมัครสมาชิก",
    logout: "ออกจากระบบ",
    unknownUser: "ผู้ใช้",
  },
  vi: {
    profile: "Ho so",
    journeys: "Xem hanh trinh",
    login: "Dang nhap",
    signup: "Tao tai khoan",
    logout: "Dang xuat",
    unknownUser: "Nguoi dung",
  },
};

function getInitial(name?: string | null, email?: string | null) {
  const seed = (name ?? email ?? "").trim();
  if (!seed) {
    return "?";
  }
  return seed.charAt(0).toUpperCase();
}

export function HeaderProfileMenu({ lang }: { lang: Language }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const labels = labelsByLanguage[lang] ?? labelsByLanguage.en;
  const isAuthenticated = status === "authenticated";
  const userName = session?.user?.name?.trim() || labels.unknownUser;
  const userEmail = session?.user?.email?.trim() || "";
  const userId = session?.user?.id ?? null;
  const avatarInitial = getInitial(session?.user?.name, session?.user?.email);

  const returnUrl = useMemo(() => {
    if (pathname && pathname.startsWith("/")) {
      const query = searchParams.toString();
      return query ? `${pathname}?${query}` : pathname;
    }
    return `/${lang}/journeys`;
  }, [lang, pathname, searchParams]);

  const loginHref = `/${lang}/login?returnUrl=${encodeURIComponent(returnUrl)}`;
  const signupHref = `/${lang}/login/signup?returnUrl=${encodeURIComponent(returnUrl)}`;
  const profileHref = userId ? `/${lang}/users/${encodeURIComponent(userId)}` : null;
  const journeysHref = `/${lang}/journeys`;

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
        aria-label={isAuthenticated ? labels.profile : labels.login}
      >
        {isAuthenticated ? (
          <span className={styles.avatar}>{avatarInitial}</span>
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

              {profileHref ? (
                <Link
                  href={profileHref}
                  className={styles.item}
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  {labels.profile}
                </Link>
              ) : (
                <span className={`${styles.item} ${styles.disabled}`} aria-disabled="true">
                  {labels.profile}
                </span>
              )}

              <Link
                href={journeysHref}
                className={styles.item}
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                {labels.journeys}
              </Link>

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
