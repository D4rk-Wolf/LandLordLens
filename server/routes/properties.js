const express = require('express');
const { authenticateToken } = require('./auth');
const Property = require('../../models/tenant/Property');
const Tenancy = require('../../models/tenant/Tenancy');
const ComplianceRecord = require('../../models/tenant/ComplianceRecord');
const MaintenanceTicket = require('../../models/tenant/MaintenanceTicket');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all properties for the user
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    res.json({ properties });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single property
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Get related data
    const [tenancies, complianceRecords, maintenanceTickets] = await Promise.all([
      Tenancy.find({ propertyId: property._id }),
      ComplianceRecord.find({ propertyId: property._id }),
      MaintenanceTicket.find({ propertyId: property._id }),
    ]);

    res.json({
      property,
      tenancies,
      complianceRecords,
      maintenanceTickets,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create property
router.post('/', async (req, res) => {
  try {
    const { complianceRecords, ...propertyData } = req.body;
    
    const property = new Property({
      ...propertyData,
      userId: req.user.userId,
    });
    await property.save();

    // Create compliance records if provided
    const createdComplianceRecords = [];
    if (complianceRecords && Array.isArray(complianceRecords) && complianceRecords.length > 0) {
      for (const complianceData of complianceRecords) {
        const complianceRecord = new ComplianceRecord({
          ...complianceData,
          propertyId: property._id,
          userId: req.user.userId,
        });
        await complianceRecord.save();
        createdComplianceRecords.push(complianceRecord);
      }
    }

    res.status(201).json({ 
      property,
      complianceRecords: createdComplianceRecords,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update property
router.put('/:id', async (req, res) => {
  try {
    const property = await Property.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.json({ property });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete property
router.delete('/:id', async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create tenancy
router.post('/:id/tenancies', async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    const tenancy = new Tenancy({
      ...req.body,
      propertyId: property._id,
      userId: req.user.userId,
    });

    await tenancy.save();
    res.status(201).json({ tenancy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create compliance record
router.post('/:id/compliance', async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    const complianceRecord = new ComplianceRecord({
      ...req.body,
      propertyId: property._id,
      userId: req.user.userId,
    });

    await complianceRecord.save();
    res.status(201).json({ complianceRecord });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create maintenance ticket
router.post('/:id/maintenance', async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    const ticket = new MaintenanceTicket({
      ...req.body,
      propertyId: property._id,
      userId: req.user.userId,
    });

    await ticket.save();
    res.status(201).json({ ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
