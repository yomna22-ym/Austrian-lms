"use client";

import { useState } from "react";
import { parseForm } from "@/app/shared/utils/validation";
import { forgetPasswordSchema } from "../schemas";
import { authService } from "../services";
import type { ForgetPasswordFormValues, FormFieldErrors } from "../types";

const INITIAL: ForgetPasswordFormValues = { email: "" };

export function useForgetPasswordForm() {
  const [values, setValues] = useState<ForgetPasswordFormValues>(INITIAL);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setEmail = (email: string) => {
    setValues({ email });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseForm(forgetPasswordSchema, values);
    if (!parsed.success) {
      setError(parsed.errors.email ?? "Enter a valid email address.");
      return;
    }
    setIsSubmitting(true);
    try {
      await authService.requestPasswordReset(parsed.data);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email: values.email,
    error,
    submitted,
    setEmail,
    handleSubmit,
    isSubmitting,
  };
}
