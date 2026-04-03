import { describe, expect, it } from "vitest";
import {
  detectLanguageFromAcceptLanguage,
  parseAcceptLanguageHeader,
  resolveSupportedLanguage,
} from "@/lib/i18n/config";
import {
  resolveClientPreferredLanguageFromSources,
  resolveLanguageSyncTarget,
  resolvePersistedLanguagePreferenceFromSources,
} from "@/lib/i18n/preference";

describe("language tag normalization", () => {
  it("maps locale tags to supported base languages", () => {
    expect(resolveSupportedLanguage("pt-BR")).toBe("pt");
    expect(resolveSupportedLanguage("ko-KR")).toBe("ko");
    expect(resolveSupportedLanguage("en_US")).toBe("en");
  });

  it("rejects unsupported or malformed values", () => {
    expect(resolveSupportedLanguage("de-DE")).toBeNull();
    expect(resolveSupportedLanguage("not-a-language")).toBeNull();
    expect(resolveSupportedLanguage("*")).toBeNull();
  });
});

describe("accept-language parsing", () => {
  it("sorts candidates by q-value before matching", () => {
    expect(parseAcceptLanguageHeader("fr;q=0.9,en;q=1.0")).toEqual([
      "en",
      "fr",
    ]);
    expect(
      detectLanguageFromAcceptLanguage("fr;q=0.9,en;q=1.0"),
    ).toBe("en");
  });

  it("supports locale fallback and ignores q=0 candidates", () => {
    expect(
      detectLanguageFromAcceptLanguage("de-DE;q=0,pt-BR;q=0.7,fr;q=0.6"),
    ).toBe("pt");
  });
});

describe("client preference resolution", () => {
  it("prefers explicit language over stored values", () => {
    expect(
      resolveClientPreferredLanguageFromSources({
        explicitLanguage: "ja",
        currentPreference: "ko",
        storedLanguage: '"pt"',
        cookieLanguage: "fr",
        browserLanguages: ["en-US"],
      }),
    ).toBe("ja");
  });

  it("falls back through current, storage, cookie, and browser in order", () => {
    expect(
      resolvePersistedLanguagePreferenceFromSources({
        currentPreference: "",
        storedLanguage: '"pt-BR"',
        legacyStoredLanguage: '"fr"',
        cookieLanguage: "ko-KR",
      }),
    ).toBe("pt");

    expect(
      resolveClientPreferredLanguageFromSources({
        currentPreference: "",
        storedLanguage: null,
        legacyStoredLanguage: null,
        cookieLanguage: null,
        browserLanguages: ["vi-VN", "en-US"],
      }),
    ).toBe("vi");
  });
});

describe("path visit persistence policy", () => {
  it("treats the current localized path as the sync target", () => {
    expect(
      resolveLanguageSyncTarget({
        pathname: "/ja/journeys/abc",
        currentPreference: "ko",
        storedLanguage: '"pt"',
        cookieLanguage: "fr",
        browserLanguages: ["en-US"],
      }),
    ).toBe("ja");
  });

  it("falls back to persisted preference only when the path is not localized", () => {
    expect(
      resolveLanguageSyncTarget({
        pathname: "/",
        currentPreference: "",
        storedLanguage: '"pt"',
        cookieLanguage: "fr",
        browserLanguages: ["en-US"],
      }),
    ).toBe("pt");
  });
});
