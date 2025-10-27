import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,

  /* config options here */
  images: {
    remotePatterns: [{ hostname: 'img.clerk.com' }],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
