// Japanese dictionary - To be translated

import type { Dictionary } from './en';

export const ja: Dictionary = {
  // Navigation
  nav: {
    home: 'ホーム',
    about: '概要',
    howItWorks: '使い方',
    download: 'ダウンロード',
    faq: 'よくある質問',
    support: 'サポート',
  },

  // Home page - Placeholder, needs proper translation
  home: {
    hero: {
      title: '一日の行き先を静かに記録します',
      deviceText: '瞬間をそっと残す',
    },
    flow: {
      photo: {
        deviceText: '瞬間を記録',
        text: '残したいと感じた瞬間に写真や短いメモを保存します。',
      },
      moment: {
        deviceText: '一日が形になる',
        text: '場所と時間で瞬間がまとまり、一日の流れが見えてきます。',
      },
      memory: {
        deviceText: '好きなときに戻る',
        text: '日付や場所から見返せます。続ける義務はありません。',
      },
    },
    pause: {
      text: "連続記録も通知もありません。\n\n必要なときに開くだけ。",
    },
    privacy: {
      text: 'デフォルトは非公開。記録は自分のために、追跡やフィードはありません。',
    },
    cta: {
      deviceText: '最初の一日へ',
      primaryButton: 'MomentBook をダウンロード',
      secondaryButton: 'Android版をダウンロード',
    },
  },

  // Common
  common: {
    comingSoon: '近日公開',
    learnMore: '仕組みを見る',
  },

  // Footer
  footer: {
    links: {
      privacy: 'プライバシー',
      terms: '利用規約',
      communityGuidelines: 'コミュニティガイドライン',
      marketingConsent: 'マーケティング同意',
      support: 'サポート',
    },
    copyright: '© 2024 MomentBook. All rights reserved.',
  },
};
