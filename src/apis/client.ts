type Primitive = string | number | boolean | null | undefined;

type JsonValue =
  | Primitive
  | JsonValue[]
  | {
      [key: string]: JsonValue;
    };

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestParams = Omit<RequestInit, "body" | "method">;

type SecurityWorker<SecurityDataType> = (
  securityData: SecurityDataType | null,
) => RequestParams | void | Promise<RequestParams | void>;

type CustomFetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export type ApiConfig<SecurityDataType = unknown> = {
  baseUrl?: string;
  baseApiParams?: RequestParams;
  securityWorker?: SecurityWorker<SecurityDataType>;
  customFetch?: CustomFetch;
};

export type HttpResponse<T> = {
  data: T;
  status: number;
  headers: Headers;
};

export type ReportReason =
  | "spam"
  | "abuse"
  | "hate"
  | "sexual"
  | "inappropriate"
  | "other";

export type CreateReportDto = {
  targetType: string;
  targetId: string;
  reason: ReportReason;
  description?: string;
};

export type PublicUserItemDto = {
  userId: string;
  name: string;
  picture?: string;
  biography?: string;
  publishedJourneyCount: number;
};

export type PublicUserProfileDto = PublicUserItemDto;

export type PublicUsersResponseDto = {
  status: string;
  data?: {
    users?: PublicUserItemDto[];
    total?: number;
    page?: number;
    pages?: number;
    limit?: number;
  };
};

export type PublicUserProfileResponseDto = {
  status: string;
  data?: PublicUserProfileDto;
};

export type PublishedJourneyItemDto = {
  publicId?: string;
  journeyId?: string;
  userId?: string;
  startedAt?: number | string;
  endedAt?: number | string;
  recapStage?: string;
  photoCount?: number | string;
  imageCount?: number | string;
  thumbnailUrl?: string;
  metadata?: Record<string, unknown>;
  title?: string;
  description?: string;
  publishedAt?: string;
  createdAt?: string;
};

export type PublishedJourneyImageDto =
  | string
  | {
      url?: string;
      imageUrl?: string;
      src?: string;
      photoId?: string;
      width?: number;
      height?: number;
      caption?: string;
      takenAt?: number | string;
      locationName?: string;
      location?: {
        lat?: number | string;
        lng?: number | string;
        latitude?: number | string;
        longitude?: number | string;
        displayName?: string;
        name?: string;
        label?: string;
      };
    };

export type PublishedJourneyClusterDto = {
  clusterId?: string;
  timelineId?: string;
  id?: string;
  type?: string;
  time?: {
    startAt?: number | string;
    endAt?: number | string;
    durationMs?: number | string;
  };
  startedAt?: number | string;
  endedAt?: number | string;
  center?: {
    lat?: number | string;
    lng?: number | string;
    latitude?: number | string;
    longitude?: number | string;
  };
  location?: {
    lat?: number | string;
    lng?: number | string;
    latitude?: number | string;
    longitude?: number | string;
    displayName?: string;
    name?: string;
    label?: string;
  };
  locationName?: string;
  photoIds?: string[];
  photoId?: string;
};

export type PublishedJourneyDetailDto = {
  publicId?: string;
  userId?: string;
  startedAt?: number | string;
  endedAt?: number | string;
  title?: string;
  description?: string;
  mode?: string;
  photoCount?: number | string;
  images?: PublishedJourneyImageDto[];
  clusters?: PublishedJourneyClusterDto[];
  metadata?: Record<string, unknown>;
  publishedAt?: string;
  createdAt?: string;
  contentStatus?: string;
  notice?: unknown;
};

export type PublishedJourneysResponseDto = {
  status: string;
  data?: {
    journeys?: PublishedJourneyItemDto[];
    total?: number;
    page?: number;
    pages?: number;
    limit?: number;
  };
};

export type PublishedJourneyDetailResponseDto = {
  status: string;
  data?: PublishedJourneyDetailDto;
  message?: unknown;
};

export type MyProfileDto = {
  _id?: string;
  userId?: string;
  isGuest?: boolean;
  provider?: string;
  [key: string]: unknown;
};

export type MyProfileResponseDto = {
  status?: string;
  data?: MyProfileDto;
  message?: unknown;
};

