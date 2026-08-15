import { beforeEach, describe, expect, it, vi } from 'vitest';
import { validateUserAccess } from './security';
import {
  getAuthSession,
  requireAdmin,
  requireAdminOrOwner,
  sanitizeCoverLetter,
  sanitizeEmploymentRecord,
  sanitizeExperience,
  sanitizeInterviewAnswer,
  sanitizeInterviewQuestion,
  sanitizeJobListing,
  sanitizeNotification,
  sanitizePortfolio,
  sanitizeRoadmapItem,
  sanitizeUser,
} from './api';

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}));

vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn((body: unknown, init?: ResponseInit) => ({ body, init })),
  },
}));

vi.mock('@/lib/auth', () => ({
  authOptions: {},
}));

import { getServerSession } from 'next-auth';

const mockedGetServerSession = vi.mocked(getServerSession);

beforeEach(() => {
  mockedGetServerSession.mockReset();
});

describe('resource ownership', () => {
  it('소유자만 리소스에 접근할 수 있다', () => {
    expect(validateUserAccess('user-1', 'user-1')).toBe(true);
    expect(validateUserAccess('user-1', 'user-2')).toBe(false);
  });
});

describe('auth helpers', () => {
  it('getAuthSession returns authenticated user id', async () => {
    mockedGetServerSession.mockResolvedValue({
      user: { id: 'user-1', role: 'USER' },
    } as never);
    await expect(getAuthSession()).resolves.toBe('user-1');
  });

  it('getAuthSession throws UNAUTHORIZED when session is missing', async () => {
    mockedGetServerSession.mockResolvedValue(null as never);
    await expect(getAuthSession()).rejects.toThrow('인증이 필요합니다.');
  });

  it('requireAdminOrOwner allows resource owner', async () => {
    mockedGetServerSession.mockResolvedValue({
      user: { id: 'user-1', role: 'USER' },
    } as never);
    await expect(requireAdminOrOwner('user-1')).resolves.toEqual({
      userId: 'user-1',
      role: 'USER',
    });
  });

  it('requireAdminOrOwner allows admin', async () => {
    mockedGetServerSession.mockResolvedValue({
      user: { id: 'admin-1', role: 'ADMIN' },
    } as never);
    await expect(requireAdminOrOwner('user-1')).resolves.toEqual({
      userId: 'admin-1',
      role: 'ADMIN',
    });
  });

  it('requireAdminOrOwner throws FORBIDDEN for non-owner non-admin', async () => {
    mockedGetServerSession.mockResolvedValue({
      user: { id: 'user-2', role: 'USER' },
    } as never);
    await expect(requireAdminOrOwner('user-1')).rejects.toThrow(
      '접근 권한이 없습니다.'
    );
  });

  it('requireAdmin returns admin info', async () => {
    mockedGetServerSession.mockResolvedValue({
      user: { id: 'admin-1', role: 'ADMIN' },
    } as never);
    await expect(requireAdmin()).resolves.toEqual({
      userId: 'admin-1',
      role: 'ADMIN',
    });
  });

  it('requireAdmin throws FORBIDDEN for non-admin user', async () => {
    mockedGetServerSession.mockResolvedValue({
      user: { id: 'user-1', role: 'USER' },
    } as never);
    await expect(requireAdmin()).rejects.toThrow('관리자 권한이 필요합니다.');
  });
});

