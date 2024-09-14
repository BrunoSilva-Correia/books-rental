-- CreateTable
CREATE TABLE "books" (
    "id_book" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "is_rented" BOOLEAN NOT NULL,
    "rented_by_id" INTEGER,
    CONSTRAINT "books_rented_by_id_fkey" FOREIGN KEY ("rented_by_id") REFERENCES "users" ("id_user") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "id_user" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
