-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "links" JSONB NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
