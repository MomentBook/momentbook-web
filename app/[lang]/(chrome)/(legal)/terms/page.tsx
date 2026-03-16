/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import styles from "./terms.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { buildNoIndexRobots } from "@/lib/seo/public-metadata";

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
    title = "Términos de servicio de MomentBook";
    description = "Consulta los términos de uso de MomentBook.";
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
    title = "Điều khoản sử dụng MomentBook";
    description = "Xem điều khoản sử dụng của MomentBook.";
  }

  const path = "/terms";
  const url = buildOpenGraphUrl(lang, path);

  return {
    title,
    description,
    robots: buildNoIndexRobots(),
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
  const content = getTermsContent(lang);

  return (
    <div className={styles.container}>
      <article className={styles.content}>{content}</article>
    </div>
  );
}

function getTermsContent(lang: Language) {
  switch (lang) {
    case "ko":
      return <KoreanTerms />;
    case "ja":
      return <JapaneseTerms />;
    case "zh":
      return <ChineseTerms />;
    case "es":
      return <SpanishTerms />;
    case "pt":
      return <PortugueseTerms />;
    case "fr":
      return <FrenchTerms />;
    case "th":
      return <ThaiTerms />;
    case "vi":
      return <VietnameseTerms />;
    default:
      return <EnglishTerms />;
  }
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

function SpanishTerms() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Términos de servicio de MomentBook</h1>
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
          <h2>1. Finalidad</h2>
          <p>Estos Términos de servicio establecen los derechos, obligaciones y responsabilidades entre el Servicio y los Usuarios en relación con el uso de MomentBook (en adelante, el "Servicio").</p>
        </section>

        <section>
          <h2>2. Vigencia y modificación de los términos</h2>
          <p>- Estos términos entran en vigor cuando se notifican dentro del Servicio o mediante un enlace.</p>
          <p>- La empresa podrá modificar estos términos siempre que no infrinjan la legislación aplicable. En caso de modificación, la fecha de entrada en vigor y el motivo del cambio se notificarán al menos con 7 días de antelación.</p>
          <p>- Si continúas usando el Servicio después del aviso y antes de la fecha de entrada en vigor, se considerará que aceptas los términos modificados.</p>
        </section>

        <section>
          <h2>3. Requisito de edad</h2>
          <p>El Servicio está disponible solo para usuarios <strong>mayores de 14 años</strong> (clasificación 13+ en App Store). Al registrarte, aceptas que cumples este requisito.</p>
        </section>

        <section>
          <h2>4. Cuenta y autenticación</h2>
          <p>- Los usuarios deben proporcionar información exacta y actualizada.</p>
          <p>- Los usuarios son responsables de la seguridad de sus cuentas (incluidas las cuentas de inicio de sesión social).</p>
          <p>- Las cuentas que se detecten como fraudulentas o comprometidas podrán ser restringidas o canceladas.</p>
        </section>

        <section>
          <h2>5. Contenido generado por el usuario (UGC) y derechos</h2>
          <p>- El copyright del texto, imágenes y metadatos subidos por los usuarios (en adelante, "UGC") pertenece, por regla general, al usuario.</p>
          <p>- Los usuarios otorgan a la empresa una licencia <strong>no exclusiva, mundial, gratuita y sublicenciable</strong> para usar el UGC con el fin de prestar, operar y promocionar el Servicio (incluyendo mostrar, almacenar, respaldar y transmitir dentro del Servicio).</p>
          <p>- Si eliges publicar un viaje, ese contenido pasará a estar accesible públicamente en la web.</p>
          <p>- Los usuarios solo pueden subir UGC que no infrinja derechos de terceros.</p>
        </section>

        <section>
          <h2>6. Conductas prohibidas</h2>
          <p>Se prohíben los siguientes contenidos y conductas. Para ejemplos detallados, consulta las <strong>Normas de la comunidad (política de tolerancia cero)</strong>:</p>
          <p>Contenido ilegal, dañino, obsceno o perjudicial para menores; contenido que fomente autolesiones o suicidio; incitación a la violencia o al terrorismo; discursos de odio o discriminación; acoso o stalking; divulgación de información personal; fraude o spam; infracción de propiedad intelectual; abuso del Servicio, etc.</p>
        </section>

        <section>
          <h2>7. Reportes, bloqueo, eliminación y sanciones</h2>
          <p>- Los usuarios pueden <strong>reportar o bloquear</strong> contenido u otros usuarios.</p>
          <p>- Los usuarios pueden <strong>eliminar de inmediato</strong> sus propias publicaciones.</p>
          <p>- La empresa revisará los reportes y tomará medidas (eliminación, restricción, cancelación, etc.) <strong>dentro de 24 horas hábiles</strong> desde su recepción.</p>
          <p>- Las infracciones repetidas pueden dar lugar a una restricción permanente y a acciones legales.</p>
        </section>

        <section>
          <h2>8. Cambios y suspensión del servicio</h2>
          <p>El Servicio (o determinadas funciones) puede cambiar o suspenderse por motivos operativos, de seguridad o legales, con aviso previo o posterior cuando corresponda.</p>
        </section>

        <section>
          <h2>9. Limitación de responsabilidad</h2>
          <p>- La empresa no será responsable de los daños causados por fuerza mayor, incluidos desastres naturales o fallos de servicios de terceros, en la medida permitida por la ley aplicable.</p>
          <p>- La responsabilidad por daños indirectos, especiales o consecuentes queda limitada en la medida permitida por la ley aplicable.</p>
        </section>

        <section>
          <h2>10. Servicios de terceros</h2>
          <p>Cuando se integren inicio de sesión social, analíticas o notificaciones (como Firebase), podrán aplicarse los términos y políticas de los respectivos proveedores. Consulta la <strong>Política de privacidad</strong> para más detalles.</p>
        </section>

        <section>
          <h2>11. Terminación y eliminación de la cuenta</h2>
          <p>Los usuarios pueden eliminar su cuenta en cualquier momento mediante el flujo dentro de la app:</p>
          <p><strong>Ajustes → Cuenta → Eliminar cuenta</strong> (solicitud inmediata de eliminación tras volver a autenticarse)</p>
          <p>O solicitar la eliminación por correo: <strong>yoondev3434@gmail.com</strong></p>
          <p>Si existe una obligación legal de conservación, la eliminación completa se realizará una vez finalizado ese período.</p>
        </section>

        <section>
          <h2>12. Ley aplicable y resolución de disputas</h2>
          <p>Estos términos se rigen por las leyes de la República de Corea, y las disputas podrán someterse al tribunal competente.</p>
        </section>
      </div>
    </>
  );
}

