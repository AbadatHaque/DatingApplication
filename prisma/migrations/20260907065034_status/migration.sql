/*
  Warnings:

  - The values [REQUEST] on the enum `requestConnection_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `requestConnection` MODIFY `status` ENUM('LIKE', 'DISLIKE', 'REJECT', 'ACCEPT') NOT NULL;
