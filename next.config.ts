import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    // Local development: proxy to localhost backend
    // Production (Vercel): set NEXT_PUBLIC_BACKEND_URL env var
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'
    
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ]
  },
}

export default nextConfig;
