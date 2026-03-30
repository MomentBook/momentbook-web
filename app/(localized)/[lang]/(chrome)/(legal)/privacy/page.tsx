/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import styles from "./privacy.module.scss";
import { type Language } from "@/lib/i18n/config";
import {
  buildLegalPageMetadata,
  LegalDocumentShell,
  type LegalPageMetadataCopy,
  renderLegalContent,
} from "../legal-page";

const privacyMetadataByLanguage: Record<Language, LegalPageMetadataCopy> = {
  en: {
    title: "MomentBook Privacy Policy",
    description: "How MomentBook handles your data.",
  },
  ko: {
    title: "MomentBook 개인정보 처리방침",
    description: "MomentBook 개인정보 처리방침을 안내합니다.",
  },
  ja: {
    title: "MomentBook プライバシーポリシー",
    description: "MomentBookのプライバシーポリシーをご案内します。",
  },
  zh: {
    title: "MomentBook 隐私政策",
    description: "了解 MomentBook 的隐私政策。",
  },
  es: {
    title: "Política de privacidad de MomentBook",
    description: "Cómo maneja MomentBook tus datos.",
  },
  pt: {
    title: "Política de privacidade do MomentBook",
    description: "Como o MomentBook trata seus dados.",
  },
  fr: {
    title: "Politique de confidentialité de MomentBook",
    description: "Comment MomentBook gère vos données.",
  },
  th: {
    title: "นโยบายความเป็นส่วนตัวของ MomentBook",
    description: "MomentBook จัดการข้อมูลของคุณอย่างไร",
  },
  vi: {
    title: "Chính sách quyền riêng tư của MomentBook",
    description: "MomentBook xử lý dữ liệu của bạn như thế nào.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  return buildLegalPageMetadata(lang, "/privacy", privacyMetadataByLanguage);
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  return (
    <LegalDocumentShell
      classNames={{ container: styles.container, content: styles.content }}
      content={renderLegalContent(lang, privacyContentByLanguage)}
    />
  );
}

const privacyContentByLanguage = {
  en: EnglishPrivacy,
  ko: KoreanPrivacy,
  ja: JapanesePrivacy,
  zh: ChinesePrivacy,
  es: SpanishPrivacy,
  pt: PortuguesePrivacy,
  fr: FrenchPrivacy,
  th: ThaiPrivacy,
  vi: VietnamesePrivacy,
} satisfies Record<Language, () => ReactNode>;

function EnglishPrivacy() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MomentBook Privacy Policy</h1>
        <div className={styles.meta}>
          <p><strong>Version:</strong> 1.0.1</p>
          <p><strong>Effective Date:</strong> January 4, 2025</p>
          <p><strong>Last Updated:</strong> January 4, 2025</p>
          <p><strong>Service Name:</strong> MomentBook</p>
          <p><strong>Operator:</strong> Hansol Yoon</p>
          <p><strong>Contact:</strong> yoondev3434@gmail.com</p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <p>
            The app values users' personal information and processes it safely in compliance with relevant laws. This policy explains what information is collected, used, stored, and deleted, as well as users' rights.
          </p>
        </section>

        <section>
          <h2>1. Information Collected and Collection Timing</h2>
          <p><strong>Registration/Login</strong></p>
          <p>- Email address (Google Login) - for user identification and authentication</p>

          <p><strong>Profile Changes</strong></p>
          <p>- Photo/Camera·Gallery permissions - for profile image upload</p>

          <p><strong>During App Use</strong></p>
          <p>- Location information (precise/approximate) - for location-based features</p>

          <p><em>Note: Location information is used in real-time and not stored on the server.</em></p>
        </section>

        <section>
          <h2>2. Purpose of Use</h2>
          <p>- User identification and authentication, profile display</p>
          <p>- Provision of location-based features (post tagging, nearby exposure, etc.)</p>
          <p>- If you publish a journey, that content becomes publicly accessible on the web</p>
          <p>- Service stability improvement and quality enhancement (error response, etc. using de-identified logs)</p>
        </section>

        <section>
          <h2>3. Retention and Use Period</h2>
          <p>- Email/Profile: <strong>Immediately deleted upon account withdrawal</strong></p>
          <p>- Location information: <strong>Not stored on server</strong>, disposed after real-time use</p>
          <p>- When legally required to be retained, stored for the relevant period before deletion</p>
        </section>

        <section>
          <h2>4. Third-Party Provision</h2>
          <p>- In principle, <strong>no provision to third parties without prior consent</strong></p>
          <p>- Provision possible only in exceptional cases such as legal requests</p>
        </section>

        <section>
          <h2>5. Processing Entrustment</h2>
          <p>- Currently <strong>no external entrustment</strong>. If it occurs in the future, the trustee, task, and period will be notified through this policy and app announcements</p>
        </section>

        <section>
          <h2>6. User Rights</h2>
          <p>- Can request <strong>access, correction, and deletion</strong> of personal information</p>
          <p>- Can request deletion through <strong>Settings → Delete Account</strong> in the app or via email</p>
          <p>- Additional information may be requested for identity verification</p>
        </section>

        <section>
          <h2>7. Security Measures</h2>
          <p>- <strong>Encryption (HTTPS/TLS)</strong> for transmission sections</p>
          <p>- Minimization of access permissions, access control, blocking unauthorized access</p>
          <p>- Internal training/management, prompt notification in case of breach incidents</p>
        </section>

        <section>
          <h2>8. Children Under 14</h2>
          <p>- The service does not target <strong>children under 14</strong>. Upon recognition of such fact, the account and data will be deleted without delay.</p>
        </section>

        <section>
          <h2>9. Privacy Officer</h2>
          <p>- Name: Hansol Yoon</p>
          <p>- Email: yoondev3434@gmail.com</p>
          <p>- Inquiry: <strong>Settings → Contact Us</strong> in the app</p>
        </section>

        <section>
          <h2>10. Notice and Revision</h2>
          <p>- This policy may be changed, and important changes will be <strong>notified in advance</strong> through app announcements.</p>
        </section>
      </div>
    </>
  );
}

