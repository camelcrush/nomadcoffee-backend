/*
  Warnings:

  - You are about to drop the column `file` on the `CoffeeShopPhoto` table. All the data in the column will be lost.
  - Added the required column `url` to the `CoffeeShopPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CoffeeShopPhoto" DROP COLUMN "file",
ADD COLUMN     "url" TEXT NOT NULL;
