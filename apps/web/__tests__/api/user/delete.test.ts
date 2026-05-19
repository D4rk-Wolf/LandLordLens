import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

const mockGetUser = vi.fn()
const mockSignOut = vi.fn()
const mockSelect = vi.fn()
const mockUpdate = vi.fn()
const mockSendAccountDeletionEmail = vi.fn()

vi.mock('@landlordlens/auth/server', () => ({
  createServerClient: vi.fn(() => ({
    auth: { getUser: mockGetUser, signOut: mockSignOut },
  })),
}))

vi.mock('@landlordlens/db', () => ({
  db: {
    select: vi.fn(() => ({ from: vi.fn(() => ({ where: mockSelect })) })),
    update: vi.fn(() => ({ set: vi.fn(() => ({ where: mockUpdate })) })),
  },
}))

vi.mock('@landlordlens/email', () => ({
  sendAccountDeletionEmail: mockSendAccountDeletionEmail,
}))

const { DELETE } = await import('../../../app/api/user/delete/route')

function makeRequest() {
  return new NextRequest('http://localhost/api/user/delete', { method: 'DELETE' })
}

describe('DELETE /api/user/delete', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSignOut.mockResolvedValue({})
    mockUpdate.mockResolvedValue([])
    mockSendAccountDeletionEmail.mockResolvedValue({})
  })

  it('returns 401 when unauthenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })
    const res = await DELETE(makeRequest())
    expect(res.status).toBe(401)
  })

  it('returns 400 when user has an active paid subscription', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-123', email: 'test@example.com' } } })
    mockSelect.mockResolvedValue([{
      id: 'user-123',
      subscription: 'professional',
      subscriptionStatus: 'active',
      subscriptionCanceledAt: null,
    }])
    const res = await DELETE(makeRequest())
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toMatch(/cancel your subscription/)
  })

  it('schedules deletion and returns 200 for a free-tier user', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-123', email: 'test@example.com' } } })
    mockSelect.mockResolvedValue([{
      id: 'user-123',
      subscription: 'free',
      subscriptionStatus: 'active',
      subscriptionCanceledAt: null,
    }])
    const res = await DELETE(makeRequest())
    expect(res.status).toBe(200)
    expect(mockUpdate).toHaveBeenCalled()
    expect(mockSendAccountDeletionEmail).toHaveBeenCalledWith('test@example.com', expect.any(String))
    expect(mockSignOut).toHaveBeenCalled()
  })

  it('schedules deletion for a user with a cancelled subscription', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-123', email: 'test@example.com' } } })
    mockSelect.mockResolvedValue([{
      id: 'user-123',
      subscription: 'professional',
      subscriptionStatus: 'active',
      subscriptionCanceledAt: new Date(),
    }])
    const res = await DELETE(makeRequest())
    expect(res.status).toBe(200)
  })
})
