import "server-only";

import type {
  CaptureTimeContext,
  LocalDateTimeContext,
} from "@/lib/local-time-context";

export type AdminReviewStatus = "PENDING" | "APPROVED" | "REJECTED";
export type AdminReviewQueueStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "all";

export type AdminReviewState = {
  status: AdminReviewStatus;
  approved: boolean;
  reviewedAt?: string | null;
  reviewedByUserId?: string | null;
  rejectionReason?: string | null;
};

export type AdminReviewAuthor = {
  userId: string;
  name?: string | null;
  picture?: string | null;
};

export type AdminReviewQueueItem = {
  publicId: string;
  journeyId: string;
  userId: string;
  title?: string | null;
  description?: string | null;
  thumbnailUrl?: string | null;
  photoCount: number;
  createdAt: string;
  publishedAt?: string | null;
  visibility: "public" | "hidden";
  review: AdminReviewState;
  author: AdminReviewAuthor;
};

export type AdminReviewSummary = {
  pendingCount: number;
  approvedTodayCount: number;
  rejectedTodayCount: number;
};

export type AdminReviewQueueData = {
  summary: AdminReviewSummary;
  items: AdminReviewQueueItem[];
  total: number;
  page: number;
  pages: number;
  limit: number;
  status: AdminReviewQueueStatus;
};

export type AdminJourneyImage = {
  photoId?: string;
  url: string;
  width?: number;
  height?: number;
  takenAt?: number;
  captureTime?: CaptureTimeContext | null;
  locationName?: string;
  location?: {
    lat?: number;
    lng?: number;
    latitude?: number;
    longitude?: number;
  };
};

export type AdminJourneyTimelineItem = {
  clusterId?: string;
  type?: "STOP" | "MOVE" | "ORPHAN";
  time?: {
    startAt?: number;
    endAt?: number;
    durationMs?: number;
    startLocal?: LocalDateTimeContext | null;
    endLocal?: LocalDateTimeContext | null;
  };
  center?: {
    lat?: number;
    lng?: number;
  };
  locationName?: string;
  impression?: string;
  photoIds?: string[];
};

export type AdminLocalizedJourneyEntry = {
  locale: string;
  languageCode: string;
  countryCode: string;
  languageName: string;
  title?: string;
  description?: string;
  hashtags: string[];
};

export type AdminLocalizedClusterImpression = {
  clusterId: string;
  translations: Array<{
    locale: string;
    languageCode: string;
    countryCode: string;
    languageName: string;
    impression?: string;
  }>;
};

export type AdminJourneyDetail = {
  publicId: string;
  journeyId: string;
  userId: string;
  author: AdminReviewAuthor;
  startedAt: number;
  endedAt?: number;
  startedAtLocal?: LocalDateTimeContext | null;
  endedAtLocal?: LocalDateTimeContext | null;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  shareUrl?: string;
  mode: "PHOTO_ONLY";
  photoCount: number;
  images: AdminJourneyImage[];
  clusters: AdminJourneyTimelineItem[];
  timeline: AdminJourneyTimelineItem[];
  recapDraft?: {
    timeline?: AdminJourneyTimelineItem[];
    photoCount?: number;
    imageCount?: number;
  };
  localizedContent?: {
    sourceLanguage: string;
    generatedAt: string;
    entries: AdminLocalizedJourneyEntry[];
    clusterImpressions: AdminLocalizedClusterImpression[];
  };
  publishedAt?: string;
  createdAt: string;
  review: {
    status: AdminReviewStatus;
    approved: boolean;
  };
  visibility: "public" | "hidden";
  contentStatus:
    | "available"
    | "reported_hidden"
    | "review_pending"
    | "review_rejected";
  notice?: string;
};

export type AdminReviewDetail = {
  journey: AdminJourneyDetail;
  review: AdminReviewState;
};

type MockJourneyRecord = AdminReviewDetail;

const floatingLocal = (
  localDateTime: string,
  timeZoneId: string,
): LocalDateTimeContext => ({
  localDateTime,
  utcOffsetMinutes: null,
  timeZoneId,
  localDateTimeType: "floating_local",
});

