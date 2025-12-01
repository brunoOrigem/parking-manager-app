import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    swcLoader: false,
    forceSwcTransforms: false,
  },
  swcMinify: false,
};

export default nextConfig;
