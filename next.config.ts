import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/kegiatan',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/kegiatan/:id',
        destination: '/news/:id',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ajlsffxxlvnzukevlcna.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