function KoreanPrivacy() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MomentBook 개인정보 처리방침</h1>
        <div className={styles.meta}>
          <p><strong>버전:</strong> 1.0.1</p>
          <p><strong>시행일:</strong> 2025년 1월 4일</p>
          <p><strong>최종 업데이트:</strong> 2025년 1월 4일</p>
          <p><strong>서비스명:</strong> MomentBook</p>
          <p><strong>운영자:</strong> 윤한솔</p>
          <p><strong>연락처:</strong> yoondev3434@gmail.com</p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <p>
            앱은 이용자의 개인정보를 소중히 여기며, 관련 법령을 준수하여 안전하게 처리합니다. 본 방침은 어떤 정보를 수집·이용·보관·파기하는지와 이용자의 권리를 안내합니다.
          </p>
        </section>

        <section>
          <h2>1. 수집 항목 및 수집 시점</h2>
          <p><strong>회원가입/로그인</strong></p>
          <p>- 이메일 주소 (Google 로그인) - 회원 식별 및 인증</p>

          <p><strong>프로필 변경</strong></p>
          <p>- 사진/카메라·갤러리 권한 - 프로필 이미지 업로드</p>

          <p><strong>앱 사용 중</strong></p>
          <p>- 위치 정보(정확/대략) - 위치 기반 기능 제공</p>

          <p><em>참고: 위치 정보는 실시간 활용 후 서버에 저장하지 않습니다.</em></p>
        </section>

        <section>
          <h2>2. 이용 목적</h2>
          <p>- 사용자 식별 및 인증, 프로필 표시</p>
          <p>- 위치 기반 기능 제공(게시물 태그·근처 노출 등)</p>
          <p>- 게시하기를 선택한 여정은 웹에 공개되어 누구나 볼 수 있습니다</p>
          <p>- 서비스 안정성 향상 및 품질 개선(오류 대응 등 비식별 로그 활용)</p>
        </section>

        <section>
          <h2>3. 보유 및 이용 기간</h2>
          <p>- 이메일/프로필: <strong>회원 탈퇴 시 즉시 삭제</strong></p>
          <p>- 위치 정보: <strong>서버 미저장</strong>, 실시간 활용 후 폐기</p>
          <p>- 법령상 보존이 필요한 경우 해당 기간 보관 후 파기</p>
        </section>

        <section>
          <h2>4. 제3자 제공</h2>
          <p>- 원칙적으로 <strong>사전 동의 없는 제3자 제공 없음</strong></p>
          <p>- 법령상 요청 등 예외적 경우에 한해 제공 가능</p>
        </section>

        <section>
          <h2>5. 처리 위탁</h2>
          <p>- 현재 <strong>외부 위탁 없음</strong>. 향후 발생 시 수탁자·업무·기간을 본 방침 및 앱 공지로 고지</p>
        </section>

        <section>
          <h2>6. 이용자 권리</h2>
          <p>- 개인정보 <strong>열람·정정·삭제</strong> 요청 가능</p>
          <p>- 앱 내 <strong>설정 → 계정 삭제</strong> 또는 이메일로 삭제 요청 가능</p>
          <p>- 본인 확인을 위해 추가 정보를 요청할 수 있습니다.</p>
        </section>

        <section>
          <h2>7. 안전성 확보조치</h2>
          <p>- 전송구간 <strong>암호화(HTTPS/TLS)</strong></p>
          <p>- 접근권한 최소화·권한 통제, 비인가 접근 차단</p>
          <p>- 내부 교육/관리, 침해사고 발생 시 지체 없는 통지</p>
        </section>

        <section>
          <h2>8. 만 14세 미만 아동</h2>
          <p>- 서비스는 <strong>만 14세 미만</strong>을 대상으로 하지 않습니다. 해당 사실 인지 시 계정 및 데이터를 지체 없이 삭제합니다.</p>
        </section>

        <section>
          <h2>9. 개인정보 보호책임자</h2>
          <p>- 성명: 윤한솔</p>
          <p>- 이메일: yoondev3434@gmail.com</p>
          <p>- 문의: 앱 내 <strong>설정 → 문의하기</strong></p>
        </section>

        <section>
          <h2>10. 고지 및 개정</h2>
          <p>- 본 방침은 변경될 수 있으며, 중요한 변경 사항은 앱 공지를 통해 <strong>사전 안내</strong>합니다.</p>
        </section>
      </div>
    </>
  );
}

