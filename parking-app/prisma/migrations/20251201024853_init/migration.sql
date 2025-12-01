-- CreateTable
CREATE TABLE "Ticket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "placa" TEXT NOT NULL,
    "entrada" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "saida" DATETIME,
    "pago" BOOLEAN NOT NULL DEFAULT false,
    "valorPago" REAL,
    "status" TEXT NOT NULL DEFAULT 'ABERTO'
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ticketId" INTEGER NOT NULL,
    CONSTRAINT "Pagamento_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Pagamento_ticketId_key" ON "Pagamento"("ticketId");
