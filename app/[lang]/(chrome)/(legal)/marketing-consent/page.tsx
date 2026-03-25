import type { Metadata } from "next";
import styles from "./marketing-consent.module.scss";
import { type Language } from "@/lib/i18n/config";
import {
  buildNoIndexRobots,
  buildStandardPageMetadata,
} from "@/lib/seo/public-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  let title = "MomentBook Marketing Information Consent";
  let description = "Marketing information and promotional communications consent policy.";

  if (lang === "ko") {
    title = "MomentBook 마케팅 정보 수신 동의";
    description = "MomentBook 마케팅 수신 동의 정책입니다.";
  }

  if (lang === "ja") {
    title = "MomentBook マーケティング情報同意";
    description = "MomentBookのマーケティング同意ポリシーです。";
  }

  if (lang === "zh") {
    title = "MomentBook 营销信息同意";
    description = "MomentBook 的营销信息同意政策。";
  }

  if (lang === "es") {
    title = "Consentimiento de información de marketing de MomentBook";
    description = "Política de consentimiento para comunicaciones promocionales de MomentBook.";
  }

  if (lang === "pt") {
    title = "Consentimento de informações de marketing do MomentBook";
    description = "Política de consentimento para comunicações promocionais do MomentBook.";
  }

  if (lang === "fr") {
    title = "Consentement marketing de MomentBook";
    description = "Politique de consentement pour les communications promotionnelles de MomentBook.";
  }

  if (lang === "th") {
    title = "ความยินยอมรับข้อมูลการตลาดของ MomentBook";
    description = "นโยบายการยินยอมรับข้อมูลการตลาดและการสื่อสารโปรโมชันของ MomentBook";
  }

  if (lang === "vi") {
    title = "Đồng ý nhận thông tin tiếp thị MomentBook";
    description = "Chính sách đồng ý cho thông tin tiếp thị và truyền thông khuyến mại của MomentBook.";
  }

  const path = "/marketing-consent";
  return buildStandardPageMetadata({
    lang,
    path,
    title,
    description,
    robots: buildNoIndexRobots(),
    absoluteTitle: true,
  });
}

export default async function MarketingConsentPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content = getMarketingConsentContent(lang);

  return (
    <div className={styles.container}>
      <article className={styles.content}>{content}</article>
    </div>
  );
}

function getMarketingConsentContent(lang: Language) {
  switch (lang) {
    case "ko":
      return <KoreanConsent />;
    case "ja":
      return <JapaneseConsent />;
    case "zh":
      return <ChineseConsent />;
    case "es":
      return <SpanishConsent />;
    case "pt":
      return <PortugueseConsent />;
    case "fr":
      return <FrenchConsent />;
    case "th":
      return <ThaiConsent />;
    case "vi":
      return <VietnameseConsent />;
    default:
      return <EnglishConsent />;
  }
}

function EnglishConsent() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MomentBook Marketing Information Consent</h1>
        <div className={styles.meta}>
          <p><strong>Version:</strong> 1.0.1</p>
          <p><strong>Effective Date:</strong> January 4, 2025</p>
          <p><strong>Last Updated:</strong> January 4, 2025</p>
          <p><strong>Contact:</strong> yoondev3434@gmail.com</p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <h2>1. Consent Scope</h2>
          <p><strong>Information Collected:</strong> Email address, Push notification token (device)</p>
          <p><strong>Communication Channels:</strong> Email, In-app push notifications</p>
          <p><strong>Content Types:</strong> Service updates, New features and events, Promotions and benefits, Survey invitations</p>
        </section>

        <section>
          <h2>2. Purpose and Retention Period</h2>
          <p><strong>Purpose:</strong> Providing personalized information, Event operations, Customer communication</p>
          <p><strong>Retention:</strong> Retained until consent withdrawal or purpose achievement, then deleted (except legally required retention)</p>
        </section>

        <section>
          <h2>3. Third-Party Processing and International Transfer</h2>
          <p>- External services such as Firebase may be used for delivery and analytics, processed within the necessary scope</p>
          <p>- Specific recipients and transfer details follow the Privacy Policy</p>
        </section>

        <section>
          <h2>4. Consent Withdrawal (Opt-out)</h2>
          <p>- Change anytime via in-app <strong>Settings → Notifications/Marketing Preferences</strong></p>
          <p>- Immediately unsubscribe via <strong>Unsubscribe</strong> button at the bottom of emails</p>
          <p>- Block push notifications through OS settings (iOS/Android)</p>
        </section>

        <section>
          <h2>5. Important Notes</h2>
          <p>- Essential service access is not restricted without consent</p>
          <p>- After withdrawal, promotional offers and benefits may not be provided</p>
        </section>
      </div>
    </>
  );
}

