import {
  Globe2,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type CareerRole = "Academic" | "Professional" | "Operations";
export type CareerJobType = "Full Time" | "Part Time" | "Project Based";

export interface CareerJob {
  id: string;
  role: CareerRole;
  title: string;
  description: string;
  type: CareerJobType;
  branch: "Garden City" | "Heliopolis" | "Alexandria";
  salary: string;
}

export interface CareerBenefit {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export interface ApplicationStep {
  number: string;
  title: string;
  description: string;
}

export const CAREER_JOBS: CareerJob[] = [
  {
    id: "german-instructor-a1-a2",
    role: "Academic",
    title: "German Instructor - A1-A2 Levels",
    description:
      "Join our prestigious academic team. You will be responsible for guiding beginner students through their initial language acquisition phases with engaging lessons.",
    type: "Full Time",
    branch: "Garden City",
    salary: "3,200 - 3,800 EGP",
  },
  {
    id: "senior-german-instructor-b1-c1",
    role: "Professional",
    title: "Senior German Instructor - B1-C1 Levels",
    description:
      "Expert role for seasoned educators. Focus on advanced business German and university preparation for international professionals working in German-speaking contexts.",
    type: "Full Time",
    branch: "Heliopolis",
    salary: "4,500 - 5,500 EGP",
  },
  {
    id: "customer-relations-officer",
    role: "Operations",
    title: "Customer Relations Officer",
    description:
      "Be the face of our institute. You will handle student inquiries, registration processes, and provide high-quality support for our diverse community.",
    type: "Part Time",
    branch: "Heliopolis",
    salary: "2,800 - 3,200 EGP",
  },
  {
    id: "examination-specialist",
    role: "Academic",
    title: "Examination Specialist",
    description:
      "Responsible for coordinating and supervising official OSD and TestDaF examinations. Attention to detail and adherence to strict academic protocols are essential.",
    type: "Project Based",
    branch: "Alexandria",
    salary: "Competitive",
  },
  {
    id: "marketing-coordinator",
    role: "Professional",
    title: "Marketing Coordinator",
    description:
      "Develop campaigns to promote our German language programs. Focus on digital outreach and partnerships with Egyptian universities.",
    type: "Full Time",
    branch: "Garden City",
    salary: "4,000 - 5,000 EGP",
  },
  {
    id: "pedagogical-consultant",
    role: "Academic",
    title: "Pedagogical Consultant",
    description:
      "Ensure high educational standards across all levels. Provide training to staff and maintain curriculum alignment with Austrian standards.",
    type: "Full Time",
    branch: "Alexandria",
    salary: "6,000+ EGP",
  },
];

export const CAREER_BENEFITS: CareerBenefit[] = [
  {
    title: "Cultural Environment",
    description:
      "Work in a bridge between Egyptian and Austrian cultures. Engage with diverse viewpoints and contribute to international understanding through language.",
    Icon: Globe2,
  },
  {
    title: "Career Growth",
    description:
      "Regular workshops, internal training programs, and clear pathways to seniority.",
    Icon: TrendingUp,
  },
  {
    title: "Official Recognition",
    description:
      "Join an institution recognized by the Austrian Ministry of Education.",
    Icon: ShieldCheck,
  },
];

export const APPLICATION_STEPS: ApplicationStep[] = [
  {
    number: "1",
    title: "Browse Roles",
    description:
      "Explore open positions that match your expertise and passion.",
  },
  {
    number: "2",
    title: "Submit Application",
    description:
      "Share your CV and professional background via our online form.",
  },
  {
    number: "3",
    title: "The Interview",
    description:
      "Meet our academic directors and discuss your pedagogical approach.",
  },
  {
    number: "4",
    title: "Join the Team",
    description:
      "Welcome to the Osterreich Institut family. Orientation begins.",
  },
];

export const CAREER_ROLE_FILTERS = [
  "All Roles",
  "Academic",
  "Professional",
  "Operations",
] as const;
export const CAREER_BRANCH_FILTERS = [
  "All Branches",
  "Garden City",
  "Heliopolis",
  "Alexandria",
] as const;
export const CAREER_TYPE_FILTERS = [
  "Job Type",
  "Full Time",
  "Part Time",
  "Project Based",
] as const;
