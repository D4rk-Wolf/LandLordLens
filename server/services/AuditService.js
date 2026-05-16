const Tenancy = require('../../models/tenant/Tenancy');
const Property = require('../../models/tenant/Property');
const MaintenanceTicket = require('../../models/tenant/MaintenanceTicket');
const PropertyInspection = require('../../models/tenant/PropertyInspection');
const logger = require('../../lib/logger');

/**
 * Service to handle Audit Data Aggregation
 * This service compiles all data related to a Tenancy into a single "Audit Pack".
 * This is often used for:
 * 1. Legal disputes (evictions, deposit deductions)
 * 2. Ombudsman complaints
 * 3. Compliance reviews
 */
const getAuditPack = async (tenancyId, userId) => {
    try {
        // 1. Fetch Tenancy
        const tenancy = await Tenancy.findOne({ _id: tenancyId });
        if (!tenancy) {
            throw new Error('Tenancy not found');
        }

        // 2. Fetch Property to verify ownership and get details
        const property = await Property.findOne({ _id: tenancy.propertyId, userId });
        if (!property) {
            throw new Error('Property not found or unauthorized');
        }

        // 3. Fetch Maintenance History associated with this property during the tenancy
        const maintenanceTickets = await MaintenanceTicket.find({
            propertyId: property._id,
            // Ideally filter by date range of tenancy, but for now get all for the property 
            // created after tenancy start date
            createdAt: { $gte: tenancy.startDate }
        });

        // 4. Fetch Inspections executed during the tenancy
        const inspections = await PropertyInspection.find({
            propertyId: property._id,
            date: { $gte: tenancy.startDate }
        });

        // 5. Construct Audit Pack Object
        const auditPack = {
            generatedAt: new Date(),
            tenancy: {
                id: tenancy._id,
                startDate: tenancy.startDate,
                endDate: tenancy.endDate,
                tenantName: tenancy.tenantName,
                rentAmount: tenancy.monthlyRent,
                status: tenancy.status
            },
            property: {
                id: property._id,
                address: property.address,
                type: property.propertyType,
                compliance: property.compliance // Includes EPC, Gas Safety refs
            },
            history: {
                maintenance: maintenanceTickets,
                inspections: inspections
            },
            legalDisclaimer: "This Audit Pack is a system-generated record of data held in LandLordLens. It serves as an immutable log for Ombudsman inquiries."
        };

        return auditPack;
    } catch (error) {
        logger.error(`Error generating audit pack for tenancy ${tenancyId}`, error);
        throw error;
    }
};

module.exports = {
    getAuditPack
};
