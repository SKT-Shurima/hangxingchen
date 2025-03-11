import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

// Declare the process variable to fix TypeScript error
declare const process: {
  env: {
    NEXT_PUBLIC_BASE_PATH?: string;
    [key: string]: string | undefined;
  };
};

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx', 'js', 'jsx'],
  output: 'export',
  distDir: 'dist',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true,
    remotePatterns: [
    ],
    path: '',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})
export default withMDX(nextConfig)
