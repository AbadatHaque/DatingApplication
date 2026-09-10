/*
  Warnings:

  - The values [RURAL,URBAN] on the enum `User_areaType` will be removed. If these variants are still used in the database, this will fail.
  - The values [MALE,FEMALE,OTHER] on the enum `User_gender` will be removed. If these variants are still used in the database, this will fail.
  - The values [WITHIN_1_YEAR,ONE_TO_TWO_YEARS,TWO_TO_FIVE_YEARS,NOT_SURE] on the enum `User_marriageTimeline` will be removed. If these variants are still used in the database, this will fail.
  - The values [SALARIED,SELF_EMPLOYED,BUSINESS,STUDENT,UNEMPLOYED,RETIRED] on the enum `User_occupationType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `from_id` on the `requestConnection` table. All the data in the column will be lost.
  - You are about to drop the column `to_id` on the `requestConnection` table. All the data in the column will be lost.
  - The values [LIKE,DISLIKE,REJECT,ACCEPT] on the enum `requestConnection_status` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[gender]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fromId,toId]` on the table `requestConnection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fromId` to the `requestConnection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toId` to the `requestConnection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `requestConnection` DROP FOREIGN KEY `requestConnection_from_id_fkey`;

-- DropForeignKey
ALTER TABLE `requestConnection` DROP FOREIGN KEY `requestConnection_to_id_fkey`;

-- DropIndex
DROP INDEX `requestConnection_from_id_fkey` ON `requestConnection`;

-- DropIndex
DROP INDEX `requestConnection_to_id_fkey` ON `requestConnection`;

-- AlterTable
ALTER TABLE `User` MODIFY `areaType` ENUM('rural', 'urban') NOT NULL,
    MODIFY `gender` ENUM('male', 'female') NOT NULL,
    MODIFY `marriageTimeline` ENUM('within1Year', 'oneToTwoYears', 'twoToFiveYears', 'notSure') NULL,
    MODIFY `occupationType` ENUM('salaried', 'selfEmployed', 'business', 'student', 'unemployed', 'retired') NULL;

-- AlterTable
ALTER TABLE `requestConnection` DROP COLUMN `from_id`,
    DROP COLUMN `to_id`,
    ADD COLUMN `fromId` INTEGER NOT NULL,
    ADD COLUMN `toId` INTEGER NOT NULL,
    MODIFY `status` ENUM('like', 'dislike', 'rejected', 'accepted') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_gender_key` ON `User`(`gender`);

-- CreateIndex
CREATE INDEX `requestConnection_fromId_status_idx` ON `requestConnection`(`fromId`, `status`);

-- CreateIndex
CREATE INDEX `requestConnection_toId_status_idx` ON `requestConnection`(`toId`, `status`);

-- CreateIndex
CREATE UNIQUE INDEX `requestConnection_fromId_toId_key` ON `requestConnection`(`fromId`, `toId`);

-- AddForeignKey
ALTER TABLE `requestConnection` ADD CONSTRAINT `requestConnection_fromId_fkey` FOREIGN KEY (`fromId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestConnection` ADD CONSTRAINT `requestConnection_toId_fkey` FOREIGN KEY (`toId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
