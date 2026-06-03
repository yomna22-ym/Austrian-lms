"use client";

import Link from "next/link";
import Input from "@/app/shared/Input/Input";
import Button from "@/app/shared/Button/Button";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { AUTH_ROUTES } from "@/app/constants/routes";
import { OTP_LENGTH } from "../../schemas";
import { useResetPasswordForm } from "../../hooks";
import AuthFormLayout from "../auth-form-layout";

export default function ResetPasswordForm() {
  const {
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
    handleSubmit,
  } = useResetPasswordForm();

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
          label={isSubmitting ? "Resetting…" : "Reset Password"}
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
}
