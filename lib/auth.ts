/**
 * NextAuth 인증 설정
 *
 * - 이메일 + 비밀번호 방식 (CredentialsProvider)
 * - JWT 세션 전략 사용
 * - 세션에 user.id, user.role 추가 (미들웨어 권한 체크에 사용)
 */
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // DB에서 이메일로 유저 조회
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        // bcrypt로 비밀번호 검증
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // 로그인 시 토큰에 id, role 주입
      if (user) {
        token.id = user.id;
        token.role = (user as { id: string; role?: string }).role ?? 'USER';
      }
      // role이 없는 기존 토큰(role 필드 추가 전 로그인)은 DB에서 재조회
      if (!token.role && token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { role: true },
        });
        token.role = dbUser?.role ?? 'USER';
      }
      return token;
    },
    async session({ session, token }) {
      // session.user에 id, role 추가 (클라이언트에서 useSession()으로 접근 가능)
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // 기본 NextAuth 로그인 페이지 대신 커스텀 페이지 사용
  },
};
