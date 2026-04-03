type RouteHandlerParams = Record<string, string | string[] | undefined>;

export type AppRouteContext<T extends RouteHandlerParams> = {
  params?: Promise<T>;
};

export async function resolveAppRouteParams<T extends RouteHandlerParams>(
  context: AppRouteContext<T>,
): Promise<T | null> {
  return (await context.params) ?? null;
}

export function readSingleRouteParam(
  value: string | string[] | undefined,
): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export function stripRequiredRouteSuffix(
  value: string | undefined,
  suffix: string,
): string | undefined {
  if (!value || !value.endsWith(suffix)) {
    return undefined;
  }

  const stripped = value.slice(0, -suffix.length);
  return stripped.length > 0 ? stripped : undefined;
}
