/*
  Warnings:

  - A unique constraint covering the columns `[gatesName]` on the table `gates` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gatesName` to the `gates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `gates` ADD COLUMN `gatesName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `gates_gatesName_key` ON `gates`(`gatesName`);