function PortugueseTerms() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Termos de uso do MomentBook</h1>
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
          <h2>1. Finalidade</h2>
          <p>Estes Termos de uso estabelecem os direitos, obrigações e responsabilidades entre o Serviço e os Usuários em relação ao uso do MomentBook (doravante, o "Serviço").</p>
        </section>

        <section>
          <h2>2. Vigência e alteração dos termos</h2>
          <p>- Estes Termos entram em vigor quando forem informados dentro do Serviço ou por meio de um link.</p>
          <p>- A empresa poderá alterar estes Termos desde que isso não viole a legislação aplicável. Em caso de alteração, a data de vigência e o motivo da revisão serão informados com pelo menos 7 dias de antecedência.</p>
          <p>- A continuidade de uso do Serviço após o aviso e antes da data de vigência será considerada como aceitação dos Termos alterados.</p>
        </section>

        <section>
          <h2>3. Requisito de idade</h2>
          <p>O Serviço está disponível apenas para usuários <strong>com 14 anos ou mais</strong> (classificação 13+ na App Store). Ao se cadastrar, o usuário concorda que atende ao requisito de idade.</p>
        </section>

        <section>
          <h2>4. Conta e autenticação</h2>
          <p>- Os usuários devem fornecer informações corretas e atualizadas.</p>
          <p>- Os usuários são responsáveis pela segurança de suas contas (incluindo contas de login social).</p>
          <p>- Contas identificadas como fraudulentas ou comprometidas podem ser restringidas ou encerradas.</p>
        </section>

        <section>
          <h2>5. Conteúdo gerado pelo usuário (UGC) e direitos</h2>
          <p>- Os direitos autorais de textos, imagens e metadados enviados pelos usuários (doravante, "UGC") pertencem, em princípio, ao usuário.</p>
          <p>- Os usuários concedem à empresa uma licença <strong>não exclusiva, mundial, gratuita e sublicenciável</strong> para usar o UGC com a finalidade de fornecer, operar e promover o Serviço (incluindo exibição, armazenamento, backup e transmissão dentro do Serviço).</p>
          <p>- Se você optar por publicar uma jornada, esse conteúdo ficará acessível publicamente na web.</p>
          <p>- Os usuários só podem enviar UGC que não viole direitos de terceiros.</p>
        </section>

        <section>
          <h2>6. Condutas proibidas</h2>
          <p>Os seguintes conteúdos e condutas são proibidos. Para exemplos detalhados, consulte as <strong>Diretrizes da comunidade (política de tolerância zero)</strong>:</p>
          <p>Conteúdo ilegal, nocivo, obsceno ou prejudicial a menores; conteúdo que incentive automutilação ou suicídio; incitação à violência ou ao terrorismo; discurso de ódio ou discriminação; assédio ou stalking; divulgação de informações pessoais; fraude ou spam; violação de propriedade intelectual; abuso do Serviço etc.</p>
        </section>

        <section>
          <h2>7. Denúncia, bloqueio, exclusão e sanções</h2>
          <p>- Os usuários podem <strong>denunciar ou bloquear</strong> conteúdo ou outros usuários.</p>
          <p>- Os usuários podem <strong>excluir imediatamente</strong> suas próprias publicações.</p>
          <p>- A empresa revisará as denúncias e tomará medidas (exclusão, restrição, encerramento etc.) <strong>dentro de 24 horas úteis</strong> a partir do recebimento.</p>
          <p>- Violações repetidas podem resultar em restrição permanente e medidas legais.</p>
        </section>

        <section>
          <h2>8. Alterações e suspensão do serviço</h2>
          <p>O Serviço (ou determinados recursos) pode ser alterado ou suspenso por motivos operacionais, de segurança ou legais, com aviso prévio ou posterior quando necessário.</p>
        </section>

        <section>
          <h2>9. Limitação de responsabilidade</h2>
          <p>- A empresa não será responsável por danos causados por força maior, incluindo desastres naturais ou falhas de serviços de terceiros, na medida permitida pela legislação aplicável.</p>
          <p>- A responsabilidade por danos indiretos, especiais ou consequenciais é limitada na medida permitida pela legislação aplicável.</p>
        </section>

        <section>
          <h2>10. Serviços de terceiros</h2>
          <p>Quando houver integração com login social, analytics ou notificações (como Firebase), os termos e políticas dos respectivos provedores poderão ser aplicados. Consulte a <strong>Política de privacidade</strong> para mais detalhes.</p>
        </section>

        <section>
          <h2>11. Rescisão e exclusão de conta</h2>
          <p>Os usuários podem excluir suas contas a qualquer momento pelo fluxo dentro do app:</p>
          <p><strong>Configurações → Conta → Excluir conta</strong> (solicitação imediata de exclusão após nova autenticação)</p>
          <p>Ou solicitar a exclusão por e-mail: <strong>yoondev3434@gmail.com</strong></p>
          <p>Se houver obrigação legal de retenção, a exclusão completa ocorrerá após o término do período exigido.</p>
        </section>

        <section>
          <h2>12. Lei aplicável e resolução de disputas</h2>
          <p>Estes Termos são regidos pelas leis da República da Coreia, e eventuais disputas podem ser submetidas ao tribunal competente.</p>
        </section>
      </div>
    </>
  );
}

