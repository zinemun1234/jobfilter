/**
 * Keyword DB 서비스
 *
 * Prisma generated client가 새 모델을 인식하지 못할 수 있으므로
 * raw SQL($queryRaw / $executeRaw) 기반으로 동작한다.
 * PostgreSQL 기준, "Keyword" 테이블에 접근한다.
 */

import { randomUUID } from 'crypto';
import { prisma } from './prisma';
import { Prisma } from '@/lib/generated/prisma';
import { safeJsonParse, stringifyJson } from './json-utils';
import { requireAdmin } from './api';
import { AppError } from './errors';

export type DbKeyword = {
  id: string;
  category: string;
  key: string;
  value: string;
  aliases: string[] | null;
  createdAt: Date;
  updatedAt: Date;
};

function parseAliases(aliases: string | null | undefined): string[] | null {
  if (!aliases) return null;
  return safeJsonParse<string[] | null>(aliases, null);
}

function mapRow(row: Record<string, unknown>): DbKeyword {
  return {
    id: String(row.id),
    category: String(row.category),
    key: String(row.key),
    value: String(row.value),
    aliases: parseAliases(row.aliases as string | null),
    createdAt: row.createdAt as Date,
    updatedAt: row.updatedAt as Date,
  };
}

export async function listKeywords(category?: string): Promise<DbKeyword[]> {
  const rows = await prisma.$queryRaw<Record<string, unknown>[]>(
    category
      ? Prisma.sql`SELECT * FROM "Keyword" WHERE "category" = ${category} ORDER BY "key" ASC`
      : Prisma.sql`SELECT * FROM "Keyword" ORDER BY "category" ASC, "key" ASC`
  );
  return rows.map(mapRow);
}

export async function countKeywords(category: string): Promise<number> {
  const rows = await prisma.$queryRaw<Record<string, unknown>[]>(
    Prisma.sql`SELECT COUNT(*)::int as count FROM "Keyword" WHERE "category" = ${category}`
  );
  return (rows[0]?.count as number) ?? 0;
}

export async function getKeywordById(id: string): Promise<DbKeyword | null> {
  const rows = await prisma.$queryRaw<Record<string, unknown>[]>(
    Prisma.sql`SELECT * FROM "Keyword" WHERE "id" = ${id} LIMIT 1`
  );
  if (!rows.length) return null;
  return mapRow(rows[0]);
}

export async function createKeyword(
  data: Omit<DbKeyword, 'id' | 'createdAt' | 'updatedAt'>
): Promise<DbKeyword> {
  await requireAdmin();

  const dupRows = await prisma.$queryRaw<Record<string, unknown>[]>(
    Prisma.sql`
      SELECT "id" FROM "Keyword"
      WHERE "category" = ${data.category} AND "key" = ${data.key} AND "value" = ${data.value}
      LIMIT 1
    `
  );
  if (dupRows.length > 0) {
    throw new AppError('동일한 category/key/value 조합의 키워드가 이미 존재합니다.', 'CONFLICT');
  }

  const id = randomUUID();
  const aliasesJson = stringifyJson(data.aliases);
  const rows = await prisma.$queryRaw<Record<string, unknown>[]>(
    Prisma.sql`
      INSERT INTO "Keyword" ("id", "category", "key", "value", "aliases", "createdAt", "updatedAt")
      VALUES (${id}, ${data.category}, ${data.key}, ${data.value}, ${aliasesJson}, now(), now())
      RETURNING *
    `
  );
  return mapRow(rows[0]);
}

export async function updateKeyword(
  id: string,
  data: Partial<Omit<DbKeyword, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<DbKeyword | null> {
  await requireAdmin();
  const existing = await getKeywordById(id);
  if (!existing) return null;

  const category = data.category ?? existing.category;
  const key = data.key ?? existing.key;
  const value = data.value ?? existing.value;
  const aliasesJson = data.aliases !== undefined ? stringifyJson(data.aliases) : stringifyJson(existing.aliases);

  // unique 중복 방지: 본인 제외 동일 category+key+value가 있는지 확인
  const dupRows = await prisma.$queryRaw<Record<string, unknown>[]>(
    Prisma.sql`
      SELECT "id" FROM "Keyword"
      WHERE "category" = ${category} AND "key" = ${key} AND "value" = ${value} AND "id" <> ${id}
      LIMIT 1
    `
  );
  if (dupRows.length > 0) {
    throw new Error('동일한 category/key/value 조합이 이미 존재합니다.');
  }

  const rows = await prisma.$queryRaw<Record<string, unknown>[]>(
    Prisma.sql`
      UPDATE "Keyword"
      SET "category" = ${category}, "key" = ${key}, "value" = ${value}, "aliases" = ${aliasesJson}, "updatedAt" = now()
      WHERE "id" = ${id}
      RETURNING *
    `
  );
  return mapRow(rows[0]);
}

export async function deleteKeyword(id: string): Promise<boolean> {
  await requireAdmin();
  const result = await prisma.$executeRaw(
    Prisma.sql`DELETE FROM "Keyword" WHERE "id" = ${id}`
  );
  return Number(result) > 0;
}

export async function upsertKeyword(
  data: Omit<DbKeyword, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }
): Promise<DbKeyword> {
  await requireAdmin();
  const id = data.id || randomUUID();
  const aliasesJson = stringifyJson(data.aliases);
  const rows = await prisma.$queryRaw<Record<string, unknown>[]>(
    Prisma.sql`
      INSERT INTO "Keyword" ("id", "category", "key", "value", "aliases", "createdAt", "updatedAt")
      VALUES (${id}, ${data.category}, ${data.key}, ${data.value}, ${aliasesJson}, now(), now())
      ON CONFLICT ("category", "key", "value") DO UPDATE SET
        "aliases" = EXCLUDED."aliases",
        "updatedAt" = now()
      RETURNING *
    `
  );
  return mapRow(rows[0]);
}

export async function seedKeywords(keywords: Omit<DbKeyword, 'id' | 'createdAt' | 'updatedAt'>[]): Promise<number> {
  if (!keywords.length) return 0;

  const values = keywords.map((k) => {
    const id = randomUUID();
    return Prisma.sql`(${id}, ${k.category}, ${k.key}, ${k.value}, ${stringifyJson(k.aliases)}, now(), now())`;
  });

  // Prisma.sql join helper 사용
  const joined = Prisma.join(values, ',');
  await prisma.$executeRaw(
    Prisma.sql`
      INSERT INTO "Keyword" ("id", "category", "key", "value", "aliases", "createdAt", "updatedAt")
      VALUES ${joined}
      ON CONFLICT ("category", "key", "value") DO UPDATE SET
        "aliases" = EXCLUDED."aliases",
        "updatedAt" = now()
    `
  );
  return keywords.length;
}