function KoreanConsent() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MomentBook 마케팅 정보 수신 동의</h1>
        <div className={styles.meta}>
          <p><strong>버전:</strong> 1.0.1</p>
          <p><strong>시행일:</strong> 2025년 1월 4일</p>
          <p><strong>최종 업데이트:</strong> 2025년 1월 4일</p>
          <p><strong>연락처:</strong> yoondev3434@gmail.com</p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <h2>1. 동의 대상 및 범위</h2>
          <p><strong>수집 항목:</strong> 이메일 주소, 푸시 토큰(디바이스)</p>
          <p><strong>발송 채널:</strong> 이메일, 앱 푸시 알림</p>
          <p><strong>발송 내용:</strong> 서비스 소식, 신규 기능/이벤트, 혜택/프로모션, 설문 안내</p>
        </section>

        <section>
          <h2>2. 이용 목적 및 보관 기간</h2>
          <p><strong>목적:</strong> 맞춤 정보 제공, 이벤트 운영, 고객 커뮤니케이션</p>
          <p><strong>보관:</strong> 동의 철회 또는 목적 달성 시까지 보관 후 파기(법정 보관 예외 제외)</p>
        </section>

        <section>
          <h2>3. 제3자 처리 및 국외 이전(해당 시)</h2>
          <p>- 발송/분석을 위해 Firebase 등 외부 서비스를 이용할 수 있으며, 필요한 범위 내에서 처리됩니다.</p>
          <p>- 구체적 제공처·이전 여부는 개인정보 처리방침에 따릅니다.</p>
        </section>

        <section>
          <h2>4. 동의 철회(Opt-out)</h2>
          <p>- 앱 내 <strong>설정 → 알림/마케팅 수신 설정</strong>에서 언제든 변경 가능</p>
          <p>- 이메일 하단의 <strong>구독 해지</strong> 버튼을 통해 즉시 철회 가능</p>
          <p>- OS 알림 설정(iOS/Android)에서도 푸시 수신을 차단할 수 있습니다.</p>
        </section>

        <section>
          <h2>5. 유의사항</h2>
          <p>- 동의를 하지 않더라도 필수 서비스 이용에는 제한이 없습니다.</p>
          <p>- 동의 철회 이후에는 프로모션/혜택 안내가 제공되지 않을 수 있습니다.</p>
        </section>
      </div>
    </>
  );
}

