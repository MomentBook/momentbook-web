import type { Metadata } from "next";
import styles from "./community-guidelines.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import {
  buildAbsoluteTitle,
  buildNoIndexRobots,
} from "@/lib/seo/public-metadata";

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
    description = "Normas de comunidad y política de contenido de MomentBook.";
  }

  if (lang === "pt") {
    title = "Diretrizes da comunidade do MomentBook";
    description = "Diretrizes da comunidade e política de conteúdo do MomentBook.";
  }

  if (lang === "fr") {
    title = "Règles de la communauté MomentBook";
    description = "Règles de communauté et politique de contenu de MomentBook.";
  }

  if (lang === "th") {
    title = "แนวทางชุมชนของ MomentBook";
    description = "แนวทางชุมชนและนโยบายเนื้อหาของ MomentBook";
  }

  if (lang === "vi") {
    title = "Hướng dẫn cộng đồng MomentBook";
    description = "Hướng dẫn cộng đồng và chính sách nội dung của MomentBook.";
  }

  const path = "/community-guidelines";
  const url = buildOpenGraphUrl(lang, path);

  return {
    title: buildAbsoluteTitle(title),
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

export default async function CommunityGuidelinesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content = getGuidelinesContent(lang);

  return (
    <div className={styles.container}>
      <article className={styles.content}>{content}</article>
    </div>
  );
}

function getGuidelinesContent(lang: Language) {
  switch (lang) {
    case "ko":
      return <KoreanGuidelines />;
    case "ja":
      return <JapaneseGuidelines />;
    case "zh":
      return <ChineseGuidelines />;
    case "es":
      return <SpanishGuidelines />;
    case "pt":
      return <PortugueseGuidelines />;
    case "fr":
      return <FrenchGuidelines />;
    case "th":
      return <ThaiGuidelines />;
    case "vi":
      return <VietnameseGuidelines />;
    default:
      return <EnglishGuidelines />;
  }
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

function SpanishGuidelines() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Normas de la comunidad de MomentBook</h1>
        <div className={styles.meta}>
          <p><strong>Versión:</strong> 1.0.0</p>
          <p><strong>Fecha de entrada en vigor:</strong> 25 de agosto de 2025</p>
          <p><strong>Última actualización:</strong> 25 de agosto de 2025</p>
          <p><strong>Contacto:</strong> Reportes / consultas — en la app <strong>Ajustes → Reportar / Contacto</strong>, correo <strong>yoondev3434@gmail.com</strong></p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <h2>1. Principios básicos</h2>
          <p>
            MomentBook busca ser un espacio seguro y respetuoso. Aplicamos una <strong>política de tolerancia cero frente a contenido y conductas ofensivas o abusivas</strong>.
          </p>
        </section>

        <section>
          <h2>2. Ejemplos de contenido prohibido (no exhaustivos)</h2>
          <p>- Actividades ilegales, contenido de autolesión o suicidio, incitación a la violencia o al terrorismo</p>
          <p>- Pornografía o contenido sexual explícito, contenido perjudicial para menores</p>
          <p>- Discurso de odio o discriminación, bullying, acoso o stalking</p>
          <p>- Exposición de información personal (doxxing), suplantación de identidad, desinformación</p>
          <p>- Infracción de propiedad intelectual (copyright, marcas, etc.)</p>
          <p>- Spam, estafas, phishing, publicidad fraudulenta</p>
          <p>- Abuso técnico del servicio (bots, scraping, explotación de vulnerabilidades, etc.)</p>
        </section>

        <section>
          <h2>3. Funciones de protección del usuario</h2>
          <p><strong>Reportar:</strong> Reporta de inmediato publicaciones, comentarios o perfiles</p>
          <p><strong>Bloquear:</strong> Bloquea a usuarios concretos para ocultarlos de tu feed y notificaciones</p>
          <p><strong>Eliminar mis publicaciones:</strong> Los usuarios pueden eliminar de inmediato sus propias publicaciones</p>
          <p><strong>Filtrado por palabras clave:</strong> Filtrado automático de palabras prohibidas e insultos, con mejora continua</p>
        </section>

        <section>
          <h2>4. Criterios de revisión y plazo</h2>
          <p>- Los elementos reportados se revisan y se procesan <strong>dentro de 24 horas hábiles</strong></p>
          <p>- Según la gravedad de la infracción: advertencia → eliminación del contenido → suspensión temporal → <strong>bloqueo permanente</strong></p>
          <p>- Los asuntos graves, como sospechas de actividad delictiva, pueden reportarse a las autoridades competentes</p>
        </section>

        <section>
          <h2>5. Apelaciones y restitución</h2>
          <p>- Si no estás de acuerdo con una medida, puedes solicitar una revisión a través del contacto dentro de la app</p>
          <p>- El contenido o la cuenta se restaurarán si se confirma que hubo un error claro en la aplicación de la medida</p>
        </section>

        <section>
          <h2>6. Otros</h2>
          <p>- Estas normas se aplican junto con los <strong>Términos de servicio (EULA)</strong> y la <strong>Política de privacidad</strong>. En caso de conflicto, prevalecerán la legislación aplicable y los Términos de servicio.</p>
        </section>
      </div>
    </>
  );
}

