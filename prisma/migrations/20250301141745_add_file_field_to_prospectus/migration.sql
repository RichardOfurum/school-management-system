/*
  Warnings:

  - Added the required column `file` to the `Prospectus` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Prospectus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "file" TEXT NOT NULL
);
INSERT INTO "new_Prospectus" ("id", "title") SELECT "id", "title" FROM "Prospectus";
DROP TABLE "Prospectus";
ALTER TABLE "new_Prospectus" RENAME TO "Prospectus";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
