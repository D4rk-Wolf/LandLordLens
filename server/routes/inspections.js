const express = require('express');
const { authenticateToken } = require('./auth');
const supabaseAdmin = require('../../lib/supabase').default;

const router = express.Router();
router.use(authenticateToken);

router.get('/', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('property_inspections').select('*').eq('user_id', req.user.userId)
        .order('scheduled_date', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json({ inspections: data });
});

router.post('/', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('property_inspections').insert({ ...req.body, user_id: req.user.userId }).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ inspection: data });
});

router.put('/:id', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('property_inspections').update({ ...req.body, updated_at: new Date().toISOString() })
        .eq('id', req.params.id).eq('user_id', req.user.userId).select().single();
    if (error || !data) return res.status(404).json({ error: 'Inspection not found' });
    res.json({ inspection: data });
});

router.delete('/:id', async (req, res) => {
    const { error } = await supabaseAdmin
        .from('property_inspections').delete().eq('id', req.params.id).eq('user_id', req.user.userId);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Inspection deleted' });
});

module.exports = router;
