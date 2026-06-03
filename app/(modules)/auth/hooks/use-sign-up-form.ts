"use client";

import { useState } from "react";
import { parseForm } from "@/app/shared/utils/validation";
import { signUpSchema } from "../schemas";
import { authService } from "../services";
import type { FormFieldErrors, SignUpFormValues } from "../types";

const INITIAL: SignUpFormValues = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  password: "",
  confirmPassword: "",
  agreed: false,
};

export function useSignUpForm() {
  const [values, setValues] = useState<SignUpFormValues>(INITIAL);
  const [errors, setErrors] = useState<FormFieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField = <K extends keyof SignUpFormValues>(
    key: K,
    value: SignUpFormValues[K]
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
    const parsed = parseForm(signUpSchema, values);
    if (!parsed.success) {
      setErrors(parsed.errors);
      return;
    }
    setIsSubmitting(true);
    try {
      await authService.signUp(parsed.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    showPassword,
    setShowPassword,
    showConfirm,
    setShowConfirm,
    setField,
    handleSubmit,
    isSubmitting,
  };
}
