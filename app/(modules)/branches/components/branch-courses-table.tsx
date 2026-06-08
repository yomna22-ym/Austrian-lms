"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import type { BranchLocation } from "../types";

type CourseRow = {
  group: "A1" | "A2";
  level: string;
  teacher: string;
  textbook: string;
  days: string;
  time: string;
  start: string;
  end: string;
  price: string;
  status: "Full" | "Available" | "Postponed";
};

const courses: CourseRow[] = [
  {
    group: "A1",
    level: "A1.1",
    teacher: "Frau Maha",
    textbook: "Miteinander",
    days: "Mon-Thurs",
    time: "04:00-07:00",
    start: "20/07/2026",
    end: "31.08.2026",
    price: "3,500 EGP",
    status: "Full",
  },
  {
    group: "A1",
    level: "A1.1",
    teacher: "Frau Reem",
    textbook: "Miteinander",
    days: "Every Tues",
    time: "10:00-14:00",
    start: "14/07/2026",
    end: "15.09.2026",
    price: "3,500 EGP",
    status: "Available",
  },
  {
    group: "A1",
    level: "A1.2",
    teacher: "Frau Reem",
    textbook: "MIA",
    days: "Mon-Wed",
    time: "07:00-10:00",
    start: "08.07.2026",
    end: "19.08.2026",
    price: "3,500 EGP",
    status: "Available",
  },
  {
    group: "A1",
    level: "A1.2",
    teacher: "Frau Salma Wael",
    textbook: "Miteinander",
    days: "Every Sat",
    time: "10:00-14:00",
    start: "04.07.2026",
    end: "29.08.2026",
    price: "3,500 EGP",
    status: "Postponed",
  },
  {
    group: "A2",
    level: "A2.1",
    teacher: "Frau Marwa",
    textbook: "Das Leben",
    days: "Every Fri",
    time: "10:00-14:00",
    start: "24.07.2026",
    end: "TBD",
    price: "3,700 EGP",
    status: "Available",
  },
];

const statusClass: Record<CourseRow["status"], string> = {
  Full: "bg-[#ffe3e6] text-[#c90f18]",
  Available: "bg-[#dcf8e4] text-[#16883c]",
  Postponed: "bg-[#fff2ba] text-[#9a7500]",
};

interface BranchCoursesTableProps {
  branches: readonly BranchLocation[];
  selectedBranchId: string;
  onBranchSelect: (branchId: string) => void;
}

