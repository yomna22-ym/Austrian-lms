import { ApiError, jsonData, toErrorResponse } from "@/lib/api/errors";
import { getMe } from "@/lib/api/webhook/auth";
import { getSessionToken } from "@/lib/auth/session";

export async function GET() {
  try {
    const token = await getSessionToken();
    if (!token) {
      throw new ApiError(401, "Not authenticated");
    }
    const user = await getMe(token);
    return jsonData(user);
  } catch (error) {
    return toErrorResponse(error);
  }
}
