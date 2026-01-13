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
      title: 'A quiet record of the places your day takes you',
      deviceText: 'Moments, gently kept',
    },
    flow: {
      photo: {
        deviceText: 'Capture a moment',
        text: 'Save a photo or a short note when something feels worth keeping.',
      },
      moment: {
        deviceText: 'The day finds its shape',
        text: 'Moments gather by place and time, so your day becomes a simple story.',
      },
      memory: {
        deviceText: 'Return when you want',
        text: 'Browse by day or place. Nothing to keep up, nothing to miss.',
      },
    },
    pause: {
      text: "No streaks.\n\nTravel alerts and journey reminders when it helps.",
    },
    privacy: {
      text: 'Private by default. Publish only when you choose.',
    },
    cta: {
      deviceText: 'Start a day',
      primaryButton: 'Download MomentBook',
      secondaryButton: 'Download for Android',
    },
  },

  // Common
  common: {
    comingSoon: 'Coming soon',
    learnMore: 'See how it works',
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
