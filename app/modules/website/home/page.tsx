import Button from "@/app/shared/Button/Button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold leading-tight text-text-primary md:text-5xl">
          Welcome to{" "}
          <span className="text-secondary">Österreich Institut</span>
        </h1>
        <p className="mt-4 text-[16px] text-muted-foreground md:text-[18px]">
          Discover our German language courses, events, and cultural programs
          across all branches.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            label="Explore Courses"
            bgColorClass="bg-secondary hover:brightness-110"
            textColorClass="text-primary"
            width="w-[185px]"
            height="h-[51px]"
            className="shadow-sm hover:-translate-y-0.5 active:translate-y-0 active:brightness-95"
          />
          <Button
            label="About Us"
            bgColorClass="bg-input-bg border border-input-border hover:bg-input-border"
            textColorClass="text-text-primary"
            width="w-[185px]"
            height="h-[51px]"
          />
        </div>
      </div>
    </div>
  );
}
