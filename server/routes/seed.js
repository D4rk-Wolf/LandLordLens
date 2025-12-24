const express = require('express');
const { authenticateToken } = require('./auth');
const Property = require('../../models/tenant/Property');
const Tenancy = require('../../models/tenant/Tenancy');
const MaintenanceTicket = require('../../models/tenant/MaintenanceTicket');
const ComplianceRecord = require('../../models/tenant/ComplianceRecord');

const router = express.Router();

router.post('/data', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        // Check if user already has properties
        const existingCount = await Property.countDocuments({ landlord: userId });
        if (existingCount > 0) {
            return res.status(400).json({ error: 'User already has data. Cannot seed.' });
        }

        // 1. Create Sample Property
        const property = new Property({
            landlord: userId,
            address: {
                line1: '123 Baker Street',
                city: 'London',
                postcode: 'NW1 6XE',
                country: 'UK'
            },
            propertyType: 'apartment',
            bedrooms: 2,
            bathrooms: 1,
            status: 'occupied',
            rentAmount: 1800,
            description: 'Charming 2-bed apartment in central London.'
        });
        await property.save();

        // 2. Create Sample Tenancy
        const tenancy = new Tenancy({
            property: property._id,
            landlord: userId,
            tenantName: 'John Watson',
            tenantEmail: 'john.watson@example.com',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2025-01-01'),
            rentAmount: 1800,
            paymentFrequency: 'monthly',
            status: 'active',
            depositAmount: 2000
        });
        await tenancy.save();

        // 3. Create Sample Maintenance Ticket
        const ticket = new MaintenanceTicket({
            property: property._id,
            landlord: userId,
            title: 'Leaking tap in kitchen',
            description: 'The hot water tap is dripping constantly.',
            priority: 'low',
            status: 'open',
            reportedBy: tenancy._id,
            category: 'plumbing'
        });
        await ticket.save();

        // 4. Create Compliance Record
        const compliance = new ComplianceRecord({
            property: property._id,
            type: 'gas_safety',
            status: 'valid',
            expiryDate: new Date('2025-06-01'),
            notes: 'Passed with no issues.'
        });
        await compliance.save();

        res.json({ message: 'Sample data seeded successfully!' });
    } catch (error) {
        console.error('Seeding error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
