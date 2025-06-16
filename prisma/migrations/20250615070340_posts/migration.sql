-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "posts_title" TEXT NOT NULL,
    "posts_content" TEXT NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);