function JapanesePrivacy() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MomentBook プライバシーポリシー</h1>
        <div className={styles.meta}>
          <p><strong>バージョン:</strong> 1.0.1</p>
          <p><strong>施行日:</strong> 2025年1月4日</p>
          <p><strong>最終更新日:</strong> 2025年1月4日</p>
          <p><strong>サービス名:</strong> MomentBook</p>
          <p><strong>運営者:</strong> 윤한솔</p>
          <p><strong>連絡先:</strong> yoondev3434@gmail.com</p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <p>
            アプリは利用者の個人情報を大切に扱い、関連法令を遵守して安全に処理します。本方針は、どのような情報を収集・利用・保管・破棄するか、および利用者の権利について説明します。
          </p>
        </section>

        <section>
          <h2>1. 収集項目および収集時点</h2>
          <p><strong>会員登録/ログイン</strong></p>
          <p>- メールアドレス（Googleログイン） - 会員識別および認証</p>

          <p><strong>プロフィール変更</strong></p>
          <p>- 写真/カメラ・ギャラリー権限 - プロフィール画像アップロード</p>

          <p><strong>アプリ使用中</strong></p>
          <p>- 位置情報（正確/大まか） - 位置ベース機能の提供</p>

          <p><em>参考: 位置情報はリアルタイム活用後、サーバーに保存されません。</em></p>
        </section>

        <section>
          <h2>2. 利用目的</h2>
          <p>- ユーザー識別および認証、プロフィール表示</p>
          <p>- 位置ベース機能の提供（投稿タグ・付近表示など）</p>
          <p>- 投稿すると旅の内容がWebで公開されます</p>
          <p>- サービスの安定性向上および品質改善（エラー対応等の非識別ログ活用）</p>
        </section>

        <section>
          <h2>3. 保有および利用期間</h2>
          <p>- メール/プロフィール: <strong>退会時に即時削除</strong></p>
          <p>- 位置情報: <strong>サーバー未保存</strong>、リアルタイム活用後破棄</p>
          <p>- 法令上保存が必要な場合、該当期間保管後破棄</p>
        </section>

        <section>
          <h2>4. 第三者提供</h2>
          <p>- 原則として <strong>事前同意なき第三者提供なし</strong></p>
          <p>- 法令上の要請等、例外的な場合に限り提供可能</p>
        </section>

        <section>
          <h2>5. 処理委託</h2>
          <p>- 現在 <strong>外部委託なし</strong>。今後発生する場合、受託者・業務・期間を本方針およびアプリ公知で告知</p>
        </section>

        <section>
          <h2>6. 利用者の権利</h2>
          <p>- 個人情報の <strong>閲覧・訂正・削除</strong> 請求可能</p>
          <p>- アプリ内 <strong>設定 → アカウント削除</strong> またはメールで削除請求可能</p>
          <p>- 本人確認のため追加情報を求める場合があります。</p>
        </section>

        <section>
          <h2>7. 安全性確保措置</h2>
          <p>- 送信区間 <strong>暗号化（HTTPS/TLS）</strong></p>
          <p>- アクセス権限の最小化・権限統制、非認可アクセス遮断</p>
          <p>- 内部教育/管理、侵害事故発生時の速やかな通知</p>
        </section>

        <section>
          <h2>8. 14歳未満の児童</h2>
          <p>- サービスは <strong>14歳未満</strong> を対象としていません。該当事実を認知した場合、アカウントおよびデータを遅滞なく削除します。</p>
        </section>

        <section>
          <h2>9. 個人情報保護責任者</h2>
          <p>- 氏名: 윤한솔</p>
          <p>- メール: yoondev3434@gmail.com</p>
          <p>- 問い合わせ: アプリ内 <strong>設定 → お問い合わせ</strong></p>
        </section>

        <section>
          <h2>10. 告知および改定</h2>
          <p>- 本方針は変更される場合があり、重要な変更事項はアプリ公知を通じて <strong>事前案内</strong> します。</p>
        </section>
      </div>
    </>
  );
}

function ChinesePrivacy() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MomentBook 隐私政策</h1>
        <div className={styles.meta}>
          <p><strong>版本:</strong> 1.0.1</p>
          <p><strong>生效日期:</strong> 2025年1月4日</p>
          <p><strong>最后更新:</strong> 2025年1月4日</p>
          <p><strong>服务名称:</strong> MomentBook</p>
          <p><strong>运营方:</strong> 윤한솔</p>
          <p><strong>联系方式:</strong> yoondev3434@gmail.com</p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <p>
            应用重视用户的个人信息，并遵守相关法律法规进行安全处理。本政策说明收集、使用、保管、销毁哪些信息，以及用户的权利。
          </p>
        </section>

        <section>
          <h2>1. 收集项目及收集时点</h2>
          <p><strong>会员注册/登录</strong></p>
          <p>- 电子邮件地址（Google登录） - 用于会员识别和认证</p>

          <p><strong>个人资料变更</strong></p>
          <p>- 照片/相机·相册权限 - 用于个人资料图片上传</p>

          <p><strong>应用使用期间</strong></p>
          <p>- 位置信息（精确/大致） - 提供基于位置的功能</p>

          <p><em>说明: 位置信息经实时使用后不会存储在服务器上。</em></p>
        </section>

        <section>
          <h2>2. 使用目的</h2>
          <p>- 用户识别和认证、个人资料显示</p>
          <p>- 提供基于位置的功能（帖子标签、附近显示等）</p>
          <p>- 发布后，行程内容会在网页公开</p>
          <p>- 服务稳定性提升及质量改善（错误应对等使用非识别日志）</p>
        </section>

        <section>
          <h2>3. 保留及使用期限</h2>
          <p>- 电子邮件/个人资料: <strong>账户注销时立即删除</strong></p>
          <p>- 位置信息: <strong>服务器不存储</strong>，实时使用后销毁</p>
          <p>- 法律法规要求保留的情况下，按规定期限保管后销毁</p>
        </section>

        <section>
          <h2>4. 第三方提供</h2>
          <p>- 原则上 <strong>无事先同意不向第三方提供</strong></p>
          <p>- 仅在法律要求等例外情况下可能提供</p>
        </section>

        <section>
          <h2>5. 处理委托</h2>
          <p>- 目前 <strong>无外部委托</strong>。今后若发生，将通过本政策及应用公告告知受托方·业务·期限</p>
        </section>

        <section>
          <h2>6. 用户权利</h2>
          <p>- 可请求 <strong>查阅、更正、删除</strong> 个人信息</p>
          <p>- 可通过应用内 <strong>设置 → 删除账户</strong> 或邮件请求删除</p>
          <p>- 为进行本人确认，可能要求提供额外信息。</p>
        </section>

        <section>
          <h2>7. 安全保障措施</h2>
          <p>- 传输段 <strong>加密（HTTPS/TLS）</strong></p>
          <p>- 最小化访问权限·权限控制、阻止未授权访问</p>
          <p>- 内部培训/管理、发生侵害事故时及时通知</p>
        </section>

        <section>
          <h2>8. 14周岁以下儿童</h2>
          <p>- 服务不针对 <strong>14周岁以下</strong> 儿童。一旦发现此类情况，将立即删除账户和数据。</p>
        </section>

        <section>
          <h2>9. 个人信息保护负责人</h2>
          <p>- 姓名: 윤한솔</p>
          <p>- 邮箱: yoondev3434@gmail.com</p>
          <p>- 咨询: 应用内 <strong>设置 → 联系我们</strong></p>
        </section>

        <section>
          <h2>10. 告知及修订</h2>
          <p>- 本政策可能会变更，重要变更事项将通过应用公告进行 <strong>事先通知</strong>。</p>
        </section>
      </div>
    </>
  );
}

