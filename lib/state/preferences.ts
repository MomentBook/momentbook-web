import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { type Language, isValidLanguage } from "@/lib/i18n/config";

export type Theme = "light" | "dark";

const storage = createJSONStorage(() =>
  typeof window === "undefined" ? undefined : localStorage
);

export const themeAtom = atomWithStorage<Theme>("theme", "light", storage);
export const languageAtom = atomWithStorage<Language | "">("language", "", storage);

export function normalizeLanguage(value: string | null): Language | "" {
  if (!value) {
    return "";
  }

  return isValidLanguage(value) ? value : "";
}
