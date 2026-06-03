"use client";

import React, { useState } from "react";
import Link from "next/link";
import Input from "@/app/shared/Input/Input";
import Button from "@/app/shared/Button/Button";
import { Eye, EyeOff } from "lucide-react";
import { AUTH_ROUTES, POLICY_ROUTES } from "@/app/constants/routes";
import AuthFormLayout from "./AuthFormLayout";

const SignUpForm: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};
    if (!fullName.trim()) next.fullName = "Full name is required.";
    if (!email) next.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) next.email = "Enter a valid email.";
    if (!phone.trim()) next.phone = "Phone number is required.";
    if (!password) next.password = "Password is required.";
    else if (password.length < 8)
      next.password = "Password must be at least 8 characters.";
    if (!confirmPassword) next.confirmPassword = "Please confirm your password.";
    else if (confirmPassword !== password)
      next.confirmPassword = "Passwords do not match.";
    if (!agreed) next.agreed = "You must agree to the terms to continue.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // TODO: wire up auth API
  };

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
        <Input
          label="Full Name"
          width="w-full min-w-0"
          placeholder="Johann Wolfgang von Goethe"
          value={fullName}
          onChange={setFullName}
          autoComplete="name"
          error={errors.fullName}
          required
        />

        <Input
          label="Email Address"
          width="w-full min-w-0"
          type="email"
          placeholder="email@example.at"
          value={email}
          onChange={setEmail}
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
            value={phone}
            onChange={setPhone}
            autoComplete="tel"
            error={errors.phone}
            required
          />
          <Input
            label="City, Country"
            width="w-full min-w-0"
            placeholder="Vienna, Austria"
            value={city}
            onChange={setCity}
            autoComplete="address-level2"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 md:gap-5">
          <Input
            label="Password"
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
        </div>

        <div className="flex flex-col gap-1">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-secondary"
            />
            <span className="text-sm leading-snug text-text-secondary">
              I agree to the{" "}
              <Link
                href={POLICY_ROUTES.terms}
                className="font-semibold text-secondary underline-offset-4 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
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
          label="Register Account"
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
};

export default SignUpForm;
