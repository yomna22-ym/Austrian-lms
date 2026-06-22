"use client";

import Link from "next/link";
import Input from "@/app/shared/Input/Input";
import Button from "@/app/shared/Button/Button";
import { Eye, EyeOff } from "lucide-react";
import { AUTH_ROUTES } from "@/app/constants/routes";
import { useLoginForm } from "../../hooks";
import AuthFormLayout from "../auth-form-layout";

export default function LoginForm() {
  const {
    values,
    errors,
    formError,
    showPassword,
    setShowPassword,
    setField,
    handleSubmit,
    isSubmitting,
  } = useLoginForm();

  return (
    <AuthFormLayout size="sm">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="auth-form-title">Welcome back</h1>
        <p className="auth-form-subtitle">
          Don&apos;t have an account?{" "}
          <Link
            href={AUTH_ROUTES.signup}
            className="font-semibold text-secondary underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 sm:gap-5">
        {formError && (
          <p
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600"
            role="alert"
          >
            {formError}
          </p>
        )}

        <Input
          label="Email Address"
          width="w-full min-w-0"
          type="email"
          placeholder="email@example.at"
          value={values.email}
          onChange={(v) => setField("email", v)}
          autoComplete="email"
          error={errors.email}
          required
        />

        <Input
          label="Password"
          width="w-full min-w-0"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={values.password}
          onChange={(v) => setField("password", v)}
          autoComplete="current-password"
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

        <div className="-mt-1 flex justify-end sm:-mt-2">
          <Link
            href={AUTH_ROUTES.forgetPassword}
            className="text-sm font-medium text-secondary underline-offset-4 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          label={isSubmitting ? "Logging in…" : "Log In"}
          type="submit"
          width="w-full"
          height="h-12 sm:h-[51px]"
          bgColorClass="bg-secondary hover:brightness-110 active:brightness-95"
          textColorClass="text-primary"
          className="mt-1 shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm sm:mt-2"
        />
      </form>
    </AuthFormLayout>
  );
}
