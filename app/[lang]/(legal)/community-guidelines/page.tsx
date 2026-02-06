import type { Metadata } from "next";
import styles from "./community-guidelines.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";

const policyNotice: Partial<Record<Language, string>> & { en: string } = {
  en: "These policies describe the MomentBook app. Public web pages are read-only and show only content you choose to publish.",
  ko: "이 문서는 MomentBook 앱에 대한 정책입니다. 공개 웹 페이지는 읽기 전용이며, 게시한 내용만 표시됩니다.",
  ja: "本書は MomentBook アプリのポリシーです。公開Webページは読み取り専用で、公開した内容のみ表示されます。",
  zh: "本政策适用于 MomentBook 应用。公开网页为只读，仅展示你选择发布的内容。",
  es: "Estas politicas describen la app MomentBook. Las paginas web publicas son de solo lectura y muestran solo lo que publicas.",
  pt: "Estas politicas descrevem o app MomentBook. As paginas publicas sao somente leitura e mostram apenas o que voce publica.",
  fr: "Ces politiques decrivent l'app MomentBook. Les pages publiques sont en lecture seule et affichent uniquement ce que vous publiez.",
  th: "เอกสารนี้อธิบายนโยบายของแอป MomentBook หน้าสาธารณะเป็นแบบอ่านอย่างเดียว และแสดงเฉพาะสิ่งที่คุณเผยแพร่",
  vi: "Chinh sach nay ap dung cho ung dung MomentBook. Trang web cong khai chi doc va chi hien thi noi dung ban dang.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  let title = "MomentBook Community Guidelines";
  let description = "MomentBook community guidelines and content policy.";

  if (lang === "ko") {
    title = "MomentBook 커뮤니티 가이드라인";
    description = "MomentBook 커뮤니티 가이드라인과 콘텐츠 정책입니다.";
  }

  if (lang === "ja") {
    title = "MomentBook コミュニティガイドライン";
    description = "MomentBookのコミュニティガイドラインとコンテンツポリシーです。";
  }

  if (lang === "zh") {
    title = "MomentBook 社区指南";
    description = "MomentBook 的社区指南与内容政策。";
  }

  if (lang === "es") {
    title = "Normas de la comunidad de MomentBook";
    description = "Normas de comunidad y politica de contenido de MomentBook.";
  }

  if (lang === "pt") {
    title = "Diretrizes da comunidade do MomentBook";
    description = "Diretrizes da comunidade e politica de conteudo do MomentBook.";
  }

  if (lang === "fr") {
    title = "Regles de la communaute MomentBook";
    description = "Regles de communaute et politique de contenu de MomentBook.";
  }

  if (lang === "th") {
    title = "แนวทางชุมชนของ MomentBook";
    description = "แนวทางชุมชนและนโยบายเนื้อหาของ MomentBook";
  }

  if (lang === "vi") {
    title = "Huong dan cong dong MomentBook";
    description = "Huong dan cong dong va chinh sach noi dung cua MomentBook.";
  }

  const path = "/community-guidelines";
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

export default async function CommunityGuidelinesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content =
    lang === "ko" ? <KoreanGuidelines /> :
    lang === "ja" ? <JapaneseGuidelines /> :
    lang === "zh" ? <ChineseGuidelines /> :
    <EnglishGuidelines />;
  const notice = policyNotice[lang] ?? policyNotice.en;

  return (
    <div className={styles.container}>
      <p className={styles.notice}>{notice}</p>
      <article className={styles.content}>{content}</article>
    </div>
  );
}

function EnglishGuidelines() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MomentBook Community Guidelines</h1>
        <div className={styles.meta}>
          <p><strong>Version:</strong> 1.0.0</p>
          <p><strong>Effective Date:</strong> August 25, 2025</p>
          <p><strong>Last Updated:</strong> August 25, 2025</p>
          <p><strong>Contact:</strong> Report/Inquiry — In-app <strong>Settings → Report/Contact</strong>, Email <strong>yoondev3434@gmail.com</strong></p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <h2>1. Basic Principles</h2>
          <p>
            MomentBook aims to be a safe and respectful space. We enforce a <strong>Zero-Tolerance policy for offensive and abusive content and behavior</strong>.
          </p>
        </section>

        <section>
          <h2>2. Prohibited Content Examples (Non-Exhaustive)</h2>
          <p>- Illegal activities, self-harm or suicide content, violence or terrorism incitement</p>
          <p>- Pornography or explicit sexual content, content harmful to minors</p>
          <p>- Hate speech or discrimination, bullying, harassment, or stalking</p>
          <p>- Exposure of personal information (doxxing), impersonation, disinformation</p>
          <p>- Intellectual property infringement (copyright, trademark, etc.)</p>
          <p>- Spam, scams, phishing, fraudulent advertising</p>
          <p>- Technical abuse of the service (bots, scraping, exploit abuse, etc.)</p>
        </section>

        <section>
          <h2>3. User Protection Features</h2>
          <p><strong>Report:</strong> Immediately report posts, comments, or profiles</p>
          <p><strong>Block:</strong> Block specific users to hide them from your feed and notifications</p>
          <p><strong>Delete My Posts:</strong> Users can immediately delete their own posts</p>
          <p><strong>Keyword Filtering:</strong> Automatic filtering of prohibited words and profanity, continuously improved</p>
        </section>

        <section>
          <h2>4. Review Standards and Timeline</h2>
          <p>- Reported items are reviewed and addressed <strong>within 24 business hours</strong></p>
          <p>- Depending on violation severity: Warning → Content Removal → Temporary Suspension → <strong>Permanent Ban</strong></p>
          <p>- Serious matters such as suspected criminal activity may be reported to relevant authorities</p>
        </section>

        <section>
          <h2>5. Appeals and Restoration</h2>
          <p>- If you disagree with an enforcement action, you may request a review through in-app contact</p>
          <p>- Content/accounts will be restored if confirmed to be a clear enforcement error</p>
        </section>

        <section>
          <h2>6. Other</h2>
          <p>- These guidelines apply in conjunction with the <strong>Terms of Service (EULA)</strong> and <strong>Privacy Policy</strong>. In case of conflict, applicable laws and the Terms of Service take precedence.</p>
        </section>
      </div>
    </>
  );
}

