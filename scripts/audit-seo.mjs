#!/usr/bin/env node

import fs from "node:fs";
import process from "node:process";
import { spawnSync } from "node:child_process";
import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const DEFAULT_FETCH_BASE_URL = normalizeBaseUrl(
  process.env.SEO_AUDIT_BASE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3100",
);

const DEFAULT_SITE_URL = normalizeBaseUrl(
  process.env.SEO_AUDIT_SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    DEFAULT_FETCH_BASE_URL,
);

const DEFAULT_TIMEOUT_MS = Number.parseInt(
  process.env.SEO_AUDIT_TIMEOUT_MS ?? "15000",
  10,
);
const DEFAULT_SITEMAP_SAMPLE_SIZE = Number.parseInt(
  process.env.SEO_AUDIT_SITEMAP_SAMPLE_SIZE ?? "1",
  10,
);
const DEFAULT_ROUTE_RETRY_COUNT = Number.parseInt(
  process.env.SEO_AUDIT_ROUTE_RETRY_COUNT ?? "1",
  10,
);

const ROBOTS_POLICIES = {
  public: {
    expected: ["index", "follow"],
    blocked: ["noindex", "nofollow"],
  },
  noindexFollow: {
    expected: ["noindex", "follow"],
    blocked: ["index", "nofollow"],
  },
  noindex: {
    expected: ["noindex", "nofollow"],
    blocked: ["index", "follow"],
  },
};

const DEFAULT_ROUTE_SPECS = [
  {
    input: "/en",
    robotsPolicy: "public",
    expectedJsonLdTypes: ["WebSite", "SoftwareApplication"],
  },
  {
    input: "/en/faq",
    robotsPolicy: "public",
    expectedJsonLdTypes: ["FAQPage"],
  },
  {
    input: "/en/journeys",
    robotsPolicy: "public",
    expectedJsonLdTypes: ["CollectionPage"],
  },
  {
    input: "/en/users",
    robotsPolicy: "public",
    expectedJsonLdTypes: ["CollectionPage"],
  },
  {
    input: "/en/users?q=seoul",
    canonicalPath: "/en/users",
    robotsPolicy: "noindexFollow",
  },
  {
    input: "/en/install",
    robotsPolicy: "noindex",
  },
  {
    input: "/en/privacy",
    robotsPolicy: "noindex",
  },
  {
    input: "/en/terms",
    robotsPolicy: "noindex",
  },
  {
    input: "/en/community-guidelines",
    robotsPolicy: "noindex",
  },
  {
    input: "/en/marketing-consent",
    robotsPolicy: "noindex",
  },
  {
    input: "/en/support",
    robotsPolicy: "noindex",
  },
];

async function main() {
  const args = process.argv.slice(2);
  const shouldDiscoverSitemapSamples = !args.includes("--no-sitemap-samples");
  const routeInputs = args.filter((arg) => arg !== "--no-sitemap-samples");

  if (routeInputs.includes("--help") || routeInputs.includes("-h")) {
    printHelp();
    return;
  }

  const languageConfig = loadLanguageConfig();
  const discovery = routeInputs.length === 0 && shouldDiscoverSitemapSamples
    ? await discoverSitemapDetailRouteSpecs(
        languageConfig,
        DEFAULT_FETCH_BASE_URL,
      )
    : { routeSpecs: [], warnings: [] };

  const routeSpecs = routeInputs.length
    ? routeInputs.map((input) =>
        deriveRouteSpec(input, languageConfig, DEFAULT_FETCH_BASE_URL),
      )
    : dedupeRouteSpecs([
        ...DEFAULT_ROUTE_SPECS.map((spec) =>
          completeRouteSpec(
            spec,
            languageConfig,
            DEFAULT_FETCH_BASE_URL,
            DEFAULT_SITE_URL,
          ),
        ),
        ...discovery.routeSpecs,
      ]);

  const results = [];

  for (const routeSpec of routeSpecs) {
    results.push(await auditRoute(routeSpec, DEFAULT_SITE_URL));
  }

  const failedResults = results.filter((result) => !result.ok);

  for (const result of results) {
    const symbol = result.ok ? "PASS" : "FAIL";
    console.log(`${symbol} ${result.route}`);

    for (const line of result.summary) {
      console.log(`  ${line}`);
    }

    if (result.failures.length > 0) {
      for (const failure of result.failures) {
        console.log(`  - ${failure}`);
      }
    }
  }

  for (const warning of discovery.warnings) {
    console.log(`INFO ${warning}`);
  }

  if (discovery.routeSpecs.length > 0) {
    console.log(
      `INFO Added ${discovery.routeSpecs.length} sitemap-discovered detail sample route(s)`,
    );
  }

  console.log(
    `\n${results.length - failedResults.length}/${results.length} routes passed`,
  );

  if (failedResults.length > 0) {
    process.exitCode = 1;
  }
}

