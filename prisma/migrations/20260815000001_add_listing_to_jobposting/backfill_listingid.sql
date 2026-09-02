-- 기존 JobPosting 중 회사/직무가 일치하는 공고가 있으면 listingId를 채웁니다.
WITH matched AS (
  SELECT jp.id AS jobId, (
    SELECT l.id FROM "JobListing" l
    WHERE l.company = jp.company AND l.position = jp.position AND l."isActive" = true
    ORDER BY l."createdAt" DESC
    LIMIT 1
  ) AS listingId
  FROM "JobPosting" jp
  WHERE jp."listingId" IS NULL
)
UPDATE "JobPosting" jp
SET "listingId" = m.listingId
FROM matched m
WHERE jp.id = m.jobId AND m.listingId IS NOT NULL;
