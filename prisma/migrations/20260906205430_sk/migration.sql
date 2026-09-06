/*
  Warnings:

  - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Request` DROP FOREIGN KEY `Request_from_id_fkey`;

-- DropForeignKey
ALTER TABLE `Request` DROP FOREIGN KEY `Request_to_id_fkey`;

-- DropTable
DROP TABLE `Request`;

-- CreateTable
CREATE TABLE `requestConnection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `from_id` INTEGER NOT NULL,
    `to_id` INTEGER NOT NULL,
    `status` ENUM('REQUEST', 'DISLIKE', 'REJECT', 'ACCEPT') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `requestConnection` ADD CONSTRAINT `requestConnection_from_id_fkey` FOREIGN KEY (`from_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestConnection` ADD CONSTRAINT `requestConnection_to_id_fkey` FOREIGN KEY (`to_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