function JapaneseConsent() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MomentBook マーケティング情報受信同意</h1>
        <div className={styles.meta}>
          <p><strong>バージョン:</strong> 1.0.1</p>
          <p><strong>施行日:</strong> 2025年1月4日</p>
          <p><strong>最終更新日:</strong> 2025年1月4日</p>
          <p><strong>連絡先:</strong> yoondev3434@gmail.com</p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <h2>1. 同意対象および範囲</h2>
          <p><strong>収集項目:</strong> メールアドレス、プッシュトークン（デバイス）</p>
          <p><strong>送信チャネル:</strong> メール、アプリプッシュ通知</p>
          <p><strong>送信内容:</strong> サービスのお知らせ、新機能/イベント、特典/プロモーション、アンケートのご案内</p>
        </section>

        <section>
          <h2>2. 利用目的および保管期間</h2>
          <p><strong>目的:</strong> カスタマイズ情報の提供、イベント運営、顧客コミュニケーション</p>
          <p><strong>保管:</strong> 同意撤回または目的達成まで保管後破棄（法定保管例外を除く）</p>
        </section>

        <section>
          <h2>3. 第三者処理および国外移転（該当時）</h2>
          <p>- 送信/分析のためにFirebaseなど外部サービスを利用する場合があり、必要な範囲内で処理されます。</p>
          <p>- 具体的な提供先・移転の有無はプライバシーポリシーに従います。</p>
        </section>

        <section>
          <h2>4. 同意撤回（オプトアウト）</h2>
          <p>- アプリ内<strong>設定 → 通知/マーケティング受信設定</strong>でいつでも変更可能</p>
          <p>- メール下部の<strong>配信停止</strong>ボタンで即座に撤回可能</p>
          <p>- OS通知設定（iOS/Android）でもプッシュ受信をブロックできます。</p>
        </section>

        <section>
          <h2>5. 注意事項</h2>
          <p>- 同意しなくても必須サービスの利用に制限はありません。</p>
          <p>- 同意撤回後はプロモーション/特典のご案内が提供されない場合があります。</p>
        </section>
      </div>
    </>
  );
}

function ChineseConsent() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MomentBook 营销信息接收同意</h1>
        <div className={styles.meta}>
          <p><strong>版本:</strong> 1.0.1</p>
          <p><strong>生效日期:</strong> 2025年1月4日</p>
          <p><strong>最后更新:</strong> 2025年1月4日</p>
          <p><strong>联系方式:</strong> yoondev3434@gmail.com</p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <h2>1. 同意对象及范围</h2>
          <p><strong>收集项目:</strong> 电子邮件地址、推送令牌（设备）</p>
          <p><strong>发送渠道:</strong> 电子邮件、应用推送通知</p>
          <p><strong>发送内容:</strong> 服务消息、新功能/活动、优惠/促销、问卷调查邀请</p>
        </section>

        <section>
          <h2>2. 使用目的及保管期限</h2>
          <p><strong>目的:</strong> 提供个性化信息、活动运营、客户沟通</p>
          <p><strong>保管:</strong> 保留至撤回同意或达成目的后删除（法定保留例外除外）</p>
        </section>

        <section>
          <h2>3. 第三方处理及跨境传输（如适用）</h2>
          <p>- 可能使用Firebase等外部服务进行发送/分析，在必要范围内处理。</p>
          <p>- 具体提供方·传输情况遵循隐私政策。</p>
        </section>

        <section>
          <h2>4. 撤回同意（退订）</h2>
          <p>- 可随时通过应用内<strong>设置 → 通知/营销接收设置</strong>更改</p>
          <p>- 可通过邮件底部的<strong>取消订阅</strong>按钮立即撤回</p>
          <p>- 也可通过操作系统通知设置（iOS/Android）屏蔽推送通知。</p>
        </section>

        <section>
          <h2>5. 注意事项</h2>
          <p>- 不同意也不会限制必要服务的使用。</p>
          <p>- 撤回同意后可能无法收到促销/优惠通知。</p>
        </section>
      </div>
    </>
  );
}