function SpanishPrivacy() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Política de privacidad de MomentBook</h1>
        <div className={styles.meta}>
          <p><strong>Versión:</strong> 1.0.1</p>
          <p><strong>Fecha de entrada en vigor:</strong> 4 de enero de 2025</p>
          <p><strong>Última actualización:</strong> 4 de enero de 2025</p>
          <p><strong>Nombre del servicio:</strong> MomentBook</p>
          <p><strong>Operador:</strong> Hansol Yoon</p>
          <p><strong>Contacto:</strong> yoondev3434@gmail.com</p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <p>
            La app valora la información personal de los usuarios y la trata de forma segura conforme a la legislación aplicable. Esta política explica qué información se recopila, usa, conserva y elimina, así como los derechos de los usuarios.
          </p>
        </section>

        <section>
          <h2>1. Información recopilada y momento de recopilación</h2>
          <p><strong>Registro / inicio de sesión</strong></p>
          <p>- Dirección de correo electrónico (inicio de sesión con Google) - identificación y autenticación del usuario</p>

          <p><strong>Cambios de perfil</strong></p>
          <p>- Permisos de fotos / cámara · galería - carga de imagen de perfil</p>

          <p><strong>Durante el uso de la app</strong></p>
          <p>- Información de ubicación (precisa / aproximada) - funciones basadas en ubicación</p>

          <p><em>Nota: la información de ubicación se usa en tiempo real y no se almacena en el servidor.</em></p>
        </section>

        <section>
          <h2>2. Finalidad del uso</h2>
          <p>- Identificación y autenticación del usuario, visualización del perfil</p>
          <p>- Prestación de funciones basadas en ubicación (etiquetas de publicaciones, exposición cercana, etc.)</p>
          <p>- Si publicas un viaje, ese contenido pasa a estar accesible públicamente en la web</p>
          <p>- Mejora de la estabilidad del servicio y de la calidad (respuesta a errores, etc. mediante registros desidentificados)</p>
        </section>

        <section>
          <h2>3. Período de conservación y uso</h2>
          <p>- Correo electrónico / perfil: <strong>eliminación inmediata al cancelar la cuenta</strong></p>
          <p>- Información de ubicación: <strong>no se almacena en el servidor</strong>, se descarta tras el uso en tiempo real</p>
          <p>- Cuando la ley exija conservación, se guardará durante el plazo correspondiente y luego se eliminará</p>
        </section>

        <section>
          <h2>4. Cesión a terceros</h2>
          <p>- En principio, <strong>no se cede a terceros sin consentimiento previo</strong></p>
          <p>- Solo puede compartirse en casos excepcionales, como requerimientos legales</p>
        </section>

        <section>
          <h2>5. Encargo de tratamiento</h2>
          <p>- Actualmente <strong>no existe encargo externo</strong>. Si ocurre en el futuro, se notificará el encargado, la tarea y el período mediante esta política y avisos en la app</p>
        </section>

        <section>
          <h2>6. Derechos de los usuarios</h2>
          <p>- Puedes solicitar <strong>acceso, rectificación y eliminación</strong> de tus datos personales</p>
          <p>- Puedes solicitar la eliminación desde la app mediante <strong>Ajustes → Eliminar cuenta</strong> o por correo electrónico</p>
          <p>- Puede solicitarse información adicional para verificar tu identidad.</p>
        </section>

        <section>
          <h2>7. Medidas de seguridad</h2>
          <p>- <strong>Cifrado (HTTPS/TLS)</strong> en la transmisión</p>
          <p>- Minimización de permisos de acceso, control de accesos y bloqueo de accesos no autorizados</p>
          <p>- Formación y gestión internas, y notificación rápida en caso de incidentes de seguridad</p>
        </section>

        <section>
          <h2>8. Menores de 14 años</h2>
          <p>- El servicio no está dirigido a <strong>menores de 14 años</strong>. Si se detecta este caso, la cuenta y los datos se eliminarán sin demora.</p>
        </section>

        <section>
          <h2>9. Responsable de privacidad</h2>
          <p>- Nombre: Hansol Yoon</p>
          <p>- Correo electrónico: yoondev3434@gmail.com</p>
          <p>- Consulta: en la app <strong>Ajustes → Contacto</strong></p>
        </section>

        <section>
          <h2>10. Avisos y revisiones</h2>
          <p>- Esta política puede cambiar, y los cambios importantes se <strong>notificarán con antelación</strong> mediante avisos en la app.</p>
        </section>
      </div>
    </>
  );
}

