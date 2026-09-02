-- AlterTable
ALTER TABLE "JobPosting" ADD COLUMN     "listingId" TEXT;

-- CreateIndex
CREATE INDEX "JobListing_recruiterId_idx" ON "JobListing"("recruiterId");

-- CreateIndex
CREATE INDEX "JobPosting_listingId_idx" ON "JobPosting"("listingId");

-- CreateIndex
CREATE INDEX "UserNotification_userId_createdAt_idx" ON "UserNotification"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "JobPosting" ADD CONSTRAINT "JobPosting_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "JobListing"("id") ON DELETE SET NULL ON UPDATE CASCADE;
