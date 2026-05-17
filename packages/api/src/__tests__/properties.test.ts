import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@landlordlens/billing', () => ({
  canAddProperty: vi.fn(),
  TierLimitError: class TierLimitError extends Error {
    constructor(tier: string, limit: number) {
      super(`Your ${tier} plan allows up to ${limit} properties.`)
      this.name = 'TierLimitError'
    }
  },
}))

vi.mock('@landlordlens/auth/server', () => ({
  createServerClient: vi.fn(),
}))

vi.mock('@landlordlens/db', () => ({
  db: {},
  profiles: {},
}))

vi.mock('drizzle-orm', async (importOriginal) => {
  const actual = await importOriginal<typeof import('drizzle-orm')>()
  return {
    ...actual,
    eq: vi.fn(),
  }
})

import { canAddProperty } from '@landlordlens/billing'
import { createCallerFactory } from '../trpc'
import { appRouter } from '../root'

const mockDb = {
  select: vi.fn().mockReturnThis(),
  from: vi.fn().mockReturnThis(),
  where: vi.fn().mockReturnThis(),
  orderBy: vi.fn(),
  insert: vi.fn().mockReturnThis(),
  values: vi.fn().mockReturnThis(),
  returning: vi.fn(),
  update: vi.fn().mockReturnThis(),
  set: vi.fn().mockReturnThis(),
}

const mockUser = { id: 'user-uuid-1', email: 'test@example.com', user_metadata: {} }
const mockProfile = { id: 'user-uuid-1', subscription: 'free' as const, email: 'test@example.com' }

const createCaller = createCallerFactory(appRouter)

function createAuthedCaller() {
  return createCaller({
    db: mockDb as any,
    user: mockUser as any,
    profile: mockProfile as any,
    headers: new Headers(),
  })
}

describe('properties router', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('list', () => {
    it('returns empty array when user has no properties', async () => {
      mockDb.orderBy.mockResolvedValueOnce([])
      const caller = createAuthedCaller()
      const result = await caller.properties.list()
      expect(result).toEqual([])
    })

    it('returns properties for the authenticated user', async () => {
      const mockProperty = { id: 'prop-1', userId: mockUser.id, address: { line1: '1 Test St', city: 'London', postcode: 'SW1A 1AA', country: 'United Kingdom' } }
      mockDb.orderBy.mockResolvedValueOnce([mockProperty])
      const caller = createAuthedCaller()
      const result = await caller.properties.list()
      expect(result).toEqual([mockProperty])
    })
  })

  describe('create', () => {
    it('calls canAddProperty before inserting', async () => {
      vi.mocked(canAddProperty).mockResolvedValueOnce(undefined)
      mockDb.returning.mockResolvedValueOnce([{ id: 'new-prop', userId: mockUser.id }])
      const caller = createAuthedCaller()
      await caller.properties.create({
        address: { line1: '1 Test St', city: 'London', postcode: 'SW1A 1AA', country: 'United Kingdom' },
        propertyType: 'house',
        bedrooms: 3,
        bathrooms: 1,
        region: 'england',
      })
      expect(canAddProperty).toHaveBeenCalledWith(mockUser.id, 'free', mockDb)
    })

    it('throws FORBIDDEN TRPCError when tier limit reached', async () => {
      const { TierLimitError } = await import('@landlordlens/billing')
      vi.mocked(canAddProperty).mockRejectedValueOnce(new TierLimitError('free', 2))
      const caller = createAuthedCaller()
      await expect(
        caller.properties.create({
          address: { line1: '1 Test St', city: 'London', postcode: 'SW1A 1AA', country: 'United Kingdom' },
          propertyType: 'house',
          bedrooms: 3,
          bathrooms: 1,
          region: 'england',
        }),
      ).rejects.toMatchObject({ code: 'FORBIDDEN' })
    })
  })
})
