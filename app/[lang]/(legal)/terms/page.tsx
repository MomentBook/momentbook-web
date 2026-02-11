/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import styles from "./terms.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  let title = "MomentBook Terms of Service";
  let description = "Terms of use for MomentBook.";

  if (lang === "ko") {
    title = "MomentBook 이용약관";
    description = "MomentBook 이용약관을 안내합니다.";
  }

  if (lang === "ja") {
    title = "MomentBook 利用規約";
    description = "MomentBookの利用規約をご案内します。";
  }

  if (lang === "zh") {
    title = "MomentBook 服务条款";
    description = "了解 MomentBook 的服务条款。";
  }

  if (lang === "es") {
    title = "Terminos de servicio de MomentBook";
    description = "Consulta los terminos de uso de MomentBook.";
  }

  if (lang === "pt") {
    title = "Termos de uso do MomentBook";
    description = "Consulte os termos de uso do MomentBook.";
  }

  if (lang === "fr") {
    title = "Conditions d'utilisation de MomentBook";
    description = "Consultez les conditions d'utilisation de MomentBook.";
  }

  if (lang === "th") {
    title = "ข้อกำหนดการใช้งาน MomentBook";
    description = "ดูข้อกำหนดการใช้งานของ MomentBook";
  }

  if (lang === "vi") {
    title = "Dieu khoan su dung MomentBook";
    description = "Xem dieu khoan su dung cua MomentBook.";
  }

  const path = "/terms";
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

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content =
    lang === "ko" ? <KoreanTerms /> :
    lang === "ja" ? <JapaneseTerms /> :
    lang === "zh" ? <ChineseTerms /> :
    <EnglishTerms />;

  return (
    <div className={styles.container}>
      <article className={styles.content}>{content}</article>
    </div>
  );
}

function EnglishTerms() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MomentBook Terms of Service</h1>
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
          <h2>1. Purpose</h2>
          <p>These Terms of Service set forth the rights, obligations, and responsibilities between the Service and Users in connection with the use of MomentBook (hereinafter "the Service").</p>
        </section>

        <section>
          <h2>2. Effectiveness and Amendment of Terms</h2>
          <p>- These Terms become effective upon notice within the Service or by providing a link.</p>
          <p>- The Company may amend these Terms to the extent that such amendments do not violate applicable laws. In the event of an amendment, the effective date and reason for revision shall be notified at least 7 days in advance.</p>
          <p>- Continued use of the Service after the notice period and before the effective date shall be deemed as acceptance of the amended Terms.</p>
        </section>

        <section>
          <h2>3. Age Requirement</h2>
          <p>The Service is available only to users <strong>aged 14 and older</strong> (rated 13+ on the App Store). By registering, users agree that they meet the age requirement.</p>
        </section>

        <section>
          <h2>4. Account and Authentication</h2>
          <p>- Users must provide accurate and up-to-date information.</p>
          <p>- Users are responsible for the security of their accounts (including social login accounts).</p>
          <p>- Accounts found to be fraudulently used or compromised may be restricted or terminated.</p>
        </section>

        <section>
          <h2>5. User-Generated Content (UGC) and Rights</h2>
          <p>- Copyright of text, images, and metadata uploaded by users (hereinafter "UGC") generally belongs to the user.</p>
          <p>- Users grant the Company a <strong>non-exclusive, worldwide, royalty-free, sublicensable</strong> license to use UGC for the purpose of providing, operating, and promoting the Service (including display, storage, backup, and transmission within the Service).</p>
          <p>- If you choose to publish a journey, that content becomes publicly accessible on the web.</p>
          <p>- Users may only upload UGC that does not infringe upon the rights of others.</p>
        </section>

        <section>
          <h2>6. Prohibited Conduct</h2>
          <p>The following content and conduct are prohibited. For detailed examples, please refer to the <strong>Community Guidelines (Zero Tolerance Policy)</strong>:</p>
          <p>Illegal, harmful, obscene, or youth-harmful content; content encouraging self-harm or suicide; incitement of violence or terrorism; hate speech or discrimination; harassment or stalking; disclosure of personal information; fraud or spam; intellectual property infringement; abuse of the Service, etc.</p>
        </section>

        <section>
          <h2>7. Reporting, Blocking, Deletion, and Sanctions</h2>
          <p>- Users may <strong>report or block</strong> content or other users.</p>
          <p>- Users may <strong>immediately delete</strong> their own posts.</p>
          <p>- The Company will review reports and take action (deletion, restriction, termination, etc.) <strong>within 24 business hours</strong> of receipt.</p>
          <p>- Repeated violations may result in permanent restriction and legal action.</p>
        </section>

        <section>
          <h2>8. Service Changes and Suspension</h2>
          <p>The Service (or certain features) may be changed or suspended for operational, security, or legal reasons, with prior or subsequent notice as necessary.</p>
        </section>

        <section>
          <h2>9. Limitation of Liability</h2>
          <p>- The Company shall not be liable for damages caused by force majeure, including natural disasters or third-party service failures, to the extent permitted by applicable law.</p>
          <p>- Liability for indirect, special, or consequential damages is limited to the extent permitted by applicable law.</p>
        </section>

        <section>
          <h2>10. Third-Party Services</h2>
          <p>When integrating social login, analytics, or notifications (such as Firebase), the terms and policies of the respective providers may apply. Please refer to the <strong>Privacy Policy</strong> for details.</p>
        </section>

        <section>
          <h2>11. Termination and Account Deletion</h2>
          <p>Users may delete their accounts at any time through the in-app flow:</p>
          <p><strong>Settings → Account → Delete Account</strong> (immediate deletion request after re-authentication)</p>
          <p>Or request deletion via email: <strong>yoondev3434@gmail.com</strong></p>
          <p>If there is a legal retention obligation, full deletion will occur after the required retention period.</p>
        </section>

        <section>
          <h2>12. Governing Law and Dispute Resolution</h2>
          <p>These Terms are governed by the laws of the Republic of Korea, and disputes may be submitted to the competent court.</p>
        </section>
      </div>
    </>
  );
}

