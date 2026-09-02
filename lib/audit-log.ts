import { prisma } from './prisma';
import { NextRequest } from 'next/server';
import logger from '@/lib/logger';

export type AuditAction =
  | 'CREATE_KEYWORD'
  | 'UPDATE_KEYWORD'
  | 'DELETE_KEYWORD'
  | 'CREATE_TEMPLATE'
  | 'UPDATE_TEMPLATE'
  | 'DELETE_TEMPLATE'
  | 'DELETE_JOB_POSTING'
  | 'DELETE_COVER_LETTER'
  | 'DELETE_PORTFOLIO'
  | 'DELETE_ROADMAP_ITEM'
  | 'DELETE_EXPERIENCE'
  | 'UPDATE_USER_ROLE'
  | 'DELETE_USER'
  | 'DELETE_RECRUITER_LISTING'
  | 'DELETE_ADMIN_LISTING'
  | 'CREATE_NOTICE'
  | 'UPDATE_NOTICE'
  | 'DELETE_NOTICE'
  | 'CREATE_QUESTION'
  | 'UPDATE_QUESTION'
  | 'DELETE_QUESTION';

export type AuditLogInput = {
  userId?: string;
  action: AuditAction;
  resource: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  request?: NextRequest;
};

export async function createAuditLog(input: AuditLogInput): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: input.userId,
        action: input.action,
        resource: input.resource,
        resourceId: input.resourceId,
        details: input.details ? JSON.stringify(input.details) : null,
        ip: input.request ? getClientIp(input.request) : null,
        userAgent: input.request?.headers.get('user-agent') ?? null,
      },
    });
  } catch (error) {
    logger.error({ err: error }, 'Audit log creation failed');
  }
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return request.ip ?? 'unknown';
}
