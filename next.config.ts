import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow HMR when the app is opened via 127.0.0.1 instead of localhost
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [
      { source: "/modules/website/home", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      {
        source: "/modules/website/auth/pages/:path*",
        destination: "/auth/:path*",
        permanent: true,
      },
      {
        source: "/modules/website/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
