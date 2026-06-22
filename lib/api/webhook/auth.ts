import "server-only";

import { webhookClient } from "@/lib/api/webhook-client";
import type { AccessTokenData, WebhookUser } from "@/types/api";
import type { LoginBody, LogoutResult, SignupBody } from "@/types/webhook/auth";

export function signup(body: SignupBody): Promise<AccessTokenData> {
  return webhookClient.post<AccessTokenData>("/auth/signup", body);
}

export function login(body: LoginBody): Promise<AccessTokenData> {
  return webhookClient.post<AccessTokenData>("/auth/login", body);
}

export function logout(token: string): Promise<LogoutResult> {
  return webhookClient.post<LogoutResult>("/auth/logout", undefined, {
    auth: "user",
    token,
  });
}

export function getMe(token: string): Promise<WebhookUser> {
  return webhookClient.get<WebhookUser>("/auth/me", {
    auth: "user",
    token,
  });
}