function SpanishConsent() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Consentimiento de información de marketing de MomentBook</h1>
        <div className={styles.meta}>
          <p><strong>Versión:</strong> 1.0.1</p>
          <p><strong>Fecha de entrada en vigor:</strong> 4 de enero de 2025</p>
          <p><strong>Última actualización:</strong> 4 de enero de 2025</p>
          <p><strong>Contacto:</strong> yoondev3434@gmail.com</p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <h2>1. Alcance del consentimiento</h2>
          <p><strong>Información recopilada:</strong> Dirección de correo electrónico, token de notificaciones push (dispositivo)</p>
          <p><strong>Canales de comunicación:</strong> Correo electrónico, notificaciones push dentro de la app</p>
          <p><strong>Tipos de contenido:</strong> Novedades del servicio, nuevas funciones y eventos, promociones y beneficios, invitaciones a encuestas</p>
        </section>

        <section>
          <h2>2. Finalidad y período de conservación</h2>
          <p><strong>Finalidad:</strong> Proporcionar información personalizada, gestionar eventos, comunicarse con el cliente</p>
          <p><strong>Conservación:</strong> Se mantiene hasta retirar el consentimiento o hasta cumplir la finalidad, y luego se elimina (salvo obligación legal de conservación)</p>
        </section>

        <section>
          <h2>3. Tratamiento por terceros y transferencia internacional</h2>
          <p>- Pueden utilizarse servicios externos como Firebase para el envío y el análisis, dentro del alcance necesario</p>
          <p>- Los destinatarios concretos y los detalles de transferencia siguen lo indicado en la Política de privacidad</p>
        </section>

        <section>
          <h2>4. Retirada del consentimiento (opt-out)</h2>
          <p>- Puede cambiarse en cualquier momento en la app mediante <strong>Ajustes → Notificaciones / Preferencias de marketing</strong></p>
          <p>- Puede cancelarse de inmediato mediante el botón <strong>Cancelar suscripción</strong> al final de los correos</p>
          <p>- También pueden bloquearse las notificaciones push desde los ajustes del sistema operativo (iOS / Android)</p>
        </section>

        <section>
          <h2>5. Avisos importantes</h2>
          <p>- No dar el consentimiento no limita el acceso a los servicios esenciales</p>
          <p>- Tras retirar el consentimiento, es posible que no se envíen promociones ni beneficios</p>
        </section>
      </div>
    </>
  );
}

function PortugueseConsent() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Consentimento de informações de marketing do MomentBook</h1>
        <div className={styles.meta}>
          <p><strong>Versão:</strong> 1.0.1</p>
          <p><strong>Data de vigência:</strong> 4 de janeiro de 2025</p>
          <p><strong>Última atualização:</strong> 4 de janeiro de 2025</p>
          <p><strong>Contato:</strong> yoondev3434@gmail.com</p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <h2>1. Escopo do consentimento</h2>
          <p><strong>Informações coletadas:</strong> Endereço de e-mail, token de push (dispositivo)</p>
          <p><strong>Canais de comunicação:</strong> E-mail, notificações push no app</p>
          <p><strong>Tipos de conteúdo:</strong> Atualizações do serviço, novos recursos e eventos, promoções e benefícios, convites para pesquisas</p>
        </section>

        <section>
          <h2>2. Finalidade e período de retenção</h2>
          <p><strong>Finalidade:</strong> Fornecer informações personalizadas, operar eventos, comunicação com o cliente</p>
          <p><strong>Retenção:</strong> Mantido até a retirada do consentimento ou até o cumprimento da finalidade, depois excluído (exceto quando houver retenção legal obrigatória)</p>
        </section>

        <section>
          <h2>3. Tratamento por terceiros e transferência internacional</h2>
          <p>- Serviços externos, como Firebase, podem ser usados para entrega e análise, dentro do escopo necessário</p>
          <p>- Os destinatários específicos e os detalhes de transferência seguem a Política de privacidade</p>
        </section>

        <section>
          <h2>4. Retirada do consentimento (opt-out)</h2>
          <p>- Pode ser alterado a qualquer momento no app em <strong>Configurações → Notificações / Preferências de marketing</strong></p>
          <p>- Pode ser cancelado imediatamente pelo botão <strong>Cancelar inscrição</strong> no fim dos e-mails</p>
          <p>- As notificações push também podem ser bloqueadas nas configurações do sistema (iOS / Android)</p>
        </section>

        <section>
          <h2>5. Observações importantes</h2>
          <p>- O acesso aos serviços essenciais não é restrito sem consentimento</p>
          <p>- Após a retirada do consentimento, promoções e benefícios podem deixar de ser enviados</p>
        </section>
      </div>
    </>
  );
}

