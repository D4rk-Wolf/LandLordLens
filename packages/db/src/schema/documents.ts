import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core'
import { properties } from './properties'
import { profiles } from './profiles'

export type DocumentCategory = 'compliance' | 'tenancy' | 'legal' | 'financial' | 'inspection' | 'other'

export const documents = pgTable('documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id').references(() => properties.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => profiles.id),
  name: text('name').notNull(),
  category: text('category').$type<DocumentCategory>().default('other').notNull(),
  storagePath: text('storage_path').notNull(),
  mimeType: text('mime_type'),
  sizeBytes: integer('size_bytes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export type Document = typeof documents.$inferSelect
export type NewDocument = typeof documents.$inferInsert
