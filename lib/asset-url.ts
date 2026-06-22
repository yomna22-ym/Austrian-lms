export function isRemoteAssetUrl(path: string | undefined | null): boolean {
  if (!path) return false;
  return path.startsWith("http://") || path.startsWith("https://");
}

export function resolvePublicAssetUrl(path: string | undefined | null): string {
  if (!path) return "";
  if (isRemoteAssetUrl(path)) return path;

  const origin = process.env.NEXT_PUBLIC_LMS_ASSET_ORIGIN?.replace(/\/$/, "");
  if (!origin) return path;

  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}
