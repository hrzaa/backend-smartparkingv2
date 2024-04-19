-- CreateTable
CREATE TABLE `parkings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(10) NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    `parkingin` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `parkingout` DATETIME(3) NULL,
    `totaltime` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;