function printHelp() {
  console.log(`Usage: yarn seo:audit [route-or-url ...]

Without arguments, audits the default public route sample set.
Without --no-sitemap-samples, the script also samples detail routes from sitemap XML.

Environment variables:
  SEO_AUDIT_BASE_URL  Base URL used to fetch pages (default: ${DEFAULT_FETCH_BASE_URL})
  SEO_AUDIT_SITE_URL  Expected canonical/hreflang origin (default: ${DEFAULT_SITE_URL})
  SEO_AUDIT_TIMEOUT_MS  Fetch timeout in milliseconds (default: ${DEFAULT_TIMEOUT_MS})
  SEO_AUDIT_SITEMAP_SAMPLE_SIZE  Number of sample URLs per detail sitemap (default: ${DEFAULT_SITEMAP_SAMPLE_SIZE})
  SEO_AUDIT_ROUTE_RETRY_COUNT  Retry count per route for transient dev responses (default: ${DEFAULT_ROUTE_RETRY_COUNT})
`);
}

function normalizeBaseUrl(value) {
  return value.replace(/\/+$/, "");
}

function loadLanguageConfig() {
  const source = fs.readFileSync(
    new URL("../lib/i18n/config.ts", import.meta.url),
    "utf8",
  );

  const languages = [];
  const languageRegex =
    /^\s{2}([a-z]{2}):\s*\{[\s\S]*?^\s{4}locale:\s*"([^"]+)"/gm;

  for (const match of source.matchAll(languageRegex)) {
    languages.push({
      code: match[1],
      hreflang: match[2],
    });
  }

  const defaultLanguageMatch = source.match(
    /export const defaultLanguage: Language = "([a-z]{2})"/,
  );

  if (!defaultLanguageMatch || languages.length === 0) {
    throw new Error("Failed to load language config from lib/i18n/config.ts");
  }

  return {
    defaultLanguage: defaultLanguageMatch[1],
    languages,
    languageCodes: new Set(languages.map((language) => language.code)),
  };
}

function deriveRouteSpec(input, languageConfig, fetchBaseUrl) {
  const routeUrl = new URL(input, fetchBaseUrl);
  const path = `${routeUrl.pathname}${routeUrl.search}`;

  return completeRouteSpec(
    {
      input: path,
      canonicalPath: deriveCanonicalPath(routeUrl),
      robotsPolicy: deriveRobotsPolicy(routeUrl),
      expectedJsonLdTypes: isUserSearchRoute(routeUrl)
        ? []
        : deriveJsonLdTypes(routeUrl.pathname),
    },
    languageConfig,
    fetchBaseUrl,
    DEFAULT_SITE_URL,
  );
}

function completeRouteSpec(spec, languageConfig, fetchBaseUrl, siteUrl) {
  const routeUrl = new URL(spec.input, fetchBaseUrl);
  const canonicalPath = spec.canonicalPath ?? deriveCanonicalPath(routeUrl);

  return {
    ...spec,
    fetchUrl: routeUrl.toString(),
    route: `${routeUrl.pathname}${routeUrl.search}`,
    canonicalPath,
    expectedJsonLdTypes: spec.expectedJsonLdTypes ?? [],
    expectedCanonicalUrl: new URL(canonicalPath, siteUrl).toString(),
    expectedAlternates: buildExpectedAlternates(canonicalPath, languageConfig, siteUrl),
  };
}

