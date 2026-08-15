-- Add jobId columns to Portfolio, Experience, InterviewAnswer
ALTER TABLE "Portfolio" ADD COLUMN "jobId" TEXT;
ALTER TABLE "Experience" ADD COLUMN "jobId" TEXT;
ALTER TABLE "InterviewAnswer" ADD COLUMN "jobId" TEXT;

-- Add foreign keys
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobPosting"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobPosting"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "InterviewAnswer" ADD CONSTRAINT "InterviewAnswer_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobPosting"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Add indexes
CREATE INDEX "Portfolio_jobId_idx" ON "Portfolio"("jobId");
CREATE INDEX "Experience_jobId_idx" ON "Experience"("jobId");
CREATE INDEX "InterviewAnswer_jobId_idx" ON "InterviewAnswer"("jobId");
