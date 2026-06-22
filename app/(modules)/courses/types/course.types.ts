export type CourseCategory = "Standard" | "Intensive" | "Conversation";
export type CourseBranch = "Maadi" | "Zamalek" | "New Cairo" | "Heliopolis";
export type CourseLevel = "A1-A2" | "B1-B2" | "C1-C2";
export type CourseFormat = "On-site" | "Online";
export type CourseSchedule = "Morning (9:00 - 12:00)" | "Evening (18:00 - 21:00)";
export type DayAbbrev = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export interface CourseItem {
  id: number;
  badge: string;
  price: string;
  priceValue: number;
  title: string;
  description: string;
  duration: string;
  sessions: string;
  days: string;
  daysList: readonly DayAbbrev[];
  category: CourseCategory;
  branch: CourseBranch;
  level: CourseLevel;
  schedules: readonly CourseSchedule[];
  startMonth: string;
  format: CourseFormat;
  recommended?: boolean;
}

export interface CourseFilters {
  selectedDays: DayAbbrev[];
  category: CourseCategory | "all";
  branch: CourseBranch | "all";
  level: CourseLevel | "all";
  schedules: CourseSchedule[];
  startMonth: string | "all";
  format: CourseFormat | "all";
}
