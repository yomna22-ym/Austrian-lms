export type HeroPageType =
  | "home"
  | "course"
  | "events"
  | "blog"
  | "branch"
  | "careers"
  | "certificate";

export interface HeroSection {
  _id: string;
  companyId: string;
  pageType: HeroPageType;
  title: string;
  description: string;
  image: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ListHomeHeroSectionsQuery {
  page?: number;
  limit?: number;
}
