/*
  Warnings:

  - You are about to drop the `areas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `main_areas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `areas` DROP FOREIGN KEY `areas_mainAreaId_fkey`;

-- DropTable
DROP TABLE `areas`;

-- DropTable
DROP TABLE `main_areas`;

-- CreateTable
CREATE TABLE `parking_areas` (
    `id` VARCHAR(191) NOT NULL,
    `parking_name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `parking_areas_parking_name_key`(`parking_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parking_spaces` (
    `id` VARCHAR(191) NOT NULL,
    `parkingAreaId` VARCHAR(191) NOT NULL,
    `space_name` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `parking_spaces_space_name_key`(`space_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `parking_spaces` ADD CONSTRAINT `parking_spaces_parkingAreaId_fkey` FOREIGN KEY (`parkingAreaId`) REFERENCES `parking_areas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
