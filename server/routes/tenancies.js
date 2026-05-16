/**
 * TENANCY ROUTES
 * Handles the lifecyle of a tenancy: creation, depositing protection, and background checks.
 * Integrates with the "LeaseAbstractionService" to parse uploaded PDFs.
 */

const express = require('express');
const { authenticateToken } = require('./auth'); // Middleware to ensure login
const Tenancy = require('../../models/tenant/Tenancy');
const DepositProtection = require('../../models/tenant/DepositProtection');
const RightToRent = require('../../models/tenant/RightToRent');
const TenantBackgroundCheck = require('../../models/tenant/TenantBackgroundCheck');
const Inventory = require('../../models/tenant/Inventory');
const Property = require('../../models/tenant/Property');
const multer = require('multer'); // Middleware for handling file uploads (PDFs)
const leaseAbstractionService = require('../services/LeaseAbstractionService'); // Custom AI service

const router = express.Router({ mergeParams: true }); // 'mergeParams' allows us to access propertyId from parent router if needed

// Configure Multer for PDF uploads (Tenancy Agreements)
// Files are stored in memory (RAM) temporarily for processing
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  fileFilter: (req, file, cb) => {
    // Only accept PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// All routes require authentication
router.use(authenticateToken);

// Get all tenancies for the user
router.get('/', async (req, res) => {
  try {
    const tenancies = await Tenancy.find({ userId: req.user.userId })
      .populate('propertyId')
      .sort({ createdAt: -1 });
    res.json({ tenancies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single tenancy with all related data
router.get('/:id', async (req, res) => {
  try {
    const tenancy = await Tenancy.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    }).populate('propertyId');

    if (!tenancy) {
      return res.status(404).json({ error: 'Tenancy not found' });
    }

    // Get related data
    const [depositProtection, rightToRent, backgroundCheck, inventories] = await Promise.all([
      DepositProtection.findOne({ tenancyId: tenancy._id }),
      RightToRent.find({ tenancyId: tenancy._id }),
      TenantBackgroundCheck.findOne({ tenancyId: tenancy._id }),
      Inventory.find({ tenancyId: tenancy._id }).sort({ date: -1 }),
    ]);

    res.json({
      tenancy,
      depositProtection,
      rightToRent,
      backgroundCheck,
      inventories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create deposit protection record
router.post('/:id/deposit-protection', async (req, res) => {
  try {
    const tenancy = await Tenancy.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!tenancy) {
      return res.status(404).json({ error: 'Tenancy not found' });
    }

    const depositProtection = new DepositProtection({
      ...req.body,
      tenancyId: tenancy._id,
      userId: req.user.userId,
    });

    await depositProtection.save();

    // Update tenancy
    tenancy.depositProtected = true;
    await tenancy.save();

    res.status(201).json({ depositProtection });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create right to rent check
router.post('/:id/right-to-rent', async (req, res) => {
  try {
    const tenancy = await Tenancy.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!tenancy) {
      return res.status(404).json({ error: 'Tenancy not found' });
    }

    const rightToRent = new RightToRent({
      ...req.body,
      tenancyId: tenancy._id,
      userId: req.user.userId,
      checkedBy: req.user.userId,
    });

    await rightToRent.save();

    // Update tenancy
    tenancy.rightToRentChecked = true;
    await tenancy.save();

    res.status(201).json({ rightToRent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create tenant background check
router.post('/:id/background-check', async (req, res) => {
  try {
    const tenancy = await Tenancy.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!tenancy) {
      return res.status(404).json({ error: 'Tenancy not found' });
    }

    const backgroundCheck = new TenantBackgroundCheck({
      ...req.body,
      tenancyId: tenancy._id,
      userId: req.user.userId,
      tenantName: tenancy.tenantName,
    });

    await backgroundCheck.save();
    res.status(201).json({ backgroundCheck });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create inventory
router.post('/:id/inventory', async (req, res) => {
  try {
    const tenancy = await Tenancy.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!tenancy) {
      return res.status(404).json({ error: 'Tenancy not found' });
    }

    const inventory = new Inventory({
      ...req.body,
      tenancyId: tenancy._id,
      propertyId: tenancy.propertyId,
      userId: req.user.userId,
    });

    await inventory.save();
    res.status(201).json({ inventory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update tenancy (e.g., rent increase, Section 13 notice)
router.put('/:id', async (req, res) => {
  try {
    const tenancy = await Tenancy.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!tenancy) {
      return res.status(404).json({ error: 'Tenancy not found' });
    }

    res.json({ tenancy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