function FrenchTerms() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Conditions d’utilisation de MomentBook</h1>
        <div className={styles.meta}>
          <p><strong>Version :</strong> 1.0.1</p>
          <p><strong>Date d’entrée en vigueur :</strong> 4 janvier 2025</p>
          <p><strong>Dernière mise à jour :</strong> 4 janvier 2025</p>
          <p><strong>Nom du service :</strong> MomentBook</p>
          <p><strong>Exploitant :</strong> Hansol Yoon</p>
          <p><strong>Contact :</strong> yoondev3434@gmail.com</p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <h2>1. Objet</h2>
          <p>Les présentes conditions d’utilisation définissent les droits, obligations et responsabilités entre le Service et les Utilisateurs dans le cadre de l’utilisation de MomentBook (ci-après le « Service »).</p>
        </section>

        <section>
          <h2>2. Entrée en vigueur et modification des conditions</h2>
          <p>- Les présentes conditions prennent effet lorsqu’elles sont annoncées dans le Service ou fournies via un lien.</p>
          <p>- La société peut modifier ces conditions dans la mesure où ces modifications ne contreviennent pas au droit applicable. En cas de modification, la date d’entrée en vigueur et le motif de la révision seront annoncés au moins 7 jours à l’avance.</p>
          <p>- La poursuite de l’utilisation du Service après l’avis et avant la date d’entrée en vigueur vaut acceptation des conditions modifiées.</p>
        </section>

        <section>
          <h2>3. Condition d’âge</h2>
          <p>Le Service est accessible uniquement aux utilisateurs <strong>âgés de 14 ans et plus</strong> (classification 13+ sur l’App Store). En s’inscrivant, l’utilisateur confirme qu’il remplit cette condition.</p>
        </section>

        <section>
          <h2>4. Compte et authentification</h2>
          <p>- Les utilisateurs doivent fournir des informations exactes et à jour.</p>
          <p>- Les utilisateurs sont responsables de la sécurité de leurs comptes (y compris les comptes de connexion sociale).</p>
          <p>- Les comptes identifiés comme frauduleux ou compromis peuvent être restreints ou résiliés.</p>
        </section>

        <section>
          <h2>5. Contenu généré par l’utilisateur (UGC) et droits</h2>
          <p>- Les droits d’auteur sur les textes, images et métadonnées téléchargés par les utilisateurs (ci-après « UGC ») appartiennent en principe à l’utilisateur.</p>
          <p>- Les utilisateurs accordent à la société une licence <strong>non exclusive, mondiale, gratuite et sous-licenciable</strong> pour utiliser l’UGC aux fins de fourniture, d’exploitation et de promotion du Service (y compris l’affichage, le stockage, la sauvegarde et la transmission au sein du Service).</p>
          <p>- Si vous choisissez de publier un voyage, ce contenu devient accessible publiquement sur le web.</p>
          <p>- Les utilisateurs ne peuvent télécharger que des UGC qui ne portent pas atteinte aux droits d’autrui.</p>
        </section>

        <section>
          <h2>6. Comportements interdits</h2>
          <p>Les contenus et comportements suivants sont interdits. Pour des exemples détaillés, veuillez consulter les <strong>Règles de la communauté (politique de tolérance zéro)</strong> :</p>
          <p>Contenu illégal, nuisible, obscène ou préjudiciable aux mineurs ; contenu encourageant l’automutilation ou le suicide ; incitation à la violence ou au terrorisme ; discours haineux ou discrimination ; harcèlement ou stalking ; divulgation d’informations personnelles ; fraude ou spam ; atteinte à la propriété intellectuelle ; abus du Service, etc.</p>
        </section>

        <section>
          <h2>7. Signalement, blocage, suppression et sanctions</h2>
          <p>- Les utilisateurs peuvent <strong>signaler ou bloquer</strong> des contenus ou d’autres utilisateurs.</p>
          <p>- Les utilisateurs peuvent <strong>supprimer immédiatement</strong> leurs propres publications.</p>
          <p>- La société examinera les signalements et prendra des mesures (suppression, restriction, résiliation, etc.) <strong>dans un délai de 24 heures ouvrées</strong> à compter de leur réception.</p>
          <p>- Les violations répétées peuvent entraîner une restriction permanente et des actions en justice.</p>
        </section>

        <section>
          <h2>8. Modifications et suspension du service</h2>
          <p>Le Service (ou certaines fonctionnalités) peut être modifié ou suspendu pour des raisons opérationnelles, de sécurité ou juridiques, avec notification préalable ou ultérieure selon les besoins.</p>
        </section>

        <section>
          <h2>9. Limitation de responsabilité</h2>
          <p>- La société n’est pas responsable des dommages causés par un cas de force majeure, y compris les catastrophes naturelles ou les défaillances de services tiers, dans la mesure permise par le droit applicable.</p>
          <p>- La responsabilité pour les dommages indirects, spéciaux ou consécutifs est limitée dans la mesure permise par le droit applicable.</p>
        </section>

        <section>
          <h2>10. Services tiers</h2>
          <p>En cas d’intégration d’une connexion sociale, d’outils d’analyse ou de notifications (tels que Firebase), les conditions et politiques des fournisseurs concernés peuvent s’appliquer. Veuillez consulter la <strong>Politique de confidentialité</strong> pour plus de détails.</p>
        </section>

        <section>
          <h2>11. Résiliation et suppression du compte</h2>
          <p>Les utilisateurs peuvent supprimer leur compte à tout moment via le parcours prévu dans l’application :</p>
          <p><strong>Réglages → Compte → Supprimer le compte</strong> (demande de suppression immédiate après nouvelle authentification)</p>
          <p>Ou demander la suppression par e-mail : <strong>yoondev3434@gmail.com</strong></p>
          <p>S’il existe une obligation légale de conservation, la suppression complète interviendra après l’expiration de la durée requise.</p>
        </section>

        <section>
          <h2>12. Droit applicable et règlement des litiges</h2>
          <p>Les présentes conditions sont régies par le droit de la République de Corée, et les litiges peuvent être portés devant la juridiction compétente.</p>
        </section>
      </div>
    </>
  );
}

