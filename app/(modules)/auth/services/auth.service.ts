import { siteClient } from "@/lib/api/site-client";
import { useAuthStore } from "@/stores/auth.store";
import type { WebhookUser } from "@/types/api";
import type { SignupBody } from "@/types/webhook/auth";
import type {
  ForgetPasswordFormValues,
  LoginFormValues,
  ResetPasswordFormValues,
  SignUpFormValues,
} from "../types";
import { splitFullName } from "../utils/name";

function toSignupBody(data: SignUpFormValues): SignupBody {
  const { firstName, lastName } = splitFullName(data.fullName);
  const phone = data.phone?.trim();

  return {
    firstName,
    lastName,
    email: data.email.trim(),
    password: data.password,
    confirmPassword: data.confirmPassword,
    branchId: data.branchId,
    ...(phone ? { phone } : {}),
  };
}

export const authService = {
  async login(data: LoginFormValues): Promise<WebhookUser> {
    const user = await siteClient.post<WebhookUser>("/auth/login", {
      email: data.email.trim(),
      password: data.password,
    });
    useAuthStore.getState().setUser(user);
    return user;
  },

  async signUp(data: SignUpFormValues): Promise<WebhookUser> {
    return this.signUpWithBranch(toSignupBody(data));
  },

  async signUpWithBranch(body: SignupBody): Promise<WebhookUser> {
    const user = await siteClient.post<WebhookUser>("/auth/signup", body);
    useAuthStore.getState().setUser(user);
    return user;
  },

  async logout(): Promise<void> {
    await useAuthStore.getState().logout();
  },

  async getMe(): Promise<WebhookUser> {
    return siteClient.get<WebhookUser>("/auth/me");
  },

  async requestPasswordReset(_data: ForgetPasswordFormValues): Promise<void> {
    // Not available in webhook consumer API
  },

  async resetPassword(_data: ResetPasswordFormValues): Promise<void> {
    // Not available in webhook consumer API
  },
};
