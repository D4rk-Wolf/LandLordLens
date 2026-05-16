/**
 * WEBHOOK ROUTES
 * This entry point handles incoming events from third-party services like Stripe.
 * These endpoints are called by the service provider, not by our frontend.
 */

const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const subscriptionService = require('../services/SubscriptionService');
const logger = require('../../lib/logger');

/**
 * POST /api/webhooks/stripe
 * Handles Stripe webhooks events.
 * 
 * CRITICAL SECURITY NOTE:
 * Stripe sends a signature in the header to verify that the event actually came from Stripe.
 * We must use the RAW request body to verify this signature.
 * If we used the parsed JSON body, the signature verification would fail because
 * parsing/stringifying JSON changes formatting (whitespace, order) which invalidates the cryptographic signature.
 */
router.post('/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Construct the event using the raw body (buffer) and secret
    // req.body is a buffer here because of the express.raw() middleware in server/index.js
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    logger.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // If verification succeeds, handle the logic
  try {
    await subscriptionService.handleWebhook(event);
    res.json({ received: true }); // Acknowledge receipt to Stripe so they don't retry
  } catch (err) {
    logger.error(`Error handling webhook event: ${err.message}`);
    res.status(500).send('Webhook handler error');
  }
});

module.exports = router;