const MOCK_JOURNEYS: MockJourneyRecord[] = [
  {
    journey: {
      publicId: "demo-seoul-spring",
      journeyId: "journey_demo_001",
      userId: "user_demo_001",
      author: {
        userId: "user_demo_001",
        name: "Minji Park",
        picture:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      },
      startedAt: Date.parse("2026-03-28T00:30:00.000Z"),
      endedAt: Date.parse("2026-03-28T11:10:00.000Z"),
      startedAtLocal: floatingLocal("2026-03-28T09:30", "Asia/Seoul"),
      endedAtLocal: floatingLocal("2026-03-28T20:10", "Asia/Seoul"),
      title: "A slow spring day between Seochon and the Han River",
      description:
        "Warm light, quiet alleys, and a late afternoon that moved gently toward the river.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&q=80",
      shareUrl: "https://momentbook.app/j/demo-seoul-spring",
      mode: "PHOTO_ONLY",
      photoCount: 18,
      images: [
        {
          photoId: "photo_demo_001",
          url: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 900,
          locationName: "Seochon",
        },
        {
          photoId: "photo_demo_002",
          url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 900,
          locationName: "Han River Park",
        },
      ],
      clusters: [],
      timeline: [
        {
          clusterId: "cluster_demo_001",
          type: "STOP",
          locationName: "Seochon",
          impression: "Started with coffee, stationery, and a very soft morning light.",
          time: {
            startAt: Date.parse("2026-03-28T00:30:00.000Z"),
            endAt: Date.parse("2026-03-28T03:10:00.000Z"),
            startLocal: floatingLocal("2026-03-28T09:30", "Asia/Seoul"),
            endLocal: floatingLocal("2026-03-28T12:10", "Asia/Seoul"),
          },
        },
        {
          clusterId: "cluster_demo_002",
          type: "MOVE",
          locationName: "Han River",
          impression: "The day became wider and quieter near the water.",
          time: {
            startAt: Date.parse("2026-03-28T07:20:00.000Z"),
            endAt: Date.parse("2026-03-28T11:10:00.000Z"),
            startLocal: floatingLocal("2026-03-28T16:20", "Asia/Seoul"),
            endLocal: floatingLocal("2026-03-28T20:10", "Asia/Seoul"),
          },
        },
      ],
      recapDraft: {
        timeline: [],
        photoCount: 18,
        imageCount: 18,
      },
      localizedContent: {
        sourceLanguage: "ko",
        generatedAt: "2026-03-28T11:20:00.000Z",
        entries: [
          {
            locale: "ko-KR",
            languageCode: "ko",
            countryCode: "KR",
            languageName: "Korean",
            title: "서촌에서 한강까지 천천히 흐르던 봄날",
            description: "햇빛과 골목, 그리고 늦은 오후의 강변이 조용하게 이어졌다.",
            hashtags: ["#seoul", "#spring", "#hanriver"],
          },
          {
            locale: "en-US",
            languageCode: "en",
            countryCode: "US",
            languageName: "English",
            title: "A slow spring day between Seochon and the Han River",
            description:
              "Warm light, quiet alleys, and a late afternoon that moved gently toward the river.",
            hashtags: ["#seoul", "#spring", "#riverwalk"],
          },
        ],
        clusterImpressions: [],
      },
      publishedAt: "2026-03-28T11:22:00.000Z",
      createdAt: "2026-03-28T11:22:00.000Z",
      review: {
        status: "PENDING",
        approved: false,
      },
      visibility: "public",
      contentStatus: "review_pending",
      notice:
        "Boilerplate workspace preview. Live moderation API is not connected yet.",
    },
    review: {
      status: "PENDING",
      approved: false,
      reviewedAt: null,
      reviewedByUserId: null,
      rejectionReason: null,
    },
  },
  {
    journey: {
      publicId: "demo-lisbon-evening",
      journeyId: "journey_demo_002",
      userId: "user_demo_002",
      author: {
        userId: "user_demo_002",
        name: "Joao Matos",
        picture:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      },
      startedAt: Date.parse("2026-03-29T15:00:00.000Z"),
      endedAt: Date.parse("2026-03-29T20:40:00.000Z"),
      startedAtLocal: floatingLocal("2026-03-29T15:00", "Europe/Lisbon"),
      endedAtLocal: floatingLocal("2026-03-29T20:40", "Europe/Lisbon"),
      title: "Stairs, tram lines, and a gold-blue evening in Lisbon",
      description:
        "A compact city walk with long shadows, tiled walls, and one final miradouro stop.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&w=1200&q=80",
      shareUrl: "https://momentbook.app/j/demo-lisbon-evening",
      mode: "PHOTO_ONLY",
      photoCount: 11,
      images: [
        {
          photoId: "photo_demo_101",
          url: "https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 900,
          locationName: "Alfama",
        },
      ],
      clusters: [],
      timeline: [
        {
          clusterId: "cluster_demo_101",
          type: "STOP",
          locationName: "Alfama",
          impression: "The route felt dense and textured, almost entirely vertical.",
          time: {
            startAt: Date.parse("2026-03-29T15:00:00.000Z"),
            endAt: Date.parse("2026-03-29T17:00:00.000Z"),
            startLocal: floatingLocal("2026-03-29T15:00", "Europe/Lisbon"),
            endLocal: floatingLocal("2026-03-29T17:00", "Europe/Lisbon"),
          },
        },
      ],
      recapDraft: {
        timeline: [],
        photoCount: 11,
        imageCount: 11,
      },
      localizedContent: {
        sourceLanguage: "en",
        generatedAt: "2026-03-29T21:00:00.000Z",
        entries: [
          {
            locale: "en-US",
            languageCode: "en",
            countryCode: "US",
            languageName: "English",
            title: "Stairs, tram lines, and a gold-blue evening in Lisbon",
            description:
              "A compact city walk with long shadows, tiled walls, and one final miradouro stop.",
            hashtags: ["#lisbon", "#alfama", "#tram"],
          },
        ],
        clusterImpressions: [],
      },
      publishedAt: "2026-03-29T21:00:00.000Z",
      createdAt: "2026-03-29T21:00:00.000Z",
      review: {
        status: "APPROVED",
        approved: true,
      },
      visibility: "public",
      contentStatus: "available",
    },
    review: {
      status: "APPROVED",
      approved: true,
      reviewedAt: "2026-03-30T08:10:00.000Z",
      reviewedByUserId: "user_admin_demo",
      rejectionReason: null,
    },
  },
  {
    journey: {
      publicId: "demo-osaka-night",
      journeyId: "journey_demo_003",
      userId: "user_demo_003",
      author: {
        userId: "user_demo_003",
        name: "Yui Sato",
      },
      startedAt: Date.parse("2026-03-30T09:40:00.000Z"),
      endedAt: Date.parse("2026-03-30T13:30:00.000Z"),
      startedAtLocal: floatingLocal("2026-03-30T18:40", "Asia/Tokyo"),
      endedAtLocal: floatingLocal("2026-03-30T22:30", "Asia/Tokyo"),
      title: "A bright, crowded night around Dotonbori",
      description:
        "Dense neon, narrow walkways, and too much repeated promotional text in the caption draft.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80",
      mode: "PHOTO_ONLY",
      photoCount: 9,
      images: [
        {
          photoId: "photo_demo_201",
          url: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 900,
          locationName: "Dotonbori",
        },
      ],
      clusters: [],
      timeline: [],
      recapDraft: {
        timeline: [],
        photoCount: 9,
        imageCount: 9,
      },
      localizedContent: {
        sourceLanguage: "ja",
        generatedAt: "2026-03-30T13:45:00.000Z",
        entries: [
          {
            locale: "ja-JP",
            languageCode: "ja",
            countryCode: "JP",
            languageName: "Japanese",
            title: "道頓堀で光が密集していた夜",
            description:
              "ネオンと混雑の印象が強い一方で、説明文はやや商業的に見える。",
            hashtags: ["#osaka", "#dotonbori", "#nightwalk"],
          },
        ],
        clusterImpressions: [],
      },
      publishedAt: "2026-03-30T13:46:00.000Z",
      createdAt: "2026-03-30T13:46:00.000Z",
      review: {
        status: "REJECTED",
        approved: false,
      },
      visibility: "public",
      contentStatus: "review_rejected",
      notice:
        "Boilerplate workspace preview. Rejected examples are static mock records.",
    },
    review: {
      status: "REJECTED",
      approved: false,
      reviewedAt: "2026-03-30T15:20:00.000Z",
      reviewedByUserId: "user_admin_demo",
      rejectionReason:
        "Example rejected state for the boilerplate. Live moderation write API is not connected yet.",
    },
  },
];

