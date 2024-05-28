-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_parkingId_fkey`;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_parkingId_fkey` FOREIGN KEY (`parkingId`) REFERENCES `parkings`(`parkingId`) ON DELETE CASCADE ON UPDATE CASCADE;