async function discoverSitemapDetailRouteSpecs(
  languageConfig,
  fetchBaseUrl,
) {
  const warnings = [];
  const routeSpecs = [];
  const indexUrl = new URL("/sitemap.xml", fetchBaseUrl).toString();
  const sitemapTargets = new Map([
    ["/sitemap-journeys.xml", "journey detail"],
    ["/sitemap-journey-moments.xml", "moment detail"],
    ["/sitemap-photos.xml", "photo detail"],
    ["/sitemap-users.xml", "user detail"],
  ]);

  let indexResponse;
  try {
    indexResponse = fetchWithCurl(indexUrl, DEFAULT_TIMEOUT_MS);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    warnings.push(`Sitemap discovery skipped because ${indexUrl} could not be fetched: ${message}`);
    return { routeSpecs, warnings };
  }

  if (!indexResponse.ok) {
    warnings.push(
      `Sitemap discovery skipped because ${indexUrl} returned HTTP ${indexResponse.status}`,
    );
    return { routeSpecs, warnings };
  }

  const sitemapLocs = extractXmlLocValues(indexResponse.body);

  for (const [sitemapPath, label] of sitemapTargets) {
    const sitemapUrl = sitemapLocs.find((loc) => {
      try {
        return new URL(loc).pathname === sitemapPath;
      } catch {
        return false;
      }
    });

    if (!sitemapUrl) {
      warnings.push(`No ${label} sitemap found in sitemap index`);
      continue;
    }

    let sitemapResponse;
    try {
      sitemapResponse = fetchWithCurl(sitemapUrl, DEFAULT_TIMEOUT_MS);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      warnings.push(`Could not fetch ${label} sitemap ${sitemapUrl}: ${message}`);
      continue;
    }

    if (!sitemapResponse.ok) {
      warnings.push(
        `${label} sitemap ${sitemapUrl} returned HTTP ${sitemapResponse.status}`,
      );
      continue;
    }

    const sampleSpecs = collectRouteSpecsFromSitemapXml(
      sitemapResponse.body,
      languageConfig,
      fetchBaseUrl,
    );

    if (sampleSpecs.length === 0) {
      warnings.push(`No ${label} sample URLs found in ${sitemapPath}`);
      continue;
    }

    routeSpecs.push(...sampleSpecs.slice(0, DEFAULT_SITEMAP_SAMPLE_SIZE));
  }

  return {
    routeSpecs: dedupeRouteSpecs(routeSpecs),
    warnings,
  };
}

function collectRouteSpecsFromSitemapXml(xml, languageConfig, fetchBaseUrl) {
  const preferredPrefix = `/${languageConfig.defaultLanguage}/`;

  return extractXmlLocValues(xml)
    .map((loc) => {
      try {
        return new URL(loc);
      } catch {
        return null;
      }
    })
    .filter((url) => url && url.pathname.startsWith(preferredPrefix))
    .map((url) =>
      deriveRouteSpec(`${url.pathname}${url.search}`, languageConfig, fetchBaseUrl),
    );
}

function deriveCanonicalPath(routeUrl) {
  const page = readPositivePage(routeUrl.searchParams.get("page"));
  const languagePath = routeUrl.pathname;

  if (isUserSearchRoute(routeUrl)) {
    return languagePath;
  }

  if (page > 1) {
    return `${languagePath}?page=${page}`;
  }

  return languagePath;
}

function deriveRobotsPolicy(routeUrl) {
  const pathname = routeUrl.pathname;

  if (
    pathname.endsWith("/install") ||
    pathname.endsWith("/privacy") ||
    pathname.endsWith("/terms") ||
    pathname.endsWith("/community-guidelines") ||
    pathname.endsWith("/marketing-consent") ||
    pathname.endsWith("/support")
  ) {
    return "noindex";
  }

  if (isUserSearchRoute(routeUrl)) {
    return "noindexFollow";
  }

  return "public";
}

