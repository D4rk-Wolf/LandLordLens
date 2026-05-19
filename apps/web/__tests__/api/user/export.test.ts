import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

const mockGetUser = vi.fn()
const mockSelect = vi.fn()
const mockUpdate = vi.fn()
const mockSendDataExportEmail = vi.fn()

vi.mock('@landlordlens/auth/server', () => ({
  createServerClient: vi.fn(() => ({
    auth: { getUser: mockGetUser },
  })),
}))

vi.mock('@landlordlens/db', () => ({
  db: {
    select: vi.fn(() => ({ from: vi.fn(() => ({ where: mockSelect })) })),
    update: vi.fn(() => ({ set: vi.fn(() => ({ where: mockUpdate })) })),
  },
}))

vi.mock('@landlordlens/email', () => ({
  sendDataExportEmail: mockSendDataExportEmail,
}))

// Import route after mocks are set up
const { GET } = await import('../../../app/api/user/export/route')

function makeRequest() {
  return new NextRequest('http://localhost/api/user/export')
}

describe('GET /api/user/export', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 401 when unauthenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })
    const res = await GET(makeRequest())
    expect(res.status).toBe(401)
  })

  it('returns a JSON attachment when authenticated and no prior export', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-123', email: 'test@example.com' } } })
    // Profile with no lastExportRequestedAt
    mockSelect.mockResolvedValue([{ id: 'user-123', lastExportRequestedAt: null, subscription: 'professional' }])
    mockUpdate.mockResolvedValue([])
    mockSendDataExportEmail.mockResolvedValue({})

    const res = await GET(makeRequest())
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Disposition')).toMatch(/attachment; filename="landlordlens-data-/)
    expect(res.headers.get('Content-Type')).toBe('application/json')
  })

  it('returns 429 when rate limit exceeded (last export < 24h ago)', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-123', email: 'test@example.com' } } })
    const recentExport = new Date(Date.now() - 60 * 60 * 1000) // 1 hour ago
    mockSelect.mockResolvedValue([{ id: 'user-123', lastExportRequestedAt: recentExport }])

    const res = await GET(makeRequest())
    expect(res.status).toBe(429)
    expect(res.headers.get('Retry-After')).toBeTruthy()
  })
})
