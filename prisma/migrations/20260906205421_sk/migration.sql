/*
  Warnings:

  - Added the required column `status` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Request` ADD COLUMN `status` ENUM('REQUEST', 'DISLIKE', 'REJECT', 'ACCEPT') NOT NULL;
