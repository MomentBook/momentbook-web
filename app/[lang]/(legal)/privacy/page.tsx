import type { Metadata } from "next";
import styles from "./privacy.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  let title = "MomentBook Privacy Policy";
  let description = "How MomentBook handles your data.";

  if (lang === "ko") {
    title = "MomentBook 개인정보 처리방침";
    description = "MomentBook 개인정보 처리방침을 안내합니다.";
  }

  if (lang === "ja") {
    title = "MomentBook プライバシーポリシー";
    description = "MomentBookのプライバシーポリシーをご案内します。";
  }

  if (lang === "zh") {
    title = "MomentBook 隐私政策";
    description = "了解 MomentBook 的隐私政策。";
  }

  const path = "/privacy";
  const url = buildOpenGraphUrl(lang, path);

  return {
    title,
    description,
    alternates: buildAlternates(lang, path),
    openGraph: {
      title,
      description,
      url,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content =
    lang === "ko" ? <KoreanPrivacy /> :
    lang === "ja" ? <JapanesePrivacy /> :
    lang === "zh" ? <ChinesePrivacy /> :
    <EnglishPrivacy />;

  return (
    <div className={styles.container}>
      <article className={styles.content}>{content}</article>
    </div>
  );
}

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
