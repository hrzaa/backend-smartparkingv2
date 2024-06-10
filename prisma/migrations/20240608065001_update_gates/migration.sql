/*
  Warnings:

  - A unique constraint covering the columns `[gatesName]` on the table `gates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `gates_gatesName_key` ON `gates`(`gatesName`);
