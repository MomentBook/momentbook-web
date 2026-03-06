export type MarketingChannelId = "youtube" | "instagram" | "tiktok";

export type MarketingChannel = {
  id: MarketingChannelId;
  label: string;
  href: string;
};

export const MARKETING_CHANNELS: MarketingChannel[] = [
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@momentbook",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/momentbook.official/",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@momentbook8",
  },
];

export const MARKETING_CHANNEL_URLS = MARKETING_CHANNELS.map(
  (channel) => channel.href,
);
