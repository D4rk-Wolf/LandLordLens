const express = require('express');
const { authenticateToken } = require('./auth');
const Expense = require('../../models/tenant/Expense');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all expenses for the user
router.get('/', async (req, res) => {
  try {
    const { propertyId, taxYear, category, isTaxDeductible } = req.query;
    const query = { userId: req.user.userId };
    
    if (propertyId) query.propertyId = propertyId;
    if (taxYear) query.taxYear = taxYear;
    if (category) query.category = category;
    if (isTaxDeductible !== undefined) query.isTaxDeductible = isTaxDeductible === 'true';

    const expenses = await Expense.find(query)
      .populate('propertyId')
      .populate('tenancyId')
      .sort({ date: -1 });
    
    res.json({ expenses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get expense summary/statistics
router.get('/summary', async (req, res) => {
  try {
    const { taxYear } = req.query;
    const query = { userId: req.user.userId };
    if (taxYear) query.taxYear = taxYear;

    const expenses = await Expense.find(query);
    
    const summary = {
      total: expenses.reduce((sum, e) => sum + e.amount, 0),
      taxDeductible: expenses
        .filter(e => e.isTaxDeductible)
        .reduce((sum, e) => sum + e.amount, 0),
      byCategory: {},
      byMonth: {},
    };

    expenses.forEach(expense => {
      // By category
      if (!summary.byCategory[expense.category]) {
        summary.byCategory[expense.category] = 0;
      }
      summary.byCategory[expense.category] += expense.amount;

      // By month
      const month = new Date(expense.date).toISOString().slice(0, 7);
      if (!summary.byMonth[month]) {
        summary.byMonth[month] = 0;
      }
      summary.byMonth[month] += expense.amount;
    });

    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single expense
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    })
      .populate('propertyId')
      .populate('tenancyId');

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json({ expense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create expense
router.post('/', async (req, res) => {
  try {
    const expense = new Expense({
      ...req.body,
      userId: req.user.userId,
    });

    await expense.save();
    res.status(201).json({ expense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update expense
router.put('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json({ expense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete expense
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
