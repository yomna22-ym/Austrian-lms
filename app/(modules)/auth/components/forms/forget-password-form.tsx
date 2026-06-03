"use client";

import Link from "next/link";
import Input from "@/app/shared/Input/Input";
import Button from "@/app/shared/Button/Button";
import { ArrowLeft } from "lucide-react";
import { AUTH_ROUTES } from "@/app/constants/routes";
import { useForgetPasswordForm } from "../../hooks";
import AuthFormLayout from "../auth-form-layout";

export default function ForgetPasswordForm() {
  const { email, error, submitted, setEmail, handleSubmit, isSubmitting } =
    useForgetPasswordForm();

  if (submitted) {
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
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="auth-form-title">Check your inbox</h1>
          <p className="auth-form-subtitle mx-auto max-w-sm text-balance">
            We sent a password reset link to{" "}
            <span className="font-semibold text-text-primary">{email}</span>.
            Check your spam folder if you don&apos;t see it.
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
    <AuthFormLayout size="sm">
      <div className="flex flex-col gap-2">
        <Link
          href={AUTH_ROUTES.login}
          className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-text-secondary underline-offset-4 transition-colors duration-150 hover:text-text-primary hover:underline"
          aria-label="Back to login"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to login
        </Link>
        <h1 className="auth-form-title mt-2 sm:mt-4">Forgot password?</h1>
        <p className="auth-form-subtitle">
          Enter the email address associated with your account and we&apos;ll
          send you a reset link.
        </p>
      </div>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 sm:gap-5">
        <Input
          label="Email Address"
          width="w-full min-w-0"
          type="email"
          placeholder="email@example.at"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          error={error}
          required
        />
        <Button
          label={isSubmitting ? "Sending…" : "Send Reset Link"}
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
