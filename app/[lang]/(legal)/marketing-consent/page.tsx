import type { Metadata } from "next";
import styles from "./marketing-consent.module.scss";
import { type Language } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Marketing Consent",
  description: "Marketing and promotional communications consent policy.",
};

export default async function MarketingConsentPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };

  return (
    <div className={styles.container}>
      <article className={styles.content}>
        {lang === "en" && <EnglishConsent />}
        {lang === "ko" && <KoreanConsent />}
        {lang === "ja" && <JapaneseConsent />}
        {lang === "zh" && <ChineseConsent />}
      </article>
    </div>
  );
}

function EnglishConsent() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Marketing Information Consent</h1>
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
        <h1 className={styles.title}>마케팅 정보 수신 동의</h1>
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
        <h1 className={styles.title}>マーケティング情報受信同意</h1>
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
        <h1 className={styles.title}>营销信息接收同意</h1>
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
