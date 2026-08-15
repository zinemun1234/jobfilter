export type MatchingInput = {
  skills?: string[];
  tags?: string[];
  position?: string | null;
  career?: string | null;
  targetJob?: string | null;
  deadline?: Date | string | null;
};

export type MatchingResult = {
  score: number;
  skillScore: number;
  roleScore: number;
  careerScore: number;
  urgencyScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  reasons: string[];
};

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function matchesKeyword(left: string, right: string): boolean {
  const a = normalize(left);
  const b = normalize(right);
  return Boolean(a && b && (a === b || a.includes(b) || b.includes(a)));
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.map(value => value.trim()).filter(Boolean)));
}

function calculateUrgency(deadline?: Date | string | null): number {
  if (!deadline) return 30;
  const daysLeft = Math.ceil((new Date(deadline).getTime() - new Date().setHours(0, 0, 0, 0)) / 86400000);
  if (!Number.isFinite(daysLeft) || daysLeft <= 0) return 0;
  if (daysLeft <= 7) return 100;
  if (daysLeft >= 30) return 30;
  return Math.round(100 - ((daysLeft - 7) / 23) * 70);
}

export function calculateMatching(input: MatchingInput): MatchingResult {
  const skills = unique(input.skills ?? []);
  const tags = unique(input.tags ?? []);
  const position = input.position?.trim() ?? '';
  const matchedSkills = skills.filter(skill => tags.some(tag => matchesKeyword(skill, tag)));
  const missingSkills = tags.filter(tag => !skills.some(skill => matchesKeyword(skill, tag)));
  const skillScore = skills.length > 0 ? Math.round((matchedSkills.length / skills.length) * 100) : 0;
  const roleScore = input.targetJob && position && matchesKeyword(input.targetJob, position) ? 100 : 0;
  const careerScore = input.career
    ? /신입|무관|인턴/i.test(input.career) ? 100 : 50
    : 50;
  const urgencyScore = calculateUrgency(input.deadline);
  const score = Math.round(skillScore * 0.55 + roleScore * 0.2 + careerScore * 0.15 + urgencyScore * 0.1);
  const reasons: string[] = [];

  if (matchedSkills.length > 0) reasons.push(`일치 기술 ${matchedSkills.length}개`);
  if (roleScore === 100) reasons.push('목표 직무와 유사');
  if (input.career && /신입|무관|인턴/i.test(input.career)) reasons.push('신입 지원 가능');
  if (input.deadline && urgencyScore >= 70) reasons.push('마감 임박');

  return {
    score,
    skillScore,
    roleScore,
    careerScore,
    urgencyScore,
    matchedSkills,
    missingSkills,
    reasons: reasons.length > 0 ? reasons : ['프로필 정보를 추가하면 더 정확한 매칭이 가능합니다.'],
  };
}

export function parseJsonArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}
