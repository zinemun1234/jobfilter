import { describe, expect, it } from 'vitest';
import { calculateMatching, parseJsonArray } from './matching';

describe('calculateMatching', () => {
  it('일치 기술과 부족 기술을 설명한다', () => {
    const result = calculateMatching({
      skills: ['React', 'TypeScript'],
      tags: ['React', 'Docker', 'AWS'],
      position: '프론트엔드 개발자',
      targetJob: '프론트엔드 개발자',
      career: '신입',
      deadline: new Date(Date.now() + 2 * 86400000),
    });

    expect(result.matchedSkills).toEqual(['React']);
    expect(result.missingSkills).toEqual(['Docker', 'AWS']);
    expect(result.score).toBeGreaterThan(0);
    expect(result.reasons).toContain('목표 직무와 유사');
  });

  it('프로필 정보가 없어도 안전한 결과를 반환한다', () => {
    const result = calculateMatching({ position: '개발자', tags: ['React'] });

    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.matchedSkills).toEqual([]);
    expect(result.reasons).toContain('프로필 정보를 추가하면 더 정확한 매칭이 가능합니다.');
  });
});

describe('parseJsonArray', () => {
  it('유효한 문자열 배열만 반환한다', () => {
    expect(parseJsonArray('["React", 1, "TypeScript"]')).toEqual(['React', 'TypeScript']);
    expect(parseJsonArray('invalid')).toEqual([]);
    expect(parseJsonArray(null)).toEqual([]);
  });
});
