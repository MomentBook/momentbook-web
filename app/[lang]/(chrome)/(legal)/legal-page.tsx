import type { ReactNode } from "react";
import { type Language } from "@/lib/i18n/config";
import {
  buildNoIndexRobots,
  buildStandardPageMetadata,
} from "@/lib/seo/public-metadata";

export type LegalPageMetadataCopy = {
  title: string;
  description: string;
};

type LegalContentRenderer = () => ReactNode;

type LegalShellClassNames = {
  container: string;
  content: string;
};

export function buildLegalPageMetadata(
  lang: Language,
  path: string,
  metadataByLanguage: Record<Language, LegalPageMetadataCopy>,
) {
  const content = metadataByLanguage[lang] ?? metadataByLanguage.en;

  return buildStandardPageMetadata({
    lang,
    path,
    title: content.title,
    description: content.description,
    robots: buildNoIndexRobots(),
    absoluteTitle: true,
  });
}

export function renderLegalContent(
  lang: Language,
  renderers: Record<Language, LegalContentRenderer>,
) {
  const render = renderers[lang] ?? renderers.en;
  return render();
}

export function LegalDocumentShell({
  classNames,
  content,
}: {
  classNames: LegalShellClassNames;
  content: ReactNode;
}) {
  return (
    <div className={classNames.container}>
      <article className={classNames.content}>{content}</article>
    </div>
  );
}
