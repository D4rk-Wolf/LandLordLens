const request = require('supertest');
const app = require('../../server/index');
const { connectToMongoDB, closeMongoDB } = require('../../lib/mongodb');
const jwt = require('jsonwebtoken');

describe('External Services API', () => {
    let token;

    beforeAll(async () => {
        // Mock MongoDB connection to avoid actual DB connection issues during test
        // But since we use integration tests with supertest, we might need actual DB or mocked models.
        // For services, we only need auth.
        // Let's create a fake token.
        token = jwt.sign({ userId: 'test-user-id', role: 'landlord' }, process.env.JWT_SECRET || 'test-secret', { expiresIn: '1h' });
    });

    afterAll(async () => {
        // Close any open handles
        await new Promise(resolve => setTimeout(resolve, 500));
    });

    describe('GET /api/services/epc-lookup', () => {
        it('should return 401 if no token provided', async () => {
            const res = await request(app).get('/api/services/epc-lookup?postcode=SW1A1AA');
            if (res.statusCode !== 401) console.log('401 Test Failed Response:', res.body);
            expect(res.statusCode).toEqual(401);
        });

        it('should return EPC data for valid postcode', async () => {
            // We need to mock the auth middleware if we can't easily sign a valid token that the server accepts
            // Or we assume the server uses the same secret.
            // Given this is a local dev env, let's try with the token we generated.
            const res = await request(app)
                .get('/api/services/epc-lookup?postcode=SW1A1AA')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('currentEnergyRating');
            expect(res.body.postcode).toBe('SW1A1AA');
        });

        it('should return 400 if postcode is missing', async () => {
            const res = await request(app)
                .get('/api/services/epc-lookup')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(400);
        });
    });

    describe('POST /api/services/rent-estimate', () => {
        it('should return rent estimate', async () => {
            const res = await request(app)
                .post('/api/services/rent-estimate')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    postcode: 'SW1A 1AA',
                    bedrooms: 2,
                    propertyType: 'flat'
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('estimatedRent');
            expect(res.body).toHaveProperty('range');
        });

        it('should return 400 for invalid input', async () => {
            const res = await request(app)
                .post('/api/services/rent-estimate')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    postcode: 'SW1A 1AA',
                    // missing bedrooms
                });

            if (res.statusCode !== 400) console.log('400 Test Failed Response:', res.body);
            expect(res.statusCode).toEqual(400);
        });
    });
});
