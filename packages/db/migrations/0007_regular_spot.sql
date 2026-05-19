ALTER TABLE "payments" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "last_export_requested_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "deletion_requested_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "retention_reason" text;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_or_retention" CHECK ("payments"."user_id" IS NOT NULL OR "payments"."retention_reason" IS NOT NULL);