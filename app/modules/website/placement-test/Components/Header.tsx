import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <section className="w-full bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_440px] lg:gap-16 lg:px-16">
        {/* Left — text */}
        <div className="flex flex-col items-center gap-4 text-center sm:items-start sm:gap-5 sm:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            Willkommen
          </p>
          <h1 className="text-3xl font-bold leading-tight text-text-primary sm:text-4xl lg:text-[2.625rem]">
            Your Path to the Right Course
          </h1>
          <p className="mx-auto max-w-[480px] text-base leading-relaxed text-text-secondary sm:mx-0">
            To ensure you learn German at the perfect level, we provide a
            comprehensive assessment of your current skills. Start your journey
            with our official placement test.
          </p>
        </div>

        {/* Right — image card */}
        <div className="w-full overflow-hidden rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-xl p-3 sm:p-5 lg:p-[30px]">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl">
            <Image
              src="/placementHeader.png"
              alt="Student preparing for placement test"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1023px) 100vw, 440px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