function KoreanGuidelines() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MomentBook 커뮤니티 가이드라인</h1>
        <div className={styles.meta}>
          <p><strong>버전:</strong> 1.0.0</p>
          <p><strong>시행일:</strong> 2025년 8월 25일</p>
          <p><strong>최종 업데이트:</strong> 2025년 8월 25일</p>
          <p><strong>연락처:</strong> 신고/문의 — 앱 내 <strong>설정 → 신고/문의</strong>, 이메일 <strong>yoondev3434@gmail.com</strong></p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <h2>1. 기본 원칙</h2>
          <p>
            MomentBook은 안전하고 존중 받는 공간을 지향합니다. <strong>불쾌·남용 콘텐츠 및 행위에 대한 무관용(Zero-Tolerance) 정책</strong>을 시행합니다.
          </p>
        </section>

        <section>
          <h2>2. 금지 콘텐츠 예시 (비포괄적)</h2>
          <p>- 불법 행위, 자해·자살, 폭력·테러 선동</p>
          <p>- 포르노·노골적 성적 콘텐츠, 청소년 유해 콘텐츠</p>
          <p>- 혐오·차별 발언, 따돌림·괴롭힘·스토킹</p>
          <p>- 개인정보(신상) 노출, 사칭, 허위 정보 유포</p>
          <p>- 저작권·상표권 등 지식재산권 침해</p>
          <p>- 스팸·사기·피싱, 부정 광고</p>
          <p>- 서비스 기술적 악용(봇·스크래핑·취약점 악용 등)</p>
        </section>

        <section>
          <h2>3. 이용자 보호 기능</h2>
          <p><strong>신고(Report):</strong> 게시물/댓글/프로필에서 즉시 신고 가능</p>
          <p><strong>차단(Block):</strong> 특정 사용자를 차단해 피드·알림 숨김</p>
          <p><strong>내 게시물 삭제:</strong> 사용자는 자신의 게시물을 즉시 삭제 가능</p>
          <p><strong>키워드 필터링:</strong> 금칙어·욕설 등 자동 필터 적용 및 지속 개선</p>
        </section>

        <section>
          <h2>4. 처리 기준 및 기한</h2>
          <p>- 신고된 항목은 <strong>영업일 기준 24시간 이내</strong> 검토·조치</p>
          <p>- 위반 정도에 따라 경고 → 게시물 삭제 → 일시 정지 → <strong>영구 정지</strong></p>
          <p>- 범죄 혐의 등 중대한 사안은 관계기관에 신고할 수 있습니다.</p>
        </section>

        <section>
          <h2>5. 이의 제기 및 복구</h2>
          <p>- 조치 결과에 이의가 있을 경우 앱 내 문의를 통해 재심을 요청할 수 있습니다.</p>
          <p>- 명백한 오조치로 확인되면 콘텐츠/계정을 복구합니다.</p>
        </section>

        <section>
          <h2>6. 기타</h2>
          <p>- 본 가이드라인은 <strong>이용약관(EULA)</strong> 및 <strong>개인정보 처리방침</strong>과 함께 적용됩니다. 충돌 시 법령과 약관이 우선합니다.</p>
        </section>
      </div>
    </>
  );
}

