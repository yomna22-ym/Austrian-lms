import { ChevronDown } from "lucide-react";
import { MotionDiv, MotionSection } from "@/app/shared/Motion";
import SectionHeader from "@/app/shared/SectionHeader";
import type { FaqItem } from "../utils";

interface CertificatesFaqProps {
  items: FaqItem[];
}

export default function CertificatesFaq({ items }: CertificatesFaqProps) {
  return (
    <MotionSection className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Support"
        title="Frequently Asked Questions"
        description="Quick answers to the decisions candidates usually need before booking."
      />

      <div className="mt-10 flex flex-col gap-4">
        {items.map((item, index) => (
          <MotionDiv key={item.question} delay={index * 0.05}>
            <details
              open={index === 0}
              className="group rounded-[14px] border border-[#eadede] bg-white shadow-[0_1px_2px_rgba(17,19,21,0.04),0_14px_32px_rgba(17,19,21,0.055)]"
            >
              <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-[14px] font-semibold text-text-primary marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30">
                {item.question}
                <ChevronDown
                  className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="border-t border-[#eadede] px-5 py-5 text-[13px] leading-relaxed text-text-secondary">
                {item.answer}
              </p>
            </details>
          </MotionDiv>
        ))}
      </div>
    </MotionSection>
  );
}
