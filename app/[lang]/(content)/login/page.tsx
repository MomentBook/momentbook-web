"use client";

import { Suspense, useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import styles from "./auth.module.scss";
import { normalizeEmailInput, sanitizeReturnUrl } from "./auth-utils";
import type { Language } from "@/lib/i18n/config";

type LoginLabels = {
  title: string;
  subtitle: string;
  reportSubtitle: string;
  emailLabel: string;
  passwordLabel: string;
  submit: string;
  submitting: string;
  withGoogle: string;
  withApple: string;
  divider: string;
  forgotPassword: string;
  signupHint: string;
  signupLink: string;
  invalidInput: string;
  loginFailed: string;
};

const labelsMap: Partial<Record<Language, LoginLabels>> & {
  en: LoginLabels;
} = {
  en: {
    title: "Sign in",
    subtitle: "Access your account with email or a social provider.",
    reportSubtitle: "Sign in to continue and submit your report.",
    emailLabel: "Email",
    passwordLabel: "Password",
    submit: "Sign in",
    submitting: "Signing in...",
    withGoogle: "Continue with Google",
    withApple: "Continue with Apple",
    divider: "or",
    forgotPassword: "Forgot password?",
    signupHint: "Don't have an account?",
    signupLink: "Create one",
    invalidInput: "Please enter email and password.",
    loginFailed: "Sign-in failed. Please check your account details.",
  },
  ko: {
    title: "로그인",
    subtitle: "이메일 또는 소셜 계정으로 로그인할 수 있습니다.",
    reportSubtitle: "로그인 후 신고를 계속 제출할 수 있습니다.",
    emailLabel: "이메일",
    passwordLabel: "비밀번호",
    submit: "로그인",
    submitting: "로그인 중...",
    withGoogle: "구글로 계속하기",
    withApple: "애플로 계속하기",
    divider: "또는",
    forgotPassword: "비밀번호를 잊으셨나요?",
    signupHint: "아직 계정이 없나요?",
    signupLink: "회원가입",
    invalidInput: "이메일과 비밀번호를 입력해 주세요.",
    loginFailed: "로그인에 실패했습니다. 계정 정보를 확인해 주세요.",
  },
  ja: {
    title: "ログイン",
    subtitle: "メールまたはソーシャルアカウントでログインできます。",
    reportSubtitle: "ログインすると報告を続けて送信できます。",
    emailLabel: "メールアドレス",
    passwordLabel: "パスワード",
    submit: "ログイン",
    submitting: "ログイン中...",
    withGoogle: "Googleで続行",
    withApple: "Appleで続行",
    divider: "または",
    forgotPassword: "パスワードをお忘れですか？",
    signupHint: "アカウントをお持ちでないですか？",
    signupLink: "新規登録",
    invalidInput: "メールアドレスとパスワードを入力してください。",
    loginFailed: "ログインに失敗しました。アカウント情報をご確認ください。",
  },
  zh: {
    title: "登录",
    subtitle: "可使用邮箱或社交账号登录。",
    reportSubtitle: "登录后可继续提交举报。",
    emailLabel: "邮箱",
    passwordLabel: "密码",
    submit: "登录",
    submitting: "登录中...",
    withGoogle: "使用 Google 继续",
    withApple: "使用 Apple 继续",
    divider: "或",
    forgotPassword: "忘记密码？",
    signupHint: "还没有账号？",
    signupLink: "注册",
    invalidInput: "请输入邮箱和密码。",
    loginFailed: "登录失败，请检查账号信息。",
  },
  es: {
    title: "Iniciar sesion",
    subtitle: "Inicia sesion con email o con una cuenta social.",
    reportSubtitle: "Inicia sesion para continuar y enviar tu reporte.",
    emailLabel: "Correo",
    passwordLabel: "Contrasena",
    submit: "Iniciar sesion",
    submitting: "Iniciando...",
    withGoogle: "Continuar con Google",
    withApple: "Continuar con Apple",
    divider: "o",
    forgotPassword: "¿Olvidaste tu contrasena?",
    signupHint: "¿No tienes una cuenta?",
    signupLink: "Crear cuenta",
    invalidInput: "Ingresa correo y contrasena.",
    loginFailed: "Error de inicio de sesion. Revisa tus datos.",
  },
  pt: {
    title: "Entrar",
    subtitle: "Acesse sua conta com email ou provedor social.",
    reportSubtitle: "Entre para continuar e enviar sua denuncia.",
    emailLabel: "Email",
    passwordLabel: "Senha",
    submit: "Entrar",
    submitting: "Entrando...",
    withGoogle: "Continuar com Google",
    withApple: "Continuar com Apple",
    divider: "ou",
    forgotPassword: "Esqueceu a senha?",
    signupHint: "Nao tem conta?",
    signupLink: "Criar conta",
    invalidInput: "Digite email e senha.",
    loginFailed: "Falha no login. Verifique seus dados.",
  },
  fr: {
    title: "Connexion",
    subtitle: "Connectez-vous avec votre email ou un compte social.",
    reportSubtitle: "Connectez-vous pour continuer et envoyer votre signalement.",
    emailLabel: "Email",
    passwordLabel: "Mot de passe",
    submit: "Se connecter",
    submitting: "Connexion...",
    withGoogle: "Continuer avec Google",
    withApple: "Continuer avec Apple",
    divider: "ou",
    forgotPassword: "Mot de passe oublie ?",
    signupHint: "Vous n'avez pas de compte ?",
    signupLink: "Creer un compte",
    invalidInput: "Saisissez votre email et votre mot de passe.",
    loginFailed: "Echec de connexion. Verifiez vos informations.",
  },
  th: {
    title: "เข้าสู่ระบบ",
    subtitle: "เข้าสู่ระบบด้วยอีเมลหรือบัญชีโซเชียล",
    reportSubtitle: "เข้าสู่ระบบเพื่อดำเนินการส่งรายงานต่อ",
    emailLabel: "อีเมล",
    passwordLabel: "รหัสผ่าน",
    submit: "เข้าสู่ระบบ",
    submitting: "กำลังเข้าสู่ระบบ...",
    withGoogle: "ดำเนินการต่อด้วย Google",
    withApple: "ดำเนินการต่อด้วย Apple",
    divider: "หรือ",
    forgotPassword: "ลืมรหัสผ่าน?",
    signupHint: "ยังไม่มีบัญชี?",
    signupLink: "สมัครสมาชิก",
    invalidInput: "กรุณากรอกอีเมลและรหัสผ่าน",
    loginFailed: "เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูลบัญชี",
  },
  vi: {
    title: "Dang nhap",
    subtitle: "Dang nhap bang email hoac tai khoan mang xa hoi.",
    reportSubtitle: "Dang nhap de tiep tuc va gui bao cao.",
    emailLabel: "Email",
    passwordLabel: "Mat khau",
    submit: "Dang nhap",
    submitting: "Dang dang nhap...",
    withGoogle: "Tiep tuc voi Google",
    withApple: "Tiep tuc voi Apple",
    divider: "hoac",
    forgotPassword: "Quen mat khau?",
    signupHint: "Chua co tai khoan?",
    signupLink: "Tao tai khoan",
    invalidInput: "Vui long nhap email va mat khau.",
    loginFailed: "Dang nhap that bai. Vui long kiem tra thong tin.",
  },
};

function LoginContent() {
  const router = useRouter();
  const params = useParams<{ lang: string }>();
  const searchParams = useSearchParams();
  const { status } = useSession();

  const resolvedLang = (params?.lang as Language) ?? "en";
  const labels = labelsMap[resolvedLang] ?? labelsMap.en;

  const fallbackReturnUrl = `/${resolvedLang}/journeys`;
  const returnUrl = sanitizeReturnUrl(
    searchParams.get("returnUrl"),
    fallbackReturnUrl,
  );

  const isReportFlow = useMemo(
    () => returnUrl.includes("report-intent=1"),
    [returnUrl],
  );

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(returnUrl);
    }
  }, [returnUrl, router, status]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    searchParams.get("error"),
  );

  const handleProviderSignIn = async (provider: "google" | "apple") => {
    setErrorMessage(null);
    await signIn(provider, { callbackUrl: returnUrl });
  };

  const handleEmailSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!email.trim() || !password) {
      setErrorMessage(labels.invalidInput);
      return;
    }

    const normalizedEmail = normalizeEmailInput(email);

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await signIn("credentials", {
        email: normalizedEmail,
        password,
        callbackUrl: returnUrl,
        redirect: false,
      });

      if (!result || result.error) {
        setErrorMessage(labels.loginFailed);
        return;
      }

      router.replace(returnUrl);
    } catch {
      setErrorMessage(labels.loginFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  const signupHref = `/${resolvedLang}/login/signup?returnUrl=${encodeURIComponent(returnUrl)}`;
  const forgotHref = `/${resolvedLang}/login/forgot-password?returnUrl=${encodeURIComponent(returnUrl)}`;

  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>{labels.title}</h1>
          <p className={styles.subtitle}>
            {isReportFlow ? labels.reportSubtitle : labels.subtitle}
          </p>
        </header>

        <div className={styles.socialRow}>
          <button
            type="button"
            className={styles.socialButton}
            onClick={() => handleProviderSignIn("google")}
          >
            {labels.withGoogle}
          </button>
          <button
            type="button"
            className={styles.socialButton}
            onClick={() => handleProviderSignIn("apple")}
          >
            {labels.withApple}
          </button>
        </div>

        <div className={styles.divider}>
          <span>{labels.divider}</span>
        </div>

        <form onSubmit={handleEmailSignIn} className={styles.form}>
          <label htmlFor="login-email" className={styles.label}>
            {labels.emailLabel}
          </label>
          <input
            id="login-email"
            type="email"
            className={styles.input}
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            disabled={isSubmitting}
          />

          <label htmlFor="login-password" className={styles.label}>
            {labels.passwordLabel}
          </label>
          <input
            id="login-password"
            type="password"
            className={styles.input}
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            disabled={isSubmitting}
          />

          {errorMessage ? (
            <p role="alert" className={styles.errorMessage}>
              {errorMessage}
            </p>
          ) : null}

          <div className={styles.actions}>
            <Link href={forgotHref} className={styles.link}>
              {labels.forgotPassword}
            </Link>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? labels.submitting : labels.submit}
            </button>
          </div>
        </form>

        <p className={styles.footnote}>
          {labels.signupHint}{" "}
          <Link href={signupHref} className={styles.linkStrong}>
            {labels.signupLink}
          </Link>
        </p>
      </section>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className={styles.page} />}>
      <LoginContent />
    </Suspense>
  );
}
