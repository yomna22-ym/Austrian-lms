"use client";

import React, { useRef, useState, KeyboardEvent, ClipboardEvent } from "react";
import Link from "next/link";
import Input from "@/app/shared/Input/Input";
import Button from "@/app/shared/Button/Button";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { AUTH_ROUTES } from "../constants/routes";
import AuthFormLayout from "./AuthFormLayout";

const OTP_LENGTH = 6;

const ResetPassword: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusSlot = (index: number) => {
    const el = inputRefs.current[index];
    if (el) {
      el.focus();
      el.select();
    }
  };

  const handleOtpChange = (index: number, char: string) => {
    const digit = char.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < OTP_LENGTH - 1) focusSlot(index + 1);
  };

  const handleOtpKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const next = [...otp];
        next[index] = "";
        setOtp(next);
      } else if (index > 0) {
        focusSlot(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusSlot(index - 1);
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      focusSlot(index + 1);
    }
  };

  const handleOtpPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    const next = [...otp];
    pasted.split("").forEach((d, i) => {
      next[i] = d;
    });
    setOtp(next);
    const lastFilled = Math.min(pasted.length, OTP_LENGTH - 1);
    focusSlot(lastFilled);
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (otp.some((d) => d === ""))
      next.otp = "Please enter the full 6-digit code.";
    if (!password) next.password = "Password is required.";
    else if (password.length < 8)
      next.password = "At least 8 characters required.";
    if (!confirmPassword) next.confirmPassword = "Please confirm your password.";
    else if (confirmPassword !== password)
      next.confirmPassword = "Passwords do not match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setDone(true);
  };

  if (done) {
    return (
      <AuthFormLayout size="sm" className="items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 sm:h-16 sm:w-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-secondary sm:h-8 sm:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="auth-form-title">Password reset!</h1>
          <p className="auth-form-subtitle">
            Your password has been changed successfully.
          </p>
        </div>
        <Link
          href={AUTH_ROUTES.login}
          className="inline-flex items-center gap-2 text-sm font-semibold text-secondary underline-offset-4 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to login
        </Link>
      </AuthFormLayout>
    );
  }

  return (
    <AuthFormLayout size="md">
      <div className="flex flex-col gap-2">
        <Link
          href={AUTH_ROUTES.forgetPassword}
          className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-text-secondary underline-offset-4 transition-colors duration-150 hover:text-text-primary hover:underline"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </Link>
        <h1 className="auth-form-title mt-2 sm:mt-4">Reset password</h1>
        <p className="auth-form-subtitle">
          Enter the 6-digit code we sent to your email, then choose a new
          password.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-text-secondary">
            Verification Code
          </span>
          <div
            className="auth-otp-grid"
            role="group"
            aria-label="One-time verification code"
          >
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                onPaste={handleOtpPaste}
                onFocus={(e) => e.target.select()}
                aria-label={`Digit ${i + 1} of ${OTP_LENGTH}`}
                className={[
                  "input-base auth-otp-slot outline-none",
                  "transition-[border-color,box-shadow] duration-200 ease-out",
                  "focus:border-secondary focus:ring-2 focus:ring-secondary/20",
                  errors.otp ? "border-red-500 focus:ring-red-200" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            ))}
          </div>
          {errors.otp && (
            <p className="text-xs font-medium text-red-500" role="alert">
              {errors.otp}
            </p>
          )}
        </div>

        <Input
          label="New Password"
          width="w-full min-w-0"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          error={errors.password}
          required
          suffix={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="flex items-center text-text-secondary transition-colors duration-150 hover:text-text-primary"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          }
        />

        <Input
          label="Confirm Password"
          width="w-full min-w-0"
          type={showConfirm ? "text" : "password"}
          placeholder="••••••••"
          value={confirmPassword}
          onChange={setConfirmPassword}
          autoComplete="new-password"
          error={errors.confirmPassword}
          required
          suffix={
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              aria-label={showConfirm ? "Hide password" : "Show password"}
              className="flex items-center text-text-secondary transition-colors duration-150 hover:text-text-primary"
            >
              {showConfirm ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          }
        />

        <Button
          label="Reset Password"
          type="submit"
          width="w-full"
          height="h-12 sm:h-[51px]"
          bgColorClass="bg-secondary hover:brightness-110 active:brightness-95"
          textColorClass="text-primary"
          className="shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm"
        />
      </form>
    </AuthFormLayout>
  );
};

export default ResetPassword;
