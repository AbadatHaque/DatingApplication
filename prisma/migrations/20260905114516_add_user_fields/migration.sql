/*
  Warnings:

  - Added the required column `about` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `areaType` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `higherEducation` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lookingFor` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobileNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `about` VARCHAR(191) NOT NULL,
    ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `areaType` ENUM('RURAL', 'URBAN') NOT NULL,
    ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    ADD COLUMN `higherEducation` VARCHAR(191) NOT NULL,
    ADD COLUMN `lookingFor` VARCHAR(191) NOT NULL,
    ADD COLUMN `marriageTimeline` ENUM('WITHIN_1_YEAR', 'ONE_TO_TWO_YEARS', 'TWO_TO_FIVE_YEARS', 'NOT_SURE') NULL,
    ADD COLUMN `mobileNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `occupation` VARCHAR(191) NULL,
    ADD COLUMN `occupationType` ENUM('SALARIED', 'SELF_EMPLOYED', 'BUSINESS', 'STUDENT', 'UNEMPLOYED', 'RETIRED') NULL,
    ADD COLUMN `state` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
