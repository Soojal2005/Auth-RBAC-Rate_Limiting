-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'PRO', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'FREE';
