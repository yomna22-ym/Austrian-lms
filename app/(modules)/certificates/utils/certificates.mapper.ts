import { resolvePublicAssetUrl } from "@/lib/asset-url";
import type { OfficialCertification } from "@/types/webhook/certifications";
import type { CertificationItem } from "./certificates.constants";

/**
 * Maps an OfficialCertification subdocument to the CertificationItem shape
 * expected by CertificationCard.
 */
export function mapOfficialCertToItem(cert: OfficialCertification): CertificationItem {
  return {
    name: cert.title,
    subtitle: cert.subtitle,
    logo: resolvePublicAssetUrl(cert.image),
    category: cert.tag,
    categoryTone: "bg-[#e9f4ff] text-[#1e6fac]",
    descriptionTitle: cert.title,
    description: cert.desc,
  };
}

export function mapOfficialCertsToItems(
  certs: OfficialCertification[],
): CertificationItem[] {
  return certs.map(mapOfficialCertToItem);
}

export function formatStatNumber(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(0)}k+`;
  if (value >= 100) return `${Math.floor(value / 100) * 100}+`;
  return `${value}+`;
}
