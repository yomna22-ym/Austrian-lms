import { jsonData, toErrorResponse } from "@/lib/api/errors";
import { getMe, login } from "@/lib/api/webhook/auth";
import { setSessionToken } from "@/lib/auth/session";
import type { LoginBody } from "@/types/webhook/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginBody;
    const { accessToken } = await login(body);
    await setSessionToken(accessToken);
    const user = await getMe(accessToken);
    return jsonData(user, 201);
  } catch (error) {
    return toErrorResponse(error);
  }
}
