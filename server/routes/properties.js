const express = require('express');
const { authenticateToken } = require('./auth');
const Property = require('../../models/tenant/Property');
const Tenancy = require('../../models/tenant/Tenancy');
const ComplianceRecord = require('../../models/tenant/ComplianceRecord');
const MaintenanceTicket = require('../../models/tenant/MaintenanceTicket');
const User = require('../../models/User');
const { 
  canAddProperty, 
  validateSubscriptionForProperties, 
  getRequiredTier, 
  getFormattedPrice,
  getMaxProperties,
} = require('../../lib/subscription');
const { validateProperty, validateObjectId } = require('../../lib/middleware/validators');
const { handleValidationErrors } = require('../../lib/middleware/sanitize');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all properties for the user
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const properties = await Property.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    
    const propertyCount = properties.length;
    const userSubscription = user.subscription || 'free';
    
    const subscriptionInfo = {
      currentTier: userSubscription,
      propertyCount: propertyCount,
      maxProperties: getMaxProperties(userSubscription),
      canAddMore: canAddProperty(userSubscription, propertyCount),
      validation: validateSubscriptionForProperties(userSubscription, propertyCount),
    };

    res.json({ 
      properties,
      subscription: subscriptionInfo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single property
router.get('/:id', validateObjectId('id'), handleValidationErrors, async (req, res) => {
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
router.post('/', validateProperty, handleValidationErrors, async (req, res) => {
  try {
    // Check subscription limits
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const currentPropertyCount = await Property.countDocuments({ userId: req.user.userId });
    const userSubscription = user.subscription || 'free';

    // Check if user can add more properties
    if (!canAddProperty(userSubscription, currentPropertyCount)) {
      const requiredTier = getRequiredTier(currentPropertyCount + 1);
      const validation = validateSubscriptionForProperties(userSubscription, currentPropertyCount + 1);
      
      return res.status(403).json({
        error: 'Subscription limit reached',
        message: validation.message,
        currentTier: userSubscription,
        currentPropertyCount: currentPropertyCount,
        maxProperties: currentPropertyCount, // Already at limit
        requiredTier: requiredTier,
        requiredTierPrice: {
          monthly: getFormattedPrice(requiredTier, 'monthly'),
          yearly: getFormattedPrice(requiredTier, 'yearly'),
        },
      });
    }

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
router.put('/:id', validateObjectId('id'), handleValidationErrors, async (req, res) => {
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
router.delete('/:id', validateObjectId('id'), handleValidationErrors, async (req, res) => {
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
