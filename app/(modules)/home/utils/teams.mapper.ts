import { resolveLmsAssetUrl } from "@/lib/media";
import type { TeamCard } from "@/types/webhook/teams";
import type { TeamMember } from "../types/team.types";

export function mapTeamCardToMember(card: TeamCard): TeamMember {
  return {
    id: card.id,
    name: card.fullName,
    role: card.role,
    image: resolveLmsAssetUrl(card.profileImage) || "/meetourteam.jpg",
  };
}

export function mapTeamCardsToMembers(cards: TeamCard[]): TeamMember[] {
  return cards.map(mapTeamCardToMember);
}
