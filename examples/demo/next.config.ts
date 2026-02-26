import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['nextjs-slides'],
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
