-- AlterTable
ALTER TABLE "InstagramPost"
  ADD COLUMN "externalId" TEXT,
  ADD COLUMN "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "InstagramPost_externalId_key" ON "InstagramPost"("externalId");

-- CreateIndex
CREATE INDEX "InstagramPost_postedAt_idx" ON "InstagramPost"("postedAt");

-- CreateTable
CREATE TABLE "InstagramConfig" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "accessToken" TEXT NOT NULL,
    "businessAccountId" TEXT NOT NULL,
    "tokenExpiresAt" TIMESTAMP(3),
    "lastSyncedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstagramConfig_pkey" PRIMARY KEY ("id")
);
