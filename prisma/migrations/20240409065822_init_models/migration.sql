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
    "user_id" INTEGER NOT NULL,
    "last_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMapping" (
    "id" SERIAL NOT NULL,
    "conferrer_id" INTEGER NOT NULL,
    "recipient_id" INTEGER NOT NULL,

    CONSTRAINT "UserMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CredentialMapping" (
    "id" SERIAL NOT NULL,
    "credential_id" INTEGER NOT NULL,
    "user_mapping_id" INTEGER NOT NULL,

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
CREATE INDEX "Credential_user_id_idx" ON "Credential"("user_id");

-- CreateIndex
CREATE INDEX "UserMapping_conferrer_id_idx" ON "UserMapping"("conferrer_id");

-- CreateIndex
CREATE INDEX "UserMapping_recipient_id_idx" ON "UserMapping"("recipient_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserMapping_conferrer_id_recipient_id_key" ON "UserMapping"("conferrer_id", "recipient_id");

-- CreateIndex
CREATE INDEX "CredentialMapping_credential_id_idx" ON "CredentialMapping"("credential_id");

-- CreateIndex
CREATE INDEX "CredentialMapping_user_mapping_id_idx" ON "CredentialMapping"("user_mapping_id");

-- CreateIndex
CREATE UNIQUE INDEX "CredentialMapping_credential_id_user_mapping_id_key" ON "CredentialMapping"("credential_id", "user_mapping_id");

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMapping" ADD CONSTRAINT "UserMapping_conferrer_id_fkey" FOREIGN KEY ("conferrer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMapping" ADD CONSTRAINT "UserMapping_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CredentialMapping" ADD CONSTRAINT "CredentialMapping_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CredentialMapping" ADD CONSTRAINT "CredentialMapping_user_mapping_id_fkey" FOREIGN KEY ("user_mapping_id") REFERENCES "UserMapping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
