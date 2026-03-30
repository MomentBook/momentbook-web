import Link from "next/link";
import type { Language } from "@/lib/i18n/config";
import { getHashtagSearchValue } from "@/lib/hashtags";

type HashtagChipListProps = {
  lang: Language;
  hashtags: string[];
  title: string;
  rootClassName: string;
  titleClassName: string;
  listClassName: string;
  chipClassName: string;
};

export function HashtagChipList({
  lang,
  hashtags,
  title,
  rootClassName,
  titleClassName,
  listClassName,
  chipClassName,
}: HashtagChipListProps) {
  if (hashtags.length === 0) {
    return null;
  }

  return (
    <section className={rootClassName} aria-label={title}>
      <p className={titleClassName}>{title}</p>
      <div className={listClassName}>
        {hashtags.map((hashtag) => (
          <Link
            key={hashtag}
            href={{
              pathname: `/${lang}/users`,
              query: { q: getHashtagSearchValue(hashtag) },
            }}
            className={chipClassName}
          >
            {hashtag}
          </Link>
        ))}
      </div>
    </section>
  );
}
