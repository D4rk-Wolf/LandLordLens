import { describe, it, expect } from 'vitest'
import { getPropertyLimit, getTierConfig, TIERS } from '../tiers'

describe('TIERS', () => {
  it('free tier has 2 property limit', () => {
    expect(getPropertyLimit('free')).toBe(2)
  })

  it('professional tier has 10 property limit', () => {
    expect(getPropertyLimit('professional')).toBe(10)
  })

  it('business tier has 50 property limit', () => {
    expect(getPropertyLimit('business')).toBe(50)
  })

  it('enterprise tier has unlimited properties', () => {
    expect(getPropertyLimit('enterprise')).toBe(Infinity)
  })

  it('free tier has no price IDs', () => {
    const config = getTierConfig('free')
    expect(config.monthlyPriceId).toBeNull()
    expect(config.yearlyPriceId).toBeNull()
  })

  it('all paid tiers have correct monthly prices in GBP', () => {
    expect(TIERS.professional.monthlyPriceGbp).toBe(12)
    expect(TIERS.business.monthlyPriceGbp).toBe(29)
    expect(TIERS.enterprise.monthlyPriceGbp).toBe(99)
  })

  it('all paid tiers have correct yearly prices in GBP', () => {
    expect(TIERS.professional.yearlyPriceGbp).toBe(120)
    expect(TIERS.business.yearlyPriceGbp).toBe(290)
    expect(TIERS.enterprise.yearlyPriceGbp).toBe(990)
  })
})
