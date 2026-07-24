/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Device` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[filename]` on the table `Video` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimeType` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "pendingCommand" TEXT,
ADD COLUMN     "token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "mimeType" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PlaylistItem" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "deviceId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlaylistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlaylistItem_deviceId_videoId_key" ON "PlaylistItem"("deviceId", "videoId");

-- CreateIndex
CREATE UNIQUE INDEX "Device_token_key" ON "Device"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Video_filename_key" ON "Video"("filename");

-- AddForeignKey
ALTER TABLE "PlaylistItem" ADD CONSTRAINT "PlaylistItem_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistItem" ADD CONSTRAINT "PlaylistItem_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
