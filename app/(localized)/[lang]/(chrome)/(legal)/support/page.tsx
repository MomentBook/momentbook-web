import type { Metadata } from "next";
import styles from "./support.module.scss";
import { type Language } from "@/lib/i18n/config";
import {
  buildNoIndexRobots,
  buildStandardPageMetadata,
} from "@/lib/seo/public-metadata";
import { supportEmail } from "../../chrome.helpers";
import { SupportContentView } from "./SupportContentView";
import { getSupportContent } from "./support.copy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const content = getSupportContent(lang);
  const path = "/support";

  return buildStandardPageMetadata({
    lang,
    path,
    title: content.metaTitle,
    description: content.metaDescription,
    robots: buildNoIndexRobots(),
    absoluteTitle: true,
  });
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content = getSupportContent(lang);

  return (
    <div className={styles.container}>
      <SupportContentView
        lang={lang}
        content={content}
        supportEmail={supportEmail}
      />
    </div>
  );
}
