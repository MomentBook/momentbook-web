import { languageList, type Language } from "@/lib/i18n/config";

function normalizePath(path: string) {
  if (!path || path === "/") {
    return "";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function buildAlternates(lang: Language, path: string) {
  const normalizedPath = normalizePath(path);
  const languages = Object.fromEntries(
    languageList.map((code) => [code, `/${code}${normalizedPath}`])
  );

  return {
    canonical: `/${lang}${normalizedPath}`,
    languages,
  };
}

export function buildOpenGraphUrl(lang: Language, path: string) {
  const normalizedPath = normalizePath(path);

  return `/${lang}${normalizedPath}`;
}
