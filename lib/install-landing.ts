import { getLocalizedScreenshotPath, type AppScreenshotKey } from "@/lib/app-screenshots";
import { type Language } from "@/lib/i18n/config";

export type InstallLandingVariantKey = "organized-journey" | "timeline" | "sorted-day-place";

export type DestinationSampleKey = "paris" | "tokyo" | "jeju" | "default";

type LocalizedText = {
  en: string;
  ko: string;
};

type HeroHeadlineOption = {
  key: InstallLandingVariantKey;
  label: string;
  text: LocalizedText;
};

type BenefitCardConfig = {
  key: string;
  title: LocalizedText;
  body: LocalizedText;
  screenshotKey: AppScreenshotKey;
  objectPosition: string;
};

type SampleDay = {
  dayLabel: LocalizedText;
  title: LocalizedText;
  note: LocalizedText;
};

type DestinationSample = {
  key: DestinationSampleKey;
  city: LocalizedText;
  heroLabel: LocalizedText;
  heroLead: LocalizedText;
  sectionTitle: LocalizedText;
  sectionLead: LocalizedText;
  days: SampleDay[];
};

type LandingCopy = {
  eyebrow: LocalizedText;
  heroSubheadline: LocalizedText;
  heroSubheadlineByDestination: (city: string) => LocalizedText;
  sectionBenefitsLabel: LocalizedText;
  sectionSampleLabel: LocalizedText;
  sectionInstallLabel: LocalizedText;
  sampleTripLink: LocalizedText;
  heroSteps: LocalizedText[];
  trustItems: LocalizedText[];
  benefitsTitle: LocalizedText;
  benefitsLead: LocalizedText;
  sampleFallbackTitle: LocalizedText;
  sampleFallbackLead: LocalizedText;
  finalTitle: LocalizedText;
  finalLead: LocalizedText;
  finalDesktopNote: LocalizedText;
  openInAppLabel: LocalizedText;
  installBarLead: LocalizedText;
  installBarAction: LocalizedText;
  timelineViewLabel: LocalizedText;
  dismissLabel: LocalizedText;
};

export type InstallLandingContent = {
  heroHeadline: string;
  heroHeadlineOptions: Array<{ key: InstallLandingVariantKey; label: string; text: string }>;
  eyebrow: string;
  heroSubheadline: string;
  sectionBenefitsLabel: string;
  sectionSampleLabel: string;
  sectionInstallLabel: string;
  sampleTripLink: string;
  heroSteps: string[];
  trustItems: string[];
  benefitsTitle: string;
  benefitsLead: string;
  benefits: Array<{
    key: string;
    title: string;
    body: string;
    screenshotSrc: string;
    objectPosition: string;
  }>;
  sample: {
    key: DestinationSampleKey;
    city: string;
    heroLabel: string;
    heroLead: string;
    sectionTitle: string;
    sectionLead: string;
    days: Array<{
      dayLabel: string;
      title: string;
      note: string;
    }>;
  };
  finalTitle: string;
  finalLead: string;
  finalDesktopNote: string;
  openInAppLabel: string;
  installBarLead: string;
  installBarAction: string;
  timelineViewLabel: string;
  dismissLabel: string;
  heroFrames: Array<{
    key: AppScreenshotKey;
    src: string;
  }>;
  sampleTimelineScreenshotSrc: string;
};

const HERO_HEADLINE_OPTIONS: HeroHeadlineOption[] = [
  {
    key: "organized-journey",
    label: "Candidate A",
    text: {
      en: "Travel photos, organized into one journey.",
      ko: "여행 사진이 하나의 여정으로 정리됩니다.",
    },
  },
  {
    key: "timeline",
    label: "Candidate B",
    text: {
      en: "Turn your trip into a timeline.",
      ko: "여행을 하나의 타임라인으로 정리하세요.",
    },
  },
  {
    key: "sorted-day-place",
    label: "Candidate C",
    text: {
      en: "Your travel memories, sorted by day and place.",
      ko: "여행의 기억을 날짜와 장소 기준으로 정리합니다.",
    },
  },
];

