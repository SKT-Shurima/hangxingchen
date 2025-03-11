import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx', 'js', 'jsx'],
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: 'cdn.sanity.io',
      },
      {
        hostname: 'mp.weixin.qq.com',
      },
    ],
  },
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})
export default withMDX(nextConfig)
