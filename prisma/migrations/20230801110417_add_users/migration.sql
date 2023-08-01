-- CreateTable
CREATE TABLE "User"
(
    "id"         TEXT         NOT NULL,
    "webAuthn"   BOOLEAN      NOT NULL,
    "name"       TEXT         NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
