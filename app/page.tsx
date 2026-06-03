"use client";
import Button from "@/app/shared/Button/Button";
import GenericCard from "@/app/shared/GenericCard";
import { CalendarDays, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import HeroSection from "@/app/shared/HeroSection/HeroSection";
export default function HomePage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
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

        <div className="mt-10 grid w-full grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <GenericCard
            variant="course"
            badge="A1.1 BEGINNER"
            price="800 EGP"
            title="German Foundation"
            description="Start your journey with basic phrases and essential grammar."
            meta={[
              { icon: <CalendarDays size={16} />, text: "8 Weeks | Start: Oct 15" },
              { icon: <Users size={16} />, text: "24 Sessions (90 min each)" },
            ]}
            ctaLabel="Book Course"
            onCtaClick={() => router.push("/courses/1")}
          />
<div className="w-[900px] flex flex-col gap-4">

<GenericCard
            variant="event"
            image="/event.png"
            dateBadge={{ day: 24, month: "OCT" }}
            location="Campus Vienna"
            title="Viennese Language Café"
            description="Practice your conversation skills in an informal setting with native speakers and traditional snacks."
            price="300 EGP"
            onCtaClick={() => router.push("/events/1")}
          />
</div>
          <GenericCard
            variant="blog"
            layout="horizontal"
            featured
            image="/blog1.png"
            category="Culture"
            title="5 Coffee House Phrases You Need in Vienna"
            description="Navigate the iconic Viennese coffee culture…"
            onRead={() => router.push("/blogs/1")}
          />
          <GenericCard
            variant="custom"
            width={292}
            height={420}
            badge="B2.1 INTERMEDIATE"
            price="800 EGP"
            title="Professional German"
            description="Refine your skills for workplace communication and complex social interactions."
            meta={[
              { icon: <CalendarDays size={16} />, text: "8 Weeks | Start: Oct 12" },
              { icon: <Users size={16} />, text: "24 Sessions (90 min each)" },
            ]}
            ctaLabel="Book Course"
            ctaStyle="full"
            onCtaClick={() => router.push("/courses/1")}
            sections={["header", "title", "description", "divider", "meta", "cta"]}
          />
        </div>
      </div>
        <HeroSection
          image="/hero.jpg"
          imageAlt="Welcome to Österreich Institut"
          title="Welcome to Österreich Institut"
          desc="Discover our German language courses, events, and cultural programs across all branches."
          ctaText="Explore Courses"
          ctaLink="/courses"
        />
    </div>
  );
}
