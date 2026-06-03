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


<GenericCard
  variant="course"
  badge="A1.1 BEGINNER"
  width={336}
  height={473}
  price="800 EGP"
  title="German Foundation"
  
  description="Start your journey with basic phrases and essential grammar."
  meta={[
    { icon: <CalendarDays size={18} />, text: "8 Weeks | Start: Oct 15" },
    { icon: <Users size={18} />,        text: "24 Sessions (90 min each)" },
  ]}
  
  ctaLabel="Book Course"
  onCtaClick={() => router.push("/courses/1")}
/>

<GenericCard
  variant="event"
  image="/event.png"
  width={424}
  height={552}
  dateBadge={{ day: 24, month: "OCT" }}
  location="Campus Vienna"
  title="Viennese Language Café"
  description="Practice conversation skills with native speakers."
  price="300 EGP"
  onCtaClick={() => router.push("/events/1")}
/>
<GenericCard
  variant="blog"
  width={389}
  height={397}
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
  width={389}
  height={397}
  badge="CUSTOM"
  title="Build Your Own Card"
  description="Mix any fields — badge, meta, CTA — and control order with sections."
  meta={[{ text: "Fully composable via props" }]}
  ctaLabel="Learn More"
  ctaStyle="full"
  onCtaClick={() => router.push("/about")}
  sections={["header", "title", "description", "meta", "divider", "cta"]}
/>
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
