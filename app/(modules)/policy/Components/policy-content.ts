import { POLICY_ROUTES } from "@/app/constants/routes";

export type PolicyNavKey = "privacy" | "terms" | "refund" | "legal";

export type PolicyBulletGroup = {
  label: string;
  items: string[];
};

export type PolicySubsection = {
  title: string;
  body?: string[];
  bullets?: string[];
};

export type PolicyTable = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

export type PolicySectionLink = {
  prefix?: string;
  label: string;
  href: string;
  suffix?: string;
};

export type PolicySection = {
  title: string;
  body?: string[];
  bullets?: string[];
  bulletGroups?: PolicyBulletGroup[];
  subsections?: PolicySubsection[];
  footerBody?: string[];
  table?: PolicyTable;
  links?: PolicySectionLink[];
  variant?: "default" | "warning" | "info";
};

export type PolicyDocumentContent = {
  active: PolicyNavKey;
  eyebrow: string;
  title: string;
  description: string;
  effectiveDate: string;
  sections: PolicySection[];
  highlights: string[];
};

export const POLICY_NAV_ITEMS = [
  {
    key: "privacy" as const,
    label: "Privacy Policy",
    href: POLICY_ROUTES.privacy,
  },
  {
    key: "terms" as const,
    label: "Terms and Conditions",
    href: POLICY_ROUTES.terms,
  },
  {
    key: "refund" as const,
    label: "Refund Policy",
    href: POLICY_ROUTES.refund,
  },
  {
    key: "legal" as const,
    label: "Legal Notice",
    href: POLICY_ROUTES.legal,
  },
];

const contactSection: PolicySection = {
  title: "Contact",
  body: [
    "For questions about these Terms and Conditions, students may contact the Institute using the official contact details below.",
  ],
  bullets: [
    "Email: office@oesterreichisches-sprachzentrum.net",
    "Phone: +201118886758",
    "Address: AL Bergas 7, Garden City, Cairo, Egypt",
  ],
};

const privacyContactSection: PolicySection = {
  title: "Privacy Contact",
  body: [
    "For privacy questions or requests, contact the Institute using the following details:",
  ],
  bullets: [
    "Email: office@oesterreichisches-sprachzentrum.net",
    "Phone: +201118886758",
    "Address: AL Bergas 7, Garden City, Cairo, Egypt",
  ],
};

