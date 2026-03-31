export function isRemoteImageSource(value: string | null | undefined): boolean {
  if (typeof value !== "string") {
    return false;
  }

  return /^https?:\/\//i.test(value.trim());
}
