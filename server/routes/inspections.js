/**
 * INSPECTIONS ROUTES
 * Standard CRUD for Property Inspections (Mid-term, Check-in, Check-out).
 * Linked to both Property and Tenancy models.
 */

const express = require('express');
const { authenticateToken } = require('./auth');
const PropertyInspection = require('../../models/tenant/PropertyInspection');
const Property = require('../../models/tenant/Property');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all inspections for the user
// Supports filtering by propertyId or status via query params
router.get('/', async (req, res) => {
  try {
    const { propertyId, status } = req.query;
    const query = { userId: req.user.userId };

    if (propertyId) query.propertyId = propertyId;
    if (status) query.status = status;

    const inspections = await PropertyInspection.find(query)
      .populate('propertyId')
      .populate('tenancyId')
      .sort({ scheduledDate: -1 });

    res.json({ inspections });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single inspection
router.get('/:id', async (req, res) => {
  try {
    const inspection = await PropertyInspection.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    })
      .populate('propertyId')
      .populate('tenancyId');

    if (!inspection) {
      return res.status(404).json({ error: 'Inspection not found' });
    }

    res.json({ inspection });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create inspection
router.post('/', async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.body.propertyId,
      userId: req.user.userId,
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    const inspection = new PropertyInspection({
      ...req.body,
      userId: req.user.userId,
      conductedBy: req.user.userId,
    });

    await inspection.save();
    res.status(201).json({ inspection });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update inspection
router.put('/:id', async (req, res) => {
  try {
    const inspection = await PropertyInspection.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!inspection) {
      return res.status(404).json({ error: 'Inspection not found' });
    }

    res.json({ inspection });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete inspection
router.delete('/:id', async (req, res) => {
  try {
    const inspection = await PropertyInspection.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!inspection) {
      return res.status(404).json({ error: 'Inspection not found' });
    }

    res.json({ message: 'Inspection deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
