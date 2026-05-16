import { pgTable, uuid, text, date, numeric, boolean, jsonb, timestamp } from 'drizzle-orm/pg-core'
import { properties } from './properties'
import { tenancies } from './tenancies'
import { profiles } from './profiles'

export type ExpenseType = 'income' | 'expense'
export type PaymentMethod = 'bank_transfer' | 'card' | 'cash' | 'cheque' | 'other'

export const expenses = pgTable('expenses', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id').references(() => properties.id),
  tenancyId: uuid('tenancy_id').references(() => tenancies.id),
  userId: uuid('user_id').notNull().references(() => profiles.id),
  type: text('type').$type<ExpenseType>().notNull(),
  category: text('category').notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('GBP').notNull(),
  date: date('date').notNull(),
  description: text('description').notNull(),
  supplier: text('supplier'),
  invoiceNumber: text('invoice_number'),
  isTaxDeductible: boolean('is_tax_deductible').default(true).notNull(),
  vatAmount: numeric('vat_amount', { precision: 10, scale: 2 }),
  paymentMethod: text('payment_method').$type<PaymentMethod>(),
  receipt: jsonb('receipt'),
  notes: text('notes'),
  taxYear: text('tax_year'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export type Expense = typeof expenses.$inferSelect
export type NewExpense = typeof expenses.$inferInsert
