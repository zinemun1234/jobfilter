-- Add structured fields to UserNotification
ALTER TABLE "UserNotification" ADD COLUMN "type" TEXT NOT NULL DEFAULT 'SYSTEM';
ALTER TABLE "UserNotification" ADD COLUMN "referenceId" TEXT;
ALTER TABLE "UserNotification" ADD COLUMN "actionUrl" TEXT;

CREATE UNIQUE INDEX "UserNotification_userId_type_referenceId_key" ON "UserNotification"("userId", "type", "referenceId");
