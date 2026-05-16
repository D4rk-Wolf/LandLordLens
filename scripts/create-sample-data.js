require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Property = require('../models/tenant/Property');
const Tenancy = require('../models/tenant/Tenancy');
const MaintenanceTicket = require('../models/tenant/MaintenanceTicket');
const ComplianceRecord = require('../models/tenant/ComplianceRecord');
const PropertyInspection = require('../models/tenant/PropertyInspection');
const Expense = require('../models/tenant/Expense');
const Document = require('../models/tenant/Document');
const DepositProtection = require('../models/tenant/DepositProtection');
const RightToRent = require('../models/tenant/RightToRent');
const TenantBackgroundCheck = require('../models/tenant/TenantBackgroundCheck');
const Inventory = require('../models/tenant/Inventory');
const { connectToMongoDB } = require('../lib/mongodb');

async function createSampleData() {
    try {
        await connectToMongoDB();
        console.log('🚀 Connected to MongoDB. Starting comprehensive sample data generation...');

        const safeCreate = async (Model, data, name) => {
            try {
                return await Model.create(data);
            } catch (e) {
                console.error(`❌ FAILED creating ${name}:`, e.message);
                if (e.errors) {
                    Object.keys(e.errors).forEach(key => {
                        console.error(`   - ${key}: ${e.errors[key].message}`);
                    });
                }
                return null;
            }
        };

        // 1. Setup Free Tier User
        const freeUser = await User.findOne({ email: 'demo-free@landlordlens.com' });
        if (freeUser) {
            console.log(`\n👤 Processing Free Tier User: ${freeUser.email}`);
            await clearUserData(freeUser._id);

            // Property 1: 10 Downing Street
            const p1 = await safeCreate(Property, {
                userId: freeUser._id,
                address: { line1: '10 Downing Street', city: 'London', postcode: 'SW1A 2AA', country: 'UK' },
                propertyType: 'house', bedrooms: 4, bathrooms: 2, rentAmount: 2500,
                status: 'occupied', availabilityStatus: 'rented', region: 'england', epcRating: 'C',
                financials: { purchasePrice: 4000000, purchaseDate: new Date('2020-01-01'), currentValuation: 4200000, mortgageProvider: 'Nationwide', mortgageBalance: 3500000, monthlyMortgagePayment: 15000, interestRate: 5.0, isInterestOnly: true }
            }, 'Property');

            if (p1) {
                // Tenancy
                const t1 = await safeCreate(Tenancy, {
                    propertyId: p1._id, userId: freeUser._id, tenantName: 'Larry the Cat', tenantEmail: 'larry@cabinetoffice.gov.uk',
                    startDate: new Date('2023-01-01'), monthlyRent: 2500, deposit: 3000, depositProtected: true, status: 'active', tenancyType: 'assured_shorthold'
                }, 'Tenancy');

                if (t1) {
                    // Compliance
                    await safeCreate(ComplianceRecord, { propertyId: p1._id, userId: freeUser._id, complianceType: 'gas_safety', issueDate: new Date('2023-01-01'), expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), notes: 'Annual check passed.' }, 'ComplianceRecord');

                    // Inspection (Completed)
                    await safeCreate(PropertyInspection, {
                        propertyId: p1._id, tenancyId: t1._id, userId: freeUser._id, inspectionType: 'routine',
                        scheduledDate: new Date('2023-06-01'), actualDate: new Date('2023-06-01'), conductedBy: 'PM', status: 'completed', overallCondition: 'good',
                        items: [{ area: 'Kitchen', condition: 'good' }]
                    }, 'PropertyInspection');

                    // Expense (Rent Insurance)
                    await safeCreate(Expense, {
                        propertyId: p1._id, tenancyId: t1._id, userId: freeUser._id, type: 'insurance', category: 'rent_rates_insurance',
                        amount: 350, date: new Date('2023-01-05'), description: 'Landlord Insurance Annual Premium', isTaxDeductible: true, currency: 'GBP'
                    }, 'Expense');

                    // Document
                    await safeCreate(Document, {
                        propertyId: p1._id, tenancyId: t1._id, userId: freeUser._id,
                        category: 'legal', type: 'tenancy_agreement', title: 'AST Agreement',
                        expiryDate: new Date('2099-01-01') // Indefinite
                    }, 'Document');
                }
            }
            console.log('✅ Free Tier data created.');
        }

        // 2. Setup Premium Tier User
        const premiumUser = await User.findOne({ email: 'demo-premium@landlordlens.com' });
        if (premiumUser) {
            console.log(`\n👤 Processing Premium Tier User: ${premiumUser.email}`);
            await clearUserData(premiumUser._id);

            // --- P1: Manchester Apt (High Compliance, Good Financials) ---
            const p1 = await safeCreate(Property, {
                userId: premiumUser._id,
                address: { line1: '42 Deansgate', city: 'Manchester', postcode: 'M3 2BB', country: 'UK' },
                propertyType: 'apartment', bedrooms: 2, bathrooms: 2, rentAmount: 1800,
                status: 'occupied', availabilityStatus: 'rented', region: 'england',
                compliance: { epcRating: 'B', gasCertificateExpiry: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), depositProtected: true, depositProtectedDate: new Date('2023-06-05') },
                financials: { purchasePrice: 250000, purchaseDate: new Date('2019-03-15'), currentValuation: 325000, mortgageProvider: 'Halifax', mortgageBalance: 200000, monthlyMortgagePayment: 850, interestRate: 4.5, isInterestOnly: true }
            }, 'Property (P1)');

            if (p1) {
                const t1 = await safeCreate(Tenancy, {
                    propertyId: p1._id, userId: premiumUser._id, tenantName: 'Sarah Smith', tenantEmail: 'sarah.smith@example.com',
                    startDate: new Date('2023-06-01'), monthlyRent: 1800, deposit: 2000, depositProtected: true, status: 'active'
                }, 'Tenancy (T1)');

                if (t1) {
                    // Sub-Records for T1
                    await safeCreate(DepositProtection, {
                        tenancyId: t1._id, userId: premiumUser._id,
                        scheme: 'tds', protectionReference: 'TDS123456',
                        depositAmount: 2000, protectedDate: new Date('2023-06-05')
                    }, 'DepositProtection');

                    await safeCreate(RightToRent, {
                        tenancyId: t1._id, userId: premiumUser._id, tenantName: 'Sarah Smith',
                        checkDate: new Date('2023-05-20'), outcome: 'passed', checkedBy: premiumUser._id.toString(),
                        documentType: 'uk_passport', documentNumber: '123456789', tenantDateOfBirth: new Date('1990-01-01'), status: 'passed'
                    }, 'RightToRent');
                    await safeCreate(TenantBackgroundCheck, { tenancyId: t1._id, userId: premiumUser._id, tenantName: 'Sarah Smith', checkType: 'full', status: 'passed', checkDate: new Date('2023-05-25'), provider: 'RentProfile' }, 'BackgroundCheck');
                    await safeCreate(Inventory, { tenancyId: t1._id, propertyId: p1._id, userId: premiumUser._id, type: 'check_in', date: new Date('2023-06-01'), status: 'completed', conductedBy: 'Inventory Clerk' }, 'Inventory');

                    // Expenses for P1
                    await safeCreate(Expense, { propertyId: p1._id, tenancyId: t1._id, userId: premiumUser._id, type: 'maintenance_repairs', category: 'repairs_maintenance', amount: 150, date: new Date('2023-08-10'), description: 'Fix Leaking Tap', isTaxDeductible: true, currency: 'GBP' }, 'Expense 1');
                    await safeCreate(Expense, { propertyId: p1._id, tenancyId: t1._id, userId: premiumUser._id, type: 'letting_agent_fees', category: 'legal_professional', amount: 180, date: new Date('2023-06-01'), description: 'Letting Fee', isTaxDeductible: true, currency: 'GBP' }, 'Expense 2');

                    // Maintenance
                    await safeCreate(MaintenanceTicket, { propertyId: p1._id, userId: premiumUser._id, title: 'Intercom not working', description: 'Guest cannot buzz in.', priority: 'medium', status: 'in_progress' }, 'MaintenanceTicket');

                    // Inspection
                    await safeCreate(PropertyInspection, {
                        propertyId: p1._id, tenancyId: t1._id, userId: premiumUser._id, inspectionType: 'check_in',
                        scheduledDate: new Date('2023-06-01'), actualDate: new Date('2023-06-01'), conductedBy: 'Clerk', status: 'completed', overallCondition: 'excellent',
                        items: [{ area: 'Living Room', condition: 'excellent' }]
                    }, 'Inspection');
                }
            }

            // --- P2: Leeds HMO (Complex, High Yield) ---
            const p2 = await safeCreate(Property, {
                userId: premiumUser._id,
                address: { line1: '25 Headingley Lane', city: 'Leeds', postcode: 'LS6 1BL', country: 'UK' },
                propertyType: 'house', bedrooms: 5, bathrooms: 2, rentAmount: 3000,
                status: 'occupied', availabilityStatus: 'ready_for_rent', region: 'england',
                compliance: { epcRating: 'D', licensingType: 'HMO', licenseExpiry: new Date('2026-01-01'), gasCertificateExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
                financials: { purchasePrice: 380000, purchaseDate: new Date('2020-08-20'), currentValuation: 450000, mortgageProvider: 'The Mortgage Works', mortgageBalance: 300000, monthlyMortgagePayment: 1200, interestRate: 5.2, isInterestOnly: true }
            }, 'Property (P2)');

            if (p2) {
                const t2 = await safeCreate(Tenancy, {
                    propertyId: p2._id, userId: premiumUser._id, tenantName: 'Student Group A', tenantEmail: 'students.leeds@example.com',
                    startDate: new Date('2023-09-01'), endDate: new Date('2024-08-31'), monthlyRent: 3000, deposit: 3000, depositProtected: true, status: 'active'
                }, 'Tenancy (T2)');

                // HMO Expenses (Higher frequency)
                await safeCreate(Expense, { propertyId: p2._id, userId: premiumUser._id, type: 'utility_bills', category: 'property_business_expenses', amount: 250, date: new Date('2023-10-01'), description: 'Monthly Utilities (HMO)', isTaxDeductible: true, currency: 'GBP' }, 'Expense HMO');

                // Compliance Docs
                await safeCreate(ComplianceRecord, { propertyId: p2._id, userId: premiumUser._id, complianceType: 'epc', issueDate: new Date('2018-05-15'), expiryDate: new Date('2028-05-15'), notes: 'Rating D' }, 'ComplianceRecord');
            }

            // --- P3: The Shard (Problem Property for Section 8 Testing) ---
            // Intentionally failing compliance: Expired Gas Cert
            const p3 = await safeCreate(Property, {
                userId: premiumUser._id,
                address: { line1: 'Flat 3B, The Shard', city: 'London', postcode: 'SE1 9SG', country: 'UK' },
                propertyType: 'flat', bedrooms: 1, bathrooms: 1, rentAmount: 4500,
                status: 'occupied', availabilityStatus: 'rented', region: 'england',
                compliance: { epcRating: 'A', gasCertificateExpiry: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) }, // RED flag
                financials: { purchasePrice: 850000, purchaseDate: new Date('2015-01-10'), currentValuation: 1100000, mortgageProvider: 'N/A', mortgageBalance: 0, monthlyMortgagePayment: 0, interestRate: 0, isInterestOnly: false }
            }, 'Property (P3)');

            if (p3) {
                // "Bad Tenant"
                const t3 = await safeCreate(Tenancy, {
                    propertyId: p3._id, userId: premiumUser._id, tenantName: 'James Bond (Bad Tenant)', tenantEmail: '007@mi6.gov.uk',
                    startDate: new Date('2023-11-01'), monthlyRent: 4500, deposit: 5000, depositProtected: false, // RED flag
                    status: 'active'
                }, 'Tenancy (T3)');

                // Expired Gas Cert Record
                await safeCreate(ComplianceRecord, { propertyId: p3._id, userId: premiumUser._id, complianceType: 'gas_safety', issueDate: new Date('2024-06-01'), expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), notes: 'Needs renewal ASAP' }, 'ComplianceRecord Expired');

                // Document: Notice to Quit (Draft)
                if (t3) {
                    await safeCreate(Document, {
                        propertyId: p3._id, tenancyId: t3._id, userId: premiumUser._id,
                        category: 'legal', type: 'other', title: 'Draft Section 8', expiryDate: null
                    }, 'Document Draft');
                }
            }

            console.log('✅ Premium Tier data created.');
        }

        console.log('\n✨ Comprehensive sample data generation complete!');
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
    await PropertyInspection.deleteMany({ userId });
    await Expense.deleteMany({ userId });
    await Document.deleteMany({ userId });
    await DepositProtection.deleteMany({ userId });
    await RightToRent.deleteMany({ userId });
    await TenantBackgroundCheck.deleteMany({ userId });
    await Inventory.deleteMany({ userId });
}

createSampleData();
