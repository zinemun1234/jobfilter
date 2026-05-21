import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { successResponse, badRequest, conflict } from '@/lib/api';
import { handleApiError } from '@/lib/errors';
import { registerSchema } from '@/lib/validations/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
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
      return conflict('?¥Î? ?¨Ïö© Ï§ëÏù∏ ?¥Î©î?ºÏûÖ?àÎã§.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name || null,
        email,
        password: hashedPassword,
        skills: '[]', // JSON string for SQLite compatibility
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return successResponse(user, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
