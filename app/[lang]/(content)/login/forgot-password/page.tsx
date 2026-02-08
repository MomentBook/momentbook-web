"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import styles from "../auth.module.scss";
import {
  getApiErrorMessage,
  normalizeEmailInput,
  postJson,
  sanitizeReturnUrl,
} from "../auth-utils";
import type { Language } from "@/lib/i18n/config";

type ResetLabels = {
  title: string;
  subtitle: string;
  emailLabel: string;
  codeLabel: string;
  newPasswordLabel: string;
  confirmPasswordLabel: string;
  sendCode: string;
  sendingCode: string;
  submit: string;
  submitting: string;
  invalidInput: string;
  passwordMismatch: string;
  resetFailed: string;
  codeSentNotice: string;
  resetSuccessNotice: string;
  loginHint: string;
  loginLink: string;
};

const labelsMap: Partial<Record<Language, ResetLabels>> & {
  en: ResetLabels;
} = {
  en: {
    title: "Reset password",
    subtitle: "Enter the verification code and your new password.",
    emailLabel: "Email",
    codeLabel: "Verification code",
    newPasswordLabel: "New password",
    confirmPasswordLabel: "Confirm password",
    sendCode: "Send code",
    sendingCode: "Sending...",
    submit: "Update password",
    submitting: "Updating...",
    invalidInput: "Please fill in all required fields.",
    passwordMismatch: "Passwords do not match.",
    resetFailed: "Password reset failed. Please check your information.",
    codeSentNotice: "Verification code was sent.",
    resetSuccessNotice: "Password updated. You can now sign in.",
    loginHint: "Back to",
    loginLink: "Sign in",
  },
  ko: {
    title: "비밀번호 재설정",
    subtitle: "인증 코드와 새 비밀번호를 입력해 주세요.",
    emailLabel: "이메일",
    codeLabel: "인증 코드",
    newPasswordLabel: "새 비밀번호",
    confirmPasswordLabel: "비밀번호 확인",
    sendCode: "코드 발송",
    sendingCode: "발송 중...",
    submit: "비밀번호 변경",
    submitting: "변경 중...",
    invalidInput: "필수 항목을 입력해 주세요.",
    passwordMismatch: "비밀번호가 일치하지 않습니다.",
    resetFailed: "비밀번호 재설정에 실패했습니다. 입력값을 확인해 주세요.",
    codeSentNotice: "인증 코드를 보냈습니다.",
    resetSuccessNotice: "비밀번호가 변경되었습니다. 로그인해 주세요.",
    loginHint: "로그인으로 돌아가기",
    loginLink: "로그인",
  },
  ja: {
    title: "パスワード再設定",
    subtitle: "認証コードと新しいパスワードを入力してください。",
    emailLabel: "メールアドレス",
    codeLabel: "認証コード",
    newPasswordLabel: "新しいパスワード",
    confirmPasswordLabel: "パスワード確認",
    sendCode: "コード送信",
    sendingCode: "送信中...",
    submit: "パスワード更新",
    submitting: "更新中...",
    invalidInput: "必須項目を入力してください。",
    passwordMismatch: "パスワードが一致しません。",
    resetFailed: "パスワード再設定に失敗しました。入力内容をご確認ください。",
    codeSentNotice: "認証コードを送信しました。",
    resetSuccessNotice: "パスワードを更新しました。ログインできます。",
    loginHint: "ログインに戻る",
    loginLink: "ログイン",
  },
  zh: {
    title: "重置密码",
    subtitle: "请输入验证码和新密码。",
    emailLabel: "邮箱",
    codeLabel: "验证码",
    newPasswordLabel: "新密码",
    confirmPasswordLabel: "确认密码",
    sendCode: "发送验证码",
    sendingCode: "发送中...",
    submit: "更新密码",
    submitting: "更新中...",
    invalidInput: "请填写所有必填项。",
    passwordMismatch: "两次密码不一致。",
    resetFailed: "重置密码失败，请检查输入信息。",
    codeSentNotice: "验证码已发送。",
    resetSuccessNotice: "密码已更新，现在可以登录。",
    loginHint: "返回",
    loginLink: "登录",
  },
  es: {
    title: "Restablecer contrasena",
    subtitle: "Ingresa el codigo de verificacion y tu nueva contrasena.",
    emailLabel: "Correo",
    codeLabel: "Codigo de verificacion",
    newPasswordLabel: "Nueva contrasena",
    confirmPasswordLabel: "Confirmar contrasena",
    sendCode: "Enviar codigo",
    sendingCode: "Enviando...",
    submit: "Actualizar contrasena",
    submitting: "Actualizando...",
    invalidInput: "Completa todos los campos obligatorios.",
    passwordMismatch: "Las contrasenas no coinciden.",
    resetFailed: "No se pudo restablecer la contrasena. Revisa la informacion.",
    codeSentNotice: "Se envio el codigo de verificacion.",
    resetSuccessNotice: "Contrasena actualizada. Ahora puedes iniciar sesion.",
    loginHint: "Volver a",
    loginLink: "Iniciar sesion",
  },
  pt: {
    title: "Redefinir senha",
    subtitle: "Informe o codigo de verificacao e sua nova senha.",
    emailLabel: "Email",
    codeLabel: "Codigo de verificacao",
    newPasswordLabel: "Nova senha",
    confirmPasswordLabel: "Confirmar senha",
    sendCode: "Enviar codigo",
    sendingCode: "Enviando...",
    submit: "Atualizar senha",
    submitting: "Atualizando...",
    invalidInput: "Preencha todos os campos obrigatorios.",
    passwordMismatch: "As senhas nao coincidem.",
    resetFailed: "Falha ao redefinir senha. Verifique os dados.",
    codeSentNotice: "Codigo de verificacao enviado.",
    resetSuccessNotice: "Senha atualizada. Voce ja pode entrar.",
    loginHint: "Voltar para",
    loginLink: "Entrar",
  },
  fr: {
    title: "Reinitialiser le mot de passe",
    subtitle: "Saisissez le code de verification et votre nouveau mot de passe.",
    emailLabel: "Email",
    codeLabel: "Code de verification",
    newPasswordLabel: "Nouveau mot de passe",
    confirmPasswordLabel: "Confirmer le mot de passe",
    sendCode: "Envoyer le code",
    sendingCode: "Envoi...",
    submit: "Mettre a jour le mot de passe",
    submitting: "Mise a jour...",
    invalidInput: "Veuillez renseigner tous les champs requis.",
    passwordMismatch: "Les mots de passe ne correspondent pas.",
    resetFailed: "La reinitialisation a echoue. Verifiez vos informations.",
    codeSentNotice: "Le code de verification a ete envoye.",
    resetSuccessNotice: "Mot de passe mis a jour. Vous pouvez vous connecter.",
    loginHint: "Retour a",
    loginLink: "Connexion",
  },
  th: {
    title: "รีเซ็ตรหัสผ่าน",
    subtitle: "กรอกรหัสยืนยันและรหัสผ่านใหม่",
    emailLabel: "อีเมล",
    codeLabel: "รหัสยืนยัน",
    newPasswordLabel: "รหัสผ่านใหม่",
    confirmPasswordLabel: "ยืนยันรหัสผ่าน",
    sendCode: "ส่งรหัส",
    sendingCode: "กำลังส่ง...",
    submit: "อัปเดตรหัสผ่าน",
    submitting: "กำลังอัปเดต...",
    invalidInput: "กรุณากรอกข้อมูลที่จำเป็นให้ครบ",
    passwordMismatch: "รหัสผ่านไม่ตรงกัน",
    resetFailed: "รีเซ็ตรหัสผ่านไม่สำเร็จ กรุณาตรวจสอบข้อมูล",
    codeSentNotice: "ส่งรหัสยืนยันแล้ว",
    resetSuccessNotice: "อัปเดตรหัสผ่านแล้ว สามารถเข้าสู่ระบบได้",
    loginHint: "กลับไปที่",
    loginLink: "เข้าสู่ระบบ",
  },
  vi: {
    title: "Dat lai mat khau",
    subtitle: "Nhap ma xac minh va mat khau moi.",
    emailLabel: "Email",
    codeLabel: "Ma xac minh",
    newPasswordLabel: "Mat khau moi",
    confirmPasswordLabel: "Xac nhan mat khau",
    sendCode: "Gui ma",
    sendingCode: "Dang gui...",
    submit: "Cap nhat mat khau",
    submitting: "Dang cap nhat...",
    invalidInput: "Vui long dien day du cac truong bat buoc.",
    passwordMismatch: "Mat khau khong khop.",
    resetFailed: "Dat lai mat khau that bai. Vui long kiem tra thong tin.",
    codeSentNotice: "Da gui ma xac minh.",
    resetSuccessNotice: "Da cap nhat mat khau. Ban co the dang nhap ngay.",
    loginHint: "Quay lai",
    loginLink: "Dang nhap",
  },
};