function PortugueseGuidelines() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Diretrizes da comunidade do MomentBook</h1>
        <div className={styles.meta}>
          <p><strong>Versão:</strong> 1.0.0</p>
          <p><strong>Data de vigência:</strong> 25 de agosto de 2025</p>
          <p><strong>Última atualização:</strong> 25 de agosto de 2025</p>
          <p><strong>Contato:</strong> Denúncias / dúvidas — no app <strong>Configurações → Denunciar / Contato</strong>, e-mail <strong>yoondev3434@gmail.com</strong></p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <h2>1. Princípios básicos</h2>
          <p>
            O MomentBook busca ser um espaço seguro e respeitoso. Aplicamos uma <strong>política de tolerância zero para conteúdo e comportamentos ofensivos ou abusivos</strong>.
          </p>
        </section>

        <section>
          <h2>2. Exemplos de conteúdo proibido (lista não exaustiva)</h2>
          <p>- Atividades ilegais, conteúdo de automutilação ou suicídio, incitação à violência ou ao terrorismo</p>
          <p>- Pornografia ou conteúdo sexual explícito, conteúdo prejudicial a menores</p>
          <p>- Discurso de ódio ou discriminação, bullying, assédio ou stalking</p>
          <p>- Exposição de informações pessoais (doxxing), falsidade ideológica, desinformação</p>
          <p>- Violação de propriedade intelectual (direitos autorais, marcas etc.)</p>
          <p>- Spam, golpes, phishing, publicidade fraudulenta</p>
          <p>- Abuso técnico do serviço (bots, scraping, exploração de vulnerabilidades etc.)</p>
        </section>

        <section>
          <h2>3. Recursos de proteção ao usuário</h2>
          <p><strong>Denunciar:</strong> Denuncie imediatamente posts, comentários ou perfis</p>
          <p><strong>Bloquear:</strong> Bloqueie usuários específicos para ocultá-los do seu feed e notificações</p>
          <p><strong>Excluir minhas publicações:</strong> Os usuários podem excluir imediatamente as próprias publicações</p>
          <p><strong>Filtro por palavras-chave:</strong> Filtragem automática de palavras proibidas e palavrões, com melhoria contínua</p>
        </section>

        <section>
          <h2>4. Critérios de revisão e prazo</h2>
          <p>- Os itens denunciados são analisados e tratados <strong>dentro de 24 horas úteis</strong></p>
          <p>- Conforme a gravidade da violação: aviso → remoção do conteúdo → suspensão temporária → <strong>banimento permanente</strong></p>
          <p>- Questões graves, como suspeita de atividade criminosa, podem ser reportadas às autoridades competentes</p>
        </section>

        <section>
          <h2>5. Recursos e restauração</h2>
          <p>- Se você discordar de uma medida aplicada, pode solicitar uma revisão pelo contato dentro do app</p>
          <p>- O conteúdo ou a conta serão restaurados se ficar confirmado que houve erro claro na aplicação da medida</p>
        </section>

        <section>
          <h2>6. Outros</h2>
          <p>- Estas diretrizes se aplicam junto com os <strong>Termos de uso (EULA)</strong> e a <strong>Política de privacidade</strong>. Em caso de conflito, prevalecem a legislação aplicável e os Termos de uso.</p>
        </section>
      </div>
    </>
  );
}

