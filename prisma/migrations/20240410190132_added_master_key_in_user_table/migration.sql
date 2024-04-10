/*
  Warnings:

  - Added the required column `master_key` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- Step 1: Add the column without NOT NULL constraint
ALTER TABLE "User" ADD COLUMN "master_key" TEXT;

-- Step 2: Update existing rows to have a value for the new column
-- This example sets a default value for all existing rows. Adjust as necessary.
UPDATE "User" SET "master_key" = 'default_value' WHERE "master_key" IS NULL;

-- Step 3: Alter the column to add the NOT NULL constraint
ALTER TABLE "User" ALTER COLUMN "master_key" SET NOT NULL;
