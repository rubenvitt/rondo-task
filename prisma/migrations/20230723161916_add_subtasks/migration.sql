/*
  Warnings:

  - You are about to drop the column `list` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task"
    DROP COLUMN "list",
    ADD COLUMN "completion_date" TIMESTAMP(3),
    ADD COLUMN "parentId"        TEXT;

-- AddForeignKey
ALTER TABLE "Task"
    ADD CONSTRAINT "Task_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Task" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
