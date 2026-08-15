/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  async redirects() {
    return [
      { source: '/register-recruiter', destination: '/', permanent: false },
      { source: '/recruit', destination: '/', permanent: false },
      { source: '/recruiter', destination: '/dashboard', permanent: false },
      { source: '/forgot-password', destination: '/login', permanent: false },
      { source: '/reset-password', destination: '/login', permanent: false },
    ];
  },
};

module.exports = nextConfig;