function FrenchConsent() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Consentement marketing de MomentBook</h1>
        <div className={styles.meta}>
          <p><strong>Version :</strong> 1.0.1</p>
          <p><strong>Date d’entrée en vigueur :</strong> 4 janvier 2025</p>
          <p><strong>Dernière mise à jour :</strong> 4 janvier 2025</p>
          <p><strong>Contact :</strong> yoondev3434@gmail.com</p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <h2>1. Champ du consentement</h2>
          <p><strong>Informations collectées :</strong> Adresse e-mail, jeton de notification push (appareil)</p>
          <p><strong>Canaux de communication :</strong> E-mail, notifications push dans l’application</p>
          <p><strong>Types de contenu :</strong> Actualités du service, nouvelles fonctionnalités et événements, promotions et avantages, invitations à des enquêtes</p>
        </section>

        <section>
          <h2>2. Finalité et durée de conservation</h2>
          <p><strong>Finalité :</strong> Fournir des informations personnalisées, organiser des événements, communiquer avec les clients</p>
          <p><strong>Conservation :</strong> Conservé jusqu’au retrait du consentement ou jusqu’à l’accomplissement de la finalité, puis supprimé (sauf obligation légale de conservation)</p>
        </section>

        <section>
          <h2>3. Traitement par des tiers et transfert international</h2>
          <p>- Des services externes tels que Firebase peuvent être utilisés pour l’envoi et l’analyse, dans la mesure nécessaire</p>
          <p>- Les destinataires précis et les détails de transfert suivent la Politique de confidentialité</p>
        </section>

        <section>
          <h2>4. Retrait du consentement (opt-out)</h2>
          <p>- Vous pouvez modifier ce choix à tout moment dans l’application via <strong>Réglages → Notifications / Préférences marketing</strong></p>
          <p>- Vous pouvez vous désabonner immédiatement via le bouton <strong>Se désabonner</strong> en bas des e-mails</p>
          <p>- Les notifications push peuvent aussi être bloquées depuis les réglages du système (iOS / Android)</p>
        </section>

        <section>
          <h2>5. Remarques importantes</h2>
          <p>- Le refus de consentement ne restreint pas l’accès aux services essentiels</p>
          <p>- Après le retrait du consentement, les promotions et avantages peuvent ne plus être envoyés</p>
        </section>
      </div>
    </>
  );
}

function ThaiConsent() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>ความยินยอมรับข้อมูลการตลาดของ MomentBook</h1>
        <div className={styles.meta}>
          <p><strong>เวอร์ชัน:</strong> 1.0.1</p>
          <p><strong>วันที่มีผลบังคับใช้:</strong> 4 มกราคม 2025</p>
          <p><strong>อัปเดตล่าสุด:</strong> 4 มกราคม 2025</p>
          <p><strong>ติดต่อ:</strong> yoondev3434@gmail.com</p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <h2>1. ขอบเขตของความยินยอม</h2>
          <p><strong>ข้อมูลที่เก็บ:</strong> อีเมล, โทเคนแจ้งเตือนแบบพุช (อุปกรณ์)</p>
          <p><strong>ช่องทางการสื่อสาร:</strong> อีเมล, การแจ้งเตือนแบบพุชในแอป</p>
          <p><strong>ประเภทเนื้อหา:</strong> ข่าวสารบริการ, ฟีเจอร์ใหม่และกิจกรรม, โปรโมชั่นและสิทธิประโยชน์, คำเชิญทำแบบสอบถาม</p>
        </section>

        <section>
          <h2>2. วัตถุประสงค์และระยะเวลาการเก็บรักษา</h2>
          <p><strong>วัตถุประสงค์:</strong> ให้ข้อมูลเฉพาะบุคคล, ดำเนินกิจกรรม, สื่อสารกับลูกค้า</p>
          <p><strong>การเก็บรักษา:</strong> เก็บไว้จนกว่าจะถอนความยินยอมหรือบรรลุวัตถุประสงค์ จากนั้นจึงลบ (ยกเว้นกรณีที่กฎหมายกำหนดให้ต้องเก็บ)</p>
        </section>

        <section>
          <h2>3. การประมวลผลโดยบุคคลที่สามและการโอนข้อมูลข้ามประเทศ</h2>
          <p>- อาจใช้บริการภายนอก เช่น Firebase สำหรับการส่งและการวิเคราะห์ ภายในขอบเขตที่จำเป็น</p>
          <p>- ผู้รับข้อมูลและรายละเอียดการโอนข้อมูลเป็นไปตามนโยบายความเป็นส่วนตัว</p>
        </section>

        <section>
          <h2>4. การถอนความยินยอม (Opt-out)</h2>
          <p>- สามารถเปลี่ยนแปลงได้ทุกเมื่อในแอปที่ <strong>การตั้งค่า → การแจ้งเตือน / การตั้งค่าการตลาด</strong></p>
          <p>- สามารถยกเลิกได้ทันทีผ่านปุ่ม <strong>ยกเลิกการรับข่าวสาร</strong> ที่ท้ายอีเมล</p>
          <p>- สามารถบล็อกการแจ้งเตือนแบบพุชได้จากการตั้งค่าระบบปฏิบัติการ (iOS / Android)</p>
        </section>

        <section>
          <h2>5. หมายเหตุสำคัญ</h2>
          <p>- การไม่ให้ความยินยอมจะไม่จำกัดการเข้าถึงบริการที่จำเป็น</p>
          <p>- หลังถอนความยินยอม อาจไม่ได้รับโปรโมชั่นหรือสิทธิประโยชน์อีกต่อไป</p>
        </section>
      </div>
    </>
  );
}

