const express = require('express');
const { authenticateToken } = require('./auth');
const supabaseAdmin = require('../../lib/supabase').default;

const router = express.Router();
router.use(authenticateToken);

router.get('/', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('compliance_records').select('*').eq('user_id', req.user.userId).order('expiry_date', { ascending: true });
    if (error) return res.status(500).json({ error: error.message });
    res.json({ complianceRecords: data });
});

router.get('/property/:propertyId', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('compliance_records').select('*')
        .eq('property_id', req.params.propertyId).eq('user_id', req.user.userId);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ complianceRecords: data });
});

router.post('/', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('compliance_records').insert({ ...req.body, user_id: req.user.userId }).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ complianceRecord: data });
});

router.put('/:id', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('compliance_records').update({ ...req.body, updated_at: new Date().toISOString() })
        .eq('id', req.params.id).eq('user_id', req.user.userId).select().single();
    if (error || !data) return res.status(404).json({ error: 'Record not found' });
    res.json({ complianceRecord: data });
});

router.delete('/:id', async (req, res) => {
    const { error } = await supabaseAdmin
        .from('compliance_records').delete().eq('id', req.params.id).eq('user_id', req.user.userId);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Compliance record deleted' });
});

module.exports = router;
