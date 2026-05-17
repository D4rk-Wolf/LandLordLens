import { describe, it, expect, vi, beforeEach } from 'vitest'
import { canAddProperty, TierLimitError } from '../guards'

const mockDb = {
  select: vi.fn().mockReturnThis(),
  from: vi.fn().mockReturnThis(),
  where: vi.fn(),
}

describe('canAddProperty', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('allows adding when under the limit', async () => {
    mockDb.where.mockResolvedValueOnce([{ count: 1 }])
    await expect(
      canAddProperty('user-1', 'free', mockDb as any),
    ).resolves.toBeUndefined()
  })

  it('throws TierLimitError when at the free tier limit (2)', async () => {
    mockDb.where.mockResolvedValueOnce([{ count: 2 }])
    await expect(
      canAddProperty('user-1', 'free', mockDb as any),
    ).rejects.toBeInstanceOf(TierLimitError)
  })

  it('throws TierLimitError when at the professional limit (10)', async () => {
    mockDb.where.mockResolvedValueOnce([{ count: 10 }])
    await expect(
      canAddProperty('user-1', 'professional', mockDb as any),
    ).rejects.toBeInstanceOf(TierLimitError)
  })

  it('never throws for enterprise (unlimited)', async () => {
    await expect(
      canAddProperty('user-1', 'enterprise', mockDb as any),
    ).resolves.toBeUndefined()
    expect(mockDb.select).not.toHaveBeenCalled()
  })
})
