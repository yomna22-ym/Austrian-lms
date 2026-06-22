import "server-only";

import { webhookClient } from "@/lib/api/webhook-client";
import type { PaginatedResponse } from "@/types/api";
import type { ListTeamsQuery, TeamCard } from "@/types/webhook/teams";

export function listTeams(
  query: ListTeamsQuery = {},
): Promise<PaginatedResponse<TeamCard>> {
  return webhookClient.get<PaginatedResponse<TeamCard>>("/teams", {
    searchParams: query,
  });
}

export function getTeam(id: string): Promise<TeamCard> {
  return webhookClient.get<TeamCard>(`/teams/${id}`);
}
