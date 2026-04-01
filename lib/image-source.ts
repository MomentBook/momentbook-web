import type { ImageProps } from "next/image";

export function isRemoteImageSource(value: string | null | undefined): boolean {
  if (typeof value !== "string") {
    return false;
  }

  return /^https?:\/\//i.test(value.trim());
}

function normalizeImagePath(value: string): string {
  return value.trim().split(/[?#]/, 1)[0].toLowerCase();
}

function readImagePath(
  value: ImageProps["src"] | null | undefined,
): string | null {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object") {
    if ("src" in value && typeof value.src === "string") {
      return value.src;
    }

    if (
      "default" in value &&
      value.default &&
      typeof value.default === "object" &&
      "src" in value.default &&
      typeof value.default.src === "string"
    ) {
      return value.default.src;
    }
  }

  return null;
}

export function shouldBypassImageOptimization(
  value: ImageProps["src"] | null | undefined,
): boolean {
  const sourcePath = readImagePath(value);

  if (isRemoteImageSource(sourcePath)) {
    return true;
  }

  if (!sourcePath) {
    return false;
  }

  const normalizedPath = normalizeImagePath(sourcePath);

  return (
    normalizedPath.endsWith(".svg") ||
    normalizedPath.endsWith(".webp") ||
    normalizedPath.includes("/_next/static/media/")
  );
}
