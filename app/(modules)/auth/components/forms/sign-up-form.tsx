"use client";

import Link from "next/link";
import Input from "@/app/shared/Input/Input";
import Select from "@/app/shared/Select/Select";
import Button from "@/app/shared/Button/Button";
import { Eye, EyeOff } from "lucide-react";
import { AUTH_ROUTES, POLICY_ROUTES } from "@/app/constants/routes";
import { useSignUpForm } from "../../hooks";
import AuthFormLayout from "../auth-form-layout";

export default function SignUpForm() {
  const {
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
  } = useSignUpForm();

  return (
    <AuthFormLayout size="md">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="auth-form-title">Create your account</h1>
        <p className="auth-form-subtitle">
          Start your journey with us. Already have an account?{" "}
          <Link
            href={AUTH_ROUTES.login}
            className="font-semibold text-secondary underline-offset-4 hover:underline"
          >
            Log in
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
          label="Full Name"
          width="w-full min-w-0"
          placeholder="Anna Muster"
          value={values.fullName}
          onChange={(v) => setField("fullName", v)}
          autoComplete="name"
          error={errors.fullName}
          required
        />
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 md:gap-5">
          <Input
            label="Phone Number"
            width="w-full min-w-0"
            type="tel"
            placeholder="+43 1 234567"
            value={values.phone ?? ""}
            onChange={(v) => setField("phone", v)}
            autoComplete="tel"
            error={errors.phone}
          />
          <Select
            label="Branch"
            width="w-full min-w-0"
            value={values.branchId}
            onChange={(v) => setField("branchId", v)}
            options={branchOptions}
            placeholder={branchesLoading ? "Loading branches…" : "Select a branch"}
            error={errors.branchId ?? branchesError ?? undefined}
            disabled={branchesLoading || branchOptions.length === 0}
            required
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 md:gap-5">
          <Input
            label="Password"
            width="w-full min-w-0"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={values.password}
            onChange={(v) => setField("password", v)}
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
            value={values.confirmPassword}
            onChange={(v) => setField("confirmPassword", v)}
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
        </div>
        <div className="flex flex-col gap-1">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={values.agreed}
              onChange={(e) => setField("agreed", e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-secondary"
            />
            <span className="text-sm leading-snug text-text-secondary">
              I agree to the{" "}
              <Link
                href={POLICY_ROUTES.terms}
                className="font-semibold text-secondary underline-offset-4 hover:underline"
              >
                Terms of Service
              </Link>
              ,{" "}
              <Link
                href={POLICY_ROUTES.refund}
                className="font-semibold text-secondary underline-offset-4 hover:underline"
              >
                Refund Policy
              </Link>
              , and{" "}
              <Link
                href={POLICY_ROUTES.privacy}
                className="font-semibold text-secondary underline-offset-4 hover:underline"
              >
                Privacy Policy
              </Link>
              , including the processing of my data for academic purposes.
            </span>
          </label>
          {errors.agreed && (
            <p className="text-xs font-medium text-red-500" role="alert">
              {errors.agreed}
            </p>
          )}
        </div>
        <Button
          label={isSubmitting ? "Registering…" : "Register Account"}
          type="submit"
          width="w-full"
          height="h-12 sm:h-[51px]"
          bgColorClass="bg-secondary hover:brightness-110 active:brightness-95"
          textColorClass="text-primary"
          className="mt-1 shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm sm:mt-2"
          disabled={isSubmitting || branchesLoading || branchOptions.length === 0}
        />
      </form>
    </AuthFormLayout>
  );
}
