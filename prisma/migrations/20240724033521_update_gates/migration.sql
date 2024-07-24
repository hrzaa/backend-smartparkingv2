/*
  Warnings:

  - You are about to drop the column `userId` on the `gates` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `gates_userId_key` ON `gates`;

-- AlterTable
ALTER TABLE `gates` DROP COLUMN `userId`;
