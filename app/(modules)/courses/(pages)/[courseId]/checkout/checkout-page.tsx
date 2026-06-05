import { notFound } from "next/navigation";
import Checkout, {
  type CheckoutPaymentPlan,
} from "@/app/shared/Checkout/Checkout";
import { COURSES } from "../../../utils";

type CourseCheckoutPageProps = {
  courseId: string;
};

const COURSE_PRICE = "3,000 EGP";

const coursePaymentPlans: CheckoutPaymentPlan[] = [
  {
    id: "deposit",
    eyebrow: "Deposit",
    title: "Deposit",
    description: "Pay 1,000 EGP Deposit. Reserve your seat now.",
    amount: "1,000 EGP",
    summaryLines: [
      { label: "Course Price", value: COURSE_PRICE },
      { label: "Deposit", value: "1,000 EGP" },
      { label: "Registration Fee", value: "0.00 EGP", free: true },
    ],
    total: "1,000 EGP",
  },
  {
    id: "half",
    title: "50% Payment",
    description: "Pay 50% of course price. Get 1 FREE Event Ticket.",
    ticketLabel: "1x Ticket",
    amount: "1,500 EGP",
    summaryLines: [
      { label: "Course Price", value: COURSE_PRICE },
      { label: "Deposit (50%)", value: "1,500 EGP" },
      { label: "Registration Fee", value: "0.00 EGP", free: true },
      { label: "Event Ticket (x1)", value: "FREE", free: true },
    ],
    total: "1,500 EGP",
  },
  {
    id: "full",
    title: "Full Payment",
    description: "Pay 100% of course price. Get 2 FREE Event Tickets.",
    ticketLabel: "2x Tickets",
    amount: "3,000 EGP",
    bestValue: true,
    summaryLines: [
      { label: "Course Price", value: COURSE_PRICE },
      { label: "Full Payment", value: "3,000 EGP" },
      { label: "Registration Fee", value: "0.00 EGP", free: true },
      { label: "Event Ticket (x2)", value: "FREE", free: true },
    ],
    total: "3,000 EGP",
  },
];

export default function CourseCheckoutPage({ courseId }: CourseCheckoutPageProps) {
  const course = COURSES.find((item) => String(item.id) === courseId);

  if (!course) {
    notFound();
  }

  return (
    <Checkout
      successRoute={`/courses/${course.id}`}
      item={{
        image: "/Iherocource.png",
        title: course.title,
        subtitle: course.badge,
      }}
      summaryLines={coursePaymentPlans[1].summaryLines}
      total={coursePaymentPlans[1].total}
      paymentPlans={coursePaymentPlans}
      defaultPaymentPlanId="half"
    />
  );
}
