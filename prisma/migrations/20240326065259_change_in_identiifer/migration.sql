/*
  Warnings:

  - The primary key for the `Credential` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CredentialMapping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserMapping` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Credential" DROP CONSTRAINT "Credential_userId_fkey";

-- DropForeignKey
ALTER TABLE "CredentialMapping" DROP CONSTRAINT "CredentialMapping_credentialId_fkey";

-- DropForeignKey
ALTER TABLE "CredentialMapping" DROP CONSTRAINT "CredentialMapping_userMappingId_fkey";

-- DropForeignKey
ALTER TABLE "UserMapping" DROP CONSTRAINT "UserMapping_conferrerId_fkey";

-- DropForeignKey
ALTER TABLE "UserMapping" DROP CONSTRAINT "UserMapping_recipientId_fkey";

-- AlterTable
ALTER TABLE "Credential" DROP CONSTRAINT "Credential_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Credential_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Credential_id_seq";

-- AlterTable
ALTER TABLE "CredentialMapping" DROP CONSTRAINT "CredentialMapping_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "credentialId" SET DATA TYPE TEXT,
ALTER COLUMN "userMappingId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CredentialMapping_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CredentialMapping_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "UserMapping" DROP CONSTRAINT "UserMapping_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "conferrerId" SET DATA TYPE TEXT,
ALTER COLUMN "recipientId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserMapping_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserMapping_id_seq";

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMapping" ADD CONSTRAINT "UserMapping_conferrerId_fkey" FOREIGN KEY ("conferrerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMapping" ADD CONSTRAINT "UserMapping_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CredentialMapping" ADD CONSTRAINT "CredentialMapping_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CredentialMapping" ADD CONSTRAINT "CredentialMapping_userMappingId_fkey" FOREIGN KEY ("userMappingId") REFERENCES "UserMapping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
