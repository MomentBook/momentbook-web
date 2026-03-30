import { isValidLanguage } from "./config";

export function isLocalizedHomePath(pathname: string | null | undefined) {
  if (!pathname) {
    return false;
  }

  const segments = pathname.split("/").filter(Boolean);

  return segments.length === 1 && isValidLanguage(segments[0] ?? "");
}
