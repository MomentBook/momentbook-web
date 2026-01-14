export type JourneyInputSummary = {
  totalPhotos: number;
  totalLocations: number;
  totalStayPoints: number;
  timeSpanMs: number;
};

export type JourneyImage = {
  url: string;
  width: number;
  height: number;
  caption?: string;
};

export type PublicJourney = {
  journeyId: string;
  userId: string;
  title: string;
  description: string;
  startedAt: number;
  endedAt: number;
  recapStage: "USER_DONE" | "DRAFT";
  recapDraft: {
    inputSummary: JourneyInputSummary;
  };
  highlights: string[];
  locations: string[];
  photoIds: string[];
  images: JourneyImage[];
};

export type PublicPhoto = {
  photoId: string;
  journeyId: string;
  userId: string;
  url: string;
  width: number;
  height: number;
  caption: string;
  takenAt: number;
  locationName: string;
};

export type PublicUser = {
  userId: string;
  displayName: string;
  handle: string;
  bio: string;
  avatarUrl: string;
  journeyIds: string[];
};

export const publicUsers: PublicUser[] = [
  {
    userId: "user_hansol",
    displayName: "Hansol",
    handle: "@hansol",
    bio: "Tracking everyday routes and quiet moments.",
    avatarUrl: "https://cdn.momentbook.app/users/hansol/avatar.jpg",
    journeyIds: ["journey_abc123", "journey_park090"],
  },
  {
    userId: "user_mira",
    displayName: "Mira",
    handle: "@mira",
    bio: "Capturing slow walks and weekend getaways.",
    avatarUrl: "https://cdn.momentbook.app/users/mira/avatar.jpg",
    journeyIds: ["journey_city402"],
  },
];

export const publicPhotos: PublicPhoto[] = [
  {
    photoId: "photo_001",
    journeyId: "journey_abc123",
    userId: "user_hansol",
    url: "https://cdn.momentbook.app/journeys/user_hansol/abc123/01.jpg",
    width: 1080,
    height: 1440,
    caption: "Morning market stop.",
    takenAt: 1704069000000,
    locationName: "Seoul, Namdaemun Market",
  },
  {
    photoId: "photo_002",
    journeyId: "journey_abc123",
    userId: "user_hansol",
    url: "https://cdn.momentbook.app/journeys/user_hansol/abc123/02.jpg",
    width: 1440,
    height: 1080,
    caption: "Walk by the river.",
    takenAt: 1704076200000,
    locationName: "Seoul, Han River",
  },
  {
    photoId: "photo_003",
    journeyId: "journey_city402",
    userId: "user_mira",
    url: "https://cdn.momentbook.app/journeys/user_mira/city402/01.jpg",
    width: 1080,
    height: 1350,
    caption: "Evening streets in the old town.",
    takenAt: 1704594600000,
    locationName: "Osaka, Shinsekai",
  },
];

export const publicJourneys: PublicJourney[] = [
  {
    journeyId: "journey_abc123",
    userId: "user_hansol",
    title: "A full day in Seoul",
    description: "Markets, river walks, and a slow evening meal.",
    startedAt: 1704067200000,
    endedAt: 1704103200000,
    recapStage: "USER_DONE",
    recapDraft: {
      inputSummary: {
        totalPhotos: 18,
        totalLocations: 9,
        totalStayPoints: 6,
        timeSpanMs: 36000000,
      },
    },
    highlights: ["Namdaemun Market", "Han River", "Euljiro dinner"],
    locations: ["Namdaemun Market", "Namsan", "Han River", "Euljiro"],
    photoIds: ["photo_001", "photo_002"],
    images: [
      {
        url: "https://cdn.momentbook.app/journeys/user_hansol/abc123/cover.jpg",
        width: 1200,
        height: 1600,
        caption: "Morning light in the city.",
      },
    ],
  },
  {
    journeyId: "journey_park090",
    userId: "user_hansol",
    title: "Weekend park loop",
    description: "Short walk, coffee, and a quiet sketching stop.",
    startedAt: 1704330000000,
    endedAt: 1704349800000,
    recapStage: "USER_DONE",
    recapDraft: {
      inputSummary: {
        totalPhotos: 6,
        totalLocations: 4,
        totalStayPoints: 2,
        timeSpanMs: 19800000,
      },
    },
    highlights: ["Coffee stop", "Sketch bench"],
    locations: ["Neighborhood park", "Cafe Sora"],
    photoIds: [],
    images: [],
  },
  {
    journeyId: "journey_city402",
    userId: "user_mira",
    title: "Osaka night walk",
    description: "Neon streets and a late ramen stop.",
    startedAt: 1704589200000,
    endedAt: 1704607200000,
    recapStage: "USER_DONE",
    recapDraft: {
      inputSummary: {
        totalPhotos: 12,
        totalLocations: 5,
        totalStayPoints: 3,
        timeSpanMs: 18000000,
      },
    },
    highlights: ["Shinsekai", "Late-night ramen"],
    locations: ["Shinsekai", "Dotonbori"],
    photoIds: ["photo_003"],
    images: [
      {
        url: "https://cdn.momentbook.app/journeys/user_mira/city402/cover.jpg",
        width: 1200,
        height: 1500,
        caption: "City lights after dark.",
      },
    ],
  },
];

export function getPublicJourney(journeyId: string) {
  return publicJourneys.find((journey) => journey.journeyId === journeyId);
}

export function getPublicPhoto(photoId: string) {
  return publicPhotos.find((photo) => photo.photoId === photoId);
}

export function getPublicUser(userId: string) {
  return publicUsers.find((user) => user.userId === userId);
}

export function getUserJourneys(userId: string) {
  return publicJourneys.filter((journey) => journey.userId === userId);
}

export function getJourneyPhotos(journeyId: string) {
  return publicPhotos.filter((photo) => photo.journeyId === journeyId);
}
