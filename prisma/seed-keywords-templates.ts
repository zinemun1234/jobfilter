/**
 * Keyword / Template 기본 데이터 시드
 *
 * 기존 하드코딩 데이터를 DB로 마이그레이션하는 용도.
 * 중복 방지를 위해 ON CONFLICT upsert를 사용한다.
 *
 * 실행: npx tsx prisma/seed-keywords-templates.ts
 */

import { KEYWORDS } from '../lib/job-tags';
import { MAJOR_KEYWORDS } from '../lib/majors';
import { COVER_LETTER_TEMPLATES } from '../lib/cover-letter-templates';
import { ROADMAP_TEMPLATES } from '../lib/roadmap-templates';
import { prisma } from '../lib/prisma';
import { INTERVIEW_QUESTION_TEMPLATES } from '../lib/interview-questions';
import {
  JOB_TYPE_PATTERNS,
  SKILL_QUESTIONS,
  COMMON_QUESTIONS,
} from '../lib/interview-recommend';
import { seedKeywords, type DbKeyword } from '../lib/keyword-service';
import { seedTemplates, type DbTemplate } from '../lib/template-service';

async function main() {
  console.log('🌱 Keyword/Template 시드 시작...');

  // 1. job-tag
  const jobTags: Omit<DbKeyword, 'id' | 'createdAt' | 'updatedAt'>[] = KEYWORDS.map((k) => ({
    category: 'job-tag',
    key: k.keyword,
    value: k.tag,
    aliases: null,
  }));

  // 2. major
  const majorKeywords: Omit<DbKeyword, 'id' | 'createdAt' | 'updatedAt'>[] = [];
  for (const [major, keywords] of Object.entries(MAJOR_KEYWORDS)) {
    for (const keyword of keywords) {
      majorKeywords.push({
        category: 'major',
        key: major,
        value: keyword,
        aliases: null,
      });
    }
  }

  const allKeywords = [...jobTags, ...majorKeywords];
  await seedKeywords(allKeywords);
  console.log(`✅ Keyword ${allKeywords.length}개 upsert 완료`);

  // 3. cover-letter
  const coverLetterTemplates: Omit<DbTemplate, 'id' | 'createdAt' | 'updatedAt'>[] = Object.entries(
    COVER_LETTER_TEMPLATES
  ).map(([name, tpl]) => ({
    type: 'cover-letter',
    name,
    label: tpl.label,
    data: JSON.stringify({ items: tpl.items }),
    jobType: null,
    category: null,
  }));

  // 4. roadmap
  const roadmapTemplates: Omit<DbTemplate, 'id' | 'createdAt' | 'updatedAt'>[] = ROADMAP_TEMPLATES.map(
    (tpl) => ({
      type: 'roadmap',
      name: tpl.jobCategory,
      label: null,
      data: JSON.stringify({ skills: tpl.skills }),
      jobType: tpl.jobCategory,
      category: null,
    })
  );

  // 5. interview-question
  const interviewQuestionTemplates: Omit<DbTemplate, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      type: 'interview-question',
      name: 'default',
      label: null,
      data: JSON.stringify(INTERVIEW_QUESTION_TEMPLATES),
      jobType: null,
      category: null,
    },
  ];

  // 6. interview-recommend
  const interviewRecommendTemplates: Omit<DbTemplate, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      type: 'interview-recommend',
      name: 'default',
      label: null,
      data: JSON.stringify({
        jobTypePatterns: JOB_TYPE_PATTERNS,
        skillQuestions: SKILL_QUESTIONS,
        commonQuestions: COMMON_QUESTIONS,
      }),
      jobType: null,
      category: null,
    },
  ];

  const allTemplates = [
    ...coverLetterTemplates,
    ...roadmapTemplates,
    ...interviewQuestionTemplates,
    ...interviewRecommendTemplates,
  ];
  await seedTemplates(allTemplates);
  console.log(`✅ Template ${allTemplates.length}개 upsert 완료`);

  console.log('🎉 시드 완료!');
}

main()
  .catch((e) => {
    console.error('❌ 시드 실패:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
