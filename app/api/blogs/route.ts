import { jsonData, toErrorResponse } from "@/lib/api/errors";
import { parseNumericParam, parseSearchParams } from "@/lib/api/query";
import { listBlogs } from "@/lib/api/webhook/blogs";
import type { BlogPlacement, ListBlogsQuery } from "@/types/webhook/blogs";

function parsePlacement(value: string | undefined): BlogPlacement | undefined {
  if (value === "featured" || value === "top" || value === "default") {
    return value;
  }
  return undefined;
}

export async function GET(request: Request) {
  try {
    const params = parseSearchParams(request.url);
    const query: ListBlogsQuery = {
      page: parseNumericParam(params.page),
      limit: parseNumericParam(params.limit),
      search: params.search,
      categoryId: params.categoryId,
      placement: parsePlacement(params.placement),
    };
    const data = await listBlogs(query);
    return jsonData(data);
  } catch (error) {
    return toErrorResponse(error);
  }
}