function matchesStatus(
  record: MockJourneyRecord,
  status: AdminReviewQueueStatus,
): boolean {
  if (status === "all") {
    return true;
  }

  if (status === "approved") {
    return record.review.status === "APPROVED";
  }

  if (status === "rejected") {
    return record.review.status === "REJECTED";
  }

  return record.review.status === "PENDING";
}

export function getAdminReviewQueueMock(options: {
  page: number;
  limit: number;
  status: AdminReviewQueueStatus;
}): AdminReviewQueueData {
  const normalizedPage = Math.max(1, options.page);
  const normalizedLimit = Math.max(1, options.limit);
  const allItems = MOCK_JOURNEYS.map(({ journey, review }) => ({
    publicId: journey.publicId,
    journeyId: journey.journeyId,
    userId: journey.userId,
    title: journey.title,
    description: journey.description,
    thumbnailUrl: journey.thumbnailUrl ?? null,
    photoCount: journey.photoCount,
    createdAt: journey.createdAt,
    publishedAt: journey.publishedAt ?? null,
    visibility: journey.visibility,
    review,
    author: journey.author,
  }));
  const filteredItems = allItems.filter((item) =>
    matchesStatus(
      MOCK_JOURNEYS.find((record) => record.journey.publicId === item.publicId)!,
      options.status,
    ),
  );
  const total = filteredItems.length;
  const pages = Math.max(1, Math.ceil(total / normalizedLimit));
  const startIndex = (normalizedPage - 1) * normalizedLimit;

  return {
    summary: {
      pendingCount: allItems.filter((item) => item.review.status === "PENDING")
        .length,
      approvedTodayCount: allItems.filter(
        (item) => item.review.status === "APPROVED",
      ).length,
      rejectedTodayCount: allItems.filter(
        (item) => item.review.status === "REJECTED",
      ).length,
    },
    items: filteredItems.slice(startIndex, startIndex + normalizedLimit),
    total,
    page: Math.min(normalizedPage, pages),
    pages,
    limit: normalizedLimit,
    status: options.status,
  };
}

export function getAdminReviewDetailMock(
  publicId: string,
): AdminReviewDetail | null {
  return (
    MOCK_JOURNEYS.find((record) => record.journey.publicId === publicId) ?? null
  );
}
