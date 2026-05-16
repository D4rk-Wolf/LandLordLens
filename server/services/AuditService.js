const supabaseAdmin = require('../../lib/supabase').default;
const logger = require('../../lib/logger');

const generateAuditReport = async (userId) => {
    const { data: properties } = await supabaseAdmin.from('properties').select('*').eq('user_id', userId);
    const { data: tenancies } = await supabaseAdmin.from('tenancies').select('*').eq('user_id', userId);
    const { data: maintenance } = await supabaseAdmin.from('maintenance_tickets').select('*').eq('user_id', userId);
    const { data: inspections } = await supabaseAdmin.from('property_inspections').select('*').eq('user_id', userId);

    return { properties, tenancies, maintenance, inspections };
};

module.exports = { generateAuditReport };
