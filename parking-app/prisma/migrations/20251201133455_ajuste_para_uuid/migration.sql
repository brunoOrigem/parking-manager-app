/*
  Warnings:

  - The primary key for the `Pagamento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Ticket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `entrada` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `saida` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `valorPago` to the `Pagamento` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pagamento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dataPagamento" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valorPago" REAL NOT NULL,
    "ticketId" TEXT NOT NULL,
    CONSTRAINT "Pagamento_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pagamento" ("id", "ticketId") SELECT "id", "ticketId" FROM "Pagamento";
DROP TABLE "Pagamento";
ALTER TABLE "new_Pagamento" RENAME TO "Pagamento";
CREATE UNIQUE INDEX "Pagamento_ticketId_key" ON "Pagamento"("ticketId");
CREATE TABLE "new_Ticket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "placa" TEXT NOT NULL,
    "dataEntrada" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataSaida" DATETIME,
    "pago" BOOLEAN NOT NULL DEFAULT false,
    "valorPago" REAL
);
INSERT INTO "new_Ticket" ("id", "pago", "placa", "valorPago") SELECT "id", "pago", "placa", "valorPago" FROM "Ticket";
DROP TABLE "Ticket";
ALTER TABLE "new_Ticket" RENAME TO "Ticket";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