function KoreanTerms() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MomentBook 이용약관</h1>
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
          <h2>1. 목적</h2>
          <p>본 약관은 사용자가 MomentBook(이하 "서비스")을 이용함에 있어 서비스와 사용자 간의 권리·의무 및 책임사항을 규정합니다.</p>
        </section>

        <section>
          <h2>2. 약관의 효력 및 변경</h2>
          <p>- 본 약관은 서비스 내 고지 또는 링크 제공 시 효력이 발생합니다.</p>
          <p>- 회사는 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있으며, 변경 시 적용일자 및 개정 사유를 최소 7일 전 고지합니다.</p>
          <p>- 변경 고지 후 시행일까지 서비스 이용을 계속하면 변경에 동의한 것으로 간주합니다.</p>
        </section>

        <section>
          <h2>3. 연령 요건</h2>
          <p>서비스는 <strong>만 14세 이상</strong>(App Store 등급 표기상 13+)만 이용할 수 있습니다. 사용자는 가입 시 연령 요건 충족에 동의합니다.</p>
        </section>

        <section>
          <h2>4. 계정 및 인증</h2>
          <p>- 사용자는 정확하고 최신의 정보를 제공해야 합니다.</p>
          <p>- 계정 보안(소셜 로그인 계정 포함)은 사용자 책임입니다.</p>
          <p>- 부정 사용·도용이 확인되면 계정 제한 또는 이용 해지될 수 있습니다.</p>
        </section>

        <section>
          <h2>5. 사용자 생성 콘텐츠(UGC)와 권리</h2>
          <p>- 사용자가 업로드한 텍스트·이미지·메타데이터(이하 "UGC")의 저작권은 원칙적으로 사용자에게 있습니다.</p>
          <p>- 사용자는 회사에 대해 서비스 제공·운영·홍보 목적의 <strong>비독점적·전세계적·무상·재라이선스 가능</strong> 이용권을 부여합니다(서비스 내 표시·저장·백업·전송 포함).</p>
          <p>- 게시하기를 선택하면 해당 콘텐츠는 웹에 공개됩니다.</p>
          <p>- 사용자는 타인의 권리를 침해하지 않는 UGC만 업로드해야 합니다.</p>
        </section>

        <section>
          <h2>6. 금지 행위</h2>
          <p>아래 콘텐츠/행위는 금지됩니다. 자세한 예시는 <strong>커뮤니티 가이드라인(무관용 정책)</strong>을 따릅니다.</p>
          <p>불법·유해·음란·청소년 유해, 자해·자살 조장, 폭력·테러 선동, 혐오·차별, 괴롭힘·스토킹, 개인정보 노출, 사기·스팸, 지식재산권 침해, 서비스 악용 등.</p>
        </section>

        <section>
          <h2>7. 신고·차단·삭제 및 제재</h2>
          <p>- 사용자는 콘텐츠/사용자를 <strong>신고·차단</strong>할 수 있습니다.</p>
          <p>- 사용자는 자신의 게시물을 <strong>즉시 삭제</strong>할 수 있습니다.</p>
          <p>- 회사는 신고 접수 시 <strong>영업일 기준 24시간 내</strong> 검토·조치(삭제, 제한, 해지 등)합니다.</p>
          <p>- 반복 위반 시 영구 제한 및 법적 조치가 이루어질 수 있습니다.</p>
        </section>

        <section>
          <h2>8. 서비스 변경 및 중단</h2>
          <p>운영상·보안상 또는 법적 사유로 서비스(또는 일부 기능)가 변경·중단될 수 있으며, 필요한 경우 사전/사후 고지합니다.</p>
        </section>

        <section>
          <h2>9. 책임의 제한</h2>
          <p>- 천재지변, 제3자 서비스 장애 등 불가항력으로 인한 손해에 대해 회사는 법령이 허용하는 범위 내에서 책임을 지지 않습니다.</p>
          <p>- 간접·특별·결과적 손해에 대한 책임은 관련 법령이 허용하는 범위에서 제한됩니다.</p>
        </section>

        <section>
          <h2>10. 제3자 서비스</h2>
          <p>소셜 로그인, 분석/알림(Firebase 등) 연동 시 해당 사업자의 약관/정책이 적용될 수 있습니다. 자세한 내용은 <strong>개인정보 처리방침</strong>을 참고하세요.</p>
        </section>

        <section>
          <h2>11. 계약 해지 및 계정 삭제</h2>
          <p>사용자는 앱 내 경로에서 언제든 계정을 삭제할 수 있습니다:</p>
          <p><strong>설정 → 계정 → 계정 삭제</strong>(재인증 후 즉시 삭제 요청)</p>
          <p>또는 이메일로 삭제 요청: <strong>yoondev3434@gmail.com</strong></p>
          <p>법정 보관 의무가 있는 경우 해당 기간 이후 완전 삭제합니다.</p>
        </section>

        <section>
          <h2>12. 준거법 및 분쟁 해결</h2>
          <p>본 약관은 대한민국 법률을 준거법으로 하며, 분쟁은 관할 법원에 제기할 수 있습니다.</p>
        </section>
      </div>
    </>
  );
}

