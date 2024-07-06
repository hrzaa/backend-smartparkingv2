/*
  Warnings:

  - You are about to drop the column `parking_name` on the `parking_areas` table. All the data in the column will be lost.
  - You are about to drop the column `parkingAreaId` on the `parking_spaces` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `parking_areas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[img]` on the table `parking_areas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[img_url]` on the table `parking_areas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `img` to the `parking_areas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img_url` to the `parking_areas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `parking_areas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `parking_areas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parking_area_id` to the `parking_spaces` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `parking_spaces` DROP FOREIGN KEY `parking_spaces_parkingAreaId_fkey`;

-- DropIndex
DROP INDEX `parking_areas_parking_name_key` ON `parking_areas`;

-- AlterTable
ALTER TABLE `parking_areas` DROP COLUMN `parking_name`,
    ADD COLUMN `img` VARCHAR(191) NOT NULL,
    ADD COLUMN `img_url` VARCHAR(191) NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `parking_spaces` DROP COLUMN `parkingAreaId`,
    ADD COLUMN `parking_area_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `parking_areas_name_key` ON `parking_areas`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `parking_areas_img_key` ON `parking_areas`(`img`);

-- CreateIndex
CREATE UNIQUE INDEX `parking_areas_img_url_key` ON `parking_areas`(`img_url`);

-- AddForeignKey
ALTER TABLE `parking_spaces` ADD CONSTRAINT `parking_spaces_parking_area_id_fkey` FOREIGN KEY (`parking_area_id`) REFERENCES `parking_areas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
