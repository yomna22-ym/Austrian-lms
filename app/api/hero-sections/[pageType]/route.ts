import { jsonData, toErrorResponse } from "@/lib/api/errors";
import {
  getHeroSection,
  listHomeHeroSections,
} from "@/lib/api/webhook/hero-sections";
import type { HeroPageType } from "@/types/webhook/hero-sections";

type RouteContext = { params: Promise<{ pageType: string }> };

export async function GET(request: Request, context: RouteContext) {
  try {
    const { pageType } = await context.params;

    if (pageType === "home") {
      const { searchParams } = new URL(request.url);
      const page = Number(searchParams.get("page") ?? "1");
      const limit = Number(searchParams.get("limit") ?? "20");
      const data = await listHomeHeroSections({ page, limit });
      return jsonData(data);
    }

    const data = await getHeroSection(pageType as Exclude<HeroPageType, "home">);
    return jsonData(data);
  } catch (error) {
    return toErrorResponse(error);
  }
}
