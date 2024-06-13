/*
  Warnings:

  - The primary key for the `areas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `area` on the `areas` table. All the data in the column will be lost.
  - You are about to drop the column `areaId` on the `areas` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `areas` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `areas` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `mainAreaId` to the `areas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `areas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `areas` DROP PRIMARY KEY,
    DROP COLUMN `area`,
    DROP COLUMN `areaId`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `mainAreaId` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `main_areas` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `main_areas_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `areas_name_key` ON `areas`(`name`);

-- AddForeignKey
ALTER TABLE `areas` ADD CONSTRAINT `areas_mainAreaId_fkey` FOREIGN KEY (`mainAreaId`) REFERENCES `main_areas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
