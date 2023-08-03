/*
  Warnings:

  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task"
    ALTER COLUMN "userId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User"
    ADD COLUMN "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Task"
    ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
