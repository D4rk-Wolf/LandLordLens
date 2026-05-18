ALTER TABLE "tenancies" ALTER COLUMN "tenancy_type" SET DEFAULT 'periodic_assured';
UPDATE "tenancies" SET "tenancy_type" = 'periodic_assured' WHERE "tenancy_type" = 'assured_shorthold';