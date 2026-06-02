export const HOME_ROUTE = "/modules/website/home";

export const AUTH_ROUTES = {
  login: "/modules/website/auth/pages/login",
  signup: "/modules/website/auth/pages/signup",
  forgetPassword: "/modules/website/auth/pages/forget-password",
  resetPassword: "/modules/website/auth/pages/reset-password",
  getReady: "/modules/website/auth/pages/get-ready",
} as const;

export const WEBSITE_ROUTES = {
  courses: "/modules/website/courses",
  placementTest: "/modules/website/placement-test",
} as const;