function deriveJsonLdTypes(pathname) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 1) {
    return ["WebSite", "SoftwareApplication"];
  }

  if (pathname.endsWith("/faq")) {
    return ["FAQPage"];
  }

  if (pathname.endsWith("/journeys") || pathname.endsWith("/users")) {
    return ["CollectionPage"];
  }

  if (segments[1] === "users" && segments.length === 3) {
    return ["ProfilePage"];
  }

  if (segments[1] === "journeys" && segments[3] === "moments") {
    return ["Article"];
  }

  if (segments[1] === "journeys" && segments.length === 3) {
    return ["Article"];
  }

  if (segments[1] === "photos" && segments.length === 3) {
    return ["ImageObject"];
  }

  return [];
}

function isUserSearchRoute(routeUrl) {
  return routeUrl.pathname.endsWith("/users") && routeUrl.searchParams.has("q");
}

function readPositivePage(value) {
  if (!value) {
    return 1;
  }

  const page = Number.parseInt(value, 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
}

function buildExpectedAlternates(canonicalPath, languageConfig, siteUrl) {
  const pathUrl = new URL(canonicalPath, siteUrl);
  const segments = pathUrl.pathname.split("/").filter(Boolean);
  const lang = segments[0];

  if (!lang || !languageConfig.languageCodes.has(lang)) {
    throw new Error(`Cannot build alternates for path without language prefix: ${canonicalPath}`);
  }

  const pathWithoutLanguage = segments.length > 1 ? `/${segments.slice(1).join("/")}` : "";
  const suffix = `${pathWithoutLanguage}${pathUrl.search}`;
  const alternates = {};

  for (const language of languageConfig.languages) {
    alternates[language.hreflang] = new URL(
      `/${language.code}${suffix}`,
      siteUrl,
    ).toString();
  }

  alternates["x-default"] = new URL(
    `/${languageConfig.defaultLanguage}${suffix}`,
    siteUrl,
  ).toString();

  return alternates;
}

function dedupeRouteSpecs(routeSpecs) {
  const uniqueSpecs = [];
  const seen = new Set();

  for (const routeSpec of routeSpecs) {
    if (seen.has(routeSpec.route)) {
      continue;
    }

    seen.add(routeSpec.route);
    uniqueSpecs.push(routeSpec);
  }

  return uniqueSpecs;
}

async function auditRoute(routeSpec, siteUrl) {
  let lastResult = null;

  for (let attempt = 1; attempt <= DEFAULT_ROUTE_RETRY_COUNT + 1; attempt += 1) {
    const result = auditRouteOnce(routeSpec, siteUrl);
    lastResult = result;

    if (result.ok) {
      if (attempt > 1) {
        result.summary.unshift(`attempts: ${attempt}`);
      }

      return result;
    }

    if (attempt <= DEFAULT_ROUTE_RETRY_COUNT) {
      await sleep(250 * attempt);
    }
  }

  if (lastResult && DEFAULT_ROUTE_RETRY_COUNT > 0) {
    lastResult.summary.unshift(`attempts: ${DEFAULT_ROUTE_RETRY_COUNT + 1}`);
  }

  return lastResult;
}

function auditRouteOnce(routeSpec, siteUrl) {
  const failures = [];
  const summary = [];

  let response;
  try {
    response = fetchWithCurl(routeSpec.fetchUrl, DEFAULT_TIMEOUT_MS);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      ok: false,
      route: routeSpec.route,
      summary,
      failures: [`Fetch failed: ${message}`],
    };
  }

  if (!response.ok) {
    failures.push(`Expected HTTP 200 but received ${response.status}`);
  }

  summary.push(`status: ${response.status}`);

  const html = response.body;
  const headHtml = extractHeadHtml(html);

  if (!headHtml) {
    failures.push("Missing <head> in rendered HTML");
    return {
      ok: false,
      route: routeSpec.route,
      summary,
      failures,
    };
  }

  const title = extractTitle(headHtml);
  if (!title) {
    failures.push("Missing <title>");
  } else {
    summary.push(`title: ${title}`);
  }

  const description = extractMetaContent(headHtml, "name", "description");
  if (!description) {
    failures.push("Missing meta description");
  } else {
    summary.push(`description length: ${description.length}`);
  }

  const canonicalUrl = extractCanonicalUrl(headHtml, siteUrl);
  if (!canonicalUrl) {
    failures.push("Missing canonical link");
  } else if (canonicalUrl !== routeSpec.expectedCanonicalUrl) {
    failures.push(
      `Canonical mismatch: expected ${routeSpec.expectedCanonicalUrl}, received ${canonicalUrl}`,
    );
  } else {
    summary.push(`canonical: ${canonicalUrl}`);
  }

  const alternateLinks = extractAlternateLinks(headHtml, siteUrl);
  validateAlternates(alternateLinks, routeSpec.expectedAlternates, failures, summary);

  const robots = extractMetaContent(headHtml, "name", "robots");
  validateRobots(
    "robots",
    robots,
    routeSpec.robotsPolicy,
    failures,
    summary,
  );

  const googleBot = extractMetaContent(headHtml, "name", "googlebot");
  validateRobots(
    "googlebot",
    googleBot,
    routeSpec.robotsPolicy,
    failures,
    summary,
  );

  const jsonLdBlocks = extractJsonLdBlocks(html);
  const jsonLdTypes = collectJsonLdTypes(jsonLdBlocks, failures);

  if (routeSpec.expectedJsonLdTypes.length > 0) {
    for (const expectedType of routeSpec.expectedJsonLdTypes) {
      if (!jsonLdTypes.has(expectedType)) {
        failures.push(`Missing JSON-LD type: ${expectedType}`);
      }
    }
  }

  if (jsonLdTypes.size > 0) {
    summary.push(`json-ld: ${Array.from(jsonLdTypes).sort().join(", ")}`);
  }

  return {
    ok: failures.length === 0,
    route: routeSpec.route,
    summary,
    failures,
  };
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function fetchWithCurl(url, timeoutMs) {
  const statusMarker = "__MOMENTBOOK_SEO_AUDIT_STATUS__:";
  const timeoutSeconds = Math.max(1, Math.ceil(timeoutMs / 1000));
  const result = spawnSync(
    "curl",
    [
      "-sS",
      "-L",
      "--compressed",
      "--max-time",
      String(timeoutSeconds),
      "-A",
      "MomentBookSEOAudit/1.0",
      "--write-out",
      `\n${statusMarker}%{http_code}`,
      url,
    ],
    {
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024,
    },
  );

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    const stderr = (result.stderr ?? "").trim();
    throw new Error(stderr || `curl exited with code ${result.status}`);
  }

  const stdout = result.stdout ?? "";
  const markerIndex = stdout.lastIndexOf(`\n${statusMarker}`);

  if (markerIndex < 0) {
    throw new Error("Could not parse curl status output");
  }

  const body = stdout.slice(0, markerIndex);
  const status = Number.parseInt(
    stdout.slice(markerIndex + statusMarker.length + 1).trim(),
    10,
  );

  if (!Number.isFinite(status)) {
    throw new Error("Could not parse HTTP status code");
  }

  return {
    ok: status >= 200 && status < 300,
    status,
    body,
  };
}

