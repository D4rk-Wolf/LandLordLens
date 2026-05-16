const express = require('express');
const { authenticateToken } = require('./auth');
const supabaseAdmin = require('../../lib/supabase').default;

const router = express.Router();
router.use(authenticateToken);

router.get('/', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('tenancies').select('*').eq('user_id', req.user.userId).order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json({ tenancies: data });
});

router.get('/:id', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('tenancies').select('*').eq('id', req.params.id).eq('user_id', req.user.userId).single();
    if (error || !data) return res.status(404).json({ error: 'Tenancy not found' });
    res.json({ tenancy: data });
});

router.post('/', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('tenancies').insert({ ...req.body, user_id: req.user.userId }).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ tenancy: data });
});

router.put('/:id', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('tenancies').update({ ...req.body, updated_at: new Date().toISOString() })
        .eq('id', req.params.id).eq('user_id', req.user.userId).select().single();
    if (error || !data) return res.status(404).json({ error: 'Tenancy not found' });
    res.json({ tenancy: data });
});

router.delete('/:id', async (req, res) => {
    const { error } = await supabaseAdmin
        .from('tenancies').delete().eq('id', req.params.id).eq('user_id', req.user.userId);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Tenancy deleted' });
});

module.exports = router;
