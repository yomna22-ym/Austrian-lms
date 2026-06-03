import type { PolicySlug } from "../types";

export const policyService = {
  async fetchPolicy(_slug: PolicySlug): Promise<string | null> {
    return null;
  },
};
