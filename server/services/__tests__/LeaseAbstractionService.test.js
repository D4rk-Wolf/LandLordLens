const leaseService = require('../LeaseAbstractionService');

// Mock pdf-parse
jest.mock('pdf-parse', () => {
    return async () => ({
        text: `
      RESIDENTIAL TENANCY AGREEMENT
      THIS AGREEMENT is made on [Date]
      BETWEEN Landlord: [Landlord Name]
      AND Tenant: Sarah Openai
      
      The Term shall be for a period of 12 months commencing on 01/02/2026 and ending on 31/01/2027.
      
      The Rent is £1,200.50 per month payable in advance.
      The Deposit is £1,385.00.
    `
    });
});

describe('LeaseAbstractionService', () => {
    it('extracts correct details from lease text', async () => {
        const dummyBuffer = Buffer.from('dummy pdf content');
        const result = await leaseService.parseLease(dummyBuffer);

        expect(result.tenantName).toBe('Sarah Openai');
        expect(result.monthlyRent).toBe(1200.50);
        expect(result.deposit).toBe(1385.00);
        // Note: The service converts dates to YYYY-MM-DD
        expect(result.startDate).toBe('2026-02-01');
        expect(result.endDate).toBe('2027-01-31');
    });
});