function VietnameseConsent() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Đồng ý nhận thông tin tiếp thị MomentBook</h1>
        <div className={styles.meta}>
          <p><strong>Phiên bản:</strong> 1.0.1</p>
          <p><strong>Ngày có hiệu lực:</strong> 4 tháng 1, 2025</p>
          <p><strong>Cập nhật lần cuối:</strong> 4 tháng 1, 2025</p>
          <p><strong>Liên hệ:</strong> yoondev3434@gmail.com</p>
        </div>
      </header>

      <div className={styles.body}>
        <section>
          <h2>1. Phạm vi đồng ý</h2>
          <p><strong>Thông tin thu thập:</strong> Địa chỉ email, mã thông báo push (thiết bị)</p>
          <p><strong>Kênh liên lạc:</strong> Email, thông báo đẩy trong ứng dụng</p>
          <p><strong>Loại nội dung:</strong> Cập nhật dịch vụ, tính năng mới và sự kiện, khuyến mãi và ưu đãi, lời mời khảo sát</p>
        </section>

        <section>
          <h2>2. Mục đích và thời gian lưu giữ</h2>
          <p><strong>Mục đích:</strong> Cung cấp thông tin cá nhân hóa, vận hành sự kiện, giao tiếp với khách hàng</p>
          <p><strong>Lưu giữ:</strong> Được lưu cho đến khi rút lại đồng ý hoặc đạt được mục đích, sau đó sẽ xóa (trừ trường hợp pháp luật yêu cầu lưu giữ)</p>
        </section>

        <section>
          <h2>3. Xử lý bởi bên thứ ba và chuyển dữ liệu quốc tế</h2>
          <p>- Các dịch vụ bên ngoài như Firebase có thể được dùng cho việc gửi và phân tích, trong phạm vi cần thiết</p>
          <p>- Bên nhận cụ thể và chi tiết chuyển dữ liệu tuân theo Chính sách quyền riêng tư</p>
        </section>

        <section>
          <h2>4. Rút lại đồng ý (opt-out)</h2>
          <p>- Có thể thay đổi bất cứ lúc nào trong ứng dụng tại <strong>Cài đặt → Thông báo / Tùy chọn tiếp thị</strong></p>
          <p>- Có thể hủy đăng ký ngay qua nút <strong>Hủy đăng ký</strong> ở cuối email</p>
          <p>- Cũng có thể chặn thông báo đẩy qua cài đặt hệ điều hành (iOS / Android)</p>
        </section>

        <section>
          <h2>5. Lưu ý quan trọng</h2>
          <p>- Việc không đồng ý sẽ không hạn chế quyền sử dụng các dịch vụ thiết yếu</p>
          <p>- Sau khi rút lại đồng ý, các ưu đãi và khuyến mãi có thể sẽ không còn được gửi nữa</p>
        </section>
      </div>
    </>
  );
}
