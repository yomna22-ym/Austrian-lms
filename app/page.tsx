"use client";
import GenericCard from "@/app/shared/GenericCard";
import { CalendarDays, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import HeroSection from "@/app/shared/HeroSection/HeroSection";
export default function HomePage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center">
      <HeroSection
        image="/hero.jpg"
        imageAlt="Welcome to Österreich Institut"
        title="Welcome to Österreich Institut"
        desc="Discover our German language courses, events, and cultural programs across all branches."
        ctaText="Explore Courses"
        ctaLink="/courses"
      />

      <section className="w-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-left">
            <h2 className="text-2xl font-bold text-text-primary">Card Templates</h2>
          </div>

          <div className="grid w-full grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
      </section>

      <section className="w-full bg-[#fff7f7] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-left">
            <h2 className="text-2xl font-bold text-text-primary">Blog Styles</h2>
          </div>

          <div className="grid grid-cols-1 items-start justify-items-center gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
            <GenericCard
              variant="blog"
              blogStyle="compact"
              image="/blog.png"
              category="Culture"
              title="Linz: The Future of European Media Art"
              description="How an industrial city transformed into the world's leading hub for digital art and innovation."
              authorName="Marc Weber"
              readTime="4 min read"
              onRead={() => router.push("/blogs/1")}
            />

            <GenericCard
              variant="blog"
              blogStyle="wide"
              image="/hero.jpg"
              category="Travel"
              title="Hidden Gems: The Salzburg Lakes District"
              description="Beyond the city of music lies a turquoise paradise. We explore the lesser-known villages surrounding Lake Wolfgangsee."
              authorName="Johan V."
              readTime="8 min read"
              onRead={() => router.push("/blogs/2")}
            />

            <div className="xl:col-span-2">
              <GenericCard
                variant="blog"
                blogStyle="split"
                image="/blog1.png"
                category="Career"
                title="Working in Austria: Expectations"
                description="Navigate Austrian workplace culture with essential linguistic tips and traditional etiquette guides."
                onRead={() => router.push("/blogs/3")}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