function JapaneseGuidelines() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MomentBook コミュニティガイドライン</h1>
        <div className={styles.meta}>
          <p><strong>バージョン:</strong> 1.0.0</p>
          <p><strong>施行日:</strong> 2025年8月25日</p>
          <p><strong>最終更新日:</strong> 2025年8月25日</p>
          <p><strong>連絡先:</strong> 報告/お問い合わせ — アプリ内 <strong>設定 → 報告/お問い合わせ</strong>、メール <strong>yoondev3434@gmail.com</strong></p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <h2>1. 基本原則</h2>
          <p>
            MomentBookは安全で尊重される空間を目指します。<strong>不快・乱用コンテンツおよび行為に対するゼロトレランス（Zero-Tolerance）ポリシー</strong>を実施します。
          </p>
        </section>

        <section>
          <h2>2. 禁止コンテンツの例（非網羅的）</h2>
          <p>- 違法行為、自傷・自殺、暴力・テロの扇動</p>
          <p>- ポルノ・露骨な性的コンテンツ、青少年有害コンテンツ</p>
          <p>- ヘイトスピーチ・差別発言、いじめ・嫌がらせ・ストーカー行為</p>
          <p>- 個人情報（身元）の暴露、なりすまし、虚偽情報の拡散</p>
          <p>- 著作権・商標権等の知的財産権侵害</p>
          <p>- スパム・詐欺・フィッシング、不正広告</p>
          <p>- サービスの技術的悪用（ボット・スクレイピング・脆弱性悪用等）</p>
        </section>

        <section>
          <h2>3. ユーザー保護機能</h2>
          <p><strong>報告（Report）:</strong> 投稿/コメント/プロフィールから即座に報告可能</p>
          <p><strong>ブロック（Block）:</strong> 特定ユーザーをブロックしてフィード・通知から非表示</p>
          <p><strong>自分の投稿削除:</strong> ユーザーは自分の投稿を即座に削除可能</p>
          <p><strong>キーワードフィルタリング:</strong> 禁止語・罵倒語等の自動フィルター適用および継続改善</p>
        </section>

        <section>
          <h2>4. 処理基準および期限</h2>
          <p>- 報告された項目は<strong>営業日基準24時間以内</strong>に検討・措置</p>
          <p>- 違反の程度に応じて 警告 → 投稿削除 → 一時停止 → <strong>永久停止</strong></p>
          <p>- 犯罪の疑いなど重大な事案は関係機関に通報することがあります。</p>
        </section>

        <section>
          <h2>5. 異議申し立ておよび復旧</h2>
          <p>- 措置結果に異議がある場合、アプリ内お問い合わせを通じて再審を要請できます。</p>
          <p>- 明白な誤措置と確認されればコンテンツ/アカウントを復旧します。</p>
        </section>

        <section>
          <h2>6. その他</h2>
          <p>- 本ガイドラインは<strong>利用規約（EULA）</strong>および<strong>プライバシーポリシー</strong>と併せて適用されます。矛盾する場合、法令および利用規約が優先されます。</p>
        </section>
      </div>
    </>
  );
}

function ChineseGuidelines() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MomentBook 社区指南</h1>
        <div className={styles.meta}>
          <p><strong>版本:</strong> 1.0.0</p>
          <p><strong>生效日期:</strong> 2025年8月25日</p>
          <p><strong>最后更新:</strong> 2025年8月25日</p>
          <p><strong>联系方式:</strong> 举报/咨询 — 应用内 <strong>设置 → 举报/咨询</strong>，邮箱 <strong>yoondev3434@gmail.com</strong></p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <h2>1. 基本原则</h2>
          <p>
            MomentBook致力于成为安全且受尊重的空间。我们实施<strong>对令人不快和滥用内容及行为的零容忍（Zero-Tolerance）政策</strong>。
          </p>
        </section>

        <section>
          <h2>2. 禁止内容示例（非穷尽）</h2>
          <p>- 非法活动、自残或自杀内容、暴力或恐怖主义煽动</p>
          <p>- 色情或露骨性内容、对未成年人有害的内容</p>
          <p>- 仇恨言论或歧视、霸凌、骚扰或跟踪</p>
          <p>- 暴露个人信息（人肉搜索）、冒充、传播虚假信息</p>
          <p>- 侵犯知识产权（版权、商标等）</p>
          <p>- 垃圾邮件、诈骗、网络钓鱼、欺诈性广告</p>
          <p>- 技术滥用服务（机器人、爬虫、漏洞利用等）</p>
        </section>

        <section>
          <h2>3. 用户保护功能</h2>
          <p><strong>举报（Report）:</strong> 可立即举报帖子、评论或个人资料</p>
          <p><strong>屏蔽（Block）:</strong> 屏蔽特定用户以在动态和通知中隐藏</p>
          <p><strong>删除我的帖子:</strong> 用户可立即删除自己的帖子</p>
          <p><strong>关键词过滤:</strong> 自动过滤禁用词和脏话，持续改进</p>
        </section>

        <section>
          <h2>4. 审核标准和时限</h2>
          <p>- 举报的项目将在<strong>工作日24小时内</strong>审查和处理</p>
          <p>- 根据违规严重程度：警告 → 删除内容 → 临时封禁 → <strong>永久封禁</strong></p>
          <p>- 涉及犯罪嫌疑等重大事项可能向相关机构举报</p>
        </section>

        <section>
          <h2>5. 申诉和恢复</h2>
          <p>- 如对处理结果有异议，可通过应用内联系请求复审</p>
          <p>- 如确认为明显的执法错误，将恢复内容/账户</p>
        </section>

        <section>
          <h2>6. 其他</h2>
          <p>- 本准则与<strong>服务条款（EULA）</strong>和<strong>隐私政策</strong>一起适用。如有冲突，适用法律和服务条款优先。</p>
        </section>
      </div>
    </>
  );
}
