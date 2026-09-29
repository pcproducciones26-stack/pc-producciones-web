-- AlterTable
ALTER TABLE "SiteSettings" ADD COLUMN     "aboutAreas" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "aboutText" TEXT;
