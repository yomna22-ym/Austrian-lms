import type { Branch } from "@/types/webhook/branches";
import type { BranchLocation } from "@/app/shared/LocationFrame/types";
import {
  buildMapsUrl,
  extractMapsUrl,
  stripMapsUrlFromText,
} from "@/app/shared/utils/location.utils";
import type { GlobalLocation } from "../types";

export function mapBranchToGlobalLocation(branch: Branch): GlobalLocation {
  const cities = [branch.name, branch.city].filter(Boolean).join(", ");

  return {
    id: branch.id ?? branch._id,
    country: branch.country,
    cities: cities || branch.description,
    addressLink: branch.addressLink,
    description: branch.description,
  };
}

export function mapBranchToLocalLocation(branch: Branch): BranchLocation {
  const displayAddress = stripMapsUrlFromText(branch.address);
  const mapsUrl =
    extractMapsUrl(branch.addressLink) ??
    buildMapsUrl(branch.address, { lat: branch.lat, lng: branch.lng });

  return {
    id: branch.id ?? branch._id,
    name: branch.name,
    address: displayAddress || branch.address,
    phone: branch.phone,
    lat: branch.lat,
    lng: branch.lng,
    addressLink: mapsUrl,
    hasCoordinates: Boolean(branch.lat && branch.lng),
  };
}

export function mapGlobalBranches(branches: Branch[]): GlobalLocation[] {
  return branches.map(mapBranchToGlobalLocation);
}

export function mapLocalBranches(branches: Branch[]): BranchLocation[] {
  return branches.map(mapBranchToLocalLocation);
}
