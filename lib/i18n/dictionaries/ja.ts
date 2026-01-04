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
      title: 'Your day, quietly kept',
      deviceText: 'A day remembered',
    },
    flow: {
      photo: {
        deviceText: 'A photo, nothing more',
        text: 'Take a photo when something feels worth keeping.',
      },
      moment: {
        deviceText: 'A moment passes',
        text: 'No caption required. No context needed.',
      },
      memory: {
        deviceText: 'A memory stays',
        text: 'Weeks later, you might remember. Or you might not. Either way is fine.',
      },
    },
    pause: {
      text: "Nothing is required.\n\nThat's the point.",
    },
    privacy: {
      text: 'Private by default. Your journey is yours first.',
    },
    cta: {
      deviceText: 'Start quietly',
      primaryButton: 'iOS版をダウンロード',
      secondaryButton: 'Android版をダウンロード',
    },
  },

  // Common
  common: {
    comingSoon: '近日公開',
    learnMore: '詳細を見る',
  },

  // Footer
  footer: {
    links: {
      privacy: 'プライバシー',
      terms: '利用規約',
      support: 'サポート',
    },
    copyright: '© 2024 MomentBook. All rights reserved.',
  },
};
