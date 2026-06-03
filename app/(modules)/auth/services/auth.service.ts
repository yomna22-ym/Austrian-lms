import type {
  ForgetPasswordFormValues,
  LoginFormValues,
  ResetPasswordFormValues,
  SignUpFormValues,
} from "../types";

/** API layer — replace stubs when backend is available. */
export const authService = {
  async login(_data: LoginFormValues): Promise<void> {
    // TODO: POST /auth/login
  },

  async signUp(_data: SignUpFormValues): Promise<void> {
    // TODO: POST /auth/signup
  },

  async requestPasswordReset(_data: ForgetPasswordFormValues): Promise<void> {
    // TODO: POST /auth/forgot-password
  },

  async resetPassword(_data: ResetPasswordFormValues): Promise<void> {
    // TODO: POST /auth/reset-password
  },
};
