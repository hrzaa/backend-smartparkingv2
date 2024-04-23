/*
  Warnings:

  - The primary key for the `parkings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `parkings` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - The required column `parkingId` was added to the `parkings` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.
  - The required column `userId` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `parkings` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `parkingId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`parkingId`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `name`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'ADMIN',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    MODIFY `username` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `token` VARCHAR(255) NULL,
    ADD PRIMARY KEY (`userId`);

-- CreateTable
CREATE TABLE `transaksis` (
    `transaksiId` VARCHAR(191) NOT NULL,
    `parkingId` VARCHAR(191) NOT NULL,
    `totalprice` DOUBLE NOT NULL,
    `TransactionStatus` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `transaksis_parkingId_key`(`parkingId`),
    PRIMARY KEY (`transaksiId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_username_key` ON `users`(`username`);

-- AddForeignKey
ALTER TABLE `transaksis` ADD CONSTRAINT `transaksis_parkingId_fkey` FOREIGN KEY (`parkingId`) REFERENCES `parkings`(`parkingId`) ON DELETE RESTRICT ON UPDATE CASCADE;
