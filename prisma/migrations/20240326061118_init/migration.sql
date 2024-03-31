-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credential" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMapping" (
    "id" SERIAL NOT NULL,
    "conferrerId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,

    CONSTRAINT "UserMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CredentialMapping" (
    "id" SERIAL NOT NULL,
    "credentialId" INTEGER NOT NULL,
    "userMappingId" INTEGER NOT NULL,

    CONSTRAINT "CredentialMapping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "Credential_userId_idx" ON "Credential"("userId");

-- CreateIndex
CREATE INDEX "UserMapping_conferrerId_idx" ON "UserMapping"("conferrerId");

-- CreateIndex
CREATE INDEX "UserMapping_recipientId_idx" ON "UserMapping"("recipientId");

-- CreateIndex
CREATE UNIQUE INDEX "UserMapping_conferrerId_recipientId_key" ON "UserMapping"("conferrerId", "recipientId");

-- CreateIndex
CREATE INDEX "CredentialMapping_credentialId_idx" ON "CredentialMapping"("credentialId");

-- CreateIndex
CREATE INDEX "CredentialMapping_userMappingId_idx" ON "CredentialMapping"("userMappingId");

-- CreateIndex
CREATE UNIQUE INDEX "CredentialMapping_credentialId_userMappingId_key" ON "CredentialMapping"("credentialId", "userMappingId");

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
