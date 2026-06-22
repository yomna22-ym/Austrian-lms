import { getLmsAssetOrigin } from "@/lib/env";

export function resolveLmsAssetUrl(path: string | undefined | null): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const origin = getLmsAssetOrigin();
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}
