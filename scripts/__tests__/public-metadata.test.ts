import { describe, expect, it } from "vitest";
import type { Language } from "@/lib/i18n/config";
import {
  buildPublicKeywords,
  buildStructuredDataTopicTerms,
} from "@/lib/seo/public-metadata";

type KeywordFixture = {
  lang: Language;
  title: string;
  locationName: string;
  hashtag: string;
};

const supportedLanguageFixtures: KeywordFixture[] = [
  {
    lang: "en",
    title: "A good day with makgeolli in Seoul",
    locationName: "Seoul",
    hashtag: "#makgeolli",
  },
  {
    lang: "ko",
    title: "막걸리를 먹은 좋은 하루",
    locationName: "서울",
    hashtag: "#막걸리",
  },
  {
    lang: "ja",
    title: "東京でラーメンを食べた夜",
    locationName: "東京",
    hashtag: "#ラーメン",
  },
  {
    lang: "zh",
    title: "在首尔喝马格利酒的一天",
    locationName: "首尔",
    hashtag: "#马格利酒",
  },
  {
    lang: "es",
    title: "Un buen dia con makgeolli en Seúl",
    locationName: "Seúl",
    hashtag: "#makgeolli",
  },
  {
    lang: "pt",
    title: "Um bom dia com makgeolli em Seul",
    locationName: "Seul",
    hashtag: "#makgeolli",
  },
  {
    lang: "fr",
    title: "Une bonne journée avec makgeolli à Séoul",
    locationName: "Séoul",
    hashtag: "#makgeolli",
  },
  {
    lang: "th",
    title: "วันดีๆ กับมักกอลลีที่โซล",
    locationName: "โซล",
    hashtag: "#มักกอลลี",
  },
  {
    lang: "vi",
    title: "Một ngày vui với makgeolli ở Seoul",
    locationName: "Seoul",
    hashtag: "#makgeolli",
  },
];

describe("buildStructuredDataTopicTerms", () => {
  it.each(supportedLanguageFixtures)(
    "preserves visible topic terms in keywords for $lang",
    ({ lang, title, locationName, hashtag }) => {
      const result = buildStructuredDataTopicTerms({
        lang,
        title,
        locationNames: [locationName],
        hashtags: [hashtag],
      });

      expect(result.keywords).toEqual(
        expect.arrayContaining([title, locationName, hashtag.slice(1)]),
      );
      expect(result.keywords.length).toBeLessThanOrEqual(18);
    },
  );

  it("extracts Korean noun stems from particles for topic matching", () => {
    const result = buildStructuredDataTopicTerms({
      lang: "ko",
      title: "서울에서 라멘을 먹은 하루",
      extra: ["막걸리집에서 보낸 밤"],
    });

    expect(result.about).toEqual(
      expect.arrayContaining(["서울", "라멘", "막걸리집"]),
    );
    expect(result.about).not.toContain("서울에서");
    expect(result.about).not.toContain("라멘을");
    expect(result.about).not.toContain("막걸리집에서");
  });

  it("filters common stopwords from latin-script titles", () => {
    const result = buildStructuredDataTopicTerms({
      lang: "en",
      title: "A good day with makgeolli in Seoul",
    });

    expect(result.about).toEqual(
      expect.arrayContaining(["good", "day", "makgeolli", "Seoul"]),
    );
    expect(result.about).not.toContain("A");
    expect(result.about).not.toContain("with");
    expect(result.about).not.toContain("in");
  });
});

describe("buildPublicKeywords", () => {
  it("adds extracted Korean stems without duplicating the visible title", () => {
    const keywords = buildPublicKeywords({
      lang: "ko",
      kind: "journey",
      title: "막걸리를 먹은 좋은 하루",
      locationNames: ["서울"],
      hashtags: ["#막걸리집"],
    });

    expect(keywords).toContain("막걸리를 먹은 좋은 하루");
    expect(keywords).toContain("막걸리");
    expect(keywords).toContain("막걸리집");
    expect(keywords.filter((value) => value === "막걸리를 먹은 좋은 하루")).toHaveLength(1);
    expect(keywords).not.toContain("막걸리를 먹은 좋은 하루 MomentBook");
  });
});
