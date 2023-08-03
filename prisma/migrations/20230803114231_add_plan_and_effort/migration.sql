-- CreateTable
CREATE TABLE "Plan"
(
    "id"              TEXT         NOT NULL,
    "taskId"          TEXT         NOT NULL,
    "requiredEffort"  INTEGER      NOT NULL,
    "remainingEffort" INTEGER      NOT NULL,
    "deadline"        TEXT,
    "created_at"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"      TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EffortLog"
(
    "id"         TEXT         NOT NULL,
    "planId"     TEXT         NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EffortLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Plan"
    ADD CONSTRAINT "Plan_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EffortLog"
    ADD CONSTRAINT "EffortLog_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
