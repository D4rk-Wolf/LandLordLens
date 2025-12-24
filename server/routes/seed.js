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
        const existingCount = await Property.countDocuments({ userId: userId });
        if (existingCount > 0) {
            return res.status(400).json({ error: 'User already has data. Cannot seed.' });
        }

        // 1. Create Sample Property
        const property = new Property({
            userId: userId,
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

        });
        await property.save();

        // 2. Create Sample Tenancy
        const tenancy = new Tenancy({
            propertyId: property._id,
            userId: userId,
            tenantName: 'John Watson',
            tenantEmail: 'john.watson@example.com',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2025-01-01'),
            monthlyRent: 1800,
            deposit: 2000,
            depositProtected: true,
            status: 'active'
        });
        await tenancy.save();

        // 3. Create Sample Maintenance Ticket
        const ticket = new MaintenanceTicket({
            propertyId: property._id,
            userId: userId,
            title: 'Leaking tap in kitchen',
            description: 'The hot water tap is dripping constantly.',
            priority: 'low',
            status: 'open',
            // category: 'plumbing' // Removing as it's not in the Mongoose schema I viewed
        });
        await ticket.save();

        // 4. Create Compliance Record
        const compliance = new ComplianceRecord({
            propertyId: property._id,
            userId: userId,
            complianceType: 'gas_safety',
            issueDate: new Date('2024-06-01'),
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
