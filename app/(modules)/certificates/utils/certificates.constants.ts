import {
  Award,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  Globe2,
  Handshake,
  type LucideIcon,
} from "lucide-react";

export interface CertificationItem {
  name: string;
  subtitle: string;
  logo: string;
  category: string;
  categoryTone: string;
  descriptionTitle: string;
  description: string;
}

export interface TimelineStep {
  number: number;
  title: string;
  description: string;
}

export interface BenefitItem {
  Icon: LucideIcon;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const CERTIFICATION_STATS = [
  {
    Icon: Globe2,
    value: "100+",
    label: "Countries Represented",
  },
  {
    Icon: Handshake,
    value: "1,000+",
    label: "Global Partners",
  },
] as const;

export const CERTIFICATIONS: CertificationItem[] = [
  {
    name: "TestDaF",
    subtitle: "Test Deutsch als Fremdsprache",
    logo: "/TestDaF_logo_icon_only.svg",
    category: "Language Proficiency",
    categoryTone: "bg-[#e9f4ff] text-[#1e6fac]",
    descriptionTitle: "Test Deutsch als Fremdsprache",
    description:
      "The central language exam for foreign students who want to study at a German university.",
  },
  {
    name: "TestAS",
    subtitle: "Test fur Auslandische Studierende",
    logo: "/TestAS_logo_icon_only.svg",
    category: "Aptitude Test",
    categoryTone: "bg-[#fff3dd] text-[#c57909]",
    descriptionTitle: "Test fur Auslandische Studierende",
    description:
      "Assesses your cognitive abilities for your chosen field of study at German universities.",
  },
  {
    name: "onSET",
    subtitle: "Online-Spracheinstufungstest",
    logo: "/OnSET_logo_icon_only.svg",
    category: "Placement",
    categoryTone: "bg-[#e9f4ff] text-[#1e6fac]",
    descriptionTitle: "onSET",
    description:
      "A fast, online language assessment tool to determine your current German or English level.",
  },
  {
    name: "dMAT",
    subtitle: "Digitaler Mastertest",
    logo: "/Clip_path_group_icon_only.svg",
    category: "Masters Entry",
    categoryTone: "bg-[#fff3dd] text-[#a66a13]",
    descriptionTitle: "dMAT",
    description:
      "Specifically designed for students planning to pursue Master's programs in Germany.",
  },
];

export const CERTIFICATION_STEPS: TimelineStep[] = [
  {
    number: 1,
    title: "Register",
    description: "Sign up online via our official portal for your desired date.",
  },
  {
    number: 2,
    title: "Prepare",
    description:
      "Attend our specialized preparation courses and mock exams.",
  },
  {
    number: 3,
    title: "Take the Test",
    description: "Sit for the exam at our state-of-the-art testing facility.",
  },
  {
    number: 4,
    title: "Get Certificate",
    description:
      "Receive your globally recognized digital and physical results.",
  },
];

export const CERTIFICATION_BENEFITS: BenefitItem[] = [
  {
    Icon: Award,
    title: "Official Licensed Center",
    description:
      "As a partner of g.a.s.t., we provide authorized certificates accepted by all German universities.",
  },
  {
    Icon: CalendarDays,
    title: "Multiple Test Dates",
    description:
      "We offer testing sessions throughout the year to align perfectly with your university application deadlines.",
  },
  {
    Icon: BookOpen,
    title: "Preparation Support",
    description:
      "Exclusive access to practice materials and teacher-led workshops designed to maximize your score.",
  },
];

export const CERTIFICATION_FAQS: FaqItem[] = [
  {
    question: "Who needs to take the TestDaF?",
    answer:
      "Any non-native German speaker intending to study a German-taught program at a university in Germany must provide proof of sufficient language skills, with TestDaF being the most recognized standard.",
  },
  {
    question: "Can I take TestAS in English?",
    answer:
      "Yes. TestAS can be taken in German or English, depending on the requirements of your target university and study program.",
  },
  {
    question: "How long is my certificate valid?",
    answer:
      "TestDaF certificates do not expire, but individual universities may define their own recency requirements for applications.",
  },
  {
    question: "What is the retake policy?",
    answer:
      "You can retake the exams, but registration windows, available seats, and official waiting periods depend on the selected exam type.",
  },
];

export const LICENSED_CENTER_ICON = BadgeCheck;
