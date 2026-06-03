import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
