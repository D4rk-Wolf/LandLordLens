import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL
if (!connectionString) throw new Error('DATABASE_URL is not set')

const url = new URL(connectionString)
const client = postgres({
  host: url.hostname,
  port: Number(url.port) || 5432,
  database: url.pathname.slice(1),
  username: url.username,
  password: url.password,
  prepare: false,
  ssl: { rejectUnauthorized: false },
})

export const db = drizzle(client, { schema })
export type DB = typeof db
