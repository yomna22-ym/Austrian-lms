"use client";

import { useCallback, useState } from "react";
import { parseForm } from "@/app/shared/utils/validation";
import { ApiError } from "@/lib/api/errors";
import { careersService } from "../services";
import { careerApplySchema, type CareerApplyFormValues } from "../schemas";
import { RESUME_MAX_BYTES } from "../utils";

const INITIAL: CareerApplyFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  coverLetter: "",
};

export function useCareerApplyForm(careerId: string) {
  const [values, setValues] = useState<CareerApplyFormValues>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const setField = <K extends keyof CareerApplyFormValues>(
    key: K,
    value: CareerApplyFormValues[K],
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

  const setResumeFile = (file: File | null) => {
    if (!file) {
      setResume(null);
      setResumeError(null);
      return;
    }

    if (file.type !== "application/pdf") {
      setResume(null);
      setResumeError("Resume must be a PDF file.");
      return;
    }

    if (file.size > RESUME_MAX_BYTES) {
      setResume(null);
      setResumeError("Resume must be 5 MB or smaller.");
      return;
    }

    setResume(file);
    setResumeError(null);
  };

  const reset = useCallback(() => {
    setValues(INITIAL);
    setErrors({});
    setResume(null);
    setResumeError(null);
    setSubmitError(null);
    setIsSuccess(false);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError(null);

    const parsed = parseForm(careerApplySchema, values);
    if (!parsed.success) {
      setErrors(parsed.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      let resumePath: string | undefined;

      if (resume) {
        const upload = await careersService.uploadResume(resume);
        resumePath = upload.url;
      }

      await careersService.apply(careerId, {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email,
        phone: parsed.data.phone || undefined,
        coverLetter: parsed.data.coverLetter || undefined,
        resume: resumePath,
      });

      setIsSuccess(true);
    } catch (err) {
      setSubmitError(
        err instanceof ApiError
          ? err.message
          : "Failed to submit application. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    resume,
    resumeError,
    isSubmitting,
    submitError,
    isSuccess,
    setField,
    setResumeFile,
    handleSubmit,
    reset,
  };
}
