// Korean dictionary - To be translated

import type { Dictionary } from './en';

export const ko: Dictionary = {
  // Navigation
  nav: {
    home: '홈',
    about: '소개',
    howItWorks: '작동 방식',
    download: '다운로드',
    faq: '자주 묻는 질문',
    support: '고객 지원',
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
      primaryButton: 'iOS 다운로드',
      secondaryButton: 'Android 다운로드',
    },
  },

  // Common
  common: {
    comingSoon: '곧 출시',
    learnMore: '자세히 알아보기',
  },

  // Footer
  footer: {
    links: {
      privacy: '개인정보 보호',
      terms: '이용약관',
      support: '고객 지원',
    },
    copyright: '© 2024 MomentBook. All rights reserved.',
  },
};
