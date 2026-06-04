import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface HeroSectionProps {
  image: string;
  title?: string;
  desc?: string;
  ctaText?: string;
  ctaLink?: string;
  imageAlt?: string;
  className?: string;
  minHeightClass?: string;
  priority?: boolean;
  showCtaArrow?: boolean;
}

const CTA_BASE =
  "inline-flex items-center justify-center gap-2 rounded-input font-medium text-base " +
  "transition-all duration-200 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "cursor-pointer select-none bg-secondary text-primary h-[51px] px-6 " +
  "shadow-sm hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:brightness-95";

const HeroSection = ({
  image,
  title,
  desc,
  ctaText,
  ctaLink,
  imageAlt,
  className = "",
  minHeightClass = "min-h-svh",
  priority = false,
  showCtaArrow = false,
}: HeroSectionProps) => {
  const alt = imageAlt ?? title ?? "";
  const showCta = Boolean(ctaText && ctaLink);
  const hasContent = Boolean(title || desc || showCta);

  return (
    <section
      aria-label={title ?? "Hero"}
      className={[
        "relative w-full overflow-hidden",
        minHeightClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority={priority}
      />

      <div
        className="pointer-events-none absolute inset-0 bg-black/35"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-black/25 md:bg-gradient-to-r md:from-black/70 md:via-black/40 md:to-transparent"
        aria-hidden="true"
      />

      {hasContent && (
        <div
          className={[
            "relative z-10 flex items-center justify-center md:justify-start",
            minHeightClass,
          ].join(" ")}
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-12 nav:px-8 md:items-start md:py-14 md:text-left lg:px-16">
            {title && (
              <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                {title}
              </h1>
            )}
            {desc && (
              <p className="mt-3 max-w-xl text-base text-white/90 sm:text-lg md:mt-4">
                {desc}
              </p>
            )}
            {showCta && (
              <Link
                href={ctaLink!}
                className={[CTA_BASE, "mt-6 w-full max-w-xs sm:w-auto md:mt-8"].join(
                  " "
                )}
              >
                {ctaText}
                {showCtaArrow && (
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                )}
              </Link>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
