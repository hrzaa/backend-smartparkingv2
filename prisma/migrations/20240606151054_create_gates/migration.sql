-- CreateTable
CREATE TABLE `gates` (
    `gatesId` VARCHAR(191) NOT NULL,
    `gateStatus` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`gatesId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
