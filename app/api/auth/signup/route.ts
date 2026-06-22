import { jsonData, toErrorResponse } from "@/lib/api/errors";
import { getMe, signup } from "@/lib/api/webhook/auth";
import { setSessionToken } from "@/lib/auth/session";
import type { SignupBody } from "@/types/webhook/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignupBody;
    const { accessToken } = await signup(body);
    await setSessionToken(accessToken);
    const user = await getMe(accessToken);
    return jsonData(user, 201);
  } catch (error) {
    return toErrorResponse(error);
  }
}