function ForgotPasswordContent() {
  const params = useParams<{ lang: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const resolvedLang = (params?.lang as Language) ?? "en";
  const labels = labelsMap[resolvedLang] ?? labelsMap.en;

  const fallbackReturnUrl = `/${resolvedLang}/journeys`;
  const returnUrl = sanitizeReturnUrl(
    searchParams.get("returnUrl"),
    fallbackReturnUrl,
  );

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearFeedback = () => {
    setErrorMessage(null);
    setNoticeMessage(null);
  };

  const handleSendCode = async () => {
    if (isSendingCode) {
      return;
    }

    if (!email.trim()) {
      setErrorMessage(labels.invalidInput);
      return;
    }

    const normalizedEmail = normalizeEmailInput(email);

    clearFeedback();
    setIsSendingCode(true);

    try {
      const { response, payload } = await postJson(
        "/api/auth/email/request-password-reset",
        {
          email: normalizedEmail,
        },
      );

      if (!response.ok) {
        setErrorMessage(getApiErrorMessage(payload) ?? labels.resetFailed);
        return;
      }

      setNoticeMessage(labels.codeSentNotice);
    } catch {
      setErrorMessage(labels.resetFailed);
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!email.trim() || !code.trim() || !newPassword || !confirmPassword) {
      setErrorMessage(labels.invalidInput);
      return;
    }

    const normalizedEmail = normalizeEmailInput(email);

    if (newPassword !== confirmPassword) {
      setErrorMessage(labels.passwordMismatch);
      return;
    }

    clearFeedback();
    setIsSubmitting(true);

    try {
      const { response, payload } = await postJson("/api/auth/email/reset-password", {
        email: normalizedEmail,
        code: code.trim(),
        newPassword,
      });

      if (!response.ok) {
        setErrorMessage(getApiErrorMessage(payload) ?? labels.resetFailed);
        return;
      }

      router.replace(loginHref);
    } catch {
      setErrorMessage(labels.resetFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  const loginHref = `/${resolvedLang}/login?returnUrl=${encodeURIComponent(returnUrl)}`;

  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>{labels.title}</h1>
          <p className={styles.subtitle}>{labels.subtitle}</p>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="reset-email" className={styles.label}>
            {labels.emailLabel}
          </label>
          <div className={styles.inlineRow}>
            <input
              id="reset-email"
              className={styles.input}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isSubmitting}
              required
            />
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleSendCode}
              disabled={isSendingCode || isSubmitting}
            >
              {isSendingCode ? labels.sendingCode : labels.sendCode}
            </button>
          </div>

          <label htmlFor="reset-code" className={styles.label}>
            {labels.codeLabel}
          </label>
          <input
            id="reset-code"
            className={styles.input}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            disabled={isSubmitting}
            required
          />

          <label htmlFor="reset-new-password" className={styles.label}>
            {labels.newPasswordLabel}
          </label>
          <input
            id="reset-new-password"
            className={styles.input}
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            disabled={isSubmitting}
            required
          />

          <label htmlFor="reset-password-confirm" className={styles.label}>
            {labels.confirmPasswordLabel}
          </label>
          <input
            id="reset-password-confirm"
            className={styles.input}
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            disabled={isSubmitting}
            required
          />

          {errorMessage ? (
            <p role="alert" className={styles.errorMessage}>
              {errorMessage}
            </p>
          ) : null}

          {noticeMessage ? (
            <p role="status" className={styles.noticeMessage}>
              {noticeMessage}
            </p>
          ) : null}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? labels.submitting : labels.submit}
          </button>
        </form>

        <p className={styles.footnote}>
          {labels.loginHint}{" "}
          <Link href={loginHref} className={styles.linkStrong}>
            {labels.loginLink}
          </Link>
        </p>
      </section>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className={styles.page} />}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
