import type { BranchLocation } from "@/app/shared/LocationFrame/types";

const EARTH_RADIUS_KM = 6371;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function getDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function findNearestBranch(
  branches: readonly BranchLocation[],
  lat: number,
  lng: number
): BranchLocation | null {
  if (branches.length === 0) return null;

  return branches.reduce<BranchLocation>((nearest, branch) => {
    const nearestDistance = getDistanceKm(lat, lng, nearest.lat, nearest.lng);
    const branchDistance = getDistanceKm(lat, lng, branch.lat, branch.lng);
    return branchDistance < nearestDistance ? branch : nearest;
  }, branches[0]);
}