function FrenchGuidelines() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Règles de la communauté MomentBook</h1>
        <div className={styles.meta}>
          <p><strong>Version :</strong> 1.0.0</p>
          <p><strong>Date d’entrée en vigueur :</strong> 25 août 2025</p>
          <p><strong>Dernière mise à jour :</strong> 25 août 2025</p>
          <p><strong>Contact :</strong> Signalement / demande — dans l’application <strong>Réglages → Signaler / Contact</strong>, e-mail <strong>yoondev3434@gmail.com</strong></p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <h2>1. Principes de base</h2>
          <p>
            MomentBook vise à être un espace sûr et respectueux. Nous appliquons une <strong>politique de tolérance zéro à l’égard des contenus et comportements offensants ou abusifs</strong>.
          </p>
        </section>

        <section>
          <h2>2. Exemples de contenus interdits (liste non exhaustive)</h2>
          <p>- Activités illégales, contenu d’automutilation ou de suicide, incitation à la violence ou au terrorisme</p>
          <p>- Pornographie ou contenu sexuel explicite, contenu préjudiciable aux mineurs</p>
          <p>- Discours haineux ou discrimination, intimidation, harcèlement ou stalking</p>
          <p>- Divulgation d’informations personnelles (doxxing), usurpation d’identité, désinformation</p>
          <p>- Atteinte à la propriété intellectuelle (droits d’auteur, marques, etc.)</p>
          <p>- Spam, escroqueries, phishing, publicité frauduleuse</p>
          <p>- Abus technique du service (bots, scraping, exploitation de failles, etc.)</p>
        </section>

        <section>
          <h2>3. Outils de protection des utilisateurs</h2>
          <p><strong>Signaler :</strong> Signalez immédiatement des publications, commentaires ou profils</p>
          <p><strong>Bloquer :</strong> Bloquez des utilisateurs spécifiques afin de les masquer de votre fil et de vos notifications</p>
          <p><strong>Supprimer mes publications :</strong> Les utilisateurs peuvent supprimer immédiatement leurs propres publications</p>
          <p><strong>Filtrage par mots-clés :</strong> Filtrage automatique des mots interdits et grossiers, avec amélioration continue</p>
        </section>

        <section>
          <h2>4. Critères d’examen et délai</h2>
          <p>- Les éléments signalés sont examinés et traités <strong>dans un délai de 24 heures ouvrées</strong></p>
          <p>- Selon la gravité de la violation : avertissement → suppression du contenu → suspension temporaire → <strong>bannissement permanent</strong></p>
          <p>- Les cas graves, comme une suspicion d’activité criminelle, peuvent être signalés aux autorités compétentes</p>
        </section>

        <section>
          <h2>5. Recours et rétablissement</h2>
          <p>- Si vous n’êtes pas d’accord avec une mesure, vous pouvez demander un réexamen via le contact dans l’application</p>
          <p>- Le contenu ou le compte sera rétabli s’il est confirmé qu’il s’agissait clairement d’une erreur d’application</p>
        </section>

        <section>
          <h2>6. Autres</h2>
          <p>- Ces règles s’appliquent conjointement avec les <strong>Conditions d’utilisation (EULA)</strong> et la <strong>Politique de confidentialité</strong>. En cas de conflit, le droit applicable et les Conditions d’utilisation prévalent.</p>
        </section>
      </div>
    </>
  );
}

