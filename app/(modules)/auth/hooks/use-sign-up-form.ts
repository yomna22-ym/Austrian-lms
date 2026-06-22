"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { branchesService } from "@/app/(modules)/branches/services/branches.service";
import { AUTH_ROUTES } from "@/app/constants/routes";
import { parseForm } from "@/app/shared/utils/validation";
import { ApiError } from "@/lib/api/errors";
import type { Branch } from "@/types/webhook/branches";
import { signUpSchema } from "../schemas";
import { authService } from "../services";
import type { FormFieldErrors, SignUpFormValues } from "../types";

const INITIAL: SignUpFormValues = {
  fullName: "",
  email: "",
  phone: "",
  branchId: "",
  password: "",
  confirmPassword: "",
  agreed: false,
};

export function useSignUpForm() {
  const router = useRouter();
  const [values, setValues] = useState<SignUpFormValues>(INITIAL);
  const [errors, setErrors] = useState<FormFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [branchesLoading, setBranchesLoading] = useState(true);
  const [branchesError, setBranchesError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    branchesService
      .listBranches({ limit: 100 })
      .then((data) => {
        if (cancelled) return;
        setBranches(data.items);
        setBranchesError(data.items.length ? null : "No branches available.");
      })
      .catch((error) => {
        if (cancelled) return;
        setBranches([]);
        setBranchesError(
          error instanceof ApiError
            ? error.message
            : "Unable to load branches.",
        );
      })
      .finally(() => {
        if (!cancelled) setBranchesLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const branchOptions = useMemo(
    () =>
      branches.map((branch) => ({
        value: branch.id ?? branch._id,
        label: [branch.name, branch.city, branch.country]
          .filter(Boolean)
          .join(", "),
      })),
    [branches],
  );

  const setField = <K extends keyof SignUpFormValues>(
    key: K,
    value: SignUpFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
    if (formError) setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseForm(signUpSchema, values);
    if (!parsed.success) {
      setErrors(parsed.errors);
      return;
    }
    setIsSubmitting(true);
    setFormError(null);
    try {
      await authService.signUp(parsed.data);
      router.push(AUTH_ROUTES.getReady);
    } catch (error) {
      setFormError(
        error instanceof ApiError
          ? error.message
          : "Unable to create your account. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    formError,
    showPassword,
    setShowPassword,
    showConfirm,
    setShowConfirm,
    setField,
    handleSubmit,
    isSubmitting,
    branchOptions,
    branchesLoading,
    branchesError,
  };
}
