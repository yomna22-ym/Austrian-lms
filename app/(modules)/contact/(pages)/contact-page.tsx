import {
  ArrowUpRight,
  Landmark,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import SurfaceCard from "@/app/shared/SurfaceCard";

const CONTACT_DETAILS = [
  {
    label: "Email",
    value: "office@oesterreichisches-sprachzentrum.net",
    href: "mailto:office@oesterreichisches-sprachzentrum.net",
    Icon: Mail,
  },
  {
    label: "Phone",
    value: "+201118886758",
    href: "tel:+201118886758",
    Icon: Phone,
  },
  {
    label: "Address",
    value: "AL Bergas 7, Garden City, Cairo, Egypt",
    href: "https://www.google.com/maps/place/7+Al+Bergas,+Qasr+El+Nil,+Cairo+Governorate+4272031/@30.0360143,31.2322682,17z/data=!3m1!4b1!4m6!3m5!1s0x145840ccec2dc655:0x6478105cfa75e4b3!8m2!3d30.0360143!4d31.2322682!16s%2Fg%2F11lcm_d9g0!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D",
    Icon: MapPin,
  },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    handle: "@austinstegypt",
    href: "https://www.instagram.com/austinstegypt?igsh=Y2Uxc2x2ZXlzM2d6&utm_source=qr",
    mark: "IG",
  },
  {
    label: "Facebook",
    handle: "LernQuader",
    href: "https://www.facebook.com/LernQuader?mibextid=wwXIfr&rdid=sj8cWxEsdG6kFRHh&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1KPTnpTV7P%2F%3Fmibextid%3DwwXIfr#",
    mark: "f",
  },
  {
    label: "TikTok",
    handle: "@austrianinstitute",
    href: "https://www.tiktok.com/@austrianinstitute?_r=1&_t=zs-93okcp5jmkp",
    mark: "TT",
  },
];

const EYEBROW =
  "text-[13px] font-extrabold uppercase tracking-[0.24em] text-secondary";

const RedRule = () => (
  <span className="mt-5 block h-[3px] w-[42px] rounded-full bg-secondary" />
);

export default function ContactPage() {
  return (
    <main className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#fffefe_0%,#fff8f8_56%,#ffffff_100%)]">
      <div
        className="pointer-events-none absolute right-0 top-0 hidden h-[460px] w-[430px] opacity-70 lg:block"
        style={{
          backgroundImage:
            "radial-gradient(rgba(185,19,23,0.14) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
        aria-hidden="true"
      />

      <section className="relative w-full px-4 py-14 sm:px-6 lg:px-16 lg:py-[72px]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,520px)_minmax(520px,1fr)] lg:gap-20">
            <div className="lg:pt-2">
              <p className={EYEBROW}>Contact</p>
              <RedRule />
              <h1 className="mt-9 max-w-[560px] text-[42px] font-bold leading-[1.16] text-text-primary sm:text-[56px] lg:text-[64px]">
                Get in touch with Austrian Institute in Egypt
              </h1>
              <RedRule />
              <p className="mt-8 max-w-[590px] text-[17px] leading-9 text-text-secondary">
                Reach our team for course registration, placement tests,
                certificates, branch visits, and student support.
              </p>
            </div>

            <div className="grid gap-7 lg:pt-4">
              {CONTACT_DETAILS.map(({ label, value, href, Icon }) => (
                <SurfaceCard
                  key={label}
                  className="rounded-[8px] border-[#f1dada] px-6 py-7 shadow-[0_18px_45px_rgba(17,19,21,0.07)] sm:px-7"
                >
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="group flex min-h-[78px] items-center justify-between gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                  >
                    <span className="flex min-w-0 items-center gap-6">
                      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[10px] bg-[#fff0f0] text-secondary">
                        <Icon className="h-8 w-8" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className={EYEBROW}>{label}</span>
                        <span className="mt-3 block break-words text-[18px] font-bold leading-7 text-text-primary">
                          {value}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-7 w-7 shrink-0 text-secondary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </SurfaceCard>
              ))}
            </div>
          </div>

          <div className="relative my-16 flex items-center justify-center lg:my-[76px]">
            <div className="h-px w-full bg-[#efd8d8]" aria-hidden="true" />
            <span className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-[#fff0f0] text-secondary ring-[14px] ring-[#fffafa]">
              <Landmark className="h-6 w-6" aria-hidden="true" />
            </span>
          </div>

          <section>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,520px)] lg:items-end">
              <div>
                <p className={EYEBROW}>Social Accounts</p>
                <h2 className="mt-5 text-[30px] font-bold leading-tight text-text-primary sm:text-[34px]">
                  Follow official updates
                </h2>
              </div>
              <p className="max-w-[520px] text-[16px] leading-8 text-text-secondary lg:justify-self-end">
                Stay close to announcements, course updates, events, and branch
                news through our official channels.
              </p>
            </div>

            <div className="mt-8 grid gap-7 md:grid-cols-3">
              {SOCIAL_LINKS.map(({ label, handle, href, mark }) => (
                <SurfaceCard
                  key={label}
                  className="rounded-[8px] border-[#f1dada] px-7 py-6 shadow-[0_18px_45px_rgba(17,19,21,0.07)]"
                >
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-[66px] items-center justify-between gap-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                  >
                    <span className="flex min-w-0 items-center gap-5">
                      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-secondary text-[16px] font-extrabold text-white shadow-[0_12px_22px_rgba(185,19,23,0.22)]">
                        {mark}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[18px] font-bold leading-tight text-text-primary">
                          {label}
                        </span>
                        <span className="mt-2 block break-words text-[15px] leading-6 text-text-secondary">
                          {handle}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-6 w-6 shrink-0 text-secondary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </SurfaceCard>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
