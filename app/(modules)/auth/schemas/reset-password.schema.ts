import { z } from "zod";

export const OTP_LENGTH = 6;

export const resetPasswordSchema = z
  .object({
    otp: z
      .array(z.string())
      .length(OTP_LENGTH)
      .refine((digits) => digits.every((d) => d !== ""), {
        message: "Please enter the full 6-digit code.",
      }),
    password: z
      .string()
      .min(1, "Password is required.")
      .min(8, "At least 8 characters required."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
