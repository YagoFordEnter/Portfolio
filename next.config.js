/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'cdn.jsdelivr.net'],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
