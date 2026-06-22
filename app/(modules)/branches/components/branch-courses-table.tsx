"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MotionDiv, MotionSection } from "@/app/shared/Motion";
import SectionHeader from "@/app/shared/SectionHeader";
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
    <MotionSection className="w-full bg-white px-4 py-16 sm:px-6 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Schedules"
          title="Browse Courses by Branch"
          description="Select your nearest branch to view the full July 2026 schedule."
        />

        <MotionDiv className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-3">
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
                "h-11 rounded-full border px-6 text-[12px] font-bold shadow-[0_1px_2px_rgba(17,19,21,0.04)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30",
                !onlineActive && selectedBranchId === branch.id
                  ? "border-[#c90f18] bg-[#c90f18] text-white shadow-[0_8px_18px_rgba(201,15,24,0.18)]"
                  : "border-[#eadede] bg-white text-[#242424] hover:border-secondary/50 hover:text-secondary",
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
              "h-11 rounded-full border px-6 text-[12px] font-bold shadow-[0_1px_2px_rgba(17,19,21,0.04)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30",
              onlineActive
                ? "border-[#c90f18] bg-[#c90f18] text-white shadow-[0_8px_18px_rgba(201,15,24,0.18)]"
                : "border-[#eadede] bg-white text-[#242424] hover:border-secondary/50 hover:text-secondary",
            ].join(" ")}
          >
            Online
          </button>
        </MotionDiv>

        <div className="mt-10 flex flex-col gap-4 sm:hidden">
          {(Object.keys(groupedRows) as CourseRow["group"][]).map((group) => (
            <MotionDiv
              key={group}
              className="overflow-hidden rounded-[18px] border border-[#eadede] bg-white shadow-[0_1px_2px_rgba(17,19,21,0.04),0_18px_40px_rgba(17,19,21,0.06)]"
              hoverLift
            >
              <div className="border-b border-[#eadede] bg-white px-5 py-3 text-[13px] font-bold text-secondary">
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

                    {course.status !== "Full" ? (
                      <button
                        type="button"
                        className="mt-5 h-10 w-full rounded-[8px] border border-[#c90f18] text-[13px] font-bold text-[#c90f18] transition-colors hover:bg-[#c90f18] hover:text-white"
                      >
                        Inquire
                      </button>
                    ) : null}
                  </article>
                ))}
              </div>
            </MotionDiv>
          ))}
        </div>

        <MotionDiv className="mt-10 hidden overflow-hidden rounded-[18px] border border-[#eadede] bg-white shadow-[0_1px_2px_rgba(17,19,21,0.04),0_20px_48px_rgba(17,19,21,0.06)] sm:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-separate border-spacing-0 text-left">
              <caption className="sr-only">
                July 2026 course schedule for{" "}
                {onlineActive ? "Online" : selectedBranch?.name} branch
              </caption>
              <thead>
                <tr className="bg-[#b91317] text-white">
                  {[
                    "Level",
                    "Sublevel",
                    "Teacher",
                    "Textbook",
                    "Days",
                    "Time",
                    "Start",
                    "End",
                    "Price",
                    "Status",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className={[
                        "px-5 py-4 text-[11px] font-bold uppercase",
                        heading === "Level" ? "w-[84px] px-3" : "",
                      ].join(" ")}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(Object.keys(groupedRows) as CourseRow["group"][]).map((group, groupIndex) =>
                  groupedRows[group].map((course, index) => (
                    <tr
                      key={`${group}-${course.level}-${course.teacher}-${course.start}`}
                      className="border-t border-[#f0eeee] bg-white"
                    >
                      {index === 0 ? (
                        <td
                          rowSpan={groupedRows[group].length}
                          className={[
                            "h-px w-[84px] border-r border-[#f0eeee] bg-white p-2 align-top",
                            groupIndex > 0 ? "pt-3" : "",
                          ].join(" ")}
                        >
                          <div className="flex h-full min-h-full items-stretch">
                            <div className="flex w-full items-center justify-center rounded-[10px] border border-[#eadede] bg-white px-2 py-5 text-[14px] font-bold text-[#b91317] shadow-[0_1px_2px_rgba(17,19,21,0.04)]">
                              {group}
                            </div>
                          </div>
                        </td>
                      ) : null}
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
                        {course.status !== "Full" ? (
                          <button
                            type="button"
                            className="h-8 rounded-[6px] border border-[#c90f18] px-4 text-[11px] font-bold text-[#c90f18] transition-colors hover:bg-[#c90f18] hover:text-white"
                          >
                            Inquire
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
