/*
  Warnings:

  - You are about to drop the column `longtitude` on the `CoffeeShop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CoffeeShop" DROP COLUMN "longtitude",
ADD COLUMN     "longitude" TEXT;
