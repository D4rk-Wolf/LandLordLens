const express = require('express');
const { authenticateToken } = require('./auth');
const User = require('../../models/User');
const Payment = require('../../models/Payment');
const AppUpdate = require('../../models/AppUpdate');

const router = express.Router();

// Middleware to check admin role
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// All routes require authentication and admin role
router.use(authenticateToken);
router.use(requireAdmin);

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all payments
router.get('/payments', async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json({ payments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get stats
router.get('/stats', async (req, res) => {
  try {
    const [totalUsers, activeUsers, totalPayments, totalRevenue] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
      Payment.countDocuments(),
      Payment.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
    ]);

    res.json({
      stats: {
        totalUsers,
        activeUsers,
        totalPayments,
        totalRevenue: totalRevenue[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all app updates
router.get('/updates', async (req, res) => {
  try {
    const updates = await AppUpdate.find().sort({ releaseDate: -1 });
    res.json({ updates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create app update
router.post('/updates', async (req, res) => {
  try {
    const update = new AppUpdate(req.body);
    await update.save();
    res.status(201).json({ update });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
