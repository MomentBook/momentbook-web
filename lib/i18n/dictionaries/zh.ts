// Chinese dictionary - To be translated

import type { Dictionary } from './en';

export const zh: Dictionary = {
  // Navigation
  nav: {
    home: '首页',
    about: '关于',
    howItWorks: '工作原理',
    download: '下载',
    faq: '常见问题',
    support: '支持',
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
      primaryButton: '下载 iOS 版',
      secondaryButton: '下载 Android 版',
    },
  },

  // Common
  common: {
    comingSoon: '即将推出',
    learnMore: '了解更多',
  },

  // Footer
  footer: {
    links: {
      privacy: '隐私政策',
      terms: '服务条款',
      communityGuidelines: '社区准则',
      support: '支持',
    },
    copyright: '© 2024 MomentBook. All rights reserved.',
  },
};
