export const HOME_ROUTE = "/";

export const WEBSITE_ROUTES = {
  about: "/about",
  blogs: "/blogs",
  branches: "/branches",
  careers: "/careers",
  certificates: "/certificates",
  contact: "/contact",
  courses: "/courses",
  events: "/events",
  placementTest: "/placement-test",
} as const;

export const AUTH_ROUTES = {
  root: "/auth",
  login: "/auth/login",
  signup: "/auth/signup",
  forgetPassword: "/auth/forget-password",
  resetPassword: "/auth/reset-password",
  getReady: "/auth/get-ready",
} as const;

export const POLICY_ROUTES = {
  privacy: "/policy/privacy-policy",
  terms: "/policy/terms-of-service",
  refund: "/policy/refund-policy",
  legal: "/policy/legal-notice",
} as const;

export const PLACEMENT_TEST_ROUTES = {
  landing: "/placement-test",
  checkout: "/placement-test/checkout",
  training: "/placement-test/training",
  trainingMcqPractice: "/placement-test/training/mcq-practice",
} as const;
