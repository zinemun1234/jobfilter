/** @type {import('next').NextConfig} */
const nextConfig = {
  // Windows 로컬 build 시 Prisma custom output + webpack glob이
  // C:\Users\<user>\Application Data 등 보호된 junction을 스캔하며
  // EPERM 오류를 일으키는 문제를 회피하기 위한 workaround.
  // Vercel/Linux 환경에서는 outputFileTracing을 활성화해야 standalone 배포에 필요한 파일이 포함됨.
  outputFileTracing: process.platform === 'win32' ? false : true,
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs', 'pino', 'pino-pretty'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // pino의 Node 전용 transport(worker/thread-stream)가 클라이언트 번들에 잡히는 것을 방지
      config.externals.push({ 'thread-stream': 'commonjs thread-stream' });
    }
    return config;
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  async redirects() {
    return [
      { source: '/forgot-password', destination: '/login', permanent: false },
      { source: '/reset-password', destination: '/login', permanent: false },
    ];
  },
};

module.exports = nextConfig;
