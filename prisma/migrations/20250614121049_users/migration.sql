-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "users_first_name" TEXT NOT NULL,
    "users_last_name" TEXT NOT NULL,
    "users_email_address" TEXT NOT NULL,
    "users_username" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_users_email_address_key" ON "users"("users_email_address");

-- CreateIndex
CREATE UNIQUE INDEX "users_users_username_key" ON "users"("users_username");
