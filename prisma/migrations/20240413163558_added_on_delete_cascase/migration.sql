-- DropForeignKey
ALTER TABLE "Credential" DROP CONSTRAINT "Credential_user_id_fkey";

-- DropForeignKey
ALTER TABLE "CredentialMapping" DROP CONSTRAINT "CredentialMapping_credential_id_fkey";

-- DropForeignKey
ALTER TABLE "CredentialMapping" DROP CONSTRAINT "CredentialMapping_user_mapping_id_fkey";

-- DropForeignKey
ALTER TABLE "UserMapping" DROP CONSTRAINT "UserMapping_conferrer_id_fkey";

-- DropForeignKey
ALTER TABLE "UserMapping" DROP CONSTRAINT "UserMapping_recipient_id_fkey";

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMapping" ADD CONSTRAINT "UserMapping_conferrer_id_fkey" FOREIGN KEY ("conferrer_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMapping" ADD CONSTRAINT "UserMapping_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CredentialMapping" ADD CONSTRAINT "CredentialMapping_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CredentialMapping" ADD CONSTRAINT "CredentialMapping_user_mapping_id_fkey" FOREIGN KEY ("user_mapping_id") REFERENCES "UserMapping"("id") ON DELETE CASCADE ON UPDATE CASCADE;
