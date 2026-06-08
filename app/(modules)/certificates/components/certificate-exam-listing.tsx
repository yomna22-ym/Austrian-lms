import {
  CalendarDays,
  Clock3,
  MapPin,
  SlidersHorizontal,
  Ticket,
  Trash2,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

const months = ["Jan", "Feb", "Apr", "Mar", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
const formats = ["All", "On-site", "Online"] as const;

const exams = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  name: "TestDaF",
  price: "800 EGP",
  description:
    "Start your journey with basic phrases and essential grammar for daily life in Austria.",
  date: index % 2 === 0 ? "Date: Oct 15, 2026" : "8 Weeks | Start: Oct 15",
  branch: index % 3 === 0 ? "Maadi branch" : "Heliopolis branch",
  time: index % 2 === 0 ? "From 10:00 AM to 2:00 PM" : "From 3:00 PM to 5:00 PM",
  seats: "5 seats left",
}));

const FilterLabel = ({ children }: { children: ReactNode }) => (
  <h3 className="text-[12px] font-bold text-[#242424]">{children}</h3>
);

const CertificateExamCard = ({ exam }: { exam: (typeof exams)[number] }) => (
  <article className="flex min-h-[344px] flex-col rounded-[12px] border border-[#f0dede] bg-white p-5 shadow-[0_10px_26px_rgba(17,19,21,0.04)]">
    <div className="flex items-start justify-between gap-4">
      <h3 className="text-[18px] font-bold text-[#242424]">{exam.name}</h3>
      <strong className="shrink-0 text-[18px] font-extrabold text-[#b91317]">
        {exam.price}
      </strong>
    </div>

    <p className="mt-5 text-[13px] font-medium leading-relaxed text-[#4f4f4f]">
      {exam.description}
    </p>

    <div className="mt-6 flex flex-col gap-3 border-t border-[#f0dede] pt-5">
      {[
        { icon: CalendarDays, text: exam.date },
        { icon: MapPin, text: exam.branch },
        { icon: Clock3, text: exam.time },
        { icon: Users, text: exam.seats },
      ].map((item) => (
        <div key={item.text} className="flex items-center gap-3">
          <item.icon className="h-4 w-4 text-[#c90f18]" strokeWidth={2.1} aria-hidden="true" />
          <span className="text-[12px] font-semibold text-[#6f7680]">
            {item.text}
          </span>
        </div>
      ))}
    </div>

    <button
      type="button"
      className="mt-auto flex h-11 w-full items-center justify-center rounded-[8px] bg-[#c90f18] text-[13px] font-bold text-white shadow-[0_8px_14px_rgba(201,15,24,0.2)] transition-colors hover:bg-[#b91317]"
    >
      Book Exam
    </button>
  </article>
);

export default function CertificateExamListing() {
  return (
    <section className="w-full px-4 pb-16 pt-4 sm:px-6 lg:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
        <aside className="rounded-[12px] bg-white p-5 shadow-[0_10px_24px_rgba(17,19,21,0.04)] lg:shadow-none">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[20px] font-bold text-[#242424]">Filters</h2>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#c90f18]"
            >
              Reset Filter
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-7">
            <section>
              <FilterLabel>Branch</FilterLabel>
              <button
                type="button"
                className="mt-3 flex h-10 w-full items-center rounded-[7px] bg-[#f1f1f3] px-4 text-left text-[12px] font-semibold text-[#a0a0a0]"
              >
                All Locations
              </button>
            </section>

            <section>
              <FilterLabel>Exam</FilterLabel>
              <button
                type="button"
                className="mt-3 flex h-10 w-full items-center rounded-[7px] bg-[#f1f1f3] px-4 text-left text-[12px] font-semibold text-[#a0a0a0]"
              >
                TestDaF
              </button>
            </section>

            <section>
              <FilterLabel>Available in</FilterLabel>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {months.map((month) => (
                  <button
                    key={month}
                    type="button"
                    aria-pressed={month === "Feb"}
                    className={[
                      "h-8 rounded-[6px] border text-[11px] font-bold",
                      month === "Feb"
                        ? "border-[#c90f18] bg-[#c90f18] text-white"
                        : "border-[#e4e4e4] bg-white text-[#242424]",
                    ].join(" ")}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4 text-[#242424]" aria-hidden="true" />
                <FilterLabel>Price Range</FilterLabel>
              </div>
              <div className="mt-4 h-1.5 rounded-full bg-[#e8e8e8]">
                <div className="h-full w-[38%] rounded-full bg-[#c90f18]" />
              </div>
              <div className="mt-3 flex justify-between text-[11px] font-semibold text-[#777777]">
                <span>0 EGP</span>
                <span>6000 EGP</span>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-[#242424]" aria-hidden="true" />
                <FilterLabel>Format</FilterLabel>
              </div>
              <div className="mt-3 grid grid-cols-3 rounded-[8px] bg-[#f1f1f3] p-1">
                {formats.map((format) => (
                  <button
                    key={format}
                    type="button"
                    aria-pressed={format === "All"}
                    className={[
                      "h-8 rounded-[6px] text-[11px] font-bold",
                      format === "All"
                        ? "bg-[#c90f18] text-white"
                        : "text-[#242424]",
                    ].join(" ")}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] font-bold text-[#6f7680]">
              Showing <span className="text-[#242424]">24</span> of 86 courses
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {exams.map((exam) => (
              <CertificateExamCard key={exam.id} exam={exam} />
            ))}
          </div>

          <div className="mt-9 flex items-center justify-end gap-4">
            <span className="h-2 w-2 rounded-full bg-[#c90f18]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#e1e1e1]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#e1e1e1]" />
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#e4e4e4] text-[#777777]"
              aria-label="Previous page"
            >
              ‹
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-[#c90f18] text-white"
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
