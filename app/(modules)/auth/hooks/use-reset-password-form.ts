"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent, ClipboardEvent } from "react";
import { parseForm } from "@/app/shared/utils/validation";
import { resetPasswordSchema } from "../schemas";
import { authService } from "../services";
import type { FormFieldErrors } from "../types";
import {
  applyOtpDigit,
  applyOtpPaste,
  createEmptyOtp,
  handleOtpBackspace,
} from "../utils/otp";

export function useResetPasswordForm() {
  const [otp, setOtp] = useState<string[]>(createEmptyOtp);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<FormFieldErrors>({});
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusSlot = (index: number) => {
    const el = inputRefs.current[index];
    if (el) {
      el.focus();
      el.select();
    }
  };

  const handleOtpChange = (index: number, char: string) => {
    const next = applyOtpDigit(otp, index, char);
    setOtp(next);
    if (next[index] && index < next.length - 1) focusSlot(index + 1);
    if (errors.otp) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.otp;
        return updated;
      });
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      const { otp: next, focusPrevious } = handleOtpBackspace(otp, index);
      setOtp(next);
      if (focusPrevious) focusSlot(index - 1);
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusSlot(index - 1);
    } else if (e.key === "ArrowRight" && index < otp.length - 1) {
      focusSlot(index + 1);
    }
  };

  const handleOtpPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { otp: next, focusIndex } = applyOtpPaste(
      otp,
      e.clipboardData.getData("text")
    );
    setOtp(next);
    focusSlot(focusIndex);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseForm(resetPasswordSchema, {
      otp,
      password,
      confirmPassword,
    });
    if (!parsed.success) {
      setErrors(parsed.errors);
      return;
    }
    setIsSubmitting(true);
    try {
      await authService.resetPassword(parsed.data);
      setDone(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    otp,
    password,
    confirmPassword,
    showPassword,
    setShowPassword,
    showConfirm,
    setShowConfirm,
    errors,
    done,
    isSubmitting,
    inputRefs,
    setPassword,
    setConfirmPassword,
    handleOtpChange,
    handleOtpKeyDown,
    handleOtpPaste,
    focusSlot,
    handleSubmit,
  };
}
