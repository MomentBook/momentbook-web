import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { type Language, isValidLanguage } from "@/lib/i18n/config";

export type Theme = "light" | "dark";

const themeStorage = createJSONStorage<Theme>();
const languageStorage = createJSONStorage<Language | "">();

export const themeAtom = atomWithStorage<Theme>("theme", "light", themeStorage);
export const languageAtom = atomWithStorage<Language | "">(
  "language",
  "",
  languageStorage
);

export function normalizeLanguage(value: string | null): Language | "" {
  if (!value) {
    return "";
  }

  return isValidLanguage(value) ? value : "";
}