function JapaneseTerms() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MomentBook 利用規約</h1>
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
          <h2>1. 目的</h2>
          <p>本規約は、利用者がMomentBook（以下「本サービス」といいます）を利用するにあたり、本サービスと利用者との間の権利・義務および責任事項を定めるものです。</p>
        </section>

        <section>
          <h2>2. 規約の効力および変更</h2>
          <p>- 本規約は、本サービス内での告知またはリンク提供時に効力を生じます。</p>
          <p>- 当社は、関連法令に違反しない範囲において本規約を変更することができ、変更時には適用日および改定理由を最低7日前に告知します。</p>
          <p>- 変更告知後、施行日までに本サービスの利用を継続した場合、変更に同意したものとみなします。</p>
        </section>

        <section>
          <h2>3. 年齢要件</h2>
          <p>本サービスは <strong>満14歳以上</strong>（App Store表記上13+）の方のみご利用いただけます。利用者は、登録時に年齢要件を満たしていることに同意するものとします。</p>
        </section>

        <section>
          <h2>4. アカウントおよび認証</h2>
          <p>- 利用者は正確かつ最新の情報を提供する必要があります。</p>
          <p>- アカウントのセキュリティ（ソーシャルログインアカウントを含む）は利用者の責任となります。</p>
          <p>- 不正使用・盗用が確認された場合、アカウントの制限または利用解除が行われることがあります。</p>
        </section>

        <section>
          <h2>5. ユーザー生成コンテンツ（UGC）と権利</h2>
          <p>- 利用者がアップロードしたテキスト・画像・メタデータ（以下「UGC」といいます）の著作権は、原則として利用者に帰属します。</p>
          <p>- 利用者は、当社に対し、本サービスの提供・運営・広報目的での <strong>非独占的・全世界的・無償・再許諾可能な</strong> 利用権を付与します（サービス内での表示・保存・バックアップ・送信を含みます）。</p>
          <p>- 投稿すると旅の内容がWebで公開されます。</p>
          <p>- 利用者は、他者の権利を侵害しないUGCのみをアップロードする必要があります。</p>
        </section>

        <section>
          <h2>6. 禁止行為</h2>
          <p>以下のコンテンツ・行為は禁止されます。詳細な例は <strong>コミュニティガイドライン（ゼロトレランスポリシー）</strong> をご参照ください。</p>
          <p>違法・有害・わいせつ・青少年有害、自傷・自殺助長、暴力・テロ扇動、ヘイト・差別、嫌がらせ・ストーキング、個人情報の暴露、詐欺・スパム、知的財産権侵害、サービスの悪用など。</p>
        </section>

        <section>
          <h2>7. 通報・ブロック・削除および制裁</h2>
          <p>- 利用者はコンテンツ・他の利用者を <strong>通報・ブロック</strong> することができます。</p>
          <p>- 利用者は自身の投稿を <strong>即時削除</strong> することができます。</p>
          <p>- 当社は通報を受け付けた場合、<strong>営業日基準で24時間以内</strong> に審査・措置（削除、制限、解除など）を行います。</p>
          <p>- 繰り返し違反した場合、永久制限および法的措置が取られることがあります。</p>
        </section>

        <section>
          <h2>8. サービスの変更および中断</h2>
          <p>運営上・セキュリティ上または法的理由により、本サービス（または一部機能）が変更・中断される場合があり、必要に応じて事前・事後に告知します。</p>
        </section>

        <section>
          <h2>9. 責任の制限</h2>
          <p>- 天災地変、第三者サービスの障害など不可抗力による損害について、当社は法令が許容する範囲内で責任を負いません。</p>
          <p>- 間接的・特別・結果的損害についての責任は、関連法令が許容する範囲で制限されます。</p>
        </section>

        <section>
          <h2>10. 第三者サービス</h2>
          <p>ソーシャルログイン、分析・通知（Firebaseなど）連携時には、当該事業者の規約・ポリシーが適用される場合があります。詳細は <strong>プライバシーポリシー</strong> をご参照ください。</p>
        </section>

        <section>
          <h2>11. 契約解除およびアカウント削除</h2>
          <p>利用者はアプリ内の経路からいつでもアカウントを削除できます：</p>
          <p><strong>設定 → アカウント → アカウント削除</strong>（再認証後、即時削除リクエスト）</p>
          <p>またはメールで削除リクエスト: <strong>yoondev3434@gmail.com</strong></p>
          <p>法定保管義務がある場合、該当期間経過後に完全削除します。</p>
        </section>

        <section>
          <h2>12. 準拠法および紛争解決</h2>
          <p>本規約は大韓民国の法律を準拠法とし、紛争は管轄裁判所に提起することができます。</p>
        </section>
      </div>
    </>
  );
}