type ApiErrorPayload = {
  status: number;
  message: string;
  data: unknown;
  error?: {
    message?: unknown;
  };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeBaseUrl(url?: string): string {
  if (!url) {
    return "";
  }

  return url.replace(/\/+$/, "");
}

function mergeHeaders(...sources: Array<HeadersInit | undefined>): Headers {
  const merged = new Headers();

  for (const source of sources) {
    if (!source) {
      continue;
    }

    const current = new Headers(source);
    current.forEach((value, key) => {
      merged.set(key, value);
    });
  }

  return merged;
}

function parseErrorMessage(payload: unknown): string | null {
  if (!payload) {
    return null;
  }

  if (typeof payload === "string") {
    const trimmed = payload.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  if (isRecord(payload)) {
    const directMessage = asString(payload.message);
    if (directMessage) {
      return directMessage;
    }

    const nestedError = payload.error;
    if (isRecord(nestedError)) {
      const nestedMessage = nestedError.message;
      if (typeof nestedMessage === "string" && nestedMessage.trim().length > 0) {
        return nestedMessage;
      }

      if (Array.isArray(nestedMessage)) {
        const firstString = nestedMessage.find(
          (item): item is string => typeof item === "string" && item.trim().length > 0,
        );
        if (firstString) {
          return firstString;
        }
      }
    }
  }

  return null;
}

function toBody(value: unknown): BodyInit | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (
    typeof value === "string" ||
    value instanceof FormData ||
    value instanceof URLSearchParams ||
    value instanceof Blob ||
    value instanceof ArrayBuffer
  ) {
    return value as BodyInit;
  }

  return JSON.stringify(value as JsonValue);
}

function createApiError(
  status: number,
  payload: unknown,
  fallbackMessage: string,
): Error & ApiErrorPayload {
  const message = parseErrorMessage(payload) ?? fallbackMessage;
  const error = new Error(message) as Error & ApiErrorPayload;

  error.status = status;
  error.message = message;
  error.data = payload;
  if (isRecord(payload) && "error" in payload) {
    const rootError = payload.error;
    if (isRecord(rootError) && "message" in rootError) {
      error.error = {
        message: rootError.message,
      };
    }
  }

  return error;
}

function shouldFallbackToNextPath(response: Response): boolean {
  return response.status === 404;
}

export class Api<SecurityDataType = unknown> {
  private securityData: SecurityDataType | null = null;

  private readonly baseUrl: string;

  private readonly baseApiParams: RequestParams;

  private readonly securityWorker?: SecurityWorker<SecurityDataType>;

  private readonly customFetch: CustomFetch;

  public readonly v2: {
    usersControllerGetMyProfile: () => Promise<HttpResponse<MyProfileResponseDto>>;
    reportsControllerCreateReport: (
      body: CreateReportDto,
    ) => Promise<HttpResponse<unknown>>;
  };

  constructor(config: ApiConfig<SecurityDataType> = {}) {
    this.baseUrl = normalizeBaseUrl(config.baseUrl);
    this.baseApiParams = config.baseApiParams ?? {};
    this.securityWorker = config.securityWorker;
    this.customFetch = config.customFetch ?? fetch;

    this.v2 = {
      usersControllerGetMyProfile: () =>
        this.request<MyProfileResponseDto>({
          method: "GET",
          paths: ["/v2/users/me/profile", "/v2/users/me"],
          secure: true,
        }),
      reportsControllerCreateReport: (body) =>
        this.request<unknown>({
          method: "POST",
          paths: ["/v2/reports", "/v2/reports/create"],
          body,
          secure: true,
        }),
    };
  }

  public setSecurityData(data: SecurityDataType | null): void {
    this.securityData = data;
  }

  private async getSecurityParams(
    enabled: boolean,
  ): Promise<RequestParams | undefined> {
    if (!enabled || !this.securityWorker) {
      return undefined;
    }

    const params = await this.securityWorker(this.securityData);
    return params ?? undefined;
  }

  private mergeRequestParams(
    method: HttpMethod,
    params: RequestParams,
    securityParams?: RequestParams,
  ): RequestInit {
    const mergedHeaders = mergeHeaders(
      this.baseApiParams.headers,
      securityParams?.headers,
      params.headers,
    );

    return {
      ...this.baseApiParams,
      ...securityParams,
      ...params,
      method,
      headers: mergedHeaders,
    };
  }

  private async parseResponsePayload(response: Response): Promise<unknown> {
    const contentType = response.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");

    if (isJson) {
      return response.json().catch(() => null);
    }

    return response.text().catch(() => null);
  }

  private async request<T>(options: {
    method: HttpMethod;
    paths: string[];
    body?: unknown;
    secure?: boolean;
    params?: RequestParams;
  }): Promise<HttpResponse<T>> {
    const {
      method,
      paths,
      body,
      params = {},
      secure = false,
    } = options;

    const securityParams = await this.getSecurityParams(secure);
    const requestInit = this.mergeRequestParams(method, params, securityParams);
    const serializedBody = toBody(body);

    if (serializedBody !== undefined) {
      requestInit.body = serializedBody;
      const headers = mergeHeaders(requestInit.headers);
      if (!headers.has("Content-Type") && !(serializedBody instanceof FormData)) {
        headers.set("Content-Type", "application/json");
      }
      requestInit.headers = headers;
    }

    let lastError: Error | null = null;

    for (let index = 0; index < paths.length; index += 1) {
      const path = paths[index];
      const isLastPath = index === paths.length - 1;
      const url = `${this.baseUrl}${path}`;

      try {
        const response = await this.customFetch(url, requestInit);
        const payload = await this.parseResponsePayload(response);

        if (!response.ok) {
          if (!isLastPath && shouldFallbackToNextPath(response)) {
            continue;
          }

          throw createApiError(
            response.status,
            payload,
            `Request failed with status ${response.status}`,
          );
        }

        return {
          data: payload as T,
          status: response.status,
          headers: response.headers,
        };
      } catch (error) {
        const typedError = error instanceof Error
          ? error
          : new Error("Request failed");

        const maybeStatus = (typedError as { status?: unknown }).status;
        const status = typeof maybeStatus === "number" ? maybeStatus : null;

        if (status !== null && status !== 404) {
          throw typedError;
        }

        lastError = typedError;

        if (isLastPath) {
          break;
        }
      }
    }

    throw lastError ?? new Error("Request failed");
  }
}
