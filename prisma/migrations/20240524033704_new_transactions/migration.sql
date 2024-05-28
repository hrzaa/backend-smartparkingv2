/*
  Warnings:

  - You are about to drop the `transaksis` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `transaksis` DROP FOREIGN KEY `transaksis_parkingId_fkey`;

-- DropTable
DROP TABLE `transaksis`;

-- CreateTable
CREATE TABLE `transactions` (
    `transactionId` VARCHAR(191) NOT NULL,
    `parkingId` VARCHAR(191) NOT NULL,
    `totalprice` DOUBLE NOT NULL,
    `transactionstatus` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `transactions_parkingId_key`(`parkingId`),
    PRIMARY KEY (`transactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_parkingId_fkey` FOREIGN KEY (`parkingId`) REFERENCES `parkings`(`parkingId`) ON DELETE RESTRICT ON UPDATE CASCADE;
