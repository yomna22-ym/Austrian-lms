import { ApiError, getErrorMessage } from "@/lib/api/errors";
import type { ApiErrorBody, ApiResponse } from "@/types/api";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  searchParams?: object;
};

function buildUrl(
  path: string,
  searchParams?: object,
): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!searchParams) return normalizedPath;

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== undefined && value !== "") {
      params.set(key, String(value));
    }
  }

  const qs = params.toString();
  return qs ? `${normalizedPath}?${qs}` : normalizedPath;
}

async function parseError(response: Response): Promise<ApiError> {
  let body: ApiErrorBody | undefined;
  try {
    body = (await response.json()) as ApiErrorBody;
  } catch {
    body = undefined;
  }
  return new ApiError(
    response.status,
    getErrorMessage(body, response.statusText || "Request failed"),
    body,
  );
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, searchParams, headers: customHeaders, ...init } = options;

  const headers = new Headers(customHeaders);
  const isFormData = body instanceof FormData;

  if (body !== undefined && !isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(buildUrl(path, searchParams), {
    ...init,
    headers,
    credentials: "include",
    body:
      body === undefined
        ? undefined
        : isFormData
          ? body
          : JSON.stringify(body),
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const json = (await response.json()) as ApiResponse<T> | T;
  if (json && typeof json === "object" && "data" in json) {
    return (json as ApiResponse<T>).data;
  }
  return json as T;
}

function apiPath(path: string): string {
  return `/api${path.startsWith("/") ? path : `/${path}`}`;
}

export const siteClient = {
  get<T>(path: string, options?: RequestOptions) {
    return request<T>(apiPath(path), { ...options, method: "GET" });
  },
  post<T>(path: string, body?: unknown, options?: RequestOptions) {
    return request<T>(apiPath(path), { ...options, method: "POST", body });
  },
};
