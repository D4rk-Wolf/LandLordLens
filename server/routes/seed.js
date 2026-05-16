/**
 * SEED ROUTE — development only, never exposed in production.
 * Populates the authenticated user's account with sample demo data.
 * Skipped if the user already has properties.
 */

const express = require('express');
const { authenticateToken } = require('./auth');
const supabaseAdmin = require('../../lib/supabase').default;

const router = express.Router();

router.post('/data', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        const { count } = await supabaseAdmin
            .from('properties')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId);

        if (count > 0) {
            return res.status(400).json({ error: 'User already has data. Cannot seed.' });
        }

        // 1. Create sample property
        const { data: property, error: propErr } = await supabaseAdmin
            .from('properties')
            .insert({
                user_id: userId,
                address: { line1: '123 Baker Street', city: 'London', postcode: 'NW1 6XE', country: 'UK' },
                property_type: 'apartment',
                bedrooms: 2,
                bathrooms: 1,
                status: 'occupied',
                rent_amount: 1800,
                compliance: {},
                financials: {},
            })
            .select()
            .single();

        if (propErr) throw propErr;

        // 2. Create sample tenancy
        const { error: tenErr } = await supabaseAdmin
            .from('tenancies')
            .insert({
                property_id: property.id,
                user_id: userId,
                tenant_name: 'John Watson',
                tenant_email: 'john.watson@example.com',
                start_date: '2024-01-01',
                end_date: '2025-01-01',
                monthly_rent: 1800,
                deposit: 2000,
                deposit_protected: true,
                status: 'active',
            });

        if (tenErr) throw tenErr;

        // 3. Create sample inspection
        const { error: inspErr } = await supabaseAdmin
            .from('property_inspections')
            .insert({
                property_id: property.id,
                user_id: userId,
                inspection_date: new Date().toISOString().split('T')[0],
                inspector_name: 'Demo Inspector',
                overall_condition: 'good',
                notes: 'Sample inspection created by demo seed.',
                items: [],
            });

        if (inspErr) throw inspErr;

        res.json({ message: 'Sample data seeded successfully!' });
    } catch (error) {
        console.error('Seeding error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
