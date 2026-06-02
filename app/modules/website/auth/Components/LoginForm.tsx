"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "@/app/shared/Input/Input";
import Button from "@/app/shared/Button/Button";
import { Eye, EyeOff } from "lucide-react";
import { AUTH_ROUTES } from "../constants/routes";
import AuthFormLayout from "./AuthFormLayout";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validate = () => {
    const next: typeof errors = {};
    if (!email) next.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) next.email = "Enter a valid email.";
    if (!password) next.password = "Password is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    router.push(AUTH_ROUTES.getReady);
  };

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

        <Input
          label="Password"
          width="w-full min-w-0"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
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
          label="Log In"
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

export default LoginForm;