function ThaiGuidelines() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>แนวทางชุมชนของ MomentBook</h1>
        <div className={styles.meta}>
          <p><strong>เวอร์ชัน:</strong> 1.0.0</p>
          <p><strong>วันที่มีผลบังคับใช้:</strong> 25 สิงหาคม 2025</p>
          <p><strong>อัปเดตล่าสุด:</strong> 25 สิงหาคม 2025</p>
          <p><strong>ติดต่อ:</strong> รายงาน / สอบถาม — ในแอป <strong>การตั้งค่า → รายงาน / ติดต่อ</strong>, อีเมล <strong>yoondev3434@gmail.com</strong></p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <h2>1. หลักการพื้นฐาน</h2>
          <p>
            MomentBook มุ่งเป็นพื้นที่ที่ปลอดภัยและให้ความเคารพซึ่งกันและกัน เราใช้นโยบาย <strong>ไม่ยอมรับโดยเด็ดขาดต่อเนื้อหาและพฤติกรรมที่ล่วงละเมิดหรือไม่เหมาะสม</strong>
          </p>
        </section>

        <section>
          <h2>2. ตัวอย่างเนื้อหาต้องห้าม (ไม่ใช่รายการทั้งหมด)</h2>
          <p>- กิจกรรมผิดกฎหมาย เนื้อหาการทำร้ายตนเองหรือการฆ่าตัวตาย การปลุกปั่นความรุนแรงหรือการก่อการร้าย</p>
          <p>- สื่อลามกหรือเนื้อหาทางเพศอย่างโจ่งแจ้ง เนื้อหาที่เป็นอันตรายต่อเยาวชน</p>
          <p>- คำพูดแสดงความเกลียดชังหรือการเลือกปฏิบัติ การกลั่นแกล้ง การคุกคาม หรือ stalking</p>
          <p>- การเปิดเผยข้อมูลส่วนบุคคล (doxxing) การสวมรอย การเผยแพร่ข้อมูลเท็จ</p>
          <p>- การละเมิดทรัพย์สินทางปัญญา (ลิขสิทธิ์ เครื่องหมายการค้า ฯลฯ)</p>
          <p>- สแปม กลโกง ฟิชชิง โฆษณาหลอกลวง</p>
          <p>- การใช้บริการในทางเทคนิคที่ไม่เหมาะสม (บอต scraping การใช้ช่องโหว่ ฯลฯ)</p>
        </section>

        <section>
          <h2>3. ฟีเจอร์คุ้มครองผู้ใช้</h2>
          <p><strong>รายงาน:</strong> รายงานโพสต์ ความคิดเห็น หรือโปรไฟล์ได้ทันที</p>
          <p><strong>บล็อก:</strong> บล็อกผู้ใช้เฉพาะรายเพื่อซ่อนจากฟีดและการแจ้งเตือน</p>
          <p><strong>ลบโพสต์ของฉัน:</strong> ผู้ใช้สามารถลบโพสต์ของตนเองได้ทันที</p>
          <p><strong>กรองคำสำคัญ:</strong> กรองคำต้องห้ามและคำหยาบแบบอัตโนมัติ พร้อมปรับปรุงอย่างต่อเนื่อง</p>
        </section>

        <section>
          <h2>4. เกณฑ์การตรวจสอบและระยะเวลา</h2>
          <p>- รายการที่ถูกรายงานจะได้รับการตรวจสอบและดำเนินการ <strong>ภายใน 24 ชั่วโมงทำการ</strong></p>
          <p>- ตามระดับความรุนแรงของการละเมิด: เตือน → ลบเนื้อหา → ระงับชั่วคราว → <strong>แบนถาวร</strong></p>
          <p>- กรณีร้ายแรง เช่น สงสัยว่ามีกิจกรรมผิดกฎหมาย อาจถูกรายงานต่อหน่วยงานที่เกี่ยวข้อง</p>
        </section>

        <section>
          <h2>5. การอุทธรณ์และการกู้คืน</h2>
          <p>- หากคุณไม่เห็นด้วยกับมาตรการที่ถูกใช้ คุณสามารถขอให้มีการทบทวนผ่านช่องทางติดต่อในแอป</p>
          <p>- เนื้อหาหรือบัญชีจะถูกกู้คืนหากยืนยันได้ว่าเป็นความผิดพลาดในการบังคับใช้มาตรการอย่างชัดเจน</p>
        </section>

        <section>
          <h2>6. อื่น ๆ</h2>
          <p>- แนวทางนี้ใช้ร่วมกับ <strong>ข้อกำหนดการใช้งาน (EULA)</strong> และ <strong>นโยบายความเป็นส่วนตัว</strong> หากมีความขัดแย้ง ให้กฎหมายที่เกี่ยวข้องและข้อกำหนดการใช้งานมีผลเหนือกว่า</p>
        </section>
      </div>
    </>
  );
}

