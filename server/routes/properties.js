const express = require('express');
const { authenticateToken } = require('./auth');
const supabaseAdmin = require('../../lib/supabase').default;
const { canAddProperty, getMaxProperties, validateSubscriptionForProperties } = require('../../lib/subscription');

const router = express.Router();
router.use(authenticateToken);

router.get('/', async (req, res) => {
    try {
        const { data: properties, error } = await supabaseAdmin
            .from('properties')
            .select('*')
            .eq('user_id', req.user.userId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        const count = properties.length;
        const tier = req.user.subscription;
        res.json({
            properties,
            subscription: {
                currentTier: tier,
                propertyCount: count,
                maxProperties: getMaxProperties(tier),
                canAddMore: canAddProperty(tier, count),
                validation: validateSubscriptionForProperties(tier, count),
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { data: property, error } = await supabaseAdmin
            .from('properties')
            .select('*')
            .eq('id', req.params.id)
            .eq('user_id', req.user.userId)
            .single();

        if (error || !property) return res.status(404).json({ error: 'Property not found' });

        const [tenancies, compliance, maintenance] = await Promise.all([
            supabaseAdmin.from('tenancies').select('*').eq('property_id', req.params.id),
            supabaseAdmin.from('compliance_records').select('*').eq('property_id', req.params.id),
            supabaseAdmin.from('maintenance_tickets').select('*').eq('property_id', req.params.id),
        ]);

        res.json({
            property,
            tenancies: tenancies.data ?? [],
            complianceRecords: compliance.data ?? [],
            maintenanceTickets: maintenance.data ?? [],
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { data: existing } = await supabaseAdmin
            .from('properties')
            .select('id')
            .eq('user_id', req.user.userId);

        if (!canAddProperty(req.user.subscription, existing?.length ?? 0)) {
            return res.status(403).json({ error: 'Property limit reached. Please upgrade your subscription.' });
        }

        const { data: property, error } = await supabaseAdmin
            .from('properties')
            .insert({ ...req.body, user_id: req.user.userId })
            .select()
            .single();

        if (error) throw error;
        res.status(201).json({ property });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { data: property, error } = await supabaseAdmin
            .from('properties')
            .update({ ...req.body, updated_at: new Date().toISOString() })
            .eq('id', req.params.id)
            .eq('user_id', req.user.userId)
            .select()
            .single();

        if (error || !property) return res.status(404).json({ error: 'Property not found' });
        res.json({ property });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { error } = await supabaseAdmin
            .from('properties')
            .delete()
            .eq('id', req.params.id)
            .eq('user_id', req.user.userId);

        if (error) throw error;
        res.json({ message: 'Property deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