function ChineseTerms() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MomentBook 服务条款</h1>
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
          <h2>1. 目的</h2>
          <p>本条款规定用户在使用MomentBook（以下简称"本服务"）过程中，本服务与用户之间的权利、义务及责任事项。</p>
        </section>

        <section>
          <h2>2. 条款的效力及变更</h2>
          <p>- 本条款自在服务内公告或提供链接时生效。</p>
          <p>- 公司可在不违反相关法律法规的范围内变更本条款，变更时将提前至少7天公告适用日期及修订理由。</p>
          <p>- 变更公告后至生效日前继续使用本服务的，视为同意变更内容。</p>
        </section>

        <section>
          <h2>3. 年龄要求</h2>
          <p>本服务仅限 <strong>年满14周岁以上</strong>（App Store标注为13+）的用户使用。用户注册时即同意满足年龄要求。</p>
        </section>

        <section>
          <h2>4. 账户及认证</h2>
          <p>- 用户应提供准确且最新的信息。</p>
          <p>- 账户安全（包括社交登录账户）由用户自行负责。</p>
          <p>- 如发现不当使用或盗用情况，账户可能被限制或终止使用。</p>
        </section>

        <section>
          <h2>5. 用户生成内容（UGC）及权利</h2>
          <p>- 用户上传的文本、图像、元数据（以下简称"UGC"）的著作权原则上归属于用户。</p>
          <p>- 用户授予公司为提供、运营及推广服务目的的 <strong>非独占性、全球性、免费、可再许可</strong> 使用权（包括在服务内展示、存储、备份、传输）。</p>
          <p>- 发布后，该内容会在网页公开。</p>
          <p>- 用户仅可上传不侵犯他人权利的UGC。</p>
        </section>

        <section>
          <h2>6. 禁止行为</h2>
          <p>以下内容及行为被禁止。详细示例请参见 <strong>社区指南（零容忍政策）</strong>：</p>
          <p>违法、有害、淫秽、青少年不宜内容；鼓励自残或自杀；煽动暴力或恐怖主义；仇恨、歧视；骚扰、跟踪；泄露个人信息；欺诈、垃圾信息；侵犯知识产权；滥用服务等。</p>
        </section>

        <section>
          <h2>7. 举报、屏蔽、删除及制裁</h2>
          <p>- 用户可 <strong>举报或屏蔽</strong> 内容或其他用户。</p>
          <p>- 用户可 <strong>立即删除</strong> 自己的帖子。</p>
          <p>- 公司在收到举报后，将在 <strong>工作日24小时内</strong> 进行审查并采取措施（删除、限制、终止等）。</p>
          <p>- 重复违规者可能受到永久限制及法律追责。</p>
        </section>

        <section>
          <h2>8. 服务变更及中断</h2>
          <p>因运营、安全或法律原因，本服务（或部分功能）可能发生变更或中断，必要时将进行事前或事后公告。</p>
        </section>

        <section>
          <h2>9. 责任限制</h2>
          <p>- 对因不可抗力（包括自然灾害、第三方服务故障等）造成的损失，公司在法律允许的范围内不承担责任。</p>
          <p>- 对间接、特殊或结果性损失的责任，在相关法律法规允许的范围内予以限制。</p>
        </section>

        <section>
          <h2>10. 第三方服务</h2>
          <p>使用社交登录、分析及通知（如Firebase等）时，可能适用相关服务提供商的条款及政策。详细信息请参阅 <strong>隐私政策</strong>。</p>
        </section>

        <section>
          <h2>11. 合同解除及账户删除</h2>
          <p>用户可随时通过应用内路径删除账户：</p>
          <p><strong>设置 → 账户 → 删除账户</strong>（重新认证后立即提交删除请求）</p>
          <p>或通过邮件请求删除: <strong>yoondev3434@gmail.com</strong></p>
          <p>如存在法定保存义务，将在规定期限后完全删除。</p>
        </section>

        <section>
          <h2>12. 适用法律及争议解决</h2>
          <p>本条款适用大韩民国法律，争议可向有管辖权的法院提起诉讼。</p>
        </section>
      </div>
    </>
  );
}