export const termsContent: PolicyDocumentContent = {
  active: "terms",
  eyebrow: "Austrian Institute in Egypt",
  title: "Terms and Conditions",
  description:
    "By accessing, browsing, registering through, paying through, or using the Austrian Institute website, mobile application, student portal, placement test services, course booking services, online learning services, Paymob online payment services, support services, or related services, you agree to be bound by these Terms and Conditions.",
  effectiveDate: "Current policy",
  highlights: [
    "Enrollment is confirmed only when the required payment is completed and the Operations team approves the seat based on payment status, branch availability, classroom capacity, teacher availability, and course/group availability.",
    "The placement test fee is EGP 300 and is non-refundable once paid.",
    "Deposit payment is EGP 1,000 and is non-refundable under all circumstances.",
  ],
  sections: [
    {
      title: "Acceptance of These Terms",
      body: [
        "By accessing, browsing, registering through, paying through, or using the Austrian Institute website, mobile application, student portal, placement test services, course booking services, online learning services, Paymob online payment services, support services, or related services, you agree to be bound by these Terms and Conditions.",
        "If you do not agree to these Terms, you should not use the platform, book a placement test, register for a course, make payment, or use any student service.",
      ],
    },
    {
      title: "Definitions",
      bullets: [
        "“Institute,” “we,” “us,” and “our” mean Austrian Institute in Egypt and its authorized administrative team.",
        "“Platform” means the website, mobile app, student portal, Odoo LMS, Paymob payment flow, TrueForm assessment tools, support tools, and related digital services.",
        "“Student,” “you,” and “your” mean any person who browses courses, books a placement test, registers for a course, pays a fee, attends a class, or uses Institute services.",
        "“Course” means any German language course, group class, mini group, private session, SprachCafé activity, or approved learning program offered by the Institute.",
        "“Operations team” means the team responsible for confirming course assignment, payment status, group availability, schedule, branch capacity, and seat confirmation.",
      ],
    },
    {
      title: "Nature of the Services",
      body: [
        "The Institute provides German language learning services through branch-based classes, online learning options, placement testing, course registration, attendance tracking, assignments, assessments, support services, certificates, and related student services.",
        "The platform supports the student learning journey, but it does not guarantee a specific academic result, exam result, certificate eligibility, or future admission outcome unless expressly stated in writing by the Institute.",
      ],
    },
    {
      title: "Student Information and Documents",
      body: [
        "Students must provide accurate, complete, and current information when using the platform, registering for courses, completing their profile, uploading documents, booking placement tests, paying fees, requesting certificates, or submitting support requests.",
        "The Institute may request a passport screenshot, National ID screenshot, and supporting certificate documents where applicable. The name used for certificates must match the student passport or official identity document.",
        "Name and passport details may become read-only after first submission. If the student requests a later correction to name or passport details, an administrative fee may apply. The certificate name-change request fee is EGP 300 and is non-refundable once submitted.",
      ],
    },
    {
      title: "Placement Test Rules",
      body: [
        "If a student does not know their German level, they should book a placement test. A1.1 students do not require a placement test unless they choose to take one for practice or the Institute requests it for a specific case.",
        "The placement test fee is EGP 300 and is non-refundable once paid.",
        "Placement test payment unlocks one official placement test attempt. Before starting the official test, the student may see a short preview or trial step to understand the test format and technical requirements. The preview is not an official attempt.",
        "Once the official test starts, the student must follow the test rules and technical instructions shown on the platform. The Institute may reject, cancel, or require review of any test attempt if misuse, cheating, impersonation, technical manipulation, or false information is detected.",
      ],
    },
    {
      title: "Course Booking and Enrollment Confirmation",
      body: [
        "Students may browse available courses and select a course based on level, branch, schedule, and availability. Course booking, payment initiation, or deposit payment does not automatically confirm enrollment.",
        "Enrollment is confirmed only when the required payment is completed and the Operations team approves the seat based on payment status, branch availability, classroom capacity, teacher availability, and course/group availability.",
        "Deposit payment does not confirm enrollment. Unpaid or deposit-only students may not attend the first session until payment and approval requirements are completed.",
        "If a selected course is full, unavailable, postponed, or unsuitable for the student level, the Institute may offer an alternative schedule, alternative branch, online option, waiting list, or next available course.",
      ],
    },
    {
      title: "Fees, Payments, and Paymob",
      body: [
        "Students may pay for placement tests, courses, deposits, partial course payments, books, e-books, private sessions, extra sessions, hardcopy certificates, certificate name corrections, and other approved services.",
        "Online payments may be processed through Paymob. The platform does not store full card details. Students must review the service, payment amount, refund policy, and relevant terms before completing payment.",
        "A payment confirmation does not exceed academic, capacity, eligibility, or Operations approval requirements.",
      ],
    },
    {
      title: "Course Fees, Deposits, and Promotional Benefits",
      body: [
        "The standard course price is EGP 3,000 unless a different price is shown for a specific course or segment.",
        "Deposit payment is EGP 1,000 and is non-refundable under all circumstances.",
        "A 50% course payment of EGP 1,500 may include 1 complimentary SprachCafé ticket, subject to availability and Institute policy.",
        "A full course payment of EGP 3,000 may include 2 complimentary SprachCafé tickets, subject to availability and Institute policy.",
        "Complimentary SprachCafé tickets are promotional benefits. They are not exchangeable for cash and may be subject to validity, booking, schedule, or availability rules.",
      ],
    },
    {
      title: "Cancellation and Refund Rules",
      body: [
        "If the student cancels the enrollment within 3 days before the course start date, a 100% deduction will apply. The student will not be eligible for a refund or enrollment transfer.",
        "If the student cancels the enrollment from 3 to 5 days before the course start date, a 40% deduction will apply. The student will receive a 60% refund or may request to transfer the enrollment to another available course date, subject to availability.",
      ],
      subsections: [
        {
          title: "Transfer to a Future Course After Approved 3–5 Day Request",
          body: [
            "If a student requests a transfer to a future course within the period of 3 to 5 days before the course start date, and the transfer is approved under the applicable refund policy, the student acknowledges and agrees to the following:",
          ],
          bullets: [
            "Only one transfer is permitted after the original reservation.",
            "If operational adjustments, scheduling changes, course cancellations, or course consolidations occur, the student agrees to comply with the alternative course dates or arrangements provided by the Institute.",
            "Any subsequent transfer requests, cancellations, postponements, or schedule modifications initiated by the student after the approved transfer will not be permitted.",
            "The transferred registration becomes final and non-transferable after the first approved transfer.",
          ],
        },
      ],
      footerBody: [
        "If the student cancels the enrollment more than 5 days before the course start date, the student is eligible to receive a full refund of the course fee. However, an administrative transfer fee of EGP 100 will be deducted when processing the refund.",
        "If the Institute cancels or postpones the course, the student may choose either to receive a full refund or transfer the enrollment to another available course date without any additional fees.",
      ],
    },
    {
      title: "Attendance, Assessments, and Certificate Eligibility",
      body: [
        "Students must follow the attendance and assessment requirements for their course. Certificate eligibility may depend on attendance, final test completion, assignments, required satisfaction surveys, payment status, and compliance with Institute policies.",
        "A student who exceeds the allowed absence limit may become ineligible for a certificate unless an authorized exception is approved.",
        "Assignments, quizzes, speaking tasks, writing tasks, final tests, and production assessments may be required. Some assessments may be corrected automatically, while production assessments may require teacher review.",
      ],
    },
    {
      title: "Certificates",
      body: [
        "Certificates may be issued after the student completes the required learning journey and satisfies Institute requirements. Certificates may be available with or without a student photo.",
        "Hardcopy certificates may require branch collection and additional payment. The certificate must match the official identity or passport name submitted by the student.",
        "Certificate name-change requests cost EGP 300 and are non-refundable once submitted.",
      ],
    },
    {
      title: "Student Conduct and Platform Use",
      body: [
        "Students must use the platform lawfully, respectfully, and only for the intended learning and administrative purposes.",
        "Students must not share login credentials or session links, impersonate another person, upload false documents, copy or resell learning materials, bypass test controls, misuse support channels, harass teachers or staff, or interfere with platform security.",
        "The Institute may restrict access, cancel participation, require review, or take appropriate action if misuse, cheating, false data, or policy violation is detected.",
      ],
    },
    {
      title: "Learning Materials and Intellectual Property",
      body: [
        "Course materials, placement tests, assessments, quizzes, texts, designs, logos, lesson content, recordings, and software are owned by the Institute or its licensed partners.",
        "Students receive a limited, personal, non-transferable right to use materials for their own learning only. Students may not copy, distribute, publish, sell, upload, record, or share Institute materials unless expressly allowed in writing.",
      ],
    },
    {
      title: "Third-Party Services and Technical Availability",
      body: [
        "The platform may use third-party services, including Paymob for payment processing, Odoo for operations and LMS records, TrueForm for assessments, hosting providers, email tools, and notification tools.",
        "The Institute uses reasonable efforts to keep the platform available and secure, but it does not guarantee uninterrupted availability, error-free operation, immediate delivery of messages, or compatibility with every device, network, or browser.",
      ],
    },
    {
      title: "Policy Updates",
      body: [
        "The Institute may update these Terms and Policies from time to time. Updated policies may be shared through the website, mobile app, email, printed notice, or another reasonable method.",
        "Continued use of Institute services after updated policies are published may be treated as acceptance of the updated policies.",
      ],
    },
    contactSection,
    {
      title: "Student Acceptance Statement",
      body: [
        "By signing, paying, booking, or continuing to use Institute services, I confirm that I have read, understood, and accepted these Terms and Conditions. I understand that payment, placement, attendance, certificate eligibility, refunds, and course enrollment are subject to the Institute policies described above.",
      ],
    },
  ],
};

