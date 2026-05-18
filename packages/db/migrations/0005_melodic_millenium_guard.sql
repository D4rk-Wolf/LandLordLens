ALTER TABLE "properties" ADD COLUMN "epc_rating" text;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "epc_expiry_date" date;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "current_value" numeric(12, 2);--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "mortgage_balance" numeric(12, 2);--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "mortgage_rate" numeric(5, 4);--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "mortgage_monthly_payment" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "prs_registration_number" text;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "hmo_license_number" text;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "hmo_license_expiry" date;