export default function BranchCoursesTable({
  branches,
  selectedBranchId,
  onBranchSelect,
}: BranchCoursesTableProps) {
  const [onlineActive, setOnlineActive] = useState(false);
  const previousSelectedBranchId = useRef(selectedBranchId);
  const selectedBranch =
    branches.find((branch) => branch.id === selectedBranchId) ?? branches[0];

  useEffect(() => {
    if (previousSelectedBranchId.current !== selectedBranchId) {
      setOnlineActive(false);
      previousSelectedBranchId.current = selectedBranchId;
    }
  }, [selectedBranchId]);
  const groupedRows = useMemo(() => {
    return courses.reduce<Record<CourseRow["group"], CourseRow[]>>(
      (groups, course) => {
        groups[course.group].push(course);
        return groups;
      },
      { A1: [], A2: [] }
    );
  }, []);

  return (
    <section className="w-full bg-[#fff8f8] px-4 py-16 sm:px-6 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <header className="text-center">
          <h2 className="text-[30px] font-bold leading-tight text-[#242424] sm:text-[36px]">
            Browse Courses by Branch
          </h2>
          <p className="mt-3 text-[13px] font-medium text-[#777777]">
            Select your nearest branch to view the full July 2026 schedule
          </p>
        </header>

        <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-3">
          {branches.map((branch) => (
            <button
              key={branch.id}
              type="button"
              aria-pressed={!onlineActive && selectedBranchId === branch.id}
              onClick={() => {
                setOnlineActive(false);
                onBranchSelect(branch.id);
              }}
              className={[
                "h-10 rounded-full border px-6 text-[12px] font-bold transition-colors",
                !onlineActive && selectedBranchId === branch.id
                  ? "border-[#c90f18] bg-[#c90f18] text-white shadow-[0_8px_18px_rgba(201,15,24,0.18)]"
                  : "border-[#c90f18] bg-white text-[#242424] hover:bg-[#fff0f1]",
              ].join(" ")}
            >
              {branch.name}
            </button>
          ))}
          <button
            type="button"
            aria-pressed={onlineActive}
            onClick={() => setOnlineActive(true)}
            className={[
              "h-10 rounded-full border px-6 text-[12px] font-bold transition-colors",
              onlineActive
                ? "border-[#c90f18] bg-[#c90f18] text-white shadow-[0_8px_18px_rgba(201,15,24,0.18)]"
                : "border-[#c90f18] bg-white text-[#242424] hover:bg-[#fff0f1]",
            ].join(" ")}
          >
            Online
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:hidden">
          {(Object.keys(groupedRows) as CourseRow["group"][]).map((group) => (
            <section key={group} className="overflow-hidden rounded-[16px] border border-[#eddede] bg-white shadow-[0_12px_28px_rgba(17,19,21,0.06)]">
              <div className="bg-[#faebec] px-5 py-3 text-[13px] font-bold text-[#8e5d61]">
                {group}
              </div>
              <div className="divide-y divide-[#f0eeee]">
                {groupedRows[group].map((course) => (
                  <article
                    key={`${group}-mobile-${course.level}-${course.teacher}-${course.start}`}
                    className="p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[18px] font-extrabold text-[#242424]">
                          {course.level}
                        </p>
                        <p className="mt-2 text-[14px] font-semibold text-[#333333]">
                          {course.teacher}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[16px] font-extrabold text-[#b91317]">
                          {course.price}
                        </p>
                        <span
                          className={[
                            "mt-2 inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase",
                            statusClass[course.status],
                          ].join(" ")}
                        >
                          {course.status}
                        </span>
                      </div>
                    </div>

                    <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-[13px]">
                      <div>
                        <dt className="font-bold uppercase text-[#9a9a9a]">Textbook</dt>
                        <dd className="mt-1 font-semibold text-[#555555]">{course.textbook}</dd>
                      </div>
                      <div>
                        <dt className="font-bold uppercase text-[#9a9a9a]">Days</dt>
                        <dd className="mt-1 font-semibold text-[#242424]">{course.days}</dd>
                      </div>
                      <div>
                        <dt className="font-bold uppercase text-[#9a9a9a]">Time</dt>
                        <dd className="mt-1 font-semibold text-[#555555]">{course.time}</dd>
                      </div>
                      <div>
                        <dt className="font-bold uppercase text-[#9a9a9a]">Start</dt>
                        <dd className="mt-1 font-semibold text-[#242424]">{course.start}</dd>
                      </div>
                      <div>
                        <dt className="font-bold uppercase text-[#9a9a9a]">End</dt>
                        <dd className="mt-1 font-semibold text-[#242424]">{course.end}</dd>
                      </div>
                    </dl>

                    <button
                      type="button"
                      className="mt-5 h-10 w-full rounded-[8px] border border-[#c90f18] text-[13px] font-bold text-[#c90f18] transition-colors hover:bg-[#c90f18] hover:text-white"
                    >
                      Inquire
                    </button>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 hidden overflow-hidden rounded-[8px] border border-[#eddede] bg-white shadow-[0_18px_50px_rgba(17,19,21,0.06)] sm:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[930px] border-collapse text-left">
              <caption className="sr-only">
                July 2026 course schedule for{" "}
                {onlineActive ? "Online" : selectedBranch?.name} branch
              </caption>
              <thead>
                <tr className="bg-[#b91317] text-white">
                  {["Level", "Teacher", "Textbook", "Days", "Time", "Start", "End", "Price", "Status", "Action"].map(
                    (heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-5 py-4 text-[11px] font-bold uppercase"
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {(Object.keys(groupedRows) as CourseRow["group"][]).map((group) => (
                  <Fragment key={group}>
                    <tr className="bg-[#faebec]">
                      <th
                        scope="rowgroup"
                        colSpan={10}
                        className="px-5 py-3 text-[12px] font-bold text-[#8e5d61]"
                      >
                        {group}
                      </th>
                    </tr>
                    {groupedRows[group].map((course) => (
                      <tr
                        key={`${group}-${course.level}-${course.teacher}-${course.start}`}
                        className="border-t border-[#f0eeee] bg-white"
                      >
                        <td className="px-5 py-5 text-[13px] font-bold text-[#242424]">
                          {course.level}
                        </td>
                        <td className="px-5 py-5 text-[13px] text-[#333333]">
                          {course.teacher}
                        </td>
                        <td className="px-5 py-5 text-[13px] text-[#777777]">
                          {course.textbook}
                        </td>
                        <td className="px-5 py-5 text-[13px] font-semibold text-[#242424]">
                          {course.days}
                        </td>
                        <td className="px-5 py-5 text-[13px] text-[#777777]">
                          {course.time}
                        </td>
                        <td className="px-5 py-5 text-[13px] text-[#242424]">
                          {course.start}
                        </td>
                        <td className="px-5 py-5 text-[13px] text-[#242424]">
                          {course.end}
                        </td>
                        <td className="px-5 py-5 text-[13px] font-extrabold text-[#242424]">
                          {course.price}
                        </td>
                        <td className="px-5 py-5">
                          <span
                            className={[
                              "rounded-full px-3 py-1 text-[10px] font-bold uppercase",
                              statusClass[course.status],
                            ].join(" ")}
                          >
                            {course.status}
                          </span>
                        </td>
                        <td className="px-5 py-5">
                          <button
                            type="button"
                            className="h-8 rounded-[6px] border border-[#c90f18] px-4 text-[11px] font-bold text-[#c90f18] transition-colors hover:bg-[#c90f18] hover:text-white"
                          >
                            Inquire
                          </button>
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
