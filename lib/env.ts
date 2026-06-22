import "server-only";

function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function getLmsApiBaseUrl(): string {
  return requireEnv(
    "LMS_API_BASE_URL",
    process.env.LMS_API_BASE_URL,
  ).replace(/\/$/, "");
}

export function getLmsWebhookSecret(): string {
  return requireEnv("LMS_WEBHOOK_SECRET", process.env.LMS_WEBHOOK_SECRET);
}

export function hasLmsWebhookSecret(): boolean {
  return Boolean(process.env.LMS_WEBHOOK_SECRET?.trim());
}

/** LMS host without `/api/v1` — use for static files at `/uploads/...`. */
export function getLmsAssetOrigin(): string {
  const base = getLmsApiBaseUrl();
  return base.replace(/\/api\/v\d+\/?$/, "");
}