function extractHeadHtml(html) {
  const match = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  return match?.[1] ?? null;
}

function extractTitle(headHtml) {
  const match = headHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match?.[1].replace(/\s+/g, " ").trim() ?? "";
}

function extractMetaContent(headHtml, attributeName, attributeValue) {
  for (const tag of matchTags(headHtml, "meta")) {
    const attributes = parseAttributes(tag.attributes);
    if ((attributes[attributeName] ?? "").toLowerCase() !== attributeValue.toLowerCase()) {
      continue;
    }

    return attributes.content?.trim() ?? "";
  }

  return "";
}

function extractCanonicalUrl(headHtml, siteUrl) {
  for (const tag of matchTags(headHtml, "link")) {
    const attributes = parseAttributes(tag.attributes);
    const relValues = splitSpaceSeparated(attributes.rel);

    if (!relValues.includes("canonical") || !attributes.href) {
      continue;
    }

    return new URL(attributes.href, siteUrl).toString();
  }

  return "";
}

function extractAlternateLinks(headHtml, siteUrl) {
  const alternates = {};

  for (const tag of matchTags(headHtml, "link")) {
    const attributes = parseAttributes(tag.attributes);
    const relValues = splitSpaceSeparated(attributes.rel);

    if (!relValues.includes("alternate") || !attributes.hreflang || !attributes.href) {
      continue;
    }

    alternates[attributes.hreflang] = new URL(attributes.href, siteUrl).toString();
  }

  return alternates;
}

