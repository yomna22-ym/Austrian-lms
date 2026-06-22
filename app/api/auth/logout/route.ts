import { ApiError, jsonData, toErrorResponse } from "@/lib/api/errors";
import { logout } from "@/lib/api/webhook/auth";
import { clearSessionToken, getSessionToken } from "@/lib/auth/session";

export async function POST() {
  try {
    const token = await getSessionToken();
    if (token) {
      await logout(token);
    }
    await clearSessionToken();
    return jsonData({ ok: true });
  } catch (error) {
    await clearSessionToken();
    if (error instanceof ApiError && error.status === 401) {
      return jsonData({ ok: true });
    }
    return toErrorResponse(error);
  }
}
