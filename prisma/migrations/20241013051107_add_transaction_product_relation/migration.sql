-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InventoryTransactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "transactionType" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    CONSTRAINT "InventoryTransactions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_InventoryTransactions" ("date", "id", "productId", "quantity", "remarks", "transactionType") SELECT "date", "id", "productId", "quantity", "remarks", "transactionType" FROM "InventoryTransactions";
DROP TABLE "InventoryTransactions";
ALTER TABLE "new_InventoryTransactions" RENAME TO "InventoryTransactions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
