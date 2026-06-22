import { ApiError, jsonData, toErrorResponse } from "@/lib/api/errors";
import { startOrResumePlacementAttempt } from "@/lib/api/lms/placement";
import { getSessionToken } from "@/lib/auth/session";

export async function POST() {
  try {
    const token = await getSessionToken();
    if (!token) {
      throw new ApiError(401, "Not authenticated");
    }
    const result = await startOrResumePlacementAttempt(token);
    return jsonData(result, 201);
  } catch (error) {
    return toErrorResponse(error);
  }
}
