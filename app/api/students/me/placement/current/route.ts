import { ApiError, jsonData, toErrorResponse } from "@/lib/api/errors";
import { getCurrentPlacementAttempt } from "@/lib/api/lms/placement";
import { getSessionToken } from "@/lib/auth/session";

export async function GET() {
  try {
    const token = await getSessionToken();
    if (!token) {
      throw new ApiError(401, "Not authenticated");
    }
    const result = await getCurrentPlacementAttempt(token);
    return jsonData(result);
  } catch (error) {
    return toErrorResponse(error);
  }
}
