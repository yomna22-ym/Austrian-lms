interface PageIntroProps {
  title: string;
  description?: string;
  eyebrow?: string;
}

export default function PageIntro({ title, description, eyebrow }: PageIntroProps) {
  return (
    <section className="w-full bg-white px-4 pt-10 sm:px-6 sm:pt-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {eyebrow ? (
          <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-secondary">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 max-w-4xl text-[34px] font-bold leading-[1.12] text-text-primary sm:text-[44px] lg:text-[52px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-3xl text-[15px] font-medium leading-7 text-text-secondary sm:text-[17px]">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