function VietnameseGuidelines() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Hướng dẫn cộng đồng MomentBook</h1>
        <div className={styles.meta}>
          <p><strong>Phiên bản:</strong> 1.0.0</p>
          <p><strong>Ngày có hiệu lực:</strong> 25 tháng 8, 2025</p>
          <p><strong>Cập nhật lần cuối:</strong> 25 tháng 8, 2025</p>
          <p><strong>Liên hệ:</strong> Báo cáo / hỏi đáp — trong ứng dụng <strong>Cài đặt → Báo cáo / Liên hệ</strong>, email <strong>yoondev3434@gmail.com</strong></p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <h2>1. Nguyên tắc cơ bản</h2>
          <p>
            MomentBook hướng tới một không gian an toàn và tôn trọng lẫn nhau. Chúng tôi áp dụng <strong>chính sách không khoan nhượng với nội dung và hành vi xúc phạm hoặc lạm dụng</strong>.
          </p>
        </section>

        <section>
          <h2>2. Ví dụ về nội dung bị cấm (không giới hạn)</h2>
          <p>- Hoạt động bất hợp pháp, nội dung tự làm hại bản thân hoặc tự tử, kích động bạo lực hay khủng bố</p>
          <p>- Nội dung khiêu dâm hoặc tình dục rõ ràng, nội dung gây hại cho trẻ vị thành niên</p>
          <p>- Phát ngôn thù ghét hoặc phân biệt đối xử, bắt nạt, quấy rối hoặc stalking</p>
          <p>- Tiết lộ thông tin cá nhân (doxxing), mạo danh, phát tán thông tin sai lệch</p>
          <p>- Xâm phạm quyền sở hữu trí tuệ (bản quyền, nhãn hiệu, v.v.)</p>
          <p>- Spam, lừa đảo, phishing, quảng cáo gian dối</p>
          <p>- Lạm dụng kỹ thuật đối với dịch vụ (bot, scraping, khai thác lỗ hổng, v.v.)</p>
        </section>

        <section>
          <h2>3. Tính năng bảo vệ người dùng</h2>
          <p><strong>Báo cáo:</strong> Báo cáo ngay bài đăng, bình luận hoặc hồ sơ</p>
          <p><strong>Chặn:</strong> Chặn người dùng cụ thể để ẩn họ khỏi bảng tin và thông báo</p>
          <p><strong>Xóa bài đăng của tôi:</strong> Người dùng có thể xóa ngay các bài đăng của chính mình</p>
          <p><strong>Lọc từ khóa:</strong> Tự động lọc từ cấm và lời lẽ thô tục, được cải thiện liên tục</p>
        </section>

        <section>
          <h2>4. Tiêu chuẩn xem xét và thời hạn</h2>
          <p>- Nội dung bị báo cáo sẽ được xem xét và xử lý <strong>trong vòng 24 giờ làm việc</strong></p>
          <p>- Tùy theo mức độ vi phạm: cảnh báo → xóa nội dung → đình chỉ tạm thời → <strong>cấm vĩnh viễn</strong></p>
          <p>- Những vụ việc nghiêm trọng, như nghi ngờ có hoạt động phạm tội, có thể được báo cho cơ quan chức năng liên quan</p>
        </section>

        <section>
          <h2>5. Khiếu nại và khôi phục</h2>
          <p>- Nếu không đồng ý với biện pháp đã áp dụng, bạn có thể yêu cầu xem xét lại qua liên hệ trong ứng dụng</p>
          <p>- Nội dung hoặc tài khoản sẽ được khôi phục nếu được xác nhận là lỗi xử lý rõ ràng</p>
        </section>

        <section>
          <h2>6. Khác</h2>
          <p>- Hướng dẫn này được áp dụng cùng với <strong>Điều khoản sử dụng (EULA)</strong> và <strong>Chính sách quyền riêng tư</strong>. Nếu có xung đột, pháp luật hiện hành và Điều khoản sử dụng sẽ được ưu tiên.</p>
        </section>
      </div>
    </>
  );
}