describe('sanitizers remove sensitive fields', () => {
  it('sanitizeUser removes password and passwordHash', () => {
    const user = {
      id: 'u1',
      email: 'test@example.com',
      name: 'Test',
      password: 'secret123',
      passwordHash: 'hashed-secret',
    };
    const sanitized = sanitizeUser(user);
    expect(sanitized).not.toHaveProperty('password');
    expect(sanitized).not.toHaveProperty('passwordHash');
    expect(sanitized.id).toBe('u1');
    expect(sanitized.email).toBe('test@example.com');
  });

  it('sanitizePortfolio removes userId and user', () => {
    const portfolio = {
      id: 'p1',
      title: 'Portfolio',
      techStack: ['React'],
      userId: 'u1',
      user: { id: 'u1' },
    };
    const sanitized = sanitizePortfolio(portfolio);
    expect(sanitized).not.toHaveProperty('userId');
    expect(sanitized).not.toHaveProperty('user');
    expect(sanitized.id).toBe('p1');
    expect(sanitized.techStack).toEqual(['React']);
  });

  it('sanitizeExperience removes userId and user', () => {
    const experience = {
      id: 'e1',
      title: 'Experience',
      userId: 'u1',
      user: { id: 'u1' },
      technologies: '[]',
    };
    const sanitized = sanitizeExperience(experience);
    expect(sanitized).not.toHaveProperty('userId');
    expect(sanitized).not.toHaveProperty('user');
    expect(sanitized.id).toBe('e1');
  });

  it('sanitizeInterviewAnswer removes userId from answer and question', () => {
    const answer = {
      id: 'a1',
      answer: '답변',
      userId: 'u1',
      user: { id: 'u1' },
      question: {
        id: 'q1',
        question: '질문',
        userId: 'u1',
        user: { id: 'u1' },
      },
    };
    const sanitized = sanitizeInterviewAnswer(answer);
    expect(sanitized).not.toHaveProperty('userId');
    expect(sanitized).not.toHaveProperty('user');
    expect(sanitized.id).toBe('a1');
    expect(sanitized.question).not.toHaveProperty('userId');
    expect(sanitized.question).not.toHaveProperty('user');
    expect((sanitized as Record<string, unknown>).question).toEqual(
      expect.objectContaining({ id: 'q1', question: '질문' })
    );
  });

  it('sanitizeInterviewQuestion sanitizes nested answers', () => {
    const question = {
      id: 'q1',
      question: '질문',
      userId: 'u1',
      answers: [{ id: 'a1', answer: '답변', userId: 'u1' }],
    };
    const sanitized = sanitizeInterviewQuestion(question);
    expect(sanitized).not.toHaveProperty('userId');
    expect(sanitized.id).toBe('q1');
    const answers = (sanitized as Record<string, unknown>).answers as Record<string, unknown>[];
    expect(answers[0]).not.toHaveProperty('userId');
    expect(answers[0]).toEqual(expect.objectContaining({ id: 'a1', answer: '답변' }));
  });

  it('sanitizeJobListing removes user', () => {
    const listing = {
      id: 'l1',
      company: 'Company',
      position: 'Position',
      user: { id: 'r1' },
      tags: '[]',
    };
    const sanitized = sanitizeJobListing(listing);
    expect(sanitized).not.toHaveProperty('user');
    expect(sanitized.id).toBe('l1');
  });

  it('sanitizeNotification removes userId and user', () => {
    const notification = {
      id: 'n1',
      title: 'Title',
      userId: 'u1',
      user: { id: 'u1' },
    };
    const sanitized = sanitizeNotification(notification);
    expect(sanitized).not.toHaveProperty('userId');
    expect(sanitized).not.toHaveProperty('user');
    expect(sanitized.id).toBe('n1');
  });

  it('sanitizeRoadmapItem removes userId and user', () => {
    const item = {
      id: 'r1',
      skill: 'React',
      userId: 'u1',
      user: { id: 'u1' },
    };
    const sanitized = sanitizeRoadmapItem(item);
    expect(sanitized).not.toHaveProperty('userId');
    expect(sanitized).not.toHaveProperty('user');
    expect(sanitized.id).toBe('r1');
  });

  it('sanitizeCoverLetter removes userId and user', () => {
    const letter = {
      id: 'c1',
      company: 'Company',
      userId: 'u1',
      user: { id: 'u1' },
      items: [{ question: 'Q', answer: 'A' }],
    };
    const sanitized = sanitizeCoverLetter(letter);
    expect(sanitized).not.toHaveProperty('userId');
    expect(sanitized).not.toHaveProperty('user');
    expect(sanitized.id).toBe('c1');
  });

  it('sanitizeEmploymentRecord removes userId and user', () => {
    const record = {
      id: 'er1',
      company: 'Company',
      userId: 'u1',
      user: { id: 'u1' },
    };
    const sanitized = sanitizeEmploymentRecord(record);
    expect(sanitized).not.toHaveProperty('userId');
    expect(sanitized).not.toHaveProperty('user');
    expect(sanitized.id).toBe('er1');
  });
});
