import type { BranchLocation } from "@/app/shared/LocationFrame/types";

const URL_PATTERN = /https?:\/\/[^\s,]+/gi;

export function extractMapsUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const match = trimmed.match(URL_PATTERN);
  return match?.[0];
}

export function stripMapsUrlFromText(value: string | undefined): string {
  if (!value) return "";
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return "";
  return trimmed.replace(URL_PATTERN, "").replace(/,\s*$/, "").trim();
}

export function buildMapsUrl(
  address: string | undefined,
  coords?: { lat: number; lng: number },
): string | undefined {
  const fromAddress = extractMapsUrl(address);
  if (fromAddress) return fromAddress;
  if (coords) {
    return `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;
  }
  return undefined;
}

export function resolveBranchMapsUrl(branch: BranchLocation): string | undefined {
  const fromLink = extractMapsUrl(branch.addressLink);
  if (fromLink) return fromLink;

  return buildMapsUrl(branch.address, { lat: branch.lat, lng: branch.lng });
}

export function toGoogleMapsEmbedUrl(mapsUrl: string): string {
  if (mapsUrl.includes("output=embed") || mapsUrl.includes("/maps/embed")) {
    return mapsUrl;
  }

  return `https://maps.google.com/maps?q=${encodeURIComponent(mapsUrl)}&output=embed`;
}
