-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Prospectus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "file" TEXT
);
INSERT INTO "new_Prospectus" ("file", "id", "title") SELECT "file", "id", "title" FROM "Prospectus";
DROP TABLE "Prospectus";
ALTER TABLE "new_Prospectus" RENAME TO "Prospectus";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
