import { describe, expect, it } from 'vitest';
import { validateUserAccess } from './security';

describe('resource ownership', () => {
  it('소유자만 리소스에 접근할 수 있다', () => {
    expect(validateUserAccess('user-1', 'user-1')).toBe(true);
    expect(validateUserAccess('user-1', 'user-2')).toBe(false);
  });
});
