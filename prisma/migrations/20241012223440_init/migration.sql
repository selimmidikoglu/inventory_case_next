-- CreateTable
CREATE TABLE "InventoryTransactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "transactionType" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "remarks" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Suppliers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "website" TEXT NOT NULL
);