function ThaiTerms() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>ข้อกำหนดการใช้งาน MomentBook</h1>
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
          <h2>1. วัตถุประสงค์</h2>
          <p>ข้อกำหนดการใช้งานนี้กำหนดสิทธิ หน้าที่ และความรับผิดชอบระหว่างบริการและผู้ใช้ในการใช้ MomentBook (ต่อไปนี้เรียกว่า "บริการ")</p>
        </section>

        <section>
          <h2>2. การมีผลใช้บังคับและการแก้ไขข้อกำหนด</h2>
          <p>- ข้อกำหนดนี้มีผลเมื่อมีการประกาศภายในบริการหรือให้ผ่านลิงก์</p>
          <p>- บริษัทอาจแก้ไขข้อกำหนดนี้ได้ตราบเท่าที่ไม่ขัดต่อกฎหมายที่เกี่ยวข้อง หากมีการแก้ไข จะประกาศวันที่มีผลใช้บังคับและเหตุผลของการแก้ไขล่วงหน้าอย่างน้อย 7 วัน</p>
          <p>- การใช้งานบริการต่อหลังการแจ้งและก่อนวันที่มีผลใช้บังคับ ถือว่าเป็นการยอมรับข้อกำหนดที่แก้ไขแล้ว</p>
        </section>

        <section>
          <h2>3. ข้อกำหนดด้านอายุ</h2>
          <p>บริการนี้เปิดให้เฉพาะผู้ใช้ <strong>อายุ 14 ปีขึ้นไป</strong> (เรต 13+ บน App Store) เท่านั้น เมื่อสมัครใช้งาน ผู้ใช้ตกลงว่าตนมีคุณสมบัติตามข้อกำหนดด้านอายุ</p>
        </section>

        <section>
          <h2>4. บัญชีและการยืนยันตัวตน</h2>
          <p>- ผู้ใช้ต้องให้ข้อมูลที่ถูกต้องและเป็นปัจจุบัน</p>
          <p>- ผู้ใช้รับผิดชอบต่อความปลอดภัยของบัญชีของตนเอง (รวมถึงบัญชีโซเชียลล็อกอิน)</p>
          <p>- บัญชีที่พบว่ามีการใช้งานโดยมิชอบหรือถูกยึดครองอาจถูกจำกัดหรือยกเลิกการใช้งาน</p>
        </section>

        <section>
          <h2>5. เนื้อหาที่ผู้ใช้สร้างขึ้น (UGC) และสิทธิ</h2>
          <p>- ลิขสิทธิ์ของข้อความ รูปภาพ และเมทาดาทาที่ผู้ใช้อัปโหลด (ต่อไปนี้เรียกว่า "UGC") โดยหลักการแล้วเป็นของผู้ใช้</p>
          <p>- ผู้ใช้มอบสิทธิการใช้งานแบบ <strong>ไม่ผูกขาด ทั่วโลก ไม่คิดค่าลิขสิทธิ์ และสามารถให้สิทธิช่วงต่อได้</strong> แก่บริษัทเพื่อใช้ UGC ในการให้บริการ ดำเนินงาน และโปรโมตบริการ (รวมถึงการแสดงผล การจัดเก็บ การสำรองข้อมูล และการส่งต่อภายในบริการ)</p>
          <p>- หากคุณเลือกเผยแพร่ทริป เนื้อหานั้นจะเข้าถึงได้แบบสาธารณะบนเว็บ</p>
          <p>- ผู้ใช้สามารถอัปโหลดได้เฉพาะ UGC ที่ไม่ละเมิดสิทธิของผู้อื่นเท่านั้น</p>
        </section>

        <section>
          <h2>6. พฤติกรรมต้องห้าม</h2>
          <p>เนื้อหาและพฤติกรรมต่อไปนี้เป็นสิ่งต้องห้าม สำหรับตัวอย่างโดยละเอียด โปรดดู <strong>แนวทางชุมชน (นโยบายไม่ยอมรับโดยเด็ดขาด)</strong>:</p>
          <p>เนื้อหาที่ผิดกฎหมาย เป็นอันตราย ลามก หรือเป็นอันตรายต่อเยาวชน เนื้อหาที่ส่งเสริมการทำร้ายตนเองหรือการฆ่าตัวตาย การปลุกปั่นความรุนแรงหรือก่อการร้าย คำพูดแสดงความเกลียดชังหรือการเลือกปฏิบัติ การคุกคามหรือสะกดรอย การเปิดเผยข้อมูลส่วนบุคคล การฉ้อโกงหรือสแปม การละเมิดทรัพย์สินทางปัญญา การใช้บริการในทางที่ผิด เป็นต้น</p>
        </section>

        <section>
          <h2>7. การรายงาน การบล็อก การลบ และบทลงโทษ</h2>
          <p>- ผู้ใช้สามารถ <strong>รายงานหรือบล็อก</strong> เนื้อหาหรือผู้ใช้อื่นได้</p>
          <p>- ผู้ใช้สามารถ <strong>ลบโพสต์ของตนเองได้ทันที</strong></p>
          <p>- บริษัทจะตรวจสอบรายงานและดำเนินมาตรการ (ลบ จำกัด ยกเลิกการใช้งาน ฯลฯ) <strong>ภายใน 24 ชั่วโมงทำการ</strong> หลังได้รับรายงาน</p>
          <p>- การละเมิดซ้ำอาจนำไปสู่การจำกัดแบบถาวรและการดำเนินคดีทางกฎหมาย</p>
        </section>

        <section>
          <h2>8. การเปลี่ยนแปลงและการระงับบริการ</h2>
          <p>บริการ (หรือบางฟีเจอร์) อาจมีการเปลี่ยนแปลงหรือระงับด้วยเหตุผลด้านการดำเนินงาน ความปลอดภัย หรือกฎหมาย โดยจะแจ้งให้ทราบล่วงหน้าหรือภายหลังตามความเหมาะสม</p>
        </section>

        <section>
          <h2>9. ข้อจำกัดความรับผิด</h2>
          <p>- บริษัทจะไม่รับผิดชอบต่อความเสียหายที่เกิดจากเหตุสุดวิสัย รวมถึงภัยธรรมชาติหรือความล้มเหลวของบริการของบุคคลที่สาม ภายในขอบเขตที่กฎหมายอนุญาต</p>
          <p>- ความรับผิดสำหรับความเสียหายทางอ้อม ความเสียหายพิเศษ หรือความเสียหายสืบเนื่อง ถูกจำกัดภายในขอบเขตที่กฎหมายอนุญาต</p>
        </section>

        <section>
          <h2>10. บริการของบุคคลที่สาม</h2>
          <p>เมื่อมีการเชื่อมต่อกับโซเชียลล็อกอิน ระบบวิเคราะห์ หรือการแจ้งเตือน (เช่น Firebase) อาจมีการใช้ข้อกำหนดและนโยบายของผู้ให้บริการที่เกี่ยวข้อง โปรดดู <strong>นโยบายความเป็นส่วนตัว</strong> สำหรับรายละเอียดเพิ่มเติม</p>
        </section>

        <section>
          <h2>11. การยกเลิกสัญญาและการลบบัญชี</h2>
          <p>ผู้ใช้สามารถลบบัญชีได้ทุกเมื่อผ่านขั้นตอนภายในแอป:</p>
          <p><strong>การตั้งค่า → บัญชี → ลบบัญชี</strong> (ส่งคำขอลบทันทีหลังยืนยันตัวตนอีกครั้ง)</p>
          <p>หรือขอลบผ่านอีเมล: <strong>yoondev3434@gmail.com</strong></p>
          <p>หากมีกฎหมายกำหนดให้ต้องเก็บข้อมูลไว้ การลบทั้งหมดจะเกิดขึ้นหลังจากสิ้นสุดระยะเวลาที่กำหนด</p>
        </section>

        <section>
          <h2>12. กฎหมายที่ใช้บังคับและการระงับข้อพิพาท</h2>
          <p>ข้อกำหนดนี้อยู่ภายใต้กฎหมายของสาธารณรัฐเกาหลี และข้อพิพาทสามารถยื่นต่อศาลที่มีเขตอำนาจได้</p>
        </section>
      </div>
    </>
  );
}