export const refundContent: PolicyDocumentContent = {
  active: "refund",
  eyebrow: "Austrian Institute in Egypt",
  title: "Refund Policy",
  description:
    "This Refund Policy applies to placement test fees, course fees, deposits, partial payments, books, digital materials, private sessions, extra sessions, hardcopy certificates, certificate name-change requests, and other approved services provided by the Institute.",
  effectiveDate: "Current policy",
  highlights: [
    "The placement test fee is EGP 300. The placement test fee is non-refundable once paid.",
    "Course cancellation, refund, and transfer eligibility depend on the timing of the request before the course start date:",
    "Once the course has started, meaning after the first session has been held, the course fee is non-refundable.",
  ],
  sections: [
    {
      title: "Scope of This Policy",
      body: [
        "This Refund Policy applies to placement test fees, course fees, deposits, partial payments, books, digital materials, private sessions, extra sessions, hardcopy certificates, certificate name-change requests, and other approved services provided by the Institute.",
      ],
    },
    {
      title: "Placement Test Fee",
      variant: "warning",
      body: [
        "The placement test fee is EGP 300. The placement test fee is non-refundable once paid. If a student cannot access the test due to a verified technical issue from the Institute side, the Institute may review the case and provide support or an appropriate solution.",
      ],
    },
    {
      title: "Course Cancellation Before the First Session",
      body: [
        "Course cancellation, refund, and transfer eligibility depend on the timing of the request before the course start date:",
      ],
      bullets: [
        "Student cancellation within 3 days before the course start date: 100% deduction; no refund and no transfer allowed.",
        "Student cancellation or transfer request from 3 to 5 days before the course start date: 40% deduction; the student may receive a 60% refund or request an approved transfer to a future course, subject to availability and Institute approval.",
        "Student cancellation more than 5 days before the course start date: full refund of the course fee; an administrative bank-transfer fee of EGP 100 may be deducted when processing the refund, or the student may transfer to another course without additional fees.",
        "Course cancellation or postponement by the Institute: full refund or transfer to another available course date without any additional fees.",
      ],
      subsections: [
        {
          title: "Transfer to a Future Course After Approved 3–5 Day Request",
          body: [
            "If a student requests a transfer to a future course within the period of 3 to 5 days before the course start date, and the transfer is approved under the applicable refund policy, the student acknowledges and agrees to the following:",
          ],
          bullets: [
            "Only one transfer is permitted after the original reservation.",
            "If operational adjustments, scheduling changes, course cancellations, or course consolidations occur, the student agrees to comply with the alternative course dates or arrangements provided by the Institute.",
            "Any subsequent transfer requests, cancellations, postponements, or schedule modifications initiated by the student after the approved transfer will not be permitted.",
            "The transferred registration becomes final and non-transferable after the first approved transfer.",
          ],
        },
      ],
    },
    {
      title: "After the Course Starts",
      variant: "warning",
      body: [
        "Once the course has started, meaning after the first session has been held, the course fee is non-refundable.",
        "In exceptional circumstances, such as a serious medical emergency or confirmed relocation outside Egypt supported by official documentation, the Institute may offer course credit or transfer at management discretion. A cash refund is not guaranteed in mid-course cases.",
      ],
    },
    {
      title: "Deposits and Partial Payments",
      variant: "warning",
      body: [
        "Deposit payments are non-refundable under all circumstances. Deposit payment does not confirm enrollment.",
        "Partial payments are reviewed according to the payment status, cancellation timing, course start date, and approved finance policy.",
      ],
    },
    {
      title: "Books, Materials, Certificates, and Name Changes",
      body: [
        "Refunds for books, e-books, digital materials, private sessions, correction services, or hardcopy certificates depend on whether the item or service has already been delivered, accessed, printed, scheduled, or processed.",
        "Certificate name-change request fees are EGP 300 and are non-refundable once submitted.",
      ],
    },
    {
      title: "Refund Request Process",
      variant: "info",
      body: [
        "To request a refund, the student must submit the request through the official support channel or contact the Institute using the official contact details.",
        "The refund request should include the student name, registered email, phone number, course or service name, payment reference, cancellation date, reason for request, and supporting documents where applicable.",
        "Approved refunds are processed through the original payment method where possible and are subject to bank or payment gateway processing timelines. Bank or payment gateway fees may apply where relevant.",
      ],
    },
  ],
};

