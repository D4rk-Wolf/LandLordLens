/**
 * @module db/client
 * Drizzle ORM database client — singleton connection to Supabase PostgreSQL.
 *
 * Uses the `postgres` driver (not Supabase's JS client) for direct TCP
 * access to the database.  This bypasses Supabase Row Level Security, so
 * every query MUST include a `userId` filter to enforce tenant isolation at
 * the application level.
 *
 * `prepare: false` disables prepared statements, which are not supported by
 * Supabase's connection pooler (PgBouncer) in transaction mode.
 *
 * Connection is established at module evaluation time; if `DATABASE_URL` is
 * not set the module throws immediately, failing the build rather than at
 * the first query.
 */
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL
if (!connectionString) throw new Error('DATABASE_URL is not set')

const client = postgres(connectionString, {
  prepare: false,
  // Supabase requires SSL; rejectUnauthorized: false accepts Supabase's
  // self-signed cert without needing to bundle a CA certificate.
  ssl: { rejectUnauthorized: false },
})

/** Drizzle client with the full schema — use this in all server-side code. */
export const db = drizzle(client, { schema })

/** Convenience type for passing the db client to helper functions. */
export type DB = typeof db
