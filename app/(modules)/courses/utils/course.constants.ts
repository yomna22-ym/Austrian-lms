export const COURSE_LEVEL_FILTERS = ["All", "A1-A2", "B1-B2", "C1-C2"] as const;

export const COURSE_MONTHS = [
  "Jan",
  "Feb",
  "Apr",
  "Mar",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export const COURSE_FORMATS = ["All", "On-site", "Online"] as const;

export const COURSES = Array.from({ length: 9 }, (_, index) => ({
  id: index + 1,
  badge: "A1.1 Beginner",
  price: "800 EGP",
  title: "German Foundation",
  description:
    "Start your journey with basic phrases and essential grammar for daily life in Austria.",
  duration: "8 Weeks | Start: Oct 15",
  sessions: "24 Sessions (90 min each)",
  days: "Mon & Wed",
}));

export const COURSE_DETAIL = {
  id: 1,
  breadcrumbTitle: "German Foundation (A1.1)",
  badge: "A1.1 Beginner",
  title: "German Foundation",
  subtitle:
    "Master the essentials of the German language in a structured, immersive environment.",
  price: "800 EGP",
  priceNote: "/ total",
  taxNote: "VAT Included",
  seatsLeft: "12 Seats Left",
  features: ["Beginner Friendly", "Certificate Included", "Native Instructors"],
  stats: [
    { label: "Duration", value: "8 Weeks" },
    { label: "Sessions", value: "24 Sessions" },
    { label: "Format", value: "In-person" },
    { label: "Class Size", value: "Max 12 students" },
  ],
  booking: [
    {
      title: "Starts Oct 15, 2024",
      description: "Enrollment ends Oct 10",
    },
    {
      title: "Mon & Wed, 18:00",
      description: "2.5 hours per session",
    },
    {
      title: "Zamalek Branch",
      description: "Classroom 402",
    },
  ],
  about:
    "Our German Foundation (A1.1) course is designed for absolute beginners who wish to embark on their journey with the German language. We follow the Common European Framework of Reference for Languages (CEFR), ensuring that you receive a globally recognized standard of education. This intensive program focuses on practical communication skills, allowing you to handle everyday situations in a German-speaking environment. From introducing yourself to navigating public transport, you will build a solid foundation in grammar, vocabulary, and pronunciation.",
  learningOutcomes: [
    {
      title: "Real Conversations",
      description:
        "Practice dialogues for everyday situations like shopping and dining.",
    },
    {
      title: "Grammar Foundations",
      description: "Understand sentence structure and essential verb conjugations.",
    },
    {
      title: "Official Certificate",
      description:
        "Earn a course completion certificate recognized by EU institutions.",
    },
  ],
  curriculum: [
    "Week 1-2: Introductions & The Basics",
    "Week 3-4: Daily Life & Time",
  ],
  details: [
    { label: "Start Date", value: "October 15, 2024" },
    { label: "End Date", value: "December 10, 2024" },
    { label: "Schedule", value: "Mon & Wed, 18:00 - 20:30" },
    { label: "Location", value: "Central Cairo Branch (Zamalek)" },
  ],
  faqs: [
    "Do I need any prior knowledge?",
    "Is the course book included in the price?",
  ],
};

export const RELATED_COURSES = [
  {
    id: 2,
    image: "/blog1.png",
    badge: "A1.2 Intermediate",
    title: "German Intensive A1.2",
    price: "950 EGP",
  },
  {
    id: 3,
    image: "/event.png",
    badge: "B1.1 Advanced",
    title: "Conversational German",
    price: "1,200 EGP",
  },
  {
    id: 4,
    image: "/hero.jpg",
    badge: "B2 Business",
    title: "Business German Basics",
    price: "1,500 EGP",
  },
];