export const privacyContent: PolicyDocumentContent = {
  active: "privacy",
  eyebrow: "Austrian Institute in Egypt",
  title: "Privacy Policy",
  description:
    "This Privacy Policy explains how the Institute collects, uses, shares, stores, and protects student information when students use the website, mobile app, student portal, placement test services, course booking services, Paymob online payment services, support services, and related digital services.",
  effectiveDate: "Current policy",
  highlights: [
    "The Institute may collect student information needed to provide educational and payment services.",
    "Payments may be processed through Paymob. The platform should not store full card details.",
    "Students may request access to, correct, or review of their personal information, subject to academic, payment, certificate, legal, finance, and operational record requirements.",
  ],
  sections: [
    {
      title: "Scope of This Privacy Policy",
      body: [
        "This Privacy Policy explains how the Institute collects, uses, shares, stores, and protects student information when students use the website, mobile app, student portal, placement test services, course booking services, Paymob online payment services, support services, and related digital services.",
      ],
    },
    {
      title: "Information We Collect",
      body: [
        "The Institute may collect student information needed to provide educational and payment services.",
        "Account and contact data: name, phone number, email address, city, country, date of birth, language preference, and account details.",
        "Student profile data: passport screenshot, National ID screenshot, Goethe-Institut certificate where applicable, branch, course level, group, schedule, and emergency contact where required.",
        "Learning and assessment data: placement test data, level result, assignments, quizzes, speaking tasks, writing tasks, grades, attendance records, teacher feedback, and certificate eligibility status.",
        "Payment data: payment status, transaction reference, deposit status, partial payment status, refund status, and billing-related information processed by Paymob or approved payment channels.",
        "Support and communication data: support requests, complaints, retest requests, payment issues, schedule issues, chat/group communication data where enabled, and service notifications.",
        "Technical data: device type, browser type, IP address, log data, app version, crash data, cookies, permissions, and usage interactions where needed for platform operation and security.",
      ],
    },
    {
      title: "How We Use Information",
      body: [
        "Student information may be used to create and manage student records, register students in courses, validate level and placement results, process payments, manage attendance, deliver assignments and assessments, issue certificates, provide support, send required service notifications, improve service quality, secure the platform, prevent fraud, and prepare academic or operational reports.",
      ],
    },
    {
      title: "Payment Data and Paymob",
      body: [
        "Payments may be processed through Paymob. The platform should not store full card details. Payment data is used to confirm transaction status, update student payment records, issue payment confirmations, support refund review, and manage enrollment approval where applicable.",
      ],
    },
    {
      title: "How Information May Be Shared",
      body: [
        "Student data may be shared only where needed to deliver services, operate systems, process payments, provide support, comply with law, or protect the platform and students.",
      ],
      bullets: [
        "With Odoo and internal systems for course, payment, attendance, and operational records.",
        "With TrueForm or approved assessment tools for placement tests, quizzes, assignments, and assessments.",
        "With Paymob or approved payment processors for online payment processing.",
        "With hosting, email, notification, security, analytics, and support providers under appropriate safeguards.",
        "With authorized Institute staff, teachers, operations, finance, and management users according to role and service need.",
      ],
    },
    {
      title: "Marketing and Promotional Communications",
      body: [
        "Required service messages may include payment confirmations, failed payment alerts, placement test access messages, course enrollment status, schedule updates, session cancellation updates, assignment reminders, certificate eligibility updates, support ticket updates, and policy updates.",
        "Marketing and promotional communications, such as course offers, event promotions, SprachCafé announcements, community updates, TestDaF promotions, blog/news updates, campaigns, or partner announcements, are optional and subject to approved consent and Institute policy. Opting out of marketing does not stop required service messages.",
      ],
    },
    {
      title: "Security",
      body: [
        "The Institute uses reasonable administrative, technical, and organizational safeguards to protect student information. These may include access controls, authentication, secure system configuration, audit logs, vendor controls, and secure communication methods where applicable.",
        "No system is completely secure. Students are responsible for protecting their login credentials, devices, email accounts, and network connections.",
      ],
    },
    {
      title: "Data Retention",
      body: [
        "Student information may be retained for as long as needed to provide services, manage academic records, verify certificates, process payments, resolve disputes, comply with legal or finance requirements, maintain security, and meet operational or audit requirements.",
      ],
    },
    {
      title: "Student Privacy Rights",
      body: [
        "Students may request access to, correct, or review of their personal information, subject to academic, payment, certificate, legal, finance, and operational record requirements.",
        "Some information may not be deleted immediately if retention is required for financial records, certificate verification, legal compliance, dispute resolution, or security reasons.",
      ],
    },
    {
      title: "Cookies, Device Permissions, and Notifications",
      body: [
        "The platform may use cookies, SDKs, or similar technologies for login, security, preferences, analytics, performance, error reporting, and service improvement.",
        "The mobile app may request permissions such as notifications, camera, microphone, photos, or files where needed for student services, placement tests, uploads, support, or learning features. Disabling permissions may limit functionality.",
      ],
    },
    {
      title: "Changes to This Privacy Policy",
      body: [
        "The Institute may update this Privacy Policy from time to time. Material changes may be communicated through the platform, email, printed notice, or another reasonable method.",
      ],
    },
    privacyContactSection,
    {
      title: "Privacy Consent Statement",
      body: [
        "By signing, paying, booking, or continuing to use Institute services, I confirm that I have read and understood this Privacy Policy. I understand that my information may be processed to provide educational services, payment services, support, assessment, attendance, certificates, and required service communications.",
      ],
    },
  ],
};

