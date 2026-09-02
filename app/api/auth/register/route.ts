import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { successResponse, badRequest, conflict, sanitizeUser } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
import { registerSchema } from '@/lib/validations/auth';
import { checkRequestSecurity, rateLimiters } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const security = await checkRequestSecurity(request, {
    rateLimit: true,
    requireOrigin: true,
    limiter: rateLimiters.auth,
  });
  if (security) return security;

  try {
    const body = await request.json();

    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0];
      return badRequest(firstError.message);
    }

    const { name, email, password } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return conflict('이미 사용 중인 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name || null,
        email,
        password: hashedPassword,
        skills: '[]',
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return successResponse(sanitizeUser(user), 201);
  } catch (error) {
    return handleApiError(error);
  }
}