function PortuguesePrivacy() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Política de privacidade do MomentBook</h1>
        <div className={styles.meta}>
          <p><strong>Versão:</strong> 1.0.1</p>
          <p><strong>Data de vigência:</strong> 4 de janeiro de 2025</p>
          <p><strong>Última atualização:</strong> 4 de janeiro de 2025</p>
          <p><strong>Nome do serviço:</strong> MomentBook</p>
          <p><strong>Operador:</strong> Hansol Yoon</p>
          <p><strong>Contato:</strong> yoondev3434@gmail.com</p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <p>
            O app valoriza as informações pessoais dos usuários e as trata com segurança em conformidade com a legislação aplicável. Esta política explica quais informações são coletadas, usadas, armazenadas e excluídas, bem como os direitos dos usuários.
          </p>
        </section>

        <section>
          <h2>1. Informações coletadas e momento da coleta</h2>
          <p><strong>Cadastro / login</strong></p>
          <p>- Endereço de e-mail (login com Google) - identificação e autenticação do usuário</p>

          <p><strong>Alterações de perfil</strong></p>
          <p>- Permissões de foto / câmera · galeria - upload de imagem de perfil</p>

          <p><strong>Durante o uso do app</strong></p>
          <p>- Informações de localização (precisa / aproximada) - recursos baseados em localização</p>

          <p><em>Observação: as informações de localização são usadas em tempo real e não são armazenadas no servidor.</em></p>
        </section>

        <section>
          <h2>2. Finalidade de uso</h2>
          <p>- Identificação e autenticação do usuário, exibição de perfil</p>
          <p>- Fornecimento de recursos baseados em localização (tags de posts, exibição próxima etc.)</p>
          <p>- Se você publicar uma jornada, esse conteúdo ficará acessível publicamente na web</p>
          <p>- Melhoria da estabilidade do serviço e da qualidade (resposta a erros etc. com logs desidentificados)</p>
        </section>

        <section>
          <h2>3. Período de retenção e uso</h2>
          <p>- E-mail / perfil: <strong>exclusão imediata ao encerrar a conta</strong></p>
          <p>- Informações de localização: <strong>não armazenadas no servidor</strong>, descartadas após o uso em tempo real</p>
          <p>- Quando a lei exigir retenção, os dados serão mantidos pelo período aplicável e depois excluídos</p>
        </section>

        <section>
          <h2>4. Compartilhamento com terceiros</h2>
          <p>- Em princípio, <strong>não há compartilhamento com terceiros sem consentimento prévio</strong></p>
          <p>- O compartilhamento só é possível em casos excepcionais, como exigências legais</p>
        </section>

        <section>
          <h2>5. Tratamento por terceiros</h2>
          <p>- Atualmente <strong>não há terceirização externa</strong>. Se isso ocorrer no futuro, o responsável, a atividade e o período serão informados nesta política e nos avisos do app</p>
        </section>

        <section>
          <h2>6. Direitos dos usuários</h2>
          <p>- Você pode solicitar <strong>acesso, correção e exclusão</strong> de dados pessoais</p>
          <p>- Você pode solicitar a exclusão pelo app em <strong>Configurações → Excluir conta</strong> ou por e-mail</p>
          <p>- Informações adicionais podem ser solicitadas para verificar a identidade.</p>
        </section>

        <section>
          <h2>7. Medidas de segurança</h2>
          <p>- <strong>Criptografia (HTTPS/TLS)</strong> nas transmissões</p>
          <p>- Minimização de permissões de acesso, controle de acesso e bloqueio de acessos não autorizados</p>
          <p>- Treinamento e gestão internos, com notificação rápida em caso de incidentes</p>
        </section>

        <section>
          <h2>8. Crianças menores de 14 anos</h2>
          <p>- O serviço não é destinado a <strong>crianças menores de 14 anos</strong>. Se isso for identificado, a conta e os dados serão excluídos sem demora.</p>
        </section>

        <section>
          <h2>9. Responsável pela privacidade</h2>
          <p>- Nome: Hansol Yoon</p>
          <p>- E-mail: yoondev3434@gmail.com</p>
          <p>- Contato: no app <strong>Configurações → Fale conosco</strong></p>
        </section>

        <section>
          <h2>10. Avisos e revisões</h2>
          <p>- Esta política pode ser alterada, e mudanças importantes serão <strong>comunicadas com antecedência</strong> por meio de avisos no app.</p>
        </section>
      </div>
    </>
  );
}

