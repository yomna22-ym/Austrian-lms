import { ChevronDown } from "lucide-react";
import type { FaqItem } from "../utils";

interface CertificatesFaqProps {
  items: FaqItem[];
}

export default function CertificatesFaq({ items }: CertificatesFaqProps) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <h2 className="text-center text-2xl font-bold text-text-primary sm:text-3xl">
        Frequently Asked Questions
      </h2>

      <div className="mt-10 flex flex-col gap-4">
        {items.map((item, index) => (
          <details
            key={item.question}
            open={index === 0}
            className="group rounded-[8px] border border-[#e9e3e3] bg-white shadow-[0_8px_18px_rgba(17,19,21,0.05)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-[14px] font-semibold text-text-primary marker:hidden">
              {item.question}
              <ChevronDown
                className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="border-t border-[#eee8e8] px-5 py-5 text-[13px] leading-relaxed text-text-secondary">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
