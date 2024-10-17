/*
  Warnings:

  - You are about to drop the column `authorId` on the `Products` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "price" TEXT NOT NULL,
    "quantity_in_stock" INTEGER NOT NULL,
    "restock_date" TEXT,
    "description" TEXT NOT NULL,
    "sku" TEXT NOT NULL
);
INSERT INTO "new_Products" ("categoryId", "description", "id", "name", "price", "quantity_in_stock", "restock_date", "sku", "supplierId") SELECT "categoryId", "description", "id", "name", "price", "quantity_in_stock", "restock_date", "sku", "supplierId" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
CREATE UNIQUE INDEX "Products_name_key" ON "Products"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
