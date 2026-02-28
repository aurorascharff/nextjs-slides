import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['nextjs-slides'],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
