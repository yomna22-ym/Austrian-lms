import { z } from "zod";

export const careerApplySchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Enter a valid email."),
  phone: z.string().optional(),
  coverLetter: z.string().optional(),
});

export type CareerApplyFormValues = z.infer<typeof careerApplySchema>;
