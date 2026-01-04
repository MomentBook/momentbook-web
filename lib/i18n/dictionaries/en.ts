// English dictionary - Reference language

export const en = {
  // Navigation
  nav: {
    home: 'Home',
    about: 'About',
    howItWorks: 'How It Works',
    download: 'Download',
    faq: 'FAQ',
    support: 'Support',
  },

  // Home page
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
      primaryButton: 'Download for iOS',
      secondaryButton: 'Download for Android',
    },
  },

  // Common
  common: {
    comingSoon: 'Coming soon',
    learnMore: 'Learn more',
  },

  // Footer
  footer: {
    links: {
      privacy: 'Privacy',
      terms: 'Terms',
      communityGuidelines: 'Community Guidelines',
      marketingConsent: 'Marketing Consent',
      support: 'Support',
    },
    copyright: '© 2024 MomentBook. All rights reserved.',
  },
};

// Define a flexible dictionary type that allows string values for translations
export type Dictionary = {
  nav: {
    home: string;
    about: string;
    howItWorks: string;
    download: string;
    faq: string;
    support: string;
  };
  home: {
    hero: {
      title: string;
      deviceText: string;
    };
    flow: {
      photo: {
        deviceText: string;
        text: string;
      };
      moment: {
        deviceText: string;
        text: string;
      };
      memory: {
        deviceText: string;
        text: string;
      };
    };
    pause: {
      text: string;
    };
    privacy: {
      text: string;
    };
    cta: {
      deviceText: string;
      primaryButton: string;
      secondaryButton: string;
    };
  };
  common: {
    comingSoon: string;
    learnMore: string;
  };
  footer: {
    links: {
      privacy: string;
      terms: string;
      communityGuidelines: string;
      marketingConsent: string;
      support: string;
    };
    copyright: string;
  };
};
