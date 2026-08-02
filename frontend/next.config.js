/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL ||
      (process.env.NODE_ENV === 'production'
        ? 'https://realestate-backend-73kq77eo7q-el.a.run.app'
        : 'http://localhost:3001'),
    NEXT_PUBLIC_GRAPHQL_URL:
      process.env.NEXT_PUBLIC_GRAPHQL_URL ||
      (process.env.NODE_ENV === 'production'
        ? 'https://realestate-backend-73kq77eo7q-el.a.run.app/graphql'
        : 'http://localhost:3001/graphql'),
    NEXT_PUBLIC_GEO_SERVICE_URL:
      process.env.NEXT_PUBLIC_GEO_SERVICE_URL || 'http://localhost:8001',
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  },
  webpack: (config, options) => {
    if (!options.dev) {
      config.optimization.minimize = true;
    }
    return config;
  },
};

module.exports = nextConfig;
