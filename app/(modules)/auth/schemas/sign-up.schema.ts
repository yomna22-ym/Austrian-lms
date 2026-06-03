import { z } from "zod";

export const signUpSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required."),
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Enter a valid email."),
    phone: z.string().min(1, "Phone number is required."),
    city: z.string().optional(),
    password: z
      .string()
      .min(1, "Password is required.")
      .min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
    agreed: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms to continue.",
    }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
