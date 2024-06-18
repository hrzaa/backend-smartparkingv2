/*
  Warnings:

  - The primary key for the `transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `transactionId` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `transactions` DROP PRIMARY KEY,
    MODIFY `transactionId` VARCHAR(100) NOT NULL,
    ADD PRIMARY KEY (`transactionId`);
