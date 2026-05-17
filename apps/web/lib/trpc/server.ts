import 'server-only'
import { cache } from 'react'
import { headers } from 'next/headers'
import { createCallerFactory, appRouter } from '@landlordlens/api'
import { createServerClient } from '@landlordlens/auth/server'
import { db } from '@landlordlens/db'
import { profiles } from '@landlordlens/db/schema'
import { eq } from 'drizzle-orm'

const createCaller = createCallerFactory(appRouter)

export const createServerCaller = cache(async () => {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const [p] = await db.select().from(profiles).where(eq(profiles.id, user.id))
    profile = p ?? null
  }

  const headersList = await headers()

  return createCaller({
    db,
    user,
    profile,
    headers: headersList,
  })
})
