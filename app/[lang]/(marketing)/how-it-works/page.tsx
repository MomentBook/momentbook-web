import { permanentRedirect } from "next/navigation";
import { type Language } from "@/lib/i18n/config";

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  permanentRedirect(`/${lang}/about`);
}
