/*
  Warnings:

  - You are about to alter the column `transactionstatus` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `payment_method` VARCHAR(110) NULL,
    ADD COLUMN `snap_redirect_url` VARCHAR(255) NULL,
    ADD COLUMN `snap_token` VARCHAR(255) NULL,
    ADD COLUMN `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `transactionstatus` ENUM('PENDING_PAYMENT', 'PAID', 'CANCELED') NOT NULL;