function validateAlternates(actual, expected, failures, summary) {
  const expectedEntries = Object.entries(expected);
  summary.push(`hreflang links: ${Object.keys(actual).length}`);

  for (const [hreflang, expectedUrl] of expectedEntries) {
    const actualUrl = actual[hreflang];

    if (!actualUrl) {
      failures.push(`Missing hreflang alternate: ${hreflang}`);
      continue;
    }

    if (actualUrl !== expectedUrl) {
      failures.push(
        `hreflang mismatch for ${hreflang}: expected ${expectedUrl}, received ${actualUrl}`,
      );
    }
  }
}

function validateRobots(label, value, policyKey, failures, summary) {
  if (!value) {
    failures.push(`Missing ${label} meta tag`);
    return;
  }

  summary.push(`${label}: ${value}`);

  const policy = ROBOTS_POLICIES[policyKey];
  const tokens = new Set(
    value
      .split(",")
      .map((token) => token.trim().toLowerCase())
      .filter(Boolean),
  );

  for (const expectedToken of policy.expected) {
    if (!tokens.has(expectedToken)) {
      failures.push(`Missing ${label} token: ${expectedToken}`);
    }
  }

  for (const blockedToken of policy.blocked) {
    if (tokens.has(blockedToken)) {
      failures.push(`Unexpected ${label} token: ${blockedToken}`);
    }
  }
}

function extractJsonLdBlocks(headHtml) {
  const blocks = [];
  const regex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;

  for (const match of headHtml.matchAll(regex)) {
    const attributes = parseAttributes(match[1] ?? "");

    if ((attributes.type ?? "").toLowerCase() !== "application/ld+json") {
      continue;
    }

    blocks.push(match[2]?.trim() ?? "");
  }

  return blocks;
}

function extractXmlLocValues(xml) {
  const values = [];
  const regex = /<loc>([\s\S]*?)<\/loc>/gi;

  for (const match of xml.matchAll(regex)) {
    const value = decodeXmlText(match[1] ?? "").trim();
    if (value) {
      values.push(value);
    }
  }

  return values;
}

function collectJsonLdTypes(blocks, failures) {
  const types = new Set();

  for (const block of blocks) {
    if (!block) {
      continue;
    }

    try {
      collectTypesFromValue(JSON.parse(block), types);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failures.push(`Invalid JSON-LD payload: ${message}`);
    }
  }

  return types;
}

function collectTypesFromValue(value, types) {
  if (Array.isArray(value)) {
    for (const item of value) {
      collectTypesFromValue(item, types);
    }

    return;
  }

  if (!value || typeof value !== "object") {
    return;
  }

  const currentType = value["@type"];
  if (typeof currentType === "string") {
    types.add(currentType);
  } else if (Array.isArray(currentType)) {
    for (const item of currentType) {
      if (typeof item === "string") {
        types.add(item);
      }
    }
  }

  for (const nestedValue of Object.values(value)) {
    collectTypesFromValue(nestedValue, types);
  }
}

function matchTags(headHtml, tagName) {
  const regex = new RegExp(`<${tagName}\\b([^>]*)>`, "gi");
  const tags = [];

  for (const match of headHtml.matchAll(regex)) {
    tags.push({
      attributes: match[1] ?? "",
    });
  }

  return tags;
}

function parseAttributes(rawAttributes) {
  const attributes = {};
  const attributeRegex =
    /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

  for (const match of rawAttributes.matchAll(attributeRegex)) {
    const [, key, doubleQuoted, singleQuoted, bareValue] = match;
    attributes[key.toLowerCase()] = doubleQuoted ?? singleQuoted ?? bareValue ?? "";
  }

  return attributes;
}

function splitSpaceSeparated(value) {
  return (value ?? "")
    .toLowerCase()
    .split(/\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function decodeXmlText(value) {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});