function FrenchPrivacy() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Politique de confidentialité de MomentBook</h1>
        <div className={styles.meta}>
          <p><strong>Version :</strong> 1.0.1</p>
          <p><strong>Date d&apos;entrée en vigueur :</strong> 4 janvier 2025</p>
          <p><strong>Dernière mise à jour :</strong> 4 janvier 2025</p>
          <p><strong>Nom du service :</strong> MomentBook</p>
          <p><strong>Exploitant :</strong> Hansol Yoon</p>
          <p><strong>Contact :</strong> yoondev3434@gmail.com</p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <p>
            L’application accorde une grande importance aux informations personnelles des utilisateurs et les traite de manière sécurisée conformément aux lois applicables. Cette politique explique quelles informations sont collectées, utilisées, conservées et supprimées, ainsi que les droits des utilisateurs.
          </p>
        </section>

        <section>
          <h2>1. Informations collectées et moment de la collecte</h2>
          <p><strong>Inscription / connexion</strong></p>
          <p>- Adresse e-mail (connexion Google) - identification et authentification de l’utilisateur</p>

          <p><strong>Modification du profil</strong></p>
          <p>- Autorisations photo / caméra · galerie - téléversement de l’image de profil</p>

          <p><strong>Pendant l’utilisation de l’application</strong></p>
          <p>- Informations de localisation (précise / approximative) - fonctionnalités basées sur la localisation</p>

          <p><em>Remarque : les informations de localisation sont utilisées en temps réel et ne sont pas stockées sur le serveur.</em></p>
        </section>

        <section>
          <h2>2. Finalité de l’utilisation</h2>
          <p>- Identification et authentification de l’utilisateur, affichage du profil</p>
          <p>- Fourniture de fonctionnalités basées sur la localisation (étiquettes de publication, affichage à proximité, etc.)</p>
          <p>- Si vous publiez un voyage, ce contenu devient accessible publiquement sur le web</p>
          <p>- Amélioration de la stabilité et de la qualité du service (réponse aux erreurs, etc. à partir de journaux désidentifiés)</p>
        </section>

        <section>
          <h2>3. Durée de conservation et d’utilisation</h2>
          <p>- E-mail / profil : <strong>suppression immédiate lors de la suppression du compte</strong></p>
          <p>- Informations de localisation : <strong>non stockées sur le serveur</strong>, supprimées après l’usage en temps réel</p>
          <p>- Lorsqu’une conservation est imposée par la loi, les données sont conservées pendant la durée requise puis supprimées</p>
        </section>

        <section>
          <h2>4. Communication à des tiers</h2>
          <p>- En principe, <strong>aucune communication à des tiers sans consentement préalable</strong></p>
          <p>- Une communication n’est possible que dans des cas exceptionnels, notamment en cas d’obligation légale</p>
        </section>

        <section>
          <h2>5. Sous-traitance du traitement</h2>
          <p>- Actuellement, <strong>aucune sous-traitance externe</strong>. Si cela devait changer, le sous-traitant, la mission et la durée seraient annoncés dans cette politique et dans les avis de l’application</p>
        </section>

        <section>
          <h2>6. Droits des utilisateurs</h2>
          <p>- Vous pouvez demander <strong>l’accès, la rectification et la suppression</strong> de vos données personnelles</p>
          <p>- Vous pouvez demander la suppression via l’application dans <strong>Réglages → Supprimer le compte</strong> ou par e-mail</p>
          <p>- Des informations complémentaires peuvent être demandées pour vérifier votre identité.</p>
        </section>

        <section>
          <h2>7. Mesures de sécurité</h2>
          <p>- <strong>Chiffrement (HTTPS/TLS)</strong> pour les transmissions</p>
          <p>- Réduction des droits d’accès, contrôle des accès et blocage des accès non autorisés</p>
          <p>- Formation et gestion internes, avec notification rapide en cas d’incident</p>
        </section>

        <section>
          <h2>8. Enfants de moins de 14 ans</h2>
          <p>- Le service ne s’adresse pas aux <strong>enfants de moins de 14 ans</strong>. Si cela est constaté, le compte et les données seront supprimés sans délai.</p>
        </section>

        <section>
          <h2>9. Responsable de la protection des données</h2>
          <p>- Nom : Hansol Yoon</p>
          <p>- E-mail : yoondev3434@gmail.com</p>
          <p>- Contact : dans l’application <strong>Réglages → Contact</strong></p>
        </section>

        <section>
          <h2>10. Avis et révisions</h2>
          <p>- Cette politique peut être modifiée, et les changements importants seront <strong>annoncés à l’avance</strong> via les avis de l’application.</p>
        </section>
      </div>
    </>
  );
}

