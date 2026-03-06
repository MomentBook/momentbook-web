import { permanentRedirect } from "next/navigation";
import { type Language } from "@/lib/i18n/config";
import { HOME_SECTION_IDS, buildHomeSectionHref } from "@/lib/marketing/home-sections";

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  permanentRedirect(buildHomeSectionHref(lang, HOME_SECTION_IDS.overview));
}
