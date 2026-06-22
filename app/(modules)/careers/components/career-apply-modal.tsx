"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, UploadCloud, X } from "lucide-react";
import Input from "@/app/shared/Input/Input";
import Button from "@/app/shared/Button/Button";
import { useCareerApplyForm } from "../hooks";
import type { CareerJob } from "../types";

const MODAL_EASE = [0.16, 1, 0.3, 1] as const;

interface CareerApplyModalProps {
  job: CareerJob | null;
  onClose: () => void;
}

interface CareerApplyModalContentProps {
  job: CareerJob;
  onClose: () => void;
}

function CareerApplyModalContent({
  job,
  onClose,
}: CareerApplyModalContentProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const reduceMotion = useReducedMotion();
  const {
    values,
    errors,
    resumeError,
    isSubmitting,
    submitError,
    isSuccess,
    setField,
    setResumeFile,
    handleSubmit,
    reset,
  } = useCareerApplyForm(job.id);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    reset();
    dialog.showModal();
  }, [job.id, reset]);

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed inset-0 z-50 m-auto max-h-[90vh] w-[min(100%-2rem,620px)] overflow-y-auto rounded-[18px] border border-[#efd7d7] bg-white p-0 shadow-[0_24px_60px_rgba(0,0,0,0.18)] backdrop:bg-black/55"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: -10 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: MODAL_EASE }}
        className="sticky top-0 z-10 flex items-start justify-between border-b border-[#eadede] bg-white px-6 py-5"
      >
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-secondary">
            Apply for role
          </p>
          <h2 className="mt-1 text-xl font-bold text-text-primary">{job.title}</h2>
          <p className="mt-1 text-sm text-text-secondary">{job.branch}</p>
        </div>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close application form"
          className="flex h-11 w-11 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-[#f7eded] hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </motion.div>

      {isSuccess ? (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.985 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.28, ease: MODAL_EASE }}
          className="px-6 py-10 text-center"
        >
          <CheckCircle2
            className="mx-auto h-12 w-12 text-secondary"
            aria-hidden="true"
          />
          <h3 className="text-2xl font-bold text-text-primary">
            Application submitted
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Thank you for applying to {job.title}. Our team will review your
            application and contact you if your profile matches the role.
          </p>
          <Button
            label="Close"
            width="w-full mt-8"
            height="h-[48px]"
            textColorClass="text-white"
            onClick={handleClose}
          />
        </motion.div>
      ) : (
        <motion.form
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: MODAL_EASE }}
          onSubmit={handleSubmit}
          noValidate
          className="px-6 py-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="First Name"
              width="w-full min-w-0"
              value={values.firstName}
              onChange={(value) => setField("firstName", value)}
              error={errors.firstName}
              required
            />
            <Input
              label="Last Name"
              width="w-full min-w-0"
              value={values.lastName}
              onChange={(value) => setField("lastName", value)}
              error={errors.lastName}
              required
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Email Address"
              width="w-full min-w-0"
              type="email"
              value={values.email}
              onChange={(value) => setField("email", value)}
              error={errors.email}
              autoComplete="email"
              required
            />
            <Input
              label="Phone Number"
              width="w-full min-w-0"
              type="tel"
              value={values.phone ?? ""}
              onChange={(value) => setField("phone", value)}
              error={errors.phone}
              autoComplete="tel"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="coverLetter"
              className="mb-2 block text-sm font-medium text-text-secondary"
            >
              Cover Letter
            </label>
            <textarea
              id="coverLetter"
              rows={4}
              value={values.coverLetter ?? ""}
              onChange={(event) => setField("coverLetter", event.target.value)}
              placeholder="Tell us why you are a great fit for this role."
              className="w-full rounded-input border border-[#ead4d4] px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-secondary"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="resume"
              className="mb-2 block text-sm font-medium text-text-secondary"
            >
              Resume (PDF, max 5 MB)
            </label>
            <div className="rounded-[12px] border border-dashed border-[#eadede] bg-white px-4 py-4 shadow-[0_1px_2px_rgba(17,19,21,0.04)] transition-colors focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#fff0f0] text-secondary">
                  <UploadCloud className="h-5 w-5" aria-hidden="true" />
                </span>
                <input
                  id="resume"
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={(event) =>
                    setResumeFile(event.target.files?.[0] ?? null)
                  }
                  className="block w-full text-sm text-text-secondary file:mr-4 file:rounded-input file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#aa000c]"
                />
              </div>
            </div>
            {resumeError ? (
              <p className="mt-2 text-sm text-red-600">{resumeError}</p>
            ) : null}
          </div>

          {submitError ? (
            <p className="mt-4 rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </p>
          ) : null}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              label="Cancel"
              width="w-full sm:w-auto sm:min-w-[140px]"
              height="h-[48px]"
              bgColorClass="bg-white border border-[#ead4d4]"
              textColorClass="text-text-secondary"
              onClick={handleClose}
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              label={isSubmitting ? "Submitting..." : "Submit Application"}
              width="w-full sm:flex-1"
              height="h-[48px]"
              textColorClass="text-white"
              disabled={isSubmitting}
            />
          </div>
        </motion.form>
      )}
    </dialog>
  );
}

export default function CareerApplyModal({ job, onClose }: CareerApplyModalProps) {
  if (!job) return null;
  return <CareerApplyModalContent key={job.id} job={job} onClose={onClose} />;
}
