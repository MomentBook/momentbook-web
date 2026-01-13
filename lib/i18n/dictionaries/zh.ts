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
      title: '把一天去过的地方安静记录下来',
      deviceText: '轻轻留下瞬间',
    },
    flow: {
      photo: {
        deviceText: '记录瞬间',
        text: '当你觉得值得留下时，记录一张照片或一句短句。',
      },
      moment: {
        deviceText: '一天有了形状',
        text: '时间与地点把瞬间串起来，形成一天的轨迹。',
      },
      memory: {
        deviceText: '想起时再看',
        text: '可按日期或地点回看，不必坚持或打卡。',
      },
    },
  pause: {
      text: "没有连续记录。\n\n在需要时提供行程提醒。",
  },
  privacy: {
      text: '默认私密，发布后公开。',
  },
    cta: {
      deviceText: '开始第一天',
      primaryButton: '下载 MomentBook',
      secondaryButton: '下载 Android 版',
    },
  },

  // Common
  common: {
    comingSoon: '即将推出',
    learnMore: '了解工作方式',
  },

  // Footer
  footer: {
    links: {
      privacy: '隐私政策',
      terms: '服务条款',
      communityGuidelines: '社区准则',
      marketingConsent: '营销同意',
      support: '支持',
    },
    copyright: '© 2024 MomentBook. All rights reserved.',
  },
};
