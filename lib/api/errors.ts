import type { ApiErrorBody } from "@/types/api";

export class ApiError extends Error {
  readonly status: number;
  readonly body?: ApiErrorBody;

  constructor(status: number, message: string, body?: ApiErrorBody) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export function getErrorMessage(
  body: ApiErrorBody | undefined,
  fallback: string,
): string {
  if (!body?.message) return fallback;
  return Array.isArray(body.message) ? body.message.join(", ") : body.message;
}

export function toErrorResponse(error: unknown): Response {
  if (error instanceof ApiError) {
    return Response.json(
      { message: error.message, statusCode: error.status },
      { status: error.status },
    );
  }
  console.error(error);
  return Response.json({ message: "Internal server error" }, { status: 500 });
}

export function jsonData<T>(data: T, status = 200): Response {
  return Response.json({ data }, { status });
}
