/*
  Warnings:

  - A unique constraint covering the columns `[userId,systemId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Task"
    ADD COLUMN "systemId" TEXT,
    ADD COLUMN "userId"   TEXT NOT NULL DEFAULT 'no-user';

-- CreateIndex
CREATE UNIQUE INDEX "Task_userId_systemId_key" ON "Task" ("userId", "systemId");