function VietnameseTerms() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Điều khoản sử dụng MomentBook</h1>
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
          <h2>1. Mục đích</h2>
          <p>Các Điều khoản sử dụng này quy định quyền, nghĩa vụ và trách nhiệm giữa Dịch vụ và Người dùng liên quan đến việc sử dụng MomentBook (sau đây gọi là "Dịch vụ").</p>
        </section>

        <section>
          <h2>2. Hiệu lực và sửa đổi điều khoản</h2>
          <p>- Các điều khoản này có hiệu lực khi được thông báo trong Dịch vụ hoặc cung cấp qua liên kết.</p>
          <p>- Công ty có thể sửa đổi các điều khoản này trong phạm vi không vi phạm pháp luật hiện hành. Khi sửa đổi, ngày có hiệu lực và lý do sửa đổi sẽ được thông báo trước ít nhất 7 ngày.</p>
          <p>- Việc tiếp tục sử dụng Dịch vụ sau khi có thông báo và trước ngày có hiệu lực được xem là chấp nhận các điều khoản đã sửa đổi.</p>
        </section>

        <section>
          <h2>3. Yêu cầu về độ tuổi</h2>
          <p>Dịch vụ chỉ dành cho người dùng <strong>từ 14 tuổi trở lên</strong> (xếp hạng 13+ trên App Store). Khi đăng ký, người dùng đồng ý rằng mình đáp ứng yêu cầu về độ tuổi.</p>
        </section>

        <section>
          <h2>4. Tài khoản và xác thực</h2>
          <p>- Người dùng phải cung cấp thông tin chính xác và cập nhật.</p>
          <p>- Người dùng chịu trách nhiệm về bảo mật tài khoản của mình (bao gồm cả tài khoản đăng nhập xã hội).</p>
          <p>- Các tài khoản bị phát hiện sử dụng gian lận hoặc bị xâm phạm có thể bị hạn chế hoặc chấm dứt.</p>
        </section>

        <section>
          <h2>5. Nội dung do người dùng tạo (UGC) và quyền</h2>
          <p>- Quyền tác giả đối với văn bản, hình ảnh và siêu dữ liệu do người dùng tải lên (sau đây gọi là "UGC") về nguyên tắc thuộc về người dùng.</p>
          <p>- Người dùng cấp cho công ty giấy phép <strong>không độc quyền, toàn cầu, miễn phí bản quyền và có thể cấp phép lại</strong> để sử dụng UGC nhằm cung cấp, vận hành và quảng bá Dịch vụ (bao gồm hiển thị, lưu trữ, sao lưu và truyền tải trong Dịch vụ).</p>
          <p>- Nếu bạn chọn công khai một hành trình, nội dung đó sẽ được truy cập công khai trên web.</p>
          <p>- Người dùng chỉ được tải lên UGC không xâm phạm quyền của người khác.</p>
        </section>

        <section>
          <h2>6. Hành vi bị cấm</h2>
          <p>Các nội dung và hành vi sau bị cấm. Để xem ví dụ chi tiết, vui lòng tham khảo <strong>Hướng dẫn cộng đồng (chính sách không khoan nhượng)</strong>:</p>
          <p>Nội dung bất hợp pháp, có hại, khiêu dâm hoặc gây hại cho thanh thiếu niên; nội dung khuyến khích tự làm hại bản thân hoặc tự tử; kích động bạo lực hoặc khủng bố; phát ngôn thù ghét hoặc phân biệt đối xử; quấy rối hoặc stalking; tiết lộ thông tin cá nhân; lừa đảo hoặc spam; xâm phạm quyền sở hữu trí tuệ; lạm dụng Dịch vụ, v.v.</p>
        </section>

        <section>
          <h2>7. Báo cáo, chặn, xóa và xử lý vi phạm</h2>
          <p>- Người dùng có thể <strong>báo cáo hoặc chặn</strong> nội dung hay người dùng khác.</p>
          <p>- Người dùng có thể <strong>xóa ngay</strong> các bài đăng của chính mình.</p>
          <p>- Công ty sẽ xem xét báo cáo và áp dụng biện pháp (xóa, hạn chế, chấm dứt, v.v.) <strong>trong vòng 24 giờ làm việc</strong> kể từ khi nhận được.</p>
          <p>- Vi phạm lặp lại có thể dẫn đến hạn chế vĩnh viễn và hành động pháp lý.</p>
        </section>

        <section>
          <h2>8. Thay đổi và tạm ngưng dịch vụ</h2>
          <p>Dịch vụ (hoặc một số tính năng) có thể được thay đổi hoặc tạm ngưng vì lý do vận hành, bảo mật hoặc pháp lý, với thông báo trước hoặc sau khi cần thiết.</p>
        </section>

        <section>
          <h2>9. Giới hạn trách nhiệm</h2>
          <p>- Công ty không chịu trách nhiệm cho thiệt hại do sự kiện bất khả kháng, bao gồm thiên tai hoặc lỗi từ dịch vụ của bên thứ ba, trong phạm vi pháp luật cho phép.</p>
          <p>- Trách nhiệm đối với thiệt hại gián tiếp, đặc biệt hoặc hệ quả được giới hạn trong phạm vi pháp luật cho phép.</p>
        </section>

        <section>
          <h2>10. Dịch vụ bên thứ ba</h2>
          <p>Khi tích hợp đăng nhập xã hội, công cụ phân tích hoặc thông báo (như Firebase), điều khoản và chính sách của nhà cung cấp tương ứng có thể được áp dụng. Vui lòng tham khảo <strong>Chính sách quyền riêng tư</strong> để biết chi tiết.</p>
        </section>

        <section>
          <h2>11. Chấm dứt và xóa tài khoản</h2>
          <p>Người dùng có thể xóa tài khoản của mình bất cứ lúc nào qua luồng trong ứng dụng:</p>
          <p><strong>Cài đặt → Tài khoản → Xóa tài khoản</strong> (gửi yêu cầu xóa ngay sau khi xác thực lại)</p>
          <p>Hoặc yêu cầu xóa qua email: <strong>yoondev3434@gmail.com</strong></p>
          <p>Nếu có nghĩa vụ lưu giữ theo pháp luật, việc xóa hoàn toàn sẽ diễn ra sau khi hết thời hạn lưu giữ bắt buộc.</p>
        </section>

        <section>
          <h2>12. Luật áp dụng và giải quyết tranh chấp</h2>
          <p>Các điều khoản này được điều chỉnh theo pháp luật của Đại Hàn Dân Quốc, và tranh chấp có thể được đưa ra tòa án có thẩm quyền.</p>
        </section>
      </div>
    </>
  );
}
