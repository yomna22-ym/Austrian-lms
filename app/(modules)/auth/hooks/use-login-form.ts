"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AUTH_ROUTES } from "@/app/constants/routes";
import { parseForm } from "@/app/shared/utils/validation";
import { loginSchema } from "../schemas";
import { authService } from "../services";
import type { FormFieldErrors, LoginFormValues } from "../types";

const INITIAL: LoginFormValues = { email: "", password: "" };

export function useLoginForm() {
  const router = useRouter();
  const [values, setValues] = useState<LoginFormValues>(INITIAL);
  const [errors, setErrors] = useState<FormFieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField = <K extends keyof LoginFormValues>(
    key: K,
    value: LoginFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseForm(loginSchema, values);
    if (!parsed.success) {
      setErrors(parsed.errors);
      return;
    }
    setIsSubmitting(true);
    try {
      await authService.login(parsed.data);
      router.push(AUTH_ROUTES.getReady);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    showPassword,
    setShowPassword,
    setField,
    handleSubmit,
    isSubmitting,
  };
}