function ThaiPrivacy() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>นโยบายความเป็นส่วนตัวของ MomentBook</h1>
        <div className={styles.meta}>
          <p><strong>เวอร์ชัน:</strong> 1.0.1</p>
          <p><strong>วันที่มีผลบังคับใช้:</strong> 4 มกราคม 2025</p>
          <p><strong>อัปเดตล่าสุด:</strong> 4 มกราคม 2025</p>
          <p><strong>ชื่อบริการ:</strong> MomentBook</p>
          <p><strong>ผู้ให้บริการ:</strong> Hansol Yoon</p>
          <p><strong>ติดต่อ:</strong> yoondev3434@gmail.com</p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <p>
            แอปให้ความสำคัญกับข้อมูลส่วนบุคคลของผู้ใช้และประมวลผลอย่างปลอดภัยตามกฎหมายที่เกี่ยวข้อง นโยบายนี้อธิบายว่ามีการเก็บ ใช้ เก็บรักษา และลบข้อมูลใด รวมถึงสิทธิของผู้ใช้
          </p>
        </section>

        <section>
          <h2>1. ข้อมูลที่เก็บรวบรวมและช่วงเวลาที่เก็บ</h2>
          <p><strong>การสมัคร / เข้าสู่ระบบ</strong></p>
          <p>- อีเมล (เข้าสู่ระบบด้วย Google) - ใช้เพื่อระบุตัวตนและยืนยันผู้ใช้</p>

          <p><strong>การเปลี่ยนโปรไฟล์</strong></p>
          <p>- สิทธิ์รูปภาพ / กล้อง · แกลเลอรี - ใช้สำหรับอัปโหลดรูปโปรไฟล์</p>

          <p><strong>ระหว่างการใช้งานแอป</strong></p>
          <p>- ข้อมูลตำแหน่ง (ละเอียด / โดยประมาณ) - ใช้สำหรับฟีเจอร์ตามตำแหน่ง</p>

          <p><em>หมายเหตุ: ข้อมูลตำแหน่งถูกใช้แบบเรียลไทม์และไม่ถูกเก็บไว้บนเซิร์ฟเวอร์</em></p>
        </section>

        <section>
          <h2>2. วัตถุประสงค์การใช้งาน</h2>
          <p>- ระบุตัวตนและยืนยันผู้ใช้ รวมถึงแสดงโปรไฟล์</p>
          <p>- ให้บริการฟีเจอร์ตามตำแหน่ง (แท็กโพสต์ การแสดงใกล้เคียง เป็นต้น)</p>
          <p>- หากคุณเผยแพร่ทริป เนื้อหานั้นจะเข้าถึงได้แบบสาธารณะบนเว็บ</p>
          <p>- ปรับปรุงเสถียรภาพและคุณภาพของบริการ (เช่น การตอบสนองต่อข้อผิดพลาดผ่านบันทึกที่ไม่ระบุตัวตน)</p>
        </section>

        <section>
          <h2>3. ระยะเวลาการเก็บรักษาและการใช้งาน</h2>
          <p>- อีเมล / โปรไฟล์: <strong>ลบทันทีเมื่อยกเลิกบัญชี</strong></p>
          <p>- ข้อมูลตำแหน่ง: <strong>ไม่จัดเก็บบนเซิร์ฟเวอร์</strong> และลบทิ้งหลังใช้งานแบบเรียลไทม์</p>
          <p>- หากกฎหมายกำหนดให้ต้องเก็บ จะเก็บไว้ตามระยะเวลาที่กฎหมายกำหนดแล้วจึงลบ</p>
        </section>

        <section>
          <h2>4. การเปิดเผยแก่บุคคลที่สาม</h2>
          <p>- โดยหลักการแล้ว <strong>จะไม่เปิดเผยแก่บุคคลที่สามโดยไม่ได้รับความยินยอมล่วงหน้า</strong></p>
          <p>- อาจเปิดเผยได้เฉพาะในกรณีพิเศษ เช่น คำขอทางกฎหมาย</p>
        </section>

        <section>
          <h2>5. การมอบหมายการประมวลผล</h2>
          <p>- ปัจจุบัน <strong>ไม่มีการมอบหมายให้ภายนอก</strong> หากมีในอนาคต จะประกาศผู้รับมอบหมาย งาน และระยะเวลาผ่านนโยบายนี้และประกาศในแอป</p>
        </section>

        <section>
          <h2>6. สิทธิของผู้ใช้</h2>
          <p>- คุณสามารถขอ <strong>เข้าถึง แก้ไข และลบ</strong> ข้อมูลส่วนบุคคลได้</p>
          <p>- คุณสามารถขอลบผ่านแอปที่ <strong>การตั้งค่า → ลบบัญชี</strong> หรือทางอีเมลได้</p>
          <p>- อาจมีการขอข้อมูลเพิ่มเติมเพื่อยืนยันตัวตน</p>
        </section>

        <section>
          <h2>7. มาตรการรักษาความปลอดภัย</h2>
          <p>- <strong>เข้ารหัส (HTTPS/TLS)</strong> ระหว่างการส่งข้อมูล</p>
          <p>- จำกัดสิทธิ์การเข้าถึง ควบคุมการเข้าถึง และป้องกันการเข้าถึงโดยไม่ได้รับอนุญาต</p>
          <p>- มีการอบรมและการจัดการภายใน พร้อมแจ้งอย่างรวดเร็วเมื่อเกิดเหตุละเมิด</p>
        </section>

        <section>
          <h2>8. เด็กอายุต่ำกว่า 14 ปี</h2>
          <p>- บริการนี้ไม่ได้มุ่งให้ <strong>เด็กอายุต่ำกว่า 14 ปี</strong> ใช้งาน หากตรวจพบ จะลบบัญชีและข้อมูลโดยไม่ชักช้า</p>
        </section>

        <section>
          <h2>9. ผู้รับผิดชอบด้านความเป็นส่วนตัว</h2>
          <p>- ชื่อ: Hansol Yoon</p>
          <p>- อีเมล: yoondev3434@gmail.com</p>
          <p>- ติดต่อ: ในแอป <strong>การตั้งค่า → ติดต่อเรา</strong></p>
        </section>

        <section>
          <h2>10. การแจ้งและการปรับปรุง</h2>
          <p>- นโยบายนี้อาจมีการเปลี่ยนแปลง และการเปลี่ยนแปลงสำคัญจะมีการ <strong>แจ้งล่วงหน้า</strong> ผ่านประกาศในแอป</p>
        </section>
      </div>
    </>
  );
}

