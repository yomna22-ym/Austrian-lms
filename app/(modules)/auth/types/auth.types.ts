import type { z } from "zod";
import type {
  forgetPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signUpSchema,
} from "../schemas";

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type ForgetPasswordFormValues = z.infer<typeof forgetPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export type FormFieldErrors = Record<string, string>;

export type AuthFormSize = "sm" | "md" | "lg";
