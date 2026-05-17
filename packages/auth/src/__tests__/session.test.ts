import { describe, it, expect } from 'vitest'
import { isAdmin, isLandlord } from '../roles'

describe('roles', () => {
  describe('isAdmin', () => {
    it('returns true for admin role', () => {
      expect(isAdmin('admin')).toBe(true)
    })

    it('returns false for landlord role', () => {
      expect(isAdmin('landlord')).toBe(false)
    })

    it('returns false for null', () => {
      expect(isAdmin(null)).toBe(false)
    })
  })

  describe('isLandlord', () => {
    it('returns true for landlord role', () => {
      expect(isLandlord('landlord')).toBe(true)
    })

    it('returns true for admin (admin can do landlord things)', () => {
      expect(isLandlord('admin')).toBe(true)
    })

    it('returns false for tenant', () => {
      expect(isLandlord('tenant')).toBe(false)
    })

    it('returns false for undefined', () => {
      expect(isLandlord(undefined)).toBe(false)
    })
  })
})