const BENEFIT_CARDS: BenefitCardConfig[] = [
  {
    key: "group-by-place",
    title: {
      en: "Automatically group by date and place",
      ko: "날짜와 장소 기준으로 자동 정리",
    },
    body: {
      en: "Bring in the photos you already took and let the trip gather into one flow.",
      ko: "이미 찍어 둔 사진을 가져오면 여행 흐름이 하나로 정리됩니다.",
    },
    screenshotKey: "photos",
    objectPosition: "center 18%",
  },
  {
    key: "clean-timeline",
    title: {
      en: "Turn a trip into a clean timeline",
      ko: "여행을 깔끔한 타임라인으로 정리",
    },
    body: {
      en: "See each stop in order without digging through your camera roll.",
      ko: "카메라 롤을 뒤지지 않아도 여행 순서를 바로 볼 수 있습니다.",
    },
    screenshotKey: "timeline",
    objectPosition: "center top",
  },
  {
    key: "map-recap",
    title: {
      en: "Revisit memories on a map",
      ko: "지도에서 다시 보는 여행의 순간",
    },
    body: {
      en: "Use the map view to return to where the day actually unfolded.",
      ko: "지도로 하루가 실제로 펼쳐진 위치를 다시 따라갈 수 있습니다.",
    },
    screenshotKey: "tracking",
    objectPosition: "center 16%",
  },
];

const LANDING_COPY: LandingCopy = {
  eyebrow: {
    en: "MomentBook · Memorize your moments",
    ko: "MomentBook · 여행의 순간을 기억하세요",
  },
  heroSubheadline: {
    en: "Upload your trip and get a clean travel timeline from the photos you already took.",
    ko: "이미 찍은 여행 사진을 올리면, 날짜와 장소 흐름이 보이는 깔끔한 타임라인이 만들어집니다.",
  },
  heroSubheadlineByDestination: (city) => ({
    en: `Upload your ${city} trip and get a clean travel timeline from the photos you already took.`,
    ko: `${city} 여행 사진을 올리면, 날짜와 장소 흐름이 보이는 깔끔한 타임라인이 만들어집니다.`,
  }),
  sectionBenefitsLabel: {
    en: "Benefits",
    ko: "핵심 변화",
  },
  sectionSampleLabel: {
    en: "Sample",
    ko: "예시",
  },
  sectionInstallLabel: {
    en: "Install",
    ko: "설치",
  },
  sampleTripLink: {
    en: "See a sample trip",
    ko: "예시 여행 보기",
  },
  heroSteps: [
    {
      en: "Import photos",
      ko: "사진 가져오기",
    },
    {
      en: "Sort by day and place",
      ko: "날짜와 장소 기준 정리",
    },
    {
      en: "Review the timeline",
      ko: "타임라인 확인",
    },
    {
      en: "Revisit on the map",
      ko: "지도에서 다시 보기",
    },
  ],
  trustItems: [
    {
      en: "Available on App Store",
      ko: "App Store에서 사용 가능",
    },
    {
      en: "Available on Google Play",
      ko: "Google Play에서 사용 가능",
    },
    {
      en: "iOS 15.1+",
      ko: "iOS 15.1+",
    },
    {
      en: "Android 7.0+",
      ko: "Android 7.0+",
    },
  ],
  benefitsTitle: {
    en: "What changes after the trip",
    ko: "여행이 끝난 뒤 달라지는 점",
  },
  benefitsLead: {
    en: "Keep the first explanation short: import once, see the trip in order, return to it on a map.",
    ko: "설명은 짧게 유지합니다. 한 번에 가져오고, 순서대로 보고, 지도에서 다시 돌아갑니다.",
  },
  sampleFallbackTitle: {
    en: "A sample trip, matched to the short when available",
    ko: "가능하면 쇼츠 맥락에 맞춘 예시 여행",
  },
  sampleFallbackLead: {
    en: "Use destination-specific day flows so the first sample feels connected to what the visitor just watched.",
    ko: "방금 본 쇼츠와 이어지도록 여행지별 day flow 예시를 보여줍니다.",
  },
  finalTitle: {
    en: "Install MomentBook when you are ready to keep the trip",
    ko: "여행을 남기고 싶을 때 MomentBook을 설치하세요",
  },
  finalLead: {
    en: "Use the official store links below. On mobile, the page can try to open the app first when deep links are configured.",
    ko: "아래 공식 스토어 링크를 사용하세요. 모바일에서는 딥링크가 설정되어 있으면 앱 열기를 먼저 시도할 수 있습니다.",
  },
  finalDesktopNote: {
    en: "On desktop, use either store link and continue on your phone.",
    ko: "데스크톱에서는 스토어 링크를 선택한 뒤 휴대폰에서 이어서 진행하세요.",
  },
  openInAppLabel: {
    en: "Open in app",
    ko: "앱에서 열기",
  },
  installBarLead: {
    en: "Keep going in MomentBook",
    ko: "MomentBook에서 이어서 보기",
  },
  installBarAction: {
    en: "Get it on Google Play",
    ko: "Google Play에서 받기",
  },
  timelineViewLabel: {
    en: "Timeline view in MomentBook",
    ko: "MomentBook 타임라인 화면",
  },
  dismissLabel: {
    en: "Close",
    ko: "닫기",
  },
};

