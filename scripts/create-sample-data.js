require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Property = require('../models/tenant/Property');
const Tenancy = require('../models/tenant/Tenancy');
const MaintenanceTicket = require('../models/tenant/MaintenanceTicket');
const ComplianceRecord = require('../models/tenant/ComplianceRecord');
const { connectToMongoDB } = require('../lib/mongodb');

async function createSampleData() {
    try {
        await connectToMongoDB();
        console.log('🚀 Connected to MongoDB. Starting sample data generation...');

        // 1. Setup Free Tier User
        const freeUser = await User.findOne({ email: 'demo-free@landlordlens.com' });
        if (freeUser) {
            console.log(`\n👤 Processing Free Tier User: ${freeUser.email}`);
            await clearUserData(freeUser._id);

            // Create 1 Property
            const p1 = await Property.create({
                userId: freeUser._id,
                address: {
                    line1: '10 Downing Street',
                    city: 'London',
                    postcode: 'SW1A 2AA',
                    country: 'UK'
                },
                propertyType: 'house',
                bedrooms: 4,
                bathrooms: 2,
                rentAmount: 2500,
                status: 'occupied',
                availabilityStatus: 'rented',
                region: 'england',
                epcRating: 'C'
            });

            // Create 1 Tenancy
            await Tenancy.create({
                propertyId: p1._id,
                userId: freeUser._id,
                tenantName: 'Larry the Cat',
                tenantEmail: 'larry@cabinetoffice.gov.uk',
                startDate: new Date('2023-01-01'),
                monthlyRent: 2500,
                deposit: 3000,
                depositProtected: true,
                status: 'active',
                tenancyType: 'assured_shorthold'
            });

            // Create 1 Compliance Record
            await ComplianceRecord.create({
                propertyId: p1._id,
                userId: freeUser._id,
                complianceType: 'gas_safety',
                issueDate: new Date('2023-01-01'), // generic date
                expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // +6 months
                notes: 'Annual check passed.'
            });

            console.log('✅ Free Tier data created.');
        } else {
            console.warn('⚠️ Demo Free User not found. Run create-demo-users.js first.');
        }

        // 2. Setup Premium Tier User
        const premiumUser = await User.findOne({ email: 'demo-premium@landlordlens.com' });
        if (premiumUser) {
            console.log(`\n👤 Processing Premium Tier User: ${premiumUser.email}`);
            await clearUserData(premiumUser._id);

            // Property 1: Occupied Apartment in Manchester
            const p1 = await Property.create({
                userId: premiumUser._id,
                address: {
                    line1: '42 Deansgate',
                    city: 'Manchester',
                    postcode: 'M3 2BB',
                    country: 'UK'
                },
                propertyType: 'apartment',
                bedrooms: 2,
                bathrooms: 2,
                rentAmount: 1800,
                status: 'occupied',
                availabilityStatus: 'rented',
                region: 'england',
                epcRating: 'B',
                isHMO: false
            });

            await Tenancy.create({
                propertyId: p1._id,
                userId: premiumUser._id,
                tenantName: 'Sarah Smith',
                tenantEmail: 'sarah.smith@example.com',
                startDate: new Date('2023-06-01'),
                monthlyRent: 1800,
                deposit: 2000,
                depositProtected: true,
                status: 'active'
            });

            // Maintenance for P1
            await MaintenanceTicket.create({
                propertyId: p1._id,
                userId: premiumUser._id,
                title: 'Intercom not working',
                description: 'Guest cannot buzz in.',
                priority: 'medium',
                status: 'in_progress',
                // category not in schema, ignoring
            });

            // Property 2: HMO in Leeds (Partially Occupied)
            const p2 = await Property.create({
                userId: premiumUser._id,
                address: {
                    line1: '25 Headingley Lane',
                    city: 'Leeds',
                    postcode: 'LS6 1BL',
                    country: 'UK'
                },
                propertyType: 'house',
                bedrooms: 5,
                bathrooms: 2,
                rentAmount: 3000,
                status: 'occupied',
                availabilityStatus: 'ready_for_rent',
                region: 'england',
                epcRating: 'D',
                isHMO: true,
                hmoLicenseNumber: 'LDS-HMO-2024-001',
                hmoLicenseExpiry: new Date('2026-01-01')
            });

            await Tenancy.create({
                propertyId: p2._id,
                userId: premiumUser._id,
                tenantName: 'Student Group A',
                tenantEmail: 'students.leeds@example.com',
                startDate: new Date('2023-09-01'),
                endDate: new Date('2024-08-31'),
                monthlyRent: 3000,
                deposit: 3000,
                depositProtected: true,
                status: 'active'
            });

            await ComplianceRecord.create({
                propertyId: p2._id,
                userId: premiumUser._id,
                complianceType: 'epc',
                issueDate: new Date('2018-05-15'),
                expiryDate: new Date('2028-05-15'),
                notes: 'Rating D - potential for C w/ insulation.'
            });

            // Property 3: Vacant Flat in London (Needs Compliance)
            const p3 = await Property.create({
                userId: premiumUser._id,
                address: {
                    line1: 'Flat 3B, The Shard',
                    city: 'London',
                    postcode: 'SE1 9SG',
                    country: 'UK'
                },
                propertyType: 'flat',
                bedrooms: 1,
                bathrooms: 1,
                rentAmount: 4500,
                status: 'vacant',
                availabilityStatus: 'ready_for_rent',
                region: 'england',
                epcRating: 'A',
            });

            // Expiring compliance
            await ComplianceRecord.create({
                propertyId: p3._id,
                userId: premiumUser._id,
                complianceType: 'gas_safety',
                issueDate: new Date('2024-06-01'),
                expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // +5 days
                notes: 'Needs renewal ASAP'
            });

            console.log('✅ Premium Tier data created.');
        } else {
            console.warn('⚠️ Demo Premium User not found. Run create-demo-users.js first.');
        }

        console.log('\n✨ Sample data generation complete!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error generating sample data:', error);
        process.exit(1);
    }
}

async function clearUserData(userId) {
    await Property.deleteMany({ userId });
    await Tenancy.deleteMany({ userId });
    await MaintenanceTicket.deleteMany({ userId });
    await ComplianceRecord.deleteMany({ userId });
}

createSampleData();