function VietnamesePrivacy() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Chính sách quyền riêng tư của MomentBook</h1>
        <div className={styles.meta}>
          <p><strong>Phiên bản:</strong> 1.0.1</p>
          <p><strong>Ngày có hiệu lực:</strong> 4 tháng 1, 2025</p>
          <p><strong>Cập nhật lần cuối:</strong> 4 tháng 1, 2025</p>
          <p><strong>Tên dịch vụ:</strong> MomentBook</p>
          <p><strong>Đơn vị vận hành:</strong> Hansol Yoon</p>
          <p><strong>Liên hệ:</strong> yoondev3434@gmail.com</p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <p>
            Ứng dụng coi trọng thông tin cá nhân của người dùng và xử lý an toàn theo quy định pháp luật hiện hành. Chính sách này giải thích thông tin nào được thu thập, sử dụng, lưu giữ và xóa bỏ, cũng như quyền của người dùng.
          </p>
        </section>

        <section>
          <h2>1. Thông tin được thu thập và thời điểm thu thập</h2>
          <p><strong>Đăng ký / đăng nhập</strong></p>
          <p>- Địa chỉ email (đăng nhập Google) - dùng để nhận diện và xác thực người dùng</p>

          <p><strong>Thay đổi hồ sơ</strong></p>
          <p>- Quyền truy cập ảnh / camera · thư viện - dùng để tải ảnh hồ sơ lên</p>

          <p><strong>Trong quá trình sử dụng ứng dụng</strong></p>
          <p>- Thông tin vị trí (chính xác / gần đúng) - dùng cho các tính năng dựa trên vị trí</p>

          <p><em>Lưu ý: thông tin vị trí được sử dụng theo thời gian thực và không được lưu trên máy chủ.</em></p>
        </section>

        <section>
          <h2>2. Mục đích sử dụng</h2>
          <p>- Nhận diện và xác thực người dùng, hiển thị hồ sơ</p>
          <p>- Cung cấp tính năng dựa trên vị trí (gắn thẻ bài đăng, hiển thị gần đây, v.v.)</p>
          <p>- Nếu bạn công khai một hành trình, nội dung đó sẽ được truy cập công khai trên web</p>
          <p>- Cải thiện độ ổn định và chất lượng dịch vụ (như xử lý lỗi bằng log đã khử định danh)</p>
        </section>

        <section>
          <h2>3. Thời gian lưu giữ và sử dụng</h2>
          <p>- Email / hồ sơ: <strong>xóa ngay khi người dùng xóa tài khoản</strong></p>
          <p>- Thông tin vị trí: <strong>không lưu trên máy chủ</strong>, được hủy sau khi dùng theo thời gian thực</p>
          <p>- Khi pháp luật yêu cầu lưu giữ, dữ liệu sẽ được lưu trong thời hạn áp dụng rồi mới xóa</p>
        </section>

        <section>
          <h2>4. Cung cấp cho bên thứ ba</h2>
          <p>- Về nguyên tắc, <strong>không cung cấp cho bên thứ ba nếu chưa có sự đồng ý trước</strong></p>
          <p>- Chỉ có thể cung cấp trong các trường hợp ngoại lệ như yêu cầu của pháp luật</p>
        </section>

        <section>
          <h2>5. Ủy thác xử lý</h2>
          <p>- Hiện tại <strong>không có ủy thác ra bên ngoài</strong>. Nếu phát sinh trong tương lai, đơn vị nhận ủy thác, công việc và thời gian sẽ được thông báo qua chính sách này và thông báo trong ứng dụng</p>
        </section>

        <section>
          <h2>6. Quyền của người dùng</h2>
          <p>- Bạn có thể yêu cầu <strong>truy cập, chỉnh sửa và xóa</strong> dữ liệu cá nhân</p>
          <p>- Bạn có thể yêu cầu xóa qua ứng dụng tại <strong>Cài đặt → Xóa tài khoản</strong> hoặc qua email</p>
          <p>- Có thể yêu cầu thêm thông tin để xác minh danh tính.</p>
        </section>

        <section>
          <h2>7. Biện pháp bảo mật</h2>
          <p>- <strong>Mã hóa (HTTPS/TLS)</strong> cho quá trình truyền dữ liệu</p>
          <p>- Giảm thiểu quyền truy cập, kiểm soát truy cập và chặn truy cập trái phép</p>
          <p>- Đào tạo và quản lý nội bộ, cùng với việc thông báo nhanh khi xảy ra sự cố</p>
        </section>

        <section>
          <h2>8. Trẻ em dưới 14 tuổi</h2>
          <p>- Dịch vụ không hướng tới <strong>trẻ em dưới 14 tuổi</strong>. Nếu phát hiện trường hợp này, tài khoản và dữ liệu sẽ bị xóa ngay.</p>
        </section>

        <section>
          <h2>9. Người phụ trách bảo vệ dữ liệu cá nhân</h2>
          <p>- Tên: Hansol Yoon</p>
          <p>- Email: yoondev3434@gmail.com</p>
          <p>- Liên hệ: trong ứng dụng <strong>Cài đặt → Liên hệ</strong></p>
        </section>

        <section>
          <h2>10. Thông báo và sửa đổi</h2>
          <p>- Chính sách này có thể được thay đổi, và các thay đổi quan trọng sẽ được <strong>thông báo trước</strong> qua thông báo trong ứng dụng.</p>
        </section>
      </div>
    </>
  );
}
