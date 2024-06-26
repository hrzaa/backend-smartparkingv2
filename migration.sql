-- CreateTable
CREATE TABLE `users` (
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `role` VARCHAR(191) NOT NULL DEFAULT 'ADMIN',
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parkings` (
    `code` VARCHAR(12) NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    `parkingin` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `parkingout` DATETIME(3) NULL,
    `totaltime` INTEGER NULL,
    `parkingId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`parkingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `transactionId` VARCHAR(191) NOT NULL,
    `parkingId` VARCHAR(191) NOT NULL,
    `totalprice` DOUBLE NOT NULL,
    `transactionstatus` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `transactions_parkingId_key`(`parkingId`),
    PRIMARY KEY (`transactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prices` (
    `priceId` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`priceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `areas` (
    `areaId` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `status` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`areaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_parkingId_fkey` FOREIGN KEY (`parkingId`) REFERENCES `parkings`(`parkingId`) ON DELETE CASCADE ON UPDATE CASCADE;

