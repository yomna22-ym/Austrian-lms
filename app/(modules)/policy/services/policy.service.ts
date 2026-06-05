import type { PolicySlug } from "../types";

export const policyService = {
  async fetchPolicy(slug: PolicySlug): Promise<string | null> {
    void slug;

    return null;
  },
};
