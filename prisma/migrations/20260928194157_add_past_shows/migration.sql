-- CreateTable
CREATE TABLE "PastShow" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "photoUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "videoUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PastShow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PastShow_date_idx" ON "PastShow"("date");
