"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/shared/Button/Button";
import { Upload, FileText } from "lucide-react";
import { PLACEMENT_TEST_ROUTES, WEBSITE_ROUTES } from "@/app/constants/routes";
import AuthFormLayout from "../auth-form-layout";

export default function GetReadyForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");

  const helper = useMemo(() => {
    if (!fileName)
      return "Ensure your certificate is not more than 3 months old from Goethe Institute";
    return `Selected: ${fileName}`;
  }, [fileName]);

  const openFilePicker = () => fileInputRef.current?.click();

  return (
    <AuthFormLayout size="lg" className="text-center">
      <div className="flex flex-col items-center gap-3">
        <h1 className="auth-form-title text-balance">
          Let&apos;s find the perfect course for you!
        </h1>
        <span
          className="h-0.5 w-full max-w-xs rounded-full bg-secondary/70 sm:max-w-sm"
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-col gap-6 text-left sm:gap-8">
        <section className="flex flex-col gap-3">
          <p className="text-sm text-text-secondary sm:text-base">
            Don&apos;t know your level?
          </p>
          <Button
            label="Take Placement Test"
            type="button"
            width="w-full"
            height="h-12 sm:h-[54px]"
            bgColorClass="bg-secondary hover:brightness-110 active:brightness-95"
            textColorClass="text-primary"
            className="shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm"
            onClick={() => router.push(PLACEMENT_TEST_ROUTES.overview)}
          />
        </section>
        <section className="flex flex-col gap-3">
          <p className="text-sm text-text-secondary sm:text-base">
            Very new to the German language?
          </p>
          <Button
            label="Start From Beginning"
            type="button"
            width="w-full"
            height="h-12 sm:h-[54px]"
            bgColorClass="bg-primary border border-secondary hover:bg-secondary/5"
            textColorClass="text-secondary"
            className="shadow-[0_1px_0_rgba(0,0,0,0.04)] hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm"
            onClick={() => router.push(WEBSITE_ROUTES.courses)}
          />
        </section>
        <section className="flex flex-col gap-3">
          <p className="text-sm text-text-secondary sm:text-base">
            Already have a certificate?
          </p>
          <button
            type="button"
            onClick={openFilePicker}
            className={[
              "group relative w-full rounded-input border border-dashed border-text-secondary/40 bg-[#F9F9F9] px-4 py-8 sm:px-5 sm:py-10",
              "transition-all duration-200 ease-out",
              "hover:-translate-y-0.5 hover:border-secondary/70 hover:shadow-md",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            ].join(" ")}
            aria-label="Upload certificate"
          >
            <div className="mx-auto flex w-full max-w-[360px] flex-col items-center gap-2 sm:gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary sm:h-11 sm:w-11">
                <Upload className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                <FileText className="h-4 w-4 text-secondary" aria-hidden="true" />
                Upload Certificate
              </div>
              <p className="text-center text-xs leading-relaxed text-text-secondary sm:text-left">
                {helper}
              </p>
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              setFileName(f?.name ?? "");
            }}
          />
        </section>
      </div>
    </AuthFormLayout>
  );
}
