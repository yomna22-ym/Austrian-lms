import { jsonData, toErrorResponse } from "@/lib/api/errors";
import { listBlogCategories } from "@/lib/api/webhook/blog-categories";

export async function GET() {
  try {
    const data = await listBlogCategories();
    return jsonData(data);
  } catch (error) {
    return toErrorResponse(error);
  }
}