const DESTINATION_SAMPLES: Record<DestinationSampleKey, DestinationSample> = {
  default: {
    key: "default",
    city: {
      en: "sample trip",
      ko: "예시 여행",
    },
    heroLabel: {
      en: "Short-led sample",
      ko: "쇼츠 맥락 예시",
    },
    heroLead: {
      en: "A destination-matched sample can make the first step feel familiar instead of generic.",
      ko: "여행지에 맞춘 예시는 첫 화면을 일반적인 소개보다 더 익숙하게 만듭니다.",
    },
    sectionTitle: {
      en: "A calm sample timeline",
      ko: "차분하게 보는 예시 타임라인",
    },
    sectionLead: {
      en: "Use a nearby example when the short does not pass a destination yet.",
      ko: "쇼츠에서 여행지를 전달하지 못했을 때는 가까운 예시를 먼저 보여줍니다.",
    },
    days: [
      {
        dayLabel: {
          en: "Day 1",
          ko: "Day 1",
        },
        title: {
          en: "Arrival and first walk",
          ko: "도착 후 첫 산책",
        },
        note: {
          en: "Group the first photos into one arrival block so the trip starts cleanly.",
          ko: "첫 사진을 하나의 도착 블록으로 묶어 여행 시작을 깔끔하게 정리합니다.",
        },
      },
      {
        dayLabel: {
          en: "Day 2",
          ko: "Day 2",
        },
        title: {
          en: "Main route in order",
          ko: "주요 동선을 순서대로",
        },
        note: {
          en: "Follow the trip by time, not by whatever the camera roll surfaces first.",
          ko: "카메라 롤 순서가 아니라 실제 여행 시간 순서로 따라갑니다.",
        },
      },
      {
        dayLabel: {
          en: "Day 3",
          ko: "Day 3",
        },
        title: {
          en: "Map recap before you leave",
          ko: "떠나기 전 지도 recap",
        },
        note: {
          en: "Return to the last places quickly before the trip fades into the gallery.",
          ko: "여행이 갤러리에 흩어지기 전에 마지막 장소를 빠르게 다시 봅니다.",
        },
      },
    ],
  },
  paris: {
    key: "paris",
    city: {
      en: "Paris",
      ko: "파리",
    },
    heroLabel: {
      en: "Paris sample",
      ko: "파리 예시",
    },
    heroLead: {
      en: "Keep the landing close to the short with a Paris day flow instead of a generic travel pitch.",
      ko: "일반적인 여행 소개 대신 파리 day flow를 보여줘 쇼츠의 감정선을 이어갑니다.",
    },
    sectionTitle: {
      en: "A Paris sample timeline",
      ko: "파리 예시 타임라인",
    },
    sectionLead: {
      en: "Use the same message from the short: one trip, ordered by day and place.",
      ko: "쇼츠에서 본 메시지를 그대로 이어갑니다. 하나의 여행을 날짜와 장소로 정리합니다.",
    },
    days: [
      {
        dayLabel: {
          en: "Day 1",
          ko: "Day 1",
        },
        title: {
          en: "Saint-Germain to the Seine",
          ko: "생제르맹에서 센 강까지",
        },
        note: {
          en: "Morning cafe photos and river walk shots stay in one first-day block.",
          ko: "아침 카페 사진과 센 강 산책 사진이 첫날 블록으로 함께 정리됩니다.",
        },
      },
      {
        dayLabel: {
          en: "Day 2",
          ko: "Day 2",
        },
        title: {
          en: "Louvre to Montmartre",
          ko: "루브르에서 몽마르트까지",
        },
        note: {
          en: "Museum, metro, and evening hill views become one continuous timeline.",
          ko: "박물관, 지하철, 저녁 언덕 풍경이 하나의 연속된 타임라인이 됩니다.",
        },
      },
      {
        dayLabel: {
          en: "Day 3",
          ko: "Day 3",
        },
        title: {
          en: "Canal walk and last dinner",
          ko: "운하 산책과 마지막 저녁",
        },
        note: {
          en: "The closing day stays easy to revisit without searching the whole gallery again.",
          ko: "마지막 날도 갤러리 전체를 다시 뒤지지 않고 바로 돌아볼 수 있습니다.",
        },
      },
    ],
  },
  tokyo: {
    key: "tokyo",
    city: {
      en: "Tokyo",
      ko: "도쿄",
    },
    heroLabel: {
      en: "Tokyo sample",
      ko: "도쿄 예시",
    },
    heroLead: {
      en: "Swap the example to Tokyo so the first screen still feels connected to the short.",
      ko: "도쿄 예시로 바꿔 첫 화면이 방금 본 쇼츠와 계속 이어지도록 만듭니다.",
    },
    sectionTitle: {
      en: "A Tokyo sample timeline",
      ko: "도쿄 예시 타임라인",
    },
    sectionLead: {
      en: "Keep the pacing simple: neighborhood to neighborhood, day by day.",
      ko: "동네에서 동네로, 날짜 순서대로 단순하게 보여줍니다.",
    },
    days: [
      {
        dayLabel: {
          en: "Day 1",
          ko: "Day 1",
        },
        title: {
          en: "Asakusa to Ueno",
          ko: "아사쿠사에서 우에노까지",
        },
        note: {
          en: "Temple shots, market photos, and park stops stay connected in one day card.",
          ko: "절, 시장, 공원 사진이 하루 카드 안에 자연스럽게 이어집니다.",
        },
      },
      {
        dayLabel: {
          en: "Day 2",
          ko: "Day 2",
        },
        title: {
          en: "Shibuya crossing to Yoyogi",
          ko: "시부야에서 요요기까지",
        },
        note: {
          en: "Busy city scenes and a quieter park walk can still sit in one clean timeline.",
          ko: "분주한 도심과 조용한 공원 산책도 하나의 깔끔한 타임라인에 담깁니다.",
        },
      },
      {
        dayLabel: {
          en: "Day 3",
          ko: "Day 3",
        },
        title: {
          en: "Morning coffee and the final train",
          ko: "아침 커피와 마지막 열차",
        },
        note: {
          en: "The trip closes with a short recap instead of ending as loose photos.",
          ko: "흩어진 사진으로 끝나는 대신 짧은 recap으로 여행을 닫습니다.",
        },
      },
    ],
  },
  jeju: {
    key: "jeju",
    city: {
      en: "Jeju",
      ko: "제주",
    },
    heroLabel: {
      en: "Jeju sample",
      ko: "제주 예시",
    },
    heroLead: {
      en: "Jeju matches the existing sample timeline already shown inside the app UI assets.",
      ko: "제주는 현재 앱 UI 자산 안에 이미 포함된 예시 타임라인과 자연스럽게 이어집니다.",
    },
    sectionTitle: {
      en: "A Jeju sample timeline",
      ko: "제주 예시 타임라인",
    },
    sectionLead: {
      en: "Use the sample already inside MomentBook to show how one quiet route becomes a memory path.",
      ko: "MomentBook 안의 예시를 그대로 사용해 조용한 동선이 기억의 경로가 되는 방식을 보여줍니다.",
    },
    days: [
      {
        dayLabel: {
          en: "Day 1",
          ko: "Day 1",
        },
        title: {
          en: "Stone Park to Woljeongri Beach",
          ko: "돌문화공원에서 월정리 해변까지",
        },
        note: {
          en: "Keep the first coastal route as one story instead of scattered photos.",
          ko: "첫 해안 동선을 흩어진 사진이 아니라 하나의 이야기로 남깁니다.",
        },
      },
      {
        dayLabel: {
          en: "Day 2",
          ko: "Day 2",
        },
        title: {
          en: "Seongsan sunrise and east coast stops",
          ko: "성산 일출과 동쪽 해안 정차",
        },
        note: {
          en: "Photos from multiple scenic stops stay in order by time and place.",
          ko: "여러 풍경 지점의 사진도 시간과 장소 순서대로 유지됩니다.",
        },
      },
      {
        dayLabel: {
          en: "Day 3",
          ko: "Day 3",
        },
        title: {
          en: "Hallasan foothills and a quiet finish",
          ko: "한라산 자락과 조용한 마무리",
        },
        note: {
          en: "The final day becomes easy to revisit before the trip fades into the archive.",
          ko: "여행이 아카이브로 넘어가기 전에 마지막 날을 쉽게 다시 볼 수 있습니다.",
        },
      },
    ],
  },
};

