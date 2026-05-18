import { pgTable, uuid, text, date, numeric, boolean, jsonb, timestamp } from 'drizzle-orm/pg-core'
import { properties } from './properties'
import { profiles } from './profiles'

export type TenancyType = 'periodic_assured' | 'assured' | 'short_assured' | 'fixed_term' | 'protected'
export type TenancyStatus = 'active' | 'ended' | 'pending'

export const tenancies = pgTable('tenancies', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id').notNull().references(() => properties.id),
  userId: uuid('user_id').notNull().references(() => profiles.id),
  tenantName: text('tenant_name').notNull(),
  tenantEmail: text('tenant_email').notNull(),
  tenantPhone: text('tenant_phone'),
  startDate: date('start_date').notNull(),
  endDate: date('end_date'),
  monthlyRent: numeric('monthly_rent', { precision: 10, scale: 2 }).notNull(),
  deposit: numeric('deposit', { precision: 10, scale: 2 }),
  depositProtected: boolean('deposit_protected').default(false).notNull(),
  tenancyType: text('tenancy_type').$type<TenancyType>().default('periodic_assured').notNull(),
  status: text('status').$type<TenancyStatus>().default('active').notNull(),
  rentReviewDate: date('rent_review_date'),
  lastRentIncrease: jsonb('last_rent_increase'),
  section13NoticeServed: boolean('section13_notice_served').default(false).notNull(),
  section13NoticeDate: date('section13_notice_date'),
  howToRentGuideProvided: boolean('how_to_rent_guide_provided').default(false).notNull(),
  howToRentGuideDate: date('how_to_rent_guide_date'),
  tenantInformationPackProvided: boolean('tenant_information_pack_provided').default(false).notNull(),
  tenantInformationPackDate: date('tenant_information_pack_date'),
  rentBookProvided: boolean('rent_book_provided').default(false).notNull(),
  rightToRentChecked: boolean('right_to_rent_checked').default(false).notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export type Tenancy = typeof tenancies.$inferSelect
export type NewTenancy = typeof tenancies.$inferInsert
