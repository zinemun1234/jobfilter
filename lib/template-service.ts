/**
 * Template DB 서비스
 *
 * Prisma generated client가 새 모델을 인식하지 못할 수 있으므로
 * raw SQL($queryRaw / $executeRaw) 기반으로 동작한다.
 * PostgreSQL 기준, "Template" 테이블에 접근한다.
 */

import { randomUUID } from 'crypto';
import { prisma } from './prisma';
import { Prisma } from '@/lib/generated/prisma';
import { safeJsonParse } from './json-utils';
import { requireAdmin } from './api';

export type DbTemplate = {
  id: string;
  type: string;
  name: string;
  label: string | null;
  data: string;
  jobType: string | null;
  category: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TemplateData = unknown;

function mapRow(row: Record<string, unknown>): DbTemplate {
  return {
    id: String(row.id),
    type: String(row.type),
    name: String(row.name),
    label: row.label ? String(row.label) : null,
    data: String(row.data),
    jobType: row.jobType ? String(row.jobType) : null,
    category: row.category ? String(row.category) : null,
    createdAt: row.createdAt as Date,
    updatedAt: row.updatedAt as Date,
  };
}

export function parseTemplateData<T>(template: DbTemplate, fallback: T): T {
  return safeJsonParse<T>(template.data, fallback);
}

export async function listTemplates(type?: string): Promise<DbTemplate[]> {
  const rows = await prisma.$queryRaw<Record<string, unknown>[]>(
    type
      ? Prisma.sql`SELECT * FROM "Template" WHERE "type" = ${type} ORDER BY "name" ASC`
      : Prisma.sql`SELECT * FROM "Template" ORDER BY "type" ASC, "name" ASC`
  );
  return rows.map(mapRow);
}

export async function countTemplates(type: string): Promise<number> {
  const rows = await prisma.$queryRaw<Record<string, unknown>[]>(
    Prisma.sql`SELECT COUNT(*)::int as count FROM "Template" WHERE "type" = ${type}`
  );
  return (rows[0]?.count as number) ?? 0;
}

export async function getTemplateById(id: string): Promise<DbTemplate | null> {
  const rows = await prisma.$queryRaw<Record<string, unknown>[]>(
    Prisma.sql`SELECT * FROM "Template" WHERE "id" = ${id} LIMIT 1`
  );
  if (!rows.length) return null;
  return mapRow(rows[0]);
}

export async function getTemplateByTypeName(type: string, name: string): Promise<DbTemplate | null> {
  const rows = await prisma.$queryRaw<Record<string, unknown>[]>(
    Prisma.sql`SELECT * FROM "Template" WHERE "type" = ${type} AND "name" = ${name} LIMIT 1`
  );
  if (!rows.length) return null;
  return mapRow(rows[0]);
}

export async function createTemplate(
  data: Omit<DbTemplate, 'id' | 'createdAt' | 'updatedAt'>
): Promise<DbTemplate> {
  await requireAdmin();
  const id = randomUUID();
  const rows = await prisma.$queryRaw<Record<string, unknown>[]>(
    Prisma.sql`
      INSERT INTO "Template" ("id", "type", "name", "label", "data", "jobType", "category", "createdAt", "updatedAt")
      VALUES (${id}, ${data.type}, ${data.name}, ${data.label}, ${data.data}, ${data.jobType}, ${data.category}, now(), now())
      RETURNING *
    `
  );
  return mapRow(rows[0]);
}

export async function updateTemplate(
  id: string,
  data: Partial<Omit<DbTemplate, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<DbTemplate | null> {
  await requireAdmin();
  const existing = await getTemplateById(id);
  if (!existing) return null;

  const type = data.type ?? existing.type;
  const name = data.name ?? existing.name;
  const label = data.label !== undefined ? data.label : existing.label;
  const jobType = data.jobType !== undefined ? data.jobType : existing.jobType;
  const category = data.category !== undefined ? data.category : existing.category;
  const dataStr = data.data !== undefined ? data.data : existing.data;

  const dupRows = await prisma.$queryRaw<Record<string, unknown>[]>(
    Prisma.sql`
      SELECT "id" FROM "Template"
      WHERE "type" = ${type} AND "name" = ${name} AND "id" <> ${id}
      LIMIT 1
    `
  );
  if (dupRows.length > 0) {
    throw new Error('동일한 type/name 조합이 이미 존재합니다.');
  }

  const rows = await prisma.$queryRaw<Record<string, unknown>[]>(
    Prisma.sql`
      UPDATE "Template"
      SET "type" = ${type}, "name" = ${name}, "label" = ${label}, "data" = ${dataStr},
          "jobType" = ${jobType}, "category" = ${category}, "updatedAt" = now()
      WHERE "id" = ${id}
      RETURNING *
    `
  );
  return mapRow(rows[0]);
}

export async function deleteTemplate(id: string): Promise<boolean> {
  await requireAdmin();
  const result = await prisma.$executeRaw(
    Prisma.sql`DELETE FROM "Template" WHERE "id" = ${id}`
  );
  return Number(result) > 0;
}

export async function upsertTemplate(
  data: Omit<DbTemplate, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }
): Promise<DbTemplate> {
  await requireAdmin();
  const id = data.id || randomUUID();
  const rows = await prisma.$queryRaw<Record<string, unknown>[]>(
    Prisma.sql`
      INSERT INTO "Template" ("id", "type", "name", "label", "data", "jobType", "category", "createdAt", "updatedAt")
      VALUES (${id}, ${data.type}, ${data.name}, ${data.label}, ${data.data}, ${data.jobType}, ${data.category}, now(), now())
      ON CONFLICT ("type", "name") DO UPDATE SET
        "label" = EXCLUDED."label",
        "data" = EXCLUDED."data",
        "jobType" = EXCLUDED."jobType",
        "category" = EXCLUDED."category",
        "updatedAt" = now()
      RETURNING *
    `
  );
  return mapRow(rows[0]);
}

export async function seedTemplates(
  templates: Omit<DbTemplate, 'id' | 'createdAt' | 'updatedAt'>[]
): Promise<number> {
  if (!templates.length) return 0;

  const values = templates.map((t) =>
    Prisma.sql`(${randomUUID()}, ${t.type}, ${t.name}, ${t.label}, ${t.data}, ${t.jobType}, ${t.category}, now(), now())`
  );
  const joined = Prisma.join(values, ',');

  await prisma.$executeRaw(
    Prisma.sql`
      INSERT INTO "Template" ("id", "type", "name", "label", "data", "jobType", "category", "createdAt", "updatedAt")
      VALUES ${joined}
      ON CONFLICT ("type", "name") DO UPDATE SET
        "label" = EXCLUDED."label",
        "data" = EXCLUDED."data",
        "jobType" = EXCLUDED."jobType",
        "category" = EXCLUDED."category",
        "updatedAt" = now()
    `
  );
  return templates.length;
}
