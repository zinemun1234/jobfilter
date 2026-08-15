/** @type {import('next').NextConfig} */
const nextConfig = {
  // Windows 로컬 build 시 Prisma custom output + webpack glob이
  // C:\Users\<user>\Application Data 등 보호된 junction을 스캔하며
  // EPERM 오류를 일으키는 문제를 회피하기 위한 로컬 workaround
  // (Next.js 14.2.5, Vercel 배포 환경에서는 필요 없을 수 있음)
  outputFileTracing: false,
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
