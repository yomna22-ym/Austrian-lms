import "server-only";

import { getLmsApiBaseUrl } from "@/lib/env";
import { ApiError, getErrorMessage } from "@/lib/api/errors";
import type { ApiErrorBody, ApiResponse } from "@/types/api";

type RequestOptions = Omit<RequestInit, "body"> & {
  token: string;
  body?: unknown;
  searchParams?: object;
};

function buildUrl(path: string, searchParams?: object): string {
  const base = getLmsApiBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${base}${normalizedPath}`);

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
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

async function request<T>(path: string, options: RequestOptions): Promise<T> {
  const { token, body, searchParams, headers: customHeaders, ...init } =
    options;

  const headers = new Headers(customHeaders);
  headers.set("Authorization", `Bearer ${token}`);

  if (body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(buildUrl(path, searchParams), {
    ...init,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
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

export const lmsClient = {
  get<T>(path: string, options: Omit<RequestOptions, "method">) {
    return request<T>(path, { ...options, method: "GET" });
  },
  post<T>(path: string, options: Omit<RequestOptions, "method">) {
    return request<T>(path, { ...options, method: "POST" });
  },
};
