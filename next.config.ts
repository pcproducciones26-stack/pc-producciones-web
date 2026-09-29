import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/webmail",
        destination: "https://cpanel161.wnpservers.net:2096/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
