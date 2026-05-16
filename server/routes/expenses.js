const express = require('express');
const { authenticateToken } = require('./auth');
const supabaseAdmin = require('../../lib/supabase').default;

const router = express.Router();
router.use(authenticateToken);

router.get('/', async (req, res) => {
    let query = supabaseAdmin.from('expenses').select('*').eq('user_id', req.user.userId).order('date', { ascending: false });
    if (req.query.taxYear) query = query.eq('tax_year', req.query.taxYear);
    if (req.query.propertyId) query = query.eq('property_id', req.query.propertyId);
    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    res.json({ expenses: data });
});

router.post('/', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('expenses').insert({ ...req.body, user_id: req.user.userId }).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ expense: data });
});

router.put('/:id', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('expenses').update({ ...req.body, updated_at: new Date().toISOString() })
        .eq('id', req.params.id).eq('user_id', req.user.userId).select().single();
    if (error || !data) return res.status(404).json({ error: 'Expense not found' });
    res.json({ expense: data });
});

router.delete('/:id', async (req, res) => {
    const { error } = await supabaseAdmin
        .from('expenses').delete().eq('id', req.params.id).eq('user_id', req.user.userId);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Expense deleted' });
});

module.exports = router;
