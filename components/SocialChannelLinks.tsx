import { MARKETING_CHANNELS, type MarketingChannelId } from "@/lib/marketing/social-channels";
import styles from "./SocialChannelLinks.module.scss";

type SocialChannelLinksProps = {
  ariaLabel: string;
  linkLabels: Record<MarketingChannelId, string>;
};

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
      <rect
        x="3.5"
        y="6.25"
        width="17"
        height="11.5"
        rx="4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M10 9.4v5.2l4.8-2.6z" fill="currentColor" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
      <rect
        x="4.25"
        y="4.25"
        width="15.5"
        height="15.5"
        rx="4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle
        cx="12"
        cy="12"
        r="3.55"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="16.65" cy="7.35" r="1.1" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
      <path
        d="M13.7 4.2c.68 1.48 1.92 2.54 3.72 3.06v2.5a7.68 7.68 0 0 1-3.3-1.08v5.24a4.95 4.95 0 1 1-4.95-4.95c.38 0 .75.04 1.1.12v2.52a2.53 2.53 0 1 0 1.17 2.13V4.2z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChannelIcon({ id }: { id: MarketingChannelId }) {
  if (id === "youtube") {
    return <YouTubeIcon />;
  }

  if (id === "instagram") {
    return <InstagramIcon />;
  }

  return <TikTokIcon />;
}

export function SocialChannelLinks({
  ariaLabel,
  linkLabels,
}: SocialChannelLinksProps) {
  return (
    <div className={styles.links} aria-label={ariaLabel}>
      {MARKETING_CHANNELS.map((channel) => (
        <a
          key={channel.id}
          href={channel.href}
          target="_blank"
          rel="noopener noreferrer me"
          className={styles.link}
          data-channel={channel.id}
          aria-label={linkLabels[channel.id]}
          title={linkLabels[channel.id]}
        >
          <ChannelIcon id={channel.id} />
        </a>
      ))}
    </div>
  );
}
