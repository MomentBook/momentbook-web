import {
  defaultLanguage,
  languageList,
  toHreflang,
  type Language,
} from "@/lib/i18n/config";

function normalizePath(path: string) {
  if (!path || path === "/") {
    return "";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function buildAlternates(lang: Language, path: string) {
  const normalizedPath = normalizePath(path);
  const languages = Object.fromEntries([
    ...languageList.map((code) => [
      toHreflang(code),
      `/${code}${normalizedPath}`,
    ]),
    ["x-default", `/${defaultLanguage}${normalizedPath}`],
  ]) as Record<string, string>;

  return {
    canonical: `/${lang}${normalizedPath}`,
    languages,
  };
}

export function buildOpenGraphUrl(lang: Language, path: string) {
  const normalizedPath = normalizePath(path);

  return `/${lang}${normalizedPath}`;
}
