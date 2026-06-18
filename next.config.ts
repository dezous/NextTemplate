import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // sassOptions: {
  //   includePaths: ["app/_styles"],
  // },

  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80, 90, 100],
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error', 'warn'] }
        : false,
  },

  allowedDevOrigins: ['192.168.1.103'],
}

export default nextConfig
