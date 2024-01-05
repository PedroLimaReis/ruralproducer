-- CreateEnum
CREATE TYPE "PlantetCropsType" AS ENUM ('SOJA', 'MILHO', 'ALGODAO', 'CAFE', 'CANADEACUCAR');

-- CreateTable
CREATE TABLE "rural_producers" (
    "id" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "nameProducer" TEXT NOT NULL,
    "nameFarm" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "areaFarm" DOUBLE PRECISION NOT NULL,
    "areaForPlant" DOUBLE PRECISION NOT NULL,
    "areaForVegetation" DOUBLE PRECISION NOT NULL,
    "plantetCrops" "PlantetCropsType"[],

    CONSTRAINT "rural_producers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rural_producers_document_key" ON "rural_producers"("document");
