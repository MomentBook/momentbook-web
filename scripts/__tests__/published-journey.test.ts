import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");

  return {
    ...actual,
    cache: <T extends (...args: unknown[]) => unknown>(fn: T) => fn,
  };
});

const originalApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const emptyPublishedJourneysResponse = {
  status: "success",
  data: {
    journeys: [],
    total: 0,
    page: 1,
    pages: 1,
    limit: 20,
    hasMore: false,
    nextCursor: null,
  },
};

function mockSuccessfulFeedFetch() {
  const fetchMock = vi.fn().mockResolvedValue(
    new Response(JSON.stringify(emptyPublishedJourneysResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }),
  );

  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

async function loadFetchPublishedJourneys() {
  const publishedJourneyModule = await import("@/lib/published-journey");
  return publishedJourneyModule.fetchPublishedJourneys;
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.resetModules();

  if (typeof originalApiBaseUrl === "string") {
    process.env.NEXT_PUBLIC_API_BASE_URL = originalApiBaseUrl;
  } else {
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  if (typeof originalSiteUrl === "string") {
    process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
  } else {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  }
});

describe("fetchPublishedJourneys", () => {
  it("always sends reviewStatus=APPROVED for the cached discovery feed path", async () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "https://api.example.com";
    process.env.NEXT_PUBLIC_SITE_URL = "https://momentbook.app";

    const fetchMock = mockSuccessfulFeedFetch();
    const fetchPublishedJourneys = await loadFetchPublishedJourneys();

    await fetchPublishedJourneys({
      page: 1,
      limit: 3,
      sort: "recent",
      lang: "en",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [input] = fetchMock.mock.calls[0];
    const requestUrl = new URL(String(input));

    expect(requestUrl.origin).toBe("https://api.example.com");
    expect(requestUrl.pathname).toBe("/v2/journeys/public");
    expect(requestUrl.searchParams.get("reviewStatus")).toBe("APPROVED");
    expect(requestUrl.searchParams.get("page")).toBe("1");
    expect(requestUrl.searchParams.get("limit")).toBe("3");
    expect(requestUrl.searchParams.get("sort")).toBe("recent");
    expect(requestUrl.searchParams.get("lang")).toBe("en-US");
  });

  it("always sends reviewStatus=APPROVED for the direct excludeMine path", async () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "https://api.example.com";
    process.env.NEXT_PUBLIC_SITE_URL = "https://momentbook.app";

    const fetchMock = mockSuccessfulFeedFetch();
    const fetchPublishedJourneys = await loadFetchPublishedJourneys();

    await fetchPublishedJourneys({
      cursor: "cursor-token",
      limit: 5,
      sort: "recent",
      lang: "ko",
      excludeMine: true,
      accessToken: "test-token",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [input, init] = fetchMock.mock.calls[0];
    const requestUrl = new URL(String(input));
    const headers = new Headers(init?.headers);

    expect(requestUrl.origin).toBe("https://api.example.com");
    expect(requestUrl.pathname).toBe("/v2/journeys/public");
    expect(requestUrl.searchParams.get("reviewStatus")).toBe("APPROVED");
    expect(requestUrl.searchParams.get("cursor")).toBe("cursor-token");
    expect(requestUrl.searchParams.get("excludeMine")).toBe("true");
    expect(requestUrl.searchParams.get("lang")).toBe("ko-KR");
    expect(headers.get("Authorization")).toBe("Bearer test-token");
  });
});