function readText(lang: Language, value: LocalizedText) {
  return lang === "ko" ? value.ko : value.en;
}

function normalizeDestinationValue(dest: string | null | undefined) {
  if (!dest) {
    return "default";
  }

  const normalized = dest.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");

  if (!normalized) {
    return "default";
  }

  if (normalized in DESTINATION_SAMPLES) {
    return normalized as DestinationSampleKey;
  }

  return "default";
}

export function normalizeInstallLandingVariant(value: string | null | undefined) {
  if (!value) {
    return HERO_HEADLINE_OPTIONS[0].key;
  }

  const matchedOption = HERO_HEADLINE_OPTIONS.find((option) => option.key === value);
  return matchedOption?.key ?? HERO_HEADLINE_OPTIONS[0].key;
}

export function getDestinationSampleKey(value: string | null | undefined) {
  return normalizeDestinationValue(value);
}

export function getInstallLandingContent(
  lang: Language,
  options: {
    dest?: string | null;
    variant?: string | null;
  } = {},
): InstallLandingContent {
  const destinationKey = getDestinationSampleKey(options.dest);
  const destination = DESTINATION_SAMPLES[destinationKey];
  const headlineKey = normalizeInstallLandingVariant(options.variant);
  const activeHeadline =
    HERO_HEADLINE_OPTIONS.find((option) => option.key === headlineKey) ?? HERO_HEADLINE_OPTIONS[0];
  const heroSubheadline = destinationKey === "default"
    ? readText(lang, LANDING_COPY.heroSubheadline)
    : readText(
        lang,
        LANDING_COPY.heroSubheadlineByDestination(readText(lang, destination.city)),
      );

  return {
    heroHeadline: readText(lang, activeHeadline.text),
    heroHeadlineOptions: HERO_HEADLINE_OPTIONS.map((option) => ({
      key: option.key,
      label: option.label,
      text: readText(lang, option.text),
    })),
    eyebrow: readText(lang, LANDING_COPY.eyebrow),
    heroSubheadline,
    sectionBenefitsLabel: readText(lang, LANDING_COPY.sectionBenefitsLabel),
    sectionSampleLabel: readText(lang, LANDING_COPY.sectionSampleLabel),
    sectionInstallLabel: readText(lang, LANDING_COPY.sectionInstallLabel),
    sampleTripLink: readText(lang, LANDING_COPY.sampleTripLink),
    heroSteps: LANDING_COPY.heroSteps.map((step) => readText(lang, step)),
    trustItems: LANDING_COPY.trustItems.map((item) => readText(lang, item)),
    benefitsTitle: readText(lang, LANDING_COPY.benefitsTitle),
    benefitsLead: readText(lang, LANDING_COPY.benefitsLead),
    benefits: BENEFIT_CARDS.map((benefit) => ({
      key: benefit.key,
      title: readText(lang, benefit.title),
      body: readText(lang, benefit.body),
      screenshotSrc: getLocalizedScreenshotPath(lang, benefit.screenshotKey),
      objectPosition: benefit.objectPosition,
    })),
    sample: {
      key: destination.key,
      city: readText(lang, destination.city),
      heroLabel: readText(lang, destination.heroLabel),
      heroLead: readText(lang, destination.heroLead),
      sectionTitle: destinationKey === "default"
        ? readText(lang, LANDING_COPY.sampleFallbackTitle)
        : readText(lang, destination.sectionTitle),
      sectionLead: destinationKey === "default"
        ? readText(lang, LANDING_COPY.sampleFallbackLead)
        : readText(lang, destination.sectionLead),
      days: destination.days.map((day) => ({
        dayLabel: readText(lang, day.dayLabel),
        title: readText(lang, day.title),
        note: readText(lang, day.note),
      })),
    },
    finalTitle: readText(lang, LANDING_COPY.finalTitle),
    finalLead: readText(lang, LANDING_COPY.finalLead),
    finalDesktopNote: readText(lang, LANDING_COPY.finalDesktopNote),
    openInAppLabel: readText(lang, LANDING_COPY.openInAppLabel),
    installBarLead: readText(lang, LANDING_COPY.installBarLead),
    installBarAction: readText(lang, LANDING_COPY.installBarAction),
    timelineViewLabel: readText(lang, LANDING_COPY.timelineViewLabel),
    dismissLabel: readText(lang, LANDING_COPY.dismissLabel),
    heroFrames: [
      { key: "intro", src: getLocalizedScreenshotPath(lang, "intro") },
      { key: "photos", src: getLocalizedScreenshotPath(lang, "photos") },
      { key: "timeline", src: getLocalizedScreenshotPath(lang, "timeline") },
      { key: "tracking", src: getLocalizedScreenshotPath(lang, "tracking") },
    ],
    sampleTimelineScreenshotSrc: getLocalizedScreenshotPath(lang, "timeline"),
  };
}
