import { z } from "zod";

const phoneRegex = /^\+?[0-9\s\-()]{7,50}$/;

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required.")
      .refine((value) => value.trim().includes(" "), {
        message: "Enter your first and last name.",
      }),
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Enter a valid email."),
    phone: z
      .string()
      .optional()
      .refine((value) => !value || phoneRegex.test(value.trim()), {
        message: "Enter a valid phone number.",
      }),
    branchId: z.string().min(1, "Please select a branch."),
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
