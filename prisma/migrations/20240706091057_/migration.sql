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
    `transactionId` VARCHAR(100) NOT NULL,
    `parkingId` VARCHAR(191) NOT NULL,
    `totalprice` DOUBLE NOT NULL,
    `transactionstatus` ENUM('PENDING_PAYMENT', 'PAID', 'CANCELED') NOT NULL,
    `snap_token` VARCHAR(255) NULL,
    `snap_redirect_url` VARCHAR(255) NULL,
    `payment_method` VARCHAR(110) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

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
CREATE TABLE `parking_areas` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `img_url` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `parking_areas_name_key`(`name`),
    UNIQUE INDEX `parking_areas_img_key`(`img`),
    UNIQUE INDEX `parking_areas_img_url_key`(`img_url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parking_spaces` (
    `id` VARCHAR(191) NOT NULL,
    `parking_area_id` VARCHAR(191) NOT NULL,
    `space_name` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `parking_spaces_space_name_key`(`space_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gates` (
    `gatesId` VARCHAR(191) NOT NULL,
    `gatesName` VARCHAR(191) NOT NULL,
    `gateStatus` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `gates_gatesName_key`(`gatesName`),
    PRIMARY KEY (`gatesId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_parkingId_fkey` FOREIGN KEY (`parkingId`) REFERENCES `parkings`(`parkingId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `parking_spaces` ADD CONSTRAINT `parking_spaces_parking_area_id_fkey` FOREIGN KEY (`parking_area_id`) REFERENCES `parking_areas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