export const legalNoticeContent: PolicyDocumentContent = {
  active: "legal",
  eyebrow: "Austrian Institute in Egypt",
  title: "Legal Notice",
  description:
    "Official identification, service scope, payment-processing notice, intellectual-property terms, and Institute contact details.",
  effectiveDate: "Current policy",
  highlights: [
    "Services are provided by Austrian Institute in Egypt and its authorized administrative team.",
    "Institute materials and assessments are owned by the Institute or licensed partners.",
    "Questions should be directed to the official Institute contact channels.",
  ],
  sections: [
    {
      title: "Institute Identification",
      body: [
        "Institute, we, us, and our mean Austrian Institute in Egypt and its authorized administrative team.",
        "Platform means the website, mobile app, student portal, Odoo LMS, Paymob payment flow, TrueForm assessment tools, support tools, and related digital services.",
      ],
    },
    {
      title: "Service Scope",
      body: [
        "The Institute provides German language learning services through branch-based classes, online learning options, placement testing, course registration, attendance tracking, assignments, assessments, support services, certificates, and related student services.",
        "The platform supports the student learning journey, but it does not guarantee a specific academic result, exam result, certificate eligibility, or future admission outcome unless expressly stated in writing by the Institute.",
      ],
    },
    {
      title: "Operations Approval",
      body: [
        "Enrollment is confirmed only when the required payment is completed and the Operations team approves the seat based on payment status, branch availability, classroom capacity, teacher availability, and course/group availability.",
        "A payment confirmation does not exceed academic, capacity, eligibility, or Operations approval requirements.",
      ],
    },
    {
      title: "Intellectual Property",
      body: [
        "Course materials, placement tests, assessments, quizzes, texts, designs, logos, lesson content, recordings, and software are owned by the Institute or its licensed partners.",
        "Students receive a limited, personal, non-transferable right to use materials for their own learning only. Students may not copy, distribute, publish, sell, upload, record, or share Institute materials unless expressly allowed in writing.",
      ],
    },
    {
      title: "Technical Availability",
      body: [
        "The Institute uses reasonable efforts to keep the platform available and secure, but it does not guarantee uninterrupted availability, error-free operation, immediate delivery of messages, or compatibility with every device, network, or browser.",
      ],
    },
  ],
};
